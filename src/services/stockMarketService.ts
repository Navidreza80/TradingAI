"use server"

import { StockPair, StockMarketStats } from '@/types/stock';

export async function getStockPairs(): Promise<StockPair[]> {
  try {
    // Using Finnhub API to get real stock data
    const apiKey = process.env.FINNHUB_API_KEY;
    
    // Extended list of major US stocks from different sectors
    const symbols = [
      // Technology
      'AAPL', 'MSFT', 'GOOGL', 'AMZN', 'META', 'NVDA', 'AMD', 'INTC', 'IBM', 'ORCL', 'CRM', 'ADBE', 'CSCO', 'PYPL', 'NFLX',
      // Financial
      'JPM', 'BAC', 'WFC', 'C', 'GS', 'MS', 'AXP', 'V', 'MA', 'BLK',
      // Healthcare
      'JNJ', 'PFE', 'MRK', 'ABBV', 'ABT', 'UNH', 'CVS', 'AMGN', 'MDT', 'GILD',
      // Consumer
      'WMT', 'PG', 'KO', 'PEP', 'MCD', 'SBUX', 'NKE', 'DIS', 'HD', 'LOW', 'TGT', 'COST',
      // Energy
      'XOM', 'CVX', 'COP', 'EOG', 'SLB', 'PSX', 'VLO', 'OXY',
      // Industrial
      'GE', 'BA', 'CAT', 'DE', 'MMM', 'HON', 'UPS', 'FDX', 'LMT', 'RTX',
      // Telecom
      'T', 'VZ', 'TMUS', 'CMCSA',
      // Automotive
      'TSLA', 'F', 'GM', 'TM',
      // Retail
      'AMZN', 'EBAY', 'ETSY', 'W', 'BABA',
      // Semiconductor
      'NVDA', 'AMD', 'INTC', 'TSM', 'QCOM', 'MU', 'AMAT', 'ASML',
      // Travel & Leisure
      'MAR', 'HLT', 'BKNG', 'EXPE', 'CCL', 'RCL', 'DAL', 'UAL', 'AAL', 'LUV'
    ];
    
    // Remove duplicates
    const uniqueSymbols = [...new Set(symbols)];
    
    // Rest of the function remains the same
    const stockPromises = uniqueSymbols.map(async (symbol) => {
      const quoteResponse = await fetch(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${apiKey}`, {
        next: { revalidate: 300 } // Cache for 5 minutes
      });
      
      const profileResponse = await fetch(`https://finnhub.io/api/v1/stock/profile2?symbol=${symbol}&token=${apiKey}`, {
        next: { revalidate: 86400 } // Cache for 24 hours
      });
      
      if (!quoteResponse.ok || !profileResponse.ok) {
        throw new Error(`Failed to fetch data for ${symbol}`);
      }
      
      const quote = await quoteResponse.json();
      const profile = await profileResponse.json();
      
      return {
        symbol: symbol,
        name: profile.name || `${symbol} Stock`,
        price: quote.c || 0,
        change: quote.d || 0,
        changePercent: quote.dp || 0,
        volume: quote.v || 0,
        marketCap: profile.marketCapitalization ? profile.marketCapitalization * 1000000 : 0,
        sector: profile.finnhubIndustry || 'Unknown',
        logo: profile.logo || `https://ui-avatars.com/api/?name=${symbol}&background=random`,
        lastUpdated: new Date().toISOString()
      };
    });
    
    const stocks = await Promise.all(stockPromises);
    return stocks;
  } catch (error) {
    console.error('Error fetching stock pairs:', error);
    // Return fallback data if API fails
    return getFallbackStockData();
  }
}

// Update the fallback data to include more stocks
function getFallbackStockData(): StockPair[] {
  return [
    // Existing fallback data...
    // Add more fallback stocks here
    {
      symbol: "NVDA",
      name: "NVIDIA Corporation",
      price: 437.53,
      change: 2.75,
      changePercent: 0.63,
      volume: 42567800,
      marketCap: 1080000000000,
      sector: "Technology",
      logo: "https://upload.wikimedia.org/wikipedia/commons/2/21/Nvidia_logo.svg",
      lastUpdated: new Date().toISOString()
    },
    {
      symbol: "JPM",
      name: "JPMorgan Chase & Co.",
      price: 183.97,
      change: 0.42,
      changePercent: 0.23,
      volume: 8765400,
      marketCap: 532000000000,
      sector: "Financial",
      logo: "https://upload.wikimedia.org/wikipedia/commons/a/af/J.P._Morgan_logo_2008_1.svg",
      lastUpdated: new Date().toISOString()
    },
    {
      symbol: "JNJ",
      name: "Johnson & Johnson",
      price: 152.49,
      change: -0.87,
      changePercent: -0.57,
      volume: 6543200,
      marketCap: 367000000000,
      sector: "Healthcare",
      logo: "https://upload.wikimedia.org/wikipedia/commons/2/2b/Johnson_%26_Johnson_logo.svg",
      lastUpdated: new Date().toISOString()
    },
    {
      symbol: "WMT",
      name: "Walmart Inc.",
      price: 59.86,
      change: 0.34,
      changePercent: 0.57,
      volume: 9876500,
      marketCap: 482000000000,
      sector: "Consumer",
      logo: "https://upload.wikimedia.org/wikipedia/commons/c/ca/Walmart_logo.svg",
      lastUpdated: new Date().toISOString()
    },
    {
      symbol: "XOM",
      name: "Exxon Mobil Corporation",
      price: 113.25,
      change: -1.23,
      changePercent: -1.08,
      volume: 12345600,
      marketCap: 452000000000,
      sector: "Energy",
      logo: "https://upload.wikimedia.org/wikipedia/commons/6/6c/ExxonMobil_logo.svg",
      lastUpdated: new Date().toISOString()
    }
  ];
}

export async function getStockMarketStats(): Promise<StockMarketStats> {
  try {
    // For market stats, we'll aggregate data from our stock pairs
    const stocks = await getStockPairs();
    
    const totalMarketCap = stocks.reduce((sum, stock) => sum + stock.marketCap, 0);
    const totalVolume = stocks.reduce((sum, stock) => sum + stock.volume, 0);
    
    const advancers = stocks.filter(stock => stock.change > 0).length;
    const decliners = stocks.filter(stock => stock.change < 0).length;
    const unchanged = stocks.filter(stock => stock.change === 0).length;
    
    return {
      totalVolume: formatLargeNumber(totalVolume),
      marketCap: formatLargeNumber(totalMarketCap),
      activeStocks: stocks.length,
      advancers,
      decliners,
      unchanged,
      lastUpdated: new Date().toISOString()
    };
  } catch (error) {
    console.error('Error fetching market stats:', error);
    return {
      totalVolume: "0",
      marketCap: "0",
      activeStocks: 0,
      advancers: 0,
      decliners: 0,
      unchanged: 0,
      lastUpdated: new Date().toISOString()
    };
  }
}

function formatLargeNumber(num: number): string {
  if (num >= 1e12) {
    return `${(num / 1e12).toFixed(1)}T`;
  } else if (num >= 1e9) {
    return `${(num / 1e9).toFixed(1)}B`;
  } else if (num >= 1e6) {
    return `${(num / 1e6).toFixed(1)}M`;
  } else {
    return `${num.toFixed(0)}`;
  }
}
