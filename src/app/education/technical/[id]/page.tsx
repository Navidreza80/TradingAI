'use client'

import { Layout, Typography, Card, Space, Button, Image, List, Tag } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { ConfigProvider } from 'antd';
import fa_IR from 'antd/locale/fa_IR';
import Link from 'next/link';
import { technicalAnalysis } from '../../data';
import { useParams } from 'next/navigation';
import style from './style.module.css';

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
                <Header className={` flex mt-16 items-center justify-between bg-transparent px-32 ${style.Header}`}>
                    <h3 className={` dark:text-white text-black font-bold text-2xl ${style.titleTop}`} style={{ margin: 0 }}>{analysis.name}</h3>
                    <Link href="/education/technical">
                        <Button className={`${style.return}`} type="primary" icon={<ArrowLeftOutlined />}>
                            بازگشت 
                        </Button>
                        <Button className={`${style.returnRes}`} type="primary" icon={<ArrowLeftOutlined className='dark:text-white text-black'/>}> </Button>
                    </Link>
                </Header>

                <Content className="p-6">
                    <div className={` max-w-4xl mx-auto ${style.CardHolder}`}>
                        <Card className={` dark:bg-white/5 bg-white/80 dark:border-white/10 border-black/5`}>
                            <Space direction="vertical" size="large" className="w-full">
                               
                                <div className={`${style.ImageHolder} relative h-96 w-full`}>
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
                                                    <h1 className={`${style.titleDesc} dark:text-white my-1 text-black font-bold text-xl`} >
                                                        {title.trim()}:
                                                    </h1>
                                                    <p className={`${style.ParagraphDesc} dark:text-[#cacaca] text-gray-500 text-base whitespace-pre-line mr-4`}>
                                                        {content.trim()}
                                                    </p>
                                                </div>
                                            );
                                        }
                                        // پاراگراف معمولی
                                        return (
                                            <p key={index} className={`${style.ParagraphDesc} dark:text-[#cacaca] text-gray-500 text-base whitespace-pre-line mr-4`}>
                                                {paragraph.trim()}
                                            </p>
                                        );
                                    })}
                                </div>

                                <div>
                                    <h2 className={`${style.ParagraphDesc} dark:text-white mb-4 text-black font-bold text-xl`}>
                                        اندیکاتورهای مرتبط:
                                    </h2>
                                    <Space wrap>
                                        {analysis.indicators.map((indicator, i) => (
                                            <Tag key={i} color="blue" className={`${style.indicator} text-lg py-1 px-3`}>
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