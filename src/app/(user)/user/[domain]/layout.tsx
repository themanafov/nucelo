import Track from "@/components/analytics/track";
import Command from "@/components/layout/user-page-command";
import { getUserByDomain } from "@/lib/fetchers/users";
import { generateSEO } from "@/lib/utils";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import React from "react";
import Watermark from "./components/watermark";

interface LayoutProps {
  children: React.ReactNode;
  params: {
    domain: string;
  };
}

export async function generateMetadata({
  params,
}: LayoutProps): Promise<Metadata | null> {
  const domain = decodeURIComponent(params.domain);
  const user = await getUserByDomain(domain);
  if (!user) {
    return notFound();
  }
  const title = user.name || user.username;
  return generateSEO({
    title,
    template: title,
    seoTitle: user.seoTitle || undefined,
    description: user.seoDescription || undefined,
    image:
      user.ogImage ||
      `https://nucelo.com/api/og/user?username=${user.name || user.username}`,
    icons: user.image && [user?.image as string],
    url: user.domain ? `https://${user.domain}` : `https://${user.username}.${process.env.NEXT_PUBLIC_USER_DOMAIN}`,
  });
}

export default async function UserLayout({ children, params }: LayoutProps) {
  const domain = decodeURIComponent(params.domain);
  const user = await getUserByDomain(domain);
  if (!user) {
    return notFound();
  }
  return (
    <div className="mx-auto flex min-h-screen w-[700px] flex-col  max-md:w-full py-20 max-md:pt-10 max-md:px-4 ">
      <main className="w-full flex-1">{children}</main>
      <Command user={user} />
      <Track />
      <Watermark user={user} />
    </div>
  );
}
