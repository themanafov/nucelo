import { cn } from "@/lib/utils";
import type React from "react";

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

export default function AppShell({ children, className, ...props }: Props) {
  return (
    <div className={cn("flex h-full flex-col gap-2", className)} {...props}>
      {children}
    </div>
  );
}
