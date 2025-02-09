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
            <Layout className="min-h-screen bg-gradient-to-b dark:from-[#0a0a0a] dark:to-[#1a1a1a] from-white to-gray-50">
                <Header className="flex items-center mt-20 justify-between bg-transparent px-16">
                    <div className="flex items-center">
                        <LineChartOutlined className="text-2xl dark:text-white gray-900 ml-2" />
                        <h3 className='dark:text-white text-2xl font-semibold text-gray-900' style={{  margin: 0 }}>تحلیل تکنیکال</h3>
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
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={handleSearchChange}
                                    placeholder="جستجو در آموزش‌های تکنیکال..."
                                    className="w-full px-4 py-3 pl-12 rounded-xl dark:bg-white/5 bg-white dark:text-white text-gray-900 dark:border-white/10 border-gray-200 border focus:outline-none focus:ring-2 focus:ring-[#1890ff] placeholder:dark:text-gray-500 placeholder:text-gray-400 transition-all duration-200"/>
                            </div>
                        </div>

                        <Row gutter={[16, 16]}>
                            {filteredAnalysis.map((analysis, index) => (
                                <Col xs={24} sm={12} md={8} lg={6} key={index}>
                                    <Card
                                        hoverable
                                        className="rounded-2xl overflow-hidden dark:border-white/10 border-black/5 border backdrop-blur-xl dark:bg-white/5 bg-white/80 dark:hover:bg-white/10 hover:bg-white/90 transition-all duration-300 hover:scale-[1.02] dark:hover:shadow-[0_0_30px_rgba(24,144,255,0.1)] hover:shadow-[0_0_30px_rgba(24,144,255,0.2)] h-full transition-all duration-300 hover:transform hover:scale-105 h-full"
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
                                            title={<h1 className="dark:text-white text-gray-900 text-center block">{analysis.title}</h1>}
                                        />
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                        
                        {/* نمایش پیام در صورت عدم یافتن نتیجه */}
                        {filteredAnalysis.length === 0 && (
                            <div className="text-center mt-8">
                                <h1 className="dark:text-white text-gray-900">
                                    نتیجه‌ای برای جستجوی شما یافت نشد.
                                </h1>
                            </div>
                        )}
                    </div>
                </Content>
            </Layout>
        </ConfigProvider>
    );
} 