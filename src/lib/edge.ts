import { Client } from "@planetscale/database";
import { PrismaPlanetScale } from "@prisma/adapter-planetscale";
import { PrismaClient } from "@prisma/client";

const client = new Client({ url: process.env.DATABASE_URL });
const adapter = new PrismaPlanetScale(client);

export const dbEdge = new PrismaClient({ adapter });

export async function getUserViaEdge(
  username?: string,
  domain?: string,
  userId?: string,
) {
  const user = await dbEdge.user.findUnique({
    where: {
      id: userId,
      username,
      domain,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const isPro =
    user.lsId &&
    user.lsCurrentPeriodEnd &&
    new Date(user.lsCurrentPeriodEnd).getTime() + 86_400_000 > Date.now();

  return {
    userId: user.id,
    isPro,
  };
}
export async function incrementBookmarkClicksViaEdge(
  bookmarkId: string,
  authorId: string,
) {
  return await dbEdge.bookmark.update({
    where: {
      id: bookmarkId,
      authorId,
    },
    data: {
      clicks: {
        increment: 1,
      },
    },
  });
}
export async function incrementProjectViewsViaEdge(
  slug: string,
  authorId: string,
) {
  return await dbEdge.project.update({
    where: {
      authorId_slug: {
        slug,
        authorId,
      },
    },
    data: {
      views: {
        increment: 1,
      },
    },
  });
}

export async function incrementArticleViewsViaEdge(
  slug: string,
  authorId: string,
) {
  return await dbEdge.article.update({
    where: {
      authorId_slug: {
        slug,
        authorId,
      },
    },
    data: {
      views: {
        increment: 1,
      },
    },
  });
}

export async function getBookmarkViaEdge(bookmarkId: string) {
  return await dbEdge.bookmark.findUnique({
    where: {
      id: bookmarkId,
    },
  });
}
