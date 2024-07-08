import { swrOptions } from "@/lib/constants";
import { fetcher } from "@/lib/utils";
import { useContext, useState } from "react";
import useSWR from "swr";
import { AnalyticsContext } from ".";
import BarList from "./bar-list";
import Card from "./card";

export type DevicesTabs = "device" | "OS" | "browser";

export default function Devices() {
  const [tab, setTab] = useState<DevicesTabs>("device");
  const { basePath, interval } = useContext(AnalyticsContext);

  const { data, isLoading } = useSWR<
    {
      device: string;
      os: string;
      browser: string;
      value: number;
    }[]
  >(
    `${basePath}/analytics/${tab.toLowerCase()}?interval=${interval}`,
    fetcher,
    swrOptions,
  );

  return (
    <Card
      title="Devices"
      tabs={["Device", "OS", "Browser"]}
      setTab={setTab}
      activeTab={tab}
    >
      <BarList
        title={tab}
        data={data?.map((d) => {
          return {
            name: d.device || d.os || d.browser,
            value: d.value,
          };
        })}
        loading={isLoading}
      />
    </Card>
  );
}
