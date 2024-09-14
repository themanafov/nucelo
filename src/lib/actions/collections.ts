"use server";
import type * as z from "zod";
import { db } from "../db";
import type { collectionSchema } from "../validations/bookmark";

type Schema = z.infer<typeof collectionSchema>;

export async function createCollection(authorId: string, data: Schema) {
  return await db.collection.create({
    data: {
      ...data,
      authorId,
    },
  });
}

export async function updateCollection(
  collectionId: string,
  authorId: string,
  data: Schema,
) {
  return await db.collection.update({
    where: {
      id: collectionId,
      authorId,
    },
    data,
  });
}

export async function deleteCollection(collectionId: string, authorId: string) {
  const collection = await db.collection.delete({
    where: {
      id: collectionId,
      authorId,
    },
  });

  return collection.id;
}

export async function verifyCollectionAccess(
  collectionId: string,
  authorId: string,
) {
  const isExist = await db.collection.count({
    where: {
      id: collectionId,
      authorId,
    },
  });

  return isExist > 0;
}
