"use client";

import React from 'react';
import Link from 'next/link';
import { TradingSignal } from '@/types/trading';

interface SignalCardProps {
  signal: TradingSignal;
}

export function SignalCard({ signal }: SignalCardProps) {
  const isBuy = signal.action.toLowerCase() === 'buy';
  const isStrong = signal.strength >= 70;
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-5 border border-gray-100 dark:border-gray-700">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-bold text-lg text-black dark:text-white">{signal.symbol}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">{signal.name}</p>
        </div>
        <div className={`px-3 py-1 rounded-full text-sm font-medium ${
          isBuy 
            ? 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300' 
            : 'bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300'
        }`}>
          {signal.action}
        </div>
      </div>
      
      <div className="mb-4">
        <div className="flex justify-between text-sm mb-1">
          <span className="text-gray-500 dark:text-gray-400">Signal Strength</span>
          <span className={`font-medium ${
            isStrong 
              ? 'text-green-600 dark:text-green-400' 
              : 'text-yellow-600 dark:text-yellow-400'
          }`}>
            {signal.strength}%
          </span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div 
            className={`h-2 rounded-full ${
              isBuy 
                ? 'bg-green-500 dark:bg-green-600' 
                : 'bg-red-500 dark:bg-red-600'
            }`} 
            style={{ width: `${signal.strength}%` }}
          ></div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
        <div>
          <p className="text-gray-500 dark:text-gray-400">Entry Price</p>
          <p className="font-medium text-black dark:text-white">${signal.entryPrice}</p>
        </div>
        <div>
          <p className="text-gray-500 dark:text-gray-400">Target Price</p>
          <p className="font-medium text-green-600 dark:text-green-400">${signal.targetPrice}</p>
        </div>
        <div>
          <p className="text-gray-500 dark:text-gray-400">Stop Loss</p>
          <p className="font-medium text-red-600 dark:text-red-400">${signal.stopLoss}</p>
        </div>
        <div>
          <p className="text-gray-500 dark:text-gray-400">Timeframe</p>
          <p className="font-medium text-black dark:text-white">{signal.timeframe}</p>
        </div>
      </div>
      
      <Link 
        href={`/signals/stocks/${signal.id}`}
        className="block w-full text-center bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition duration-300"
      >
        View Analysis
      </Link>
    </div>
  );
}