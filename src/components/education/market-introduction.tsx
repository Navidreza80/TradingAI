/* eslint-disable */
// antd components
import { Col, Row, Typography } from "antd";
// Next built in components
import Image from "next/image";

// antd typography
const { Title, Paragraph } = Typography;

export default function MarketIntroduction() {
  return (
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
            As a trader, understanding the unique aspects of each market will
            help you decide which ones best suit your trading style, capital,
            and goals. Let's explore the major markets available to traders
            today.
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
  );
}
