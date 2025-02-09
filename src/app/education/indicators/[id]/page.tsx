'use client'

import { Layout, Typography, Card, Space, Button, Image } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { ConfigProvider } from 'antd';
import fa_IR from 'antd/locale/fa_IR';
import Link from 'next/link';
import { indicators } from '../../data';
import { useParams } from 'next/navigation';

const { Header, Content } = Layout;
const { Title, Text, Paragraph } = Typography;

const DEFAULT_IMAGE = 'https://media.salameno.com/d/2022/07/25/3/15384301.jpg?ts=1658737063000';

export default function IndicatorDetail() {
    const params = useParams();
    const indicator = indicators[Number(params.id)];

    return (
        <ConfigProvider locale={fa_IR} direction="rtl">
            <Layout className="min-h-screen bg-gradient-to-b dark:from-[#0a0a0a] dark:to-[#1a1a1a] from-white to-gray-50">
                <Header className="flex mt-16 items-center justify-between bg-transparent px-16">
                <Title level={3} style={{ color: 'white', margin: 0 }}>توضیحات اندیکاتور</Title>
                    <Link href="/education/indicators">
                        <Button type="primary" icon={<ArrowLeftOutlined />}>
                            بازگشت
                        </Button>
                    </Link>
                </Header>

                <Content className="p-6">
                    <div className="max-w-4xl mx-auto">
                        <Card className="dark:bg-white/5 bg-white/80 dark:border-white/10 border-black/5">
                            <Space direction="vertical" size="large" className="w-full">
                                <h3 className='dark:text-white text-black text-2xl font-semibold ' style={{ margin: 0 }}>{indicator.title}</h3>
                                {/* Image with fixed dimensions and fallback */}
                                <div className="w-full flex justify-center">
                                    <Image
                                        alt={indicator.title}
                                        src={indicator.image || DEFAULT_IMAGE}
                                        width={600}
                                        height={400}
                                        style={{
                                            objectFit: 'contain',
                                            backgroundColor: '#1f2937'
                                        }}
                                        fallback={DEFAULT_IMAGE}
                                        preview={false}
                                    />
                                </div>

                                {/* توضیحات با استایل جدید */}
                                <div>
                                    <h4 className='dark:text-white text-black text-xl font-semibold'  style={{ margin: 0 }}>توضیحات</h4>
                                    <div className="dark:text-white text-gray-600 text-lg leading-8 whitespace-pre-line"
                                        style={{
                                            fontSize: '16px',
                                            lineHeight: '2',
                                            textAlign: 'justify',
                                            padding: '10px 0'
                                        }}>
                                        {indicator.description}
                                    </div>
                                </div>

                                {/* تنظیمات با استایل جدید */}
                                {indicator.settings && indicator.settings.length > 0 && (
                                    <div>
                                        <h4 className='dark:text-white text-black text-xl font-semibold' style={{ margin: 0 }}>تنظیمات</h4>
                                        <ul className="list-disc list-inside text-gray-200 text-lg leading-8">
                                            {indicator.settings.map((setting, index) => (
                                                <li key={index} className=" dark:text-white text-gray-600 mb-2">{setting}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {/* نکات با استایل جدید */}
                                {indicator.tips && indicator.tips.length > 0 && (
                                    <div>
                                        <h4 className='dark:text-white text-black text-xl font-semibold' style={{ margin: 0 }}>نکات کلیدی</h4>
                                        <ul className="list-disc list-inside text-gray-200 text-lg leading-8">
                                            {indicator.tips.map((tip, index) => (
                                                <li key={index} className="dark:text-white text-gray-600 mb-2">{tip}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </Space>
                        </Card>
                    </div>
                </Content>
            </Layout>
        </ConfigProvider>
    );
} 