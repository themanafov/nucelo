"use client";

import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { Icons } from "../shared/icons";
import Button from "../ui/button";

export default function ThemeToggle({
  compact = false,
}: {
  compact?: boolean;
}) {
  const { theme, setTheme } = useTheme();
  return (
    <Button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className={cn(
        "justify-start text-secondary hover:text-secondary gap-2 dark:[&_.moon-icon]:hidden [&_.sun-icon]:hidden dark:[&_.sun-icon]:inline",
        compact ? "justify-center text-gray-4" : "",
      )}
      size={compact ? "icon" : "sm"}
      variant="ghost"
      aria-label={
        theme === "dark" ? "Switch Theme to light" : "Switch Theme to dark"
      }
    >
      <Icons.sun size={15} className="sun-icon" />
      <Icons.moon size={15} className="moon-icon" />
      {!compact && (
        <span className="text-xs ">
          {theme === "dark" ? "Switch to light" : "Switch to dark"}
        </span>
      )}
    </Button>
  );
}
