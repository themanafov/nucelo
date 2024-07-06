import { cn } from "@/lib/utils";
import { VariantProps } from "class-variance-authority";
import Link from "next/link";
import React from "react";
import { Icons } from "../shared/icons";
import Button, { buttonVariants } from "../ui/button";
export default function NavButton({
  children,
  className,
  href,
  icon,
  buttonVariant = "default",
  size = "sm",
  variant = "button",
  direction = "rtl",
  buttonClassname,
  ...props
}: {
  children?: React.ReactNode;
  className?: string;
  buttonVariant?: VariantProps<typeof buttonVariants>["variant"];
  size?: VariantProps<typeof buttonVariants>["size"];
  href: string;
  buttonClassname?: string;
  variant?: "text" | "button";
  icon?: keyof typeof Icons;
  direction?: "ltr" | "rtl";
  [key: string]: any;
}) {
  const Icon = icon ? Icons[icon] : () => null;
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-1 w-max text-xs text-gray-4 hover:text-secondary transition-colors",
        className,
        direction === "ltr" ? "flex-row-reverse" : "",
      )}
      {...props}
    >
      {variant === "text" ? (
        <>
          {children}
          <Icon size={16} />
        </>
      ) : (
        <Button
          variant={buttonVariant}
          size={size}
          className={cn(
            buttonClassname,
            direction === "ltr" ? "flex-row-reverse" : "",
          )}
          aria-label={props["aria-label"]}
        >
          {children}
          <Icon size={16} />
        </Button>
      )}
    </Link>
  );
}
