import Bookmark from "@/components/bookmarks/bookmark";
import CollectionBar from "@/components/bookmarks/collections/collections-bar";
import NoBookmarksPlaceholder from "@/components/bookmarks/no-bookmarks-placeholder";
import AppShell from "@/components/layout/app-shell";
import AppHeader from "@/components/layout/header";
import { getBookmarksByAuthor } from "@/lib/fetchers/bookmarks";
import { getCollectionsByAuthor } from "@/lib/fetchers/collections";
import { getUserByDomain } from "@/lib/fetchers/users";
import { sortBookmarks } from "@/lib/utils";
import { Collection } from "@prisma/client";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Bookmarks",
};

interface BookmarksPageProps {
  params: {
    domain: string;
  };
  searchParams: {
    collection?: string;
  };
}

export default async function Bookmarks({
  params,
  searchParams: { collection },
}: BookmarksPageProps) {
  const domain = decodeURIComponent(params.domain);
  const user = await getUserByDomain(domain);
  if (!user) {
    return notFound();
  }
  const [collections, bookmarks] = await Promise.all([
    getCollectionsByAuthor(user.id),
    getBookmarksByAuthor(user.id),
  ]);
  const sortedBookmarks = sortBookmarks(bookmarks, collection);
  return (
    <AppShell>
      <AppHeader title="Bookmarks" />
      <CollectionBar collections={collections} currentCollection={collection} />
      <div className="w-full flex flex-col">
        {sortedBookmarks.map((bookmark) => (
          <Bookmark
            bookmark={bookmark}
            collection={bookmark?.collection as Collection}
            key={bookmark.id}
          />
        ))}
        {!sortedBookmarks.length && <NoBookmarksPlaceholder />}
      </div>
    </AppShell>
  );
}