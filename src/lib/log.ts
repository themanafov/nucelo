import { LogSnag } from "@logsnag/node";

const logsnag = new LogSnag({
  token: process.env.LOGSNAG_TOKEN!,
  project: "nucelo",
});

export default async function log(event: string, text: string, userId: string) {
  return await logsnag.track({
    channel: "logs",
    event,
    user_id: userId,
    description: text,
    icon: "💾",
  });
}
