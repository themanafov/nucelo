"use server";

import { deleteSubscriber } from "@/lib/actions/subscribers";

export async function unsubscribe(subId: string, userId: string) {
  try {
    await deleteSubscriber(subId, userId);
    return {
      success: "Unsubscribed",
    };
  } catch (err) {
    return {
      error: "Something went wrong",
    };
  }
}
