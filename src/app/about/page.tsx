"use client";
// Third party components
import Team from "./team";
import StatsGrid from "@/components/about/stats";
import Mission from "./mission";
import Hero from "./hero";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b dark:from-[#0a0a0a] dark:to-[#1a1a1a] from-white to-gray-50 pt-24 pb-12">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <Hero />
        
        {/* Stats Grid */}
        <StatsGrid />

        {/* Mission Section */}
        <Mission />

        {/* Team Section */}
        <Team />
      </div>
    </main>
  );
}
