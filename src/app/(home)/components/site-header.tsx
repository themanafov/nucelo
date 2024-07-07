import NavButton from "@/components/layout/nav-button";
import { Icons } from "@/components/shared/icons";
import { siteConfig } from "@/config/site";

export default async function SiteHeader() {
  return (
    <header className="flex justify-between">
      <div className="flex  items-center gap-2">
        <Icons.logo size={30} />
      </div>
      <nav className="flex items-center gap-2 ">
        <NavButton
          href={siteConfig.links.github}
          aria-label="Github"
          target="_blank"
          icon="github"
          size="icon"
        />
        <NavButton
          href={siteConfig.links.login}
          aria-label="Sign in Nucelo"
        >
          Log in
        </NavButton>
      </nav>
    </header>
  );
}
