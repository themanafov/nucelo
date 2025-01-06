"use client";
import { Icons } from "@/components/shared/icons";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { unlockSite } from "./action";

export default function ProtectedPage() {
  const [state, formAction, isPending] = useActionState(unlockSite, null);
  const router = useRouter();
  useEffect(() => {
    if (state?.status === "ok") {
      router.refresh();
    }
  }, [state?.status]);
  return (
    <div className="w-[300px] min-h-screen mx-auto flex flex-col items-center justify-center gap-2 max-md:mt-10">
      <Icons.locked size={20} className="text-gray-4" />
      <p className="text-sm text-gray-4 mt-2">
        Enter password to access the site
      </p>
      <form action={formAction} className="flex flex-col gap-2">
        <Input
          type="password"
          name="password"
          placeholder="Enter password"
          disabled={isPending}
          className={state?.error ? "focus:border-danger border-danger" : ""}
          autoFocus
        />
        {state?.error && <b className="text-xs text-danger">{state.error}</b>}
        <Button type="submit" disabled={isPending}>
          {isPending && <Icons.spinner size={18} className="animate-spin" />}{" "}
          Unlock
        </Button>
      </form>
    </div>
  );
}
