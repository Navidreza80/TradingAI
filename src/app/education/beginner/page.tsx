"use client";

import {
  ArrowRightOutlined,
  BookOutlined,
  DollarOutlined,
  LineChartOutlined,
  SafetyOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Divider,
  Layout,
  Row,
  Timeline,
  Typography,
} from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useTranslation } from "react-i18next";

const { Content } = Layout;
const { Title, Paragraph, Text } = Typography;

export default function BeginnerPage() {
  const { t } = useTranslation();
  const router = useRouter();

  const sections = [
    {
      title: "What is Trading?",
      content:
        "Trading is the process of buying and selling financial assets such as stocks, currencies, commodities, or cryptocurrencies with the goal of making a profit. Unlike long-term investing, trading often involves shorter timeframes and more frequent transactions.",
      icon: <DollarOutlined className="text-4xl text-blue-500" />,
    },
    {
      title: "Key Trading Concepts",
      content:
        "Before you start trading, it's important to understand concepts like market orders, limit orders, stop losses, and risk management. These fundamentals will help protect your capital and improve your decision-making.",
      icon: <BookOutlined className="text-4xl text-green-500" />,
    },
    {
      title: "Market Analysis",
      content:
        "Traders use two main types of analysis: technical analysis (studying price charts and patterns) and fundamental analysis (evaluating economic factors and company performance). Both approaches can help identify potential trading opportunities.",
      icon: <LineChartOutlined className="text-4xl text-purple-500" />,
    },
    {
      title: "Risk Management",
      content:
        "Successful trading isn't just about making profitable trades—it's about managing risk. This includes setting stop-loss orders, diversifying your portfolio, and never risking more than you can afford to lose.",
      icon: <SafetyOutlined className="text-4xl text-red-500" />,
    },
    {
      title: "Trading Psychology",
      content:
        "Your mindset plays a crucial role in trading success. Emotional discipline, patience, and the ability to follow your trading plan even during market volatility are essential skills to develop.",
      icon: <TeamOutlined className="text-4xl text-yellow-500" />,
    },
  ];

  const tradingJourney = [
    {
      title: "Learn the Basics",
      content:
        "Start with understanding market fundamentals and trading terminology",
    },
    {
      title: "Choose Your Markets",
      content: "Decide which markets align with your interests and goals",
    },
    {
      title: "Develop a Strategy",
      content:
        "Create a trading plan based on your risk tolerance and time commitment",
    },
    {
      title: "Practice with Demo",
      content:
        "Use paper trading to test your strategy without risking real money",
    },
    {
      title: "Start Small",
      content:
        "Begin with small positions as you gain experience and confidence",
    },
    {
      title: "Review and Improve",
      content: "Regularly analyze your trades to refine your approach",
    },
  ];

  return (
    <Layout className="min-h-screen bg-gradient-to-b dark:from-[#0a0a0a] dark:to-[#1a1a1a] from-white to-gray-50 pt-24">
      <Content className="p-4 md:p-8">
        {/* Hero Section */}
        <div className="relative rounded-2xl overflow-hidden mb-12">
          <div className="absolute inset-0 bg-blue-600 opacity-80"></div>
          <div className="relative z-10 py-16 px-6 md:px-12 text-center">
            <h1 className="text-white text-4xl md:text-5xl font-bold mb-4">
              Trading for Beginners
            </h1>
            <Paragraph className="text-white/90 text-lg md:text-xl max-w-3xl mx-auto">
              Your journey into the world of trading starts here. Learn the
              fundamentals, build your knowledge, and develop the skills needed
              to navigate financial markets with confidence.
            </Paragraph>
          </div>
        </div>

        {/* Introduction Section */}
        <div className="max-w-6xl mx-auto mb-16">
          <Row gutter={[32, 32]} align="middle">
            <Col xs={24} md={12}>
              <Title level={2} className="dark:text-white mb-6">
                Getting Started with Trading
              </Title>
              <Paragraph className="dark:text-gray-300 text-lg">
                Welcome to your trading journey! Whether you're interested in
                stocks, forex, cryptocurrencies, or commodities, this guide will
                help you understand the basics of trading and build a solid
                foundation for your future success.
              </Paragraph>
              <Paragraph className="dark:text-gray-300 text-lg">
                Trading can seem complex at first, but by breaking it down into
                manageable concepts and taking a step-by-step approach, you'll
                gain the knowledge and confidence to make informed trading
                decisions.
              </Paragraph>
            </Col>
            <Col xs={24} md={12}>
              <div className="rounded-xl overflow-hidden shadow-lg">
                <Image
                  src="/image/tradingChart.avif"
                  alt="Trading for beginners"
                  width={1000}
                  height={600}
                  className="w-full h-auto"
                />
              </div>
            </Col>
          </Row>
        </div>

        {/* Trading Journey Section */}
        <div className="max-w-6xl mx-auto mb-16 bg-white/5 dark:bg-black/20 p-8 rounded-2xl">
          <Title level={2} className="dark:text-white text-center pb-8">
            Your Trading Journey
          </Title>
          <Timeline
            mode="alternate"
            items={tradingJourney.map((item, index) => ({
              color: ["blue", "green", "red", "purple", "orange", "cyan"][
                index % 6
              ],
              children: (
                <div>
                  <Title level={4} className="dark:text-white mb-2">
                    {item.title}
                  </Title>
                  <Paragraph className="dark:text-gray-300">
                    {item.content}
                  </Paragraph>
                </div>
              ),
            }))}
          />
        </div>

        {/* Common Mistakes Section */}
        <div className="max-w-6xl mx-auto mb-16">
          <Title level={2} className="dark:text-white text-center mb-8">
            Common Beginner Mistakes to Avoid
          </Title>
          <Row gutter={[24, 24]}>
            <Col xs={24} md={8}>
              <Card className="h-full dark:bg-white/5 bg-white/80 border dark:border-white/10 border-black/5">
                <Title level={4} className="dark:text-white">
                  Overtrading
                </Title>
                <Paragraph className="dark:text-gray-300">
                  Trading too frequently can lead to poor decision-making and
                  increased transaction costs. Quality trades are more important
                  than quantity.
                </Paragraph>
              </Card>
            </Col>
            <Col xs={24} md={8}>
              <Card className="h-full dark:bg-white/5 bg-white/80 border dark:border-white/10 border-black/5">
                <Title level={4} className="dark:text-white">
                  Neglecting Education
                </Title>
                <Paragraph className="dark:text-gray-300">
                  Successful trading requires continuous learning. Invest time
                  in understanding markets, strategies, and risk management
                  techniques.
                </Paragraph>
              </Card>
            </Col>
            <Col xs={24} md={8}>
              <Card className="h-full dark:bg-white/5 bg-white/80 border dark:border-white/10 border-black/5">
                <Title level={4} className="dark:text-white">
                  Emotional Trading
                </Title>
                <Paragraph className="dark:text-gray-300">
                  Fear and greed can cloud judgment. Develop a trading plan and
                  stick to it, avoiding impulsive decisions based on emotions.
                </Paragraph>
              </Card>
            </Col>
          </Row>
        </div>

        {/* Next Steps Section */}
        <div className="max-w-6xl mx-auto text-center py-12 px-4 sm:px-6 lg:py-16 lg:px-8 bg-gradient-to-r dark:from-blue-900/30 dark:to-purple-900/30 from-blue-100 to-purple-100 rounded-2xl">
          <Title level={2} className="dark:text-white mb-6">
            Ready to Continue Your Trading Journey?
          </Title>
          <Paragraph className="dark:text-gray-300 text-lg max-w-3xl mx-auto mb-8">
            Now that you understand the basics of trading, it's time to explore
            different markets and find the one that best suits your interests
            and goals.
          </Paragraph>
          <Link href="/education/markets">
            <Button
              type="primary"
              size="large"
              icon={<ArrowRightOutlined />}
              onClick={() => router.push("/education/markets")}
              className="bg-blue-600 hover:bg-blue-700 h-12 px-8 text-lg"
            >
              Explore Markets
            </Button>
          </Link>
        </div>

        {/* Additional Resources */}
        <div className="max-w-6xl mx-auto mt-16">
          <Divider className="dark:border-gray-800">
            <Text className="dark:text-gray-400">Additional Resources</Text>
          </Divider>
          <Row gutter={[16, 16]} className="text-center">
            <Col xs={24} sm={8}>
              <Button
                type="link"
                onClick={() => router.push("/education/technical")}
                className="dark:text-blue-400 text-blue-600"
              >
                Technical Analysis
              </Button>
            </Col>
            <Col xs={24} sm={8}>
              <Button
                type="link"
                onClick={() => router.push("/education/indicators")}
                className="dark:text-blue-400 text-blue-600"
              >
                Trading Indicators
              </Button>
            </Col>
            <Col xs={24} sm={8}>
              <Button
                type="link"
                onClick={() => router.push("/education/test")}
                className="dark:text-blue-400 text-blue-600"
              >
                Test Your Knowledge
              </Button>
            </Col>
          </Row>
        </div>
      </Content>
    </Layout>
  );
}
