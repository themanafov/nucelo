"use client";
import useAppCommand from "@/hooks/use-app-command";
import { Icon } from "@/types";
import { User } from "@prisma/client";
import { signOut } from "next-auth/react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { ReactNode, useCallback, useEffect } from "react";
import { Icons } from "../shared/icons";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";

type Group = {
  heading: string;
  items: Item[];
  icon?: Icon;
};

type Item = {
  command: () => unknown;
  children: ReactNode;
  className?: string;
};

export default function AppCommand({ user }: { user: User }) {
  const { isOpen, toggle, setOpen } = useAppCommand();
  const router = useRouter();
  const { setTheme, theme } = useTheme();

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

  const groups: Group[] = [
    {
      heading: "Navigation",
      icon: "arrowRight",
      items: [
        {
          command: () => router.push("/articles"),
          children: "Go to Articles",
        },
        {
          command: () => router.push("/projects"),
          children: "Go to Projects",
        },
        {
          command: () => router.push("/bookmarks"),
          children: "Go to Bookmarks",
        },
        {
          command: () => router.push("/analytics"),
          children: "Go to Analytics",
        },
      ],
    },
    {
      heading: "General",
      items: [
        {
          command: () =>
            window.open(
              `https://${user.domain || `${user.username}.nucelo.co`}`,
              "_blank",
            ),
          children: (
            <>
              <Icons.arrowUpRight size={18} /> Your page
            </>
          ),
        },
        {
          command: () => setTheme(theme === "dark" ? "light" : "dark"),
          children: (
            <>
              <ThemeIcon size={18} /> Switch to{" "}
              {theme === "dark" ? "light" : "dark"}
            </>
          ),
        },
        {
          command: () => router.push("/settings"),
          children: (
            <>
              <Icons.settings size={18} /> Settings
            </>
          ),
        },
        {
          command: () => window.open("https://nucelo.com/home", "_blank"),
          children: (
            <>
              <Icons.logo size={18} /> Home page
            </>
          ),
        },
        {
          command: () => signOut(),
          children: (
            <>
              <Icons.logout size={18} /> Log out
            </>
          ),
          className: "!text-danger",
        },
      ],
    },
  ];

  return (
    <CommandDialog open={isOpen} onOpenChange={setOpen}>
      <CommandInput placeholder="What do you need?" />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        {groups.map(({ heading, items, icon }) => (
          <CommandGroup heading={heading}>
            {items.map(({ command, children, className }) => {
              const Icon = icon ? Icons[icon] : () => null;
              return (
                <CommandItem
                  onSelect={() => runCommand(command)}
                  className={className}
                >
                  {icon && <Icon size={18} />} {children}
                </CommandItem>
              );
            })}
          </CommandGroup>
        ))}
      </CommandList>
    </CommandDialog>
  );
}
