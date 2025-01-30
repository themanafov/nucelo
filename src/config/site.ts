import type { SiteConfig } from "@/types";

export const siteConfig: SiteConfig = {
  name: "Nucelo",
  description:
    "Nucelo is an open source blogging platform with a minimal and beautiful page.",
  url: "https://nucelo.com",
  ogImage: "https://nucelo.com/_static/og.png",
  links: {
    home: "https://nucelo.com/home",
    app: "https://app.nucelo.com",
    signup: "https://app.nucelo.com/signup",
    login: "https://app.nucelo.com/login",
    twitter: "https://x.com/themanafov",
    posts: "https://posts.cv/manafov",
    github: "https://github.com/themanafov/nucelo",
    help: "mailto:help@nucelo.com",
    demo: "https://demo.nucelo.co",
  }
} as const;
