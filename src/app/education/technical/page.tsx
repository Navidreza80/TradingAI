'use client'

import { Layout, Typography, Card, Row, Col, Image, Button, Input } from 'antd';
import { LineChartOutlined, ArrowLeftOutlined, SearchOutlined } from '@ant-design/icons';
import { ConfigProvider } from 'antd';
import fa_IR from 'antd/locale/fa_IR';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { technicalAnalysis } from '../data';
import { useState, useCallback } from 'react';
import debounce from 'lodash/debounce';
const DEFAULT_IMAGE = 'https://media.salameno.com/d/2022/07/25/3/15384301.jpg?ts=1658737063000';

const { Header, Content } = Layout;
const { Title, Text } = Typography;
const { Meta } = Card;
const { Search } = Input;

export default function TechnicalAnalysisPage() {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredAnalysis, setFilteredAnalysis] = useState(technicalAnalysis);

    // جستجوی بهینه شده با debounce
    const handleSearch = useCallback(
        debounce((value: string) => {
            const filtered = technicalAnalysis.filter(analysis => 
                analysis.title.toLowerCase().includes(value.toLowerCase())
            );
            setFilteredAnalysis(filtered);
        }, 300),
        []
    );

    // هندلر تغییر متن جستجو
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchTerm(value);
        handleSearch(value);
    };

    return (
        <ConfigProvider locale={fa_IR} direction="rtl">
            <Layout className="min-h-screen bg-gray-900">
                <Header className="flex items-center mt-20 justify-between bg-gray-900 px-16">
                    <div className="flex items-center">
                        <LineChartOutlined className="text-2xl text-blue-500 ml-2" />
                        <Title level={3} style={{ color: 'white', margin: 0 }}>تحلیل تکنیکال</Title>
                    </div>
                    <Link href="/education">
                        <Button type="primary" icon={<ArrowLeftOutlined />}>
                            بازگشت
                        </Button>
                    </Link>
                </Header>

                <Content className="p-6">
                    <div className="max-w-7xl mx-auto">
                        {/* باکس جستجو با طراحی بهتر */}
                        <div className="mb-8 flex justify-center">
                            <div className="w-full max-w-2xl">
                                <Input
                                    placeholder="جستجو در آموزش‌های تکنیکال..."
                                    prefix={
                                        <SearchOutlined 
                                            className="text-gray-400 text-lg" 
                                            style={{ marginLeft: '8px' }}
                                        />
                                    }
                                    value={searchTerm}
                                    onChange={handleSearchChange}
                                    size="large"
                                    style={{ 
                                        backgroundColor: '#1F2937',
                                        borderRadius: '12px',
                                        color: "white",
                                        height: '50px',
                                        fontSize: '16px',
                                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                                    }}
                                    className=".placeholder-white technical-search-input"
                                />
                            </div>
                        </div>

                        <Row gutter={[16, 16]}>
                            {filteredAnalysis.map((analysis, index) => (
                                <Col xs={24} sm={12} md={8} lg={6} key={index}>
                                    <Card
                                        hoverable
                                        className="bg-gray-800 border-gray-700 h-full"
                                        cover={
                                            <div className="relative h-48">
                                                <Image
                                                    alt={analysis.title}
                                                    src={analysis.image || DEFAULT_IMAGE}
                                                    className="object-cover"
                                                    width="100%"
                                                    height="192px"
                                                    style={{borderRadius: "8px"}}
                                                />
                                            </div>
                                        }
                                        onClick={() => router.push(`/education/technical/${index}`)}
                                    >
                                        <Meta
                                            title={<Text className="text-white text-center block">{analysis.title}</Text>}
                                        />
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                        
                        {/* نمایش پیام در صورت عدم یافتن نتیجه */}
                        {filteredAnalysis.length === 0 && (
                            <div className="text-center mt-8">
                                <Text className="text-gray-400">
                                    نتیجه‌ای برای جستجوی شما یافت نشد.
                                </Text>
                            </div>
                        )}
                    </div>
                </Content>
            </Layout>
        </ConfigProvider>
    );
} 