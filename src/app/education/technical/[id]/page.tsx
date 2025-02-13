'use client'

import { Layout, Typography, Card, Space, Button, Image, List, Tag } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { ConfigProvider } from 'antd';
import fa_IR from 'antd/locale/fa_IR';
import Link from 'next/link';
import { technicalAnalysis } from '../../data';
import { useParams } from 'next/navigation';


const { Header, Content } = Layout;
const { Title, Text, Paragraph } = Typography;

export default function TechnicalAnalysisDetailPage() {
    const params = useParams();
    const analysis = technicalAnalysis[parseInt(params.id as string)];
    const DEFAULT_IMAGE = 'https://nobitex.ir/mag/wp-content/uploads//2023/08/01-%D8%AA%D8%AD%D9%84%DB%8C%D9%84-%D8%AA%DA%A9%D9%86%DB%8C%DA%A9%D8%A7%D9%84.jpg';
    if (!analysis) return null;

    // تبدیل متن توضیحات به پاراگراف‌های مجزا
    const descriptionParagraphs = analysis.description.split('\n\n').filter(p => p.trim());

    return (
        <ConfigProvider locale={fa_IR} direction="rtl">
            <Layout className="min-h-screen bg-gradient-to-b dark:from-[#0a0a0a] dark:to-[#1a1a1a] from-white to-gray-50">
                <Header className="flex mt-16 items-center justify-between bg-transparent px-32">
                    <h3 className='dark:text-white text-black font-bold text-2xl' style={{ margin: 0 }}>{analysis.title}</h3>
                    <Link href="/education/technical">
                        <Button type="primary" icon={<ArrowLeftOutlined />}>
                            بازگشت 
                        </Button>
                    </Link>
                </Header>

                <Content className="p-6">
                    <div className="max-w-4xl mx-auto">
                        <Card className="dark:bg-white/5 bg-white/80 dark:border-white/10 border-black/5">
                            <Space direction="vertical" size="large" className="w-full">
                                <h1 className='dark:text-white text-gray-900 font-serif font-extrabold text-3xl'>{analysis.name}</h1>
                                <div className="relative h-96 w-full">
                                    <Image
                                        src={analysis.image || DEFAULT_IMAGE}
                                        alt={analysis.name}
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
                            </Space>
                        </Card>
                    </div>
                </Content>
            </Layout>
        </ConfigProvider>
    );
} 