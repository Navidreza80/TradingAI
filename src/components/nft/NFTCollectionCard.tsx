"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { NFTCollection } from '@/types/nft';

interface NFTCollectionCardProps {
  collection: NFTCollection;
}

export function NFTCollectionCard({ collection }: NFTCollectionCardProps) {
  const [imageError, setImageError] = React.useState(false);
  const [bannerError, setBannerError] = React.useState(false);
  
  const isPositive = !collection.change.startsWith('-');
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-shadow">
      <div className="relative h-32 w-full">
        {collection.banner && !bannerError ? (
          <Image 
            src={collection.banner} 
            alt={`${collection.name} banner`} 
            fill 
            className="object-cover"
            onError={() => setBannerError(true)}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-purple-400 to-indigo-500"></div>
        )}
      </div>
      
      <div className="p-5">
        <div className="flex items-center mb-4">
          <div className="relative h-16 w-16 -mt-12 rounded-xl overflow-hidden border-4 border-white dark:border-gray-800 bg-purple-100 dark:bg-purple-900 flex items-center justify-center z-10">
            {collection.image && !imageError ? (
              <Image 
                src={collection.image} 
                alt={collection.name} 
                fill 
                className="object-cover"
                onError={() => setImageError(true)}
              />
            ) : (
              <span className="text-purple-600 dark:text-purple-300 font-bold">
                {collection.name.substring(0, 2)}
              </span>
            )}
          </div>
          <div className="ml-3">
            <h3 className="font-bold text-lg text-black dark:text-white">{collection.name}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">by {collection.creator}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-2 mb-4 text-center">
          <div className="bg-gray-50 dark:bg-gray-700 p-2 rounded">
            <p className="text-xs text-gray-500 dark:text-gray-400">Floor</p>
            <p className="font-medium text-black dark:text-white">{collection.floorPrice} ETH</p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 p-2 rounded">
            <p className="text-xs text-gray-500 dark:text-gray-400">Volume</p>
            <p className="font-medium text-black dark:text-white">{collection.volume} ETH</p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 p-2 rounded">
            <p className="text-xs text-gray-500 dark:text-gray-400">Items</p>
            <p className="font-medium text-black dark:text-white">{collection.items}</p>
          </div>
        </div>
        
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm text-gray-500 dark:text-gray-400">24h</span>
          <span className={`text-sm font-medium ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
            {collection.change}
          </span>
        </div>
        
        <Link 
          href={`/market/nft/collection/${collection.id}`}
          className="block w-full text-center bg-purple-500 hover:bg-purple-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
        >
          View Collection
        </Link>
      </div>
    </div>
  );
}