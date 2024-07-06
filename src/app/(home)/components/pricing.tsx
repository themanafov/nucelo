import { Icons } from "@/components/shared/icons";
import { Badge } from "@/components/ui/badge";
import Button from "@/components/ui/button";
import { marketingConfig } from "@/config/marketing";
import { siteConfig } from "@/config/site";
import { Period } from "@/types";
import Link from "next/link";

export default function Pricing() {
  return (
    <section className="section-container">
      <h3 className="font-medium section-title">Pricing</h3>
      <div className="grid grid-cols-1 gap-2 section-content">
        {marketingConfig.plans.map((plan) => (
          <div className="border border-gray-2 rounded-md" key={plan.title}>
            <div className="flex justify-between items-center border-b border-gray-2  p-4">
              <div className="text-sm">
                <b className="font-medium">{plan.title}</b>
                <p className="text-xs text-gray-4">{plan.description}</p>
              </div>
              {plan.title === "Pro" ? (
                <div className="flex items-center gap-1 max-md:flex-col *:border-0 *:font-medium *:py-1.5">
                  {Object.keys(plan.price).map((period) => (
                    <Badge key={period}>
                      ${plan.price[period as Period]} /{" "}
                      {period.replace("ly", "")}
                    </Badge>
                  ))}
                </div>
              ) : (
                <Badge className="py-1.5 border-0 font-medium">
                  ${plan.price.monthly} / month
                </Badge>
              )}
            </div>
            <div className="p-4  border-b border-gray-2 ">
              <ul className="flex flex-col gap-1.5">
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
            <div className="p-4">
              <Link href={siteConfig.links.signup} aria-label="Get Started">
                <Button className="w-full" variant="secondary" size="sm">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
