import NavButton from "@/components/layout/nav-button";
import PublicBetaBadge from "@/components/shared/public-beta-badge";
import { siteConfig } from "@/config/site";

export default function Hero() {
  return (
    <section className="section-container pt-16">
      <div className="flex items-center gap-3">
        <h3 className="font-medium text-2xl section-title">Nucelo</h3>
        <PublicBetaBadge className="mt-0" />
      </div>
      <p className="text-gray-4 text-base">
        Open source minimal blogging platform.
      </p>
      <div className="mt-2 flex items-center gap-2">
        <NavButton
          href={siteConfig.links.signup}
          aria-label="Sign up Nucelo"
          size="sm"
          buttonVariant="secondary"
        >
          Start writing
        </NavButton>
        <NavButton
          href={siteConfig.links.demo}
          aria-label="View demo of Nucelo"
          target="_blank"
          size="sm"
        >
          View demo
        </NavButton>
      </div>
    </section>
  );
}
