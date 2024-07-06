type NoorThread = "nucelo-logs";

export default async function log(
  text: string,
  thread: NoorThread = "nucelo-logs",
) {
  return await fetch("https://sun.noor.to/api/v0/sendMessage", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.NOOR_API_KEY}`,
    },
    body: JSON.stringify({
      spaceId: process.env.NOOR_SPACE_ID,
      thread,
      notifyByName: ["manafov"],
      text,
    }),
  });
}
