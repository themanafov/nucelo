import Link from "next/link";
import { IndexProps } from ".";
import { Icons } from "../shared/icons";
import { Badge } from "../ui/badge";

export function AnalyticsBadge({
  href,
  value,
  index,
  published,
}: {
  href: string;
  value: number;
  index: IndexProps;
  published?: boolean;
}) {
  if (published || value > 0) {
    const Icon = Icons[index === "clicks" ? "mousePointerClick" : "bar"];
    return (
      <Link href={href}>
        <Badge className="h-4 min-w-max flex gap-1 hover:bg-gray-2 px-1 font-normal">
          <Icon size={14} /> <p>{`${value} ${index}`}</p>
        </Badge>
      </Link>
    );
  }
}
