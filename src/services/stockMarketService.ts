"use server"

import { StockPair, StockMarketStats } from '@/types/stock';

export async function getStockPairs(limit: number = 6): Promise<StockPair[]> {
  try {
    // In a real app, you would fetch this from an API like Alpha Vantage or Yahoo Finance
    // For now, we'll return mock data
    return getFallbackStockPairs(limit);
  } catch (error) {
    console.error('Error fetching stock pairs:', error);
    return getFallbackStockPairs(limit);
  }
}

export async function getStockMarketStats(): Promise<StockMarketStats> {
  try {
    // Mock data for market stats
    return {
      totalVolume: "156.8B",
      marketCap: "42.3T",
      activeStocks: 8743,
      advancers: 4231,
      decliners: 3512,
      unchanged: 1000,
      lastUpdated: new Date().toISOString()
    };
  } catch (error) {
    console.error('Error fetching market stats:', error);
    return {
      totalVolume: "0",
      marketCap: "0",
      activeStocks: 0,
      advancers: 0,
      decliners: 0,
      unchanged: 0,
      lastUpdated: new Date().toISOString()
    };
  }
}

function getFallbackStockPairs(limit: number): StockPair[] {
  const fallbackPairs = [
    {
      symbol: "AAPL",
      name: "Apple Inc.",
      price: "182.63",
      change: "3.42",
      changePercent: "1.91",
      volume: "58432100",
      marketCap: "2.85T",
      image: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?ixlib=rb-4.0.3&auto=format&fit=crop&w=64&h=64&q=80"
    },
    {
      symbol: "MSFT",
      name: "Microsoft Corporation",
      price: "378.85",
      change: "5.23",
      changePercent: "1.40",
      volume: "23145600",
      marketCap: "2.81T",
      image: "https://images.unsplash.com/photo-1589149098258-3e9102cd63d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=64&h=64&q=80"
    },
    {
      symbol: "GOOGL",
      name: "Alphabet Inc.",
      price: "142.17",
      change: "1.85",
      changePercent: "1.32",
      volume: "21563400",
      marketCap: "1.79T",
      image: "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?ixlib=rb-4.0.3&auto=format&fit=crop&w=64&h=64&q=80"
    },
    {
      symbol: "AMZN",
      name: "Amazon.com Inc.",
      price: "178.75",
      change: "-1.23",
      changePercent: "-0.68",
      volume: "32145600",
      marketCap: "1.85T",
      image: "https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?ixlib=rb-4.0.3&auto=format&fit=crop&w=64&h=64&q=80"
    },
    {
      symbol: "TSLA",
      name: "Tesla Inc.",
      price: "237.49",
      change: "-5.67",
      changePercent: "-2.33",
      volume: "98745200",
      marketCap: "754.2B",
      image: "https://images.unsplash.com/photo-1617704548623-340376564e68?ixlib=rb-4.0.3&auto=format&fit=crop&w=64&h=64&q=80"
    },
    {
      symbol: "META",
      name: "Meta Platforms Inc.",
      price: "478.22",
      change: "12.34",
      changePercent: "2.65",
      volume: "18965300",
      marketCap: "1.22T",
      image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=64&h=64&q=80"
    },
    {
      symbol: "NVDA",
      name: "NVIDIA Corporation",
      price: "824.11",
      change: "15.78",
      changePercent: "1.95",
      volume: "42568700",
      marketCap: "2.03T",
      image: "https://images.unsplash.com/photo-1551808525-51a94da548ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=64&h=64&q=80"
    },
    {
      symbol: "JPM",
      name: "JPMorgan Chase & Co.",
      price: "183.27",
      change: "2.15",
      changePercent: "1.19",
      volume: "8965200",
      marketCap: "528.6B",
      image: "https://images.unsplash.com/photo-1601597111158-2fceff292cdc?ixlib=rb-4.0.3&auto=format&fit=crop&w=64&h=64&q=80"
    }
  ];
  
  return fallbackPairs.slice(0, limit);
}