import { recordClick } from "@/lib/tinybird";
import type { NextRequest } from "next/server";
import * as z from "zod";

export const runtime = "edge";

const paramsSchema = z.object({
  id: z.string().min(1),
});

export async function GET(
  req: NextRequest,
  context: { params: Promise<z.infer<typeof paramsSchema>> },
) {
  const ctx = paramsSchema.safeParse(await context.params);
  if (!ctx.success) {
    return new Response(ctx.error.issues[0].message, {
      status: 422,
    });
  }

  return recordClick(req, ctx.data.id);
}
