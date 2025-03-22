"use client"

import { Layout, Typography, Card, Row, Col, Image, Button, Input } from 'antd';
import { LineChartOutlined, ArrowLeftOutlined, SearchOutlined } from '@ant-design/icons';
import { ConfigProvider } from 'antd';
import fa_IR from 'antd/locale/fa_IR';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { technicalAnalysis } from '../data';
import { useState, useCallback } from 'react';
import debounce from 'lodash/debounce';
import style from './[id]/style.module.css';
import { useTranslation } from "react-i18next";

const { Header, Content } = Layout;
const { Title, Text } = Typography;
const { Meta } = Card;
const DEFAULT_IMAGE = 'https://media.salameno.com/d/2022/07/25/3/15384301.jpg?ts=1658737063000';

const Technical = () => {
    const { t } = useTranslation();
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredTechnical, setFilteredTechnical] = useState(technicalAnalysis);

    const handleSearch = useCallback(
        debounce((value: string) => {
            const filtered = technicalAnalysis.filter(pattern =>
                pattern.title.toLowerCase().includes(value.toLowerCase())
            );
            setFilteredTechnical(filtered);
        }, 300),
        []
    );

    const technicalSections = [
        {
            title: t("technical.sections.candlestick.title"),
            description: t("technical.sections.candlestick.description"),
            link: '/education/technical/candlestick',
            image: 'https://example.com/candlestick-image.jpg'
        },
        {
            title: t("technical.sections.chart.title"),
            description: t("technical.sections.chart.description"),
            link: '/education/technical/chart',
            image: 'https://example.com/chart-image.jpg'
        },
        {
            title: t("technical.sections.support.title"),
            description: t("technical.sections.support.description"),
            link: '/education/technical/support',
            image: 'https://example.com/support-image.jpg'
        },
        {
            title: t("technical.sections.trend.title"),
            description: t("technical.sections.trend.description"),
            link: '/education/technical/trend',
            image: 'https://example.com/trend-image.jpg'
        }
    ];

    return (
        <ConfigProvider locale={fa_IR} direction="rtl">
            <Layout className="min-h-screen bg-gradient-to-b dark:from-[#0a0a0a] dark:to-[#1a1a1a] from-white to-gray-50">
                <Header className={` flex mt-16 items-center justify-between bg-transparent px-32 ${style.Header}`}>
                    <div className="flex items-center">
                        <LineChartOutlined className="text-2xl dark:text-white gray-900 ml-2" />
                        <h3 className={` dark:text-white text-black font-bold text-2xl ${style.titleTop}`} style={{ margin: 0 }}>
                            {t("technical.pageTitle")}
                        </h3>
                    </div>
                    <Link href="/education">
                        <Button className={`${style.return}`} type="primary" icon={<ArrowLeftOutlined />}>
                            {t("technical.return")}
                        </Button>
                    </Link>
                </Header>

                <Content className="p-6">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-8">
                            <h1 className="text-3xl font-bold dark:text-white text-black mb-2">
                                {t("technical.title")}
                            </h1>
                            <p className="text-lg dark:text-gray-300 text-gray-600">
                                {t("technical.subtitle")}
                            </p>
                        </div>

                        <div className="mb-8 flex justify-center">
                            <div className="relative w-full max-w-2xl mx-auto">
                                <input
                                    type="text"
                                    onChange={(e) => {
                                        setSearchTerm(e.target.value);
                                        handleSearch(e.target.value);
                                    }}
                                    placeholder={t("technical.searchPlaceholder")}
                                    className="w-full px-4 py-3 pl-12 rounded-xl dark:bg-white/5 bg-white dark:text-white text-gray-900 dark:border-white/10 border-gray-200 border focus:outline-none focus:ring-2 focus:ring-[#1890ff] placeholder:dark:text-gray-500 placeholder:text-gray-400 transition-all duration-200" />
                                <SearchOutlined className="absolute text-2xl left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 dark:text-gray-400 text-gray-500" />
                            </div>
                        </div>

                        <Row className={style.listEducation} gutter={[16, 16]}>
                            {filteredTechnical.map((pattern, index) => (
                                <div className={style.CardListEducationHolder} key={index}>
                                    <Card
                                        hoverable
                                        className={`${style.CardListEducation} rounded-2xl overflow-hidden dark:border-white/10 border-black/5 border backdrop-blur-xl dark:bg-white/5 bg-white/80 dark:hover:bg-white/10 hover:bg-white/90 transition-all duration-300 hover:scale-[1.02] dark:hover:shadow-[0_0_30px_rgba(24,144,255,0.1)] hover:shadow-[0_0_30px_rgba(24,144,255,0.2)] h-full transition-all duration-300 hover:transform hover:scale-105 h-full p-1`}
                                        onClick={() => router.push(`/education/technical/${pattern.id}`)}
                                        cover={
                                            <>
                                                <div className={style.ImageHolderList} style={{ height: '200px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                    <Image
                                                        alt={pattern.name}
                                                        src={pattern.image || DEFAULT_IMAGE}
                                                        className="object-cover"
                                                        width="100%"
                                                        style={{ borderRadius: "8px" }}
                                                    />
                                                    <h1 className={`${style.titlCardList} dark:text-white text-gray-900 text-center font-semibold text-sm block m-auto`}>{pattern.name}</h1>
                                                </div>
                                            </>
                                        }
                                    ></Card>
                                </div>
                            ))}
                        </Row>
                        {filteredTechnical.length === 0 && (
                            <div className="text-center mt-8">
                                <h1 className="dark:text-white text-gray-900">
                                    {t("technical.noResults")}
                                </h1>
                            </div>
                        )}
                    </div>
                </Content>
            </Layout>
        </ConfigProvider>
    );
};

export default Technical; 