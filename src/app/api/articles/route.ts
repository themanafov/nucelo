import { createArticle } from "@/lib/actions/articles";
import { guard } from "@/lib/auth";
import { db } from "@/lib/db";
import { articleCreateSchema } from "@/lib/validations/article";

export const POST = guard(
  async ({ user, plan, body }) => {
    try {
      const articlesCount = await db.article.count({
        where: {
          authorId: user.id,
        },
      });

      if (articlesCount >= 3 && !plan.isPro) {
        return new Response(
          "If you want to share more than 3 articles, upgrade the plan to Pro",
          { status: 401 },
        );
      }
      const article = await createArticle(user.id, body);

      return new Response(JSON.stringify({ id: article.id }), {
        status: 200,
      });
    } catch (err) {
      return new Response(JSON.stringify(err), { status: 500 });
    }
  },
  {
    schemas: {
      bodySchema: articleCreateSchema,
    },
  },
);
