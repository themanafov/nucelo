import { getUserAvatarViaEdge } from "@/lib/edge";
import { getInitials } from "@/lib/utils";
import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const username = searchParams.get("username")?.toLowerCase() || "";

  const size = 64;

  const avatar = await getUserAvatarViaEdge(username);
  if (avatar) {
    return new ImageResponse(<img src={avatar} width={size} height={size} />, {
      width: size,
      height: size,
    });
  }

  const ubuntuMedium = fetch(new URL("/fonts/ubuntu-medium.ttf", req.url)).then(
    (res) => res.arrayBuffer(),
  );
  return new ImageResponse(
    (
      <div
        style={{
          width: size,
          height: size,
          backgroundColor: "#1c1c1c",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "#ffffff",
          fontSize: 24,
          fontWeight: "bold",
          fontFamily: "Ubuntu Medium",
        }}
      >
        {getInitials(username)}
      </div>
    ),
    {
      width: size,
      height: size,
      fonts: [
        {
          name: "Ubuntu Medium",
          data: await ubuntuMedium,
        },
      ],
    },
  );
}
