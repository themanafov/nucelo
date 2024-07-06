import Analytics from "@/components/analytics";
import AnalyticsSkeleton from "@/components/analytics/skeleton";
import Upgrade from "@/components/shared/upgrade";
import { getArticleById } from "@/lib/fetchers/articles";
import { getUserSubscriptionPlan } from "@/lib/subscription";
import { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Analytics",
};

interface Props {
  params: {
    articleId: string;
  };
}

export default async function ArticleAnalytics({ params }: Props) {
  const [article, plan] = await Promise.all([
    getArticleById(params.articleId),
    getUserSubscriptionPlan(),
  ]);

  if (!article) {
    return notFound();
  }
  if (!plan.isPro) {
    return <Upgrade className="relative py-10" />;
  }

  if (!article.published && article.views === 0) {
    redirect(`/projects/${article.id}`);
  }
  return (
    <Suspense fallback={<AnalyticsSkeleton />}>
      <Analytics
        basePath={`/api/articles/${article.id}`}
        title="Article analytics"
        index="views"
      />
    </Suspense>
  );
}
