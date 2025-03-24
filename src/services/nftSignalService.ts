"use server"

import { NFTSignal } from '@/types/nft';

export async function getNFTSignals(limit: number = 3): Promise<NFTSignal[]> {
  try {
    // In a real app, you would generate these signals using AI models
    // For now, we'll return mock data
    return getFallbackSignals(limit);
  } catch (error) {
    console.error('Error fetching NFT signals:', error);
    return getFallbackSignals(limit);
  }
}

function getFallbackSignals(limit: number): NFTSignal[] {
  const fallbackSignals = [
    {
      id: 1,
      collectionName: "Bored Ape Yacht Club",
      collectionId: "bayc",
      image: "https://images.unsplash.com/photo-1614680376739-414d95ff43df?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80",
      action: "BUY",
      strength: 87,
      floorPrice: "74.5 ETH",
      targetPrice: "85.0 ETH",
      timeframe: "Medium-term",
      analysis: "BAYC shows strong momentum with increasing whale accumulation and upcoming utility announcements. Technical indicators suggest continued upward movement with solid support levels.",
      date: new Date().toISOString()
    },
    {
      id: 2,
      collectionName: "CryptoPunks",
      collectionId: "cryptopunks",
      image: "https://images.unsplash.com/photo-1626162953675-544bf5a61ca6?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80",
      action: "HOLD",
      strength: 65,
      floorPrice: "68.9 ETH",
      targetPrice: "75.0 ETH",
      timeframe: "Long-term",
      analysis: "CryptoPunks remain a blue-chip NFT with strong historical significance. Current market conditions suggest consolidation before potential upward movement. Recommend holding for long-term value.",
      date: new Date().toISOString()
    },
    {
      id: 3,
      collectionName: "Doodles",
      collectionId: "doodles",
      image: "https://images.unsplash.com/photo-1634986666676-ec8fd927c23d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80",
      action: "SELL",
      strength: 72,
      floorPrice: "12.8 ETH",
      targetPrice: "10.5 ETH",
      timeframe: "Short-term",
      analysis: "Doodles is showing bearish divergence on volume indicators with decreasing social sentiment. Recent team changes and delayed roadmap execution suggest potential short-term price decline.",
      date: new Date().toISOString()
    },
    {
      id: 4,
      collectionName: "Azuki",
      collectionId: "azuki",
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80",
      action: "BUY",
      strength: 78,
      floorPrice: "18.2 ETH",
      targetPrice: "22.0 ETH",
      timeframe: "Medium-term",
      analysis: "Azuki is demonstrating strong community growth and increasing utility with upcoming partnerships. Technical analysis shows a bullish pattern forming with support at current levels.",
      date: new Date().toISOString()
    },
    {
      id: 5,
      collectionName: "Art Blocks",
      collectionId: "artblocks",
      image: "https://images.unsplash.com/photo-1618172193622-ae2d025f4032?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80",
      action: "BUY",
      strength: 83,
      floorPrice: "2.5 ETH",
      targetPrice: "3.2 ETH",
      timeframe: "Long-term",
      analysis: "Art Blocks continues to lead the generative art NFT space with high-quality curation and artist collaborations. Recent institutional interest and gallery partnerships indicate strong long-term growth potential.",
      date: new Date().toISOString()
    }
  ];
  
  return fallbackSignals.slice(0, limit);
}