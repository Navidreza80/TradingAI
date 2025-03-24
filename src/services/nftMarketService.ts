"use server"

import { NFTCollection, NFTAsset } from '@/types/nft';

export async function getNFTCollections(limit: number = 6): Promise<NFTCollection[]> {
  try {
    // In a real app, you would fetch this from an API
    // For now, we'll return mock data
    return getFallbackNFTCollections(limit);
  } catch (error) {
    console.error('Error fetching NFT collections:', error);
    return getFallbackNFTCollections(limit);
  }
}

export async function getNFTAsset(id: string): Promise<NFTAsset | null> {
  try {
    // Mock implementation
    const assets = [
      {
        id: "1",
        name: "Bored Ape #8745",
        collection: "Bored Ape Yacht Club",
        collectionId: "bayc",
        description: "The Bored Ape Yacht Club is a collection of 10,000 unique Bored Ape NFTs— unique digital collectibles living on the Ethereum blockchain.",
        image: "https://images.unsplash.com/photo-1614680376739-414d95ff43df?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&h=1000&q=80",
        price: "74.5 ETH",
        priceUSD: "$134,100",
        owner: "0x1234...5678",
        creator: "Yuga Labs",
        tokenId: "8745",
        blockchain: "Ethereum",
        lastSale: "65.4 ETH",
        rarity: "Rare (Top 12%)",
        attributes: [
          { trait_type: "Background", value: "Blue", rarity: "12%" },
          { trait_type: "Fur", value: "Golden Brown", rarity: "5%" },
          { trait_type: "Eyes", value: "Bored", rarity: "8%" },
          { trait_type: "Mouth", value: "Bored Cigarette", rarity: "7%" },
          { trait_type: "Clothes", value: "Navy Striped Tee", rarity: "3%" }
        ]
      }
    ];
    
    return assets.find(asset => asset.id === id) || null;
  } catch (error) {
    console.error('Error fetching NFT asset:', error);
    return null;
  }
}

function getFallbackNFTCollections(limit: number): NFTCollection[] {
  const fallbackCollections = [
    {
      id: "bayc",
      name: "Bored Ape Yacht Club",
      creator: "Yuga Labs",
      floorPrice: "74.5",
      volume: "1,245",
      items: "10,000",
      change: "+12.4%",
      image: "https://images.unsplash.com/photo-1614680376739-414d95ff43df?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80",
      banner: "https://images.unsplash.com/photo-1578632292335-df3abbb0d586?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&h=300&q=80",
      category: "PFP",
      verified: true
    },
    {
      id: "azuki",
      name: "Azuki",
      creator: "Chiru Labs",
      floorPrice: "18.2",
      volume: "876",
      items: "10,000",
      change: "+8.7%",
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80",
      banner: "https://images.unsplash.com/photo-1618005198919-d3d4b5a23cba?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&h=300&q=80",
      category: "PFP",
      verified: true
    },
    {
      id: "doodles",
      name: "Doodles",
      creator: "Doodles",
      floorPrice: "12.8",
      volume: "432",
      items: "10,000",
      change: "-2.3%",
      image: "https://images.unsplash.com/photo-1634986666676-ec8fd927c23d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80",
      banner: "https://images.unsplash.com/photo-1633265486501-b4d5c24f5a5a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&h=300&q=80",
      category: "PFP",
      verified: true
    },
    {
      id: "cryptopunks",
      name: "CryptoPunks",
      creator: "Larva Labs",
      floorPrice: "68.9",
      volume: "987",
      items: "10,000",
      change: "+5.1%",
      image: "https://images.unsplash.com/photo-1626162953675-544bf5a61ca6?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80",
      banner: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&h=300&q=80",
      category: "PFP",
      verified: true
    },
    {
      id: "clonex",
      name: "Clone X",
      creator: "RTFKT",
      floorPrice: "14.3",
      volume: "543",
      items: "20,000",
      change: "-1.8%",
      image: "https://images.unsplash.com/photo-1578632767115-351597cf2477?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80",
      banner: "https://images.unsplash.com/photo-1618172193763-c511deb635ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&h=300&q=80",
      category: "PFP",
      verified: true
    },
    {
      id: "artblocks",
      name: "Art Blocks",
      creator: "Art Blocks",
      floorPrice: "2.5",
      volume: "1,876",
      items: "Various",
      change: "+15.7%",
      image: "https://images.unsplash.com/photo-1618172193622-ae2d025f4032?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80",
      banner: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&h=300&q=80",
      category: "Art",
      verified: true
    }
  ];
  
  return fallbackCollections.slice(0, limit);
}