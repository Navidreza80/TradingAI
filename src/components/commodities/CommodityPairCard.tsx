"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CommodityPair } from '@/types/commodity';

interface CommodityPairCardProps {
  pair: CommodityPair;
}

export function CommodityPairCard({ pair }: CommodityPairCardProps) {
  const [imageError, setImageError] = React.useState(false);
  
  const isPositive = !pair.change.startsWith('-');
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-shadow">
      <div className="p-5">
        <div className="flex items-center mb-4">
          <div className="relative h-10 w-10 mr-3 rounded-full overflow-hidden bg-amber-100 dark:bg-amber-900 flex items-center justify-center">
            {pair.image && !imageError ? (
              <Image 
                src={pair.image} 
                alt={pair.name} 
                fill 
                className="object-cover"
                onError={() => setImageError(true)}
              />
            ) : (
              <span className="text-amber-600 dark:text-amber-300 font-bold">
                {pair.symbol.substring(0, 2)}
              </span>
            )}
          </div>
          <div>
            <h3 className="font-bold text-lg text-black dark:text-white">{pair.name}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{pair.symbol}</p>
          </div>
          <div className="ml-auto text-right">
            <span className="block font-bold text-lg text-black dark:text-white">
              ${pair.price}
            </span>
            <span className={`text-sm ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
              {pair.change} ({pair.changePercent}%)
            </span>
          </div>
        </div>
        
        <div className="flex justify-between text-sm mb-4">
          <div>
            <p className="text-gray-500 dark:text-gray-400">Volume</p>
            <p className="font-medium text-black dark:text-white">{Number(pair.volume).toLocaleString()}</p>
          </div>
          <div>
            <p className="text-gray-500 dark:text-gray-400">Category</p>
            <p className="font-medium text-black dark:text-white">{pair.category}</p>
          </div>
        </div>
        
        <Link 
          href={`/market/commodities/${pair.symbol}`}
          className="block w-full text-center bg-amber-500 hover:bg-amber-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}