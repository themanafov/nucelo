import EditorPage from "@/components/editor/page";
import EditorSkeleton from "@/components/editor/skeleton";
import AppShell from "@/components/layout/app-shell";
import { getArticleById } from "@/lib/fetchers/articles";
import { getUser } from "@/lib/fetchers/users";
import { notFound } from "next/navigation";
import { Suspense } from "react";

interface EditorPageProps {
  params: { articleId: string };
}

export async function generateMetadata({ params }: EditorPageProps) {
  const article = await getArticleById(params.articleId);

  if (!article) {
    return notFound();
  }

  return {
    title: article.title,
  };
}

export default async function ArticleEditorPage({ params }: EditorPageProps) {
  const [user, article] = await Promise.all([
    getUser(),
    getArticleById(params.articleId),
  ]);
  if (!article || !user) {
    return notFound();
  }

  return (
    <AppShell>
      <Suspense fallback={<EditorSkeleton />}>
        <EditorPage type="articles" post={article} user={user} />
      </Suspense>
    </AppShell>
  );
}
