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
import readingTime from "reading-time";
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

  const path = `/articles/${article.slug}`;
  return generateSEO({
    title: article.title,
    description: article.seoDescription || undefined,
    image:
      article.ogImage ||
      `https://nucelo.com/api/og/post?title=${article.title}&username=${user.username || user.name}`,
    canonicalURL: article.canonicalURL || undefined,
    url: user.domain
      ? `https://${user.domain}${path}`
      : `https://${user.username}.${process.env.NEXT_PUBLIC_USER_DOMAIN}${path}`,
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
      <GoBack />
      <AppHeader
        title={article?.title as string}
        className="gap-2 flex-col items-start mb-4"
      >
        <div className="w-full flex flex-row justify-between items-center gap-2 text-sm text-gray-4">
          <div className="flex gap-2 items-center">
            <p>
              {`${formatDate(article.publishedAt)} ( ${moment(article.publishedAt).fromNow()} )`}
            </p>
            <span>•</span>
            <p>{readingTime(article.content as string).text}</p>
          </div>
          <span>{article.views} views</span>
        </div>
      </AppHeader>
      <MDX source={article.content} />
      <div className="mt-5 max-md:hidden">
        <GoBack />
      </div>
    </AppShell>
  );
}

function GoBack() {
  return (
    <NavButton
      variant="text"
      className="flex-row-reverse"
      href="/articles"
      icon="arrowLeft"
      aria-label="Back to Articles"
    >
      Back to Articles
    </NavButton>
  );
}
