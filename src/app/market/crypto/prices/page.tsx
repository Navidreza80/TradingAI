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

interface CryptoCurrency {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  total_volume: number;
  price_change_percentage_24h: number;
  price_change_24h: number;
  circulating_supply: number;
  favorite?: boolean;
}

export default function CryptoPricesPage() {
  const [cryptoData, setCryptoData] = useState<CryptoCurrency[]>([]);
  const [filteredData, setFilteredData] = useState<CryptoCurrency[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: keyof CryptoCurrency;
    direction: "ascending" | "descending";
  }>({
    key: "market_cap_rank",
    direction: "ascending",
  });
  const [favorites, setFavorites] = useState<string[]>([]);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [pageSize, setPageSize] = useState("50");

  useEffect(() => {
    fetchCryptoData();
    // Load favorites from localStorage
    const savedFavorites = localStorage.getItem("cryptoFavorites");
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }

    // Set up auto-refresh interval (every 5 minutes)
    const intervalId = setInterval(fetchCryptoData, 300000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    // Apply filtering and sorting whenever the source data or filters change
    let result = [...cryptoData];

    // Apply favorites filter if enabled
    if (showFavoritesOnly) {
      result = result.filter((crypto) => favorites.includes(crypto.id));
    }

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (crypto) =>
          crypto.name.toLowerCase().includes(query) ||
          crypto.symbol.toLowerCase().includes(query)
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
  }, [cryptoData, searchQuery, sortConfig, favorites, showFavoritesOnly]);

  const fetchCryptoData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${pageSize}&page=1&sparkline=false`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch cryptocurrency data");
      }

      const data = await response.json();
      
      // Add favorite flag to each crypto
      const dataWithFavorites = data.map((crypto: CryptoCurrency) => ({
        ...crypto,
        favorite: favorites.includes(crypto.id),
      }));

      setCryptoData(dataWithFavorites);
      setError(null);
    } catch (err) {
      console.error("Error fetching crypto data:", err);
      setError(err instanceof Error ? err.message : "An unknown error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleSort = (key: keyof CryptoCurrency) => {
    setSortConfig({
      key,
      direction:
        sortConfig.key === key && sortConfig.direction === "ascending"
          ? "descending"
          : "ascending",
    });
  };

  const toggleFavorite = (id: string) => {
    let newFavorites: string[];
    if (favorites.includes(id)) {
      newFavorites = favorites.filter((favId) => favId !== id);
    } else {
      newFavorites = [...favorites, id];
    }
    setFavorites(newFavorites);
    localStorage.setItem("cryptoFavorites", JSON.stringify(newFavorites));

    // Update the favorite flag in the data
    setCryptoData(
      cryptoData.map((crypto) => {
        if (crypto.id === id) {
          return { ...crypto, favorite: !crypto.favorite };
        }
        return crypto;
      })
    );
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: value < 1 ? 4 : 2,
      maximumFractionDigits: value < 1 ? 6 : 2,
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

  return (
    <div className="container mx-auto px-4 py-24">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">Cryptocurrency Prices</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Live prices for top cryptocurrencies by market capitalization
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

        <div className="flex gap-2">
          <Button
            variant={showFavoritesOnly ? "default" : "outline"}
            onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
            className="flex items-center"
          >
            <Star className="mr-2 h-4 w-4" />
            {showFavoritesOnly ? "All Coins" : "Favorites"}
          </Button>

          <Select
            value={pageSize}
            onValueChange={(value) => {
              setPageSize(value);
              fetchCryptoData();
            }}
          >
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Show 50" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">Show 10</SelectItem>
              <SelectItem value="50">Show 50</SelectItem>
              <SelectItem value="100">Show 100</SelectItem>
              <SelectItem value="250">Show 250</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 dark:bg-red-900/30 text-red-800 dark:text-red-200 p-4 rounded-lg mb-6">
          <p>Error loading cryptocurrency data: {error}</p>
          <Button className="mt-2" onClick={fetchCryptoData}>
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
                <TableHead className="w-[50px] text-center">
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("market_cap_rank")}
                    className="font-semibold"
                  >
                    #
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
                    onClick={() => handleSort("current_price")}
                    className="font-semibold"
                  >
                    Price
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead className="text-center">
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("price_change_percentage_24h")}
                    className="font-semibold"
                  >
                    24h %
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead className="text-center">
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("market_cap")}
                    className="font-semibold"
                  >
                    Market Cap
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead className="text-center">
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("total_volume")}
                    className="font-semibold"
                  >
                    Volume (24h)
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead className="text-center">
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("circulating_supply")}
                    className="font-semibold"
                  >
                    Circulating Supply
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
                    <TableRow key={index} className="border-b border-gray-100 dark:border-gray-800">
                      <TableCell colSpan={8} className="h-16 text-center">
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mx-auto w-3/4"></div>
                      </TableCell>
                    </TableRow>
                  ))
              ) : filteredData.length === 0 ? (
                <TableRow className="border-b border-gray-100 dark:border-gray-800">
                  <TableCell colSpan={8} className="h-24 text-center">
                    No cryptocurrencies found matching your criteria.
                  </TableCell>
                </TableRow>
              ) : (
                filteredData.map((crypto) => (
                  <TableRow key={crypto.id} className="border-b border-gray-100 dark:border-gray-800">
                    <TableCell className="text-center">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => toggleFavorite(crypto.id)}
                        className={
                          favorites.includes(crypto.id)
                            ? "text-yellow-500 hover:text-yellow-600"
                            : "text-gray-400 hover:text-gray-500"
                        }
                      >
                        <Star
                          className={`h-5 w-5 ${
                            favorites.includes(crypto.id) ? "fill-current" : ""
                          }`}
                        />
                      </Button>
                    </TableCell>
                    <TableCell className="text-center">{crypto.market_cap_rank}</TableCell>
                    <TableCell>
                      <Link
                        href={`/market/crypto/${crypto.id}`}
                        className="flex items-center hover:text-blue-600"
                      >
                        <div className="relative w-6 h-6 mr-2">
                          <Image
                            src={crypto.image}
                            alt={crypto.name}
                            fill
                            className="object-contain"
                          />
                        </div>
                        <span className="font-medium">{crypto.name}</span>
                        <span className="text-gray-500 dark:text-gray-400 ml-2 uppercase">
                          {crypto.symbol}
                        </span>
                      </Link>
                    </TableCell>
                    <TableCell className="text-center">
                      {formatCurrency(crypto.current_price)}
                    </TableCell>
                    <TableCell
                      className={`text-center ${
                        crypto.price_change_percentage_24h > 0
                          ? "text-green-600 dark:text-green-500"
                          : "text-red-600 dark:text-red-500"
                      }`}
                    >
                      {formatPercentage(crypto.price_change_percentage_24h)}
                    </TableCell>
                    <TableCell className="text-center">
                      {formatMarketCap(crypto.market_cap)}
                    </TableCell>
                    <TableCell className="text-center">
                      {formatMarketCap(crypto.total_volume)}
                    </TableCell>
                    <TableCell className="text-center">
                      {formatNumber(crypto.circulating_supply)}{" "}
                      <span className="text-gray-500 dark:text-gray-400 uppercase">
                        {crypto.symbol}
                      </span>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
        Data provided by CoinGecko API • Auto-refreshes every 5 minutes •{" "}
        <Button
          variant="link"
          className="p-0 h-auto text-sm"
          onClick={fetchCryptoData}
        >
          Refresh Now
        </Button>
      </div>
    </div>
  );
}