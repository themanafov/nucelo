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
          className="text-gray-1 relative flex"
        />
      </div>
    );
  }
  return (
    <Image
      src={
        url.includes("flagcdn")
          ? url
          : `https://icon.horse/icon/${getDomainFromURL(url)}`
      }
      alt={alt || "icon"}
      width={size}
      height={size}
      onError={() => setErr(true)}
    />
  );
}
