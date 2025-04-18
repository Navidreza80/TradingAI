export interface CryptoNews {
  id: number | string;
  title: string;
  image: string;
  date: string;
  category: string;
  excerpt: string;
  url?: string;
  source?: string;
  content?: string;
}

export interface CryptoPair {
  symbol: string;
  name: string;
  price: string;
  change: string;
  changePercent: string;
  volume: string;
  marketCap: string;
  image?: string;
}

export interface CryptoSignal {
  id: number;
  symbol: string;
  direction: "buy" | "sell";
  entryPrice: number;
  takeProfit: number;
  stopLoss: number;
  confidence: number;
  image?: string;
}

export interface CryptoMultimedia {
  id: number;
  title: string;
  type: "video" | "podcast";
  thumbnail: string;
  duration: string;
  author: string;
}

export interface EducationalContent {
  id: number;
  title: string;
  level: string;
  lessons: number;
  students: number;
  image: string;
}

export interface CryptoApiResponse {
  data: CryptoPair[];
  timestamp: number;
}

export interface CryptoMarketStats {
  totalMarketCap: string;
  totalVolume24h: string;
  btcDominance: string;
  marketChange24h: string;
}

export interface CryptoCurrency {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  fully_diluted_valuation: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  ath: number;
  ath_change_percentage: number;
  ath_date: string;
  atl: number;
  atl_change_percentage: number;
  atl_date: string;
  last_updated: string;
}

export interface CryptoNews {
  id: string;
  title: string;
  summary: string;
  source: string;
  url: string;
  imageUrl: string;
  publishedAt: string;
  relatedCoins: string[];
  sentiment: "positive" | "negative" | "neutral";
}

export interface CryptoSignal {
  id: string;
  coin: string;
  direction: "buy" | "sell" | "hold";
  entryPrice: number;
  stopLoss: number;
  takeProfit: number;
  timeframe: string;
  analysis: string;
  confidence: number;
  timestamp: number;
}