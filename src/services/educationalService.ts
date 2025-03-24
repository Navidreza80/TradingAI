"use server"

import { EducationalContent, Exam, Certificate } from '@/types/educational';

export async function getEducationalContent(category: string, limit: number = 6): Promise<EducationalContent[]> {
  try {
    // In a real app, you would fetch this from an API
    // For now, we'll return mock data
    return getFallbackEducationalContent(category, limit);
  } catch (error) {
    console.error(`Error fetching educational content for category ${category}:`, error);
    return [];
  }
}

export async function getExams(limit: number = 3): Promise<Exam[]> {
  try {
    // Mock implementation
    return getFallbackExams(limit);
  } catch (error) {
    console.error('Error fetching exams:', error);
    return [];
  }
}

export async function getCertificates(limit: number = 3): Promise<Certificate[]> {
  try {
    // Mock implementation
    return getFallbackCertificates(limit);
  } catch (error) {
    console.error('Error fetching certificates:', error);
    return [];
  }
}

function getFallbackEducationalContent(category: string, limit: number): EducationalContent[] {
  const allContent: Record<string, EducationalContent[]> = {
    beginner: [
      {
        id: "1",
        title: "Introduction to Financial Markets",
        slug: "introduction-to-financial-markets",
        description: "Learn the basics of financial markets, including stocks, bonds, commodities, and forex. Understand how markets work and the key players involved.",
        image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&h=500&q=80",
        level: "Beginner",
        duration: "2 hours",
        category: "beginner",
        topics: ["Markets", "Stocks", "Bonds", "Forex"],
        free: true,
        premium: false,
        author: "Sarah Johnson",
        publishedAt: "2023-01-15T00:00:00Z",
        updatedAt: "2023-06-10T00:00:00Z",
        lessons: 8,
        rating: 4.7,
        enrolled: 12500
      },
      {
        id: "2",
        title: "Trading Terminology for Beginners",
        slug: "trading-terminology-for-beginners",
        description: "Master the essential vocabulary used in trading and financial markets. This course covers all the terms you need to understand trading discussions and analysis.",
        image: "https://images.unsplash.com/photo-1543286386-713bdd548da4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&h=500&q=80",
        level: "Beginner",
        duration: "1.5 hours",
        category: "beginner",
        topics: ["Terminology", "Definitions", "Jargon"],
        free: true,
        premium: false,
        author: "Michael Chen",
        publishedAt: "2023-02-05T00:00:00Z",
        updatedAt: "2023-07-12T00:00:00Z",
        lessons: 6,
        rating: 4.8,
        enrolled: 9800
      },
      {
        id: "3",
        title: "Understanding Risk Management",
        slug: "understanding-risk-management",
        description: "Learn how to protect your capital with proper risk management techniques. This course covers position sizing, stop-loss strategies, and portfolio diversification.",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&h=500&q=80",
        level: "Beginner",
        duration: "2.5 hours",
        category: "beginner",
        topics: ["Risk Management", "Stop Loss", "Position Sizing"],
        free: true,
        premium: false,
        author: "Alex Morgan",
        publishedAt: "2023-03-10T00:00:00Z",
        updatedAt: "2023-08-05T00:00:00Z",
        lessons: 10,
        rating: 4.9,
        enrolled: 15200
      },
      {
        id: "4",
        title: "Creating Your First Trading Plan",
        slug: "creating-your-first-trading-plan",
        description: "Develop a structured approach to trading with a comprehensive trading plan. Learn how to set goals, define strategies, and establish rules for your trading activities.",
        image: "https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&h=500&q=80",
        level: "Beginner",
        duration: "3 hours",
        category: "beginner",
        topics: ["Trading Plan", "Goal Setting", "Strategy Development"],
        free: false,
        premium: true,
        author: "Emma Wilson",
        publishedAt: "2023-04-20T00:00:00Z",
        updatedAt: "2023-09-15T00:00:00Z",
        lessons: 12,
        rating: 4.6,
        enrolled: 7800
      }
    ],
    strategy: [
      {
        id: "5",
        title: "Trend Following Strategies",
        slug: "trend-following-strategies",
        description: "Master the art of identifying and trading with market trends. Learn various trend following techniques and indicators to improve your trading success.",
        image: "https://images.unsplash.com/photo-1535320903710-d993d3d77d29?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&h=500&q=80",
        level: "Intermediate",
        duration: "4 hours",
        category: "strategy",
        topics: ["Trend Following", "Moving Averages", "Momentum"],
        free: false,
        premium: true,
        author: "David Zhang",
        publishedAt: "2023-02-18T00:00:00Z",
        updatedAt: "2023-08-22T00:00:00Z",
        lessons: 15,
        rating: 4.8,
        enrolled: 6500
      },
      {
        id: "6",
        title: "Swing Trading Masterclass",
        slug: "swing-trading-masterclass",
        description: "Learn how to capture medium-term price movements with swing trading. This course covers entry and exit strategies, timeframes, and market selection for swing traders.",
        image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&h=500&q=80",
        level: "Intermediate",
        duration: "5 hours",
        category: "strategy",
        topics: ["Swing Trading", "Chart Patterns", "Entry/Exit Strategies"],
        free: false,
        premium: true,
        author: "Jessica Brown",
        publishedAt: "2023-03-25T00:00:00Z",
        updatedAt: "2023-09-10T00:00:00Z",
        lessons: 18,
        rating: 4.9,
        enrolled: 8200
      },
      {
        id: "7",
        title: "Day Trading Fundamentals",
        slug: "day-trading-fundamentals",
        description: "Discover the principles of successful day trading. Learn about market hours, liquidity, volatility, and the psychological aspects of day trading.",
        image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&h=500&q=80",
        level: "Intermediate",
        duration: "6 hours",
        category: "strategy",
        topics: ["Day Trading", "Scalping", "Market Hours", "Psychology"],
        free: false,
        premium: true,
        author: "Robert Johnson",
        publishedAt: "2023-04-15T00:00:00Z",
        updatedAt: "2023-10-05T00:00:00Z",
        lessons: 20,
        rating: 4.7,
        enrolled: 5900
      },
      {
        id: "8",
        title: "Mean Reversion Trading",
        slug: "mean-reversion-trading",
        description: "Learn how to identify and trade market overextensions with mean reversion strategies. This course covers statistical concepts, indicators, and execution techniques.",
        image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&h=500&q=80",
        level: "Advanced",
        duration: "4.5 hours",
        category: "strategy",
        topics: ["Mean Reversion", "Overbought/Oversold", "Statistics"],
        free: false,
        premium: true,
        author: "Sophia Martinez",
        publishedAt: "2023-05-20T00:00:00Z",
        updatedAt: "2023-11-12T00:00:00Z",
        lessons: 16,
        rating: 4.8,
        enrolled: 4200
      }
    ],
    indicator: [
      {
        id: "9",
        title: "Mastering Moving Averages",
        slug: "mastering-moving-averages",
        description: "Learn how to effectively use different types of moving averages in your trading. This course covers simple, exponential, weighted, and adaptive moving averages.",
        image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&h=500&q=80",
        level: "Intermediate",
        duration: "3 hours",
        category: "indicator",
        topics: ["Moving Averages", "Crossovers", "Trend Identification"],
        free: true,
        premium: false,
        author: "Thomas Wilson",
        publishedAt: "2023-02-10T00:00:00Z",
        updatedAt: "2023-08-15T00:00:00Z",
        lessons: 12,
        rating: 4.7,
        enrolled: 9500
      },
      {
        id: "10",
        title: "RSI Trading Strategies",
        slug: "rsi-trading-strategies",
        description: "Master the Relative Strength Index (RSI) indicator and learn multiple trading strategies based on this powerful tool. Includes divergence trading and overbought/oversold conditions.",
        image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&h=500&q=80",
        level: "Intermediate",
        duration: "3.5 hours",
        category: "indicator",
        topics: ["RSI", "Divergence", "Overbought/Oversold"],
        free: false,
        premium: true,
        author: "Laura Chen",
        publishedAt: "2023-03-18T00:00:00Z",
        updatedAt: "2023-09-22T00:00:00Z",
        lessons: 14,
        rating: 4.8,
        enrolled: 7200
      },
      {
        id: "11",
        title: "MACD Trading Techniques",
        slug: "macd-trading-techniques",
        description: "Learn how to use the Moving Average Convergence Divergence (MACD) indicator for trend identification and momentum trading. Includes signal line crossovers and histogram analysis.",
        image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&h=500&q=80",
        level: "Intermediate",
        duration: "3 hours",
        category: "indicator",
        topics: ["MACD", "Signal Line", "Histogram", "Divergence"],
        free: false,
        premium: true,
        author: "Daniel Brown",
        publishedAt: "2023-04-25T00:00:00Z",
        updatedAt: "2023-10-18T00:00:00Z",
        lessons: 12,
        rating: 4.6,
        enrolled: 6800
      },
      {
        id: "12",
        title: "Bollinger Bands Masterclass",
        slug: "bollinger-bands-masterclass",
        description: "Master the use of Bollinger Bands for volatility-based trading. Learn about band squeezes, breakouts, and mean reversion strategies using this versatile indicator.",
        image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&h=500&q=80",
        level: "Advanced",
        duration: "4 hours",
        category: "indicator",
        topics: ["Bollinger Bands", "Volatility", "Squeezes", "Breakouts"],
        free: false,
        premium: true,
        author: "Jennifer Lee",
        publishedAt: "2023-05-15T00:00:00Z",
        updatedAt: "2023-11-10T00:00:00Z",
        lessons: 15,
        rating: 4.9,
        enrolled: 5500
      }
    ],
    market: [
      {
        id: "13",
        title: "Forex Market Fundamentals",
        slug: "forex-market-fundamentals",
        description: "Understand the foreign exchange market, including currency pairs, market hours, and the factors that influence exchange rates. Learn how to analyze and trade forex effectively.",
        image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&h=500&q=80",
        level: "Beginner",
        duration: "4 hours",
        category: "market",
        topics: ["Forex", "Currency Pairs", "Exchange Rates"],
        free: true,
        premium: false,
        author: "Mark Davis",
        publishedAt: "2023-02-22T00:00:00Z",
        updatedAt: "2023-08-18T00:00:00Z",
        lessons: 16,
        rating: 4.7,
        enrolled: 11200
      },
      {
        id: "14",
        title: "Stock Market for Traders",
        slug: "stock-market-for-traders",
        description: "Learn how to trade stocks effectively, including market structure, order types, and trading sessions. This course covers both day trading and swing trading approaches for stocks.",
        image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&h=500&q=80",
        level: "Intermediate",
        duration: "5 hours",
        category: "market",
        topics: ["Stocks", "Market Structure", "Order Types"],
        free: false,
        premium: true,
        author: "Sarah Johnson",
        publishedAt: "2023-03-15T00:00:00Z",
        updatedAt: "2023-09-20T00:00:00Z",
        lessons: 18,
        rating: 4.8,
        enrolled: 8900
      },
      {
        id: "15",
        title: "Cryptocurrency Trading",
        slug: "cryptocurrency-trading",
        description: "Master the unique aspects of cryptocurrency markets, including blockchain technology, market cycles, and trading strategies specific to digital assets.",
        image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&h=500&q=80",
        level: "Intermediate",
        duration: "6 hours",
        category: "market",
        topics: ["Cryptocurrency", "Bitcoin", "Altcoins", "Blockchain"],
        free: false,
        premium: true,
        author: "Alex Morgan",
        publishedAt: "2023-04-10T00:00:00Z",
        updatedAt: "2023-10-15T00:00:00Z",
        lessons: 20,
        rating: 4.9,
        enrolled: 13500
      },
      {
        id: "16",
        title: "Futures Trading Essentials",
        slug: "futures-trading-essentials",
        description: "Learn how to trade futures contracts across different markets, including commodities, indices, and currencies. Understand contract specifications, margin requirements, and trading strategies.",
        image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&h=500&q=80",
        level: "Advanced",
        duration: "5.5 hours",
        category: "market",
        topics: ["Futures", "Commodities", "Indices", "Margin"],
        free: false,
        premium: true,
        author: "Robert Johnson",
        publishedAt: "2023-05-05T00:00:00Z",
        updatedAt: "2023-11-08T00:00:00Z",
        lessons: 22,
        rating: 4.7,
        enrolled: 6200
      }
    ],
    exam: [
      {
        id: "17",
        title: "Trading Fundamentals Exam",
        slug: "trading-fundamentals-exam",
        description: "Test your knowledge of basic trading concepts, terminology, and market structure. This exam covers the essential knowledge every trader should have.",
        level: "Beginner",
        questions: 50,
        duration: "60 minutes",
        passingScore: 70,
        topics: ["Market Basics", "Order Types", "Chart Reading", "Risk Management"],
        certificate: true,
        free: true,
        premium: false
      }
    ],
    certificate: [
      {
        id: "18",
        title: "Certified Trading Professional",
        slug: "certified-trading-professional",
        description: "Our flagship certification program covering all aspects of trading. Earn this prestigious credential to demonstrate your comprehensive trading knowledge and skills.",
        level: "Advanced",
        exams: 3,
        duration: "6 months",
        skills: ["Technical Analysis", "Fundamental Analysis", "Risk Management", "Trading Psychology", "Portfolio Management"],
        price: "$499",
        free: false,
        premium: true
      }
    ]
  };

  return (allContent[category] || []).slice(0, limit);
}

function getFallbackExams(limit: number): Exam[] {
  const fallbackExams = [
    {
      id: "e1",
      title: "Trading Fundamentals Certification",
      slug: "trading-fundamentals-certification",
      description: "Test your knowledge of basic trading concepts, terminology, and market structure. This exam covers the essential knowledge every trader should have.",
      level: "Beginner",
      questions: 50,
      duration: "60 minutes",
      passingScore: 70,
      topics: ["Market Basics", "Order Types", "Chart Reading", "Risk Management"],
      certificate: true,
      free: true,
      premium: false
    },
    {
      id: "e2",
      title: "Technical Analysis Proficiency",
      slug: "technical-analysis-proficiency",
      description: "Demonstrate your expertise in technical analysis, including chart patterns, indicators, and price action. This comprehensive exam tests your ability to analyze markets technically.",
      level: "Intermediate",
      questions: 75,
      duration: "90 minutes",
      passingScore: 75,
      topics: ["Chart Patterns", "Indicators", "Price Action", "Support/Resistance"],
      certificate: true,
      free: false,
      premium: true
    },
    {
      id: "e3",
      title: "Advanced Trading Strategies Assessment",
      slug: "advanced-trading-strategies-assessment",
      description: "Prove your mastery of complex trading strategies and advanced concepts. This challenging exam covers sophisticated approaches to market analysis and trading.",
      level: "Advanced",
      questions: 100,
      duration: "120 minutes",
      passingScore: 80,
      topics: ["Advanced Strategies", "Portfolio Management", "Risk Optimization", "Market Psychology"],
      certificate: true,
      free: false,
      premium: true
    }
  ];
  
  return fallbackExams.slice(0, limit);
}

function getFallbackCertificates(limit: number): Certificate[] {
  const fallbackCertificates = [
    {
      id: "c1",
      title: "Certified Trading Professional",
      slug: "certified-trading-professional",
      description: "Our flagship certification program covering all aspects of trading. Earn this prestigious credential to demonstrate your comprehensive trading knowledge and skills.",
      level: "Advanced",
      exams: 3,
      duration: "6 months",
      skills: ["Technical Analysis", "Fundamental Analysis", "Risk Management", "Trading Psychology", "Portfolio Management"],
      price: "$499",
      free: false,
      premium: true
    },
    {
      id: "c2",
      title: "Technical Analysis Specialist",
      slug: "technical-analysis-specialist",
      description: "Become a certified specialist in technical analysis with this focused certification program. Master chart patterns, indicators, and price action analysis.",
      level: "Intermediate",
      exams: 2,
      duration: "3 months",
      skills: ["Chart Patterns", "Technical Indicators", "Price Action", "Support/Resistance", "Trend Analysis"],
      price: "$299",
      free: false,
      premium: true
    },
    {
      id: "c3",
      title: "Algorithmic Trading Engineer",
      slug: "algorithmic-trading-engineer",
      description: "Earn certification in algorithmic trading and quantitative analysis. Learn to develop, test, and implement trading algorithms and automated systems.",
      level: "Expert",
      exams: 4,
      duration: "8 months",
      skills: ["Algorithm Development", "Backtesting", "Quantitative Analysis", "Programming", "System Optimization"],
      price: "$699",
      free: false,
      premium: true
    }
  ];
  
  return fallbackCertificates.slice(0, limit);
}