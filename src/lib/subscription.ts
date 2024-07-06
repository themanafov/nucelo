// @ts-nocheck
import { freePlan, proPlan } from "@/config/subscriptions";
import { UserSubscriptionPlan } from "@/types";
import { getSubscription } from "@lemonsqueezy/lemonsqueezy.js";
import { getServerSession } from "next-auth";
import authOptions from "./auth";
import { db } from "./db";
import { squeezy } from "./squeezy";

export async function getUserSubscriptionPlanById(
  userId: string,
): Promise<UserSubscriptionPlan> {
  const user = await db.user.findFirst({
    where: {
      id: userId,
    },
    select: {
      lsId: true,
      lsCurrentPeriodEnd: true,
      lsVariantId: true,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }
  squeezy();

  const isPro =
    user.lsId &&
    user.lsCurrentPeriodEnd &&
    new Date(user.lsCurrentPeriodEnd).getTime() + 86_400_000 > Date.now();

  const plan = isPro ? proPlan : freePlan;
  const subscription = user.lsId
    ? await getSubscription(user.lsId as string)
    : null;

  return {
    ...plan,
    ...user,
    lsCurrentPeriodEnd: user.lsCurrentPeriodEnd?.getTime(),
    isPro,
    isCanceled: subscription?.data
      ? subscription?.data?.data.attributes.cancelled
      : false,
  };
}

export async function getUserSubscriptionPlan(): Promise<UserSubscriptionPlan> {
  const session = await getServerSession(authOptions);
  const user = await db.user.findFirst({
    where: {
      id: session?.user.id,
    },
    select: {
      lsId: true,
      lsCurrentPeriodEnd: true,
      lsVariantId: true,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  squeezy();

  const isPro =
    user.lsId &&
    user.lsCurrentPeriodEnd &&
    new Date(user.lsCurrentPeriodEnd).getTime() + 86_400_000 > Date.now();

  const subscription = user.lsId
    ? await getSubscription(user.lsId as string)
    : null;

  const plan = isPro ? proPlan : freePlan;

  return {
    ...plan,
    ...user,
    lsCurrentPeriodEnd: user.lsCurrentPeriodEnd?.getTime(),
    isPro,
    isCanceled: subscription?.data
      ? subscription?.data?.data.attributes.cancelled
      : false,
  };
}
