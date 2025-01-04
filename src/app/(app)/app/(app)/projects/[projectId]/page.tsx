import EditorPage from "@/components/editor/page";
import EditorSkeleton from "@/components/editor/skeleton";
import AppShell from "@/components/layout/app-shell";
import { getProjectById } from "@/lib/fetchers/projects";
import { getUser } from "@/lib/fetchers/users";
import { notFound } from "next/navigation";
import { Suspense } from "react";

interface ProjectEditorPageProps {
  params: Promise<{ projectId: string }>;
}

export async function generateMetadata({
  params,
}: {
  params: ProjectEditorPageProps["params"];
}) {
  const project = await getProjectById((await params).projectId);

  if (!project) {
    return notFound();
  }

  return {
    title: project.title,
  };
}

export default async function ProjectEditorPage({
  params,
}: ProjectEditorPageProps) {
  const [user, project] = await Promise.all([
    getUser(),
    getProjectById((await params).projectId),
  ]);

  if (!project || !user) {
    return notFound();
  }

  return (
    <AppShell>
      <Suspense fallback={<EditorSkeleton />}>
        <EditorPage type="projects" post={project} user={user} />
      </Suspense>
    </AppShell>
  );
}
