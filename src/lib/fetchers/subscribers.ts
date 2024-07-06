"use server";
import { db } from "../db";

export async function getSubscribersByUserId(userId: string) {
  return await db.subscriber.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}
