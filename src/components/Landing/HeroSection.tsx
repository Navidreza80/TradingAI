'use client'

// import motion for animation 
// space and button for UI 
// Title and Paragraph for UI Text and 
// Link for Navigation 
// and static styles

import { motion } from 'framer-motion';
import { Space, Button } from 'antd';
import Title from 'antd/es/typography/Title';
import Paragraph from 'antd/es/typography/Paragraph';
import Link from 'next/link';
import './Style.css'
import { useTranslation } from 'react-i18next';

export default function HeroSection() {
    const {t} = useTranslation()
    return (

        // container div
        <motion.div
            className="hero-section h-screen flex items-center justify-center relative overflow-hidden z-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
        >
            <div className="text-center max-w-[900px] relative z-1 py-5">
                <motion.div
                    initial={{ y: 50 }}
                    animate={{ y: 0 }}
                    transition={{ delay: 0.2 }}
                >

                    {/* Hero Section Title */}
                    <Title level={1} className='hero-section-title mb-8 p-2 text-center relative'>
                    {t('hero.title')} <br /> {t('hero.title2')}
                    </Title>
                </motion.div>

                <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                >

                    {/* Hero Section Subtitle */}
                    <Paragraph className="hero-section-subtitle lg:text-[20px] md:[17px] sm:text-[14px] xs:text-[12px] text-center mb-12 text-[#bfbfbf]">
                        {t('hero.description')}
                    </Paragraph>
                </motion.div>

                <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6 }}
                >
                    {/* Hero section buttons */}
                    <Space size="large" className="hero-buttons">

                        {/* Start Trading Now Button */}
                        <Link href="/dashboard">
                            <Button type="primary" size="large" className="h-14 px-4 py-3 text-[1rem] font-semibold rounded-[18px] get-started-btn">
                                {t('hero.getStarted')}
                            </Button>
                        </Link>

                        {/* Watch Demo Button */}
                        <Button size="large" className="learn-more-btn h-14 px-8 font-[1rem] font-semibold rounded-[18px] text-[#1890ff]">
                            {t('hero.learnMore')}
                        </Button>
                    </Space>
                </motion.div>
            </div>
        </motion.div>
    );
}
