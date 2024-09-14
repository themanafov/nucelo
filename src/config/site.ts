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
    privacy: "mailto:privacy@nucelo.com",
    demo: "https://demo.nucelo.co",
  },
  privacy: {
    lastUpdated: "July 8, 2024",
    sections: [
      {
        content:
          'Welcome to Nucelo. (the "Site"), hosted by Nucelo ("Nucelo", "we", "us", and/or "our"). Nucelo provides a platform for creating minimal blog. (the "Services"). We value your privacy and are dedicated to protecting your personal data. This Privacy Policy covers how we collect, handle, and disclose personal data on our Platform.\n\nIf you have any questions, comments, or concerns regarding this Privacy Policy, our data practices, or would like to exercise your rights, do not hesitate to contact us.',
      },
      {
        title: "To Whom Does This Policy Apply",
        content:
          "This Privacy Policy applies to all users of Nucelo, our Platform, including visitors, registered users, and anyone interacting with our services.",
      },
      {
        title: "Changes To This Privacy Policy",
        content:
          'We may update this Privacy Policy from time to time. When we do, we will revise the "last updated" date at the bottom of this page. We encourage you to review this policy periodically to stay informed about how we protect your information.',
      },
      {
        title: "What Information Do We Collect",
        content:
          "We collect information directly from you when you provide it to us explicitly on our Site. We do not use third-party cookies on our Site.",
      },
      {
        title: "What We Use Your Information For",
        content:
          "We use your information to provide our Services, to improve our Platform, to understand how you use our Platform, and to communicate with you.",
      },
    ],
  },
} as const;
