"use client";

import { Layout, Typography, Card, Row, Col, Button } from 'antd';
import { LineChartOutlined, BookOutlined, BarChartOutlined, TeamOutlined, AreaChartOutlined } from '@ant-design/icons';
import { ConfigProvider } from 'antd';
import fa_IR from 'antd/locale/fa_IR';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import style from './style.module.css';
import { useTranslation } from "react-i18next";

const { Header, Content } = Layout;
const { Title, Text } = Typography;
const { Meta } = Card;

const Education = () => {
  const { t } = useTranslation();
  const router = useRouter();

  const educationSections = [
    {
      title: t("education.sections.technical.title"),
      description: t("education.sections.technical.description"),
      link: '/education/technical',
      image: 'https://nobitex.ir/mag/wp-content/uploads//2023/08/01-%D8%AA%D8%AD%D9%84%DB%8C%D9%84-%D8%AA%DA%A9%D9%86%DB%8C%DA%A9%D8%A7%D9%84.jpg'
    },
    {
      title: t("education.sections.indicators.title"),
      description: t("education.sections.indicators.description"),
      link: '/education/indicators',
      image: 'https://forexstrategy.ir/wp-content/uploads/2019/05/maxresdefault-min.png'
    },
    {
      title: t("education.sections.tests.title"),
      description: t("education.sections.tests.description"),
      link: '/education/test',
      image: 'data:image/jpeg;base64,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'
    },
  ];

  const educationData = [
    {
      degree: t("education.degree"),
      university: t("education.university"),
      location: t("education.location"),
      date: t("education.date"),
      description: t("education.description"),
      courses: t("education.courses"),
      gpa: t("education.gpa"),
    },
  ];

  return (
    <ConfigProvider locale={fa_IR} direction="rtl">
      <Layout className="min-h-screen bg-gradient-to-b dark:from-[#0a0a0a] dark:to-[#1a1a1a] from-white to-gray-50">
        <Header className='bg-gradient-to-b dark:from-[#0a0a0a] dark:to-[#0a0a0a] from-white to-gray-50'></Header>
        <Content className="p-6">
          <div className=" ">
            <div className={style.CardHolder}>
              {educationSections.map((section, index) => (
                <div key={index} className={style.Card}>
                  <Card
                    hoverable
                    className=" rounded-2xl overflow-hidden dark:border-white/10 border-black/5 border backdrop-blur-xl dark:bg-white/5 bg-white/80 dark:hover:bg-white/10 hover:bg-white/90 transition-all duration-300 hover:scale-[1.02] dark:hover:shadow-[0_0_30px_rgba(24,144,255,0.1)] hover:shadow-[0_0_30px_rgba(24,144,255,0.2)] h-full transition-all duration-300 hover:transform hover:scale-105"
                    cover={
                      <div className={`${style.imageCard} relative h-[250px] overflow-hidden`}>
                        <div
                          className="absolute inset-0 bg-center bg-cover"
                          style={{
                            backgroundImage: `url(${section.image})`,
                            backgroundSize: "100% 250px",
                            backgroundPosition: "50% 2%",
                            backgroundRepeat: "no-repeat",
                            filter: 'brightness(0.7)'
                          }}
                        />
                      </div>
                    }
                    onClick={() => router.push(section.link)}
                  >
                    <Meta
                      title={<h1 className="dark:text-white text-black text-lg font-bold text-center block">{section.title}</h1>}
                      description={<h1 className="dark:text-white text-gray-900 text-center block mt-2">{section.description}</h1>}
                    />
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </Content>
      </Layout>
    </ConfigProvider>
  );
};

export default Education; 