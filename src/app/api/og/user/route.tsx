import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const username = searchParams.get("username") || "";
  const ubuntuMedium = fetch(new URL("/fonts/ubuntu-medium.ttf", req.url)).then(
    (res) => res.arrayBuffer(),
  );

  return new ImageResponse(
    (
      <div tw="flex flex-col justify-center items-center h-full w-full bg-[#1c1c1c] text-white">
        <h1
          tw="text-5xl whitespace-prewrap text-center  pb-5 leading-[60px]"
          style={font("Ubuntu Medium")}
        >
          {username}
        </h1>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      emoji: "noto",
      fonts: [
        {
          name: "Ubuntu Medium",
          data: await ubuntuMedium,
        },
      ],
    },
  );
}

function font(fontFamily: string) {
  return { fontFamily };
}
