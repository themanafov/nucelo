"use client";

import { marketingConfig } from "@/config/marketing";
import { cn, formatDate } from "@/lib/utils";
import { Period, UserSubscriptionPlan } from "@/types";
import { FormEvent, useState, useTransition } from "react";
import { Icons } from "../shared/icons";
import { Badge } from "../ui/badge";
import Button from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { toast } from "../ui/use-toast";

interface Props {
  subscriptionPlan: UserSubscriptionPlan;
}

export default function BillingForm({ subscriptionPlan }: Props) {
  const [isLoading, startTransition] = useTransition();
  const isPro = subscriptionPlan.isPro ? "Pro" : "Free";

  const [period, setPeriod] = useState<Period>("monthly");
  async function billing(e: FormEvent) {
    e.preventDefault();
    startTransition(async () => {
      const res = await fetch("/api/user/billing", {
        method: "POST",
        body: JSON.stringify({
          plan: "pro",
          period,
        }),
      });
      if (!res?.ok) {
        toast({
          title: "Something went wrong.",
          description: "Please refresh the page and try again.",
        });
      } else {
        const data = await res.json();
        if (data) {
          window.location.href = data.url;
        }
      }
    });
  }
  return (
    <div className="flex flex-col  border border-gray-3 divide-y divide-gray-3 rounded-md">
      <div className="grid grid-cols-2 relative max-md:grid-cols-1  divide-gray-3 max-md:divide-y max-md:divide-x-0">
        <div className="absolute right-3 top-3 text-xs text-gray-4 flex items-center gap-1">
          <Checkbox
            id="plan-switch"
            className="size-[18px]"
            aria-label="Plan period toggle"
            checked={period === "yearly"}
            onCheckedChange={(checked) =>
              setPeriod(checked ? "yearly" : "monthly")
            }
          />{" "}
          <label htmlFor="plan-switch" className="select-none">
            Yearly
          </label>
        </div>
        {marketingConfig.plans.map((plan) => (
          <div
            className="flex flex-col divide-y divide-gray-3 border-r last:border-none"
            key={plan.title}
          >
            <div
              className={cn(
                "p-3 -z-10",
                plan.title === isPro ? "bg-gray-3" : "",
              )}
            >
              <div className="flex gap-2">
                <Badge className="text-secondary">{plan.title}</Badge>
                {plan.title === subscriptionPlan.title && (
                  <Badge className="text-gray-4 border-none p-0">
                    Current plan
                  </Badge>
                )}
              </div>
              <div className="flex items-center mt-2">
                <b className="text-xl  text-secondary tracking-wider  flex items-baseline gap-1">
                  ${plan.price[period]}
                  <span className="text-xs text-gray-1">
                    / {period === "monthly" ? "month" : "year"}
                  </span>
                </b>
              </div>
            </div>
            <div className="grid grid-rows-6 divide-y divide-gray-3">
              {plan.features.map((feature) => {
                const Icon = Icons[feature.icon];
                return (
                  <div
                    className="p-2 text-sm  flex items-center gap-2"
                    key={feature.name}
                  >
                    <Icon
                      size={15}
                      className={
                        feature.icon === "x" ? "text-danger" : "text-grass"
                      }
                    />
                    {feature.name}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      <div className="flex max-md:flex-col max-md:items-stretch gap-3  justify-between items-center p-3 text-xs text-gray-4">
        {subscriptionPlan.isPro ? (
          <p className="max-md:text-center">
            {subscriptionPlan.isCanceled
              ? "Your plan will expire on "
              : "Your plan renews on "}
            <b>{formatDate(new Date(subscriptionPlan.lsCurrentPeriodEnd))}</b>.
          </p>
        ) : (
          <p className="max-md:text-center">
            Upgrade plan to Pro to use all features.
          </p>
        )}

        <form onSubmit={billing} className="flex flex-col gap-2">
          <Button type="submit" disabled={isLoading} size="sm">
            {isLoading && <Icons.spinner size={15} className="animate-spin" />}
            {subscriptionPlan.isPro ? "Manage" : "Upgrade"}
          </Button>
        </form>
      </div>
    </div>
  );
}