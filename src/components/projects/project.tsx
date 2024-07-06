import { cn } from "@/lib/utils";
import { Project as ProjectType } from "@prisma/client";
import Link from "next/link";
import Balancer from "react-wrap-balancer";
import { AnalyticsBadge } from "../analytics/analytics-badge";
import { Icons } from "../shared/icons";
import { Badge } from "../ui/badge";

interface Props {
  admin?: boolean;
  project: Pick<
    ProjectType,
    | "id"
    | "title"
    | "year"
    | "description"
    | "slug"
    | "password"
    | "views"
    | "published"
  >;
  reversed?: boolean;
}

export default function Project({ project, admin, reversed }: Props) {
  const isPublished = project.published;
  return (
    <div className="-mx-2 flex relative min-h-5  max-md:h-auto group items-center justify-between rounded-md  p-2 text-sm transition-colors  hover:bg-gray-3 max-md:flex-col max-md:items-start">
      <Link
        href={`/projects/${admin ? project.id : project.slug}`}
        className="absolute left-0 top-0 w-full py-2 h-full"
        aria-label={`${project.title}`}
      />
      <div
        className={cn(
          "flex-1 flex gap-1   items-start max-md:flex-col ",
          reversed ? "flex-row-reverse" : "",
        )}
      >
        <span
          className={cn(
            "w-10 text-gray-4 truncate group-hover:text-secondary transition-colors",
            reversed ? "text-right max-md:text-left" : "text-left",
          )}
        >
          {project.year}
        </span>
        <div className="w-full  flex flex-1 flex-col">
          {project?.password && (
            <Icons.locked size={15} className="max-md:mb-1" />
          )}
          <h3>
            <Balancer>{project.title}</Balancer>
          </h3>

          <p className="text-gray-4 text-xs">{project?.description}</p>
        </div>
      </div>

      {admin && (
        <div className="max-md:w-full max-md:mt-2 flex items-center justify-end z-10">
          <div className="flex items-center gap-1">
            <Link
              href={`/projects?published=${isPublished ? "true" : "false"}`}
            >
              <Badge className="h-4 py-2 px-1 hover:bg-gray-2 font-normal ">
                {isPublished ? "Public" : "Draft"}
              </Badge>
            </Link>

            <AnalyticsBadge
              href={`/projects/${project.id}/analytics`}
              value={project.views}
              published={project.published}
              index="views"
            />
          </div>
        </div>
      )}
    </div>
  );
}