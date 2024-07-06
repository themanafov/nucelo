import { deleteCollection, updateCollection } from "@/lib/actions/collections";
import { guard } from "@/lib/auth";
import { collectionSchema } from "@/lib/validations/bookmark";
import * as z from "zod";

const routeContextSchema = z.object({
  params: z.object({
    collectionId: z.string().min(1),
  }),
});

export const PATCH = guard(
  async ({ user, body, ctx }) => {
    try {
      const { params } = ctx;

      await updateCollection(params.collectionId, user.id, body);

      return new Response(null, { status: 200 });
    } catch (err) {
      return new Response(null, { status: 500 });
    }
  },
  {
    schemas: {
      contextSchema: routeContextSchema,
      bodySchema: collectionSchema,
    },
  },
);

export const DELETE = guard(
  async ({ user, ctx }) => {
    try {
      const { params } = ctx;

      await deleteCollection(params.collectionId, user.id);

      return new Response(null, { status: 200 });
    } catch (err) {
      return new Response(null, { status: 500 });
    }
  },
  {
    schemas: {
      contextSchema: routeContextSchema,
    },
  },
);
