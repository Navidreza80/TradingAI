/* eslint-disable */
"use client";
// Icons
import {
  BlockOutlined,
  CodeOutlined,
  DollarOutlined,
  GlobalOutlined,
  LockOutlined,
  QuestionCircleOutlined,
  RocketOutlined,
  SafetyOutlined,
  WalletOutlined,
} from "@ant-design/icons";
// antd components
import {
  Button,
  Card,
  Col,
  Collapse,
  Divider,
  Layout,
  Row,
  Steps,
  Timeline,
  Typography,
} from "antd";
// Next built in components
import Image from "next/image";
import Link from "next/link";
// React state
import { useState } from "react";

// antd layout
const { Content } = Layout;
// antd typography
const { Title, Paragraph, Text } = Typography;

export default function Web3Page() {
  // State to save current web3 journey step
  const [currentStep, setCurrentStep] = useState(0);

  // Web3 evolution timeline data
  const evolutionTimeline = [
    {
      title: "Web 1.0 (1990s)",
      content:
        "Static websites with one-way information flow. Users could only consume content.",
      icon: <GlobalOutlined className="text-gray-500" />,
    },
    {
      title: "Web 2.0 (2000s)",
      content:
        "Interactive platforms enabling user-generated content. Social media, cloud services, and centralized platforms dominate.",
      icon: <GlobalOutlined className="text-blue-500" />,
    },
    {
      title: "Web 3.0 (Present)",
      content:
        "Decentralized internet built on blockchain technology. Users own their data and digital assets with peer-to-peer interactions.",
      icon: <GlobalOutlined className="text-green-500" />,
    },
  ];

  // Web3 core concepts
  const coreConcepts = [
    {
      title: "Blockchain Technology",
      description:
        "A distributed, immutable ledger that records transactions across many computers. This ensures transparency, security, and eliminates the need for central authorities.",
      icon: <BlockOutlined className="text-4xl text-blue-500" />,
    },
    {
      title: "Decentralization",
      description:
        "Moving control and decision-making from centralized entities to distributed networks. This reduces single points of failure and censorship risks.",
      icon: <SafetyOutlined className="text-4xl text-green-500" />,
    },
    {
      title: "Smart Contracts",
      description:
        "Self-executing contracts with the terms directly written into code. They automatically enforce agreements without intermediaries.",
      icon: <CodeOutlined className="text-4xl text-purple-500" />,
    },
    {
      title: "Digital Ownership",
      description:
        "True ownership of digital assets through cryptographic proof, enabling users to control and transfer their assets without permission from platforms.",
      icon: <WalletOutlined className="text-4xl text-yellow-500" />,
    },
    {
      title: "Tokenization",
      description:
        "Representing real-world assets or utility as digital tokens on a blockchain, enabling fractional ownership and programmable assets.",
      icon: <DollarOutlined className="text-4xl text-red-500" />,
    },
    {
      title: "Cryptography",
      description:
        "Mathematical techniques for secure communication and verification of digital identities, ensuring privacy and security in a trustless environment.",
      icon: <LockOutlined className="text-4xl text-indigo-500" />,
    },
  ];

  // Learning path steps
  const learningSteps = [
    {
      title: "Understand the Basics",
      description:
        "Learn the fundamental concepts of blockchain, cryptocurrencies, and decentralization.",
      content: (
        <>
          <Paragraph className="dark:text-gray-300 text-lg">
            Start by understanding what makes Web3 different from the
            traditional internet. Familiarize yourself with key terms like
            blockchain, decentralization, and smart contracts.
          </Paragraph>
          <Title level={5} className="dark:text-white mt-4">
            Recommended Resources:
          </Title>
          <ul className="dark:text-gray-300 list-disc pl-5 space-y-2">
            <li>
              Blockchain Basics: How blocks are created, validated, and linked
            </li>
            <li>Decentralization: Why removing central authorities matters</li>
            <li>
              Consensus Mechanisms: How Proof of Work and Proof of Stake
              function
            </li>
          </ul>
        </>
      ),
    },
    {
      title: "Set Up Your First Wallet",
      description:
        "Create a cryptocurrency wallet to interact with Web3 applications.",
      content: (
        <>
          <Paragraph className="dark:text-gray-300 text-lg">
            A Web3 wallet is your gateway to the decentralized internet. It
            stores your digital assets and allows you to interact with
            decentralized applications (dApps).
          </Paragraph>
          <Title level={5} className="dark:text-white mt-4">
            Popular Wallet Options:
          </Title>
          <ul className="dark:text-gray-300 list-disc pl-5 space-y-2">
            <li>
              MetaMask: Browser extension wallet for Ethereum and EVM-compatible
              chains
            </li>
            <li>Trust Wallet: Mobile wallet supporting multiple blockchains</li>
            <li>Ledger: Hardware wallet for maximum security</li>
          </ul>
          <Paragraph className="dark:text-gray-300 text-lg mt-4">
            Remember to securely store your seed phrase - it's the only way to
            recover your wallet if you lose access!
          </Paragraph>
        </>
      ),
    },
    {
      title: "Explore Cryptocurrencies",
      description:
        "Learn about different types of cryptocurrencies and tokens.",
      content: (
        <>
          <Paragraph className="dark:text-gray-300 text-lg">
            Cryptocurrencies are the native assets of blockchain networks. They
            serve various purposes from payments to governance and utility
            within specific platforms.
          </Paragraph>
          <Title level={5} className="dark:text-white mt-4">
            Types of Tokens:
          </Title>
          <ul className="dark:text-gray-300 list-disc pl-5 space-y-2">
            <li>
              Currency Tokens: Used primarily as money (Bitcoin, Litecoin)
            </li>
            <li>
              Utility Tokens: Provide access to a product or service (Filecoin,
              Basic Attention Token)
            </li>
            <li>
              Governance Tokens: Allow holders to vote on protocol decisions
              (Uniswap, Aave)
            </li>
            <li>
              Security Tokens: Represent ownership in an asset or business
            </li>
            <li>
              Non-Fungible Tokens (NFTs): Unique digital assets representing
              ownership of specific items
            </li>
          </ul>
        </>
      ),
    },
    {
      title: "Understand Smart Contracts",
      description: "Learn how programmable agreements work on blockchains.",
      content: (
        <>
          <Paragraph className="dark:text-gray-300 text-lg">
            Smart contracts are self-executing programs that run on blockchains.
            They automatically enforce agreements when predefined conditions are
            met, without requiring intermediaries.
          </Paragraph>
          <Title level={5} className="dark:text-white mt-4">
            Key Characteristics:
          </Title>
          <ul className="dark:text-gray-300 list-disc pl-5 space-y-2">
            <li>Immutable: Once deployed, they cannot be changed</li>
            <li>Transparent: Anyone can verify the code and execution</li>
            <li>Trustless: No need to trust counterparties, only the code</li>
            <li>Deterministic: Same inputs always produce the same outputs</li>
          </ul>
          <Paragraph className="dark:text-gray-300 text-lg mt-4">
            Popular smart contract platforms include Ethereum, Solana, Cardano,
            and Polkadot, each with different approaches to scalability,
            security, and developer experience.
          </Paragraph>
        </>
      ),
    },
    {
      title: "Interact with DApps",
      description:
        "Start using decentralized applications across different categories.",
      content: (
        <>
          <Paragraph className="dark:text-gray-300 text-lg">
            Decentralized Applications (DApps) are applications that run on
            blockchain networks rather than centralized servers. They offer
            greater transparency, censorship resistance, and user control.
          </Paragraph>
          <Title level={5} className="dark:text-white mt-4">
            Popular DApp Categories:
          </Title>
          <ul className="dark:text-gray-300 list-disc pl-5 space-y-2">
            <li>
              Decentralized Finance (DeFi): Lending, borrowing, trading without
              banks
            </li>
            <li>
              NFT Marketplaces: Buy, sell, and create unique digital assets
            </li>
            <li>
              Decentralized Exchanges (DEXs): Trade cryptocurrencies without
              intermediaries
            </li>
            <li>
              Gaming: Play-to-earn games with true ownership of in-game assets
            </li>
            <li>
              Social Media: Platforms where users own their content and data
            </li>
          </ul>
        </>
      ),
    },
    {
      title: "Join DAOs",
      description: "Participate in Decentralized Autonomous Organizations.",
      content: (
        <>
          <Paragraph className="dark:text-gray-300 text-lg">
            Decentralized Autonomous Organizations (DAOs) are member-owned
            communities without centralized leadership. Decisions are made
            collectively through voting mechanisms, often using governance
            tokens.
          </Paragraph>
          <Title level={5} className="dark:text-white mt-4">
            How DAOs Work:
          </Title>
          <ul className="dark:text-gray-300 list-disc pl-5 space-y-2">
            <li>Governance: Token holders vote on proposals</li>
            <li>
              Treasury: Community-controlled funds for projects and initiatives
            </li>
            <li>Membership: Can be token-based or NFT-based</li>
            <li>
              Operations: Run through smart contracts and off-chain coordination
            </li>
          </ul>
          <Paragraph className="dark:text-gray-300 text-lg mt-4">
            DAOs exist for various purposes, from managing protocols to funding
            public goods, investing in projects, or coordinating social
            communities.
          </Paragraph>
        </>
      ),
    },
  ];

  // FAQ data
  const faqItems = [
    {
      question: "What is Web3?",
      answer:
        "Web3 refers to the next evolution of the internet, built on decentralized protocols using blockchain technology. It aims to reduce reliance on large tech companies by giving users ownership of their data and digital assets through peer-to-peer interactions.",
    },
    {
      question: "How is Web3 different from the current internet?",
      answer:
        "The current internet (Web2) is dominated by centralized platforms that control user data and content. Web3 shifts ownership and control to users through decentralized networks, allowing for direct peer-to-peer interactions without intermediaries, true ownership of digital assets, and censorship resistance.",
    },
    {
      question: "Do I need cryptocurrency to use Web3?",
      answer:
        "Yes, most Web3 applications require cryptocurrency for transactions, as they run on blockchain networks that use native tokens for fees. However, some applications are developing more user-friendly onboarding experiences that abstract away the complexity of cryptocurrency management.",
    },
    {
      question: "Is Web3 secure?",
      answer:
        "Web3 offers strong security through cryptography and decentralization, eliminating single points of failure. However, smart contract vulnerabilities, user errors (like losing private keys), and nascent infrastructure can still pose risks. Always research projects thoroughly and practice good security habits.",
    },
    {
      question: "What are the environmental concerns with Web3?",
      answer:
        "Early blockchain networks like Bitcoin use energy-intensive Proof of Work consensus mechanisms. However, many newer networks have adopted Proof of Stake and other energy-efficient alternatives that reduce environmental impact by over 99%. The industry continues to prioritize sustainability innovations.",
    },
    {
      question: "How can I start investing in Web3?",
      answer:
        "You can start by purchasing cryptocurrencies on regulated exchanges, investing in Web3 projects through tokens, or collecting NFTs. However, the space is highly volatile and speculative. It's important to do thorough research, only invest what you can afford to lose, and consider consulting a financial advisor.",
    },
  ];

  return (
    <Layout className="min-h-screen bg-gradient-to-b dark:from-[#0a0a0a] dark:to-[#1a1a1a] from-white to-gray-50 pt-24">
      <Content className="p-4 md:p-8">
        {/* Hero Section */}
        <div className="relative rounded-2xl overflow-hidden mb-12">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-80"></div>
          <div className="relative z-10 py-16 px-6 md:px-12 text-center">
            <h1 className="text-white text-4xl md:text-5xl font-bold mb-4">
              Web3: The Future of the Internet
            </h1>
            <Paragraph className="text-white/90 text-lg md:text-xl max-w-3xl mx-auto">
              Discover the decentralized web where users own their data, digital
              assets, and online experiences. Learn how blockchain technology is
              reshaping the internet.
            </Paragraph>
          </div>
        </div>

        {/* Introduction Section */}
        <div className="max-w-6xl mx-auto mb-16">
          <Row gutter={[32, 32]} align="middle">
            <Col xs={24} md={12}>
              <Title level={2} className="dark:text-white mb-6">
                What is Web3?
              </Title>
              <Paragraph className="dark:text-gray-300 text-lg">
                Web3 represents the next generation of the internet, built on
                decentralized protocols using blockchain technology and
                cryptocurrencies. It aims to create a more open, trustless, and
                permissionless web where users have greater control over their
                data and digital assets.
              </Paragraph>
              <Paragraph className="dark:text-gray-300 text-lg">
                Unlike the current internet dominated by large tech companies,
                Web3 shifts power back to users through peer-to-peer networks,
                enabling direct interactions without intermediaries and creating
                new economic models through tokenization.
              </Paragraph>
            </Col>
            <Col xs={24} md={12}>
              <div className="rounded-xl overflow-hidden shadow-lg">
                <Image
                  src="/image/web3.avif"
                  alt="Web3 Concept"
                  width={1000}
                  height={600}
                  className="w-full h-auto"
                />
              </div>
            </Col>
          </Row>
        </div>

        {/* Evolution Timeline */}
        <div className="max-w-6xl mx-auto mb-16 bg-white/5 dark:bg-black/20 p-8 rounded-2xl">
          <Title level={2} className="dark:text-white text-center pb-8">
            The Evolution of the Web
          </Title>
          <Timeline
            mode="alternate"
            items={evolutionTimeline.map((item, index) => ({
              color: ["blue", "green", "red"][index % 3],
              children: (
                <div>
                  <Title level={4} className="dark:text-white mb-2">
                    {item.icon} <span className="ml-2">{item.title}</span>
                  </Title>
                  <Paragraph className="dark:text-gray-300">
                    {item.content}
                  </Paragraph>
                </div>
              ),
            }))}
          />
        </div>

        {/* Core Concepts Section */}
        <div className="max-w-6xl mx-auto mb-16">
          <Title level={2} className="dark:text-white text-center mb-8">
            Core Concepts of Web3
          </Title>
          <Row gutter={[24, 24]}>
            {coreConcepts.map((concept, index) => (
              <Col xs={24} md={12} lg={8} key={index}>
                <Card
                  className="h-full dark:bg-white/5 bg-white/80 border dark:border-white/10 border-black/5 hover:shadow-lg transition-all duration-300"
                  variant="outlined"
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="mb-4">{concept.icon}</div>
                    <Title level={4} className="dark:text-white mb-3">
                      {concept.title}
                    </Title>
                    <Paragraph className="dark:text-gray-300">
                      {concept.description}
                    </Paragraph>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </div>

        {/* Learning Path Section */}
        <div className="max-w-6xl mx-auto mb-16">
          <Title
            level={2}
            className="dark:text-white text-black text-center mb-8"
          >
            Your Web3 Learning Path
          </Title>
          <Row gutter={[32, 32]}>
            <Col xs={24} lg={8}>
              <Steps
                direction="vertical"
                current={currentStep}
                onChange={setCurrentStep}
                items={learningSteps.map((step) => ({
                  title: (
                    <span className="dark:text-white text-black">
                      {step.title}
                    </span>
                  ),
                  description: (
                    <span className="dark:text-gray-400 text-gray-700">
                      {step.description}
                    </span>
                  ),
                }))}
              />
            </Col>
            <Col xs={24} lg={16}>
              <Card
                className="dark:bg-white/5 bg-white/80 border dark:border-white/10 border-black/5"
                variant="outlined"
              >
                {learningSteps[currentStep].content}
              </Card>
            </Col>
          </Row>
        </div>

        {/* Use Cases Section */}
        <div className="max-w-6xl mx-auto mb-16">
          <Title level={2} className="dark:text-white text-center mb-8">
            Real-World Applications of Web3
          </Title>
          <Row gutter={[24, 24]}>
            <Col xs={24} md={8}>
              <Card
                className="h-full dark:bg-white/5 bg-white/80 border dark:border-white/10 border-black/5"
                variant="outlined"
                cover={
                  <Image
                    alt="DeFi"
                    src="/image/defi-project.avif"
                    width={400}
                    height={200}
                    className="w-full h-48 object-cover"
                  />
                }
              >
                <Title level={4} className="dark:text-white">
                  Decentralized Finance (DeFi)
                </Title>
                <Paragraph className="dark:text-gray-300">
                  Financial services without banks or intermediaries. Users can
                  lend, borrow, trade, and earn interest on their assets through
                  smart contracts.
                </Paragraph>
              </Card>
            </Col>
            <Col xs={24} md={8}>
              <Card
                className="h-full dark:bg-white/5 bg-white/80 border dark:border-white/10 border-black/5"
                variant="outlined"
                cover={
                  <Image
                    alt="NFTs"
                    src="/image/nft-project.jpg"
                    width={400}
                    height={200}
                    className="w-full h-48 object-cover"
                  />
                }
              >
                <Title level={4} className="dark:text-white">
                  NFTs & Digital Ownership
                </Title>
                <Paragraph className="dark:text-gray-300">
                  True ownership of digital assets, from art and collectibles to
                  virtual real estate and in-game items, with provable scarcity
                  and authenticity.
                </Paragraph>
              </Card>
            </Col>
            <Col xs={24} md={8}>
              <Card
                className="h-full dark:bg-white/5 bg-white/80 border dark:border-white/10 border-black/5"
                variant="outlined"
                cover={
                  <Image
                    alt="DAOs"
                    src="/image/decentralized-project.jpg"
                    width={400}
                    height={200}
                    className="w-full h-48 object-cover"
                  />
                }
              >
                <Title level={4} className="dark:text-white">
                  Decentralized Organizations
                </Title>
                <Paragraph className="dark:text-gray-300">
                  Community-owned entities where decisions are made collectively
                  through voting, enabling new forms of coordination and
                  governance.
                </Paragraph>
              </Card>
            </Col>
          </Row>
        </div>

        {/* FAQ Section */}
        <div className="max-w-6xl mx-auto mb-16">
          <Title level={2} className="dark:text-white text-center mb-8">
            Frequently Asked Questions
          </Title>
          <Collapse
            className="dark:bg-white/5 bg-white/80 border dark:border-white/10 border-black/5"
            expandIcon={({ isActive }) => (
              <QuestionCircleOutlined
                rotate={isActive ? 90 : 0}
                className="text-blue-500"
              />
            )}
            items={faqItems.map((item, index) => ({
              key: index,
              label: (
                <span className="dark:text-white text-lg font-medium">
                  {item.question}
                </span>
              ),
              children: (
                <Paragraph className="dark:text-gray-300">
                  {item.answer}
                </Paragraph>
              ),
              className: "dark:border-gray-700",
            }))}
          />
        </div>

        {/* Next Steps Section */}
        <div className="max-w-6xl mx-auto text-center py-12 px-4 sm:px-6 lg:py-16 lg:px-8 bg-gradient-to-r dark:from-purple-900/30 dark:to-blue-900/30 from-purple-100 to-blue-100 rounded-2xl">
          <Title level={2} className="dark:text-white mb-6">
            Ready to Dive Deeper into Web3?
          </Title>
          <Paragraph className="dark:text-gray-300 text-lg max-w-3xl mx-auto mb-8">
            Now that you understand the basics of Web3, explore specific
            blockchain technologies and their applications in the trading world.
          </Paragraph>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/education/technical">
              <Button
                type="primary"
                size="large"
                icon={<RocketOutlined />}
                className="bg-blue-600 hover:bg-blue-700 h-12 px-8 text-lg"
              >
                Explore Trading Strategies
              </Button>
            </Link>
            <Link href="/market/crypto">
              <Button
                type="default"
                size="large"
                icon={<BlockOutlined />}
                className="h-12 px-8 text-lg"
              >
                View Crypto Markets
              </Button>
            </Link>
          </div>
        </div>

        {/* Additional Resources */}
        <div className="max-w-6xl mx-auto mt-16">
          <Divider className="dark:border-gray-800">
            <Text className="dark:text-gray-400">Additional Resources</Text>
          </Divider>
          <Row gutter={[16, 16]} className="text-center">
            <Col xs={24} sm={8}>
              <Link href="/education/markets">
                <Button
                  type="link"
                  className="dark:text-blue-400 text-blue-600"
                >
                  Explore Markets
                </Button>
              </Link>
            </Col>
            <Col xs={24} sm={8}>
              <Link href="/market/crypto">
                <Button
                  type="link"
                  className="dark:text-blue-400 text-blue-600"
                >
                  Cryptocurrency Trading
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
