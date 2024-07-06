import { verifyArticleAccess } from "@/lib/actions/articles";
import {
  getAnalytics,
  IntervalProps,
  ZodAnalyticsProperty,
} from "@/lib/analytics";
import { guard } from "@/lib/auth";
import { db } from "@/lib/db";
import { getSearchParams } from "@/lib/utils";
import { NextResponse } from "next/server";
import * as z from "zod";

const routeContextSchema = z.object({
  params: z.object({
    articleId: z.string().min(1),
    property: ZodAnalyticsProperty,
  }),
});

export const GET = guard(
  async ({ req, user, ctx }) => {
    try {
      const { articleId, property } = ctx.params;

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

      const searchParams: { interval?: IntervalProps } = getSearchParams(
        req.url,
      );

      const data = await getAnalytics({
        property: property,
        interval: searchParams.interval,
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
    },
  },
);
