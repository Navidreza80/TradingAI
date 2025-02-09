'use client'

import { Layout, Typography, Card, Space, Button, Image, List, Tag } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { ConfigProvider } from 'antd';
import fa_IR from 'antd/locale/fa_IR';
import Link from 'next/link';
import { technicalAnalysis } from '../../data';
import { useParams } from 'next/navigation';
const DEFAULT_IMAGE = 'https://media.salameno.com/d/2022/07/25/3/15384301.jpg?ts=1658737063000';

const { Header, Content } = Layout;
const { Title, Text, Paragraph } = Typography;

export default function TechnicalAnalysisDetailPage() {
    const params = useParams();
    const analysis = technicalAnalysis[parseInt(params.id as string)];

    if (!analysis) return null;

    // تبدیل متن توضیحات به پاراگراف‌های مجزا
    const descriptionParagraphs = analysis.description.split('\n\n').filter(p => p.trim());

    return (
        <ConfigProvider locale={fa_IR} direction="rtl">
            <Layout className="min-h-screen bg-gradient-to-b dark:from-[#0a0a0a] dark:to-[#1a1a1a] from-white to-gray-50">
                <Header className="flex mt-16 items-center justify-between bg-transparent px-16">
                    <Title level={3} style={{ color: 'white', margin: 0 }}>{analysis.title}</Title>
                    <Link href="/education/technical">
                        <Button type="primary" icon={<ArrowLeftOutlined />}>
                            بازگشت به لیست
                        </Button>
                    </Link>
                </Header>

                <Content className="p-6">
                    <div className="max-w-4xl mx-auto">
                        <Card className="dark:bg-white/5 bg-white/80 dark:border-white/10 border-black/5">
                            <Space direction="vertical" size="large" className="w-full">
                                <div className="relative h-96 w-full">
                                    <Image
                                        src={analysis.image || DEFAULT_IMAGE}
                                        alt={analysis.title}
                                        className="object-contain"
                                        width="100%"
                                        height="100%"
                                    />
                                </div>

                                {/* نمایش توضیحات به صورت پاراگراف‌های مجزا */}
                                <div className="space-y-6">
                                    {descriptionParagraphs.map((paragraph, index) => {
                                        // بررسی اگر پاراگراف عنوان است
                                        if (paragraph.includes(':')) {
                                            const [title, content] = paragraph.split(':');
                                            return (
                                                <div key={index} className="mb-4">
                                                    <h2  className="dark:text-white text-gray-900 text-lg block mb-2">
                                                        {title.trim()}:
                                                    </h2>
                                                    <p className="dark:text-white text-gray-500 text-base whitespace-pre-line mr-4">
                                                        {content.trim()}
                                                    </p>
                                                </div>
                                            );
                                        }
                                        // پاراگراف معمولی
                                        return (
                                            <p key={index} className="dark:text-white text-gray-500 text-base whitespace-pre-line">
                                                {paragraph.trim()}
                                            </p>
                                        );
                                    })}
                                </div>

                                <div>
                                    <h2 className="dark:text-white text-gray-900 font-semibold block mb-2 text-lg">
                                        اندیکاتورهای مرتبط:
                                    </h2>
                                    <Space wrap>
                                        {analysis.indicators.map((indicator, i) => (
                                            <Tag key={i} color="blue" className="text-lg py-1 px-3">
                                                {indicator}
                                            </Tag>
                                        ))}
                                    </Space>
                                </div>

                                <div>
                                    <h2 className="dark:text-white text-gray-900 font-semibold block mb-2 text-lg">
                                        نکات کلیدی:
                                    </h2>
                                    <List
                                        dataSource={analysis.tips}
                                        renderItem={tip => (
                                            <List.Item>
                                                <h2 className="dark:text-white text-gray-800 text-lg">• {tip}</h2>
                                            </List.Item>
                                        )}
                                    />
                                </div>
                            </Space>
                        </Card>
                    </div>
                </Content>
            </Layout>
        </ConfigProvider>
    );
} 