import { recordClick } from "@/lib/tinybird";
import { NextRequest } from "next/server";
import * as z from "zod";

export const runtime = "edge";

const routeContextSchema = z.object({
  params: z.object({
    id: z.string().min(1),
  }),
});

export async function GET(
  req: NextRequest,
  context: z.infer<typeof routeContextSchema>,
) {
  const ctx = routeContextSchema.safeParse(context);
  if (!ctx.success) {
    return new Response(ctx.error.issues[0].message, {
      status: 422,
    });
  }

  return recordClick(req, ctx.data.params.id);
}
