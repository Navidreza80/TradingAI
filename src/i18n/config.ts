'use client'

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
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
      auth: {
        login: 'Log In',
        getStarted: 'Get Started'
      },
      hero: {
        title: 'Smart Trading Decisions',
        title2: 'with AI-Powered Insights',
        description: 'Get real-time trading suggestions powered by artificial intelligence and comprehensive market analysis.',
        getStarted: 'Get Started',
        learnMore: 'Learn More'
      },
      features: {
        title: 'Powerful Features for Smart Trading',
        subtitle: 'Advanced tools and features powered by artificial intelligence to help you make better trading decisions',
        realtime: {
          title: 'Real-Time Analysis',
          description: 'Get instant market analysis and trading signals based on real-time data'
        },
        ai: {
          title: 'AI-Powered Insights',
          description: 'Use AI to generate trading signals'
        },
        secure: {
          title: 'Secure Trading',
          description: 'Your assets are protected with military-grade encryption and security measures'
        },
        advanced: {
          title: 'Advanced Features',
          description: 'Advanced tools and features powered by artificial intelligence to help you make better trading decisions'
        }
      },
      stats: {
        title: 'Trusted by Traders Worldwide',
        subtitle: 'Join thousands of traders who trust TradingAI for their trading decisions',
        users: {
          title: 'Active Users',
        },
        volume: {
          title: 'Daily Trades',
        },
        accuracy: {
          title: 'Signal Accuracy',
        },
        countries: {
          title: 'Countries',
        }
      },
      experience: {
        title: 'What Our Users Say',
        subtitle: 'Read what traders around the world say about their experience with TradingAI',
        testimonials: {
          user1: {
            name: 'Sarah Johnson',
            role: 'Professional Trader',
            content: 'TradingAI has completely transformed my trading strategy. The AI signals are incredibly accurate and the real-time analysis helps me make better decisions.',
          },
          user2: {
            name: 'David Chen',
            role: 'Crypto Investor',
            content: 'The platform\'s AI predictions have helped me achieve consistent profits in the crypto market. The user interface is intuitive and the support team is excellent.',
          },
          user3: {
            name: 'Mohammed Al-Rashid',
            role: 'Forex Trader',
            content: 'I\'ve tried many trading platforms, but TradingAI stands out with its advanced features and reliable signals. It\'s become an essential tool for my daily trading.',
          }
        }
      },
      startTrading: {
        title: 'Start Trading in 4 Easy Steps',
        subtitle: 'Follow these simple steps to start your trading journey with TradingAI',
        steps: {
          deposit: {
            title: 'Deposit Funds',
            description: 'Securely deposit funds using multiple payment methods',
          },
          analyze: {
            title: 'Analyze Markets',
            description: 'Get AI-powered insights and market analysis',
          },
          trade: {
            title: 'Execute Trades',
            description: 'Place trades with our easy-to-use platform',
          },
          secure: {
            title: 'Stay Secure',
            description: 'Your funds are protected with bank-grade security',
          }
        },
        cta: 'Start Trading Now',
      }
    }
  },
  fa: {
    translation: {
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
      auth: {
        login: 'ورود',
        getStarted: 'شروع کنید'
      },
      hero: {
        title: 'تصمیمات معاملاتی با هوش مصنوعی',
        title2: 'با پیشنهادهای هوش مصنوعی',
        description: 'دریافت پیشنهادات معاملاتی بلادرنگ با استفاده از هوش مصنوعی و تحلیل جامع بازار.',
        getStarted: 'شروع کنید',
        learnMore: 'بیشتر بدانید'
      },
      features: {
        title: 'امکانات قوی برای تداول با هوش مصنوعی',
        subtitle: 'امکانات پیشرفته مدعوم با هوش مصنوعی برای کمک به تصمیم‌گیری بهتر در معاملات',
        realtime: {
          title: 'تحلیل لحظه‌ای',
        },
        ai: {
          title: 'هوش مصنوعی',
        },
        secure: {
          title: 'امنیت',
        },
        advanced: {
          title: 'امکانات پیشرفته',
        },
      },
      stats: {
        title: 'مورد اعتماد معامله‌گران در سراسر جهان',
        subtitle: 'به هزاران معامله‌گر که برای تصمیمات معاملاتی خود به TradingAI اعتماد می‌کنند بپیوندید',
        users: {
          title: 'کاربران فعال',
        },
        volume: {
          title: 'معاملات روزانه',
        },
        accuracy: {
          title: 'دقت سیگنال‌ها',
        },
        countries: {
          title: 'کشورها',
        }
      },
      experience: {
        title: 'نظرات کاربران ما',
        subtitle: 'نظرات معامله‌گران از سراسر دنیا درباره تجربه استفاده از TradingAI را بخوانید',
        testimonials: {
          user1: {
            name: 'سارا جانسون',
            role: 'معامله‌گر حرفه‌ای',
            content: 'TradingAI استراتژی معاملاتی من را کاملاً متحول کرده است. سیگنال‌های هوش مصنوعی فوق‌العاده دقیق هستند و تحلیل‌های لحظه‌ای به من در تصمیم‌گیری بهتر کمک می‌کنند.',
          },
          user2: {
            name: 'دیوید چن',
            role: 'سرمایه‌گذار ارز دیجیتال',
            content: 'توقعات الذكاء الاصطناعي في المنصة ساعدتني على تحقيق أرباح مستمرة في سوق العملات الرقمية. رابط کاربری بسیار ساده است و تیم پشتیبانی عالی است.',
          },
          user3: {
            name: 'محمد الرشید',
            role: 'معامله‌گر فارکس',
            content: 'من پلتفرم‌های معاملاتی زیادی را امتحان کرده‌ام، اما TradingAI با ویژگی‌های پیشرفته و سیگنال‌های قابل اعتماد خود متمایز است. این پلتفرم به ابزاری ضروری برای معاملات روزانه من تبدیل شده است.',
          }
        }
      },
      startTrading: {
        title: 'شروع معامله در 4 مرحله آسان',
        subtitle: 'این مراحل ساده را برای شروع سفر معاملاتی خود با TradingAI دنبال کنید',
        steps: {
          deposit: {
            title: 'واریز وجه',
            description: 'واریز ایمن وجه با استفاده از روش‌های پرداخت متنوع',
          },
          analyze: {
            title: 'تحلیل بازارها',
            description: 'دریافت تحلیل‌های هوشمند و بررسی بازار',
          },
          trade: {
            title: 'انجام معاملات',
            description: 'معامله با استفاده از پلتفرم ساده ما',
          },
          secure: {
            title: 'حفظ امنیت',
            description: 'محافظت از دارایی‌های شما با امنیت در سطح بانکی',
          }
        },
        cta: 'شروع معامله',
      }
    }
  },
  ar: {
    translation: {
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
      },
      hero: {
        title: 'اتخاذ قرارات ذكية في الأسواق المالية',
        title2: 'مع اقتراحات الذكاء الاصطناعي',
        description: 'احصل على توصيات التداول في الوقت الفعلي مدعومة بالذكاء الاصطناعي وتحليل السوق الشامل.',
        getStarted: 'ابدأ الآن',
        learnMore: 'اعرف المزيد'
      },
      features: {
        title: 'الميزات القوية',
        subtitle: 'الميزات المتقدمة مدعومة بالذكاء الاصطناعي لمساعدتك في اتخاذ قرارات تداول أفضل',
        realtime: {
          title: 'تحليل في الوقت الحقيقي',
        },
        ai: {
          title: 'هوش مصنوعي',
        },
        secure: {
          title: 'امنية التداول',
        },
        advanced: {
          title: 'الميزات المتقدمة',
        },
      },
      stats: {
        title: 'موثوق به من قبل المتداولين حول العالم',
        subtitle: 'انضم إلى الآلاف من المتداولين الذين يثقون بـ TradingAI في قراراتهم التجارية',
        users: {
          title: 'المستخدمون النشطون',
        },
        volume: {
          title: 'التداولات اليومية',
        },
        accuracy: {
          title: 'دقة الإشارات',
        },
        countries: {
          title: 'الدول',
        }
      },
      experience: {
        title: 'ماذا يقول مستخدمونا',
        subtitle: 'اقرأ ما يقوله المتداولين حول العالم عن تجربتهم مع TradingAI',
        testimonials: {
          user1: {
            name: 'سارة جونسون',
            role: 'متداولة محترفة',
            content: 'TradingAI غيّرت استراتيجيتي في التداول بشكل كامل. إشارات الذكاء الاصطناعي دقيقة للغاية، والتحليل الفوري يساعدني في اتخاذ قرارات أفضل.',
          },
          user2: {
            name: 'ديفيد تشين',
            role: 'مستثمر في العملات الرقمية',
            content: 'توقعات الذكاء الاصطناعي في المنصة ساعدتني على تحقيق أرباح مستمرة في سوق العملات الرقمية. واجهة المستخدم بديهية وفريق الدعم ممتاز.',
          },
          user3: {
            name: 'محمد الراشد',
            role: 'متداول فوركس',
            content: 'لقد جربت العديد من منصات التداول، ولكن TradingAI تتميز بميزاتها المتقدمة وإشاراتها الموثوقة. أصبحت أداة أساسية لتداولي اليومي.',
          }
        }
      },
      startTrading: {
        title: 'ابدأ التداول في 4 خطوات سهلة',
        subtitle: 'اتبع هذه الخطوات البسيطة لبدء رحلة التداول الخاصة بك مع TradingAI',
        steps: {
          deposit: {
            title: 'إيداع الأموال',
            description: 'إيداع الأموال بأمان باستخدام طرق دفع متعددة',
          },
          analyze: {
            title: 'تحليل الأسواق',
            description: 'احصل على تحليلات مدعومة بالذكاء الاصطناعي',
          },
          trade: {
            title: 'تنفيذ الصفقات',
            description: 'ضع الصفقات باستخدام منصتنا سهلة الاستخدام',
          },
          secure: {
            title: 'الحفاظ على الأمن',
            description: 'محافظت از دارایی‌های شما با امنیت در سطح بانکی',
          }
        },
        cta: 'ابدأ التداول الآن'
      }
    }
  }
};

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