export interface User {
  id: string;
  name: string;
  email: string;
}
export interface Position {
  id?: string;
  userId?: string;
  symbol: string;
  type: 'LONG' | 'SHORT';
  amount: number;
  leverage: number;
  mode: 'cross' | 'isolated';
  entryPrice: number;
  takeProfit?: {
    price: number;
    percent: number;
  } | null;
  stopLoss?: {
    price: number;
    percent: number;
    type: 'manual' | 'auto';
  } | null;
}

export interface FormData {
  symbol: string;
  type: 'LONG' | 'SHORT';
  amount: string;
}

export interface ModelProps {
  url: string;
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
}

export interface HeroModelsType {
  url: string,
  position: [number, number, number];
}

export interface LandingSectionsInterface { 
  title: string; 
  description: string; 
  mainButton: { 
    text: String; 
    className: string 
  }; 
  secondButton?: { 
    text: String; 
    className: string 
  } | null; 
  features: { 
    color: string;
    title: string; 
    value?: string | number | null; 
    description?: string | null; 
    icon: any;
  }[];
}