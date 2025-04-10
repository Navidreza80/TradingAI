"use server"

import { CryptoNews } from '@/types/crypto';

export async function getCryptoNews(limit: number = 3): Promise<CryptoNews[]> {
  try {
    // Using Crypto Panic API to get real crypto news
    const response = await fetch(`https://cryptopanic.com/api/v1/posts/?auth_token=none&public=true&kind=news`, {
      headers: {
        'Accept': 'application/json',
      },
      next: { revalidate: 3600 } // Cache for 1 hour
    });
    
    if (!response.ok) {
      console.error(`Failed to fetch news: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Transform the API response to match our CryptoNews interface
    if (data && data.results && Array.isArray(data.results) && data.results.length > 0) {
      const cryptoNews: CryptoNews[] = data.results
        .slice(0, limit)
        .map((item: any, index: number) => ({
          id: item.id || index + 1,
          title: item.title || `Crypto News ${index + 1}`,
          image: item.metadata?.image?.url,
          date: item.created_at || new Date().toISOString(),
          category: item.currencies?.[0]?.code || "Cryptocurrency",
          excerpt: item.metadata?.description || "Latest cryptocurrency market updates and analysis.",
          url: item.url || "#",
          source: item.source?.title || "Crypto News",
        }));
      return cryptoNews;
    }
    
    console.error('Invalid data format from API:', JSON.stringify(data).substring(0, 200) + '...');
    return
  } catch (error) {
    console.error('Error fetching crypto news:', error);
  }
}

export async function getCryptoNewsById(id: string): Promise<CryptoNews | null> {
  try {
    // First try to get all news
    const allNews = await getCryptoNews(10); // Get a larger set to increase chances of finding the article
    
    // Find the specific news article by ID
    const newsArticle = allNews.find(news => news.id.toString() === id);
    
    if (newsArticle) {
      return {
        ...newsArticle,
        // Add placeholder content if not available from the API
        content: newsArticle.content || `<p>${newsArticle.excerpt}</p>
          <p>This is a detailed view of the cryptocurrency news article. The full content would typically be displayed here, including analysis, quotes from experts, and market implications.</p>
          <p>For the most up-to-date and complete information, please visit the original source of this article.</p>`
      };
    }
    
    // If not found in the current news, check the fallback data
    const fallbackNews = getFallbackNews(10);
    const fallbackArticle = fallbackNews.find(news => news.id.toString() === id);
    
    if (fallbackArticle) {
      return {
        ...fallbackArticle,
        content: `<p>${fallbackArticle.excerpt}</p>
          <p>This is a detailed view of the cryptocurrency news article. The full content would typically be displayed here, including analysis, quotes from experts, and market implications.</p>
          <p>For the most up-to-date and complete information, please visit the original source of this article.</p>`
      };
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching crypto news by ID:', error);
    return null;
  }
}