import { Icons } from "@/components/shared/icons";
import { Bookmark, Collection } from "@prisma/client";

export type NavItem = {
  title: string;
  href: string;
};
export type MainNavItem = {
  icon: keyof typeof Icons;
} & NavItem;

export type PostFilter = {
  title: string;
  href: string;
  value?: string;
};

export type AppConfig = {
  mainNav: MainNavItem[];
  settingsNav: NavItem[];
  filters: {
    postsFilter: PostFilter[];
  };
};
export type NewsletterProps = {
  title: string;
  published: string;
  author: string;
  articleURL: string;
  subId: string;
};
export type SiteConfig = {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  links: {
    home: string;
    twitter: string;
    posts: string;
    login: string;
    signup: string;
    app: string;
    github: string;
    help: string;
  };
};

export type UserPageConfig = {
  pages: MainNavItem[];
};

export type Feature = {
  title: string;
  icon: keyof typeof Icons;
  description: string;
};

export type PlanFeature = {
  name: string;
  icon: keyof typeof Icons;
};
export type Plan = {
  title: "Free" | "Pro";
  description: string;
  price: {
    monthly: number;
    yearly: number;
  };
  features: PlanFeature[];
  action: {
    text: string;
    link: string;
  };
};

export type Link = {
  name: string;
  href: string;
  icon: keyof typeof Icons;
};

export type MarketingConfig = {
  features: Feature[];
  plans: Plan[];
  links: Link[];
};

export type UserSubscriptionPlan = Plan &
  Pick<User, "lsId"> & {
    lsCurrentPeriodEnd: number;
    isPro: boolean;
    isCanceled?: boolean;
  };

export type social = {
  platform: "Github" | "Linkedin" | "Twitter" | "Dribbble" | "Email";
  username: string | null;
  url: string;
  icon: keyof typeof Icons;
};

export type Period = keyof Plan["price"];

export type DomainStatus =
  | "Unknown Error"
  | "Invalid Configuration"
  | "Valid Configuration"
  | "Domain not found"
  | "Pending Verification";

export type BookmarkWithCollection = Bookmark & {
  collection: Collection | null;
};