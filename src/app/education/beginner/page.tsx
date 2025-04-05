"use client";
// antd components
import {
  Layout,
  Typography
} from "antd";
// Third party components
import Introduction from "@/components/education/introduction";
import NextStep from "@/components/education/next-step";
import TradingJourney from "@/components/education/trading-journey";
import TradingMistakes from "@/components/education/trading-mistakes";
import Resources from "@/components/education/educational-resources";

// antd UI library layout components
const { Content } = Layout;
// antd typography components
const { Paragraph } = Typography;

export default function BeginnerPage() {

  return (
    <Layout className="min-h-screen bg-gradient-to-b dark:from-[#0a0a0a] dark:to-[#1a1a1a] from-white to-gray-50 pt-24">
      <Content className="p-4 md:p-8">
        {/* Hero Section */}
        <div className="relative rounded-2xl overflow-hidden mb-12">
          <div className="absolute inset-0 bg-blue-600 opacity-80"></div>
          <div className="relative z-10 py-16 px-6 md:px-12 text-center">
            {/* Title */}
            <h1 className="text-white text-4xl md:text-5xl font-bold mb-4">
              Trading for Beginners
            </h1>
            {/* Description */}
            <Paragraph className="text-white/90 text-lg md:text-xl max-w-3xl mx-auto">
              Your journey into the world of trading starts here. Learn the
              fundamentals, build your knowledge, and develop the skills needed
              to navigate financial markets with confidence.
            </Paragraph>
          </div>
        </div>

        {/* Introduction Section */}
        <Introduction />

        {/* Trading Journey Section */}
        <TradingJourney />

        {/* Common Mistakes Section */}
        <TradingMistakes />

        {/* Next Steps Section */}
        <NextStep />

        {/* Additional Resources */}
        <Resources />
      </Content>
    </Layout>
  );
}
