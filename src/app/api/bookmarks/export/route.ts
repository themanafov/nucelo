import { guard } from "@/lib/auth";
import { getBookmarksExport } from "@/lib/fetchers/bookmarks";

export const GET = guard(async ({ user }) => {
  try {
    const { filename, content } = await getBookmarksExport(user.id);
    return new Response(content, {
      headers: {
        "Content-Type": "application/csv",
        "Content-Disposition": `attachment; filename=${filename}`,
      },
    });
  } catch (err) {
    if (err instanceof Error) {
      return new Response(JSON.stringify(err.message), { status: 500 });
    }

    return new Response(JSON.stringify(err), { status: 500 });
  }
});
