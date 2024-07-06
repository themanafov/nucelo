"use client";

import { appConfig } from "@/config/app";
import { usePathname } from "next/navigation";
import AppHeader from "./header";
import NavButton from "./nav-button";

export default function SettingsNav() {
  const path = usePathname();
  const current = appConfig.settingsNav.find((item) => item.href === path);
  return (
    <AppHeader
      title={current?.title || "Settings"}
      className="gap-3 max-md:mb-2  max-[480px]:flex-col max-[480px]:items-start"
    >
      <nav className="flex flex-row gap-2">
        {appConfig.settingsNav.map((link) => (
          <NavButton
            href={link.href}
            key={link.title}
            size="sm"
            buttonClassname={
              link.href === path ? "!bg-gray-2 !text-secondary" : ""
            }
            buttonVariant="ghost"
          >
            {link.title}
          </NavButton>
        ))}
      </nav>
    </AppHeader>
  );
}
