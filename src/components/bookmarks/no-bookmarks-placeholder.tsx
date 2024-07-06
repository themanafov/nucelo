import { EmptyPlaceholder } from "../ui/empty-placeholder";

export default function NoBookmarksPlaceholder({
  description = false,
}: {
  description?: boolean;
}) {
  return (
    <EmptyPlaceholder>
      <EmptyPlaceholder.Title>No bookmarks here yet</EmptyPlaceholder.Title>
      {description && (
        <EmptyPlaceholder.Description>
          Share the links you find useful here.
        </EmptyPlaceholder.Description>
      )}
    </EmptyPlaceholder>
  );
}
