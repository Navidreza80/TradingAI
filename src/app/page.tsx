// Next built in
import dynamic from "next/dynamic";
// Third party components
const Features = dynamic(() => import("@/components/Landing/Features"), {
  ssr: true,
});
const LandingSections = dynamic(() => import("@/components/Landing/Sections"), {
  ssr: true,
});
import HeroSection from "@/components/Landing/HeroSection";
// Icons
import {
  AcademicCapIcon,
  ArrowTrendingUpIcon,
  MagnifyingGlassIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import {
  BitcoinIcon,
  BookOpenIcon,
  ChartBarIcon,
  ClockIcon,
  NewspaperIcon,
  PaperclipIcon,
  RssIcon,
  StarIcon,
  TrophyIcon,
  UsersIcon,
} from "lucide-react";
import { FaRobot } from "react-icons/fa";
// Types
import { LandingSectionsInterface } from "@/types";

export default function Home() {
  const landingSectionItems: LandingSectionsInterface[] = [
    {
      title: "AI-Powered Crypto Trading Signal",
      description:
        "Get AI-powered trading signals for your favorite crypto pairs in 4 easy steps.",
      mainButton: {
        className: "from-blue-500 to-cyan-400",
        text: "Get Signal",
      },
      secondButton: null,
      features: [
        {
          icon: <BitcoinIcon className="w-8 h-8" />,
          value: "BTCUSDT",
          title: "Select Crypto Pair",
          description: null,
          color: "from-blue-500 to-cyan-400",
        },
        {
          icon: <ClockIcon className="w-8 h-8" />,
          value: "1h",
          title: "Select Time Frame",
          description: null,
          color: "from-emerald-500 to-teal-500",
        },
        {
          icon: <ChartBarIcon className="w-8 h-8" />,
          value: "100",
          title: "Adjust Candles",
          description: null,
          color: "from-amber-500 to-orange-400",
        },
        {
          icon: <StarIcon className="w-8 h-8" />,
          value: "TP / SL",
          title: "Generate Signal",
          description: null,
          color: "from-purple-500 to-pink-500",
        },
      ],
    },
    {
      title: "Master Trading Strategies",
      description:
        "Learn professional trading strategies and test your knowledge with interactive exercises and comprehensive exams",
      mainButton: {
        className: "from-emerald-500 to-teal-500",
        text: "Start Learning",
      },
      secondButton: {
        className: "hover:bg-emerald-500/10 border-emerald-500",
        text: "Take a Test",
      },
      features: [
        {
          icon: <BookOpenIcon className="w-8 h-8" />,
          value: 50,
          title: "Trading Courses",
          description: "Professional trading courses from basic to advanced.",
          color: "from-blue-500 to-cyan-400",
        },
        {
          icon: <AcademicCapIcon className="w-8 h-8" />,
          value: 1000,
          title: "Practice Exercises",
          description: "Interactive exercises to master trading skills",
          color: "from-emerald-500 to-teal-500",
        },
        {
          icon: <TrophyIcon className="w-8 h-8" />,
          value: 20,
          title: "Certificates",
          description: "Professional trading certificates",
          color: "from-amber-500 to-orange-400",
        },
        {
          icon: <UserGroupIcon className="w-8 h-8" />,
          value: 5000,
          title: "Active Students",
          description: "Successful traders in our community",
          color: "from-purple-500 to-pink-500",
        },
      ],
    },
    {
      title: "Stay Updated",
      description:
        "Get the latest crypto news, market analysis, and expert insights through our regularly updated blogs and news section",
      mainButton: {
        className: "from-purple-500 to-pink-500",
        text: "Explore News",
      },
      secondButton: {
        className: "hover:bg-purple-500/10 border-purple-500",
        text: "Read Blogs",
      },
      features: [
        {
          icon: <NewspaperIcon className="w-8 h-8 text-white" />,
          value: null,
          title: "Stay Updated",
          description:
            "Get the latest financial market news and updates in real-time",
          color: "from-blue-500 to-cyan-400",
        },
        {
          icon: <ChartBarIcon className="w-8 h-8 text-white" />,
          value: null,
          title: "Market Impact",
          description:
            "See how news affects market trends and make informed decisions",
          color: "from-purple-500 to-pink-500",
        },
        {
          icon: <RssIcon className="w-8 h-8 text-white" />,
          value: null,
          title: "Market Insights",
          description:
            "Read interesting blogs about market analysis and trading strategies",
          color: "from-amber-500 to-orange-400",
        },
        {
          icon: <ArrowTrendingUpIcon className="w-8 h-8 text-white" />,
          title: "Share Knowledge",
          value: null,
          description:
            "Share your trading insights and experiences with the community",
          color: "from-green-500 to-emerald-400",
        },
      ],
    },
    {
      title: 'Monitor Your Trading Growth',
      description: 'Leverage our advanced tools and AI-powered insights to analyze your trading journey and optimize your strategy.',
      mainButton: {
        className: "from-amber-500 to-orange-400",
        text: 'Demo Trade',
      },
      secondButton: {
        className: "hover:bg-amber-500/10 from-amber-500",
        text: 'Analyze Yourself',
      },
      features: [
        {
          icon: <PaperclipIcon className="w-8 h-8 text-white" />,
          title: 'Demo Trade',
          description: 'Analyze market and execute your trades in demo mode.',
          value: null,
          color: "from-blue-500 to-cyan-400",
        },
        {
          icon: <FaRobot className="w-8 h-8 text-white" />,
          title: 'AI Mentor',
          description: 'Look how you performed on your last trades',
          value: null,
          color: "from-purple-500 to-pink-500",
        },
        {
          icon: <MagnifyingGlassIcon className="w-8 h-8 text-white" />,
          title: 'Track Your Progress',
          description: 'Track your progress in your trading journey with our professional analytics tools',
          value: null,
          color: "from-amber-500 to-orange-400",
        },
        {
          icon: <UsersIcon className="w-8 h-8 text-white" />,
          title: 'Share Your Profits',
          value: null,
          description: 'Share your profits with your friends and invite them to our site!',
          color: "from-green-500 to-emerald-400",
        },
      ],
    },
  ];
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white flex flex-col">
      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <Features />

      {landingSectionItems.map((item, index) => {
        return (
          <LandingSections
            features={item.features}
            secondButton={item.secondButton}
            title={item.title}
            description={item.description}
            mainButton={item.mainButton}
            key={index}
          />
        );
      })}
    </main>
  );
}
