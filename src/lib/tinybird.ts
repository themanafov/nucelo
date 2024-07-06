import { ipAddress } from "@vercel/edge";
import { NextRequest, NextResponse, userAgent } from "next/server";
import {
  getBookmarkViaEdge,
  getUserViaEdge,
  incrementArticleViewsViaEdge,
  incrementBookmarkClicksViaEdge,
  incrementProjectViewsViaEdge,
} from "./edge";
import { rateLimit } from "./ratelimit";
import { capitalize, detectBot } from "./utils";

export async function track({
  req,
  page,
  type,
  slug,
  username,
  domain = "_root",
}: {
  req: NextRequest;
  page: string;
  type?: "articles" | "projects";
  slug?: string;
  username?: string;
  domain?: string;
}) {
  try {
    const isBot = detectBot(req);

    if (isBot) {
      return new Response(null, { status: 406 });
    }
    const referer = req.headers.get("referer");

    const geo = req.geo;
    const ua = userAgent(req);
    const ip = ipAddress(req) || "0.0.0.0";

    if (process.env.VERCEL === "1") {
      const { success } = await rateLimit.analytics.limit(
        `track:${ip}:${domain}:${page}`,
      );

      if (!success) {
        return new Response(null, { status: 200 });
      }
    } else {
      return new Response(null, { status: 200 });
    }

    const user = await getUserViaEdge(
      username,
      domain === "_root" ? undefined : domain,
    );
    if (!user) {
      return new Response(null, { status: 404 });
    }

    await Promise.all([
      user.isPro
        ? fetch("https://api.tinybird.co/v0/events?name=na", {
            headers: {
              Authorization: `Bearer ${process.env.TINYBIRD_API_KEY}`,
            },
            method: "POST",
            body: JSON.stringify({
              userId: user.userId || "Unknown",
              timestamp: new Date(Date.now()).toISOString(),
              domain,
              page,
              ip,
              country: geo?.country || "Unknown",
              city: geo?.city || "Unknown",
              region: geo?.region || "Unknown",
              latitude: geo?.latitude || "Unknown",
              longitude: geo?.longitude || "Unknown",
              ua: ua.ua || "Unknown", // ua
              browser: ua.browser.name || "Unknown",
              browser_version: ua.browser.version || "Unknown",
              engine: ua.engine.name || "Unknown",
              engine_version: ua.engine.version || "Unknown",
              os: ua.os.name || "Unknown",
              os_version: ua.os.version || "Unknown",
              device: ua.device.type ? capitalize(ua.device.type) : "Desktop",
              device_vendor: ua.device.vendor || "Unknown",
              device_model: ua.device.model || "Unknown",
              cpu_architecture: ua.cpu?.architecture || "Unknown",
              bot: ua.isBot.toString(),
              referer: referer ? new URL(referer).hostname : "(direct)",
              referer_url: referer || "(direct)",
            }),
          })
        : null,
      type && slug
        ? type === "articles"
          ? incrementArticleViewsViaEdge(slug, user.userId)
          : incrementProjectViewsViaEdge(slug, user.userId)
        : null,
    ]);

    return new Response(null, { status: 200 });
  } catch (err) {
    return new Response(null, { status: 500 });
  }
}

export async function recordClick(req: NextRequest, bookmarkId: string) {
  try {
    const isBot = detectBot(req);

    if (isBot) {
      return new Response(null, { status: 406 });
    }
    const ip = ipAddress(req) || "0.0.0.0";

    const bookmark = await getBookmarkViaEdge(bookmarkId);

    if (!bookmark) {
      return new Response(null, { status: 404 });
    }

    const url = bookmark.url;
    if (process.env.VERCEL === "1") {
      const { success } = await rateLimit.bookmark.limit(
        `click:${ip}:${bookmarkId}`,
      );

      if (!success) {
        return NextResponse.redirect(url);
      }
    } else {
      return NextResponse.redirect(url);
    }
    const user = await getUserViaEdge(undefined, undefined, bookmark.authorId);
    const geo = req.geo;
    const ua = userAgent(req);
    const referer = req.headers.get("referer");
    await Promise.all([
      user.isPro
        ? fetch("https://api.tinybird.co/v0/events?name=nb", {
            headers: {
              Authorization: `Bearer ${process.env.TINYBIRD_API_KEY}`,
            },
            method: "POST",
            body: JSON.stringify({
              timestamp: new Date(Date.now()).toISOString(),
              bookmarkId,
              ip,
              country: geo?.country || "Unknown",
              city: geo?.city || "Unknown",
              region: geo?.region || "Unknown",
              latitude: geo?.latitude || "Unknown",
              longitude: geo?.longitude || "Unknown",
              ua: ua.ua || "Unknown",
              browser: ua.browser.name || "Unknown",
              browser_version: ua.browser.version || "Unknown",
              engine: ua.engine.name || "Unknown",
              engine_version: ua.engine.version || "Unknown",
              os: ua.os.name || "Unknown",
              os_version: ua.os.version || "Unknown",
              device: ua.device.type ? capitalize(ua.device.type) : "Desktop",
              device_vendor: ua.device.vendor || "Unknown",
              device_model: ua.device.model || "Unknown",
              cpu_architecture: ua.cpu?.architecture || "Unknown",
              bot: ua.isBot.toString(),
              referer: referer ? new URL(referer).hostname : "(direct)",
              referer_url: referer || "(direct)",
            }),
          })
        : null,
      incrementBookmarkClicksViaEdge(bookmarkId, user.userId),
    ]);

    return NextResponse.redirect(url);
  } catch (err) {
    return new Response(null, { status: 500 });
  }
}