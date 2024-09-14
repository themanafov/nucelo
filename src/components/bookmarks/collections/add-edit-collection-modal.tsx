import { Icons } from "@/components/shared/icons";
import Button from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Input from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { collectionSchema } from "@/lib/validations/bookmark";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Collection } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import type * as z from "zod";

type CollectionFormData = z.infer<typeof collectionSchema>;

export default function AddEditCollectionModal({
  collection,
  edit,
  open = false,
}: {
  collection?: Collection;
  edit?: boolean;
  open?: boolean;
}) {
  const [showAddEditCollectionModal, setShowAddEditCollectionModal] =
    useState<boolean>(open);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    if (!showAddEditCollectionModal && open) {
      router.push("/bookmarks");
    }
  }, [showAddEditCollectionModal, open]);

  const { title, endpoint, method, successMessage, buttonText } =
    useMemo(() => {
      if (edit && collection) {
        return {
          title: "Edit collection",
          endpoint: `/api/bookmarks/collections/${collection.id}`,
          method: "PATCH",
          successMessage: "Collection has been saved.",
          buttonText: {
            default: "Save",
            loading: "Saving",
          },
        };
      }
      return {
        title: "New collection",
        endpoint: "/api/bookmarks/collections",
        method: "POST",
        successMessage: "Collection has been created.",
        buttonText: {
          default: "Create",
          loading: "Creating",
        },
      };
    }, [edit, collection]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CollectionFormData>({
    resolver: zodResolver(collectionSchema),
    defaultValues: {
      name: collection?.name,
    },
  });
  const onSubmit = async (data: CollectionFormData) => {
    setIsLoading(true);

    const res = await fetch(endpoint, {
      method,
      body: JSON.stringify({
        name: data.name,
      }),
    });

    setIsLoading(false);
    const body = await res.text();
    if (!res?.ok) {
      return toast({
        title: "Something went wrong.",
        description: body,
      });
    }
    setShowAddEditCollectionModal(false);
    reset();
    router.refresh();
    return toast({
      title: successMessage,
    });
  };
  return (
    <Dialog
      open={showAddEditCollectionModal}
      onOpenChange={setShowAddEditCollectionModal}
    >
      <DialogTrigger asChild>
        <Button
          size="sm"
          variant="ghost"
          className={cn("gap-2", edit ? "justify-start" : "")}
          aria-label={title}
        >
          {edit ? (
            <>
              <Icons.edit size={15} />
              Edit
            </>
          ) : (
            <>{title}</>
          )}
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <form
          id="add-edit-collection-form"
          className="flex flex-col gap-2"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Input
            type="text"
            placeholder="Name"
            autoComplete="off"
            {...register("name")}
            disabled={isLoading}
          />
          {errors?.name && (
            <b className="text-xs text-danger">{errors.name.message}</b>
          )}
        </form>
        <DialogFooter>
          <Button
            form="add-edit-collection-form"
            type="submit"
            size="sm"
            disabled={isLoading}
          >
            {isLoading && <Icons.spinner size={15} className="animate-spin" />}
            {isLoading ? buttonText.loading : buttonText.default}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
