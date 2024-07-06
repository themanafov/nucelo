import { cn } from "@/lib/utils";
import { Badge } from "../ui/badge";

export default function PublicBetaBadge({ className }: { className?: string }) {
  return (
    <div className={cn("flex justify-center mt-5", className)}>
      <Badge className="rounded-full">Public beta</Badge>
    </div>
  );
}
