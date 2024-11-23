import { getUserAvatarViaEdge } from "@/lib/edge";
import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const title = searchParams.get("title") || "";
  const username = searchParams.get("username")?.toLowerCase() || "";
  const locked = searchParams.get("locked") || "";

  const ubuntuMedium = fetch(new URL("/fonts/ubuntu-medium.ttf", req.url)).then(
    (res) => res.arrayBuffer(),
  );

  const avatar = await getUserAvatarViaEdge(username);

  return new ImageResponse(
    (
      <div
        tw="flex flex-col h-full w-full p-20 bg-[#1c1c1c] text-white"
        style={font("Ubuntu Medium")}
      >
        <div tw="w-full flex-1 grow  flex flex-col justify-end">
          <div tw="flex items-center">
            {locked && <Lock />}
            <h1 tw={"text-5xl text-center flex items-center leading-[60px]"}>
              {title}
            </h1>
          </div>
          <div tw="flex items-center">
            {avatar && (
              <img src={avatar} width="40" height="40" tw="rounded-full mr-4" />
            )}
            <b tw="text-3xl text-[#646464]">{username}</b>
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
      style={{
        marginRight: "10px",
      }}
    >
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0110 0v4" />
    </svg>
  );
}
