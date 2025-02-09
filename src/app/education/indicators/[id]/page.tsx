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
            <Layout className="min-h-screen bg-gray-900">
                <Header className="flex mt-16 items-center justify-between bg-gray-900 px-16">
                <Title level={3} style={{ color: 'white', margin: 0 }}>توضیحات اندیکاتور</Title>
                    <Link href="/education/indicators">
                        <Button type="primary" icon={<ArrowLeftOutlined />}>
                            بازگشت
                        </Button>
                    </Link>
                </Header>

                <Content className="p-6">
                    <div className="max-w-4xl mx-auto">
                        <Card className="bg-gray-800">
                            <Space direction="vertical" size="large" className="w-full">
                                <Title level={3} style={{ color: 'white', margin: 0 }}>{indicator.title}</Title>
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
                                    <Title level={4} style={{ color: 'white', margin: 0 }}>توضیحات</Title>
                                    <div className="text-gray-200 text-lg leading-8 whitespace-pre-line"
                                        style={{
                                            fontSize: '16px',
                                            lineHeight: '2',
                                            color: '#e5e7eb',
                                            textAlign: 'justify',
                                            padding: '10px 0'
                                        }}>
                                        {indicator.description}
                                    </div>
                                </div>

                                {/* تنظیمات با استایل جدید */}
                                {indicator.settings && indicator.settings.length > 0 && (
                                    <div>
                                        <Title level={4} style={{ color: 'white', margin: 0 }}>تنظیمات</Title>
                                        <ul className="list-disc list-inside text-gray-200 text-lg leading-8">
                                            {indicator.settings.map((setting, index) => (
                                                <li key={index} className="mb-2">{setting}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {/* نکات با استایل جدید */}
                                {indicator.tips && indicator.tips.length > 0 && (
                                    <div>
                                        <Title level={4} style={{ color: 'white', margin: 0 }}>نکات کلیدی</Title>
                                        <ul className="list-disc list-inside text-gray-200 text-lg leading-8">
                                            {indicator.tips.map((tip, index) => (
                                                <li key={index} className="mb-2">{tip}</li>
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