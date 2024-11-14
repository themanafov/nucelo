import { Post } from "@/components/editor/page";
import { getArticlesByAuthor } from "@/lib/fetchers/articles";
import { getBookmarksByAuthor } from "@/lib/fetchers/bookmarks";
import { getProjectsByAuthor } from "@/lib/fetchers/projects";
import { getUserByDomain } from "@/lib/fetchers/users";
import { getSearchParams } from "@/lib/utils";
import { Article } from "@prisma/client";
import { Feed } from "feed";

function isPostArticle(post: Post): post is Article {
  return (post as Article).publishedAt !== undefined;
}

export async function GET(
  req: Request,
  context: { params: { domain: string } },
) {
  const { type = "rss" } = getSearchParams(req.url) as {
    type?: "rss" | "atom";
  };
  const user = await getUserByDomain(context.params.domain);
  if (!user) {
    return new Response(null, { status: 404 });
  }
  const id = `https://${user.domain ?? `${user.username}.${process.env.NEXT_PUBLIC_USER_DOMAIN}`}`;
  const name = user.name || user.username;
  const author = {
    name,
    link: id,
  };
  const feed = new Feed({
    id,
    title: name,
    link: id,
    description: user.about!,
    image: user.ogImage!,
    favicon: user.image!,
    copyright: `All rights reserved ${new Date().getFullYear()}, ${name}`,
    feedLinks: {
      atom: `${id}/feed?type=atom`,
    },
    author,
  });

  const [articles, projects, bookmarks] = await Promise.all([
    getArticlesByAuthor(user.id),
    getProjectsByAuthor(user.id),
    getBookmarksByAuthor(user.id),
  ]);

  const posts = [...articles, ...projects];
  posts.forEach((post) => {
    const isArticle = isPostArticle(post);
    const postId = `${id}/${isArticle ? "articles" : "projects"}/${post.slug}`;
    const publishedAt = isArticle ? post.publishedAt : post.createdAt;
    feed.addItem({
      id: postId,
      title: post.title,
      link: postId,
      description: post.seoDescription!,
      author: [author],
      contributor: [author],
      date: publishedAt,
      published: publishedAt,
      image: post.ogImage!,
      category: [
        {
          name: isArticle ? "Articles" : "Projects",
        },
      ],
    });
  });
  bookmarks.forEach((bookmark) => {
    const [url, updatedAt] = [bookmark.url, bookmark.updatedAt];
    feed.addItem({
      id: url,
      title: bookmark.title,
      link: url,
      author: [author],
      contributor: [author],
      date: updatedAt,
      published: updatedAt,
      category: [
        {
          name: "Bookmarks",
        },
      ],
    });
  });

  return new Response(type === "atom" ? feed.atom1() : feed.rss2(), {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}
