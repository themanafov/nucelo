"use client";

import { getDomainFromURL } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";
import { Icons } from "../shared/icons";

export default function Favicon({
  url,
  alt,
  size = 20,
}: {
  url: string;
  alt?: string;
  size?: number;
}) {
  const [err, setErr] = useState<boolean>(false);

  if (err) {
    return (
      <div>
        <Icons.globe
          width={size}
          height={size}
          className="text-gray-1 relative flex z-10"
        />
      </div>
    );
  }
  return (
    <Image
      src={
        url.includes("flagcdn")
          ? url
          : `https://icons.duckduckgo.com/ip3/${getDomainFromURL(url)}.ico`
      }
      alt={alt || "icon"}
      className="z-10"
      width={size}
      height={size}
      onError={() => setErr(true)}
    />
  );
}
