"use client";
// antd components
import { Card, ConfigProvider, Image, Layout, Space } from "antd";
import fa_IR from "antd/locale/fa_IR";
// Next built in components
import { useParams } from "next/navigation";
// indicators data
import { indicators } from "../../data";
// Global style
import style from "./../../technical/[id]/style.module.css";

// antd layout
const { Content } = Layout;

// default image
const DEFAULT_IMAGE =
  "https://media.salameno.com/d/2022/07/25/3/15384301.jpg?ts=1658737063000";

export default function IndicatorDetail() {
  // useParams hook to get route parameters
  const params = useParams();
  // indicator detail
  const indicator = indicators[parseInt(params.id as string)];
  const descriptionParagraphs = indicator.description
    .split("\n\n")
    .filter((p) => p.trim());
  return (
    <ConfigProvider locale={fa_IR} direction="rtl">
      <Layout className="min-h-screen bg-gradient-to-b pt-24 dark:from-[#0a0a0a] dark:to-[#1a1a1a] from-white to-gray-50">

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

                {descriptionParagraphs.map((paragraph, index) => {
                  if (paragraph.includes(":")) {
                    const [title, content] = paragraph.split(":");
                    return (
                      <div key={index} className="mb-4">
                        <h1
                          className={`${style.titleDesc} dark:text-white my-1 text-black font-bold text-xl`}
                        >
                          {title.trim()}:
                        </h1>
                        <p
                          className={`${style.ParagraphDesc} dark:text-[#cacaca] text-gray-500 text-base whitespace-pre-line mr-4`}
                        >
                          {content.trim()}
                        </p>
                      </div>
                    );
                  }
                  return (
                    <p
                      key={index}
                      className={`${style.ParagraphDesc} dark:text-[#cacaca] text-gray-500 text-base whitespace-pre-line mr-4`}
                    >
                      {paragraph.trim()}
                    </p>
                  );
                })}

                {indicator.settings && indicator.settings.length > 0 && (
                  <div>
                    <h4
                      className={`${style.titleDesc} dark:text-white text-black text-xl font-semibold`}
                      style={{ margin: 0 }}
                    >
                      Settings:
                    </h4>
                    <ul className="list-disc list-inside text-gray-200 text-lg leading-8">
                      {indicator.settings.map((setting, index) => (
                        <li
                          key={index}
                          className={`${style.ParagraphDesc} dark:text-[#cacaca] text-gray-500 text-base whitespace-pre-line mr-4`}
                        >
                          {setting}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {indicator.tips && indicator.tips.length > 0 && (
                  <div>
                    <h4
                      className={`${style.titleDesc} dark:text-white text-black text-xl font-semibold`}
                      style={{ margin: 0 }}
                    >
                      Key notes:
                    </h4>
                    <ul className="list-disc list-inside text-gray-200 text-lg leading-8">
                      {indicator.tips.map((tip, index) => (
                        <li
                          key={index}
                          className={`${style.ParagraphDesc} dark:text-[#cacaca] text-gray-500 text-base whitespace-pre-line mr-4`}
                        >
                          {tip}
                        </li>
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
