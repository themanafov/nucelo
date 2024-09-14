import type { MarketingConfig } from "@/types";
import { siteConfig } from "./site";
import { freePlan, proPlan } from "./subscriptions";

export const marketingConfig: MarketingConfig = {
  headline:
    "Quickly create your personal website and share your thoughts, projects and favourite links with your readers in a simple way.",
  features: [
    {
      title: "Content editor",
      description:
        "Leverage a rich text editor like Notion for a streamlined blogging experience",
      icon: "squarePen",
    },
    {
      title: "Analytics",
      description: "Understand your audience better with detailed analytics",
      icon: "areaChart",
    },
    {
      title: "Collect emails",
      description:
        "Build your email list by collecting subscriber emails for newsletters",
      icon: "mail",
    },
    {
      title: "SEO",
      description: "Optimize your page with customizable Open Graph settings",
      icon: "search",
    },
    {
      title: "Custom domain",
      description: "Connect your own domain or subdomain to your blog",
      icon: "globe",
    },
    {
      title: "Password Protection",
      description: "Secure your private projects with password",
      icon: "locked",
    },
  ],
  plans: [freePlan, proPlan],
  links: [
    {
      name: "Support",
      href: siteConfig.links.help,
      icon: "logo",
    },
    {
      name: "Privacy Policy",
      href: "/privacy",
      icon: "logo",
    },
    {
      name: "Github",
      href: siteConfig.links.github,
      icon: "github",
    },
    {
      name: "Twitter",
      href: siteConfig.links.twitter,
      icon: "twitter",
    },
    {
      name: "Posts",
      href: siteConfig.links.posts,
      icon: "postscv",
    },
  ],
  previews: [
    {
      title: "Articles",
      image: "/_static/previews/articles",
    },
    {
      title: "Bookmarks",
      image: "/_static/previews/bookmarks",
    },
    {
      title: "Analytics",
      image: "/_static/previews/analytics",
    },
    {
      title: "Command",
      image: "/_static/previews/command",
    },
    {
      title: "Editor",
      image: "/_static/previews/editor",
    },
    {
      title: "Example Profile",
      image: "/_static/previews/example",
    },
  ],
} as const;
