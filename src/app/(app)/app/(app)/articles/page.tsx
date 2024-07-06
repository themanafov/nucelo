import Article from "@/components/articles/article";
import NewArticle from "@/components/articles/article-create-button";
import NoArticlesPlaceholder from "@/components/articles/no-articles-placeholder";
import AppShell from "@/components/layout/app-shell";
import AppHeader from "@/components/layout/header";
import PostsFilter from "@/components/layout/posts-filter";
import { getArticles } from "@/lib/fetchers/articles";
import { sortArticles } from "@/lib/utils";
import { Metadata } from "next";

interface Props {
  searchParams: {
    published?: "true" | "false";
  };
}
export const metadata: Metadata = {
  title: "Articles",
};

export default async function Articles({ searchParams: { published } }: Props) {
  const articles = await getArticles();
  const sortedArticles = sortArticles(articles, published);
  return (
    <AppShell>
      <AppHeader title="Articles">
        <NewArticle />
      </AppHeader>
      <PostsFilter segment="articles" current={published} />
      <div>
        {sortedArticles.map((article) => (
          <Article article={article} key={article.id} admin />
        ))}
        {!sortedArticles.length && <NoArticlesPlaceholder description />}
      </div>
    </AppShell>
  );
}