'use client'

// imports
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// resources
const resources = {

  // english
  en: {
    translation: {

      // header > navbar items
      nav: {
        home: 'Home',
        features: 'Features',
        pricing: 'Pricing',
        about: 'About',
        homeDesc: 'Return to homepage',
        featuresDesc: 'Explore our trading features',
        pricingDesc: 'View our pricing plans',
        aboutDesc: 'Learn more about TradingAI'
      },

      // header > authentication buttons
      auth: {
        login: 'Log In',
        getStarted: 'Get Started'
      }
    }
  },

  // persian
  fa: {
    translation: {

      // header > navbar items
      nav: {
        home: 'خانه',
        features: 'امکانات',
        pricing: 'قیمت‌ها',
        about: 'درباره ما',
        homeDesc: 'بازگشت به صفحه اصلی',
        featuresDesc: 'مشاهده امکانات معاملاتی',
        pricingDesc: 'مشاهده تعرفه‌ها',
        aboutDesc: 'درباره TradingAI'
      },

      // header > authentication buttons
      auth: {
        login: 'ورود',
        getStarted: 'شروع کنید'
      }
    }
  },

  // arabic
  ar: {
    translation: {

      // header > navbar items
      nav: {
        home: 'الرئيسية',
        features: 'المميزات',
        pricing: 'الأسعار',
        about: 'حول',
        homeDesc: 'العودة إلى الصفحة الرئيسية',
        featuresDesc: 'استكشف ميزات التداول',
        pricingDesc: 'عرض خطط الأسعار',
        aboutDesc: 'تعرف على TradingAI'
      },
      auth: {
        login: 'الدخول',
        getStarted: 'ابدأ الآن'
      }
    }
  }
};

// initialize i18n
i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n; 