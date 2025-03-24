"use server"

import { CryptoSignal } from '@/types/crypto';

export async function getCryptoSignals(limit: number = 3): Promise<CryptoSignal[]> {
  try {
    // In a real implementation, you would fetch from an AI signal provider API
    // For now, we'll simulate a delay and return mock data
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return getFallbackSignals(limit);
  } catch (error) {
    console.error('Error fetching crypto signals:', error);
    return getFallbackSignals(limit);
  }
}

function getFallbackSignals(limit: number): CryptoSignal[] {
  const fallbackSignals = [
    {
      id: 1,
      symbol: "BTC/USD",
      direction: "buy" as const,
      entryPrice: 57200,
      takeProfit: 62500,
      stopLoss: 54800,
      confidence: 85,
      image: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png"
    },
    {
      id: 2,
      symbol: "ETH/USD",
      direction: "buy" as const,
      entryPrice: 3520,
      takeProfit: 3850,
      stopLoss: 3350,
      confidence: 78,
      image: "https://assets.coingecko.com/coins/images/279/large/ethereum.png"
    },
    {
      id: 3,
      symbol: "SOL/USD",
      direction: "sell" as const,
      entryPrice: 98.5,
      takeProfit: 88.0,
      stopLoss: 103.5,
      confidence: 65,
      image: "https://assets.coingecko.com/coins/images/4128/large/solana.png"
    },
    {
      id: 4,
      symbol: "ADA/USD",
      direction: "buy" as const,
      entryPrice: 1.23,
      takeProfit: 1.45,
      stopLoss: 1.12,
      confidence: 72,
      image: "https://assets.coingecko.com/coins/images/975/large/cardano.png"
    },
    {
      id: 5,
      symbol: "DOT/USD",
      direction: "sell" as const,
      entryPrice: 21.8,
      takeProfit: 19.5,
      stopLoss: 23.0,
      confidence: 68,
      image: "https://assets.coingecko.com/coins/images/12171/large/polkadot.png"
    }
  ];
  
  return fallbackSignals.slice(0, limit);
}