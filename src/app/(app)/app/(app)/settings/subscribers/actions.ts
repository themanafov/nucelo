"use server";

import { deleteSubscriber as deleteSub } from "@/lib/actions/subscribers";
import { db } from "@/lib/db";
import getCurrentUser from "@/lib/session";
import { revalidatePath } from "next/cache";
export async function newsletterToggle(prev: any, data: FormData) {
  const toggle = data.get("newsletter") === "on" ? true : false;
  const user = await getCurrentUser();
  if (!user) {
    return {
      error: "User not found",
    };
  }
  await db.user.update({
    where: {
      id: user.id,
    },
    data: {
      newsletter: toggle,
    },
  });
  revalidatePath("/settings/subscribers");
  return {
    status: toggle ? "on" : "off",
  };
}

export async function deleteSubscriber(prev: any, data: FormData) {
  try {
    const subId = data.get("subId") as string;
    const user = await getCurrentUser();
    if (!user) {
      return {
        error: "User not found",
      };
    }
    if (!subId) {
      return { error: "Subscriber not found" };
    }

    await deleteSub(subId, user.id);

    revalidatePath("/settings/subscribers");

    return {
      status: "Deleted",
    };
  } catch (err) {
    return {
      error: "Error",
    };
  }
}
