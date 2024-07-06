import AppShell from "@/components/layout/app-shell";
import AppHeader from "@/components/layout/header";
import NavButton from "@/components/layout/nav-button";
import MDX from "@/components/markdown/mdx";
import { getArticle, getArticlesByAuthor } from "@/lib/fetchers/articles";
import { getUserByDomain } from "@/lib/fetchers/users";
import { formatDate, generateSEO } from "@/lib/utils";
import moment from "moment";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const revalidate = 60;

interface ArticlePageProps {
  params: { slug: string; domain: string };
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata | null> {
  const domain = decodeURIComponent(params.domain);
  const user = await getUserByDomain(domain);
  if (!user) {
    return notFound();
  }

  const article = await getArticle({
    authorId: user.id,
    slug: params.slug,
    published: true,
  });

  if (!article) {
    return notFound();
  }

  return generateSEO({
    title: article.title,
    description: article.seoDescription || undefined,
    image:
      article.ogImage ||
      `https://nucelo.com/api/og/post?title=${article.title}&username=${user.username || user.name}`,
  });
}

export async function generateStaticParams({ params }: ArticlePageProps) {
  const domain = decodeURIComponent(params.domain);
  const user = await getUserByDomain(domain);
  const articles = await getArticlesByAuthor(user?.id as string);

  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const domain = decodeURIComponent(params.domain);
  const user = await getUserByDomain(domain);
  if (!user) {
    return notFound();
  }
  const article = await getArticle({
    authorId: user.id,
    slug: params.slug,
    published: true,
  });

  if (!article) {
    return notFound();
  }
  return (
    <AppShell>
      <NavButton
        variant="text"
        className="flex-row-reverse"
        href="/articles"
        icon="arrowLeft"
        aria-label="Back to Articles"
      >
        Back to Articles
      </NavButton>
      <AppHeader
        title={article?.title as string}
        className="gap-2 [&_.title]:text-xl flex-col items-start mb-4"
      >
        <div className="w-full flex flex-row justify-between items-center gap-2 text-sm text-gray-4">
          <span>
            {formatDate(article.publishedAt) +
              ` ( ${moment(article.publishedAt).fromNow()} )`}
          </span>
          <span>{article.views} views</span>
        </div>
      </AppHeader>
      <MDX source={article.content} />
    </AppShell>
  );
}
