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