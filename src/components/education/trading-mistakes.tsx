// antd components
import { Card, Col, Row, Typography } from "antd";

// antd typography
const { Title, Paragraph } = Typography;

export default function TradingMistakes() {
  // Trading mistakes items
  const tradingMistakes = [
    {
      title: "Overtrading",
      description:
        "Trading too frequently can lead to poor decision-making and increased transaction costs. Quality trades are more important than quantity.",
    },
    {
      title: "Neglecting Education",
      description:
        "Successful trading requires continuous learning. Invest time in understanding markets, strategies, and risk management techniques.",
    },
    {
      title: "Emotional Trading",
      description:
        "Fear and greed can cloud judgment. Develop a trading plan and stick to it, avoiding impulsive decisions based on emotions.",
    },
  ];
  return (
    <div className="max-w-6xl mx-auto mb-16">
      <Title level={2} className="dark:text-white text-center mb-8">
        Common Beginner Mistakes to Avoid
      </Title>
      <Row gutter={[24, 24]}>
        {tradingMistakes.map((item, index) => {
          return (
            <Col xs={24} md={8} key={index}>
              <Card className="h-full dark:bg-white/5 bg-white/80 border dark:border-white/10 border-black/5">
                <Title level={4} className="dark:text-white">
                  {item.title}
                </Title>
                <Paragraph className="dark:text-gray-300">
                  {item.description}
                </Paragraph>
              </Card>
            </Col>
          );
        })}
      </Row>
    </div>
  );
}
