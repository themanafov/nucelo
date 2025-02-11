import { swrOptions } from "@/lib/constants";
import { countries } from "@/lib/constants/countries";
import { fetcher } from "@/lib/utils";
import { use, useState } from "react";
import useSWR from "swr";
import { AnalyticsContext } from ".";
import BarList from "./bar-list";
import Card from "./card";

export type LocationsTabs = "country" | "city";

export default function Locations() {
  const [tab, setTab] = useState<LocationsTabs>("country");
  const { basePath, interval } = use(AnalyticsContext);

  const { data, isLoading } = useSWR<
    {
      country: string;
      city: string;
      value: number;
    }[]
  >(
    `${basePath}/analytics/${tab.toLowerCase()}?interval=${interval}`,
    fetcher,
    swrOptions,
  );

  return (
    <Card
      title="Locations"
      tabs={["Country", "City"]}
      setTab={setTab}
      activeTab={tab}
    >
      <BarList
        title={tab}
        data={data?.map((l) => {
          return {
            name: l.city || countries[l.country],
            icon: l.country
              ? `https://flagcdn.com/60x45/${l.country.toLowerCase()}.png`
              : undefined,
            value: l.value,
          };
        })}
        loading={isLoading}
      />
    </Card>
  );
}
