import { guard } from "@/lib/auth";
import { getArticleExport } from "@/lib/fetchers/articles";
import * as z from "zod";

const contextSchema = z.object({
  params: z.object({
    articleId: z.string(),
  }),
});

export const GET = guard(
  async ({
    user,
    ctx: {
      params: { articleId },
    },
  }) => {
    try {
      const { filename, content } = await getArticleExport(articleId, user.id);

      return new Response(content, {
        headers: {
          "Content-Type": "application/markdown",
          "Content-Disposition": `attachment; filename=${filename}`,
        },
      });
    } catch (err) {
      if (err instanceof Error) {
        return new Response(JSON.stringify(err.message), { status: 500 });
      }

      return new Response(JSON.stringify(err), { status: 500 });
    }
  },

  {
    schemas: {
      contextSchema,
    },
  },
);
