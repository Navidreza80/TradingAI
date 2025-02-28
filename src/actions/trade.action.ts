"use server"

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
        closeTime: BigInt(Date.now()),
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

export async function calculateWinRate(userId) {
  try {
    // شمارش تعداد کل معاملات کاربر
    const totalTrades = await prisma.trade.count({
      where: { userId },
    });

    // شمارش تعداد معاملات برنده
    const totalWins = await prisma.trade.count({
      where: { userId, isWin: true },
    });

    // جلوگیری از تقسیم بر صفر
    if (totalTrades === 0) {
      return { winRate: 0, totalTrades, totalWins };
    }

    // محاسبه نرخ برد
    const winRate = (totalWins / totalTrades) * 100;

    return { winRate, totalTrades, totalWins };
  } catch (error) {
    console.error('Error calculating win rate:', error);
    return { winRate: 0, totalTrades: 0, totalWins: 0, error };
  }
}
