import Analytics from "@/components/analytics";
import AnalyticsSkeleton from "@/components/analytics/skeleton";
import Upgrade from "@/components/shared/upgrade";
import { getProjectById } from "@/lib/fetchers/projects";
import { getUserSubscription } from "@/lib/subscription";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Analytics",
};

export default async function ProjectAnalytics({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const [project, plan] = await Promise.all([
    getProjectById((await params).projectId),
    getUserSubscription(),
  ]);

  if (!project) {
    return notFound();
  }

  if (!plan.isPro) {
    return <Upgrade className="relative py-10" />;
  }

  return (
    <Suspense fallback={<AnalyticsSkeleton />}>
      <Analytics
        basePath={`/api/projects/${project.id}`}
        title="Project analytics"
        index="views"
      />
    </Suspense>
  );
}
