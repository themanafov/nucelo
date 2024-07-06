"use client";

import { cn } from "@/lib/utils";
import * as SwitchPrimitives from "@radix-ui/react-switch";
import * as React from "react";

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      "peer inline-flex h-4.4 w-11 shrink-0 cursor-pointer items-center rounded-full  shadow-sm transition-colors  p-1 focus-visible:outline-none focus-visible:ring-2  disabled:cursor-not-allowed  data-[state=checked]:bg-gray-2 border border-gray-2 data-[state=checked]:border-gray-2  disabled:opacity-50  bg-gray-3",
      className,
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        "pointer-events-none block size-3 rounded-full bg-gray-1 shadow-lg  transition-transform data-[state=checked]:translate-x-[18px] data-[state=unchecked]:translate-x-0  data-[state=checked]:bg-secondary",
      )}
    />
  </SwitchPrimitives.Root>
));
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };