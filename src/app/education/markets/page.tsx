"use client";

import {
  ArrowRightOutlined,
  BankOutlined,
  DollarOutlined,
  GlobalOutlined,
  GoldOutlined,
  RiseOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Divider,
  Layout,
  Row,
  Tabs,
  Typography,
} from "antd";
import Image from "next/image";
import Link from "next/link";

const { Content } = Layout;
const { Title, Paragraph, Text } = Typography;

export default function MarketsPage() {
  // Market data
  const markets = [
    // In the markets array, update the image paths for each market type
    {
      key: "stocks",
      title: "Stock Market",
      description:
        "The stock market is where shares of publicly traded companies are bought and sold. When you buy a stock, you're purchasing a small ownership stake in a company.",
      benefits: [
        "Potential for long-term growth",
        "Dividend income from established companies",
        "High liquidity in major markets",
        "Extensive historical data for analysis",
      ],
      challenges: [
        "Market volatility can lead to significant losses",
        "Requires research and understanding of company fundamentals",
        "Emotional decision-making can impact returns",
        "May require larger capital for diversification",
      ],
      icon: <BankOutlined className="text-4xl text-blue-500" />,
      image: "/image/tradingChart.avif",
    },
    {
      key: "forex",
      title: "Forex Market",
      description:
        "The foreign exchange (forex) market is where currencies are traded. It's the largest and most liquid financial market in the world, with trillions of dollars traded daily.",
      benefits: [
        "24-hour trading 5 days a week",
        "High liquidity and low transaction costs",
        "Ability to trade on margin with leverage",
        "Opportunities in both rising and falling markets",
      ],
      challenges: [
        "High volatility and risk, especially with leverage",
        "Complex market influenced by global economic factors",
        "Requires understanding of macroeconomic indicators",
        "Can be challenging for beginners to navigate",
      ],
      icon: <GlobalOutlined className="text-4xl text-green-500" />,
      image: "/image/forex.avif",
    },
    {
      key: "crypto",
      title: "Cryptocurrency Market",
      description:
        "The cryptocurrency market involves digital or virtual currencies that use cryptography for security. Bitcoin, Ethereum, and thousands of other cryptocurrencies are traded on specialized exchanges.",
      benefits: [
        "24/7 trading with global accessibility",
        "Potential for high returns",
        "Blockchain technology offers transparency",
        "Growing institutional adoption",
      ],
      challenges: [
        "Extreme volatility and price swings",
        "Regulatory uncertainty in many jurisdictions",
        "Security concerns with exchanges and wallets",
        "Market manipulation risks",
      ],
      icon: <DollarOutlined className="text-4xl text-purple-500" />,
      image: "/image/crypto-market.avif",
    },
    {
      key: "commodities",
      title: "Commodities Market",
      description:
        "Commodities markets involve trading raw materials or primary agricultural products. These include precious metals (gold, silver), energy resources (oil, natural gas), and agricultural products (wheat, coffee).",
      benefits: [
        "Hedge against inflation",
        "Portfolio diversification",
        "Tangible assets with intrinsic value",
        "Less correlation with stock markets",
      ],
      challenges: [
        "Influenced by supply and demand factors",
        "Weather and geopolitical events can cause volatility",
        "Storage and delivery considerations for physical commodities",
        "Seasonal patterns affect agricultural commodities",
      ],
      icon: <GoldOutlined className="text-4xl text-yellow-500" />,
      image: "/image/commodities-market.png",
    },
    {
      key: "derivatives",
      title: "Derivatives Market",
      description:
        "Derivatives are financial contracts whose value is derived from an underlying asset. Common derivatives include futures, options, and swaps, which can be based on stocks, commodities, currencies, or interest rates.",
      benefits: [
        "Risk management and hedging capabilities",
        "Leverage to control larger positions with less capital",
        "Ability to profit in both rising and falling markets",
        "Standardized contracts with regulated exchanges",
      ],
      challenges: [
        "Complex instruments requiring specialized knowledge",
        "High risk due to leverage",
        "Time decay affects options",
        "Counterparty risk in some derivatives",
      ],
      icon: <RiseOutlined className="text-4xl text-red-500" />,
      image: "/image/derivatives-market.avif",
    },
  ];

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
        <div className="max-w-6xl mx-auto mb-16">
          <Row gutter={[32, 32]} align="middle">
            <Col xs={24} md={12}>
              <Title level={2} className="dark:text-white mb-6">
                Understanding Different Markets
              </Title>
              <Paragraph className="dark:text-gray-300 text-lg">
                Financial markets are where buyers and sellers come together to
                trade assets. Each market has its own characteristics, trading
                hours, regulations, and instruments.
              </Paragraph>
              <Paragraph className="dark:text-gray-300 text-lg">
                As a trader, understanding the unique aspects of each market
                will help you decide which ones best suit your trading style,
                capital, and goals. Let's explore the major markets available to
                traders today.
              </Paragraph>
            </Col>
            <Col xs={24} md={12}>
              <div className="rounded-xl overflow-hidden shadow-lg">
                <Image
                  src="/image/global-market.avif"
                  alt="Global financial markets"
                  width={1000}
                  height={600}
                  className="w-full h-auto"
                />
              </div>
            </Col>
          </Row>
        </div>

        {/* Markets Tabs Section */}
        <div className="max-w-6xl mx-auto mb-16">
          <Title level={2} className="dark:text-white text-center mb-8">
            Major Financial Markets
          </Title>
          <Tabs
            defaultActiveKey="stocks"
            className="dark:text-white market-tabs"
            tabPosition="left"
            size="large"
            items={markets.map((market) => ({
              key: market.key,
              label: (
                <span className="flex items-center gap-2">
                  {market.icon}
                  <span className="dark:text-white text-black">
                    {market.title}
                  </span>
                </span>
              ),
              children: (
                <div className="p-4">
                  <Row gutter={[24, 24]}>
                    <Col xs={24} md={12}>
                      <Title level={3} className="dark:text-white mb-4">
                        {market.title}
                      </Title>
                      <Paragraph className="dark:text-gray-300 text-lg mb-6">
                        {market.description}
                      </Paragraph>

                      <div className="mb-6">
                        <Title level={4} className="dark:text-white mb-3">
                          Key Benefits
                        </Title>
                        <ul className="dark:text-gray-300 list-disc pl-5 space-y-2">
                          {market.benefits.map((benefit, index) => (
                            <li key={index}>{benefit}</li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <Title level={4} className="dark:text-white mb-3">
                          Challenges to Consider
                        </Title>
                        <ul className="dark:text-gray-300 list-disc pl-5 space-y-2">
                          {market.challenges.map((challenge, index) => (
                            <li key={index}>{challenge}</li>
                          ))}
                        </ul>
                      </div>
                    </Col>
                    <Col xs={24} md={12}>
                      <div className="rounded-xl overflow-hidden shadow-lg h-full">
                        <Image
                          src={market.image}
                          alt={market.title}
                          width={600}
                          height={400}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </Col>
                  </Row>
                </div>
              ),
            }))}
          />
        </div>

        {/* Market Comparison Section */}
        <div className="max-w-6xl mx-auto mb-16 bg-white/5 dark:bg-black/20 p-8 rounded-2xl">
          <Title level={2} className="dark:text-white text-center mb-8">
            Comparing Markets for Beginners
          </Title>
          <div className="overflow-x-auto">
            <table className="w-full dark:text-gray-300">
              <thead>
                <tr className="border-b dark:border-gray-700">
                  <th className="py-3 px-4 text-left">Market</th>
                  <th className="py-3 px-4 text-left">Beginner Friendly</th>
                  <th className="py-3 px-4 text-left">Capital Required</th>
                  <th className="py-3 px-4 text-left">Volatility</th>
                  <th className="py-3 px-4 text-left">Trading Hours</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b dark:border-gray-800">
                  <td className="py-3 px-4 font-medium">Stocks</td>
                  <td className="py-3 px-4">High</td>
                  <td className="py-3 px-4">Medium</td>
                  <td className="py-3 px-4">Medium</td>
                  <td className="py-3 px-4">Market Hours</td>
                </tr>
                <tr className="border-b dark:border-gray-800">
                  <td className="py-3 px-4 font-medium">Forex</td>
                  <td className="py-3 px-4">Medium</td>
                  <td className="py-3 px-4">Low</td>
                  <td className="py-3 px-4">Medium-High</td>
                  <td className="py-3 px-4">24/5</td>
                </tr>
                <tr className="border-b dark:border-gray-800">
                  <td className="py-3 px-4 font-medium">Cryptocurrency</td>
                  <td className="py-3 px-4">Medium</td>
                  <td className="py-3 px-4">Low</td>
                  <td className="py-3 px-4">Very High</td>
                  <td className="py-3 px-4">24/7</td>
                </tr>
                <tr className="border-b dark:border-gray-800">
                  <td className="py-3 px-4 font-medium">Commodities</td>
                  <td className="py-3 px-4">Low</td>
                  <td className="py-3 px-4">Medium-High</td>
                  <td className="py-3 px-4">Medium</td>
                  <td className="py-3 px-4">Varies</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium">Derivatives</td>
                  <td className="py-3 px-4">Low</td>
                  <td className="py-3 px-4">Medium-High</td>
                  <td className="py-3 px-4">High</td>
                  <td className="py-3 px-4">Varies</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Tips for Choosing Section */}
        <div className="max-w-6xl mx-auto mb-16">
          <Title level={2} className="dark:text-white text-center mb-8">
            How to Choose the Right Market
          </Title>
          <Row gutter={[24, 24]}>
            <Col xs={24} md={8}>
              <Card
                className="h-full dark:bg-white/5 bg-white/80 border dark:border-white/10 border-black/5"
                variant="outlined"
              >
                <Title level={4} className="dark:text-white">
                  Consider Your Capital
                </Title>
                <Paragraph className="dark:text-gray-300">
                  Different markets require different amounts of starting
                  capital. Forex and crypto can be started with smaller amounts,
                  while stocks and commodities often require more.
                </Paragraph>
              </Card>
            </Col>
            <Col xs={24} md={8}>
              <Card
                className="h-full dark:bg-white/5 bg-white/80 border dark:border-white/10 border-black/5"
                variant="outlined"
              >
                <Title level={4} className="dark:text-white">
                  Assess Your Knowledge
                </Title>
                <Paragraph className="dark:text-gray-300">
                  Start with markets you understand or are willing to learn
                  about. Your interest in a particular market will help sustain
                  your motivation to learn and improve.
                </Paragraph>
              </Card>
            </Col>
            <Col xs={24} md={8}>
              <Card
                className="h-full dark:bg-white/5 bg-white/80 border dark:border-white/10 border-black/5"
                variant="outlined"
              >
                <Title level={4} className="dark:text-white">
                  Evaluate Your Schedule
                </Title>
                <Paragraph className="dark:text-gray-300">
                  Consider when you can trade. If you have a full-time job,
                  markets with extended hours like forex or crypto might be more
                  suitable than stock markets.
                </Paragraph>
              </Card>
            </Col>
          </Row>
        </div>

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
        <div className="max-w-6xl mx-auto mt-16">
          <Divider className="dark:border-gray-800">
            <Text className="dark:text-gray-400">Additional Resources</Text>
          </Divider>
          <Row gutter={[16, 16]} className="text-center">
            <Col xs={24} sm={8}>
              <Link href="/education/indicators">
                <Button
                  type="link"
                  className="dark:text-blue-400 text-blue-600"
                >
                  Trading Indicators
                </Button>
              </Link>
            </Col>
            <Col xs={24} sm={8}>
              <Link href="/education/strategies">
                <Button
                  type="link"
                  className="dark:text-blue-400 text-blue-600"
                >
                  Trading Strategies
                </Button>
              </Link>
            </Col>
            <Col xs={24} sm={8}>
              <Link href="/education/test">
                <Button
                  type="link"
                  className="dark:text-blue-400 text-blue-600"
                >
                  Test Your Knowledge
                </Button>
              </Link>
            </Col>
          </Row>
        </div>
      </Content>
    </Layout>
  );
}
