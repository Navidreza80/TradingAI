"use server";

import prisma from "@/lib/prisma";
import { getDbUserId } from "./user.action";

export async function closeTrade(tradeData) {
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
    console.error("Error closing trade:", error);
    return { success: false, message: "Failed to close trade", error };
  }
}

export async function calculateUserStats(userId: string) {
  try {
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
    console.error("Error calculating user stats:", error);
    return { winRate: 0, totalTrades: 0, totalWins: 0, totalPnL: 0, error };
  }
}