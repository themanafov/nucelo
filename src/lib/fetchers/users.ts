"use server";
import { getServerSession } from "next-auth";
import authOptions from "../auth";
import { db } from "../db";

export async function getUser() {
  const session = await getServerSession(authOptions);
  return await db.user.findUnique({
    where: {
      id: session?.user.id,
    },
  });
}

export async function getUserByDomain(domain: string) {
  return await db.user.findFirst({
    where: {
      OR: [
        {
          domain,
        },
        {
          username: domain,
        },
      ],
    },
  });
}

export async function getUserById({
  id,
  username,
}: {
  id?: string;
  username?: string;
}) {
  return await db.user.findFirst({
    where: {
      id: id,
      username: username,
    },
  });
}

export async function getAllUserDomains() {
  return await db.user.findMany({
    select: {
      username: true,
      domain: true,
    },
  });
}
