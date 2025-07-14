/* eslint-disable */
// Next built in components
import Image from "next/image";
// antd components
import { Col, Row, Typography } from "antd";

// antd typography
const { Title, Paragraph } = Typography;

export default function Introduction() {
  return (
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
            manageable concepts and taking a step-by-step approach, you'll gain
            the knowledge and confidence to make informed trading decisions.
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
  );
}
