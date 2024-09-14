import type { Metadata } from "next";
import Onboarding from "./client";

export const metadata: Metadata = {
  title: "Onboarding",
};

export default async function OnboardingPage() {
  return <Onboarding />;
}
