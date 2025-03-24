"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export function TrendingNFTs() {
  const [activeTab, setActiveTab] = React.useState('trending');
  const [imageErrors, setImageErrors] = React.useState<Record<string, boolean>>({});

  const handleImageError = (id: string) => {
    setImageErrors(prev => ({ ...prev, [id]: true }));
  };

  const trendingNFTs = [
    {
      id: "1",
      name: "Bored Ape #8745",
      collection: "Bored Ape Yacht Club",
      image: "https://images.unsplash.com/photo-1614680376739-414d95ff43df?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80",
      price: "74.5 ETH",
      change: "+12.4%",
      positive: true
    },
    {
      id: "2",
      name: "Azuki #4231",
      collection: "Azuki",
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80",
      price: "18.2 ETH",
      change: "+8.7%",
      positive: true
    },
    {
      id: "3",
      name: "Doodle #9876",
      collection: "Doodles",
      image: "https://images.unsplash.com/photo-1634986666676-ec8fd927c23d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80",
      price: "12.8 ETH",
      change: "-2.3%",
      positive: false
    },
    {
      id: "4",
      name: "CryptoPunk #3456",
      collection: "CryptoPunks",
      image: "https://images.unsplash.com/photo-1626162953675-544bf5a61ca6?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80",
      price: "68.9 ETH",
      change: "+5.1%",
      positive: true
    },
    {
      id: "5",
      name: "Clone X #2187",
      collection: "Clone X",
      image: "https://images.unsplash.com/photo-1578632767115-351597cf2477?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80",
      price: "14.3 ETH",
      change: "-1.8%",
      positive: false
    }
  ];

  const topSales = [
    {
      id: "6",
      name: "Fidenza #313",
      collection: "Art Blocks",
      image: "https://images.unsplash.com/photo-1618172193763-c511deb635ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80",
      price: "156.8 ETH",
      date: "2 hours ago"
    },
    {
      id: "7",
      name: "Mutant Ape #4578",
      collection: "Mutant Ape Yacht Club",
      image: "https://images.unsplash.com/photo-1618005198919-d3d4b5a23cba?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80",
      price: "45.2 ETH",
      date: "4 hours ago"
    },
    {
      id: "8",
      name: "Moonbird #2345",
      collection: "Moonbirds",
      image: "https://images.unsplash.com/photo-1578632292335-df3abbb0d586?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80",
      price: "32.7 ETH",
      date: "6 hours ago"
    },
    {
      id: "9",
      name: "World of Women #765",
      collection: "World of Women",
      image: "https://images.unsplash.com/photo-1638803040283-7a5ffd48dad5?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80",
      price: "18.9 ETH",
      date: "8 hours ago"
    },
    {
      id: "10",
      name: "Pudgy Penguin #1234",
      collection: "Pudgy Penguins",
      image: "https://images.unsplash.com/photo-1635322966219-b75ed372eb01?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80",
      price: "8.5 ETH",
      date: "12 hours ago"
    }
  ];

  const upcomingDrops = [
    {
      id: "11",
      name: "Quantum Artifacts",
      creator: "Digital Atelier",
      image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80",
      date: "Tomorrow, 3:00 PM UTC",
      price: "0.25 ETH"
    },
    {
      id: "12",
      name: "Neo Tokyo Citizens",
      creator: "CyberLabs",
      image: "https://images.unsplash.com/photo-1633265486501-b4d5c24f5a5a?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80",
      date: "Aug 15, 6:00 PM UTC",
      price: "0.5 ETH"
    },
    {
      id: "13",
      name: "Ethereal Landscapes",
      creator: "ArtificialDreams",
      image: "https://images.unsplash.com/photo-1618005198919-d3d4b5a23cba?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80",
      date: "Aug 18, 2:00 PM UTC",
      price: "0.15 ETH"
    },
    {
      id: "14",
      name: "Celestial Beings",
      creator: "Stargazer Collective",
      image: "https://images.unsplash.com/photo-1618172193622-ae2d025f4032?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80",
      date: "Aug 20, 8:00 PM UTC",
      price: "0.3 ETH"
    },
    {
      id: "15",
      name: "Digital Nomads",
      creator: "Wanderlust DAO",
      image: "https://images.unsplash.com/photo-1634986666676-ec8fd927c23d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80",
      date: "Aug 23, 4:00 PM UTC",
      price: "0.2 ETH"
    }
  ];

  return (
    <section className="mb-16">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold flex items-center text-black dark:text-white">
          <span className="bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300 p-2 rounded-lg mr-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
              />
            </svg>
          </span>
          NFT Spotlight
        </h2>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6">
        <button
          onClick={() => setActiveTab('trending')}
          className={`py-3 px-6 font-medium text-sm ${
            activeTab === 'trending'
              ? 'border-b-2 border-purple-500 text-purple-600 dark:text-purple-400'
              : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
          }`}
        >
          Trending NFTs
        </button>
        <button
          onClick={() => setActiveTab('sales')}
          className={`py-3 px-6 font-medium text-sm ${
            activeTab === 'sales'
              ? 'border-b-2 border-purple-500 text-purple-600 dark:text-purple-400'
              : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
          }`}
        >
          Top Sales
        </button>
        <button
          onClick={() => setActiveTab('drops')}
          className={`py-3 px-6 font-medium text-sm ${
            activeTab === 'drops'
              ? 'border-b-2 border-purple-500 text-purple-600 dark:text-purple-400'
              : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
          }`}
        >
          Upcoming Drops
        </button>
      </div>

      {/* Trending NFTs */}
      {activeTab === 'trending' && (
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {trendingNFTs.map((nft) => (
            <Link 
              key={nft.id} 
              href={`/market/nft/asset/${nft.id}`}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-shadow"
            >
              <div className="relative h-48 w-full">
                {!imageErrors[nft.id] ? (
                  <Image 
                    src={nft.image} 
                    alt={nft.name} 
                    fill 
                    className="object-cover"
                    onError={() => handleImageError(nft.id)}
                  />
                ) : (
                  <div className="w-full h-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                    <span className="text-purple-600 dark:text-purple-300 text-xl font-bold">
                      {nft.name.substring(0, 2)}
                    </span>
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-bold text-sm mb-1 text-black dark:text-white truncate">
                  {nft.name}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 truncate">
                  {nft.collection}
                </p>
                <div className="flex justify-between items-center">
                  <span className="font-medium text-black dark:text-white text-sm">
                    {nft.price}
                  </span>
                  <span className={`text-xs ${nft.positive ? 'text-green-500' : 'text-red-500'}`}>
                    {nft.change}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Top Sales */}
      {activeTab === 'sales' && (
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {topSales.map((sale) => (
            <Link 
              key={sale.id} 
              href={`/market/nft/asset/${sale.id}`}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-shadow"
            >
              <div className="relative h-48 w-full">
                {!imageErrors[sale.id] ? (
                  <Image 
                    src={sale.image} 
                    alt={sale.name} 
                    fill 
                    className="object-cover"
                    onError={() => handleImageError(sale.id)}
                  />
                ) : (
                  <div className="w-full h-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                    <span className="text-purple-600 dark:text-purple-300 text-xl font-bold">
                      {sale.name.substring(0, 2)}
                    </span>
                  </div>
                )}
                <div className="absolute top-0 right-0 bg-purple-500 text-white text-xs font-bold px-2 py-1 m-2 rounded">
                  SOLD
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-sm mb-1 text-black dark:text-white truncate">
                  {sale.name}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 truncate">
                  {sale.collection}
                </p>
                <div className="flex justify-between items-center">
                  <span className="font-medium text-black dark:text-white text-sm">
                    {sale.price}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {sale.date}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Upcoming Drops */}
      {activeTab === 'drops' && (
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {upcomingDrops.map((drop) => (
            <Link 
              key={drop.id} 
              href={`/market/nft/drops/${drop.id}`}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-shadow"
            >
              <div className="relative h-48 w-full">
                {!imageErrors[drop.id] ? (
                  <Image 
                    src={drop.image} 
                    alt={drop.name} 
                    fill 
                    className="object-cover"
                    onError={() => handleImageError(drop.id)}
                  />
                ) : (
                  <div className="w-full h-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                    <span className="text-purple-600 dark:text-purple-300 text-xl font-bold">
                      {drop.name.substring(0, 2)}
                    </span>
                  </div>
                )}
                <div className="absolute top-0 right-0 bg-indigo-500 text-white text-xs font-bold px-2 py-1 m-2 rounded">
                  UPCOMING
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-sm mb-1 text-black dark:text-white truncate">
                  {drop.name}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 truncate">
                  by {drop.creator}
                </p>
                <div className="flex flex-col space-y-1">
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {drop.date}
                  </span>
                  <span className="font-medium text-black dark:text-white text-sm">
                    {drop.price}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      <div className="mt-6 text-center">
        <Link
          href={`/market/nft/${activeTab === 'trending' ? 'trending' : activeTab === 'sales' ? 'sales' : 'drops'}`}
          className="inline-flex items-center text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300"
        >
          View all {activeTab === 'trending' ? 'trending NFTs' : activeTab === 'sales' ? 'top sales' : 'upcoming drops'}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 ml-1"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </Link>
      </div>
    </section>
  );
}