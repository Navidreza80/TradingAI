"use client";
// Third party components
import Team from "../../components/about/team";
import StatsGrid from "@/components/about/stats";
import Mission from "../../components/about/mission";
import Hero from "../../components/about/hero";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background-light dark:bg-background-dark pt-24 pb-12">
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
