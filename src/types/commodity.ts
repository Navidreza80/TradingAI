export interface CommodityPair {
  symbol: string;
  name: string;
  category: string;
  price: string;
  change: string;
  isPositive: boolean;
  volume: number;
  high24h: string;
  low24h: string;
}

export interface CommodityNews {
  id: string;
  title: string;
  summary: string;
  source: string;
  url: string;
  imageUrl: string;
  publishedAt: string;
  relatedCommodities: string[];
  sentiment: "positive" | "negative" | "neutral";
}

export interface CommoditySignal {
  id: string;
  commodity: string;
  direction: "buy" | "sell" | "hold";
  confidence: number;
  entryPrice: string;
  targetPrice: string;
  stopLoss: string;
  timeframe: string;
  analysis: string;
  createdAt: string;
}