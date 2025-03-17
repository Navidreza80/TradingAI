// Third party components
import Footer from "@/components/Footer/Footer";
import AnalyzeYourself from "@/components/Landing/AnalyzeYourself";
import Features from "@/components/Landing/Features";
import HeroSection from "@/components/Landing/HeroSection";
import NewsSection from "@/components/Landing/NewsSection";
import TradingStrategies from "@/components/Landing/Strategies";
import TradingSignals from "@/components/Landing/TradingSignals";

export default function Home() {
  return (
      <main className="min-h-screen bg-[#0a0a0a] text-white flex flex-col">
        {/* Hero Section */}
        <HeroSection />

        {/* Features Section */}
        <Features />

        {/* Stats Section */}
        <TradingSignals />

        {/* User Experience Section */}
        <TradingStrategies />

        {/* News Section */}
        <NewsSection />

        {/* Analyse Yourself Section */}
        <AnalyzeYourself />
      </main>
    )
}
