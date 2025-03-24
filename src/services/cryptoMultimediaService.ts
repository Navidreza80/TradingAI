"use server"

import { CryptoMultimedia } from '@/types/crypto';

export async function getMultimediaContent(limit: number = 4): Promise<CryptoMultimedia[]> {
  try {
    // In a real implementation, you would fetch from a content API or database
    // For now, we'll simulate a delay and return mock data
    await new Promise(resolve => setTimeout(resolve, 400));
    
    return getFallbackMultimediaContent(limit);
  } catch (error) {
    console.error('Error fetching multimedia content:', error);
    return getFallbackMultimediaContent(limit);
  }
}

function getFallbackMultimediaContent(limit: number): CryptoMultimedia[] {
  const fallbackContent = [
    {
      id: 1,
      title: "Understanding Bitcoin's Halving and Its Impact on Price",
      type: "video",
      thumbnail: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      duration: "18:24",
      author: "Crypto Academy"
    },
    {
      id: 2,
      title: "The Future of DeFi: Opportunities and Challenges",
      type: "podcast",
      thumbnail: "https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      duration: "42:15",
      author: "Blockchain Insights"
    },
    {
      id: 3,
      title: "How to Analyze Cryptocurrency Market Trends",
      type: "video",
      thumbnail: "https://images.unsplash.com/photo-1605792657660-596af9009e82?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      duration: "24:37",
      author: "Trading AI"
    },
    {
      id: 4,
      title: "NFTs Explained: From Digital Art to Gaming Assets",
      type: "video",
      thumbnail: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      duration: "15:52",
      author: "Crypto Academy"
    },
    {
      id: 5,
      title: "Interview with Ethereum Developer on ETH 2.0",
      type: "podcast",
      thumbnail: "https://images.unsplash.com/photo-1622630998477-20aa696ecb05?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      duration: "56:18",
      author: "Blockchain Insights"
    },
    {
      id: 6,
      title: "Crypto Security: Protecting Your Digital Assets",
      type: "video",
      thumbnail: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      duration: "21:09",
      author: "Trading AI"
    }
  ];
  
  return fallbackContent.slice(0, limit);
}