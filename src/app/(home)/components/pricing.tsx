import { Icons } from "@/components/shared/icons";
import { Badge } from "@/components/ui/badge";
import Button from "@/components/ui/button";
import { marketingConfig } from "@/config/marketing";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { Period } from "@/types";
import Link from "next/link";

export default function Pricing() {
  return (
    <section className="section-container">
      <div className="grid grid-cols-2 max-md:grid-cols-1 gap-3 section-content">
        {marketingConfig.plans.map((plan) => {
          const isProPlan = plan.title === "Pro";

          return (
            <div
              className={cn(
                "border border-gray-2 rounded-md",
                isProPlan && "bg-gray-3",
              )}
              key={plan.title}
            >
              <div className="flex justify-between items-center border-b border-gray-2 p-3">
                <div className="text-sm">
                  <b className="font-medium">{plan.title}</b>
                  <p className="text-xs text-gray-4">{plan.description}</p>
                </div>
                {isProPlan ? (
                  <div className="flex items-center gap-1 ">
                    {Object.keys(plan.price).map((period) => (
                      <Badge key={period} className="py-1 text-secondary">
                        ${plan.price[period as Period]} /{" "}
                        {period.replace("ly", "")}
                      </Badge>
                    ))}
                  </div>
                ) : (
                  <Badge className="py-1 text-secondary">Free</Badge>
                )}
              </div>
              <div className="p-3 border-b border-gray-2 ">
                <ul className="flex flex-col gap-3">
                  {plan.features.map((f) => {
                    const Icon = Icons[f.icon];
                    return (
                      <li
                        className="text-xs flex gap-1.5 text-gray-4 items-center"
                        key={f.name}
                      >
                        <Icon
                          size={15}
                          className={
                            f.icon === "x" ? "text-danger" : "text-grass"
                          }
                        />
                        {f.name}
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className="p-3">
                <Link href={siteConfig.links.signup} aria-label="Get Started">
                  <Button
                    className="w-full"
                    size="sm"
                    variant={isProPlan ? "primary" : "default"}
                  >
                    Get Started
                  </Button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
