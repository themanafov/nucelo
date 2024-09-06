"use client";

import { Icons } from "@/components/shared/icons";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const schema = z.object({
  name: z.string().min(1),
  username: z.string().min(1),
});

type FormData = z.infer<typeof schema>;

export default function Onboarding() {
  const [isLoading, startTransition] = useTransition();
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    startTransition(async () => {
      const res = await fetch("/api/user", {
        method: "PATCH",
        body: JSON.stringify({
          name: data.name,
          username: data.username,
        }),
      });
      if (!res.ok) {
        const err = await res.text();
        toast({
          title: "Something went wrong",
          description: err,
        });
      } else {
        router.push("/");
      }
    });
  };
  return (
    <div className="w-[400px] mx-auto p-10 flex flex-col items-center ">
      <div>
        <h2 className="text-xl">Welcome to Nucelo</h2>
        <p className="text-gray-1 text-sm mt-2">
          We just need a few details to finish creating your account. You can
          always change this later.
        </p>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-4 flex flex-col gap-2 w-full"
      >
        <Input
          placeholder="Enter your name"
          {...register("name")}
          disabled={isLoading}
          autoComplete="off"
        />
        {errors?.name && (
          <b className="text-xs text-danger">{errors.name.message}</b>
        )}
        <Input
          placeholder="Enter your username"
          {...register("username")}
          disabled={isLoading}
          autoComplete="off"
        />
        {errors?.username && (
          <b className="text-xs text-danger">{errors.username.message}</b>
        )}
        <Button disabled={isLoading || !isValid}>
          {isLoading && <Icons.spinner size={18} className="animate-spin" />}
          Start writing
        </Button>
      </form>
    </div>
  );
}
