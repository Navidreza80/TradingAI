// antd components
import { Card, Col, Row, Typography } from "antd";
// Next built in component

// antd typography
const { Title, Paragraph } = Typography;

export default function MarketTips() {
    const howToChooseItems = [
        {
          title: "Consider Your Capital",
          description:
            "Different markets require different amounts of starting capital. Forex and crypto can be started with smaller amounts, while stocks and commodities often require more.",
        },
        {
          title: "Assess Your Knowledge",
          description:
            "Start with markets you understand or are willing to learn about. Your interest in a particular market will help sustain your motivation to learn and improve.",
        },
        {
          title: "Evaluate Your Schedule",
          description:
            "Consider when you can trade. If you have a full-time job, markets with extended hours like forex or crypto might be more suitable than stock markets.",
        },
      ];
    return (
        <div className="max-w-6xl mx-auto mb-16">
        <Title level={2} className="dark:text-white text-center mb-8">
          How to Choose the Right Market
        </Title>
        <Row gutter={[24, 24]}>
          {howToChooseItems.map((item, index) => {
            return (
              <Col key={index} xs={24} md={8}>
                <Card
                  className="h-full dark:bg-white/5 bg-white/80 border dark:border-white/10 border-black/5"
                  variant="outlined"
                >
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
    )
}