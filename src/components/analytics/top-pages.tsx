import { swrOptions } from "@/lib/constants";
import { fetcher } from "@/lib/utils";
import { useContext } from "react";
import useSWR from "swr";
import { AnalyticsContext } from ".";
import BarList from "./bar-list";
import Card from "./card";

export default function Pages() {
  const { basePath, interval } = useContext(AnalyticsContext);

  const { data, isLoading } = useSWR<{ page: string; value: number }[]>(
    `${basePath}/analytics/page?interval=${interval}`,
    fetcher,
    swrOptions,
  );

  return (
    <Card title="Pages">
      <BarList
        title="Pages"
        data={data?.map((p) => {
          return {
            name: p.page,
            value: p.value,
          };
        })}
        loading={isLoading}
      />
    </Card>
  );
}
