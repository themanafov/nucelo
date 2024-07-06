"use server";
import { db } from "../db";
import getCurrentUser from "../session";

export async function getCollections() {
  const user = await getCurrentUser();
  return await db.collection.findMany({
    where: {
      authorId: user?.id,
    },
    include: {
      bookmarks: true,
    },
  });
}

export async function getCollectionsByAuthor(authorId: string, limit?: number) {
  return await db.collection.findMany({
    where: {
      authorId,
    },
    take: limit,
  });
}
