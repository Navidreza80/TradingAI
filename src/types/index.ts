// تعریف تایپ‌های عمومی پروژه
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