"use server";
import { db } from "../db";
import getCurrentUser from "../session";

export async function getBookmarksByAuthor(author: string, limit?: number) {
  return await db.bookmark.findMany({
    where: {
      authorId: author,
    },
    take: limit,
    orderBy: {
      createdAt: "desc",
    },
    include: {
      collection: {
        select: {
          id: true,
          name: true,
          authorId: true,
        },
      },
    },
  });
}

export async function getBookmarks(limit?: number) {
  const user = await getCurrentUser();
  return await db.bookmark.findMany({
    where: {
      authorId: user?.id,
    },
    take: limit,
    orderBy: {
      createdAt: "desc",
    },
    include: {
      collection: true,
    },
  });
}

export async function getBookmarksByCollection(collectionName: string) {
  const user = await getCurrentUser();
  return await db.bookmark.findMany({
    where: {
      authorId: user?.id,
      collection: {
        name: collectionName === "all" ? undefined : collectionName,
      },
    },
    select: {
      id: true,
      title: true,
      url: true,
      clicks: true,
      collection: true,
    },
  });
}

export async function getBookmarkById(bookmarkId: string) {
  const session = await getCurrentUser();
  return await db.bookmark.findUnique({
    where: {
      id: bookmarkId,
      authorId: session?.id,
    },
  });
}
