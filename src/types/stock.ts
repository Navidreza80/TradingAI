export interface StockPair {
  symbol: string;
  name: string;
  price: string;
  change: string;
  changePercent: string;
  volume: string;
  marketCap: string;
  image?: string;
}

export interface StockMarketStats {
  totalVolume: string;
  marketCap: string;
  activeStocks: number;
  advancers: number;
  decliners: number;
  unchanged: number;
  lastUpdated: string;
}

export interface StockNews {
  id: number;
  title: string;
  image: string;
  date: string;
  category: string;
  excerpt: string;
}