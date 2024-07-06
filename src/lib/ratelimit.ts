import { Ratelimit } from "@upstash/ratelimit";
import { kv } from "@vercel/kv";

const redis = kv;

export const rateLimit = {
  bookmark: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(1, "1 h"),
    prefix: "clicks",
  }),
  analytics: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(1, "5 h"),
    prefix: "analytics",
  }),
  subscribe: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(5, "5 h"),
    prefix: "subscribe",
  }),
};
