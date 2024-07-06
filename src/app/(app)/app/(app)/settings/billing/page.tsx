import BillingForm from "@/components/forms/billing-form";
import AppShell from "@/components/layout/app-shell";
import { getUserSubscriptionPlan } from "@/lib/subscription";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Billing",
};
export default async function BillingPage() {
  const subscription = await getUserSubscriptionPlan();

  return (
    <AppShell>
      <BillingForm
        subscriptionPlan={{
          ...subscription,
          isCanceled: subscription.isCanceled,
        }}
      />
    </AppShell>
  );
}
