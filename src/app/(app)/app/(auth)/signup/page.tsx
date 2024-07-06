import AuthForm from "@/components/forms/auth-form";
import { Icons } from "@/components/shared/icons";
import { siteConfig } from "@/config/site";
import { generateSEO } from "@/lib/utils";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = generateSEO({
  title: `Create your ${siteConfig.name} account`,
});
export default async function Signup() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col items-center gap-4">
        <Icons.logo size={50} />
        <div>
          <h1 className="text-center text-2xl font-medium">
            Create your account
          </h1>
          <p className="text-center text-sm text-gray-4">
            Get started for free. No credit card required.
          </p>
        </div>
      </div>
      <AuthForm />
      <p className="text-gray-4 text-sm mt-2 text-center">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-semibold hover:text-secondary transition-colors"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}
