import { guard } from "@/lib/auth";
import { put } from "@vercel/blob";
import { customAlphabet } from "nanoid";

const nanoid = customAlphabet(
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
);

const allowedContentTypes = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/webp",
] as const;

type ContentType = (typeof allowedContentTypes)[number];

export const PUT = guard(async ({ req }) => {
  try {
    const file = req.body || "";
    const contentType =
      (req.headers.get("content-type") as ContentType) ||
      "application/octet-stream";

    if (!allowedContentTypes.includes(contentType)) {
      return new Response(null, { status: 406 });
    }

    const folder = req.headers.get("storage-folder") || "";
    const filename = `${nanoid()}.${contentType.split("/")[1]}`;
    const blob = await put(`${folder}/${filename}`, file, {
      contentType,
      access: "public",
    });

    return new Response(JSON.stringify(blob));
  } catch (err) {
    return new Response(JSON.stringify(err), { status: 500 });
  }
});
