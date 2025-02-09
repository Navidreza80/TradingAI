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
        icon: <LineChartOutlined className="text-6xl text-blue-500" />,
        link: '/education/technical',
        image: 'https://www.tradingview.com/x/YZm8T8bf/'
    },
    {
        title: 'اندیکاتورها',
        description: 'آموزش جامع اندیکاتورها و نحوه استفاده از آنها',
        icon: <AreaChartOutlined className="text-6xl text-purple-500" />,
        link: '/education/indicators',
        image: 'https://www.tradingview.com/x/NqWZ6Yv8/'
    },
];

export default function EducationPage() {
    const router = useRouter();

    return (
        <ConfigProvider locale={fa_IR} direction="rtl">
            <Layout className="min-h-screen bg-gradient-to-b dark:from-[#0a0a0a] dark:to-[#1a1a1a] from-white to-gray-50">
                <Header className='bg-gradient-to-b dark:from-[#0a0a0a] dark:to-[#0a0a0a] from-white to-gray-50'></Header>
                <Content className="p-6">
                    <div className="max-w-7xl mx-auto">
                        <Row gutter={[24, 24]} className="mt-8 gap-4">
                            {educationSections.map((section, index) => (
                                <Col xs={24} sm={12} md={12} lg={6} key={index}>
                                    <Card
                                        hoverable
                                        className="w-80 rounded-2xl overflow-hidden dark:border-white/10 border-black/5 border backdrop-blur-xl dark:bg-white/5 bg-white/80 dark:hover:bg-white/10 hover:bg-white/90 transition-all duration-300 hover:scale-[1.02] dark:hover:shadow-[0_0_30px_rgba(24,144,255,0.1)] hover:shadow-[0_0_30px_rgba(24,144,255,0.2)] h-full transition-all duration-300 hover:transform hover:scale-105"
                                        cover={
                                            <div className="relative h-80 overflow-hidden">
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
                                            title={<h1 className="dark:text-white text-black text-lg font-bold text-center block">{section.title}</h1>}
                                            description={<h1 className="dark:text-white text-gray-900 text-center block mt-2">{section.description}</h1>}
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