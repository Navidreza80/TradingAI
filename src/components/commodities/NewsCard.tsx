"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CommodityNews } from '@/types/commodity';

interface NewsCardProps {
  news: CommodityNews;
}

export function NewsCard({ news }: NewsCardProps) {
  const [imageError, setImageError] = React.useState(false);
  
  // Format date to readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-shadow h-full flex flex-col">
      <div className="relative h-48 w-full">
        {!imageError ? (
          <Image 
            src={news.image} 
            alt={news.title} 
            fill 
            className="object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full bg-amber-100 dark:bg-amber-900 flex items-center justify-center">
            <span className="text-amber-600 dark:text-amber-300 text-xl font-bold">
              {news.category}
            </span>
          </div>
        )}
        <div className="absolute top-0 left-0 bg-amber-500 text-white text-xs font-bold px-3 py-1 m-3 rounded">
          {news.category}
        </div>
      </div>
      
      <div className="p-5 flex-grow flex flex-col">
        <h3 className="font-bold text-lg mb-2 text-black dark:text-white line-clamp-2">
          {news.title}
        </h3>
        
        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 flex-grow">
          {news.excerpt}
        </p>
        
        <div className="flex justify-between items-center mt-auto">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {formatDate(news.date)}
          </span>
          
          <Link 
            href={`/news/commodities/${news.id}`}
            className="text-amber-500 hover:text-amber-700 font-medium text-sm"
          >
            Read More →
          </Link>
        </div>
      </div>
    </div>
  );
}