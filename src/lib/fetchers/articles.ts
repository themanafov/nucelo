"use server";
import { db } from "../db";
import getCurrentUser from "../session";

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
