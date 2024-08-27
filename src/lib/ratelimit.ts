import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

export const rateLimit = {
  bookmark: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(1, "1 h"),
    prefix: "clicks",
    analytics: true,
  }),
  analytics: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(1, "5 h"),
    prefix: "analytics",
    analytics: true,
  }),
  subscribe: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(5, "5 h"),
    prefix: "subscribe",
    analytics: true,
  }),
};
