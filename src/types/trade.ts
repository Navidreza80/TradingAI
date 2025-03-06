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
