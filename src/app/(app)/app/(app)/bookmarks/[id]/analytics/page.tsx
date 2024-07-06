import Analytics from "@/components/analytics";
import AnalyticsSkeleton from "@/components/analytics/skeleton";
import Upgrade from "@/components/shared/upgrade";
import { getBookmarkById } from "@/lib/fetchers/bookmarks";
import { getUserSubscriptionPlan } from "@/lib/subscription";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Analytics",
};

export default async function BookmarkAnalytics({
  params,
}: {
  params: { id: string };
}) {
  const [bookmark, plan] = await Promise.all([
    getBookmarkById(params.id),
    getUserSubscriptionPlan(),
  ]);

  if (!bookmark) {
    return notFound();
  }
  if (!plan.isPro) {
    return <Upgrade className="relative py-10" />;
  }
  return (
    <Suspense fallback={<AnalyticsSkeleton />}>
      <Analytics
        basePath={`/api/bookmarks/${bookmark.id}`}
        index="clicks"
        title="Bookmark analytics"
      />
    </Suspense>
  );
}
