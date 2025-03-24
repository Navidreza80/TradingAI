export interface CommodityPair {
  symbol: string;
  name: string;
  price: string;
  change: string;
  changePercent: string;
  volume: string;
  category: string;
  image?: string;
}

export interface CommodityMarketStats {
  totalVolume: string;
  marketCap: string;
  activeCommodities: number;
  advancers: number;
  decliners: number;
  unchanged: number;
  lastUpdated: string;
}

export interface CommodityNews {
  id: number;
  title: string;
  image: string;
  date: string;
  category: string;
  excerpt: string;
}