import { lemonSqueezySetup } from "@lemonsqueezy/lemonsqueezy.js";
export async function squeezy() {
  lemonSqueezySetup({
    apiKey: process.env.SQUEEZY_API_KEY,
    onError(error) {
      console.log(error);
    },
  });
}
