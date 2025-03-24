"use server"

import { CryptoNews } from '@/types/crypto';

export async function getCryptoNews(limit: number = 3): Promise<CryptoNews[]> {
  try {
    // Skip the API call entirely for now and use fallback data
    // This ensures the page loads without errors while we debug the API issue
    return getFallbackNews(limit);
    
    /* Original API call code - commented out until API issues are resolved
    const apiKey = process.env.ALPHA_VANTAGE_API_KEY;
    
    if (!apiKey) {
      console.error('Alpha Vantage API key is missing');
      return getFallbackNews(limit);
    }
    
    const response = await fetch(`https://www.alphavantage.co/query?function=NEWS_SENTIMENT&topics=cryptocurrency&apikey=${apiKey}`, {
      headers: {
        'Accept': 'application/json',
      },
      next: { revalidate: 3600 } // Cache for 1 hour
    });
    
    if (!response.ok) {
      console.error(`Failed to fetch news: ${response.status}`);
      return getFallbackNews(limit);
    }
    
    const data = await response.json();
    
    // Transform the API response to match our CryptoNews interface
    if (data && data.feed && Array.isArray(data.feed) && data.feed.length > 0) {
      const cryptoNews: CryptoNews[] = data.feed
        .slice(0, limit)
        .map((item: any, index: number) => ({
          id: index + 1,
          title: item.title || `Crypto News ${index + 1}`,
          image: item.banner_image || `https://source.unsplash.com/random/800x600/?cryptocurrency,bitcoin,${index}`,
          date: item.time_published || new Date().toISOString(),
          category: item.topics && item.topics.length > 0 
            ? item.topics[0].topic 
            : (item.category_within_source || "Cryptocurrency"),
          excerpt: item.summary || "Latest cryptocurrency market updates and analysis.",
        }));
      
      return cryptoNews;
    }
    
    console.error('Invalid data format from API:', JSON.stringify(data).substring(0, 200) + '...');
    return getFallbackNews(limit);
    */
  } catch (error) {
    console.error('Error fetching crypto news:', error);
    return getFallbackNews(limit);
  }
}

function getFallbackNews(limit: number): CryptoNews[] {
  const fallbackNews = [
    {
      id: 1,
      title: "Bitcoin Surges Past $60,000 as Institutional Adoption Accelerates",
      image: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      date: new Date().toISOString(),
      category: "Bitcoin",
      excerpt: "Bitcoin has broken through the $60,000 resistance level as major financial institutions continue to add the cryptocurrency to their balance sheets.",
    },
    {
      id: 2,
      title: "Ethereum Completes Major Network Upgrade, Gas Fees Expected to Drop",
      image: "https://images.unsplash.com/photo-1622630998477-20aa696ecb05?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      date: new Date(Date.now() - 86400000).toISOString(),
      category: "Ethereum",
      excerpt: "Ethereum has successfully implemented its latest network upgrade, which aims to reduce transaction costs and improve scalability on the blockchain.",
    },
    {
      id: 3,
      title: "Regulatory Clarity: New Framework for Cryptocurrency Exchanges Announced",
      image: "https://images.unsplash.com/photo-1639762681057-408e52192e55?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      date: new Date(Date.now() - 172800000).toISOString(),
      category: "Regulation",
      excerpt: "Government officials have unveiled a new regulatory framework designed to provide clearer guidelines for cryptocurrency exchanges operating within the country.",
    },
    {
      id: 4,
      title: "DeFi Protocol Reaches $10 Billion in Total Value Locked",
      image: "https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      date: new Date(Date.now() - 259200000).toISOString(),
      category: "DeFi",
      excerpt: "A leading decentralized finance protocol has surpassed $10 billion in total value locked, highlighting the continued growth of the DeFi ecosystem.",
    },
    {
      id: 5,
      title: "NFT Marketplace Announces Integration with Major Cryptocurrency",
      image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      date: new Date(Date.now() - 345600000).toISOString(),
      category: "NFTs",
      excerpt: "A popular NFT marketplace has announced integration with a major cryptocurrency, allowing users to purchase digital collectibles using the token directly.",
    },
  ];
  
  return fallbackNews.slice(0, limit);
}