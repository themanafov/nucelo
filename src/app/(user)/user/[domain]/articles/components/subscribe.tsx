"use client";

import NavButton from "@/components/layout/nav-button";
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
import { cn } from "@/lib/utils";
import { subscribeSchema } from "@/lib/validations/subscribe";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogTitle } from "@radix-ui/react-dialog";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import type * as z from "zod";

type FormData = z.infer<typeof subscribeSchema>;

const feeds = [
  {
    type: "rss",
    title: "RSS",
    href: "/feed",
  },
  {
    type: "atom",
    title: "Atom",
    href: "/feed?type=atom",
  },
] as const;

export default function Subscribe({
  newsletter = false,
  username,
  compact = false,
}: {
  username: string;
  compact?: boolean;
  newsletter: boolean;
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, startTransition] = useTransition();
  const router = useRouter();
  const [showSubscribeForm, setShowSubscribeForm] = useState<boolean>(false);
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
      const res = await fetch("/api/subscribers", {
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
          {compact ? <Icons.rss size={15} /> : "Subscribe"}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="items-center">Subscribe</DialogTitle>
        </DialogHeader>
        <div className="flex gap-2 justify-between">
          {feeds.map((feed) => (
            <NavButton
              href={feed.href}
              buttonVariant="secondary"
              iconSize={18}
              size="wide"
              className="w-full"
              buttonClassname="h-16 text-base"
              direction="ltr"
              icon="rss"
              key={feed.type}
            >
              {feed.title}
            </NavButton>
          ))}
          {newsletter && (
            <Button
              variant="secondary"
              className={cn(
                "w-full h-16",
                showSubscribeForm && "text-secondary bg-gray-2",
              )}
              onClick={() => setShowSubscribeForm((prev) => !prev)}
            >
              <Icons.mail size={18} />
              Email
            </Button>
          )}
        </div>
        {newsletter && showSubscribeForm && (
          <>
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
              <Button
                disabled={isLoading}
                size="sm"
                form="subscribe-newsletter"
              >
                {isLoading && (
                  <Icons.spinner size={18} className="animate-spin" />
                )}
                Subscribe
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
