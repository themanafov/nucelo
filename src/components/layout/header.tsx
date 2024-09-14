import { cn } from "@/lib/utils";
import type React from "react";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
}

export default function AppHeader({ title, children, className }: Props) {
  return (
    <div
      className={cn("flex flex-row items-center justify-between", className)}
    >
      {title && <h3 className="title text-lg font-medium ">{title}</h3>}
      {children}
    </div>
  );
}
