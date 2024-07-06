import Analytics from "@/components/analytics";
import AnalyticsSkeleton from "@/components/analytics/skeleton";
import Upgrade from "@/components/shared/upgrade";
import { getProjectById } from "@/lib/fetchers/projects";
import { getUserSubscriptionPlan } from "@/lib/subscription";
import { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Analytics",
};

export default async function ProjectAnalytics({
  params,
}: {
  params: { projectId: string };
}) {
  const [project, plan] = await Promise.all([
    getProjectById(params.projectId),
    getUserSubscriptionPlan(),
  ]);

  if (!project) {
    return notFound();
  }
  if (!plan.isPro) {
    return <Upgrade className="relative py-10" />;
  }

  if (!project.published && project.views === 0) {
    redirect(`/projects/${project.id}`);
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
