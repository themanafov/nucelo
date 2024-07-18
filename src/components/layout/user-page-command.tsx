"use client";

import { getLinks, userPageConfig } from "@/config/user-page";
import useNavigation from "@/hooks/use-navigation";
import { User } from "@prisma/client";
import { useTheme } from "next-themes";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";
import ClientOnly from "../shared/client-only";
import { Icons } from "../shared/icons";
import Button from "../ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import NavButton from "./nav-button";

export default function UserPageCommand({ user }: { user: User }) {
  const { isOpen, toggle, setOpen } = useNavigation();
  const router = useRouter();
  const pathname = usePathname();
  const { setTheme, theme } = useTheme();
  const links = getLinks(user);

  useEffect(() => {
    const keyDown = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        toggle();
      }
      if (e.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", keyDown);

    return () => {
      document.removeEventListener("keydown", keyDown);
    };
  }, [isOpen, setOpen, toggle]);

  const runCommand = useCallback(
    (command: () => unknown) => {
      command();
      setOpen(false);
    },
    [setOpen],
  );
  const ThemeIcon = Icons[theme === "dark" ? "sun" : "moon"];

  return (
    <ClientOnly>
      <CommandDialog open={isOpen} onOpenChange={setOpen}>
        <CommandInput placeholder="Go to..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Navigation">
            {userPageConfig.pages.map((link) => {
              const Icon = Icons[link.icon];
              return (
                <CommandItem
                  key={link.title}
                  onSelect={() => runCommand(() => router.push(link.href))}
                >
                  <Icon size={18} />
                  {link.title}
                </CommandItem>
              );
            })}
          </CommandGroup>
          {links.some((link) => link.username) && (
            <CommandGroup heading="Connect">
              {links.map((link) => {
                const Icon = Icons[link.icon as keyof typeof Icons];
                return (
                  <CommandItem
                    key={link.url + link.username === null ? "" : link.username}
                    onSelect={() =>
                      window.open(
                        `${link.url}${
                          link.username === null ? "" : link.username
                        }`,
                        "_blank",
                      )
                    }
                  >
                    <Icon size={18} />

                    {link.platform}
                  </CommandItem>
                );
              })}
            </CommandGroup>
          )}
          <CommandGroup heading="General">
            <CommandItem
              onSelect={() =>
                runCommand(() => setTheme(theme === "dark" ? "light" : "dark"))
              }
            >
              <ThemeIcon size={18} /> Switch to{" "}
              {theme === "dark" ? "light" : "dark"}
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
      {pathname !== "/" && (
        <nav className="fixed w-full h-dvh pointer-events-none flex flex-col items-start max-md:justify-end left-0 top-0">
          <div className="z-50 w-[700px] max-md:pl-4.4 py-4.4 max-md:w-full mx-auto pointer-events-auto flex gap-1 items-center">
            <NavButton
              href="/"
              className="size-4.5"
              size="icon"
              icon="home"
              buttonVariant="secondary"
              aria-label="Back to home"
            />
            <Button
              onClick={() => setOpen(true)}
              size="icon"
              variant="secondary"
              aria-label="Open navigation"
            >
              <Icons.command size={15} />
            </Button>
          </div>
        </nav>
      )}
    </ClientOnly>
  );
}
