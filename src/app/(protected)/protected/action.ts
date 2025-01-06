"use server";

import { getUserByDomain } from "@/lib/fetchers/users";
import { cookies, headers } from "next/headers";

export async function unlockSite(_: any, formData: FormData) {
  const password = formData.get("password")!;
  const [headersList, cookie] = await Promise.all([headers(), cookies()]);
  const domain = headersList.get("X-Domain")!;

  if (!domain) {
    return null;
  }
  const user = await getUserByDomain(domain);
  if (user?.password === password) {
    cookie.set(`${domain}`, password, {
      secure: true,
      httpOnly: true,
    });
    return {
      status: "ok",
    };
  }

  return {
    error: "Invalid password",
  };
}
