import { verifyArticleAccess } from "@/lib/actions/articles";
import {
  analyticsSearchParamsSchema,
  getAnalytics,
  ZodAnalyticsProperty,
} from "@/lib/analytics";
import { guard } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import * as z from "zod";

const routeContextSchema = z.object({
  params: z.object({
    articleId: z.string().min(1),
    property: ZodAnalyticsProperty,
  }),
});

export const GET = guard(
  async ({
    user,
    ctx: {
      params: { articleId, property },
    },
    searchParams: { interval },
  }) => {
    try {
      const article = await db.article.findFirst({
        where: {
          id: articleId,
          authorId: user.id,
        },
      });

      if (!article) {
        return new Response("Article not found", {
          status: 404,
        });
      }
      if (!(await verifyArticleAccess(article.id, user.id))) {
        return new Response(null, { status: 403 });
      }

      const data = await getAnalytics({
        property,
        interval,
        page: `/articles/${article.slug}`,
        userId: user.id,
      });

      return NextResponse.json(data);
    } catch (err) {
      return new Response(JSON.stringify(err), { status: 500 });
    }
  },
  {
    requiredPlan: "Pro",
    schemas: {
      contextSchema: routeContextSchema,
      searchParamsSchema: analyticsSearchParamsSchema,
    },
  },
);
