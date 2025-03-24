import React from 'react';
import Image from 'next/image';
import { CryptoSignal } from '@/types/crypto';

interface SignalCardProps {
  signal: CryptoSignal;
}

export function SignalCard({ signal }: SignalCardProps) {
  const isBuy = signal.direction === "buy";
  const profitPercentage = ((signal.takeProfit - signal.entryPrice) / signal.entryPrice * 100).toFixed(2);
  const lossPercentage = ((signal.entryPrice - signal.stopLoss) / signal.entryPrice * 100).toFixed(2);
  const riskReward = (parseFloat(profitPercentage) / parseFloat(lossPercentage)).toFixed(2);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-5 border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-shadow duration-300">
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center">
          <div className="w-8 h-8 mr-3 relative">
            <Image 
              src={signal.image || `/images/crypto/${signal.symbol.toLowerCase()}.png`}
              alt={signal.symbol}
              width={32}
              height={32}
              className="rounded-full"
            />
          </div>
          <h3 className="font-bold text-lg text-black dark:text-white">
            {signal.symbol}
          </h3>
        </div>
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
            ${signal.entryPrice.toFixed(2)}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-500 dark:text-gray-400">Take Profit</p>
          <p className="font-medium text-green-600 dark:text-green-400">
            ${signal.takeProfit.toFixed(2)}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-500 dark:text-gray-400">Stop Loss</p>
          <p className="font-medium text-red-600 dark:text-red-400">
            ${signal.stopLoss.toFixed(2)}
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