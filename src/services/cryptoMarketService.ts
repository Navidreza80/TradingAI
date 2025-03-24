"use server"

import { CryptoPair, CryptoMarketStats } from '@/types/crypto';

export async function getCryptoPairs(limit: number = 6): Promise<CryptoPair[]> {
  try {
    // Using CoinGecko API for cryptocurrency market data
    const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h', {
      headers: {
        'Accept': 'application/json',
      },
      next: { revalidate: 300 } // Cache for 5 minutes
    });
    
    if (!response.ok) {
      console.error(`API responded with status: ${response.status}`);
      return getFallbackCryptoPairs(limit);
    }
    
    const data = await response.json();
    
    if (Array.isArray(data) && data.length > 0) {
      const cryptoPairs: CryptoPair[] = data.slice(0, limit).map(coin => ({
        symbol: coin.symbol?.toUpperCase() || 'UNKNOWN',
        name: coin.name || 'Unknown Coin',
        price: (coin.current_price || 0).toString(),
        change: (coin.price_change_24h || 0).toFixed(2),
        changePercent: (coin.price_change_percentage_24h || 0).toFixed(2),
        volume: (coin.total_volume || 0).toString(),
        marketCap: (coin.market_cap || 0).toString(),
        image: coin.image || `https://via.placeholder.com/32?text=${coin.symbol?.charAt(0) || '?'}`
      }));
      
      return cryptoPairs;
    }
    
    console.error('Invalid data format from API: not an array or empty array');
    return getFallbackCryptoPairs(limit);
  } catch (error) {
    console.error('Error fetching crypto pairs:', error);
    return getFallbackCryptoPairs(limit);
  }
}

export async function getCryptoMarketStats(): Promise<CryptoMarketStats> {
  try {
    // Using CoinGecko API for global market data
    const response = await fetch('https://api.coingecko.com/api/v3/global');
    
    if (!response.ok) {
      throw new Error(`Failed to fetch market stats: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data.data) {
      const { total_market_cap, total_volume, market_cap_percentage, market_cap_change_percentage_24h_usd } = data.data;
      
      return {
        totalMarketCap: total_market_cap.usd.toLocaleString(),
        totalVolume24h: total_volume.usd.toLocaleString(),
        btcDominance: market_cap_percentage.btc.toFixed(1) + '%',
        marketChange24h: market_cap_change_percentage_24h_usd.toFixed(2) + '%'
      };
    }
    
    throw new Error('Invalid data format from API');
  } catch (error) {
    console.error('Error fetching market stats:', error);
    return getFallbackMarketStats();
  }
}

function getFallbackCryptoPairs(limit: number): CryptoPair[] {
  const fallbackPairs = [
    {
      symbol: "BTC",
      name: "Bitcoin",
      price: "57243.21",
      change: "1245.67",
      changePercent: "2.23",
      volume: "32456789012",
      marketCap: "1087654321098",
      image: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png"
    },
    {
      symbol: "ETH",
      name: "Ethereum",
      price: "3521.45",
      change: "87.32",
      changePercent: "2.54",
      volume: "18765432109",
      marketCap: "421987654321",
      image: "https://assets.coingecko.com/coins/images/279/large/ethereum.png"
    },
    {
      symbol: "BNB",
      name: "Binance Coin",
      price: "412.78",
      change: "-5.43",
      changePercent: "-1.30",
      volume: "2345678901",
      marketCap: "67890123456",
      image: "https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png"
    },
    {
      symbol: "SOL",
      name: "Solana",
      price: "98.76",
      change: "3.21",
      changePercent: "3.36",
      volume: "4567890123",
      marketCap: "34567890123",
      image: "https://assets.coingecko.com/coins/images/4128/large/solana.png"
    },
    {
      symbol: "ADA",
      name: "Cardano",
      price: "1.23",
      change: "-0.05",
      changePercent: "-3.91",
      volume: "1234567890",
      marketCap: "43210987654",
      image: "https://assets.coingecko.com/coins/images/975/large/cardano.png"
    },
    {
      symbol: "DOT",
      name: "Polkadot",
      price: "21.87",
      change: "0.76",
      changePercent: "3.60",
      volume: "987654321",
      marketCap: "23456789012",
      image: "https://assets.coingecko.com/coins/images/12171/large/polkadot.png"
    }
  ];
  
  return fallbackPairs.slice(0, limit);
}

function getFallbackMarketStats(): CryptoMarketStats {
  return {
    totalMarketCap: "2,345,678,901,234",
    totalVolume24h: "123,456,789,012",
    btcDominance: "42.3%",
    marketChange24h: "1.45%"
  };
}