"use client";

import { Article, Project, User } from "@prisma/client";
import { useState } from "react";
import Editor from "..";
import NavButton from "../../layout/nav-button";
import { Icons } from "../../shared/icons";
import PublishButton from "./publish-button";

export type Post = Article | Project;

export interface EditorPageProps {
  post: Post;
  type: "articles" | "projects";
  user: Pick<User, "username" | "newsletter">;
}

export default function EditorPage({ post, type, user }: EditorPageProps) {
  const [saving, setSaving] = useState<boolean>(false);

  return (
    <div className="flex flex-col gap-4 pb-20">
      <header className="flex flex-row justify-between gap-2">
        <div className="flex flex-1 flex-row gap-2">
          <NavButton
            href={`/${type}`}
            icon="arrowLeft"
            size="icon"
            aria-label={`Back to ${type}`}
          />
          <NavButton
            href={`/${type}/${post.id}/settings`}
            icon="settings"
            size="icon"
            aria-label={`Go to ${type.slice(0, -1)} settings`}
          />
          {(post.published || post.views > 0) && (
            <NavButton
              href={`/${type}/${post.id}/analytics`}
              icon="areaChart"
              size="icon"
              aria-label={`Go to ${type.slice(0, -1)} analytics`}
            />
          )}
        </div>
        {post.published && (
          <NavButton
            href={`https://${user.username}.nucelo.co/${type}/${post.slug}`}
            target="_blank"
            variant="text"
            aria-label={`Open ${type.slice(0, -1)}`}
            icon="arrowUpRight"
          />
        )}
        <span className="flex h-4.5 w-max flex-row items-center gap-1 self-end rounded-md text-xs text-gray-4">
          {saving ? (
            <>
              <Icons.spinner className="animate-spin" size={15} /> Saving
            </>
          ) : (
            <>Saved</>
          )}
        </span>
        <PublishButton
          post={post}
          type={type}
          user={user}
          setSaving={setSaving}
        />
      </header>
      <Editor
        endpoint={`${type}/${post.id}`}
        title={post.title}
        content={post.content}
        method="PATCH"
        setSaving={setSaving}
      />
    </div>
  );
}
