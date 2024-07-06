import { EmptyPlaceholder } from "../ui/empty-placeholder";

export default function NoProjectsPlaceholder({
  description = false,
}: {
  description?: boolean;
}) {
  return (
    <EmptyPlaceholder>
      <EmptyPlaceholder.Title>No projects here yet</EmptyPlaceholder.Title>
      {description && (
        <EmptyPlaceholder.Description>
          Add the projects you want to share.
        </EmptyPlaceholder.Description>
      )}
    </EmptyPlaceholder>
  );
}
