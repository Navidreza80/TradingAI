"use server"

import { TradingSignal } from '@/types/trading';

export async function getStockSignals(limit: number = 3): Promise<TradingSignal[]> {
  try {
    // In a real app, you would generate these signals using AI models
    // For now, we'll return mock data
    return getFallbackSignals(limit);
  } catch (error) {
    console.error('Error fetching stock signals:', error);
    return getFallbackSignals(limit);
  }
}

function getFallbackSignals(limit: number): TradingSignal[] {
  const fallbackSignals = [
    {
      id: 1,
      symbol: "AAPL",
      name: "Apple Inc.",
      action: "BUY",
      strength: 85,
      entryPrice: "182.50",
      targetPrice: "195.00",
      stopLoss: "175.00",
      timeframe: "Medium-term",
      analysis: "Strong technical breakout with increasing volume. Recent product announcements expected to drive revenue growth.",
      date: new Date().toISOString()
    },
    {
      id: 2,
      symbol: "MSFT",
      name: "Microsoft Corporation",
      action: "BUY",
      strength: 78,
      entryPrice: "378.00",
      targetPrice: "400.00",
      stopLoss: "365.00",
      timeframe: "Long-term",
      analysis: "Cloud business showing accelerating growth. AI integration across product lines creating competitive advantages.",
      date: new Date().toISOString()
    },
    {
      id: 3,
      symbol: "TSLA",
      name: "Tesla Inc.",
      action: "SELL",
      strength: 72,
      entryPrice: "237.50",
      targetPrice: "210.00",
      stopLoss: "250.00",
      timeframe: "Short-term",
      analysis: "Weakening demand in key markets and increasing competition. Technical indicators suggest potential downward movement.",
      date: new Date().toISOString()
    },
    {
      id: 4,
      symbol: "AMZN",
      name: "Amazon.com Inc.",
      action: "BUY",
      strength: 81,
      entryPrice: "178.75",
      targetPrice: "195.00",
      stopLoss: "170.00",
      timeframe: "Medium-term",
      analysis: "AWS growth remains strong and retail margins improving. Recent cost-cutting measures showing positive impact on profitability.",
      date: new Date().toISOString()
    },
    {
      id: 5,
      symbol: "META",
      name: "Meta Platforms Inc.",
      action: "BUY",
      strength: 76,
      entryPrice: "478.00",
      targetPrice: "520.00",
      stopLoss: "450.00",
      timeframe: "Medium-term",
      analysis: "Ad revenue recovering and Reality Labs losses narrowing. Cost efficiency measures improving overall margins.",
      date: new Date().toISOString()
    }
  ];
  
  return fallbackSignals.slice(0, limit);
}