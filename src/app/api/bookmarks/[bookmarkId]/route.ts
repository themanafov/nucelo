import { deleteBookmark, updateBookmark } from "@/lib/actions/bookmarks";
import { guard } from "@/lib/auth";
import { bookmarkSchema } from "@/lib/validations/bookmark";
import * as z from "zod";

const routeContextSchema = z.object({
  params: z.object({
    bookmarkId: z.string().min(1),
  }),
});

export const PATCH = guard(
  async ({ user, body, ctx }) => {
    try {
      const { params } = ctx;

      await updateBookmark(params.bookmarkId, user.id, body);

      return new Response(null, { status: 200 });
    } catch (err) {
      return new Response(null, { status: 500 });
    }
  },
  {
    schemas: {
      contextSchema: routeContextSchema,
      bodySchema: bookmarkSchema,
    },
  },
);

export const DELETE = guard(
  async ({ user, ctx }) => {
    try {
      const { params } = ctx;

      await deleteBookmark(params.bookmarkId, user.id);

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
