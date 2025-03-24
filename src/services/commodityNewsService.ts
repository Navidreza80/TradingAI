"use server"

import { CommodityNews } from '@/types/commodity';

export async function getCommodityNews(limit: number = 3): Promise<CommodityNews[]> {
  try {
    // In a real app, you would fetch this from a news API
    // For now, we'll return mock data
    return getFallbackNews(limit);
  } catch (error) {
    console.error('Error fetching commodity news:', error);
    return getFallbackNews(limit);
  }
}

function getFallbackNews(limit: number): CommodityNews[] {
  const fallbackNews = [
    {
      id: 1,
      title: "Gold Prices Surge to Record High on Inflation Concerns",
      image: "https://images.unsplash.com/photo-1610375461369-d613b564f4c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      date: new Date().toISOString(),
      category: "Precious Metals",
      excerpt: "Gold prices have reached an all-time high as investors seek safe-haven assets amid growing inflation concerns and geopolitical tensions.",
    },
    {
      id: 2,
      title: "Oil Production Cuts Extended by OPEC+ Nations",
      image: "https://images.unsplash.com/photo-1605801407838-b78f78d0c544?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      date: new Date(Date.now() - 86400000).toISOString(),
      category: "Energy",
      excerpt: "OPEC+ countries have agreed to extend production cuts for another six months, potentially leading to higher oil prices in the coming months.",
    },
    {
      id: 3,
      title: "Drought Conditions Threaten Global Wheat Supply",
      image: "https://images.unsplash.com/photo-1620706857370-e1b9770e8bb1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      date: new Date(Date.now() - 172800000).toISOString(),
      category: "Agriculture",
      excerpt: "Severe drought conditions in major wheat-producing regions are raising concerns about global supply shortages and potential price increases for the staple grain.",
    },
    {
      id: 4,
      title: "Copper Demand Surges on Green Energy Transition",
      image: "https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      date: new Date(Date.now() - 259200000).toISOString(),
      category: "Industrial Metals",
      excerpt: "The global push toward renewable energy and electric vehicles is driving unprecedented demand for copper, with prices reaching multi-year highs.",
    },
    {
      id: 5,
      title: "Coffee Prices Spike as Brazil Faces Frost Damage",
      image: "https://images.unsplash.com/photo-1559496417-e7f25cb247f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      date: new Date(Date.now() - 345600000).toISOString(),
      category: "Agriculture",
      excerpt: "Unexpected frost in Brazil's coffee-growing regions has damaged crops, leading to a sharp increase in global coffee prices and supply concerns.",
    },
  ];
  
  return fallbackNews.slice(0, limit);
}