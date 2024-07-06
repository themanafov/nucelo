import { createCollection } from "@/lib/actions/collections";
import { guard } from "@/lib/auth";
import { collectionSchema } from "@/lib/validations/bookmark";

export const POST = guard(
  async ({ user, body }) => {
    try {
      await createCollection(user.id, body);
      return new Response(null, { status: 200 });
    } catch (err) {
      return new Response(null, { status: 500 });
    }
  },
  {
    schemas: {
      bodySchema: collectionSchema,
    },
  },
);
