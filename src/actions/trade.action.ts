"use server";
// Prisma client imports
import prisma from "@/lib/prisma";
// Server actions
import { getDbUserId } from "./user.action";
// Payload type for type safety
import { ClosedTrade } from "@/types/trade";

// Action to post closed trade to database
export async function closeTrade(tradeData: ClosedTrade) {
  try {
    const userId = await getDbUserId();
    if (!userId) return "User not authenticated";
    const closedTrade = await prisma.trade.create({
      data: {
        symbol: tradeData.symbol,
        type: tradeData.type,
        amount: tradeData.amount,
        leverage: tradeData.leverage,
        mode: tradeData.mode,
        entryPrice: tradeData.entryPrice,
        closePrice: tradeData.closePrice,
        pnlAmount: tradeData.pnl.amount,
        pnlPercent: tradeData.pnl.percentage,
        takeProfit: tradeData.takeProfit || null,
        stopLoss: tradeData.stopLoss || null,
        timestamp: tradeData.timestamp,
        closeTime: Date.now(),
        isWin: tradeData.isWin,
        userId: userId,
      },
    });

    return { success: true, data: closedTrade };
  } catch (error) {
    return { success: false, message: "Failed to close trade", error };
  }
}

// Action to calculate user overall trading status
export async function calculateUserStats() {
  try {
    const userId = await getDbUserId();
    if (!userId) return "User not authenticated";
    // Count total trades
    const totalTrades = await prisma.trade.count({
      where: { userId },
    });

    // Count total winning trades
    const totalWins = await prisma.trade.count({
      where: { userId, isWin: true },
    });

    // Calculate total profit/loss (sum of pnlAmount)
    const totalPnLResult = await prisma.trade.aggregate({
      where: { userId },
      _sum: { pnlAmount: true },
    });

    const totalPnL = totalPnLResult._sum.pnlAmount || 0;

    // Avoid division by zero
    const winRate = totalTrades > 0 ? (totalWins / totalTrades) * 100 : 0;

    return { winRate, totalTrades, totalWins, totalPnL };
  } catch (error) {
    return {error, message: "Failed to fetch", success: false}
    return { winRate: 0, totalTrades: 0, totalWins: 0, totalPnL: 0, error };
  }
}

// Action to fetch closed trade
export async function fetchClosedTrades() {
  try {
    const userId = await getDbUserId();
    if (!userId) return "User not authenticated";
    const closedTrades = await prisma.trade.findMany({
      where: { userId },
      orderBy: { closeTime: "desc" }, // Orders by most recent closed trades
    });

    return closedTrades;
  } catch (error) {
    console.error("Error fetching closed trades:", error);
    return [];
  }
}
