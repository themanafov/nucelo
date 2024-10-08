import type { SWRConfiguration } from "swr";

export const swrOptions: SWRConfiguration = {
  revalidateOnFocus: false,
};

export const validDomainRegex = new RegExp(
  /^([a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/,
);

export const URLRegex = new RegExp(/^https?:\/\/.*/);
export const DateRegex = new RegExp(
  /^(19\d{2}|20[0-9]{2})-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/,
);
export const validUsernameRegex = new RegExp(/^[a-zA-Z0-9]+$/);
export const StorageFolders = [
  "avatars",
  "og-images",
  "editor-uploads",
] as const;

export const analyticsEndpoint = {
  analytics: {
    primary: "nap",
    timeseries: "nat",
    total: "nav",
  },
  bookmarks: {
    primary: "nbp",
    timeseries: "nbt",
    total: "nbc",
  },
} as const;

export const analyticsSources = {
  analytics: "na",
  bookmarks: "nb",
} as const;
