export interface NFTCollection {
  id: string;
  name: string;
  creator: string;
  floorPrice: string;
  volume: string;
  items: string;
  change: string;
  image?: string;
  banner?: string;
  category: string;
  verified: boolean;
}

export interface NFTAsset {
  id: string;
  name: string;
  collection: string;
  collectionId: string;
  description: string;
  image: string;
  price: string;
  priceUSD: string;
  owner: string;
  creator: string;
  tokenId: string;
  blockchain: string;
  lastSale?: string;
  rarity?: string;
  attributes: NFTAttribute[];
}

export interface NFTAttribute {
  trait_type: string;
  value: string;
  rarity?: string;
}

export interface NFTNews {
  id: number;
  title: string;
  image: string;
  date: string;
  category: string;
  excerpt: string;
}

export interface NFTSignal {
  id: number;
  collectionName: string;
  collectionId: string;
  image: string;
  action: "BUY" | "SELL" | "HOLD";
  strength: number;
  floorPrice: string;
  targetPrice: string;
  timeframe: string;
  analysis: string;
  date: string;
}