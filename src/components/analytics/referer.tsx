import { swrOptions } from "@/lib/constants";
import { fetcher } from "@/lib/utils";
import { useContext } from "react";
import useSWR from "swr";
import { AnalyticsContext } from ".";
import BarList from "./bar-list";
import Card from "./card";

export default function Referrers({ className }: { className?: string }) {
  const { basePath, interval } = useContext(AnalyticsContext);

  const { data, isLoading } = useSWR<{ referer: string; value: number }[]>(
    `${basePath}/analytics/referer?interval=${interval}`,
    fetcher,
    swrOptions,
  );

  return (
    <Card title="Referrers" className={className}>
      <BarList
        title="Referrers"
        data={data?.map((r) => {
          return {
            name: r.referer,
            value: r.value,
            icon: r.referer ?? null,
          };
        })}
        loading={isLoading}
      />
    </Card>
  );
}
