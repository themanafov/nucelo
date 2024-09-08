import sharp from "sharp";

export async function getBlurDataURL(src?: string, url?: string) {
  const res = await fetch(url ?? `${process.env.NEXT_PUBLIC_URL}${src}`);
  const buffer = await res.arrayBuffer();
  const { data } = await sharp(buffer)
    .resize(10)
    .png({ quality: 30 })
    .toBuffer({ resolveWithObject: true });

  return `data:image/png;base64,${data.toString("base64")}`;
}
