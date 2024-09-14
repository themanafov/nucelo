import Article from "@/components/articles/article";
import { Icons } from "@/components/shared/icons";
import type { Article as ArticleProps } from "@prisma/client";
import Link from "next/link";

export default function Articles({ articles }: { articles: ArticleProps[] }) {
  if (!articles.length) {
    return null;
  }

  return (
    <dl className="section-container">
      <dt className="section-title link group">
        <Link
          href="/articles"
          className="absolute w-full h-full"
          aria-label="View All Articles"
        />
        <h3>Writing</h3>
        <Icons.arrowRight
          size={16}
          className="text-gray-4 group-hover:text-secondary"
        />
      </dt>

      <dd className="section-content">
        {articles.map((article) => (
          <Article article={article} key={article.id} />
        ))}
      </dd>
    </dl>
  );
}
