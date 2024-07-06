import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: ["/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)"],
};

export default async function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const path = url.pathname;
  const hostname = req.headers.get("host")!;
  const session = await getToken({ req });
  const searchParams = `?${url.searchParams.toString()}`;
  const userDomain = process.env.NEXT_PUBLIC_USER_DOMAIN as string;
  const appDomain = process.env.NEXT_PUBLIC_APP_DOMAIN as string;
  const vercelDomain = ".vercel.app";

  if (
    (hostname.endsWith(appDomain) || hostname.endsWith(vercelDomain)) &&
    !hostname.startsWith("app") &&
    !hostname.includes("localhost")
  ) {
    if (path === "/" && session) {
      return NextResponse.redirect(process.env.NEXT_PUBLIC_APP_URL as string);
    } else if (path === "/" && !session) {
      return NextResponse.redirect(new URL("/home", req.url));
    }
  }

  if (hostname === `app.${appDomain}`) {
    const isAuthPage = path === "/login" || path === "/signup";
    if (session && isAuthPage) {
      return NextResponse.redirect(new URL("/", req.url));
    } else if (!session && !isAuthPage) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    return NextResponse.rewrite(
      new URL(
        `/app${path === "/" ? "" : path}${
          url.searchParams ? searchParams : ""
        }`,
        req.url,
      ),
    );
  }

  if (hostname.endsWith(`.${userDomain}`)) {
    return NextResponse.rewrite(
      new URL(
        `/user/${hostname.split(".")[0]}${path === "/" ? "" : path}${
          url.searchParams ? searchParams : ""
        }`,
        req.url,
      ),
    );
  }

  if (!hostname.includes(userDomain) && !hostname.endsWith(vercelDomain)) {
    return NextResponse.rewrite(
      new URL(
        `/user/${hostname}${path === "/" ? "" : path}${
          url.searchParams ? searchParams : ""
        }`,
        req.url,
      ),
    );
  }
}
