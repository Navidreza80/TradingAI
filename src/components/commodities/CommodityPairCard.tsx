import { CommodityPair } from "@/types/commodity";
import Link from "next/link";
import { ArrowDown, ArrowUp, TrendingUp } from "lucide-react";

interface CommodityPairCardProps {
  pair: CommodityPair;
}

export function CommodityPairCard({ pair }: CommodityPairCardProps) {
  // Format large numbers with commas
  const formatNumber = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // Get category-specific styling
  const getCategoryStyle = (category: string) => {
    const styles = {
      "Precious Metals": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
      "Energy": "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
      "Agriculture": "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
      "Industrial Metals": "bg-gray-100 text-gray-800 dark:bg-gray-700/50 dark:text-gray-300",
      "Other": "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
    };
    
    return styles[category as keyof typeof styles] || styles["Other"];
  };

  return (
    <Link 
      href={`/market/commodities/${pair.symbol.toLowerCase()}`}
      className="block bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-700 overflow-hidden"
    >
      <div className="p-5">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              {pair.name}
            </h3>
            <div className="flex items-center mt-1">
              <span className="text-sm text-gray-500 dark:text-gray-400 mr-2">
                {pair.symbol}
              </span>
              <span className={`text-xs px-2 py-0.5 rounded-full ${getCategoryStyle(pair.category)}`}>
                {pair.category}
              </span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-xl font-bold text-gray-900 dark:text-white">
              ${pair.price}
            </div>
            <div className={`flex items-center justify-end mt-1 ${pair.isPositive ? 'text-green-500' : 'text-red-500'}`}>
              {pair.isPositive ? <ArrowUp className="h-3 w-3 mr-1" /> : <ArrowDown className="h-3 w-3 mr-1" />}
              <span className="text-sm">{pair.change}</span>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <div className="text-gray-500 dark:text-gray-400 mb-1">Volume</div>
            <div className="font-medium text-gray-900 dark:text-white">{formatNumber(pair.volume)}</div>
          </div>
          <div>
            <div className="text-gray-500 dark:text-gray-400 mb-1">24h Range</div>
            <div className="font-medium text-gray-900 dark:text-white">
              ${pair.low24h} - ${pair.high24h}
            </div>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center">
          <span className="text-amber-600 dark:text-amber-400 text-sm font-medium flex items-center">
            View Details
            <TrendingUp className="ml-1 h-4 w-4" />
          </span>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            Updated just now
          </div>
        </div>
      </div>
    </Link>
  );
}