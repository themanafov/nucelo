"use server";
import { db } from "../db";
import getCurrentUser from "../session";

export async function getProject({
  authorId,
  slug,
  published,
}: {
  authorId: string;
  slug: string;
  published?: boolean;
}) {
  return await db.project.findUnique({
    where: {
      authorId_slug: {
        slug,
        authorId,
      },
      published,
    },
  });
}

export async function getProjectById(projectId: string) {
  const session = await getCurrentUser();
  return await db.project.findUnique({
    where: {
      id: projectId,
      authorId: session?.id,
    },
  });
}

export async function getProjects({
  limit,
  published,
}: {
  limit?: number;
  published?: boolean;
} = {}) {
  const user = await getCurrentUser();
  return await db.project.findMany({
    where: {
      authorId: user?.id,
      published: published,
    },
    take: limit,
    orderBy: {
      year: "desc",
    },
  });
}

export async function getProjectsByAuthor(
  authorId: string,
  limit?: number,
  published = true,
) {
  return await db.project.findMany({
    where: {
      authorId,
      published,
    },
    take: limit,
    orderBy: {
      year: "desc",
    },
  });
}
