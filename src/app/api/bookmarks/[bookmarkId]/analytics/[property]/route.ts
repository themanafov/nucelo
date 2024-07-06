import { verifyBookmarkAccess } from "@/lib/actions/bookmarks";
import {
  getBookmarkAnalytics,
  IntervalProps,
  ZodAnalyticsProperty,
} from "@/lib/analytics";
import { guard } from "@/lib/auth";
import { getSearchParams } from "@/lib/utils";
import { NextResponse } from "next/server";
import * as z from "zod";

const routeContextSchema = z.object({
  params: z.object({
    bookmarkId: z.string().min(1),
    property: ZodAnalyticsProperty,
  }),
});

export const GET = guard(
  async ({ req, user, ctx }) => {
    try {
      const { params } = ctx;
      if (!(await verifyBookmarkAccess(params.bookmarkId, user.id))) {
        return new Response(null, { status: 403 });
      }

      const searchParams: { interval?: IntervalProps } = getSearchParams(
        req.url,
      );

      const data = await getBookmarkAnalytics({
        id: params.bookmarkId,
        property: params.property,
        interval: searchParams.interval,
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
