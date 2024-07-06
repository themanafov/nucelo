import { MetadataRoute } from "next";
import { headers } from "next/headers";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const headersList = headers();
  let domain = headersList.get("host") as string;

  return [
    {
      url: `https://${domain}`,
      lastModified: new Date(),
    },
  ];
}
