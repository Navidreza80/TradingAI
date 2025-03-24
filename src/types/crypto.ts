export interface CryptoNews {
  id: number;
  title: string;
  image: string;
  date: string;
  category: string;
  excerpt: string;
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