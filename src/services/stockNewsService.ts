/* eslint-disable */
"use server"

import { StockNews } from '@/types/stock';

// Cache news data to reduce API calls
let cachedNews: StockNews[] | null = null;
let lastFetchTime: number = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export async function getStockNews(limit: number = 3): Promise<StockNews[]> {
  try {
    // Check if we have valid cached data
    const now = Date.now();
    if (cachedNews && now - lastFetchTime < CACHE_DURATION) {
      return cachedNews.slice(0, limit);
    }

    // Using Finnhub API to fetch real stock news
    const apiKey = process.env.FINNHUB_API_KEY;
    
    // Fetch market news with a focus on major stocks
    const response = await fetch(
      `https://finnhub.io/api/v1/news?category=general&minId=10&token=${apiKey}`,
      { next: { revalidate: 300 } } // Revalidate every 5 minutes
    );
    
    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (!Array.isArray(data)) {
      throw new Error('Invalid data format received from API');
    }
    
    // Transform the API response to match our StockNews type
    const news: StockNews[] = data
      .filter((item: any) => 
        item.headline && 
        item.summary && 
        item.image
      )
      .map((item: any, index: number) => {
        // Analyze sentiment based on keywords in headline and summary
        const combinedText = `${item.headline} ${item.summary}`.toLowerCase();
        let sentiment = "neutral";
        
        const positiveKeywords = ['surge', 'jump', 'rise', 'gain', 'growth', 'profit', 'beat', 'up', 'high', 'record'];
        const negativeKeywords = ['drop', 'fall', 'decline', 'loss', 'down', 'cut', 'miss', 'low', 'risk', 'concern'];
        
        const positiveMatches = positiveKeywords.filter(word => combinedText.includes(word)).length;
        const negativeMatches = negativeKeywords.filter(word => combinedText.includes(word)).length;
        
        if (positiveMatches > negativeMatches) {
          sentiment = "positive";
        } else if (negativeMatches > positiveMatches) {
          sentiment = "negative";
        }
        
        // Safely convert datetime to ISO string
        let publishedAt = new Date().toISOString();
        try {
          if (item.datetime && typeof item.datetime === 'number') {
            publishedAt = new Date(item.datetime * 1000).toISOString();
          }
        } catch (e) {
          console.error('Error parsing datetime:', item.datetime, e);
        }
        
        // Extract stock symbols from the related field or from the headline
        let relatedSymbols: string[] = [];
        if (item.related) {
          relatedSymbols = item.related.split(',').map((s: string) => s.trim()).filter(Boolean);
        } else {
          // Try to extract stock symbols from headline (common format: "AAPL: Apple announces...")
          const symbolMatch = item.headline.match(/\b[A-Z]{1,5}\b/g);
          if (symbolMatch) {
            relatedSymbols = symbolMatch;
          }
        }
        
        return {
          id: item.id?.toString() || String(index + 1),
          title: item.headline,
          summary: item.summary || "No summary available",
          source: item.source,
          url: item.url,
          imageUrl: item.image || "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=1470&q=80",
          publishedAt,
          relatedSymbols,
          sentiment
        };
      });
    
    // Update cache
    cachedNews = news;
    lastFetchTime = now;
    
    return news.slice(0, limit);
  } catch (error) {
    console.error('Error fetching stock news:', error);
    
    // If we have cached data, return it even if it's expired
    if (cachedNews) {
      return cachedNews.slice(0, limit);
    }
    
    // Fallback to empty array if API fails and no cache exists
    return [];
  }
}

// New function to get a specific news article by ID
export async function getStockNewsById(id: string): Promise<StockNews | null> {
  try {
    // First check if we have it in the cache
    if (cachedNews) {
      const cachedArticle = cachedNews.find(article => article.id === id);
      if (cachedArticle) {
        return cachedArticle;
      }
    }
    
    // If not in cache or cache is empty, fetch all news
    const allNews = await getStockNews(30); // Get a larger set to increase chances of finding the article
    
    // Find the specific article
    const article = allNews.find(article => article.id === id);
    
    if (!article) {
      // If we can't find it, try to fetch it directly (if API supports it)
      const apiKey = process.env.FINNHUB_API_KEY;
      const response = await fetch(
        `https://finnhub.io/api/v1/news/${id}?token=${apiKey}`,
        { next: { revalidate: 300 } }
      );
      
      if (response.ok) {
        const data = await response.json();
        if (data) {
          // Transform to our format
          return {
            id: data.id?.toString() || id,
            title: data.headline,
            summary: data.summary || "No summary available",
            source: data.source,
            url: data.url,
            imageUrl: data.image || "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1470&q=80",
            publishedAt: new Date(data.datetime * 1000).toISOString(),
            relatedSymbols: data.related ? data.related.split(',') : [],
            sentiment: "neutral" // Default sentiment
          };
        }
      }
      
      // If we still can't find it, return null
      return null;
    }
    
    return article;
  } catch (error) {
    console.error('Error fetching stock news by ID:', error);
    return null;
  }
}

// Function to get news for a specific stock symbol
export async function getStockNewsBySymbol(symbol: string, limit: number = 5): Promise<StockNews[]> {
  try {
    const allNews = await getStockNews(30); // Get a larger set of news
    
    // Filter news related to the requested symbol
    const filteredNews = allNews.filter(news => 
      news.relatedSymbols.includes(symbol) || 
      news.title.includes(symbol) || 
      news.summary.includes(symbol)
    );
    
    return filteredNews.slice(0, limit);
  } catch (error) {
    console.error(`Error fetching news for symbol ${symbol}:`, error);
    return [];
  }
}