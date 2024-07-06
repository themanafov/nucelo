import { verifyProjectAccess } from "@/lib/actions/projects";
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
    projectId: z.string().min(1),
    property: ZodAnalyticsProperty,
  }),
});

export const GET = guard(
  async ({ req, user, ctx }) => {
    try {
      const { params } = ctx;

      const project = await db.project.findFirst({
        where: {
          id: params.projectId,
          authorId: user.id,
        },
      });

      if (!project) {
        return new Response("Project not found", {
          status: 404,
        });
      }

      if (!(await verifyProjectAccess(project.id, user.id))) {
        return new Response(null, { status: 403 });
      }
      const searchParams: { interval?: IntervalProps } = getSearchParams(
        req.url,
      );

      const data = await getAnalytics({
        property: params.property,
        interval: searchParams.interval,
        page: `/projects/${project.slug}`,
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
