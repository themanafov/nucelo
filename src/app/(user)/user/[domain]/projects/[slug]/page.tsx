import AppShell from "@/components/layout/app-shell";
import AppHeader from "@/components/layout/header";
import NavButton from "@/components/layout/nav-button";
import MDX from "@/components/markdown/mdx";
import { Icons } from "@/components/shared/icons";
import { Badge } from "@/components/ui/badge";
import { getProject, getProjectsByAuthor } from "@/lib/fetchers/projects";
import { getUserByDomain } from "@/lib/fetchers/users";
import { generateSEO } from "@/lib/utils";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Protection from "./protection";

export const revalidate = 60;

interface ProjectPageProps {
  params: { slug: string; domain: string };
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata | null> {
  const domain = decodeURIComponent(params.domain);
  const user = await getUserByDomain(domain);
  if (!user) {
    return notFound();
  }
  const project = await getProject({
    authorId: user.id,
    slug: params.slug,
    published: true,
  });

  if (!project) {
    return notFound();
  }
  if (project.password) {
    return {
      title: project.title,
    };
  }

  return generateSEO({
    title: project.title,
    description: project.seoDescription || project.description || undefined,
    image:
      project.ogImage ||
      `https://nucelo.com/api/og/post?title=${project.title}&username=${user.username || user.name}`,
  });
}

export async function generateStaticParams({ params }: ProjectPageProps) {
  const domain = decodeURIComponent(params.domain);
  const user = await getUserByDomain(domain);
  const projects = await getProjectsByAuthor(user?.id as string);

  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const domain = decodeURIComponent(params.domain);
  const user = await getUserByDomain(domain);
  if (!user) {
    return notFound();
  }
  const project = await getProject({
    authorId: user.id,
    slug: params.slug,
    published: true,
  });

  if (!project) {
    return notFound();
  }

  return (
    <Protection project={project} user={user}>
      <AppShell>
        <NavButton
          variant="text"
          className="flex-row-reverse"
          href="/projects"
          icon="arrowLeft"
          aria-label="Back to Projects"
        >
          Back to Projects
        </NavButton>
        <AppHeader
          title={project.title}
          className="flex-row items-center justify-normal gap-1"
        >
          {project.url && (
            <Link
              href={project.url}
              className="text-gray-4 hover:text-secondary transition-colors"
              target="_blank"
              aria-label={`Go to ${project.title}`}
            >
              <Icons.arrowUpRight size={18} />
            </Link>
          )}
        </AppHeader>
        <div className="w-full flex-1 text-sm text-gray-4 flex items-center justify-between mb-4">
          <p>{project.description}</p>
          <Badge className="text-secondary bg-inherit font-medium ">
            {project.year}
          </Badge>
        </div>
        <MDX source={project.content} />
      </AppShell>
    </Protection>
  );
}