import NavButton from "@/components/layout/nav-button";
import { Icons } from "@/components/shared/icons";
import { marketingConfig } from "@/config/marketing";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import Balancer from "react-wrap-balancer";

export default function Footer() {
  return (
    <footer className="flex flex-col items-center justify-center py-24 gap-5">
      <div className="flex flex-col items-center">
        <Icons.logo size={70} />
        <p className="text-gray-4 text-center my-5 text-sm">
          <Balancer>{marketingConfig.headline}</Balancer>
        </p>
        <NavButton
          href={siteConfig.links.signup}
          size="wide"
          buttonVariant="primary"
          aria-label="Create your website"
        >
          Create your website
        </NavButton>
      </div>
      <div className={cn("flex max-sm:flex-col gap-3")}>
        {marketingConfig.links.map((link) => (
          <NavButton
            href={link.href}
            variant="text"
            target={link.href.startsWith("https://") ? "_blank" : "_parent"}
            aria-label={link.name}
            className={cn(
              link.href === "/terms" && "border-r border-gray-1 pr-3",
            )}
            key={link.name}
          >
            {link.name}
          </NavButton>
        ))}
      </div>
    </footer>
  );
}
