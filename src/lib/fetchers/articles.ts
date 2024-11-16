"use server";
import { ExportResponse } from "@/types";
import { verifyArticleAccess } from "../actions/articles";
import { db } from "../db";
import getCurrentUser from "../session";
import { formatVerboseDate, jsonToFrontmatter } from "../utils";

export async function getArticle({
  authorId,
  slug,
  published,
}: {
  authorId: string;
  slug: string;
  published?: boolean;
}) {
  return await db.article.findUnique({
    where: {
      authorId_slug: {
        slug,
        authorId,
      },
      published,
    },
  });
}

export async function getArticleByAuthor(articleId: string, authorId: string) {
  return await db.article.findUnique({
    where: {
      id: articleId,
      authorId,
    },
  });
}

export async function getArticleById(articleId: string) {
  const session = await getCurrentUser();
  return await db.article.findUnique({
    where: {
      id: articleId,
      authorId: session?.id,
    },
  });
}

export async function getArticles({
  limit,
  published,
}: {
  limit?: number;
  published?: boolean;
} = {}) {
  const user = await getCurrentUser();
  return await db.article.findMany({
    where: {
      authorId: user?.id,
      published,
    },
    take: limit,
    orderBy: {
      publishedAt: "desc",
    },
  });
}

export async function getArticlesByAuthor(
  authorId: string,
  limit?: number,
  published = true,
) {
  return await db.article.findMany({
    where: {
      authorId,
      published,
    },
    take: limit,
    orderBy: {
      publishedAt: "desc",
    },
  });
}

export async function getArticleExport(
  articleId: string,
  authorId: string,
): Promise<ExportResponse> {
  const article = await db.article.findFirst({
    where: {
      id: articleId,
      authorId,
    },
    omit: {
      authorId: true,
    },
  });

  if (!article) {
    throw new Error("Article not found");
  }

  if (!(await verifyArticleAccess(article.id, authorId))) {
    throw new Error("Permission denied");
  }

  const filename = `nucelo_export_article_${article.slug}.md`;
  const {
    content: articleContent,
    createdAt,
    updatedAt,
    publishedAt,
    ...props
  } = article;
  const frontmatter = jsonToFrontmatter({
    ...props,
    createdAt: formatVerboseDate(createdAt),
    updatedAt: formatVerboseDate(updatedAt),
    publishedAt: formatVerboseDate(publishedAt),
  });
  const content = frontmatter + articleContent!;

  return { content, filename };
}

export async function getArticlesExport(authorId: string) {
  const articles = await db.article.findMany({
    where: {
      authorId,
    },
  });

  const data = await Promise.all(
    articles.map(
      async (article) => await getArticleExport(article.id, article.authorId),
    ),
  );

  return data;
}
