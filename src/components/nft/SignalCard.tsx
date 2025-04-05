"use client";
// Next built in components
import Link from 'next/link';
import Image from 'next/image';
//  NFT signal type
import { NFTSignal } from '@/types/nft';
// React built in hook
import { useState } from 'react';

interface SignalCardProps {
  signal: NFTSignal;
}

export function SignalCard({ signal }: SignalCardProps) {
  // State to save image load error
  const [imageError, setImageError] = useState(false);
  
  // Calculate signal items and data
  const isBuy = signal.action === "BUY";
  const isSell = signal.action === "SELL";
  
  const getActionColor = () => {
    if (isBuy) return "bg-green-500";
    if (isSell) return "bg-red-500";
    return "bg-blue-500"; // HOLD
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-shadow">
      <div className="p-5">
        <div className="flex items-center mb-4">
          <div className="relative h-12 w-12 mr-3 rounded-lg overflow-hidden bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
            {!imageError ? (
              <Image 
                src={signal.image} 
                alt={signal.collectionName} 
                fill 
                className="object-cover"
                onError={() => setImageError(true)}
              />
            ) : (
              <span className="text-purple-600 dark:text-purple-300 font-bold">
                {signal.collectionName.substring(0, 2)}
              </span>
            )}
          </div>
          <div>
            <h3 className="font-bold text-lg text-black dark:text-white">{signal.collectionName}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Collection</p>
          </div>
          <div className={`ml-auto px-3 py-1 rounded-full text-white font-bold ${getActionColor()}`}>
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
              className={`h-2 rounded-full ${
                isBuy ? 'bg-green-500' : isSell ? 'bg-red-500' : 'bg-blue-500'
              }`} 
              style={{ width: `${signal.strength}%` }}
            ></div>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-2 mb-4 text-center">
          <div className="bg-gray-50 dark:bg-gray-700 p-2 rounded">
            <p className="text-xs text-gray-500 dark:text-gray-400">Floor</p>
            <p className="font-medium text-black dark:text-white">{signal.floorPrice}</p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 p-2 rounded">
            <p className="text-xs text-gray-500 dark:text-gray-400">Target</p>
            <p className={`font-medium ${isBuy ? 'text-green-500' : isSell ? 'text-red-500' : 'text-blue-500'}`}>
              {signal.targetPrice}
            </p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 p-2 rounded">
            <p className="text-xs text-gray-500 dark:text-gray-400">Timeframe</p>
            <p className="font-medium text-black dark:text-white">{signal.timeframe}</p>
          </div>
        </div>
        
        <div className="mb-4">
          <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
            {signal.analysis}
          </p>
        </div>
        
        <Link 
          href={`/signals/nft/${signal.id}`}
          className="block w-full text-center bg-purple-500 hover:bg-purple-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
        >
          View Full Analysis
        </Link>
      </div>
    </div>
  );
}