"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { StockPair } from '@/types/stock';

interface StockPairCardProps {
  pair: StockPair;
}

export function StockPairCard({ pair }: StockPairCardProps) {
  const [imageError, setImageError] = useState(false);
  
  const isPositive = parseFloat(pair.changePercent) >= 0;
  
  return (
    <Link href={`/market/stock/${pair.symbol.toLowerCase()}`}>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-5 border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-shadow">
        <div className="flex items-center mb-4">
          {pair.image && !imageError ? (
            <Image
              src={pair.image}
              alt={pair.name}
              width={32}
              height={32}
              className="rounded-full mr-3"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mr-3">
              <span className="text-green-600 dark:text-green-300 font-bold">
                {pair.symbol.charAt(0)}
              </span>
            </div>
          )}
          <div>
            <h3 className="font-bold text-black dark:text-white">{pair.name}</h3>
            <span className="text-sm text-gray-500 dark:text-gray-400">{pair.symbol}</span>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div>
            <p className="text-xl font-bold text-black dark:text-white">${parseFloat(pair.price).toLocaleString()}</p>
            <p className={`text-sm ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
              {isPositive ? '+' : ''}{pair.changePercent}%
            </p>
          </div>
          <div className={`w-16 h-8 rounded-lg flex items-center justify-center ${isPositive ? 'bg-green-100 dark:bg-green-900' : 'bg-red-100 dark:bg-red-900'}`}>
            <span className={`text-sm font-medium ${isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
              {isPositive ? '↑' : '↓'} {Math.abs(parseFloat(pair.change)).toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}