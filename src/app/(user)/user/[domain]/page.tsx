import AppShell from "@/components/layout/app-shell";
import { getArticlesByAuthor } from "@/lib/fetchers/articles";
import { getProjectsByAuthor } from "@/lib/fetchers/projects";
import { getAllUserDomains, getUserByDomain } from "@/lib/fetchers/users";
import { notFound } from "next/navigation";
import About from "./components/about";
import Articles from "./components/articles";
import Connect from "./components/connect";
import Intro from "./components/intro";
import { NothingPlaceholder } from "./components/nothing-placeholder";
import Projects from "./components/projects";

export const revalidate = 60;

interface PageProps {
  params: {
    domain: string;
  };
}

export async function generateStaticParams() {
  const allDomains = await getAllUserDomains();

  const domains = allDomains
    .flatMap(({ username, domain }) => [
      domain
        ? {
            domain,
          }
        : {
            domain: username,
          },
    ])
    .filter(Boolean);

  return domains;
}

export default async function Home({ params }: PageProps) {
  const domain = decodeURIComponent(params.domain);
  const user = await getUserByDomain(domain);
  if (!user) {
    return notFound();
  }
  const [articles, projects] = await Promise.all([
    getArticlesByAuthor(user.id, 8),
    getProjectsByAuthor(user.id, 8),
  ]);
  return (
    <AppShell className="gap-16">
      <Intro user={user} />
      {!user?.about?.trim().length && !articles.length && !projects.length && (
        <NothingPlaceholder name={user.name || user.username} />
      )}
      <div className="flex flex-col gap-10">
        <About content={user.about as string} />
        <Articles articles={articles} />
        <Projects projects={projects} />
        <Connect user={user} />
      </div>
    </AppShell>
  );
}
