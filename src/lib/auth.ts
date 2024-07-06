import { Plan, UserSubscriptionPlan } from "@/types";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { User } from "@prisma/client";
import { NextAuthOptions } from "next-auth";
import EmailProvider from "next-auth/providers/email";
import GoogleProvider from "next-auth/providers/google";
import * as z from "zod";
import MagicLinkEmail from "../../emails/magic-link";
import { db } from "./db";
import { getUser } from "./fetchers/users";
import log from "./log";
import { resend } from "./resend";
import { getUserSubscriptionPlanById } from "./subscription";
const VERCEL_DEPLOYMENT = !!process.env.VERCEL_URL;

const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt",
  },
  providers: [
    EmailProvider({
      from: "Nucelo <verify@nucelo.com>",
      sendVerificationRequest: async ({ identifier, url, provider }) => {
        if (process.env.NODE_ENV === "development") {
          console.log(url);
          return;
        }
        await resend.emails.send({
          from: provider.from as string,
          to: identifier as string,
          subject: "Welcome to Nucelo",
          react: MagicLinkEmail({ url }),
        });
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  cookies: {
    sessionToken: {
      name: `${VERCEL_DEPLOYMENT ? "__Secure-" : ""}next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        domain: VERCEL_DEPLOYMENT
          ? `.${process.env.NEXT_PUBLIC_APP_DOMAIN}`
          : undefined,
        secure: VERCEL_DEPLOYMENT,
      },
    },
  },
  pages: {
    signIn: "/login",
    verifyRequest: "/",
  },
  callbacks: {
    async jwt({ token, user }) {
      const dbUser = await db.user.findFirst({
        where: {
          email: token.email,
        },
      });

      if (!dbUser) {
        if (user) {
          token.id = user?.id;
        }
        return token;
      }

      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        picture: dbUser.image,
      };
    },
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture;
      }
      return session;
    },
  },
  events: {
    async signIn(message) {
      if (message.isNewUser) {
        await log(`**${message.user.email}** new user logged in`);
      } else {
        await log(`**${message.user.email}** user logged in`);
      }
    },
  },
};

export default authOptions;

export const guard = <T extends z.ZodType, U extends z.ZodType>(
  next: ({
    req,
    user,
    plan,
    body,
    ctx,
  }: {
    req: Request;
    user: User;
    plan: UserSubscriptionPlan;
    body: z.infer<T>;
    ctx: z.infer<U>;
  }) => Promise<Response | any>,
  {
    requiredPlan,
    schemas = {},
  }: {
    requiredPlan?: Plan["title"];
    schemas?: {
      bodySchema?: T;
      contextSchema?: U;
    };
  } = {},
) => {
  return async (req: Request, context: any) => {
    const user = await getUser();
    if (!user) {
      return new Response(null, { status: 401 });
    }
    const plan = await getUserSubscriptionPlanById(user.id);

    if (requiredPlan && requiredPlan === "Pro" && !plan.isPro) {
      return new Response("Upgrade plan to Pro", { status: 401 });
    }
    const { bodySchema, contextSchema } = schemas;

    const validatedData: { bodyData?: any; contextData?: any } = {};

    if (bodySchema) {
      const body = await req.json();
      const parse = bodySchema.safeParse(body);
      if (!parse.success) {
        return new Response(parse.error.issues[0].message, {
          status: 422,
        });
      }
      validatedData.bodyData = parse.data;
    }

    if (contextSchema) {
      const parse = contextSchema.safeParse(context);
      if (!parse.success) {
        return new Response(parse.error.issues[0].message, {
          status: 422,
        });
      }
      validatedData.contextData = parse.data;
    }

    return next({
      req,
      user,
      plan,
      body: validatedData.bodyData,
      ctx: validatedData.contextData,
    });
  };
};
