/* eslint-disable */
"use server";

import { ForexNews } from "@/types/forex";

export async function getForexNews(limit: number = 3): Promise<ForexNews[]> {
  try {
    // Using Alpha Vantage API for financial news
    const apiKey = process.env.NEXT_PUBLIC_FOREX_API_KEY;
    const response = await fetch(
      `https://www.alphavantage.co/query?function=NEWS_SENTIMENT&topics=forex&apikey=${apiKey}`
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch news: ${response.status}`);
    }

    const data = await response.json();

    // Transform the API response to match our ForexNews interface
    if (data.feed && Array.isArray(data.feed)) {
      const forexNews: ForexNews[] = data.feed
        .slice(0, limit)
        .map((item: any, index: number) => ({
          id: index + 1,
          title: item.title,
          // Use the banner image if available, otherwise use a placeholder
          image:
            item.banner_image ||
            `https://source.unsplash.com/random/800x600/?forex,currency,${index}`,
          date: item.time_published || new Date().toISOString(),
          // Extract category from topics or use a default
          category:
            item.topics && item.topics.length > 0
              ? item.topics[0].topic
              : item.category_within_source || "Forex",
          excerpt: item.summary || "Latest forex market updates and analysis.",
        }));

      return forexNews;
    }

    throw new Error("Invalid data format from API");
  } catch (error) {
    return getFallbackNews(limit);
  }
}

export async function getFallbackNews(limit: number){
  const fallbackNews = [
    {
      id: 1,
      title:
        "Fed Signals Potential Rate Cuts, Dollar Weakens Against Major Currencies",
      image:
        "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      date: new Date().toISOString(),
      category: "Central Banks",
      excerpt:
        "The Federal Reserve has indicated it may begin cutting interest rates in the coming months, causing the US dollar to decline against major currencies as traders adjust their positions.",
    },
    {
      id: 2,
      title:
        "Fed Signals Potential Rate Cuts, Dollar Weakens Against Major Currencies",
      image:
        "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      date: new Date().toISOString(),
      category: "Central Banks",
      excerpt:
        "The Federal Reserve has indicated it may begin cutting interest rates in the coming months, causing the US dollar to decline against major currencies as traders adjust their positions.",
    },
    {
      id: 3,
      title:
        "Fed Signals Potential Rate Cuts, Dollar Weakens Against Major Currencies",
      image:
        "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      date: new Date().toISOString(),
      category: "Central Banks",
      excerpt:
        "The Federal Reserve has indicated it may begin cutting interest rates in the coming months, causing the US dollar to decline against major currencies as traders adjust their positions.",
    },
  ];

  return fallbackNews.slice(0, limit);
}
