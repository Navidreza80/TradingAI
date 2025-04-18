"use server"

import { StockPair } from '@/types/stock';

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
    return false;
  }
}
