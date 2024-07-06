import { EmptyPlaceholder } from "../ui/empty-placeholder";

export default function NoArticlesPlaceholder({
  description = false,
}: {
  description?: boolean;
}) {
  return (
    <EmptyPlaceholder>
      <EmptyPlaceholder.Title>No articles here yet</EmptyPlaceholder.Title>
      {description && (
        <EmptyPlaceholder.Description>
          Write an article and publish.
        </EmptyPlaceholder.Description>
      )}
    </EmptyPlaceholder>
  );
}
