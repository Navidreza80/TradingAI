"use server"

import { StockNews } from '@/types/stock';

export async function getStockNews(limit: number = 3): Promise<StockNews[]> {
  try {
    // In a real app, you would fetch this from a news API
    // For now, we'll return mock data
    return getFallbackNews(limit);
  } catch (error) {
    console.error('Error fetching stock news:', error);
    return getFallbackNews(limit);
  }
}

function getFallbackNews(limit: number): StockNews[] {
  const fallbackNews = [
    {
      id: 1,
      title: "Fed Signals Potential Rate Cuts as Inflation Cools",
      image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      date: new Date().toISOString(),
      category: "Economy",
      excerpt: "The Federal Reserve has indicated it may begin cutting interest rates in the coming months as inflation shows signs of moderating, potentially boosting stock markets.",
    },
    {
      id: 2,
      title: "Tech Giants Report Strong Quarterly Earnings",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      date: new Date(Date.now() - 86400000).toISOString(),
      category: "Technology",
      excerpt: "Major technology companies have reported better-than-expected earnings for the quarter, driven by strong cloud services growth and AI investments.",
    },
    {
      id: 3,
      title: "Oil Prices Surge Amid Middle East Tensions",
      image: "https://images.unsplash.com/photo-1582486225644-dce7c4d1f4b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      date: new Date(Date.now() - 172800000).toISOString(),
      category: "Energy",
      excerpt: "Crude oil prices have jumped to a six-month high as geopolitical tensions in the Middle East raise concerns about potential supply disruptions.",
    },
    {
      id: 4,
      title: "Retail Sales Beat Expectations, Consumer Spending Remains Strong",
      image: "https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      date: new Date(Date.now() - 259200000).toISOString(),
      category: "Retail",
      excerpt: "The latest retail sales data shows consumer spending remains resilient despite inflation concerns, with sales increasing more than analysts had predicted.",
    },
    {
      id: 5,
      title: "Healthcare Stocks Rally on New Drug Approvals",
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      date: new Date(Date.now() - 345600000).toISOString(),
      category: "Healthcare",
      excerpt: "Several major pharmaceutical companies saw their stocks rise following FDA approval of new treatments, boosting the entire healthcare sector.",
    },
  ];
  
  return fallbackNews.slice(0, limit);
}