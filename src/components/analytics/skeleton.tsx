import { cn } from "@/lib/utils";
import { Skeleton } from "../ui/skeleton";

export default function AnalyticsSkeleton({ pages }: { pages?: boolean }) {
  return (
    <div>
      <div className="flex justify-between items-center">
        <Skeleton className="w-[150px] h-4.5" />
        <Skeleton className="w-[105px] h-4.5" />
      </div>
      <Skeleton className="w-full h-[330px] mt-2" />
      <div className="mt-2 grid grid-cols-2 gap-2 max-md:grid-cols-1">
        {[...new Array(!pages ? 3 : 4).fill(true)].map((_, i) => (
          <Skeleton
            className={cn("h-[200px]", !pages ? "last:col-span-2" : "")}
            key={i}
          />
        ))}
      </div>
    </div>
  );
}
