export type Coin = {
  id: string;
  name: string;
  symbol: string;
  current_price: number;
  image: string;
};

export interface Position {
  symbol: string;
  amount: number;
  leverage: number;
  mode: "cross" | "isolated";
  type: "LONG" | "SHORT";
  entryPrice: number;
  takeProfit: number | null;
  stopLoss: number | null;
  timestamp: number;
  margin?: number;
  maintenanceMargin?: number;
}

export interface PriceMap {
  [symbol: string]: number;
}

export interface ClosedPosition extends Position {
  closePrice: number;
  closeTime: number;
  pnl: {
    amount: number;
    percentage: number;
  };
  isWin: boolean;
}

export interface ClosedTrade {
  symbol: string;
  type: string;
  amount: number;
  leverage: number;
  mode: string;
  entryPrice: number;
  closePrice: number;
  pnl: {
    amount: number;
    percentage: number;
  };
  pnlAmount: number;
  pnlPercent: number;
  takeProfit: number | null;
  stopLoss: number | null;
  timestamp: number;
  closeTime: number;
  isWin: boolean;
  userId: string;
}

export interface Signals {
  confidenceLevel: string;
  stopLoss: string;
  takeProfit: string;
  reason: string;
  entryPrice: string;
}