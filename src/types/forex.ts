export interface ForexNews {
  id: number;
  title: string;
  image: string;
  date: string;
  category: string;
  excerpt: string;
}

export interface CurrencyPair {
  pair: string;
  price: string;
  change: string;
  changePercent: string;
}

export interface TradingSignal {
  pair: string;
  direction: "buy" | "sell";
  entryPrice: number;
  takeProfit: number;
  stopLoss: number;
  confidence: number;
}

export interface ForexMultimedia {
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

export interface ExchangeRateApiResponse {
  base: string;
  rates: Record<string, number>;
  time_last_updated: number;
}

export interface EconomicCalendarEvent {
  time: string;
  currency: string;
  event: string;
  impact: "High" | "Medium" | "Low";
  actual: string;
  forecast: string;
  previous: string;
}

export interface ForexPair {
  symbol: string;
  baseCurrency: string;
  quoteCurrency: string;
  bid: number;
  ask: number;
  spread: number;
  change: number;
  changePercent: number;
  high: number;
  low: number;
  volume: number;
  timestamp: number;
}

export interface ForexNews {
  id: string;
  title: string;
  summary: string;
  source: string;
  url: string;
  imageUrl: string;
  publishedAt: string;
  relatedPairs: string[];
  sentiment: "positive" | "negative" | "neutral";
}

export interface ForexSignal {
  id: string;
  pair: string;
  direction: "buy" | "sell" | "hold";
  entryPrice: number;
  stopLoss: number;
  takeProfit: number;
  timeframe: string;
  analysis: string;
  confidence: number;
  timestamp: number;
}