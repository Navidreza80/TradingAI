"use client";

import { useState, useEffect } from "react";

// Expanded mock news data with more items
const mockNewsData = [
  // Existing items
  {
    id: 1,
    title: "Bitcoin Surges Past $60,000 as Institutional Adoption Grows",
    summary: "Bitcoin has reached new heights as major financial institutions continue to invest in cryptocurrency.",
    date: "2023-11-15",
    author: "Sarah Johnson",
    category: "Crypto",
    imageUrl: "https://placehold.co/600x400/png?text=Bitcoin+News"
  },
  {
    id: 2,
    title: "Fed Signals Potential Rate Cuts in Coming Months",
    summary: "The Federal Reserve has indicated it may begin easing monetary policy, impacting forex and equity markets.",
    date: "2023-11-14",
    author: "Michael Chen",
    category: "Forex",
    imageUrl: "https://placehold.co/600x400/png?text=Fed+News"
  },
  {
    id: 3,
    title: "Oil Prices Stabilize Following Middle East Tensions",
    summary: "Crude oil markets have found equilibrium after weeks of volatility due to geopolitical concerns.",
    date: "2023-11-13",
    author: "James Wilson",
    category: "Commodities",
    imageUrl: "https://placehold.co/600x400/png?text=Oil+News"
  },
  {
    id: 4,
    title: "Tech Stocks Rally on Strong Earnings Reports",
    summary: "Major technology companies exceeded quarterly expectations, driving a sector-wide rally in stock markets.",
    date: "2023-11-12",
    author: "Emily Rodriguez",
    category: "Stocks",
    imageUrl: "https://placehold.co/600x400/png?text=Tech+Stocks"
  },
  {
    id: 5,
    title: "New Regulations Proposed for Cryptocurrency Exchanges",
    summary: "Regulatory bodies are considering new frameworks to govern digital asset trading platforms.",
    date: "2023-11-11",
    author: "David Kim",
    category: "Crypto",
    imageUrl: "https://placehold.co/600x400/png?text=Crypto+Regulation"
  },
  // Additional news items
  {
    id: 6,
    title: "Gold Prices Hit 3-Month High Amid Inflation Concerns",
    summary: "Investors are turning to gold as a hedge against rising inflation, pushing prices to their highest level since August.",
    date: "2023-11-10",
    author: "Robert Chang",
    category: "Commodities",
    imageUrl: "https://placehold.co/600x400/png?text=Gold+News"
  },
  {
    id: 7,
    title: "European Markets React to ECB Policy Announcement",
    summary: "European stocks showed mixed reactions as the European Central Bank maintained its current monetary policy stance.",
    date: "2023-11-09",
    author: "Sophia Martinez",
    category: "Stocks",
    imageUrl: "https://placehold.co/600x400/png?text=ECB+News"
  },
  {
    id: 8,
    title: "Japanese Yen Weakens Against Dollar After BOJ Statement",
    summary: "The Japanese currency fell to a six-week low following the Bank of Japan's decision to maintain ultra-loose monetary policy.",
    date: "2023-11-08",
    author: "Takashi Yamamoto",
    category: "Forex",
    imageUrl: "https://placehold.co/600x400/png?text=Yen+News"
  },
  {
    id: 9,
    title: "Ethereum Completes Major Network Upgrade",
    summary: "The second-largest cryptocurrency by market cap has successfully implemented a significant protocol improvement.",
    date: "2023-11-07",
    author: "Alex Thompson",
    category: "Crypto",
    imageUrl: "https://placehold.co/600x400/png?text=Ethereum+News"
  },
  {
    id: 10,
    title: "Silver Outperforms Gold in Precious Metals Rally",
    summary: "Silver prices have surged more than gold on a percentage basis as industrial demand increases alongside investment interest.",
    date: "2023-11-06",
    author: "Maria Garcia",
    category: "Commodities",
    imageUrl: "https://placehold.co/600x400/png?text=Silver+News"
  },
  {
    id: 11,
    title: "Major Bank Announces Expansion of Crypto Trading Services",
    summary: "One of the world's largest financial institutions is broadening its cryptocurrency offerings to institutional clients.",
    date: "2023-11-05",
    author: "Jonathan Lee",
    category: "Crypto",
    imageUrl: "https://placehold.co/600x400/png?text=Bank+Crypto+News"
  },
  {
    id: 12,
    title: "Oil Producers Consider Output Adjustments Amid Price Volatility",
    summary: "Major oil-producing nations are discussing potential production changes to stabilize global crude oil markets.",
    date: "2023-11-04",
    author: "Ahmed Al-Farsi",
    category: "Commodities",
    imageUrl: "https://placehold.co/600x400/png?text=Oil+Production+News"
  }
];

export default function NewsMagazine() {
  const [news, setNews] = useState(mockNewsData);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isLoading, setIsLoading] = useState(false);
  const [viewMode, setViewMode] = useState("grid"); // "grid" or "list"
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [sortBy, setSortBy] = useState("date"); // "date", "title"
  const [sortOrder, setSortOrder] = useState("desc"); // "asc", "desc"

  // Categories for filtering
  const categories = ["All", "Crypto", "Forex", "Stocks", "Commodities"];

  // Sort news items
  const sortedNews = [...news].sort((a, b) => {
    if (sortBy === "date") {
      return sortOrder === "asc" 
        ? new Date(a.date).getTime() - new Date(b.date).getTime()
        : new Date(b.date).getTime() - new Date(a.date).getTime();
    } else if (sortBy === "title") {
      return sortOrder === "asc"
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title);
    }
    return 0;
  });

  // Filter news by category and search query
  const filteredNews = sortedNews.filter(item => {
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    const matchesSearch = searchQuery === "" || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.author.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredNews.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredNews.slice(indexOfFirstItem, indexOfLastItem);

  // Handle page change
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Toggle sort order
  const toggleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("desc");
    }
  };

  // In a real application, you would fetch news from an API
  useEffect(() => {
    // Simulate loading
    setIsLoading(true);
    
    // Simulate API call with timeout
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [selectedCategory, searchQuery, sortBy, sortOrder]);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchQuery, itemsPerPage, sortBy, sortOrder]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-white">
        Trading News Magazine
      </h1>
      
      {/* Search bar - centered with icon */}
      <div className="flex justify-center mb-6">
        <div className="relative w-full max-w-md">
          <input
            type="text"
            placeholder="Search news..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <svg 
            className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>
      
      {/* Sort and view controls - right aligned */}
      <div className="flex justify-between items-center mb-6">
        <div className="text-sm text-gray-400">
          Sort:
          <button
            onClick={() => toggleSort("date")}
            className={`ml-2 px-3 py-1 rounded text-xs font-medium ${sortBy === "date" ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-300"}`}
          >
            Date {sortBy === "date" && (sortOrder === "asc" ? "↑" : "↓")}
          </button>
          <button
            onClick={() => toggleSort("title")}
            className={`ml-2 px-3 py-1 rounded text-xs font-medium ${sortBy === "title" ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-300"}`}
          >
            Title {sortBy === "title" && (sortOrder === "asc" ? "↑" : "↓")}
          </button>
        </div>
        
        <div className="flex items-center">
          <span className="text-gray-300 text-sm mr-2">View:</span>
          <button
            onClick={() => setViewMode("grid")}
            className={`p-2 rounded ${viewMode === "grid" ? "bg-blue-600" : "bg-gray-700 hover:bg-gray-600"}`}
            aria-label="Grid view"
          >
            <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`ml-2 p-2 rounded ${viewMode === "list" ? "bg-blue-600" : "bg-gray-700 hover:bg-gray-600"}`}
            aria-label="List view"
          >
            <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Category filters - centered */}
      <div className="flex flex-wrap justify-center mb-8 gap-2">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
              ${selectedCategory === category 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-800 text-gray-200 hover:bg-gray-700'}`}
          >
            {category}
          </button>
        ))}
      </div>
      
      {/* Items per page and results count in one row */}
      <div className="flex justify-between items-center mb-4">
        <div className="text-sm text-gray-400">
          Showing {currentItems.length > 0 ? indexOfFirstItem + 1 : 0} to {Math.min(indexOfLastItem, filteredNews.length)} of {filteredNews.length} results
        </div>
        
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-300">Items per page:</span>
          <select 
            value={itemsPerPage} 
            onChange={(e) => setItemsPerPage(Number(e.target.value))}
            className="bg-gray-800 text-white border border-gray-700 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value={3}>3</option>
            <option value={6}>6</option>
            <option value={9}>9</option>
            <option value={12}>12</option>
          </select>
        </div>
      </div>
      
      {/* News content remains the same */}
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <>
          {/* Remove this duplicate results count div */}
          
          {/* Grid View */}
          {viewMode === "grid" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentItems.map(item => (
                <div 
                  key={item.id} 
                  className="bg-gray-900 rounded-lg overflow-hidden shadow-lg h-[400px] flex flex-col"
                >
                  <div className="h-36 overflow-hidden">
                    <img 
                      src={item.imageUrl} 
                      alt={item.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4 flex-grow flex flex-col">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-white bg-blue-600">
                        {item.category}
                      </span>
                      <span className="text-xs text-gray-400">
                        {item.date}
                      </span>
                    </div>
                    <h2 className="text-lg font-bold mb-2 text-white line-clamp-2">
                      {item.title}
                    </h2>
                    <p className="text-gray-300 text-sm mb-3 line-clamp-3 flex-grow">
                      {item.summary}
                    </p>
                    <div className="flex items-center mt-auto">
                      <p className="text-xs text-gray-400">
                        By {item.author}
                      </p>
                    </div>
                    <button className="mt-3 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-1.5 px-4 rounded text-sm transition-colors">
                      Read More
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {/* List View */}
          {viewMode === "list" && (
            <div className="space-y-4">
              {currentItems.map(item => (
                <div 
                  key={item.id} 
                  className="bg-gray-900 rounded-lg overflow-hidden shadow-lg flex flex-col md:flex-row"
                >
                  <div className="md:w-1/4 h-48 md:h-auto overflow-hidden">
                    <img 
                      src={item.imageUrl} 
                      alt={item.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-5 md:w-3/4 flex flex-col">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-white bg-blue-600">
                        {item.category}
                      </span>
                      <span className="text-xs text-gray-400">
                        {item.date}
                      </span>
                    </div>
                    <h2 className="text-xl font-bold mb-2 text-white">
                      {item.title}
                    </h2>
                    <p className="text-gray-300 mb-4 flex-grow">
                      {item.summary}
                    </p>
                    <div className="flex items-center justify-between mt-auto">
                      <p className="text-sm text-gray-400">
                        By {item.author}
                      </p>
                      <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-1.5 px-4 rounded text-sm transition-colors">
                        Read More
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-8">
              <nav className="flex items-center space-x-1">
                <button
                  onClick={() => paginate(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className={`px-3 py-1 rounded ${currentPage === 1 ? 'bg-gray-800 text-gray-500 cursor-not-allowed' : 'bg-gray-800 text-white hover:bg-gray-700'}`}
                >
                  &laquo;
                </button>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
                  <button
                    key={number}
                    onClick={() => paginate(number)}
                    className={`px-3 py-1 rounded ${currentPage === number ? 'bg-blue-600 text-white' : 'bg-gray-800 text-white hover:bg-gray-700'}`}
                  >
                    {number}
                  </button>
                ))}
                
                <button
                  onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className={`px-3 py-1 rounded ${currentPage === totalPages ? 'bg-gray-800 text-gray-500 cursor-not-allowed' : 'bg-gray-800 text-white hover:bg-gray-700'}`}
                >
                  &raquo;
                </button>
              </nav>
            </div>
          )}
        </>
      )}
      
      {filteredNews.length === 0 && !isLoading && (
        <div className="text-center py-12 bg-gray-900 rounded-lg">
          <p className="text-xl text-gray-300">
            No news articles found. Try adjusting your search or category filter.
          </p>
        </div>
      )}
    </div>
  );
}