"use client";

import React from 'react';
import Link from 'next/link';
import { TradingSignal } from '@/types/trading';

interface SignalCardProps {
  signal: TradingSignal;
}

export function SignalCard({ signal }: SignalCardProps) {
  const isBuy = signal.action === "BUY";
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-shadow">
      <div className="p-5">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="font-bold text-lg text-black dark:text-white">{signal.name}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{signal.symbol}</p>
          </div>
          <div className={`px-3 py-1 rounded-full text-white font-bold ${isBuy ? 'bg-green-500' : 'bg-red-500'}`}>
            {signal.action}
          </div>
        </div>
        
        <div className="mb-4">
          <div className="flex justify-between mb-1">
            <span className="text-sm text-gray-500 dark:text-gray-400">Signal Strength</span>
            <span className="text-sm font-medium text-black dark:text-white">{signal.strength}%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div 
              className={`h-2 rounded-full ${isBuy ? 'bg-green-500' : 'bg-red-500'}`} 
              style={{ width: `${signal.strength}%` }}
            ></div>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-2 mb-4 text-center">
          <div className="bg-gray-50 dark:bg-gray-700 p-2 rounded">
            <p className="text-xs text-gray-500 dark:text-gray-400">Entry</p>
            <p className="font-medium text-black dark:text-white">${signal.entryPrice}</p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 p-2 rounded">
            <p className="text-xs text-gray-500 dark:text-gray-400">Target</p>
            <p className={`font-medium ${isBuy ? 'text-green-500' : 'text-red-500'}`}>
              ${signal.targetPrice}
            </p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 p-2 rounded">
            <p className="text-xs text-gray-500 dark:text-gray-400">Stop Loss</p>
            <p className="font-medium text-red-500">${signal.stopLoss}</p>
          </div>
        </div>
        
        <div className="mb-4">
          <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
            {signal.analysis}
          </p>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {signal.timeframe}
          </span>
          
          <Link 
            href={`/signals/commodities/${signal.id}`}
            className="text-amber-500 hover:text-amber-700 font-medium text-sm"
          >
            View Analysis →
          </Link>
        </div>
      </div>
    </div>
  );
}