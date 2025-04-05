"use client";
// Icons
import {
  BankOutlined,
  CommentOutlined,
  DollarOutlined,
  GlobalOutlined,
  GoldOutlined,
  LikeOutlined,
  PlusOutlined,
  RiseOutlined,
  SearchOutlined,
  ShareAltOutlined,
  UserOutlined,
} from "@ant-design/icons";
// antd components
import {
  Avatar,
  Button,
  Card,
  Col,
  Divider,
  Empty,
  Form,
  Input,
  Layout,
  List,
  Modal,
  Row,
  Select,
  Space,
  Tabs,
  Tag,
  Typography,
  message,
} from "antd";
// React built in hook
import { useState } from "react";

// antd layout
const { Content } = Layout;
// antd typography
const { Title, Paragraph, Text } = Typography;
// antd text area
const { TextArea } = Input;
// antd select option
const { Option } = Select;

// Mock data for suggestions
const initialSuggestions = [
  {
    id: 1,
    author: "TradingPro",
    avatar: "/image/avatars/avatar1.png",
    market: "forex",
    title: "EUR/USD Trend Analysis",
    content:
      "Based on recent economic data from the EU and US, I'm seeing a potential bullish trend for EUR/USD in the coming weeks. The ECB's hawkish stance combined with slowing US inflation could push the pair above 1.12.",
    tags: ["EUR/USD", "Bullish", "Economic Data"],
    likes: 24,
    comments: 8,
    timestamp: "2 hours ago",
  },
  {
    id: 2,
    author: "CryptoWhale",
    avatar: "/image/avatars/avatar2.png",
    market: "crypto",
    title: "Bitcoin's Support Level",
    content:
      "Bitcoin has established a strong support level at $38,000. The on-chain data shows accumulation by long-term holders, which historically precedes major upward movements. Watch for a potential breakout above $42,000.",
    tags: ["Bitcoin", "Support Level", "On-Chain Analysis"],
    likes: 56,
    comments: 12,
    timestamp: "5 hours ago",
  },
  {
    id: 3,
    author: "StockGuru",
    avatar: "/image/avatars/avatar3.png",
    market: "stocks",
    title: "Tech Sector Rotation",
    content:
      "I'm noticing a sector rotation from high-growth tech stocks to value-oriented tech companies. Companies with strong cash flows and reasonable P/E ratios are outperforming speculative tech plays. Consider adjusting your portfolio accordingly.",
    tags: ["Tech Stocks", "Sector Rotation", "Value Investing"],
    likes: 42,
    comments: 15,
    timestamp: "1 day ago",
  },
  {
    id: 4,
    author: "GoldBug",
    avatar: "/image/avatars/avatar4.png",
    market: "commodities",
    title: "Gold as Inflation Hedge",
    content:
      "With inflation concerns persisting, gold is regaining its status as a premier inflation hedge. Technical analysis shows a cup and handle pattern forming on the daily chart, suggesting a potential move to $2,100/oz in the near term.",
    tags: ["Gold", "Inflation Hedge", "Technical Analysis"],
    likes: 31,
    comments: 7,
    timestamp: "2 days ago",
  },
  {
    id: 5,
    author: "OptionsMaster",
    avatar: "/image/avatars/avatar5.png",
    market: "derivatives",
    title: "VIX Options Strategy",
    content:
      "The current low VIX environment presents an opportunity for a calendar spread strategy. Consider buying longer-dated VIX calls while selling shorter-dated calls to capitalize on potential volatility expansion in the coming months.",
    tags: ["VIX", "Options Strategy", "Volatility"],
    likes: 19,
    comments: 5,
    timestamp: "3 days ago",
  },
];

export default function SuggestionsPage() {
  // State to save users suggestions
  const [suggestions, setSuggestions] = useState(initialSuggestions);
  // State to save modal is open status
  const [isModalOpen, setIsModalOpen] = useState(false);
  // antd Form
  const [form] = Form.useForm();
  // State to save active tab
  const [activeTab, setActiveTab] = useState("all");
  // State to save searched text
  const [searchText, setSearchText] = useState("");

  // Market icons mapping
  const marketIcons = {
    stocks: <BankOutlined className="text-blue-500" />,
    forex: <GlobalOutlined className="text-green-500" />,
    crypto: <DollarOutlined className="text-purple-500" />,
    commodities: <GoldOutlined className="text-yellow-500" />,
    derivatives: <RiseOutlined className="text-red-500" />,
    all: <ShareAltOutlined className="text-gray-500" />,
  };

  // Filter suggestions based on active tab and search text
  const filteredSuggestions = suggestions.filter((suggestion) => {
    const matchesTab = activeTab === "all" || suggestion.market === activeTab;
    const matchesSearch =
      searchText === "" ||
      suggestion.title.toLowerCase().includes(searchText.toLowerCase()) ||
      suggestion.content.toLowerCase().includes(searchText.toLowerCase()) ||
      suggestion.tags.some((tag) =>
        tag.toLowerCase().includes(searchText.toLowerCase())
      );
    return matchesTab && matchesSearch;
  });

  // Handle form submission for new suggestion
  const handleSubmit = (values) => {
    const newSuggestion = {
      id: suggestions.length + 1,
      author: "You", // In a real app, this would be the logged-in user
      avatar: "/image/avatars/you.png",
      market: values.market,
      title: values.title,
      content: values.content,
      tags: values.tags ? values.tags.split(",").map((tag) => tag.trim()) : [],
      likes: 0,
      comments: 0,
      timestamp: "Just now",
    };

    setSuggestions([newSuggestion, ...suggestions]);
    setIsModalOpen(false);
    form.resetFields();
    message.success("Your suggestion has been shared!");
  };

  // Handle like action
  const handleLike = (id) => {
    setSuggestions(
      suggestions.map((suggestion) =>
        suggestion.id === id
          ? { ...suggestion, likes: suggestion.likes + 1 }
          : suggestion
      )
    );
  };

  return (
    <Layout className="min-h-screen bg-gradient-to-b dark:from-[#0a0a0a] dark:to-[#1a1a1a] from-white to-gray-50 pt-24">
      <Content className="p-4 md:p-8">
        {/* Hero Section */}
        <div className="relative rounded-2xl overflow-hidden mb-12">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-80"></div>
          <div className="relative z-10 py-16 px-6 md:px-12 text-center">
            <h1 className="text-white text-4xl md:text-5xl font-bold mb-4">
              Trading Suggestions
            </h1>
            <Paragraph className="text-white/90 text-lg md:text-xl max-w-3xl mx-auto">
              Share your market insights and discover trading ideas from the
              community. Collaborate, learn, and improve your trading strategies
              together.
            </Paragraph>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto">
          {/* Action Bar */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
            <div className="w-full md:w-auto">
              <Input
                prefix={<SearchOutlined className="text-gray-400" />}
                placeholder="Search suggestions..."
                className="w-full md:w-80"
                onChange={(e) => setSearchText(e.target.value)}
              />
            </div>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              size="large"
              onClick={() => setIsModalOpen(true)}
              className="bg-indigo-600 hover:bg-indigo-700 w-full md:w-auto"
            >
              Share Your Suggestion
            </Button>
          </div>

          {/* Tabs for filtering by market */}
          <Tabs
            activeKey={activeTab}
            onChange={setActiveTab}
            className="market-tabs mb-8"
            items={[
              {
                key: "all",
                label: (
                  <span className="flex items-center gap-2">
                    {marketIcons.all}
                    <span>All Markets</span>
                  </span>
                ),
              },
              {
                key: "stocks",
                label: (
                  <span className="flex items-center gap-2">
                    {marketIcons.stocks}
                    <span>Stocks</span>
                  </span>
                ),
              },
              {
                key: "forex",
                label: (
                  <span className="flex items-center gap-2">
                    {marketIcons.forex}
                    <span>Forex</span>
                  </span>
                ),
              },
              {
                key: "crypto",
                label: (
                  <span className="flex items-center gap-2">
                    {marketIcons.crypto}
                    <span>Crypto</span>
                  </span>
                ),
              },
              {
                key: "commodities",
                label: (
                  <span className="flex items-center gap-2">
                    {marketIcons.commodities}
                    <span>Commodities</span>
                  </span>
                ),
              },
              {
                key: "derivatives",
                label: (
                  <span className="flex items-center gap-2">
                    {marketIcons.derivatives}
                    <span>Derivatives</span>
                  </span>
                ),
              },
            ]}
          />

          {/* Suggestions List */}
          {filteredSuggestions.length > 0 ? (
            <List
              itemLayout="vertical"
              size="large"
              dataSource={filteredSuggestions}
              renderItem={(item) => (
                <List.Item
                  key={item.id}
                  actions={[
                    <Button
                      key="like"
                      type="text"
                      icon={<LikeOutlined />}
                      onClick={() => handleLike(item.id)}
                    >
                      {item.likes}
                    </Button>,
                    <Button
                      key="comment"
                      type="text"
                      icon={<CommentOutlined />}
                    >
                      {item.comments}
                    </Button>,
                    <Button key="share" type="text" icon={<ShareAltOutlined />}>
                      Share
                    </Button>,
                  ]}
                >
                  <Card
                    className="w-full dark:bg-white/5 bg-white/80 border dark:border-white/10 border-black/5 hover:shadow-md transition-all duration-300"
                    variant="outlined"
                  >
                    <div className="flex items-center mb-4">
                      <Avatar src={item.avatar} icon={<UserOutlined />} />
                      <div className="ml-3">
                        <Text className="font-medium dark:text-white">
                          {item.author}
                        </Text>
                        <div className="flex items-center gap-2">
                          <Text type="secondary" className="text-xs">
                            {item.timestamp}
                          </Text>
                          <span className="text-gray-400">•</span>
                          <Tag
                            icon={marketIcons[item.market]}
                            color={
                              item.market === "stocks"
                                ? "blue"
                                : item.market === "forex"
                                ? "green"
                                : item.market === "crypto"
                                ? "purple"
                                : item.market === "commodities"
                                ? "gold"
                                : "red"
                            }
                          >
                            {item.market.charAt(0).toUpperCase() +
                              item.market.slice(1)}
                          </Tag>
                        </div>
                      </div>
                    </div>

                    <Title level={4} className="dark:text-white mb-2">
                      {item.title}
                    </Title>
                    <Paragraph className="dark:text-gray-300 mb-4">
                      {item.content}
                    </Paragraph>

                    <div className="flex flex-wrap gap-2">
                      {item.tags.map((tag, index) => (
                        <Tag key={index} className="mr-0">
                          {tag}
                        </Tag>
                      ))}
                    </div>
                  </Card>
                </List.Item>
              )}
              pagination={{
                onChange: (page) => {
                  window.scrollTo(0, 0);
                },
                pageSize: 5,
              }}
            />
          ) : (
            <Empty
              description={
                <span className="dark:text-gray-300">
                  No suggestions found. Try adjusting your filters or be the
                  first to share!
                </span>
              }
            />
          )}
        </div>

        {/* New Suggestion Modal */}
        <Modal
          title="Share Your Trading Suggestion"
          open={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          footer={null}
          width={700}
        >
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            initialValues={{ market: "stocks" }}
          >
            <Form.Item
              name="title"
              label="Title"
              rules={[
                { required: true, message: "Please enter a title" },
                { max: 100, message: "Title cannot exceed 100 characters" },
              ]}
            >
              <Input placeholder="Enter a clear, concise title for your suggestion" />
            </Form.Item>

            <Form.Item
              name="market"
              label="Market"
              rules={[{ required: true, message: "Please select a market" }]}
            >
              <Select placeholder="Select the relevant market">
                <Option value="stocks">Stocks</Option>
                <Option value="forex">Forex</Option>
                <Option value="crypto">Cryptocurrency</Option>
                <Option value="commodities">Commodities</Option>
                <Option value="derivatives">Derivatives</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="content"
              label="Your Suggestion"
              rules={[
                { required: true, message: "Please enter your suggestion" },
                {
                  min: 50,
                  message: "Suggestion should be at least 50 characters",
                },
              ]}
            >
              <TextArea
                placeholder="Share your analysis, insights, or trading idea in detail..."
                rows={6}
              />
            </Form.Item>

            <Form.Item
              name="tags"
              label="Tags (comma separated)"
              tooltip="Add relevant tags to help others find your suggestion"
            >
              <Input placeholder="e.g., Bitcoin, Technical Analysis, Breakout" />
            </Form.Item>

            <Form.Item className="mb-0">
              <Space className="w-full justify-end">
                <Button onClick={() => setIsModalOpen(false)}>Cancel</Button>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="bg-indigo-600 hover:bg-indigo-700"
                >
                  Share Suggestion
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Modal>

        {/* Community Guidelines */}
        <div className="max-w-6xl mx-auto mt-16">
          <Divider className="dark:border-gray-800">
            <Text className="dark:text-gray-400">Community Guidelines</Text>
          </Divider>
          <Row gutter={[24, 24]} className="text-center">
            <Col xs={24} md={8}>
              <Title level={5} className="dark:text-white">
                Be Respectful
              </Title>
              <Paragraph className="dark:text-gray-300">
                Treat others with respect. Constructive criticism is welcome,
                but harassment is not.
              </Paragraph>
            </Col>
            <Col xs={24} md={8}>
              <Title level={5} className="dark:text-white">
                Share Quality Content
              </Title>
              <Paragraph className="dark:text-gray-300">
                Provide thoughtful analysis and reasoning behind your
                suggestions. Avoid low-effort posts.
              </Paragraph>
            </Col>
            <Col xs={24} md={8}>
              <Title level={5} className="dark:text-white">
                Not Financial Advice
              </Title>
              <Paragraph className="dark:text-gray-300">
                Remember that suggestions shared here are for educational
                purposes only, not financial advice.
              </Paragraph>
            </Col>
          </Row>
        </div>
      </Content>
    </Layout>
  );
}
