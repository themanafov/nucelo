"use client";

import { Icons } from "@/components/shared/icons";
import Button from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import Input from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { subscribeSchema } from "@/lib/validations/subscribe";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogTitle } from "@radix-ui/react-dialog";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import type * as z from "zod";

type FormData = z.infer<typeof subscribeSchema>;

export default function Subscribe({
  username,
  compact = false,
}: {
  username: string;
  compact?: boolean;
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, startTransition] = useTransition();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(subscribeSchema),
  });

  const onSubmit = async (data: FormData) => {
    startTransition(async () => {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        body: JSON.stringify({
          email: data.email,
          name: data.name,
          username,
        }),
      });

      if (!res.ok) {
        const text = await res.text();
        toast({
          title: "Something went wrong",
          description: text,
        });
      } else {
        setIsOpen(false);
        reset();
        toast({
          title: "You are now subscribed",
        });
      }
    });
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant={compact ? "secondary" : "default"}
          size={compact ? "icon" : "sm"}
        >
          {compact ? <Icons.mail size={15} /> : "Subscribe"}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="items-center">
            Subscribe newsletter
          </DialogTitle>
        </DialogHeader>
        <form
          id="subscribe-newsletter"
          className="flex flex-col gap-2"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Input
            type="text"
            placeholder="Enter your name"
            disabled={isLoading}
            {...register("name")}
          />
          {errors.name && (
            <p className="text-xs font-bold text-danger">
              {errors.name.message}
            </p>
          )}
          <Input
            type="email"
            placeholder="Enter your email"
            disabled={isLoading}
            {...register("email")}
          />
          {errors.email && (
            <p className="text-xs font-bold text-danger">
              {errors.email.message}
            </p>
          )}
        </form>

        <DialogFooter>
          <Button
            disabled={isLoading}
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </Button>
          <Button disabled={isLoading} size="sm" form="subscribe-newsletter">
            {isLoading && <Icons.spinner size={18} className="animate-spin" />}
            Subscribe
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
