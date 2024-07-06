import { Skeleton } from "../ui/skeleton";

export default function EditorSkeleton() {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <Skeleton className="w-4.5 h-4.5" />
          <Skeleton className="w-4.5 h-4.5" />
        </div>
        <div className="flex gap-2 items-center">
          <Skeleton className="w-[18px] h-[18px]" />
          <Skeleton className="w-[40px] h-[18px]" />
          <Skeleton className="w-[90px] h-4.5" />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <Skeleton className="w-1/2 h-4.5" />
        {[...new Array(10).fill(true)].map((_, i) => (
          <Skeleton className="h-4.5" key={i} />
        ))}
      </div>
    </div>
  );
}
