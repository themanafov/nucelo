import { Plan } from "@/types";

export const freePlan: Plan = {
  title: "Free",
  description: "Limited Plan",
  price: {
    monthly: 0,
    yearly: 0,
  },
  features: [
    {
      name: "Max 3 articles, projects, and bookmarks",
      icon: "check",
    },
    {
      name: "SEO",
      icon: "check",
    },
    {
      name: "Password protection",
      icon: "check",
    },
    {
      name: "Custom domain",
      icon: "x",
    },
    {
      name: "Advanced analytics",
      icon: "x",
    },
    {
      name: "Remove watermark",
      icon: "x",
    },
    {
      name: "Collect emails",
      icon: "x",
    },
  ],
  action: {
    text: "Get started",
    link: "https://app.nucelo.com/signup",
  },
} as const;

export const proPlan: Plan = {
  title: "Pro",
  description: "Unlimited Plan",
  price: {
    monthly: 4,
    yearly: 40,
  },
  features: [
    {
      name: "Unlimited articles, projects, and bookmarks",
      icon: "check",
    },
    {
      name: "SEO",
      icon: "check",
    },
    {
      name: "Password protection",
      icon: "check",
    },
    {
      name: "Custom domain",
      icon: "check",
    },
    {
      name: "Advanced analytics",
      icon: "check",
    },
    {
      name: "Remove watermark",
      icon: "check",
    },
    {
      name: "Collect emails",
      icon: "check",
    },
  ],
  action: {
    text: "Get started",
    link: "https://app.nucelo.com/signup",
  },
} as const;
