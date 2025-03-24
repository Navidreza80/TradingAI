"use server"

import { NFTNews } from '@/types/nft';

export async function getNFTNews(limit: number = 3): Promise<NFTNews[]> {
  try {
    // In a real app, you would fetch this from a news API
    // For now, we'll return mock data
    return getFallbackNews(limit);
  } catch (error) {
    console.error('Error fetching NFT news:', error);
    return getFallbackNews(limit);
  }
}

function getFallbackNews(limit: number): NFTNews[] {
  const fallbackNews = [
    {
      id: 1,
      title: "Yuga Labs Announces New Metaverse Project for Bored Ape Holders",
      image: "https://images.unsplash.com/photo-1614680376739-414d95ff43df?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      date: new Date().toISOString(),
      category: "Metaverse",
      excerpt: "Yuga Labs, the creator of Bored Ape Yacht Club, has announced a new metaverse project exclusively for BAYC and MAYC holders, promising unprecedented utility and experiences.",
    },
    {
      id: 2,
      title: "Record-Breaking $69.3 Million NFT Sale at Christie's Auction",
      image: "https://images.unsplash.com/photo-1618172193622-ae2d025f4032?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      date: new Date(Date.now() - 86400000).toISOString(),
      category: "Art",
      excerpt: "A digital artwork by artist Beeple has sold for a record-breaking $69.3 million at Christie's auction house, marking a significant milestone for NFT art in traditional auction spaces.",
    },
    {
      id: 3,
      title: "Major Gaming Studio Integrates NFTs Into Popular Franchise",
      image: "https://images.unsplash.com/photo-1633265486501-b4d5c24f5a5a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      date: new Date(Date.now() - 172800000).toISOString(),
      category: "Gaming",
      excerpt: "A leading gaming studio has announced plans to integrate NFTs into one of its most popular franchises, allowing players to own, trade, and monetize in-game assets on the blockchain.",
    },
    {
      id: 4,
      title: "NFT Marketplace OpenSea Raises $300 Million at $13.3 Billion Valuation",
      image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      date: new Date(Date.now() - 259200000).toISOString(),
      category: "Business",
      excerpt: "NFT marketplace OpenSea has secured $300 million in Series C funding, reaching a valuation of $13.3 billion as the platform continues to dominate the NFT trading space.",
    },
    {
      id: 5,
      title: "Celebrities Launch Exclusive NFT Collections for Charity",
      image: "https://images.unsplash.com/photo-1618005198919-d3d4b5a23cba?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      date: new Date(Date.now() - 345600000).toISOString(),
      category: "Entertainment",
      excerpt: "A group of A-list celebrities has collaborated to launch exclusive NFT collections, with proceeds going to various charitable causes, combining digital art with philanthropy.",
    },
  ];
  
  return fallbackNews.slice(0, limit);
}