// antd icons
import {
  BankOutlined,
  DollarOutlined,
  GlobalOutlined,
  GoldOutlined,
  RiseOutlined,
} from "@ant-design/icons";
// antd components
import { Col, Row, Tabs, Typography, Grid } from "antd";
// Next built in components
import Image from "next/image";
import { useState, useEffect } from "react";

// antd typography
const { Title, Paragraph } = Typography;
const { useBreakpoint } = Grid;

export default function MarketTabs() {
  const screens = useBreakpoint();
  const [tabPosition, setTabPosition] = useState<"left" | "top">("left");
  
  useEffect(() => {
    setTabPosition(screens.md ? "left" : "top");
  }, [screens.md]);

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
      icon: <BankOutlined className="text-2xl sm:text-3xl md:text-4xl text-blue-500" />,
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
      icon: <GlobalOutlined className="text-2xl sm:text-3xl md:text-4xl text-green-500" />,
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
      icon: <DollarOutlined className="text-2xl sm:text-3xl md:text-4xl text-purple-500" />,
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
      icon: <GoldOutlined className="text-2xl sm:text-3xl md:text-4xl text-yellow-500" />,
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
      icon: <RiseOutlined className="text-2xl sm:text-3xl md:text-4xl text-red-500" />,
      image: "/image/derivatives-market.avif",
    },
  ];
  
  return (
    <div className="max-w-6xl mx-auto mb-8 md:mb-16 px-3 sm:px-4 md:px-6">
      <Title level={2} className="dark:text-white text-center mb-4 md:mb-8 text-xl sm:text-2xl md:text-3xl">
        Major Financial Markets
      </Title>
      <Tabs
        defaultActiveKey="stocks"
        className="dark:text-white market-tabs responsive-tabs"
        tabPosition={tabPosition}
        size={screens.sm ? "large" : "middle"}
        items={markets.map((market) => ({
          key: market.key,
          label: (
            <span className="flex items-center gap-1 sm:gap-2">
              {market.icon}
              <span className="dark:text-white text-black text-xs sm:text-sm md:text-base">
                {screens.sm ? market.title : market.key.charAt(0).toUpperCase() + market.key.slice(1)}
              </span>
            </span>
          ),
          children: (
            <div className="p-2 sm:p-3 md:p-4">
              <Row gutter={[12, 16]} align="stretch">
                <Col xs={24} md={12}>
                  <Title level={3} className="dark:text-white mb-2 md:mb-4 text-lg sm:text-xl md:text-2xl">
                    {market.title}
                  </Title>
                  <Paragraph className="dark:text-gray-300 text-sm sm:text-base md:text-lg mb-3 md:mb-6">
                    {market.description}
                  </Paragraph>

                  <div className="mb-3 md:mb-6">
                    <Title level={4} className="dark:text-white mb-2 md:mb-3 text-base sm:text-lg md:text-xl">
                      Key Benefits
                    </Title>
                    <ul className="dark:text-gray-300 list-disc pl-5 space-y-1 md:space-y-2 text-sm sm:text-base">
                      {market.benefits.map((benefit, index) => (
                        <li key={index}>{benefit}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <Title level={4} className="dark:text-white mb-2 md:mb-3 text-base sm:text-lg md:text-xl">
                      Challenges to Consider
                    </Title>
                    <ul className="dark:text-gray-300 list-disc pl-5 space-y-1 md:space-y-2 text-sm sm:text-base">
                      {market.challenges.map((challenge, index) => (
                        <li key={index}>{challenge}</li>
                      ))}
                    </ul>
                  </div>
                </Col>
                <Col xs={24} md={12} className="mt-4 md:mt-0">
                  <div className="rounded-lg sm:rounded-xl overflow-hidden shadow-md sm:shadow-lg h-48 sm:h-64 md:h-full">
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
  );
}
