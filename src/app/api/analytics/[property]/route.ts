import {
  ZodAnalyticsProperty,
  analyticsSearchParamsSchema,
  getAnalytics,
} from "@/lib/analytics";
import { guard } from "@/lib/auth";
import { NextResponse } from "next/server";
import * as z from "zod";

const routeContextSchema = z.object({
  params: z.object({
    property: ZodAnalyticsProperty,
  }),
});

export const GET = guard(
  async ({
    user,
    ctx: {
      params: { property },
    },
    searchParams: { interval },
  }) => {
    try {
      const data = await getAnalytics({
        property,
        interval,
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
