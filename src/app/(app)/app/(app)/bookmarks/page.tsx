import AddBookmarkOrCollection from "@/components/bookmarks/add-bookmark-or-collection";
import Bookmark from "@/components/bookmarks/bookmark";
import CollectionBar from "@/components/bookmarks/collections/collections-bar";
import Collections from "@/components/bookmarks/collections/collections-modal";
import NoBookmarksPlaceholder from "@/components/bookmarks/no-bookmarks-placeholder";
import AppShell from "@/components/layout/app-shell";
import AppHeader from "@/components/layout/header";
import { getBookmarks } from "@/lib/fetchers/bookmarks";
import { getCollections } from "@/lib/fetchers/collections";
import { sortBookmarks } from "@/lib/utils";
import type { Collection } from "@prisma/client";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bookmarks",
};

interface BookmarksPageProps {
  searchParams: Promise<{
    collection?: string;
  }>;
}

export default async function Bookmarks({ searchParams }: BookmarksPageProps) {
  const [bookmarks, collections, { collection }] = await Promise.all([
    getBookmarks(),
    getCollections(),
    searchParams,
  ]);
  const sortedBookmarks = sortBookmarks(bookmarks, collection);

  return (
    <AppShell>
      <AppHeader title="Bookmarks">
        <div className="flex items-center gap-1">
          <Collections collections={collections} />
          <AddBookmarkOrCollection collections={collections} />
        </div>
      </AppHeader>
      <CollectionBar collections={collections} currentCollection={collection} />
      <div>
        {sortedBookmarks.map((bookmark) => (
          <Bookmark
            bookmark={bookmark}
            collection={bookmark?.collection as Collection}
            collections={collections}
            key={bookmark.id}
            admin
          />
        ))}
        {!sortedBookmarks.length && <NoBookmarksPlaceholder description />}
      </div>
    </AppShell>
  );
}
