import { cn } from "@/lib/utils";
import * as React from "react";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "max-h-[140px] min-h-[70px] w-full  rounded-md border  border-gray-2 bg-transparent p-[10px]  pb-[5px] pt-[5px] text-sm text-secondary outline-none transition-colors placeholder:text-gray-1 focus:border-gray-1 disabled:cursor-not-allowed disabled:bg-gray-3",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Textarea.displayName = "Textarea";

export { Textarea };
