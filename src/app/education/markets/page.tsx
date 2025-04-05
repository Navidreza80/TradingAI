"use client";
// Third party components
import Resources from "@/components/education/educational-resources";
import MarketIntroduction from "@/components/education/market-introduction";
import MarketTable from "@/components/education/market-table";
import MarketTabs from "@/components/education/market-tabs";
import MarketTips from "@/components/education/market-tips";
// antd icons
import { ArrowRightOutlined } from "@ant-design/icons";
// antd components
import { Button, Layout, Typography } from "antd";
// Next built in component
import Link from "next/link";

// antd layout
const { Content } = Layout;
// antd typography
const { Title, Paragraph } = Typography;

export default function MarketsPage() {

  return (
    <Layout className="min-h-screen bg-gradient-to-b dark:from-[#0a0a0a] dark:to-[#1a1a1a] from-white to-gray-50 pt-24">
      <Content className="p-4 md:p-8">
        {/* Hero Section */}
        <div className="relative rounded-2xl overflow-hidden mb-12">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-80"></div>
          <div className="relative z-10 py-16 px-6 md:px-12 text-center">
            <h1 className="text-white text-4xl md:text-5xl font-bold mb-4">
              Exploring Financial Markets
            </h1>
            <Paragraph className="text-white/90 text-lg md:text-xl max-w-3xl mx-auto">
              Discover the diverse world of tradable markets and find the ones
              that align with your trading goals, risk tolerance, and interests.
            </Paragraph>
          </div>
        </div>

        {/* Introduction Section */}
        <MarketIntroduction />

        {/* Markets Tabs Section */}
        <MarketTabs />

        {/* Market Comparison Section */}
        <MarketTable />

        {/* Tips for Choosing Section */}
        <MarketTips />

        {/* Next Steps Section */}
        <div className="max-w-6xl mx-auto text-center py-12 px-4 sm:px-6 lg:py-16 lg:px-8 bg-gradient-to-r dark:from-blue-900/30 dark:to-purple-900/30 from-blue-100 to-purple-100 rounded-2xl">
          <Title level={2} className="dark:text-white mb-6">
            Ready to Learn How to Analyze Markets?
          </Title>
          <Paragraph className="dark:text-gray-300 text-lg max-w-3xl mx-auto mb-8">
            Now that you understand the different markets available, it's time
            to learn how to analyze them using technical analysis techniques.
          </Paragraph>
          <Link href="/education/technical">
            <Button
              type="primary"
              size="large"
              icon={<ArrowRightOutlined />}
              className="bg-blue-600 hover:bg-blue-700 h-12 px-8 text-lg"
            >
              Explore Technical Analysis
            </Button>
          </Link>
        </div>

        {/* Additional Resources */}
        <Resources />
      </Content>
    </Layout>
  );
}
