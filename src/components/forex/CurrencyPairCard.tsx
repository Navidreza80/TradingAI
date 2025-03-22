import React from 'react';
import Link from 'next/link';

interface CurrencyPair {
  pair: string;
  price: string;
  change: string;
  changePercent: string;
}

interface CurrencyPairCardProps {
  pair: CurrencyPair;
}

export function CurrencyPairCard({ pair }: CurrencyPairCardProps) {
  const isPositive = !pair.change.startsWith('-');
  
  return (
    <Link 
      href={`/market/forex/pairs/${pair.pair.replace('/', '')}`}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-5 border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-shadow duration-300"
    >
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-bold text-lg text-black dark:text-white">
          {pair.pair}
        </h3>
        <span
          className={`text-sm px-3 py-1 rounded-full font-medium ${
            isPositive
              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
              : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
          }`}
        >
          {isPositive ? "+" : ""}
          {pair.changePercent}%
        </span>
      </div>
      <p className="text-3xl font-bold mb-2 text-gray-800 dark:text-gray-200">
        {pair.price}
      </p>
      <div className="flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-4 w-4 mr-1 ${
            isPositive
              ? "text-green-600 dark:text-green-400"
              : "text-red-600 dark:text-red-400"
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={
              isPositive
                ? "M5 10l7-7m0 0l7 7m-7-7v18"
                : "M19 14l-7 7m0 0l-7-7m7 7V3"
            }
          />
        </svg>
        <p
          className={`text-sm font-medium ${
            isPositive
              ? "text-green-600 dark:text-green-400"
              : "text-red-600 dark:text-red-400"
          }`}
        >
          {isPositive ? "+" : ""}
          {pair.change}
        </p>
      </div>
    </Link>
  );
}