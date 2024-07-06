import NavButton from "@/components/layout/nav-button";
import { Icons } from "@/components/shared/icons";
import { siteConfig } from "@/config/site";

export default async function SiteHeader() {
  return (
    <header className="flex justify-between">
      <div className="flex  items-center gap-2">
        <Icons.logo size={30} />
      </div>
      <nav className="flex items-center gap-4 ">
        <NavButton
          variant="text"
          href={siteConfig.links.login}
          aria-label="Sign in Nucelo"
        >
          Log in
        </NavButton>
        <NavButton
          href={siteConfig.links.signup}
          aria-label="Sign up Nucelo"
          size="sm"
        >
          Start writing
        </NavButton>
      </nav>
    </header>
  );
}
