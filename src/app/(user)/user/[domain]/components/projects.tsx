import Project from "@/components/projects/project";
import { Icons } from "@/components/shared/icons";
import type { Project as ProjectProps } from "@prisma/client";
import Link from "next/link";

export default function Projects({ projects }: { projects: ProjectProps[] }) {
  if (!projects.length) {
    return null;
  }
  return (
    <dl className="section-container">
      <dt className="section-title link group">
        <Link
          href="/projects"
          className="absolute w-full h-full "
          aria-label="View All Projects"
        />
        <h3>Projects</h3>
        <Icons.arrowRight
          size={16}
          className="text-gray-4 group-hover:text-secondary"
        />
      </dt>
      <dd className="section-content">
        {projects.map((project) => (
          <Project project={project} key={project.id} />
        ))}
      </dd>
    </dl>
  );
}
