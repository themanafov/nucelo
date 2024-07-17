import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const title = searchParams.get("title") || "";
  const username = searchParams.get("username") || "";
  const locked = searchParams.get("locked") || "";

  const ubuntuMedium = fetch(new URL("/fonts/ubuntu-medium.ttf", req.url)).then(
    (res) => res.arrayBuffer(),
  );

  return new ImageResponse(
    (
      <div
        tw="flex flex-col h-full w-full p-10 bg-[#1c1c1c] text-white"
        style={font("Ubuntu Medium")}
      >

        <header tw="w-full px-5 flex items-center">
          <b tw="text-3xl">{username}</b>
        </header>
        <div tw="w-full flex-1 grow pb-20 flex flex-col items-center justify-center">
          <div tw="flex items-center">
            {locked && <Lock />}
            <h1 tw="text-5xl ml-3 text-center flex items-center gap-5 leading-[60px]">{title}</h1>
          </div>
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

function Lock() {
  return (
   <svg
    xmlns="http://www.w3.org/2000/svg"
    width="45"
    height="45"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
    <path d="M7 11V7a5 5 0 0110 0v4"></path>
  </svg>
  )
}
