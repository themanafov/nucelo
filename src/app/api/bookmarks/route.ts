import { createBookmark } from "@/lib/actions/bookmarks";
import { guard } from "@/lib/auth";
import { db } from "@/lib/db";
import { bookmarkSchema } from "@/lib/validations/bookmark";

export const POST = guard(
  async ({ user, plan, body }) => {
    try {
      const bookmarksCount = await db.bookmark.count({
        where: {
          authorId: user.id,
        },
      });

      if (typeof plan.maxPostLimit === "number" && bookmarksCount >= plan.maxPostLimit && !plan.isPro) {
        return new Response(
          `If you want to share more than ${plan.maxPostLimit} bookmark(s), upgrade the plan to Pro`,
          { status: 403 },
        );
      }
      await createBookmark(user.id, body);

      return new Response(null, { status: 200 });
    } catch (err) {
      return new Response(JSON.stringify(err), { status: 500 });
    }
  },
  {
    schemas: {
      bodySchema: bookmarkSchema,
    },
  },
);
