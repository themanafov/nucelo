"use client";
import useAppCommand from "@/hooks/use-app-command";
import { Icon } from "@/types";
import { User } from "@prisma/client";
import { signOut } from "next-auth/react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { ReactNode, useCallback, useEffect, useState } from "react";
import { createArticle } from "../articles/article-create-button";
import { createProject } from "../projects/project-create-button";
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
  const [isLoading, setIsLoading] = useState<"article" | "project" | null>(
    null,
  );
  const { setTheme, theme } = useTheme();

  const newArticle = async () => {
    setIsLoading("article");
    const article = await createArticle();
    setIsLoading(null);
    if (article) {
      router.push(`/articles/${article.id}`);
      router.refresh();
    }
  };

  const newProject = async () => {
    setIsLoading("project");
    const project = await createProject();
    setIsLoading(null);
    if (project) {
      router.push(`/projects/${project.id}`);
      router.refresh();
    }
  };

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
    async (command: () => Promise<unknown> | unknown) => {
      await command();
      setOpen(false);
    },
    [setOpen],
  );

  const ThemeIcon = Icons[theme === "dark" ? "sun" : "moon"];
  const PlusIcon = ({ type }: { type?: "article" | "project" }) =>
    isLoading === type ? (
      <Icons.spinner size={18} className="animate-spin text-gray-4" />
    ) : (
      <Icons.plus size={18} />
    );

  const groups: Group[] = [
    {
      heading: "Quick actions",
      items: [
        {
          command: newArticle,
          children: (
            <>
              <PlusIcon type="article" /> New article
            </>
          ),
        },
        {
          command: newProject,
          children: (
            <>
              <PlusIcon type="project" /> New project
            </>
          ),
        },
        {
          command: () => router.push("/bookmarks?action=newBookmark"),
          children: (
            <>
              <PlusIcon /> New bookmark
            </>
          ),
        },
        {
          command: () => router.push("/bookmarks?action=newCollection"),
          children: (
            <>
              <PlusIcon /> New collection
            </>
          ),
        },
        {
          command: () => router.push("/bookmarks?action=manageCollections"),
          children: (
            <>
              <Icons.collection size={18} /> Manage collections
            </>
          ),
        },
      ],
    },
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
          <CommandGroup heading={heading} key={heading}>
            {items.map(({ command, children, className }, i) => {
              const Icon = icon ? Icons[icon] : () => null;
              return (
                <CommandItem
                  onSelect={() => runCommand(command)}
                  className={className}
                  key={i}
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
