"use client";
// Next built in components
import Link from "next/link";
import Image from "next/image";
// Crypto pair type
import { CryptoPair } from "@/types/crypto";

interface CryptoPairCardProps {
  pair: CryptoPair;
}

export function CryptoPairCard({ pair }: CryptoPairCardProps) {
  // Check if the variable is positive or negative
  const isPositive = parseFloat(pair.changePercent) >= 0;

  return (
    <Link href={`/market/crypto/${pair.symbol.toLowerCase()}`}>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-5 border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-shadow">
        <div className="flex items-center mb-4">
          <Image
            src={pair.image}
            alt={pair.name}
            width={32}
            height={32}
            className="rounded-full mr-3"
          />
          <div>
            <h3 className="font-bold text-black dark:text-white">
              {pair.name}
            </h3>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {pair.symbol}
            </span>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div>
            <p className="text-xl font-bold text-black dark:text-white">
              ${parseFloat(pair.price).toLocaleString()}
            </p>
            <p
              className={`text-sm ${
                isPositive ? "text-green-500" : "text-red-500"
              }`}
            >
              {isPositive ? "+" : ""}
              {pair.changePercent}%
            </p>
          </div>
          <div
            className={`w-16 h-8 rounded-lg flex items-center justify-center ${
              isPositive
                ? "bg-green-100 dark:bg-green-900"
                : "bg-red-100 dark:bg-red-900"
            }`}
          >
            <span
              className={`text-sm font-medium ${
                isPositive
                  ? "text-green-600 dark:text-green-400"
                  : "text-red-600 dark:text-red-400"
              }`}
            >
              {isPositive ? "↑" : "↓"}{" "}
              {Math.abs(parseFloat(pair.change)).toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
