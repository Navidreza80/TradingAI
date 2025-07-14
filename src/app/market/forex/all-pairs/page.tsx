/* eslint-disable */
"use client";

import { Badge } from "@/components/UI/badge";
import { Button } from "@/components/UI/Button";
import { Card, CardContent, CardHeader } from "@/components/UI/card";
import { Input } from "@/components/UI/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/UI/select";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/UI/table";
import { ArrowDown, ArrowUp, ArrowUpDown, RefreshCw, Search } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface CurrencyPair {
  pair: string;
  price: string;
  change: string;
  changePercent: string;
  high24h: string;
  low24h: string;
  volume: string;
  spread: string;
  updated: string;
}

interface ExchangeRateApiResponse {
  base: string;
  rates: Record<string, number>;
  time_last_updated: number;
}

export default function AllPairsPage() {
  const [currencyPairs, setCurrencyPairs] = useState<CurrencyPair[]>([]);
  const [filteredPairs, setFilteredPairs] = useState<CurrencyPair[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortField, setSortField] = useState<string>("pair");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [lastUpdated, setLastUpdated] = useState<string>("");
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [pairType, setPairType] = useState<string>("all");

  // Define all the currency pairs we want to display
  const allPairs = [
    // Major pairs
    "EURUSD", "GBPUSD", "USDJPY", "USDCHF", "AUDUSD", "USDCAD", "NZDUSD",
    // Minor pairs
    "EURGBP", "EURJPY", "EURCHF", "EURAUD", "EURCAD", "GBPJPY", "GBPCHF", 
    "GBPAUD", "GBPCAD", "AUDJPY", "CADJPY", "NZDJPY", "AUDCAD", "AUDNZD",
    // Exotic pairs
    "USDSEK", "USDNOK", "USDDKK", "USDSGD", "USDHKD", "USDTRY", "USDZAR", 
    "USDMXN", "EURTRY", "EURNOK", "EURPLN", "EURZAR", "GBPNZD", "GBPSGD"
  ];

  // Function to fetch forex data
  const fetchForexData = async () => {
    setLoading(true);
    setRefreshing(true);
    try {
      // Using ExchangeRate-API as an alternative (no API key required for this endpoint)
      const response = await fetch("https://open.er-api.com/v6/latest/USD");

      if (!response.ok) {
        throw new Error("Failed to fetch exchange rate data");
      }

      const data: ExchangeRateApiResponse = await response.json();

      if (!data.rates) {
        throw new Error("No exchange rate data available");
      }

      // Process the data from the API
      const pairsData: CurrencyPair[] = allPairs.map((pair) => {
        const fromCurrency = pair.substring(0, 3);
        const toCurrency = pair.substring(3, 6);

        // Calculate exchange rates based on USD as the base
        let rate: number;
        let previousRate: number;

        if (fromCurrency === "USD") {
          // Direct rate from USD to other currency
          rate = data.rates[toCurrency] || 1;
          // Simulate a small random change for demonstration
          previousRate = rate * (1 + (Math.random() * 0.002 - 0.001));
        } else if (toCurrency === "USD") {
          // Inverse rate from other currency to USD
          rate = 1 / (data.rates[fromCurrency] || 1);
          // Simulate a small random change for demonstration
          previousRate = rate * (1 + (Math.random() * 0.002 - 0.001));
        } else {
          // Cross rate between two non-USD currencies
          rate =
            (data.rates[toCurrency] || 1) / (data.rates[fromCurrency] || 1);
          // Simulate a small random change for demonstration
          previousRate = rate * (1 + (Math.random() * 0.002 - 0.001));
        }

        const change = rate - previousRate;
        const changePercent = (change / previousRate) * 100;

        // Generate simulated data for additional fields
        const high24h = (rate + Math.random() * 0.005).toFixed(4);
        const low24h = (rate - Math.random() * 0.005).toFixed(4);
        const volume = (Math.random() * 1000 + 500).toFixed(0);
        const spread = (Math.random() * 3 + 0.5).toFixed(1);

        return {
          pair: `${fromCurrency}/${toCurrency}`,
          price: rate.toFixed(4),
          change: change.toFixed(4),
          changePercent: changePercent.toFixed(2),
          high24h,
          low24h,
          volume,
          spread,
          updated: new Date().toISOString(),
        };
      });

      setCurrencyPairs(pairsData);
      setFilteredPairs(pairsData);
      setLastUpdated(new Date().toLocaleTimeString());
      setError(null);
    } catch (err) {
      console.error("Error fetching forex data:", err);
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );

      // Fallback to mock data if API fails
      const mockData: CurrencyPair[] = allPairs.map(pair => {
        const fromCurrency = pair.substring(0, 3);
        const toCurrency = pair.substring(3, 6);
        const price = (Math.random() * 2 + 0.5).toFixed(4);
        const change = (Math.random() * 0.01 - 0.005).toFixed(4);
        const changePercent = (parseFloat(change) / parseFloat(price) * 100).toFixed(2);
        
        return {
          pair: `${fromCurrency}/${toCurrency}`,
          price,
          change,
          changePercent,
          high24h: (parseFloat(price) + Math.random() * 0.005).toFixed(4),
          low24h: (parseFloat(price) - Math.random() * 0.005).toFixed(4),
          volume: (Math.random() * 1000 + 500).toFixed(0),
          spread: (Math.random() * 3 + 0.5).toFixed(1),
          updated: new Date().toISOString(),
        };
      });
      
      setCurrencyPairs(mockData);
      setFilteredPairs(mockData);
      setLastUpdated(new Date().toLocaleTimeString());
    } finally {
      setLoading(false);
      setTimeout(() => setRefreshing(false), 500);
    }
  };

  // Filter and sort pairs
  useEffect(() => {
    let filtered = [...currencyPairs];
    
    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(pair => 
        pair.pair.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply pair type filter
    if (pairType !== "all") {
      if (pairType === "major") {
        filtered = filtered.filter(pair => 
          ["EUR/USD", "GBP/USD", "USD/JPY", "USD/CHF", "AUD/USD", "USD/CAD", "NZD/USD"].includes(pair.pair)
        );
      } else if (pairType === "minor") {
        filtered = filtered.filter(pair => 
          !["EUR/USD", "GBP/USD", "USD/JPY", "USD/CHF", "AUD/USD", "USD/CAD", "NZD/USD"].includes(pair.pair) &&
          !pair.pair.includes("SEK") && !pair.pair.includes("NOK") && !pair.pair.includes("DKK") &&
          !pair.pair.includes("SGD") && !pair.pair.includes("HKD") && !pair.pair.includes("TRY") &&
          !pair.pair.includes("ZAR") && !pair.pair.includes("MXN") && !pair.pair.includes("PLN")
        );
      } else if (pairType === "exotic") {
        filtered = filtered.filter(pair => 
          pair.pair.includes("SEK") || pair.pair.includes("NOK") || pair.pair.includes("DKK") ||
          pair.pair.includes("SGD") || pair.pair.includes("HKD") || pair.pair.includes("TRY") ||
          pair.pair.includes("ZAR") || pair.pair.includes("MXN") || pair.pair.includes("PLN")
        );
      }
    }
    
    // Apply sorting
    filtered.sort((a, b) => {
      let aValue = a[sortField as keyof CurrencyPair];
      let bValue = b[sortField as keyof CurrencyPair];
      
      // Convert to numbers for numeric fields
      if (["price", "change", "changePercent", "high24h", "low24h", "volume", "spread"].includes(sortField)) {
        aValue = parseFloat(aValue as string);
        bValue = parseFloat(bValue as string);
      }
      
      if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
      if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
    
    setFilteredPairs(filtered);
  }, [currencyPairs, searchQuery, sortField, sortDirection, pairType]);

  // Initial data fetch
  useEffect(() => {
    fetchForexData();
    const intervalId = setInterval(fetchForexData, 60000); // Refresh every minute
    return () => clearInterval(intervalId);
  }, []);

  // Handle sort click
  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  // Get sort icon
  const getSortIcon = (field: string) => {
    if (sortField !== field) return <ArrowUpDown className="h-4 w-4" />;
    return sortDirection === "asc" ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />;
  };

  return (
    <div className="container mx-auto px-4 pt-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div className="flex items-center mt-4 md:mt-0">
          <span className="text-sm text-gray-500 dark:text-gray-400 mr-2">
            Last updated: {lastUpdated}
          </span>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={fetchForexData}
            disabled={refreshing}
            className="flex items-center dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
          >
            <RefreshCw className={`h-4 w-4 mr-1 ${refreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </div>

      {error && (
        <Card className="mb-6 border-red-200 dark:border-red-800">
          <CardContent className="pt-6">
            <div className="bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200 p-4 rounded-lg">
              <p>Error loading forex data: {error}</p>
              <p className="text-sm mt-1">Showing fallback data instead.</p>
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="dark:bg-gray-900 dark:border-gray-700">
        <CardHeader className="pb-0">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
            <div className="w-full md:w-64">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                <Input
                  placeholder="Search currency pairs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
            <div className="flex space-x-2">
              <Select value={pairType} onValueChange={setPairType}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Pairs</SelectItem>
                  <SelectItem value="major">Major Pairs</SelectItem>
                  <SelectItem value="minor">Minor Pairs</SelectItem>
                  <SelectItem value="exotic">Exotic Pairs</SelectItem>
                </SelectContent>
              </Select>
              <Link href="/market/forex/trade">
                <Button>Trade Now</Button>
              </Link>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border dark:border-gray-700 mt-6 dark:bg-gray-900">
            <Table>
              <TableHeader className="bg-gray-50 dark:bg-gray-800">
                <TableRow className="hover:bg-gray-100 dark:hover:bg-gray-700">
                  <TableHead className="w-[150px] cursor-pointer" onClick={() => handleSort("pair")}>
                    <div className="flex items-center">
                      Pair {getSortIcon("pair")}
                    </div>
                  </TableHead>
                  <TableHead className="cursor-pointer" onClick={() => handleSort("price")}>
                    <div className="flex items-center">
                      Price {getSortIcon("price")}
                    </div>
                  </TableHead>
                  <TableHead className="cursor-pointer" onClick={() => handleSort("change")}>
                    <div className="flex items-center">
                      Change (24h) {getSortIcon("change")}
                    </div>
                  </TableHead>
                  <TableHead className="cursor-pointer" onClick={() => handleSort("changePercent")}>
                    <div className="flex items-center">
                      % Change {getSortIcon("changePercent")}
                    </div>
                  </TableHead>
                  <TableHead className="cursor-pointer hidden md:table-cell" onClick={() => handleSort("high24h")}>
                    <div className="flex items-center">
                      24h High {getSortIcon("high24h")}
                    </div>
                  </TableHead>
                  <TableHead className="cursor-pointer hidden md:table-cell" onClick={() => handleSort("low24h")}>
                    <div className="flex items-center">
                      24h Low {getSortIcon("low24h")}
                    </div>
                  </TableHead>
                  <TableHead className="cursor-pointer hidden lg:table-cell" onClick={() => handleSort("volume")}>
                    <div className="flex items-center">
                      Volume {getSortIcon("volume")}
                    </div>
                  </TableHead>
                  <TableHead className="cursor-pointer hidden lg:table-cell" onClick={() => handleSort("spread")}>
                    <div className="flex items-center">
                      Spread (pips) {getSortIcon("spread")}
                    </div>
                  </TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading && filteredPairs.length === 0 ? (
                  Array(10).fill(0).map((_, index) => (
                    <TableRow key={index} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                      <TableCell>
                        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-20 animate-pulse"></div>
                      </TableCell>
                      <TableCell>
                        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-16 animate-pulse"></div>
                      </TableCell>
                      <TableCell>
                        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-16 animate-pulse"></div>
                      </TableCell>
                      <TableCell>
                        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-16 animate-pulse"></div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-16 animate-pulse"></div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-16 animate-pulse"></div>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-16 animate-pulse"></div>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-16 animate-pulse"></div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-16 ml-auto animate-pulse"></div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : filteredPairs.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center py-6 text-gray-500 dark:text-gray-400">
                      No currency pairs found matching your search
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredPairs.map((pair) => {
                    const isPositive = parseFloat(pair.change) >= 0;
                    return (
                      <TableRow key={pair.pair} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                        <TableCell className="font-medium">
                          <div className="flex items-center">
                            <span className="font-semibold">{pair.pair}</span>
                            {["EUR/USD", "GBP/USD", "USD/JPY", "USD/CHF", "AUD/USD", "USD/CAD", "NZD/USD"].includes(pair.pair) && (
                              <Badge variant="outline" className="ml-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs">
                                Major
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="font-semibold dark:text-gray-200">{pair.price}</TableCell>
                        <TableCell>
                          <span className={isPositive 
                            ? "text-emerald-600 dark:text-emerald-400 font-medium" 
                            : "text-red-600 dark:text-red-400 font-medium"}>
                            {isPositive ? "+" : ""}{pair.change}
                          </span>
                        </TableCell>
                        <TableCell>
                          {isPositive ? (
                            <Badge className="font-medium bg-emerald-100 hover:bg-emerald-200 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400 dark:hover:bg-emerald-900/40">
                              +{pair.changePercent}%
                            </Badge>
                          ) : (
                            <Badge variant="destructive" className="font-medium">
                              {pair.changePercent}%
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell className="hidden md:table-cell dark:text-gray-300">{pair.high24h}</TableCell>
                        <TableCell className="hidden md:table-cell dark:text-gray-300">{pair.low24h}</TableCell>
                        <TableCell className="hidden lg:table-cell dark:text-gray-300">{pair.volume}K</TableCell>
                        <TableCell className="hidden lg:table-cell dark:text-gray-300">{pair.spread}</TableCell>
                        <TableCell className="text-right">
                          <Link href={`/market/forex/trade?pair=${pair.pair.replace('/', '')}`}>
                            <Button size="sm" variant="outline" className="hover:bg-gray-100 dark:hover:bg-gray-700 dark:border-gray-600">
                              Trade
                            </Button>
                          </Link>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400 mt-4 text-center">
            Showing {filteredPairs.length} of {currencyPairs.length} currency pairs
          </div>
        </CardContent>
      </Card>
    </div>
  );
}