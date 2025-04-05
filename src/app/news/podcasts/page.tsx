"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/UI/card";
import { Input } from "@/components/UI/input";
import { Button } from "@/components/UI/Button";
import { Badge } from "@/components/UI/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/UI/tabs";
import { Skeleton } from "@/components/UI/skeleton";
import { Search, Play, Bookmark, Share2, Clock, Star, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

// Mock data for podcasts
const mockPodcasts = [
  {
    id: 1,
    title: "The Intelligent Investor Podcast",
    host: "Benjamin Graham",
    description: "Deep insights into value investing strategies and market analysis.",
    categories: ["Investing", "Stock Market", "Value Investing"],
    imageUrl: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aW52ZXN0aW5nfGVufDB8fDB8fHww",
    duration: "45 min",
    rating: 4.8,
    trending: true,
  },
  {
    id: 2,
    title: "Market Movers",
    host: "Sarah Johnson",
    description: "Daily updates on market movements and what's driving them.",
    categories: ["Market Analysis", "Daily Updates", "Trading"],
    imageUrl: "https://images.unsplash.com/photo-1535320903710-d993d3d77d29?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHRyYWRpbmd8ZW58MHx8MHx8fDA%3D",
    duration: "30 min",
    rating: 4.5,
    trending: true,
  },
  {
    id: 3,
    title: "Crypto Conversations",
    host: "Alex Chen",
    description: "Exploring the world of cryptocurrencies, blockchain technology, and digital assets.",
    categories: ["Cryptocurrency", "Blockchain", "Digital Assets"],
    imageUrl: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y3J5cHRvfGVufDB8fDB8fHww",
    duration: "60 min",
    rating: 4.7,
    trending: false,
  },
  {
    id: 4,
    title: "Technical Analysis Today",
    host: "Michael Roberts",
    description: "Learn how to read charts and use technical indicators for better trading decisions.",
    categories: ["Technical Analysis", "Charts", "Trading Strategies"],
    imageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dHJhZGluZyUyMGNoYXJ0fGVufDB8fDB8fHww",
    duration: "50 min",
    rating: 4.6,
    trending: false,
  },
  {
    id: 5,
    title: "Macro Economic Perspectives",
    host: "Dr. Emily Wilson",
    description: "Analysis of global economic trends and their impact on financial markets.",
    categories: ["Economics", "Global Markets", "Macroeconomics"],
    imageUrl: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZWNvbm9taWNzfGVufDB8fDB8fHww",
    duration: "55 min",
    rating: 4.9,
    trending: true,
  },
  {
    id: 6,
    title: "Options Trading Mastery",
    host: "David Thompson",
    description: "Strategies and insights for successful options trading in any market condition.",
    categories: ["Options", "Derivatives", "Trading Strategies"],
    imageUrl: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHRyYWRpbmd8ZW58MHx8MHx8fDA%3D",
    duration: "40 min",
    rating: 4.7,
    trending: false,
  },
  {
    id: 7,
    title: "Fintech Frontiers",
    host: "Lisa Park",
    description: "Exploring innovations in financial technology and their impact on trading and investing.",
    categories: ["Fintech", "Innovation", "Digital Finance"],
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZmludGVjaHxlbnwwfHwwfHx8MA%3D%3D",
    duration: "35 min",
    rating: 4.5,
    trending: true,
  },
  {
    id: 8,
    title: "Commodity Corner",
    host: "Robert Miller",
    description: "Insights into commodity markets, trends, and trading opportunities.",
    categories: ["Commodities", "Natural Resources", "Trading"],
    imageUrl: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGNvbW1vZGl0aWVzfGVufDB8fDB8fHww",
    duration: "45 min",
    rating: 4.6,
    trending: false,
  },
];

// Mock function to simulate AI recommendation
const getRelatedPodcasts = (query: string, allPodcasts: any[]) => {
  // In a real implementation, this would call an AI model API
  if (!query) return allPodcasts;
  
  const lowerQuery = query.toLowerCase();
  return allPodcasts.filter(podcast => 
    podcast.title.toLowerCase().includes(lowerQuery) ||
    podcast.description.toLowerCase().includes(lowerQuery) ||
    podcast.host.toLowerCase().includes(lowerQuery) ||
    podcast.categories.some((cat: string) => cat.toLowerCase().includes(lowerQuery))
  );
};

export default function PodcastsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [podcasts, setPodcasts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setPodcasts(mockPodcasts);
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Filter podcasts based on search query and active tab
  const filteredPodcasts = getRelatedPodcasts(searchQuery, podcasts).filter(podcast => {
    if (activeTab === "all") return true;
    if (activeTab === "trending") return podcast.trending;
    return false;
  });

  return (
    <div className="container mx-auto px-4 pt-24 bg-blue-50 dark:bg-gradient-to-b dark:from-gray-950 dark:to-black text-gray-900 dark:text-white min-h-screen">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-5xl md:text-6xl font-bold mb-8 text-center text-gray-900 dark:text-white"
      >
        Trading Podcasts
      </motion.h1>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mb-8 max-w-3xl mx-auto"
      >
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
          <Input
            type="text"
            placeholder="Search for podcasts by topic, host, or keyword..."
            className="pl-10 py-6 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 rounded-xl"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 text-center">
          Our AI will find the most relevant trading podcasts based on your interests
        </p>
      </motion.div>

      <Tabs defaultValue="all" className="mb-8" onValueChange={setActiveTab}>
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
          <TabsTrigger value="all" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white dark:data-[state=active]:bg-blue-600">
            All Podcasts
          </TabsTrigger>
          <TabsTrigger value="trending" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white dark:data-[state=active]:bg-blue-600">
            <TrendingUp className="w-4 h-4 mr-2" />
            Trending
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {isLoading ? (
              // Loading skeletons
              Array(8).fill(0).map((_, index) => (
                <Card key={index} className="overflow-hidden h-[400px] bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm">
                  <Skeleton className="h-48 w-full rounded-t-lg" />
                  <CardHeader className="pb-2">
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-1/2" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-2/3" />
                  </CardContent>
                  <CardFooter>
                    <Skeleton className="h-10 w-full rounded-md" />
                  </CardFooter>
                </Card>
              ))
            ) : filteredPodcasts.length > 0 ? (
              filteredPodcasts.map((podcast) => (
                <motion.div
                  key={podcast.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <Card className="overflow-hidden h-full bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300">
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={podcast.imageUrl} 
                        alt={podcast.title} 
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      />
                      {podcast.trending && (
                        <div className="absolute top-2 right-2">
                          <Badge className="bg-gradient-to-r from-orange-500 to-red-500">
                            <TrendingUp className="w-3 h-3 mr-1" /> Trending
                          </Badge>
                        </div>
                      )}
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                        <div className="flex items-center text-white">
                          <Clock className="w-4 h-4 mr-1" />
                          <span className="text-sm">{podcast.duration}</span>
                          <div className="ml-auto flex items-center">
                            <Star className="w-4 h-4 text-yellow-400 mr-1" />
                            <span>{podcast.rating}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <CardHeader className="pb-2">
                      <CardTitle className="line-clamp-1">{podcast.title}</CardTitle>
                      <CardDescription className="text-gray-500 dark:text-gray-400">
                        Hosted by {podcast.host}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3 mb-3">
                        {podcast.description}
                      </p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {podcast.categories.map((category: string, idx: number) => (
                          <Badge key={idx} variant="outline" className="bg-blue-50 dark:bg-gray-700 text-blue-600 dark:text-blue-300 border-blue-200 dark:border-gray-600">
                            {category}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700">
                        <Play className="w-4 h-4 mr-2" /> Listen Now
                      </Button>
                      <div className="flex space-x-2">
                        <Button size="icon" variant="outline" className="rounded-full">
                          <Bookmark className="w-4 h-4" />
                        </Button>
                        <Button size="icon" variant="outline" className="rounded-full">
                          <Share2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold mb-2">No podcasts found</h3>
                <p className="text-gray-500 dark:text-gray-400 text-center max-w-md">
                  We couldn't find any podcasts matching your search. Try different keywords or browse our trending podcasts.
                </p>
                <Button 
                  className="mt-4 bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
                  onClick={() => setSearchQuery("")}
                >
                  Clear Search
                </Button>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="trending" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {isLoading ? (
              // Loading skeletons (same as above)
              Array(4).fill(0).map((_, index) => (
                <Card key={index} className="overflow-hidden h-[400px] bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm">
                  <Skeleton className="h-48 w-full rounded-t-lg" />
                  <CardHeader className="pb-2">
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-1/2" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-2/3" />
                  </CardContent>
                  <CardFooter>
                    <Skeleton className="h-10 w-full rounded-md" />
                  </CardFooter>
                </Card>
              ))
            ) : filteredPodcasts.length > 0 ? (
              // Same card rendering as above
              filteredPodcasts.map((podcast) => (
                <motion.div
                  key={podcast.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <Card className="overflow-hidden h-full bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300">
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={podcast.imageUrl} 
                        alt={podcast.title} 
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      />
                      <div className="absolute top-2 right-2">
                        <Badge className="bg-gradient-to-r from-orange-500 to-red-500">
                          <TrendingUp className="w-3 h-3 mr-1" /> Trending
                        </Badge>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                        <div className="flex items-center text-white">
                          <Clock className="w-4 h-4 mr-1" />
                          <span className="text-sm">{podcast.duration}</span>
                          <div className="ml-auto flex items-center">
                            <Star className="w-4 h-4 text-yellow-400 mr-1" />
                            <span>{podcast.rating}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <CardHeader className="pb-2">
                      <CardTitle className="line-clamp-1">{podcast.title}</CardTitle>
                      <CardDescription className="text-gray-500 dark:text-gray-400">
                        Hosted by {podcast.host}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3 mb-3">
                        {podcast.description}
                      </p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {podcast.categories.map((category: string, idx: number) => (
                          <Badge key={idx} variant="outline" className="bg-blue-50 dark:bg-gray-700 text-blue-600 dark:text-blue-300 border-blue-200 dark:border-gray-600">
                            {category}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700">
                        <Play className="w-4 h-4 mr-2" /> Listen Now
                      </Button>
                      <div className="flex space-x-2">
                        <Button size="icon" variant="outline" className="rounded-full">
                          <Bookmark className="w-4 h-4" />
                        </Button>
                        <Button size="icon" variant="outline" className="rounded-full">
                          <Share2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold mb-2">No trending podcasts found</h3>
                <p className="text-gray-500 dark:text-gray-400 text-center max-w-md">
                  We couldn't find any trending podcasts matching your search. Try different keywords or browse all podcasts.
                </p>
                <Button 
                  className="mt-4 bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
                  onClick={() => setSearchQuery("")}
                >
                  Clear Search
                </Button>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-12 bg-white/90 dark:bg-gray-800/70 rounded-xl p-6 max-w-4xl mx-auto backdrop-blur-sm">
        <h2 className="text-2xl font-bold mb-4">How Our AI Finds Podcasts For You</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-4">
              <Search className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="font-semibold mb-2">Intelligent Search</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Our AI analyzes your search terms to understand your interests and trading focus.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-4">
              <TrendingUp className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="font-semibold mb-2">Trend Analysis</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              We identify trending topics in the trading world and match them to relevant podcasts.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-4">
              <Star className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="font-semibold mb-2">Quality Rating</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Podcasts are ranked based on content quality, listener ratings, and relevance to your interests.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}