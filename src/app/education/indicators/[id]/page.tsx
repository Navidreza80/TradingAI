'use client'

import { Layout, Typography, Card, Space, Button, Image } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { ConfigProvider } from 'antd';
import fa_IR from 'antd/locale/fa_IR';
import Link from 'next/link';
import { indicators } from '../../data';
import { useParams } from 'next/navigation';
import style from './../../technical/[id]/style.module.css';

const { Header, Content } = Layout;
const { Title, Text, Paragraph } = Typography;

const DEFAULT_IMAGE = 'https://media.salameno.com/d/2022/07/25/3/15384301.jpg?ts=1658737063000';


export default function IndicatorDetail() {
    const params = useParams();
    const indicator = indicators[parseInt(params.id as string)];
    const descriptionParagraphs = indicator.description.split('\n\n').filter(p => p.trim());
    return (
        <ConfigProvider locale={fa_IR} direction="rtl">
            <Layout className="min-h-screen bg-gradient-to-b dark:from-[#0a0a0a] dark:to-[#1a1a1a] from-white to-gray-50">
                <Header className={` flex mt-16 items-center justify-between bg-transparent px-32 ${style.Header}`}>
                    <h3 className={` dark:text-white text-black font-bold text-2xl ${style.titleTop}`} style={{ margin: 0 }}>{indicator.title}</h3>
                    <Link href="/education/indicators">
                        <Button className={`${style.return}`} type="primary" icon={<ArrowLeftOutlined />}>
                            بازگشت
                        </Button>
                        <Button className={`${style.returnRes}`} type="primary" icon={<ArrowLeftOutlined className='dark:text-white text-black' />}> </Button>
                    </Link>
                </Header>

                <Content className="p-6">
                    <div className={` max-w-4xl mx-auto ${style.CardHolder}`}>
                        <Card className="dark:bg-white/5 bg-white/80 dark:border-white/10 border-black/5">
                            <Space direction="vertical" size="large" className="w-full">
                                {/* Image with fixed dimensions and fallback */}
                                <div className={`${style.ImageHolder} relative h-96 w-full`}>
                                    <Image
                                        src={indicator.image || DEFAULT_IMAGE}
                                        alt={indicator.title}
                                        className="object-contain"
                                        width="100%"
                                        height="100%"
                                    />
                                </div>

                                {/* توضیحات با استایل جدید */}
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

                                {/* تنظیمات با استایل جدید */}
                                {indicator.settings && indicator.settings.length > 0 && (
                                    <div>
                                        <h4 className={`${style.titleDesc} dark:text-white text-black text-xl font-semibold`} style={{ margin: 0 }}>تنظیمات</h4>
                                        <ul className="list-disc list-inside text-gray-200 text-lg leading-8">
                                            {indicator.settings.map((setting, index) => (
                                                <li key={index} className={`${style.ParagraphDesc} dark:text-[#cacaca] text-gray-500 text-base whitespace-pre-line mr-4`}>{setting}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {/* نکات با استایل جدید */}
                                {indicator.tips && indicator.tips.length > 0 && (
                                    <div>
                                        <h4 className={`${style.titleDesc} dark:text-white text-black text-xl font-semibold`} style={{ margin: 0 }}>نکات کلیدی:</h4>
                                        <ul className="list-disc list-inside text-gray-200 text-lg leading-8">
                                            {indicator.tips.map((tip, index) => (
                                                <li key={index} className={`${style.ParagraphDesc} dark:text-[#cacaca] text-gray-500 text-base whitespace-pre-line mr-4`}>{tip}</li>
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