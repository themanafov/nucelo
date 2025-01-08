"use client";

import { Icons } from "@/components/shared/icons";
import Button from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { useActionState, useEffect } from "react";
import { deleteSubscriber } from "./actions";

export default function DeleteSubscriber({ id }: { id: string }) {
  const [state, formAction, isPending] = useActionState(deleteSubscriber, null);

  useEffect(() => {
    if (state?.error) {
      toast({
        title: state.error,
        variant: "destructive",
      });
    }
  }, [state]);
  return (
    <form action={formAction}>
      <input type="hidden" name="subId" value={id} />
      <Button
        type="submit"
        size="sm"
        variant="destructive"
        disabled={isPending}
        className="w-full justify-start gap-2 border-none"
        aria-label="Subscriber Delete Button"
      >
        {isPending ? (
          <Icons.spinner size={15} className="animate-spin text-danger" />
        ) : (
          <Icons.trash size={15} />
        )}
        Delete
      </Button>
    </form>
  );
}
