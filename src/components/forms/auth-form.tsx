"use client";

import { authFormSchema } from "@/lib/validations/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Icons } from "../shared/icons";
import Button from "../ui/button";
import Input from "../ui/input";
import { toast } from "../ui/use-toast";

type FormData = z.infer<typeof authFormSchema>;

export default function AuthForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(authFormSchema),
  });
  const [isLoading, setIsLoading] = useState<string | boolean>();
  const onSubmit = async (data: FormData) => {
    setIsLoading("email");

    const res = await signIn("email", {
      email: data.email,
      redirect: false,
    });

    setIsLoading(false);

    if (!res?.ok) {
      return toast({
        title: "Something went wrong",
      });
    }

    toast({
      title: "Magic link has been sent",
    });
  };
  return (
    <div className="flex flex-col mt-2">
      <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
        <Input
          type="email"
          placeholder="name@example.com"
          autoCapitalize="none"
          autoCorrect="off"
          autoComplete="off"
          disabled={!!isLoading}
          {...register("email")}
        />
        {errors?.email && (
          <b className="text-xs text-danger">{errors.email.message}</b>
        )}
        <Button size="wide" type="submit" disabled={!!isLoading}>
          {isLoading === "email" && (
            <Icons.spinner size={18} className="animate-spin" />
          )}
          Send magic link
        </Button>
      </form>
      <div className="relative flex justify-center items-center my-4">
        <div className="absolute w-full block border-t border-gray-2" />
        <span className="bg-primary z-10 px-2 text-xs text-gray-4">OR</span>
      </div>
      <div>
        <Button
          size="wide"
          disabled={!!isLoading}
          onClick={() => {
            setIsLoading("google");
            signIn("google");
          }}
        >
          {isLoading === "google" ? (
            <Icons.spinner size={18} className="animate-spin" />
          ) : (
            <Icons.google />
          )}
          Continue with Google
        </Button>
      </div>
    </div>
  );
}
