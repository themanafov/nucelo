import { INTERVALS } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { AnalyticsContext } from ".";
import AppHeader from "../layout/header";
import { Icons } from "../shared/icons";
import Button from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export default function StatsHeader({
  title,
  className,
}: {
  title?: string;
  className?: string;
}) {
  const { interval } = useContext(AnalyticsContext);
  const router = useRouter();

  return (
    <AppHeader title={title} className={cn("mb-2", className)}>
      <div className="flex gap-1 items-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              size="sm"
              variant="secondary"
              className="data-[state=open]:text-secondary data-[state=open]:bg-gray-2 "
            >
              <Icons.date size={16} />{" "}
              {INTERVALS.find((i) => i.value === interval)?.display}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {INTERVALS.map((val, i) => (
              <DropdownMenuItem
                className={cn(
                  "h-4.5 text-xs",
                  val.value === interval ? "bg-gray-2" : "",
                )}
                key={i}
                onClick={() => router.push(`?interval=${val.value}`)}
              >
                {val.display}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </AppHeader>
  );
}
