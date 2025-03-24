"use server"

import { TradingSignal } from '@/types/trading';

export async function getCommoditySignals(limit: number = 3): Promise<TradingSignal[]> {
  try {
    // In a real app, you would generate these signals using AI models
    // For now, we'll return mock data
    return getFallbackSignals(limit);
  } catch (error) {
    console.error('Error fetching commodity signals:', error);
    return getFallbackSignals(limit);
  }
}

function getFallbackSignals(limit: number): TradingSignal[] {
  const fallbackSignals = [
    {
      id: 1,
      symbol: "XAUUSD",
      name: "Gold",
      action: "BUY",
      strength: 87,
      entryPrice: "2345.00",
      targetPrice: "2450.00",
      stopLoss: "2300.00",
      timeframe: "Medium-term",
      analysis: "Gold is showing strong momentum with increasing safe-haven demand. Technical indicators suggest continued upward movement with solid support levels.",
      date: new Date().toISOString()
    },
    {
      id: 2,
      symbol: "CLUSD",
      name: "Crude Oil (WTI)",
      action: "SELL",
      strength: 75,
      entryPrice: "78.30",
      targetPrice: "74.50",
      stopLoss: "80.00",
      timeframe: "Short-term",
      analysis: "Oil is facing resistance at current levels with bearish divergence on momentum indicators. Recent inventory data shows increasing supply concerns.",
      date: new Date().toISOString()
    },
    {
      id: 3,
      symbol: "HGUSD",
      name: "Copper",
      action: "BUY",
      strength: 82,
      entryPrice: "4.28",
      targetPrice: "4.50",
      stopLoss: "4.15",
      timeframe: "Long-term",
      analysis: "Copper demand outlook remains strong due to green energy transition and infrastructure spending. Supply constraints from major producing regions add support.",
      date: new Date().toISOString()
    },
    {
      id: 4,
      symbol: "NGUSD",
      name: "Natural Gas",
      action: "BUY",
      strength: 78,
      entryPrice: "2.87",
      targetPrice: "3.20",
      stopLoss: "2.70",
      timeframe: "Medium-term",
      analysis: "Natural gas is showing signs of bottoming with seasonal demand expected to increase. Storage levels are below 5-year averages, supporting higher prices.",
      date: new Date().toISOString()
    },
    {
      id: 5,
      symbol: "SBUSD",
      name: "Soybeans",
      action: "BUY",
      strength: 73,
      entryPrice: "12.45",
      targetPrice: "13.20",
      stopLoss: "12.00",
      timeframe: "Medium-term",
      analysis: "Soybeans are supported by strong export demand and weather concerns in key growing regions. Technical breakout suggests further upside potential.",
      date: new Date().toISOString()
    }
  ];
  
  return fallbackSignals.slice(0, limit);
}