"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import Button from "../ui/button";
import { toast } from "../ui/use-toast";

export default function NewArticle() {
  const [isLoading, startTransition] = useTransition();
  const router = useRouter();
  async function onClick() {
    startTransition(async () => {
      const article = await createArticle();
      if (article) {
        router.push(`/articles/${article.id}`);
        router.refresh();
      }
    });
  }

  return (
    <Button
      onClick={onClick}
      size="sm"
      variant="secondary"
      isPending={isLoading}
      aria-label="Write new Article"
    >
      New article
    </Button>
  );
}

export async function createArticle() {
  const res = await fetch("/api/articles", {
    method: "POST",
    body: JSON.stringify({
      title: "Untitled article",
      content: "My new article",
    }),
  });

  if (!res?.ok) {
    const body = await res.text();

    toast({
      title: "Something went wrong.",
      description: body,
    });
    return null;
  }
  return await res.json();
}
