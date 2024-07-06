import NavButton from "@/components/layout/nav-button";
import { siteConfig } from "@/config/site";
export default function Cta() {
  return (
    <section className="flex flex-col gap-2 items-center justify-center text-center mt-10">
      <div className="font-medium text-lg">Get started with Nucelo</div>
      <p className="text-gray-4 text-sm mb-2">
        Take action now, create your own blog.
      </p>
      <NavButton href={siteConfig.links.signup} aria-label="Get Started">
        Create your own blog
      </NavButton>
    </section>
  );
}
