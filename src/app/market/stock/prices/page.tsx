/* eslint-disable */
"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/UI/input";
import { Button } from "@/components/UI/Button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/UI/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/UI/select";
import { Search, ArrowUpDown, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getStockPairs } from "@/services/stockMarketService";

interface StockData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  marketCap: number;
  sector: string;
  logo: string;
  lastUpdated: string;
  favorite?: boolean;
}

export default function StockPricesPage() {
  const [stockData, setStockData] = useState<StockData[]>([]);
  const [filteredData, setFilteredData] = useState<StockData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: keyof StockData;
    direction: "ascending" | "descending";
  }>({
    key: "marketCap",
    direction: "descending",
  });
  const [favorites, setFavorites] = useState<string[]>([]);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [sectorFilter, setSectorFilter] = useState<string>("all");

  useEffect(() => {
    fetchStockData();
    // Load favorites from localStorage
    const savedFavorites = localStorage.getItem("stockFavorites");
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }

    // Set up auto-refresh interval (every 5 minutes)
    const intervalId = setInterval(fetchStockData, 300000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    // Apply filtering and sorting whenever the source data or filters change
    let result = [...stockData];

    // Apply favorites filter if enabled
    if (showFavoritesOnly) {
      result = result.filter((stock) => favorites.includes(stock.symbol));
    }

    // Apply sector filter
    if (sectorFilter !== "all") {
      result = result.filter((stock) => stock.sector === sectorFilter);
    }

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (stock) =>
          stock.name.toLowerCase().includes(query) ||
          stock.symbol.toLowerCase().includes(query)
      );
    }

    // Apply sorting
    result.sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortConfig.direction === "ascending"
          ? aValue - bValue
          : bValue - aValue;
      } else {
        const aString = String(aValue).toLowerCase();
        const bString = String(bValue).toLowerCase();
        return sortConfig.direction === "ascending"
          ? aString.localeCompare(bString)
          : bString.localeCompare(aString);
      }
    });

    setFilteredData(result);
  }, [
    stockData,
    searchQuery,
    sortConfig,
    favorites,
    showFavoritesOnly,
    sectorFilter,
  ]);

  const fetchStockData = async () => {
    setLoading(true);
    try {
      const data = await getStockPairs();

      if (!data || data.length === 0) {
        throw new Error("No stock data available");
      }

      // Add favorite flag to each stock
      const dataWithFavorites = data.map((stock) => ({
        ...stock,
        favorite: favorites.includes(stock.symbol),
      }));

      setStockData(dataWithFavorites);
      setError(null);
    } catch (err) {
      console.error("Error fetching stock data:", err);
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSort = (key: keyof StockData) => {
    setSortConfig({
      key,
      direction:
        sortConfig.key === key && sortConfig.direction === "ascending"
          ? "descending"
          : "ascending",
    });
  };

  const toggleFavorite = (symbol: string) => {
    let newFavorites: string[];
    if (favorites.includes(symbol)) {
      newFavorites = favorites.filter((favSymbol) => favSymbol !== symbol);
    } else {
      newFavorites = [...favorites, symbol];
    }
    setFavorites(newFavorites);
    localStorage.setItem("stockFavorites", JSON.stringify(newFavorites));

    // Update the favorite flag in the data
    setStockData(
      stockData.map((stock) => {
        if (stock.symbol === symbol) {
          return { ...stock, favorite: !stock.favorite };
        }
        return stock;
      })
    );
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat("en-US").format(value);
  };

  const formatPercentage = (value: number) => {
    return `${value > 0 ? "+" : ""}${value.toFixed(2)}%`;
  };

  const formatMarketCap = (value: number) => {
    if (value >= 1e12) {
      return `$${(value / 1e12).toFixed(2)}T`;
    } else if (value >= 1e9) {
      return `$${(value / 1e9).toFixed(2)}B`;
    } else if (value >= 1e6) {
      return `$${(value / 1e6).toFixed(2)}M`;
    } else {
      return `$${value.toFixed(0)}`;
    }
  };

  // Get unique sectors for the filter
  const sectors =
    stockData.length > 0
      ? ["all", ...new Set(stockData.map((stock) => stock.sector))]
      : ["all"];

  return (
    <div className="container mx-auto px-4 py-24">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">
          Stock Market Prices
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Live prices for top stocks by market capitalization
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6 items-start md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
          <Input
            type="text"
            placeholder="Search by name or symbol..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex gap-2 flex-wrap">
          <Button
            variant={showFavoritesOnly ? "default" : "outline"}
            onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
            className="flex items-center text-black dark:text-white"
          >
            <Star className="mr-2 h-4 w-4" />
            {showFavoritesOnly ? "All Stocks" : "Favorites"}
          </Button>

          <Select
            value={sectorFilter}
            onValueChange={(value) => setSectorFilter(value)}
          >
            <SelectTrigger className="w-[150px] dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200">
              <SelectValue placeholder="Filter by Sector" />
            </SelectTrigger>
            <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
              {sectors.map((sector) => (
                <SelectItem
                  key={sector}
                  value={sector}
                  className="dark:text-gray-200 dark:data-[highlighted]:bg-gray-700 dark:data-[highlighted]:text-gray-50"
                >
                  {sector === "all" ? "All Sectors" : sector}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 dark:bg-red-900/30 text-red-800 dark:text-red-200 p-4 rounded-lg mb-6">
          <p>Error loading stock data: {error}</p>
          <Button className="mt-2" onClick={fetchStockData}>
            Try Again
          </Button>
        </div>
      )}

      <div className="rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden dark:border-gray-800 dark:bg-gray-950 dark:text-gray-100">
        <div className="relative w-full overflow-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-gray-200 dark:border-gray-800">
                <TableHead className="w-[50px] text-center">Fav</TableHead>
                <TableHead className="min-w-[150px]">
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("symbol")}
                    className="font-semibold"
                  >
                    Symbol
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead className="min-w-[200px]">
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("name")}
                    className="font-semibold"
                  >
                    Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead className="text-center">
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("price")}
                    className="font-semibold"
                  >
                    Price
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead className="text-center">
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("changePercent")}
                    className="font-semibold"
                  >
                    Change %
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead className="text-center">
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("marketCap")}
                    className="font-semibold"
                  >
                    Market Cap
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead className="text-center">
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("volume")}
                    className="font-semibold"
                  >
                    Volume
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead className="text-center">
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("sector")}
                    className="font-semibold"
                  >
                    Sector
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                Array(10)
                  .fill(0)
                  .map((_, index) => (
                    <TableRow
                      key={index}
                      className="border-b border-gray-100 dark:border-gray-800"
                    >
                      <TableCell colSpan={8} className="h-16 text-center">
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mx-auto w-3/4"></div>
                      </TableCell>
                    </TableRow>
                  ))
              ) : filteredData.length === 0 ? (
                <TableRow className="border-b border-gray-100 dark:border-gray-800">
                  <TableCell colSpan={8} className="h-24 text-center">
                    No stocks found matching your criteria.
                  </TableCell>
                </TableRow>
              ) : (
                filteredData.map((stock) => (
                  <TableRow
                    key={stock.symbol}
                    className="border-b border-gray-100 dark:border-gray-800"
                  >
                    <TableCell className="text-center">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => toggleFavorite(stock.symbol)}
                        className={
                          favorites.includes(stock.symbol)
                            ? "text-yellow-500 hover:text-yellow-600"
                            : "text-gray-400 hover:text-gray-500"
                        }
                      >
                        <Star
                          className={`h-5 w-5 ${
                            favorites.includes(stock.symbol)
                              ? "fill-current"
                              : ""
                          }`}
                        />
                      </Button>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{stock.symbol}</div>
                    </TableCell>
                    <TableCell>
                      <Link
                        href={`/market/stock/${stock.symbol}`}
                        className="flex items-center hover:text-blue-600"
                      >
                        {stock.logo && (
                          <div className="relative w-6 h-6 mr-2">
                            <Image
                              src={stock.logo}
                              alt={stock.name}
                              fill
                              className="object-contain"
                            />
                          </div>
                        )}
                        <span>{stock.name}</span>
                      </Link>
                    </TableCell>
                    <TableCell className="text-center">
                      {formatCurrency(stock.price)}
                    </TableCell>
                    <TableCell
                      className={`text-center ${
                        stock.changePercent > 0
                          ? "text-green-600 dark:text-green-500"
                          : stock.changePercent < 0
                          ? "text-red-600 dark:text-red-500"
                          : ""
                      }`}
                    >
                      {formatPercentage(stock.changePercent)}
                    </TableCell>
                    <TableCell className="text-center">
                      {formatMarketCap(stock.marketCap)}
                    </TableCell>
                    <TableCell className="text-center">
                      {formatNumber(stock.volume)}
                    </TableCell>
                    <TableCell className="text-center">
                      {stock.sector}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
        Data provided by Finnhub API • Auto-refreshes every 5 minutes •{" "}
        <Button
          variant="link"
          className="p-0 h-auto text-sm"
          onClick={fetchStockData}
        >
          Refresh Now
        </Button>
      </div>
    </div>
  );
}
