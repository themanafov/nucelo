import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

const buttonVariants = cva(
  "flex h-5 cursor-pointer flex-row items-center justify-center gap-1  px-2 rounded-md text-gray-1 outline-none transition-colors disabled:cursor-not-allowed disabled:opacity-[.5]",
  {
    variants: {
      variant: {
        default:
          "border border-gray-2 text-gray-4 text-sm enabled:hover:bg-gray-2",
        destructive:
          "border border-gray-2  text-danger enabled:hover:border-danger enabled:hover:bg-danger enabled:hover:text-primary",
        secondary:
          "bg-gray-3 enabled:hover:bg-gray-2 border border-gray-2 text-gray-4 enabled:hover:text-secondary",
        ghost:
          "enabled:hover:!bg-gray-2 text-gray-4 enabled:hover:!text-secondary",
        primary:
          "bg-secondary text-primary opacity-100 hover:opacity-80 transition-opacity",
      },
      size: {
        sm: "h-4.5 text-xs",
        icon: "size-4.5 p-0 hover:text-secondary",
        wide: "w-full text-sm px-4",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  title?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, asChild = false, children, size, title, ...props },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {children}
        {title}
      </Comp>
    );
  },
);
Button.displayName = "Button";

export default Button;

export { buttonVariants };
