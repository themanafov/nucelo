import AuthForm from "@/components/forms/auth-form";
import { siteConfig } from "@/config/site";
import { generateSEO } from "@/lib/utils";
import type { Metadata } from "next";

export const metadata: Metadata = generateSEO({
  title: `Sign in to your ${siteConfig.name} account`,
});

export default async function Login() {
  return <AuthForm />;
}
