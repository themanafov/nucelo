import { PutBlobResult } from "@vercel/blob";
import { StorageFolders } from "./constants";

type Response = {
  error?: string;
  url?: string;
};
export async function uploadFile(
  file: File,
  folder?: (typeof StorageFolders)[number],
): Promise<Response> {
  const res = await fetch("/api/assets", {
    method: "PUT",
    body: file,
    headers: {
      "content-type": file.type,
      "storage-folder": folder ?? "",
    },
  });

  if (!res.ok) {
    if (res.status === 413) {
      return {
        error: "You exceeded the file size. Up to 4MB",
      };
    }
    return {
      error: "Something went wrong",
    };
  }

  const data = (await res.json()) as PutBlobResult;

  return {
    url: data.url,
  };
}
