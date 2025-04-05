"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/UI/card";
import { Input } from "@/components/UI/input";
import { Button } from "@/components/UI/Button";
import { Badge } from "@/components/UI/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/UI/tabs";
import { Skeleton } from "@/components/UI/skeleton";
import { Search, Play, Bookmark, Share2, Clock, Star, TrendingUp, Eye } from "lucide-react";
import { motion } from "framer-motion";

// Mock data for videos
const mockVideos = [
  {
    id: 1,
    title: "Understanding Market Cycles",
    creator: "Trading Academy",
    description: "Learn how to identify different market cycles and adjust your trading strategy accordingly.",
    categories: ["Market Analysis", "Trading Strategy", "Technical Analysis"],
    thumbnailUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dHJhZGluZyUyMGNoYXJ0fGVufDB8fDB8fHww",
    duration: "18:45",
    views: 245000,
    rating: 4.8,
    trending: true,
  },
  {
    id: 2,
    title: "Candlestick Patterns Masterclass",
    creator: "Chart Masters",
    description: "A comprehensive guide to reading and interpreting candlestick patterns for better trading decisions.",
    categories: ["Technical Analysis", "Candlestick Patterns", "Trading"],
    thumbnailUrl: "https://images.unsplash.com/photo-1535320903710-d993d3d77d29?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHRyYWRpbmd8ZW58MHx8MHx8fDA%3D",
    duration: "32:10",
    views: 189000,
    rating: 4.7,
    trending: true,
  },
  {
    id: 3,
    title: "Bitcoin: The Future of Finance",
    creator: "Crypto Insights",
    description: "An in-depth analysis of Bitcoin's role in the future financial landscape and its investment potential.",
    categories: ["Cryptocurrency", "Bitcoin", "Investment"],
    thumbnailUrl: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y3J5cHRvfGVufDB8fDB8fHww",
    duration: "24:30",
    views: 320000,
    rating: 4.6,
    trending: false,
  },
  {
    id: 4,
    title: "Risk Management Essentials",
    creator: "Smart Trader",
    description: "Learn the fundamentals of risk management to protect your capital and maximize your trading profits.",
    categories: ["Risk Management", "Trading Psychology", "Capital Preservation"],
    thumbnailUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHJpc2t8ZW58MHx8MHx8fDA%3D",
    duration: "15:20",
    views: 178000,
    rating: 4.9,
    trending: false,
  },
  {
    id: 5,
    title: "Global Economic Outlook 2023",
    creator: "Economic Insights",
    description: "Expert analysis of global economic trends and their potential impact on financial markets.",
    categories: ["Economics", "Global Markets", "Market Analysis"],
    thumbnailUrl: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZWNvbm9taWNzfGVufDB8fDB8fHww",
    duration: "28:15",
    views: 215000,
    rating: 4.5,
    trending: true,
  },
  {
    id: 6,
    title: "Options Trading for Beginners",
    creator: "Options Academy",
    description: "A beginner-friendly guide to understanding and trading options in any market condition.",
    categories: ["Options", "Derivatives", "Beginner"],
    thumbnailUrl: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHRyYWRpbmd8ZW58MHx8MHx8fDA%3D",
    duration: "42:30",
    views: 290000,
    rating: 4.7,
    trending: false,
  },
  {
    id: 7,
    title: "Algorithmic Trading Explained",
    creator: "Tech Traders",
    description: "Discover how algorithmic trading works and how it's changing the landscape of financial markets.",
    categories: ["Algorithmic Trading", "Technology", "Automation"],
    thumbnailUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZmludGVjaHxlbnwwfHwwfHx8MA%3D%3D",
    duration: "22:45",
    views: 165000,
    rating: 4.6,
    trending: true,
  },
  {
    id: 8,
    title: "Gold and Silver: Safe Haven Assets",
    creator: "Commodity Experts",
    description: "Learn why precious metals are considered safe haven assets and how to incorporate them in your portfolio.",
    categories: ["Commodities", "Precious Metals", "Portfolio Diversification"],
    thumbnailUrl: "https://images.unsplash.com/photo-1610375461246-83df859d849d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z29sZHxlbnwwfHwwfHx8MA%3D",
    duration: "19:50",
    views: 142000,
    rating: 4.4,
    trending: false,
  },
];

// Mock function to simulate AI recommendation
const getRelatedVideos = (query: string, allVideos: any[]) => {
  // In a real implementation, this would call an AI model API
  if (!query) return allVideos;
  
  const lowerQuery = query.toLowerCase();
  return allVideos.filter(video => 
    video.title.toLowerCase().includes(lowerQuery) ||
    video.description.toLowerCase().includes(lowerQuery) ||
    video.creator.toLowerCase().includes(lowerQuery) ||
    video.categories.some((cat: string) => cat.toLowerCase().includes(lowerQuery))
  );
};

// Format view count with K, M, etc.
const formatViewCount = (count: number): string => {
  if (count >= 1000000) {
    return (count / 1000000).toFixed(1) + 'M';
  } else if (count >= 1000) {
    return (count / 1000).toFixed(1) + 'K';
  }
  return count.toString();
};

export default function VideosPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [videos, setVideos] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setVideos(mockVideos);
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Filter videos based on search query and active tab
  const filteredVideos = getRelatedVideos(searchQuery, videos).filter(video => {
    if (activeTab === "all") return true;
    if (activeTab === "trending") return video.trending;
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
        Trading Videos
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
            placeholder="Search for videos by topic, creator, or keyword..."
            className="pl-10 py-6 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 rounded-xl"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 text-center">
          Our AI will find the most relevant trading videos based on your interests
        </p>
      </motion.div>

      <Tabs defaultValue="all" className="mb-8" onValueChange={setActiveTab}>
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
          <TabsTrigger value="all" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white dark:data-[state=active]:bg-blue-600">
            All Videos
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
            ) : filteredVideos.length > 0 ? (
              filteredVideos.map((video) => (
                <motion.div
                  key={video.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <Card className="overflow-hidden h-full bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300">
                    <div className="relative h-48 overflow-hidden group">
                      <img 
                        src={video.thumbnailUrl} 
                        alt={video.title} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      {video.trending && (
                        <div className="absolute top-2 right-2">
                          <Badge className="bg-gradient-to-r from-orange-500 to-red-500">
                            <TrendingUp className="w-3 h-3 mr-1" /> Trending
                          </Badge>
                        </div>
                      )}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/50">
                        <Button className="bg-blue-500/90 hover:bg-blue-600 rounded-full h-14 w-14 flex items-center justify-center">
                          <Play className="h-6 w-6" />
                        </Button>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                        <div className="flex items-center text-white">
                          <Clock className="w-4 h-4 mr-1" />
                          <span className="text-sm">{video.duration}</span>
                          <div className="ml-auto flex items-center">
                            <Eye className="w-4 h-4 mr-1" />
                            <span className="text-sm">{formatViewCount(video.views)} views</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <CardHeader className="pb-2">
                      <CardTitle className="line-clamp-1">{video.title}</CardTitle>
                      <CardDescription className="text-gray-500 dark:text-gray-400">
                        By {video.creator}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3 mb-3">
                        {video.description}
                      </p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {video.categories.map((category: string, idx: number) => (
                          <Badge key={idx} variant="outline" className="bg-blue-50 dark:bg-gray-700 text-blue-600 dark:text-blue-300 border-blue-200 dark:border-gray-600">
                            {category}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700">
                        <Play className="w-4 h-4 mr-2" /> Watch Now
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
                <h3 className="text-xl font-semibold mb-2">No videos found</h3>
                <p className="text-gray-500 dark:text-gray-400 text-center max-w-md">
                  We couldn't find any videos matching your search. Try different keywords or browse our trending videos.
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
            ) : filteredVideos.length > 0 ? (
              // Same card rendering as above
              filteredVideos.map((video) => (
                <motion.div
                  key={video.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <Card className="overflow-hidden h-full bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300">
                    <div className="relative h-48 overflow-hidden group">
                      <img 
                        src={video.thumbnailUrl} 
                        alt={video.title} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute top-2 right-2">
                        <Badge className="bg-gradient-to-r from-orange-500 to-red-500">
                          <TrendingUp className="w-3 h-3 mr-1" /> Trending
                        </Badge>
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/50">
                        <Button className="bg-blue-500/90 hover:bg-blue-600 rounded-full h-14 w-14 flex items-center justify-center">
                          <Play className="h-6 w-6" />
                        </Button>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                        <div className="flex items-center text-white">
                          <Clock className="w-4 h-4 mr-1" />
                          <span className="text-sm">{video.duration}</span>
                          <div className="ml-auto flex items-center">
                            <Eye className="w-4 h-4 mr-1" />
                            <span className="text-sm">{formatViewCount(video.views)} views</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <CardHeader className="pb-2">
                      <CardTitle className="line-clamp-1">{video.title}</CardTitle>
                      <CardDescription className="text-gray-500 dark:text-gray-400">
                        By {video.creator}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3 mb-3">
                        {video.description}
                      </p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {video.categories.map((category: string, idx: number) => (
                          <Badge key={idx} variant="outline" className="bg-blue-50 dark:bg-gray-700 text-blue-600 dark:text-blue-300 border-blue-200 dark:border-gray-600">
                            {category}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700">
                        <Play className="w-4 h-4 mr-2" /> Watch Now
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
                <h3 className="text-xl font-semibold mb-2">No trending videos found</h3>
                <p className="text-gray-500 dark:text-gray-400 text-center max-w-md">
                  We couldn't find any trending videos matching your search. Try different keywords or browse all videos.
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
        <h2 className="text-2xl font-bold mb-4">How Our AI Finds Videos For You</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-4">
              <Search className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="font-semibold mb-2">Content Analysis</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Our AI analyzes video content and metadata to understand the topics and trading concepts covered.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-4">
              <TrendingUp className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="font-semibold mb-2">Popularity Metrics</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              We track view counts, engagement, and sharing patterns to identify the most valuable trading videos.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-4">
              <Star className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="font-semibold mb-2">Personalized Recommendations</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Based on your interests and search history, we recommend videos that match your trading style and goals.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}