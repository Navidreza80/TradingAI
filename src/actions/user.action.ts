"use server";

import prisma from "@/lib/prisma";
import { auth, currentUser } from "@clerk/nextjs/server";
import { subMonths, startOfMonth, endOfMonth } from "date-fns";

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
    return
  } finally {
    return
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

export async function updateUsername(userId: string, newUsername: string) {
  try {
    // Check if the new username is already taken
    const existingUser = await prisma.user.findUnique({
      where: { username: newUsername },
    });

    if (existingUser) {
      return { success: false, message: "Username is already taken" };
    }

    // Update the username
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { username: newUsername },
    });

    return {
      success: true,
      message: "Username updated successfully!!",
      updatedUser,
    };
  } catch (error) {
    console.error("Error updating username:", error);
    return { success: false, message: "An error occurred", error };
  }
}

export async function updateUserImage(userId: string, url: string) {
  try {
    // Update the user image
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { image: url },
    });

    return {
      success: true,
      message: "Avatar updated successfully!!",
      updatedUser,
    };
  } catch (error) {
    console.error("Error updating avatar:", error);
    return { success: false, message: "An error occurred", error };
  }
}

export async function updateUserBanner(userId: string, url: string) {
  try {
    // Update the user image
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { coverImage: url },
    });

    return {
      success: true,
      message: "Banner updated successfully!!",
      updatedUser,
    };
  } catch (error) {
    console.error("Error updating banner:", error);
    return { success: false, message: "An error occurred", error };
  }
}

export async function updateWinRate(userId: string, value: boolean) {
  try {
    // Update the user hideWinRate
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { hideWin: value },
    });
    return {
      success: true,
      message: "Updated successfully!!",
      updatedUser,
    };
  } catch (error) {
    console.error("Error updating:", error);
    return { success: false, message: "An error occurred", error };
  }
}

export async function updateTotalTrades(userId: string, value: boolean) {
  try {
    // Update the user hideWinRate
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { hideTotal: value },
    });
    return {
      success: true,
      message: "Updated successfully!!",
      updatedUser,
    };
  } catch (error) {
    console.error("Error updating:", error);
    return { success: false, message: "An error occurred", error };
  }
}

export async function updatePnL(userId: string, value: boolean) {
  try {
    // Update the user hideWinRate
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { hidePnL: value },
    });
    return {
      success: true,
      message: "Updated successfully!!",
      updatedUser,
    };
  } catch (error) {
    console.error("Error updating:", error);
    return { success: false, message: "An error occurred", error };
  }
}

export async function getUserProfits() {
  try {
    const userId = await getDbUserId();
    const now = new Date();
    const monthlyProfits = [];

    for (let i = 5; i >= 0; i--) {
      const monthStart = startOfMonth(subMonths(now, i));
      const monthEnd = endOfMonth(subMonths(now, i));

      console.log(
        `Fetching profits for: ${monthStart.toISOString()} - ${monthEnd.toISOString()}`
      );

      const profitData = await prisma.trade.aggregate({
        _sum: { pnlAmount: true },
        where: {
          userId,
          closeTime: {
            gte: monthStart.getTime(),
            lte: monthEnd.getTime(),
          },
        },
      });

      console.log(`Profit data:`, profitData); // Debugging output

      monthlyProfits.push({
        name: monthStart.toLocaleString("default", { month: "long" }),
        year: monthStart.getFullYear(),
        profit$: profitData._sum.pnlAmount ?? 0, // Ensure it returns a number
      });
    }

    return monthlyProfits;
  } catch (error) {
    console.error("Error fetching user profits:", error);
    return [];
  }
}

export async function fetchUserWinLoss() {
  try {
    const userId = await getDbUserId();
    // Get current date
    const now = new Date();

    // Prepare an array to store monthly results
    const results = [];

    // Loop through the past 6 months
    for (let i = 5; i >= 0; i--) {
      const monthStart = startOfMonth(subMonths(now, i));
      const monthEnd = endOfMonth(subMonths(now, i));

      // Convert to timestamps (assuming BigInt in database)
      const startTimestamp = monthStart.getTime();
      const endTimestamp = monthEnd.getTime();

      // Count winning trades
      const winCount = await prisma.trade.count({
        where: {
          userId,
          isWin: true,
          closeTime: {
            gte: startTimestamp,
            lte: endTimestamp,
          },
        },
      });

      // Count losing trades
      const lossCount = await prisma.trade.count({
        where: {
          userId,
          isWin: false,
          closeTime: {
            gte: startTimestamp,
            lte: endTimestamp,
          },
        },
      });

      results.push({
        name: monthStart.toLocaleString("default", { month: "short" }),
        wins: winCount,
        losses: lossCount,
      });
    }

    return results;
  } catch (error) {
    console.error("Error fetching win/loss trades:", error);
    return [];
  }
}

export async function fetchMostTradedCurrencies() {
  try {
    const userId = await getDbUserId();
    // Group trades by symbol and calculate total trades & traded amount
    const trades = await prisma.trade.groupBy({
      by: ["symbol"],
      where: { userId },
      _count: { id: true }, // Count trades
      _sum: { amount: true }, // Sum of amounts traded
      orderBy: { _count: { id: "desc" } }, // Order by most traded
    });

    // Map results with icons
    return trades.map((trade) => {
      return {
        currency: trade.symbol,
        trades: trade._count.id,
        volume: trade._sum.amount || 0,
      };
    });
  } catch (error) {
    console.error("Error fetching most traded currencies:", error);
    return [];
  }
}
