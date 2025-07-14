/* eslint-disable */
"use server";

import { CryptoNews } from '@/types/crypto';

// Cache news data to reduce API calls
let cachedNews: CryptoNews[] | null = null;
let lastFetchTime: number = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export async function getCryptoNews(limit: number = 3): Promise<CryptoNews[]> {
  try {
    // Check if we have valid cached data
    const now = Date.now();
    if (cachedNews && now - lastFetchTime < CACHE_DURATION) {
      return cachedNews.slice(0, limit);
    }

    // Using Cryptopanic API to fetch real crypto news
    const apiKey = process.env.NEXT_PUBLIC_CRYPTOCOMPARE_API_KEY;
    
    // Fetch crypto news
    const response = await fetch(
      `https://cryptopanic.com/api/v1/posts/?auth_token=${apiKey}&currencies=BTC,ETH,XRP,ADA,SOL,DOT,DOGE,AVAX,MATIC,LINK&kind=news`,
      { next: { revalidate: 300 } } // Revalidate every 5 minutes
    );
    
    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (!data.results || !Array.isArray(data.results)) {
      throw new Error('Invalid data format received from API');
    }
    
    // Transform the API response to match our CryptoNews type
    const news: CryptoNews[] = data.results
      .filter((item: any) => 
        item.title && 
        item.source && 
        item.currencies
      )
      .map((item: any, index: number) => {
        // Analyze sentiment based on keywords in title
        const titleText = item.title.toLowerCase();
        let sentiment = "neutral";
        
        const positiveKeywords = ['surge', 'jump', 'rise', 'gain', 'growth', 'bullish', 'up', 'high', 'rally', 'moon'];
        const negativeKeywords = ['drop', 'fall', 'decline', 'loss', 'down', 'cut', 'bearish', 'low', 'risk', 'crash'];
        
        const positiveMatches = positiveKeywords.filter(word => titleText.includes(word)).length;
        const negativeMatches = negativeKeywords.filter(word => titleText.includes(word)).length;
        
        if (positiveMatches > negativeMatches) {
          sentiment = "positive";
        } else if (negativeMatches > positiveMatches) {
          sentiment = "negative";
        }
        
        // Extract related coins
        const relatedCoins = item.currencies.map((currency: any) => currency.code);
        
        // Generate a summary if not available
        const summary = item.body || `Latest news about ${relatedCoins.join(', ')} from ${item.source.title}.`;
        
        // Get image URL or use a fallback
        const imageUrl = item.image || `https://source.unsplash.com/random/800x600?crypto,${relatedCoins[0]}`;
        
        return {
          id: item.id?.toString() || String(index + 1),
          title: item.title,
          summary: summary,
          source: item.source.title,
          url: item.url,
          imageUrl: imageUrl,
          publishedAt: item.published_at || new Date().toISOString(),
          relatedCoins: relatedCoins,
          sentiment
        };
      });
    
    // Update cache
    cachedNews = news;
    lastFetchTime = now;
    
    return news.slice(0, limit);
  } catch (error) {
    console.error('Error fetching crypto news:', error);
    
    // If we have cached data, return it even if it's expired
    if (cachedNews) {
      return cachedNews.slice(0, limit);
    }
    
    // If API fails and no cache exists, use Finnhub as fallback
    try {
      const apiKey = process.env.FINNHUB_API_KEY;
      const response = await fetch(
        `https://finnhub.io/api/v1/news?category=crypto&token=${apiKey}`,
        { next: { revalidate: 300 } }
      );
      
      if (!response.ok) {
        throw new Error(`Fallback API responded with status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (!Array.isArray(data)) {
        throw new Error('Invalid data format received from fallback API');
      }
      
      // Transform the API response
      const news: CryptoNews[] = data
        .filter((item: any) => 
          item.headline && 
          item.summary && 
          item.image
        )
        .map((item: any, index: number) => {
          // Extract crypto symbols from headline or summary
          const combinedText = `${item.headline} ${item.summary}`.toUpperCase();
          const cryptoRegex = /\b(BTC|ETH|XRP|ADA|SOL|DOT|DOGE|AVAX|MATIC|LINK|USDT|USDC|BNB)\b/g;
          let relatedCoins = combinedText.match(cryptoRegex) || ['BTC', 'ETH'];
          relatedCoins = [...new Set(relatedCoins)]; // Remove duplicates
          
          // Analyze sentiment
          const lowerText = combinedText.toLowerCase();
          let sentiment = "neutral";
          
          const positiveKeywords = ['surge', 'jump', 'rise', 'gain', 'growth', 'bullish', 'up', 'high', 'rally', 'moon'];
          const negativeKeywords = ['drop', 'fall', 'decline', 'loss', 'down', 'cut', 'bearish', 'low', 'risk', 'crash'];
          
          const positiveMatches = positiveKeywords.filter(word => lowerText.includes(word)).length;
          const negativeMatches = negativeKeywords.filter(word => lowerText.includes(word)).length;
          
          if (positiveMatches > negativeMatches) {
            sentiment = "positive";
          } else if (negativeMatches > positiveMatches) {
            sentiment = "negative";
          }
          
          return {
            id: item.id?.toString() || String(index + 1),
            title: item.headline,
            summary: item.summary,
            source: item.source,
            url: item.url,
            imageUrl: item.image,
            publishedAt: new Date(item.datetime * 1000).toISOString(),
            relatedCoins,
            sentiment
          };
        });
      
      // Update cache
      cachedNews = news;
      lastFetchTime = now;
      
      return news.slice(0, limit);
    } catch (fallbackError) {
      console.error('Error fetching fallback crypto news:', fallbackError);
      return [];
    }
  }
}

// Function to get a specific news article by ID
export async function getCryptoNewsById(id: string): Promise<CryptoNews | null> {
  try {
    // First check if we have it in the cache
    if (cachedNews) {
      const cachedArticle = cachedNews.find(article => article.id === id);
      if (cachedArticle) {
        return cachedArticle;
      }
    }
    
    // If not in cache or cache is empty, fetch all news
    const allNews = await getCryptoNews(30); // Get a larger set to increase chances of finding the article
    
    // Find the specific article
    const article = allNews.find(article => article.id === id);
    
    if (!article) {
      // If we still can't find it, return null
      return null;
    }
    
    return article;
  } catch (error) {
    console.error('Error fetching crypto news by ID:', error);
    return null;
  }
}

// Function to get news for a specific cryptocurrency
export async function getCryptoNewsByCoin(coin: string, limit: number = 5): Promise<CryptoNews[]> {
  try {
    const allNews = await getCryptoNews(30); // Get a larger set of news
    
    // Normalize the coin symbol
    const normalizedCoin = coin.toUpperCase();
    
    // Filter news related to the requested coin
    const filteredNews = allNews.filter(news => 
      news.relatedCoins.includes(normalizedCoin) || 
      news.title.toUpperCase().includes(normalizedCoin) || 
      news.summary.toUpperCase().includes(normalizedCoin)
    );
    
    return filteredNews.slice(0, limit);
  } catch (error) {
    console.error(`Error fetching news for coin ${coin}:`, error);
    return [];
  }
}