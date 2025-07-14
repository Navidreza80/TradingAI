/* eslint-disable */
"use server";

import { ForexNews } from '@/types/forex';

// Cache news data to reduce API calls
let cachedNews: ForexNews[] | null = null;
let lastFetchTime: number = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export async function getForexNews(limit: number = 3): Promise<ForexNews[]> {
  try {
    // Check if we have valid cached data
    const now = Date.now();
    if (cachedNews && now - lastFetchTime < CACHE_DURATION) {
      return cachedNews.slice(0, limit);
    }

    // Using Finnhub API to fetch real forex news
    const apiKey = process.env.FINNHUB_API_KEY;
    
    // Fetch forex news
    const response = await fetch(
      `https://finnhub.io/api/v1/news?category=forex&token=${apiKey}`,
      { next: { revalidate: 300 } } // Revalidate every 5 minutes
    );
    
    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (!Array.isArray(data)) {
      throw new Error('Invalid data format received from API');
    }
    
    // Transform the API response to match our ForexNews type
    const news: ForexNews[] = data
      .filter((item: any) => 
        item.headline && 
        item.summary && 
        item.image
      )
      .map((item: any, index: number) => {
        // Analyze sentiment based on keywords in headline and summary
        const combinedText = `${item.headline} ${item.summary}`.toLowerCase();
        let sentiment = "neutral";
        
        const positiveKeywords = ['surge', 'jump', 'rise', 'gain', 'growth', 'strengthen', 'bullish', 'up', 'high', 'rally'];
        const negativeKeywords = ['drop', 'fall', 'decline', 'loss', 'down', 'cut', 'bearish', 'low', 'risk', 'concern'];
        
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
        
        // Extract currency pairs from the headline or summary
        const pairRegex = /\b(EUR\/USD|USD\/JPY|GBP\/USD|USD\/CHF|AUD\/USD|USD\/CAD|NZD\/USD|EUR\/GBP|EUR\/JPY)\b/g;
        let relatedPairs: string[] = [];
        
        const headlinePairs = item.headline.match(pairRegex);
        const summaryPairs = item.summary.match(pairRegex);
        
        if (headlinePairs) {
          relatedPairs = [...relatedPairs, ...headlinePairs];
        }
        
        if (summaryPairs) {
          relatedPairs = [...relatedPairs, ...summaryPairs];
        }
        
        // If no pairs found, add some common ones based on keywords
        if (relatedPairs.length === 0) {
          if (combinedText.includes('euro') || combinedText.includes('eur')) {
            relatedPairs.push('EUR/USD');
          }
          if (combinedText.includes('pound') || combinedText.includes('gbp') || combinedText.includes('sterling')) {
            relatedPairs.push('GBP/USD');
          }
          if (combinedText.includes('yen') || combinedText.includes('jpy') || combinedText.includes('japan')) {
            relatedPairs.push('USD/JPY');
          }
          if (combinedText.includes('aussie') || combinedText.includes('aud') || combinedText.includes('australia')) {
            relatedPairs.push('AUD/USD');
          }
        }
        
        // Remove duplicates
        relatedPairs = [...new Set(relatedPairs)];
        
        return {
          id: item.id?.toString() || String(index + 1),
          title: item.headline,
          summary: item.summary || "No summary available",
          source: item.source,
          url: item.url,
          imageUrl: item.image || "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1470&q=80",
          publishedAt,
          relatedPairs: relatedPairs.length > 0 ? relatedPairs : ['EUR/USD', 'GBP/USD'],
          sentiment
        };
      });
    
    // Update cache
    cachedNews = news;
    lastFetchTime = now;
    
    return news.slice(0, limit);
  } catch (error) {
    console.error('Error fetching forex news:', error);
    
    // If we have cached data, return it even if it's expired
    if (cachedNews) {
      return cachedNews.slice(0, limit);
    }
    
    // Fallback to empty array if API fails and no cache exists
    return [];
  }
}

// Function to get a specific news article by ID
export async function getForexNewsById(id: string): Promise<ForexNews | null> {
  try {
    // First check if we have it in the cache
    if (cachedNews) {
      const cachedArticle = cachedNews.find(article => article.id === id);
      if (cachedArticle) {
        return cachedArticle;
      }
    }
    
    // If not in cache or cache is empty, fetch all news
    const allNews = await getForexNews(30); // Get a larger set to increase chances of finding the article
    
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
            relatedPairs: ['EUR/USD', 'GBP/USD'], // Default pairs
            sentiment: "neutral" // Default sentiment
          };
        }
      }
      
      // If we still can't find it, return null
      return null;
    }
    
    return article;
  } catch (error) {
    console.error('Error fetching forex news by ID:', error);
    return null;
  }
}

// Function to get news for a specific forex pair
export async function getForexNewsByPair(pair: string, limit: number = 5): Promise<ForexNews[]> {
  try {
    const allNews = await getForexNews(30); // Get a larger set of news
    
    // Filter news related to the requested pair
    const filteredNews = allNews.filter(news => 
      news.relatedPairs.includes(pair) || 
      news.title.includes(pair) || 
      news.summary.includes(pair)
    );
    
    return filteredNews.slice(0, limit);
  } catch (error) {
    console.error(`Error fetching news for pair ${pair}:`, error);
    return [];
  }
}