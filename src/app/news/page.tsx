"use client";

import { Button } from "@/components/UI/Button";
import { motion } from "framer-motion";
import { ArrowRight, Bitcoin, DollarSign, TrendingUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function NewsCategories() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const categories = [
    {
      id: "forex",
      title: "Forex News",
      description: "Stay updated with the latest foreign exchange market news, trends, and analysis.",
      icon: <DollarSign className="h-8 w-8" />,
      image: "/images/forex-news.jpg",
      color: "from-blue-500 to-cyan-400",
      link: "/news/forex"
    },
    {
      id: "stocks",
      title: "Stock Market News",
      description: "Get the latest stock market news, company updates, and market analysis.",
      icon: <TrendingUp className="h-8 w-8" />,
      image: "/images/stock-news.jpg",
      color: "from-green-500 to-emerald-400",
      link: "/news/stocks"
    },
    {
      id: "crypto",
      title: "Cryptocurrency News",
      description: "Follow the latest cryptocurrency news, blockchain updates, and digital asset trends.",
      icon: <Bitcoin className="h-8 w-8 text-orange-500" />,
      image: "/images/crypto-news.jpg",
      color: "from-orange-500 to-amber-400",
      link: "/news/crypto"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-24">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            Market News Center
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Select a category to explore the latest news and insights from financial markets around the world.
          </p>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {categories.map((category) => (
            <motion.div 
              key={category.id}
              variants={itemVariants}
              onMouseEnter={() => setHoveredCard(category.id)}
              onMouseLeave={() => setHoveredCard(null)}
              className="relative overflow-hidden rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 group"
            >
              <div className="absolute inset-0 z-0 opacity-20 dark:opacity-30">
                <Image
                  src={category.image}
                  alt={category.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-80 dark:opacity-90 z-10`}></div>
              
              <div className="relative z-20 p-8 flex flex-col h-full">
                <div className="bg-white/90 dark:bg-gray-800/90 rounded-full p-3 w-fit mb-6">
                  <div className={`text-${category.id === 'forex' ? 'blue' : category.id === 'stocks' ? 'green' : 'orange'}-600 dark:text-${category.id === 'forex' ? 'blue' : category.id === 'stocks' ? 'green' : 'orange'}-600`}>
                    {category.icon}
                  </div>
                </div>
                
                <h2 className="text-2xl font-bold text-white mb-3">
                  {category.title}
                </h2>
                
                <p className="text-white/90 mb-6 flex-grow">
                  {category.description}
                </p>
                
                <Link href={category.link}>
                  <Button 
                    className={`w-full bg-white text-gray-900 hover:bg-gray-100 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 transition-all ${
                      hoveredCard === category.id ? 'translate-y-0' : 'translate-y-1'
                    }`}
                  >
                    <span>Browse {category.title}</span>
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}