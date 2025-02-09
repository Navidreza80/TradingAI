'use client'

import { Layout, Typography, Card, Row, Col, Button } from 'antd';
import { LineChartOutlined, BookOutlined, BarChartOutlined, TeamOutlined, AreaChartOutlined } from '@ant-design/icons';
import { ConfigProvider } from 'antd';
import fa_IR from 'antd/locale/fa_IR';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const { Header, Content } = Layout;
const { Title, Text } = Typography;
const { Meta } = Card;

const educationSections = [
    {
        title: 'تحلیل تکنیکال',
        description: 'آموزش جامع تحلیل تکنیکال و الگوهای نموداری',
        icon: <LineChartOutlined className="text-4xl text-blue-500" />,
        link: '/education/technical',
        image: 'https://www.tradingview.com/x/YZm8T8bf/'
    },
    {
        title: 'اندیکاتورها',
        description: 'آموزش جامع اندیکاتورها و نحوه استفاده از آنها',
        icon: <AreaChartOutlined className="text-4xl text-purple-500" />,
        link: '/education/indicators',
        image: 'https://www.tradingview.com/x/NqWZ6Yv8/'
    },
];

export default function EducationPage() {
    const router = useRouter();

    return (
        <ConfigProvider locale={fa_IR} direction="rtl">
            <Layout className="min-h-screen bg-gray-900">
                <Header >
                </Header>
                <Content className="p-6">
                    <div className="max-w-7xl mx-auto">
                        <Row gutter={[24, 24]} className="mt-8">
                            {educationSections.map((section, index) => (
                                <Col xs={24} sm={12} md={12} lg={6} key={index}>
                                    <Card
                                        hoverable
                                        className="bg-gray-800 border-gray-700 h-full transition-all duration-300 hover:transform hover:scale-105"
                                        cover={
                                            <div className="relative h-48 overflow-hidden">
                                                <div 
                                                    className="absolute inset-0 bg-center bg-cover"
                                                    style={{
                                                        backgroundImage: `url(${section.image})`,
                                                        filter: 'brightness(0.7)'
                                                    }}
                                                />
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    {section.icon}
                                                </div>
                                            </div>
                                        }
                                        onClick={() => router.push(section.link)}
                                    >
                                        <Meta
                                            title={<Text className="text-white text-lg font-bold text-center block">{section.title}</Text>}
                                            description={<Text className="text-gray-400 text-center block mt-2">{section.description}</Text>}
                                        />
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </div>
                </Content>
            </Layout>
        </ConfigProvider>
    );
} 