import { deleteSubscriber } from "@/lib/actions/subscribers";
import { guard } from "@/lib/auth";
import * as z from "zod";

const routeContextSchema = z.object({
  params: z.object({
    id: z.string().min(1),
  }),
});

export const DELETE = guard(
  async ({ user, ctx }) => {
    try {
      const { id } = ctx.params;

      await deleteSubscriber(id, user.id);

      return new Response(null, { status: 200 });
    } catch (err) {
      return new Response(null, { status: 500 });
    }
  },
  { requiredPlan: "Pro", schemas: { contextSchema: routeContextSchema } },
);
