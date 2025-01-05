import { cn } from "@/lib/utils";
import type { VariantProps } from "class-variance-authority";
import Link, { LinkProps } from "next/link";
import type React from "react";
import { Icons } from "../shared/icons";
import Button, { type buttonVariants } from "../ui/button";

interface NavButtonProps extends React.ComponentProps<"a">, LinkProps {
  buttonVariant?: VariantProps<typeof buttonVariants>["variant"];
  size?: VariantProps<typeof buttonVariants>["size"];
  iconSize?: number;
  buttonClassname?: string;
  variant?: "text" | "button";
  icon?: keyof typeof Icons;
  direction?: "ltr" | "rtl";
  href: string;
}

export default function NavButton({
  children,
  className,
  href,
  icon,
  buttonVariant = "default",
  size = "sm",
  iconSize = 16,
  variant = "button",
  direction = "rtl",
  buttonClassname,
  ...props
}: NavButtonProps) {
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
          <Icon size={iconSize} />
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
          <Icon size={iconSize} />
        </Button>
      )}
    </Link>
  );
}
