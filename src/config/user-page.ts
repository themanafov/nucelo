import type { UserPageConfig } from "@/types";
import type { User } from "@prisma/client";

export const userPageConfig: UserPageConfig = {
  pages: [
    {
      title: "Home",
      href: "/",
      icon: "home",
    },
    {
      title: "Articles",
      href: "/articles",
      icon: "edit",
    },
    {
      title: "Projects",
      href: "/projects",
      icon: "layers",
    },
    {
      title: "Bookmarks",
      href: "/bookmarks",
      icon: "bookmark",
    },
  ],
} as const;

export const getLinks = (
  user: Pick<
    User,
    | "github"
    | "twitter"
    | "dribbble"
    | "linkedin"
    | "contactEmail"
    | "readcv"
    | "postscv"
  >,
) => {
  return [
    {
      platform: "Twitter",
      username: user.twitter,
      url: "https://x.com/",
      icon: "twitter",
    },
    {
      platform: "Posts",
      username: user.postscv,
      url: "https://posts.cv/",
      icon: "postscv",
    },
    {
      platform: "Linkedin",
      username: user.linkedin,
      url: "https://linkedin.com/in/",
      icon: "linkedin",
    },
    {
      platform: "CV",
      username: user.readcv,
      url: "https://read.cv/",
      icon: "readcv",
    },
    {
      platform: "Dribbble",
      username: user.dribbble,
      url: "https://dribbble.com/",
      icon: "dribbble",
    },
    {
      platform: "Github",
      username: user.github,
      url: "https://github.com/",
      icon: "github",
    },
    {
      platform: "Email",
      username: user.contactEmail,
      url: "mailto:",
      icon: "mail",
    },
  ].filter((l) => l.username);
};
