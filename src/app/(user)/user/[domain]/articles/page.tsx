import Article from "@/components/articles/article";
import NoArticlesPlaceholder from "@/components/articles/no-articles-placeholder";
import AppShell from "@/components/layout/app-shell";
import AppHeader from "@/components/layout/header";
import { getArticlesByAuthor } from "@/lib/fetchers/articles";
import { getUserByDomain } from "@/lib/fetchers/users";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Subscribe from "./components/subscribe";

export const metadata: Metadata = {
  title: "Writing",
};
interface ArticlesPageProps {
  params: {
    domain: string;
  };
}
export default async function ArticlesPage({ params }: ArticlesPageProps) {
  const domain = decodeURIComponent(params.domain);
  const user = await getUserByDomain(domain);
  if (!user) {
    return notFound();
  }
  const articles = await getArticlesByAuthor(user.id);

  return (
    <AppShell>
      <AppHeader title="Articles">
        {user.newsletter && <Subscribe username={user.username} />}
      </AppHeader>
      <div>
        {articles.map((article) => (
          <Article article={article} key={article.id} />
        ))}
        {!articles.length && <NoArticlesPlaceholder />}
      </div>
    </AppShell>
  );
}