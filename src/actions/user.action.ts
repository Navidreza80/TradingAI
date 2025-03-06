"use server";

import prisma from "@/lib/prisma";
import { auth, currentUser } from "@clerk/nextjs/server";

export async function syncUser() {
  try {
    const { userId } = await auth();
    const user = await currentUser();

    if (!userId || !user) return;

    const existingUser = await prisma.user.findUnique({
      where: {
        clerkId: userId,
      },
    });

    if (existingUser) return existingUser;

    const dbUser = await prisma.user.create({
      data: {
        clerkId: userId,
        name: `${user.firstName || ""} ${user.lastName || ""}`,
        username:
          user.username ?? user.emailAddresses[0].emailAddress.split("@")[0],
        email: user.emailAddresses[0].emailAddress,
        image: user.imageUrl,
      },
    });

    return dbUser;
  } catch (error) {
    console.log("Error in syncUser", error);
  }
}

export async function getUserByClerkId(clerkId: string) {
  return prisma.user.findUnique({
    where: {
      clerkId,
    },
  });
}

export async function getDbUserId() {
  const { userId: clerkId } = await auth();
  if (!clerkId) return clerkId;

  const user = await getUserByClerkId(clerkId);

  if (!user) throw new Error("User not found");

  return user.id;
}

export async function getDbUser() {
  const { userId: clerkId } = await auth();
  if (!clerkId) return clerkId;

  const user = await getUserByClerkId(clerkId);

  if (!user) throw new Error("User not found");

  return user;
}

export async function calculateWinRate() {
  try {
    const userId = await getDbUserId();
    const totalTrades = await prisma.trade.count({
      where: { userId },
    });

    const totalWins = await prisma.trade.count({
      where: { userId: userId, isWin: true },
    });
  
    if (totalTrades === 0) {
      return { winRate: 0, totalTrades, totalWins };
    }

    const winRate = (totalWins / totalTrades) * 100;

    return { winRate, totalTrades, totalWins };
  } catch (error) {
    console.error("Error calculating win rate:", error);
    return { winRate: 0, totalTrades: 0, totalWins: 0, error };
  }
}
