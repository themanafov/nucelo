import { getUserAvatarViaEdge } from "@/lib/edge";
import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const username = searchParams.get("username")?.toLowerCase() || "";
  const ubuntuMedium = fetch(new URL("/fonts/ubuntu-medium.ttf", req.url)).then(
    (res) => res.arrayBuffer(),
  );

  const avatar = await getUserAvatarViaEdge(username);

  return new ImageResponse(
    (
      <div tw="flex flex-col justify-center items-center h-full p-20 w-full bg-[#1c1c1c] text-white">
        <div tw="flex items-center">
          {avatar && (
            <img
              src={avatar}
              width="50"
              height="50"
              tw="rounded-full mr-4 mt-2"
            />
          )}
          <h2
            tw="text-5xl whitespace-prewrap text-center  leading-[60px]"
            style={font("Ubuntu Medium")}
          >
            {username}
          </h2>
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
