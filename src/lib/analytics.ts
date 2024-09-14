import * as z from "zod";
import { getEndpoint } from "./utils";

export const INTERVALS = [
  {
    display: "Last hour",
    value: "1h",
  },
  {
    display: "Last 24 hours",
    value: "24h",
  },
  {
    display: "Last 7 days",
    value: "7d",
  },
  {
    display: "Last 30 days",
    value: "30d",
  },
  {
    display: "Last 3 months",
    value: "90d",
  },
  {
    display: "All Time",
    value: "all",
  },
];

export type IntervalProps = "1h" | "24h" | "7d" | "30d" | "90d" | "all";
export const analyticsProperties = [
  "total",
  "timeseries",
  "page",
  "country",
  "city",
  "device",
  "os",
  "browser",
  "referer",
] as const;

export type PropertyProps = (typeof analyticsProperties)[number];

export const ZodAnalyticsProperty = z.enum([...analyticsProperties]);

export const intervalData = {
  "1h": {
    startDate: new Date(Date.now() - 3600000),
    granularity: "minute",
  },
  "24h": {
    startDate: new Date(Date.now() - 86400000),
    granularity: "hour",
  },
  "7d": {
    startDate: new Date(Date.now() - 604800000),
    granularity: "day",
  },
  "30d": {
    startDate: new Date(Date.now() - 2592000000),
    granularity: "day",
  },
  "90d": {
    startDate: new Date(Date.now() - 7776000000),
    granularity: "month",
  },
  all: {
    startDate: new Date("2024-07-06"),
    granularity: "month",
  },
};

export const IntervalZod = z.enum(
  Object.keys(intervalData) as [keyof typeof intervalData],
);

export const analyticsSearchParamsSchema = z.object({
  interval: IntervalZod,
});

export async function getAnalytics({
  page,
  interval = "7d",
  property,
  userId,
}: {
  page?: string;
  property: PropertyProps;
  interval?: IntervalProps;
  userId: string;
}) {
  try {
    const endpoint = getEndpoint(property, "analytics");
    const url = new URL(`https://api.tinybird.co/v0/pipes/${endpoint}.json`);

    url.searchParams.append("type", property);
    if (page) {
      url.searchParams.append("page", page);
    }
    url.searchParams.append("userId", userId);

    if (interval) {
      url.searchParams.append(
        "start",
        intervalData[interval].startDate
          .toISOString()
          .replace("T", " ")
          .replace("Z", "")
          .slice(0, 19),
      );
      url.searchParams.append(
        "end",
        new Date(Date.now())
          .toISOString()
          .replace("T", " ")
          .replace("Z", "")
          .slice(0, 19),
      );
      url.searchParams.append(
        "granularity",
        intervalData[interval].granularity,
      );
    }
    const res = await fetch(url.toString(), {
      headers: {
        Authorization: `Bearer ${process.env.TINYBIRD_API_KEY}`,
      },
    });

    const body = await res.json();
    return body?.data;
  } catch (err) {
    return new Response(JSON.stringify(err), { status: 500 });
  }
}

export async function getBookmarkAnalytics({
  id,
  property,
  interval = "7d",
}: {
  id: string;
  property: PropertyProps;
  interval?: IntervalProps;
}) {
  const endpoint = getEndpoint(property, "bookmarks");

  const url = new URL(`https://api.tinybird.co/v0/pipes/${endpoint}.json`);
  url.searchParams.append("id", id);
  url.searchParams.append("type", property);
  if (interval) {
    url.searchParams.append(
      "start",
      intervalData[interval].startDate
        .toISOString()
        .replace("T", " ")
        .replace("Z", "")
        .slice(0, 19),
    );
    url.searchParams.append(
      "end",
      new Date(Date.now())
        .toISOString()
        .replace("T", " ")
        .replace("Z", "")
        .slice(0, 19),
    );
    url.searchParams.append("granularity", intervalData[interval].granularity);
  }

  const res = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${process.env.TINYBIRD_API_KEY}`,
    },
  });

  const body = await res.json();

  return body?.data;
}
