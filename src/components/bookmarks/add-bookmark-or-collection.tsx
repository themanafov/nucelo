"use client";
import { Collection } from "@prisma/client";
import { Icons } from "../shared/icons";
import Button from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import AddEditBookmarkModal from "./add-edit-bookmark-modal";
import AddEditCollectionModal from "./collections/add-edit-collection-modal";

export default function AddBookmarkOrCollection({
  collections,
}: {
  collections: Collection[];
}) {
  return (
    <Popover modal={false}>
      <PopoverTrigger asChild>
        <Button
          size="icon"
          variant="secondary"
          className="data-[state=open]:bg-gray-2 data-[state=open]:text-secondary"
          aria-label="Add bookmark or collection"
        >
          <Icons.plus size={18} />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="bg-gray-3 p-1  flex flex-col">
        <AddEditBookmarkModal collections={collections} />
        <AddEditCollectionModal />
      </PopoverContent>
    </Popover>
  );
}
