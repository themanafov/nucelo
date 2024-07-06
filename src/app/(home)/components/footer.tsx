import NavButton from "@/components/layout/nav-button";
import ThemeToggle from "@/components/layout/theme-toggle";
import { marketingConfig } from "@/config/marketing";
import { siteConfig } from "@/config/site";

export default function Footer() {
  return (
    <footer className="flex items-center justify-between py-4 pt-32">
      <div className="text-xs text-gray-4">
        © 2024 nucelo.com. All rights reserved.
      </div>
      <div className="flex items-center gap-2 text-gray-1">
        {marketingConfig.links.map((link) => (
          <NavButton
            icon={link.icon}
            href={link.href}
            target="_blank"
            buttonClassname="border-none"
            size="icon"
            buttonVariant="ghost"
            aria-label={link.name}
            key={link.name}
          />
        ))}
        <NavButton
          icon="mail"
          href={siteConfig.links.help}
          size="icon"
          buttonVariant="ghost"
          aria-label="Support email"
        />
        <ThemeToggle compact />
      </div>
    </footer>
  );
}
