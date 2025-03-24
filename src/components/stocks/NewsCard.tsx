"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { formatDistanceToNow } from 'date-fns';
import { StockNews } from '@/types/stock';

interface NewsCardProps {
  news: StockNews;
}

export function NewsCard({ news }: NewsCardProps) {
  const [imageError, setImageError] = React.useState(false);
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-shadow">
      <div className="relative h-40">
        {!imageError ? (
          <Image
            src={news.image}
            alt={news.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
            <span className="text-green-600 dark:text-green-300 text-2xl font-bold">
              {news.category.charAt(0)}
            </span>
          </div>
        )}
        <div className="absolute top-0 left-0 bg-green-600 text-white text-xs px-2 py-1 m-2 rounded">
          {news.category}
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2 text-black dark:text-white line-clamp-2">
          {news.title}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-3 line-clamp-2">
          {news.excerpt}
        </p>
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {formatDistanceToNow(new Date(news.date), { addSuffix: true })}
          </span>
          <Link
            href={`/news/stocks/${news.id}`}
            className="text-green-600 dark:text-green-400 text-sm font-medium hover:underline"
          >
            Read More →
          </Link>
        </div>
      </div>
    </div>
  );
}