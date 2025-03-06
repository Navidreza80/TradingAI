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
