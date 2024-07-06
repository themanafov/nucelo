import {
  getAnalytics,
  IntervalProps,
  ZodAnalyticsProperty,
} from "@/lib/analytics";
import { guard } from "@/lib/auth";
import { getSearchParams } from "@/lib/utils";
import { NextResponse } from "next/server";
import * as z from "zod";

const routeContextSchema = z.object({
  params: z.object({
    property: ZodAnalyticsProperty,
  }),
});

export const GET = guard(
  async ({ req, user, ctx }) => {
    try {
      const { property } = ctx.params;

      const searchParams: { interval?: IntervalProps } = getSearchParams(
        req.url,
      );

      const data = await getAnalytics({
        property,
        interval: searchParams.interval || "7d",
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
