import React from 'react';

interface TradingSignal {
  pair: string;
  direction: "buy" | "sell";
  entryPrice: number;
  takeProfit: number;
  stopLoss: number;
  confidence: number;
}

interface SignalCardProps {
  signal: TradingSignal;
}

export function SignalCard({ signal }: SignalCardProps) {
  const isBuy = signal.direction === "buy";
  const profitPips = Math.abs(
    (signal.takeProfit - signal.entryPrice) * (isBuy ? 10000 : -10000)
  ).toFixed(0);
  const lossPips = Math.abs(
    (signal.stopLoss - signal.entryPrice) * (isBuy ? 10000 : -10000)
  ).toFixed(0);
  const riskReward = (
    parseFloat(profitPips) / parseFloat(lossPips)
  ).toFixed(2);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-5 border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-shadow duration-300">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-bold text-lg text-black dark:text-white">
          {signal.pair}
        </h3>
        <span
          className={`text-sm px-3 py-1 rounded-full font-medium ${
            isBuy
              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
              : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
          }`}
        >
          {isBuy ? "BUY" : "SELL"}
        </span>
      </div>
      <div className="grid grid-cols-2 gap-2 mb-4">
        <div>
          <p className="text-xs text-gray-500 dark:text-gray-400">Entry</p>
          <p className="font-medium text-black dark:text-white">
            {signal.entryPrice.toFixed(4)}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-500 dark:text-gray-400">Take Profit</p>
          <p className="font-medium text-green-600 dark:text-green-400">
            {signal.takeProfit.toFixed(4)}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-500 dark:text-gray-400">Stop Loss</p>
          <p className="font-medium text-red-600 dark:text-red-400">
            {signal.stopLoss.toFixed(4)}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-500 dark:text-gray-400">Risk/Reward</p>
          <p className="font-medium text-black dark:text-white">1:{riskReward}</p>
        </div>
      </div>
      <div className="mb-3">
        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
          <span>Low Confidence</span>
          <span>High Confidence</span>
        </div>
        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-600"
            style={{ width: `${signal.confidence}%` }}
          ></div>
        </div>
      </div>
      <button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 rounded transition duration-300">
        View Details
      </button>
    </div>
  );
}