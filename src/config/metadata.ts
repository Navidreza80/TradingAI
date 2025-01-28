import type { I18nMetadata } from '@/types/metadata';

export const siteConfig = {
  title: "TradingAI - AI-Powered Trading Platform",
  description: "Get real-time trading suggestions powered by artificial intelligence and comprehensive market analysis. Join TradingAI for smarter trading decisions.",
  keywords: "AI trading, algorithmic trading, trading signals, market analysis, cryptocurrency trading, stock trading, TradingAI",
  authors: [{ name: "TradingAI Team" }],
  creator: "TradingAI",
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["fa_IR", "ar_SA"],
    url: "https://tradingai.com",
    siteName: "TradingAI",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "TradingAI - AI-Powered Trading Platform"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    site: "@tradingai",
    creator: "@tradingai"
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  }
} as const;

// Language-specific metadata
export const i18nMetadata: I18nMetadata = {
  en: {
    title: "TradingAI - AI-Powered Trading Platform",
    description: "Get real-time trading suggestions powered by artificial intelligence and comprehensive market analysis.",
  },
  fa: {
    title: "تریدینگ AI - پلتفرم معاملاتی هوشمند",
    description: "دریافت پیشنهادات معاملاتی بلادرنگ با استفاده از هوش مصنوعی و تحلیل جامع بازار.",
  },
  ar: {
    title: "تريدينج AI - منصة التداول الذكية",
    description: "احصل على توصيات التداول في الوقت الفعلي مدعومة بالذكاء الاصطناعي وتحليل السوق الشامل.",
  }
} as const; 