import { MarketingConfig } from "@/types";
import { siteConfig } from "./site";
import { freePlan, proPlan } from "./subscriptions";

export const marketingConfig: MarketingConfig = {
  features: [
    {
      title: "Rich text editor",
      description:
        "Leverage a rich text editor like Notion for a streamlined blogging experience.",
      icon: "squarePen",
    },
    {
      title: "Analytics",
      description: "Understand your audience better with detailed analytics.",
      icon: "areaChart",
    },
    {
      title: "Collect emails",
      description:
        "Effortlessly build your email list by collecting subscriber emails for newsletters.",
      icon: "mail",
    },
    {
      title: "SEO",
      description:
        "Optimize your page, articles, and projects with customizable Open Graph settings.",
      icon: "search",
    },
    {
      title: "Custom domain",
      description: "Connect your own domain or subdomain to your blog.",
      icon: "globe",
    },
    {
      title: "Password protection",
      description: "Secure your private projects with password protection.",
      icon: "locked",
    },
  ],
  plans: [freePlan, proPlan],
  links: [
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
} as const;
