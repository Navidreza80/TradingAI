"use server"

import { CommodityPair, CommodityMarketStats } from '@/types/commodity';

export async function getCommodityPairs(limit: number = 6): Promise<CommodityPair[]> {
  try {
    // In a real app, you would fetch this from an API
    // For now, we'll return mock data
    return getFallbackCommodityPairs(limit);
  } catch (error) {
    console.error('Error fetching commodity pairs:', error);
    return getFallbackCommodityPairs(limit);
  }
}

export async function getCommodityMarketStats(): Promise<CommodityMarketStats> {
  try {zzz
    // Mock data for market stats
    return {
      totalVolume: "245.3B",
      marketCap: "12.7T",
      activeCommodities: 48,
      advancers: 28,
      decliners: 15,
      unchanged: 5,
      lastUpdated: new Date().toISOString()
    };
  } catch (error) {
    console.error('Error fetching market stats:', error);
    return {
      totalVolume: "0",
      marketCap: "0",
      activeCommodities: 0,
      advancers: 0,
      decliners: 0,
      unchanged: 0,
      lastUpdated: new Date().toISOString()
    };
  }
}

function getFallbackCommodityPairs(limit: number): CommodityPair[] {
  const fallbackPairs = [
    {
      symbol: "XAUUSD",
      name: "Gold",
      price: "2345.60",
      change: "28.75",
      changePercent: "1.24",
      volume: "154320",
      category: "Precious Metals",
      image: "https://images.unsplash.com/photo-1610375461369-d613b564f4c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=64&h=64&q=80"
    },
    {
      symbol: "XAGUSD",
      name: "Silver",
      price: "28.75",
      change: "0.25",
      changePercent: "0.87",
      volume: "98750",
      category: "Precious Metals",
      image: "https://images.unsplash.com/photo-1624365169198-f1631dbc41ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=64&h=64&q=80"
    },
    {
      symbol: "CLUSD",
      name: "Crude Oil (WTI)",
      price: "78.32",
      change: "-0.35",
      changePercent: "-0.45",
      volume: "325680",
      category: "Energy",
      image: "https://images.unsplash.com/photo-1605801407838-b78f78d0c544?ixlib=rb-4.0.3&auto=format&fit=crop&w=64&h=64&q=80"
    },
    {
      symbol: "NGUSD",
      name: "Natural Gas",
      price: "2.87",
      change: "0.06",
      changePercent: "2.14",
      volume: "187450",
      category: "Energy",
      image: "https://images.unsplash.com/photo-1626324579004-a229426a1c82?ixlib=rb-4.0.3&auto=format&fit=crop&w=64&h=64&q=80"
    },
    {
      symbol: "HGUSD",
      name: "Copper",
      price: "4.28",
      change: "0.03",
      changePercent: "0.71",
      volume: "78560",
      category: "Industrial Metals",
      image: "https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?ixlib=rb-4.0.3&auto=format&fit=crop&w=64&h=64&q=80"
    },
    {
      symbol: "CTUSD",
      name: "Cotton",
      price: "0.8745",
      change: "0.0125",
      changePercent: "1.45",
      volume: "65430",
      category: "Agriculture",
      image: "https://images.unsplash.com/photo-1594113179520-68a06720fe44?ixlib=rb-4.0.3&auto=format&fit=crop&w=64&h=64&q=80"
    },
    {
      symbol: "ZCUSD",
      name: "Corn",
      price: "4.87",
      change: "0.08",
      changePercent: "1.67",
      volume: "98760",
      category: "Agriculture",
      image: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?ixlib=rb-4.0.3&auto=format&fit=crop&w=64&h=64&q=80"
    },
    {
      symbol: "PLUSD",
      name: "Platinum",
      price: "978.50",
      change: "-5.25",
      changePercent: "-0.53",
      volume: "45670",
      category: "Precious Metals",
      image: "https://images.unsplash.com/photo-1607344645866-009c320b63e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=64&h=64&q=80"
    },
    {
      symbol: "SBUSD",
      name: "Soybeans",
      price: "12.45",
      change: "0.18",
      changePercent: "1.47",
      volume: "78540",
      category: "Agriculture",
      image: "https://images.unsplash.com/photo-1599471069825-31cc0d4d7d37?ixlib=rb-4.0.3&auto=format&fit=crop&w=64&h=64&q=80"
    },
    {
      symbol: "LHUSD",
      name: "Lean Hogs",
      price: "0.9245",
      change: "-0.0065",
      changePercent: "-0.70",
      volume: "32450",
      category: "Livestock",
      image: "https://images.unsplash.com/photo-1604430456280-40659c9a2a6b?ixlib=rb-4.0.3&auto=format&fit=crop&w=64&h=64&q=80"
    },
    {
      symbol: "KCUSD",
      name: "Coffee",
      price: "2.14",
      change: "0.05",
      changePercent: "2.39",
      volume: "54320",
      category: "Agriculture",
      image: "https://images.unsplash.com/photo-1559496417-e7f25cb247f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=64&h=64&q=80"
    }
  ];
  
  return fallbackPairs.slice(0, limit);
}