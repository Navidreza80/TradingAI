'use client'

import { Layout, Typography, Card, Row, Col, Image, Button, Input } from 'antd';
import { LineChartOutlined, ArrowLeftOutlined, SearchOutlined } from '@ant-design/icons';
import { ConfigProvider } from 'antd';
import fa_IR from 'antd/locale/fa_IR';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { indicators } from '../data';
import { useState, useCallback } from 'react';
import debounce from 'lodash/debounce';

const { Header, Content } = Layout;
const { Title, Text } = Typography;
const { Meta } = Card;
const DEFAULT_IMAGE = 'https://media.salameno.com/d/2022/07/25/3/15384301.jpg?ts=1658737063000';

export default function IndicatorsPage() {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredIndicators, setFilteredIndicators] = useState(indicators);

    const handleSearch = useCallback(
        debounce((value: string) => {
            const filtered = indicators.filter(indicator => 
                indicator.title.toLowerCase().includes(value.toLowerCase())
            );
            setFilteredIndicators(filtered);
        }, 300),
        []
    );

    return (
        <ConfigProvider locale={fa_IR} direction="rtl">
            <Layout className="min-h-screen bg-gray-900">
                <Header className="flex items-center mt-20 justify-between bg-gray-900 px-16">
                    <div className="flex items-center">
                        <LineChartOutlined className="text-2xl text-white ml-2" />
                        <Title level={3} style={{ color: 'white', margin: 0 }}>اندیکاتورها</Title>
                    </div>
                    <Link href="/education">
                        <Button type="primary" icon={<ArrowLeftOutlined />}>
                            بازگشت
                        </Button>
                    </Link>
                </Header>

                <Content className="p-6">
                    <div className="max-w-7xl mx-auto">
                        <div className="mb-8 flex justify-center">
                            <div className="w-full max-w-2xl">
                                <Input
                                    placeholder="جستجو در اندیکاتورها..."
                                    prefix={<SearchOutlined className="text-gray-400 text-lg" />}
                                    onChange={(e) => {
                                        setSearchTerm(e.target.value);
                                        handleSearch(e.target.value);
                                    }}
                                    style={{ 
                                        backgroundColor: '#1F2937',
                                        borderRadius: '12px',
                                        color: "white",
                                        height: '50px',
                                        fontSize: '16px',
                                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                                    }}
                                    size="large"
                                    className=".placeholder-white technical-search-input"
                                />
                                
                            </div>
                        </div>

                        <Row gutter={[16, 16]}>
                            {filteredIndicators.map((indicator, index) => (
                                <Col xs={24} sm={12} md={8} lg={6} key={index}>
                                    <Card
                                        hoverable
                                        className="bg-gray-800 border-gray-700 h-full"
                                        onClick={() => router.push(`/education/indicators/${index}`)}
                                        cover={
                                            <div style={{ height: '200px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                <Image
                                                    alt={indicator.title}
                                                    src={indicator.image || DEFAULT_IMAGE}
                                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                    preview={false}
                                                />
                                            </div>
                                        }
                                    >
                                        <Meta
                                            title={<Text className="text-white text-center block">{indicator.title}</Text>}
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