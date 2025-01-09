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
        isPending={isPending}
        className="w-full"
        aria-label="Delete subscriber"
      >
        <Icons.trash size={15} />
        Delete
      </Button>
    </form>
  );
}
