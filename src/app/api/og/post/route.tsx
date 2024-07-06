import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const title = searchParams.get("title") || "";
  const username = searchParams.get("username") || "";

  const ubuntuMedium = fetch(new URL("/fonts/ubuntu-medium.ttf", req.url)).then(
    (res) => res.arrayBuffer(),
  );

  return new ImageResponse(
    (
      <div
        tw="flex flex-col font-ubuntuBold h-full w-full p-10 bg-[#1c1c1c] text-white"
        style={font("Ubuntu Medium")}
      >
        <header tw="w-full px-5 flex items-center">
          <b tw="text-3xl">{username}</b>
        </header>
        <div tw="w-full flex-1 grow pb-20 flex flex-col items-center justify-center">
          <h1 tw="text-5xl whitespace-pre-wrap text-center  leading-[60px]">
            {title}
          </h1>
        </div>
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
