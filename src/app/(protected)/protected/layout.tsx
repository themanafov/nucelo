import { headers } from "next/headers";
import { notFound } from "next/navigation";
import React from "react";

export default async function PasswordProtectionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const domain = (await headers()).get("X-Domain");
  if (!domain) {
    return notFound();
  }
  return children;
}
