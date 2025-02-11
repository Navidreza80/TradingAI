'use client'

import ProfileCard from "@/components/dashboard/profile-dashboard";

const staticUser = {
  name: "Sarah Johnson",
  email: "sarah.j@tradingai.com",
  role: "Professional Crypto Trader",
  profilePicture: "/image/8b167af653c2399dd93b952a48740620.jpg",
  coverImage: "/image/trade.png",
  bio: "Professional crypto trader with 5+ years of experience. Specialized in technical analysis and algorithmic trading.",
  location: "Singapore",
  joinDate: new Date("2021-06-15"),
  tradingStyle: "Swing Trading",
  winRate: 76.5,
  totalTrades: 1247,
  profitLoss: 324.5,
  
  // Blogs liked by user
  blogsLiked: [
    {
      id: "1",
      title: "Understanding Bitcoin Halving and Its Impact on Price",
      excerpt: "A comprehensive analysis of how Bitcoin halving events historically affect cryptocurrency markets...",
      date: new Date("2024-02-15"),
      readTime: 8,
      likes: 1240
    },
    {
      id: "2",
      title: "Technical Analysis: Advanced Pattern Recognition",
      excerpt: "Learn how to identify and trade complex chart patterns for better trading decisions...",
      date: new Date("2024-02-10"),
      readTime: 12,
      likes: 890
    },
    {
      id: "3",
      title: "Risk Management Strategies for Crypto Trading",
      excerpt: "Essential risk management techniques every crypto trader should know and implement...",
      date: new Date("2024-02-05"),
      readTime: 10,
      likes: 756
    }
  ],

  // Comments posted by user
  commentsPosted: [
    {
      id: "1",
      content: "Great analysis! This helped me understand the impact of halving on Bitcoin price.",
      date: new Date("2024-03-15"),
      blogTitle: "Bitcoin Halving Analysis"
    },
    {
      id: "2",
      content: "The risk management strategies mentioned here are crucial for long-term success.",
      date: new Date("2024-03-10"),
      blogTitle: "Risk Management in Trading"
    }
  ],

  // Blogs shared by user
  blogsShared: [
    {
      id: "1",
      title: "DeFi Trading Strategies for 2024",
      excerpt: "Exploring the most effective trading strategies in decentralized finance...",
      date: new Date("2024-01-20"),
      readTime: 15,
      likes: 945
    },
    {
      id: "2",
      title: "AI in Cryptocurrency Trading",
      excerpt: "How artificial intelligence is revolutionizing crypto trading strategies...",
      date: new Date("2024-01-15"),
      readTime: 10,
      likes: 1120
    }
  ],

  // Trading suggestions shared by user
  tradingSuggestions: [
    {
      id: "1",
      pair: "BTC/USDT",
      type: "LONG",
      entry: 52000,
      target: 55000,
      stopLoss: 50000,
      date: new Date("2024-03-01"),
      status: "WIN"
    },
    {
      id: "2",
      pair: "ETH/USDT",
      type: "SHORT",
      entry: 3200,
      target: 3000,
      stopLoss: 3300,
      date: new Date("2024-02-28"),
      status: "PENDING"
    }
  ],

  // Courses completed by user
  coursesPassed: [
    {
      id: "1",
      title: "Advanced Technical Analysis",
      provider: "TradingAI Academy",
      completionDate: new Date("2023-12-15"),
      certificate: "cert_link_1"
    },
    {
      id: "2",
      title: "Risk Management Mastery",
      provider: "TradingAI Academy",
      completionDate: new Date("2023-11-20"),
      certificate: "cert_link_2"
    },
    {
      id: "3",
      title: "Algorithmic Trading Fundamentals",
      provider: "TradingAI Academy",
      completionDate: new Date("2023-10-10"),
      certificate: "cert_link_3"
    }
  ],

  // Social media links
  social: {
    github: "https://github.com/sarahj",
    twitter: "https://twitter.com/sarahj_trader",
    linkedin: "https://linkedin.com/in/sarahj"
  }
};

export default function UserProfilePage() {
  return <ProfileCard user={staticUser} />;
}
