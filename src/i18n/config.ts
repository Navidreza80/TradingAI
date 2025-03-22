"use client";

import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      chat: "Chat with AI",
      message: "Type your message...",
      nav: {
        home: "Home",
        blogs: "Blogs",
        signals: "Signals",
        about: "About",
        trade: "Trade",
        strategies: "Strategies",
        homeDesc: "Return to homepage",
        blogsDesc: "Explore latest crypto news",
        signalsDesc: "View our signals powered by AI",
        aboutDesc: "Learn more about TradingAI",
        tradeDesc: "Execute your trades",
        strategiesDesc: "Educate yourself on trading strategies",
        market: "Market",
        learn: "Learn",
        news: "News",
        marketItems: {
          forex: "Forex",
          crypto: "Crypto",
          stock: "Stock",
          commodities: "Commodities",
          nft: "NFT"
        },
        learnItems: {
          strategies: "Strategies",
          indicators: "Indicators",
          exams: "Exams",
          certificates: "Certificates",
          beginner: "Beginner",
          markets: "Markets",
          web3: "Web3"
        },
        signalsItems: {
          aiGenerator: "AI Signal Generator",
          suggestions: "What Other Suggests?"
        },
        newsItems: {
          blogs: "Blogs",
          magazine: "News Magazine",
          events: "Events",
          podcasts: "Podcasts",
          videos: "Videos"
        }
      },
      dropdown: {
        myAcc: "My Account",
        dash: "Dashboard",
        profile: "Profile",
        blogs: "Blogs",
        sub: "Subscriptions",
        out: "Sign Out",
      },
      auth: {
        login: "Log In",
        getStarted: "Get Started",
      },
      hero: {
        title: "Trade Smarter with AI",
        title2: "Master the Crypto Market",
        description:
          "Experience the power of AI-driven trading analysis, real-time market insights, and professional-grade tools to maximize your crypto trading potential.",
        getStarted: "Get Started",
        learnMore: "Learn More",
      },
      strategies: {
        title: "Master Trading Strategies",
        description: "Learn professional trading strategies and test your knowledge with interactive exercises and comprehensive exams",
        courses: "Trading Courses",
        coursesDesc: "Professional trading courses from basic to advanced",
        exercises: "Practice Exercises",
        exercisesDesc: "Interactive exercises to master trading skills",
        certificates: "Certificates",
        certificatesDesc: "Professional trading certificates",
        students: "Active Students",
        studentsDesc: "Successful traders in our community",
        startLearning: "Start Learning",
        takeTest: "Take a Test"
      },
      trading: {
        title: "Professional Trading Tools",
        description: "Experience the power of AI-driven trading with our advanced tools and real-time analytics",
        aiSignals: "AI Signals",
        aiSignalsDesc: "Get accurate trading signals powered by advanced machine learning algorithms",
        performance: "Performance Tracking",
        performanceDesc: "Track your trading performance with detailed analytics and insights",
        tracking: "Progress Analysis",
        trackingDesc: "Monitor your learning progress and trading improvement over time",
        analytics: "Advanced Analytics",
        analyticsDesc: "Deep dive into your trading patterns with professional analytics tools",
        accuracy: "Signal Accuracy",
        profitRate: "Profit Rate",
        startNow: "Start Trading Now"
      },
      news: {
        explore: "Explore News",
        read: "Read Blogs",
        latest: {
          title: "Stay Updated",
          description: "Get the latest financial market news and updates in real-time",
        },
        impact: {
          title: "Market Impact",
          description: "See how news affects market trends and make informed decisions",
        },
        blogs: {
          title: "Market Insights",
          description: "Read interesting blogs about market analysis and trading strategies",
        },
        share: {
          title: "Share Knowledge",
          description: "Share your trading insights and experiences with the community",
        },
      },
      analyze: {
        title: "Monitor Your Trading Growth",
        description: "Leverage our advanced tools and AI-powered insights to analyze your trading journey and optimize your strategy.",
        execute: "Demo Trade",
        analyze: "Analyze Yourself",
        demo: "Demo Trade",
        desc: "Analyze market and execute your trades in demo mode.",
        titleR: "AI Mentor",
        descR: "Look how you performed on your last trades",
        titleM: "Track Your Progress",
        descM: "Track your progress in your trading journey with our professional analytics tools",
        titleF: "Share Your Profits",
        descF: "Share your profits with your friends and invite them to our site!"
      },
      features: {
        title: "Powerful Features for Smart Trading",
        subtitle:
          "Advanced tools and features powered by artificial intelligence to help you make better trading decisions",
        realtime: {
          title: "Real-Time Analysis",
          description:
            "Get instant market analysis and trading signals based on real-time data",
        },
        learn: {
          title: "Learn & Test",
          description: "Master trading strategies through interactive courses and test your knowledge with comprehensive exams",
        },
        update: {
          title: "Stay Updated",
          description:
            "Get the latest crypto news, market analysis, and expert insights through our regularly updated blogs and news section",
        },
        advanced: {
          title: "Advanced Features",
          description:
            "Advanced tools and features powered by artificial intelligence to help you make better trading decisions",
        },
      },
      footer: {
        description:
          "AI-powered trading platform helping traders make smarter decisions with real-time market analysis and insights.",
        product: {
          title: "Product",
          features: "Features",
          pricing: "Pricing",
          security: "Security",
          enterprise: "Enterprise",
        },
        company: {
          title: "Company",
          about: "About",
          careers: "Careers",
          blog: "Blog",
          press: "Press",
        },
        resources: {
          title: "Resources",
          documentation: "Documentation",
          help: "Help Center",
          api: "API",
          status: "Status",
        },
        legal: {
          title: "Legal",
          privacy: "Privacy",
          terms: "Terms",
          cookies: "Cookies",
          licenses: "Licenses",
        },
        contact: {
          address: "123 Trading Street, Financial District, New York",
          phone: "+1 (555) 123-4567",
          email: "contact@tradingai.com",
        },
        social: {
          title: "Follow Us",
        },
        newsletter: {
          title: "Subscribe to our newsletter",
          placeholder: "Enter your email",
          subscribe: "Subscribe",
        },
        copyright: "© {{year}} TradingAI. All rights reserved.",
      },
      suggestions: {
        title: "Trading Suggestions",
        subtitle:
          "AI-powered trading suggestions with detailed analysis and risk management",
        confidence: "Confidence Level",
        entry: "Entry Price",
        takeProfit: "Take Profit",
        stopLoss: "Stop Loss",
        searchPlaceholder: "Search by name or symbol...",
        noResults: "No matching cryptocurrencies found",
      },
      blogs: {
        title: "Cryptocurrency Blog",
        subtitle:
          "Latest news, analysis and insights about cryptocurrency market",
        searchPlaceholder: "Search articles...",
        readTime: "min read",
        comments: "Comments",
        commentPlaceholder: "Write your comment...",
        submitComment: "Submit",
      },
      about: {
        title: "About TradingAI",
        subtitle: "Empowering traders with AI-driven insights and analysis",
        stats: {
          users: {
            title: "Active Users",
          },
          countries: {
            title: "Countries",
          },
          uptime: {
            title: "Platform Uptime",
          },
          support: {
            title: "Customer Support",
          },
        },
        mission: {
          title: "Our Mission",
          description:
            "To democratize trading by providing advanced AI-powered tools and insights to traders of all levels, helping them make more informed decisions in the cryptocurrency market.",
        },
        team: {
          title: "Meet Our Team",
          navid: "Front & Back-End Developer",
          taha: "Front-End Developer",
        },
      },
      dashboard: {
        stats: {
          trades: "Total Trades",
          profits: "Total Profits",
          win: "Win Rate",
        },
        modals: {
          save: "Save changes",
          banner: "Edit Banner",
          bannerDesc:
            "Make changes to your profile banner here. Click save when you are done.",
          format: "Supported formats: PNG, JPG (Max 5MB)",
          choose: "Choose a file or drag it here",
          upload: "Uploaded Files:",
          avatar: "Edit Avatar",
          avatarDesc:
            "Make changes to your avatar here. Click save when you are done.",
          username: "Edit Username",
          usernameDesc:
            "            Make changes to your profile username here. Click save when you aredone.",
          usernameInput: "Username",
        },
        profile: {
          style: "Trading Style",
          rate: "Win Rate",
          total: "Total Trades",
          pl: "P&L",
          privacy: "Privacy",
          hideW: "Hide Win Rate",
          hideT: "Hide Total Trades",
          hideP: "Hide P&L",
        },
        sidebar: {
          dash: "Dashboard",
          prof: "Profile",
          blogs: "Blogs",
          sub: "Subscription",
          comments: "Comments"
        },
        blogs: {
          your: "Your Blogs",
          manage: "Manage your blogs here",
          create: "Create Blog",
          dropdown: {
            your: "Your blogs",
            disliked: "Disliked blogs",
            liked: "Liked blogs",
          },
          delete: "Delete",
          edit: {
            edit: "Edit Blog",
            change: "Make changes to your blog, click save changes to apply.",
            title: "Title",
            content: "Content",
            short: "Short Description",
            thumb: "Thumbnail",
          },
        },
        subscription: "Choose Your Plan",
        commentsPage: {
          content: "Content",
          likes: "Likes",
          dislikes: "Dislikes",
          created: "Created At",
          actions: "Actions",
          filter: "Filter comments...",
          no: "No results.",
          prev: "Previous",
          next: "Next",
          edit: {
            title: "Edit Comment",
            desc: "Make changes to your comment here, click save when you're done",
            content: "Content",
          },
        },
      },
      history: "History",
      activeTrades: "Active Trades",
      openPosition: "Open Position",
      closePosition: "Close Position",
      takeProfit: "Take Profit",
      stopLoss: "Stop Loss",
      symbol: "Symbol",
      type: "Type",
      mode: "Mode",
      leverage: "Leverage",
      amount: "Amount",
      entryPrice: "Entry Price",
      currentPrice: "Current Price",
      pnl: "PNL",
      exitPrice: "Exit Price",
      profitLoss: "Profit/Loss",
      quantity: "Quantity",
      leverageMultiplier: "Leverage",
      closeTime: "Close Time",
      long: "Long",
      short: "Short",
      tpSl: "TP/SL",
      cancel: "Cancel",
      applyChanges: "Apply Changes",
      percent: "Percent",
      priceUsdt: "Price (USDT)",
      setLimits: "Set Take Profit and Stop Loss",
      download: "Download",
      tradeType: "Trade Type",
      tradeMode: "Trade Mode",
      TP_SL: "TP/SL",
      internetConnectionWarning:
        "Please ensure your internet connection and VPN are active.",
      NoOpenTrade: "There is no open trade",
      signals: {
        pair: "Trading Pair",
        symbol: "Symbol:",
        time: "Time Frame:",
        candles: "Number of Candles",
        signal: "Trading Signal",
        fetching: "Fetching data...",
        no: "No signal generated yet.",
        entry: "Entry Price:",
        profit: "Take Profit:",
        loss: "Stop Loss:",
        level: "Confidence Level:",
        reason: "Reason:",
        title: "AI-Powered Crypto Trading Signal",
        desc: "Get AI-powered trading signals for your favorite crypto pairs in 4 easy steps.",
        getSignal: "Get Signal",
        loading: "Analyzing market data...",
        error: "Error fetching signal. Please try again.",
        analysis: "Market Analysis",
        settings: "Signal Settings",
        disclaimer: "Trading signals are for informational purposes only.",
        accuracy: "Signal Accuracy",
        risk: "Risk Level",
        trend: "Market Trend",
        volume: "Trading Volume",
        selectP: "Select Crypto Pair",
        selectT: "Select Time Frame",
        adjustC: "Adjust Candles",
        generateS: "Generate Signal"
      },
      notFound: {
        title: "Page Not Found",
        subtitle: "The page you're looking for doesn't exist or has been moved.",
        description: "Sorry, we couldn't find the page you're looking for.",
        backHome: "Back to Home",
      },
      loading: {
        title: "Loading...",
        subtitle: "Please wait a moment",
      },
    },
  },
  fa: {
    translation: {
      chat: "چت با هوش مصنوعی",
      message: "پیام خود را تایپ کنید...",
      nav: {
        home: "صفحه اصلی",
        blogs: "مقالات",
        signals: "سیگنال‌ها",
        about: "درباره ما",
        trade: "معامله",
        strategies: "استراتژی‌ها",
        homeDesc: "بازگشت به صفحه اصلی",
        blogsDesc: "آخرین اخبار ارزهای دیجیتال را بررسی کنید",
        signalsDesc: "مشاهده سیگنال‌های ما با پشتیبانی از هوش مصنوعی",
        aboutDesc: "بیشتر درباره TradingAI بدانید",
        tradeDesc: "معاملات خود را انجام دهید",
        strategiesDesc: "آموزش استراتژی‌های معاملاتی",
        market: "بازار",
        learn: "آموزش",
        news: "اخبار",
        marketItems: {
          forex: "فارکس",
          crypto: "ارز دیجیتال",
          stock: "سهام",
          commodities: "کالاها",
          nft: "ان‌اف‌تی"
        },
        learnItems: {
          strategies: "استراتژی‌ها",
          indicators: "اندیکاتورها",
          exams: "آزمون‌ها",
          certificates: "گواهینامه‌ها",
          beginner: "مبتدی",
          markets: "بازارها",
          web3: "وب۳"
        },
        signalsItems: {
          aiGenerator: "سیگنال‌ساز هوشمند",
          suggestions: "پیشنهادات دیگران"
        },
        newsItems: {
          blogs: "مقالات",
          magazine: "مجله خبری",
          events: "رویدادها",
          podcasts: "پادکست‌ها",
          videos: "ویدیوها"
        }
      },
      analyze: {
        title: "رشد معاملاتی خود را نظارت کنید",
        description: "از ابزارهای پیشرفته و تحلیل‌های مبتنی بر هوش مصنوعی ما برای بررسی مسیر معاملاتی خود و بهینه‌سازی استراتژی‌های خود استفاده کنید.",
        execute: "معامله آزمایشی",
        analyze: "خود را تحلیل کنید",
        demo: "معامله آزمایشی",
        desc: "بازار را تحلیل کنید و معاملات خود را در حالت آزمایشی اجرا کنید.",
        titleR: "مربی هوش مصنوعی",
        descR: "مشاهده کنید که در معاملات اخیر خود چگونه عملکرد داشته‌اید",
        titleM: "پیشرفت خود را پیگیری کنید",
        descM: "با استفاده از ابزارهای تحلیلی حرفه‌ای، مسیر پیشرفت معاملاتی خود را دنبال کنید",
        titleF: "سودهای خود را به اشتراک بگذارید",
        descF: "سودهای خود را با دوستانتان به اشتراک بگذارید و آنها را به سایت ما دعوت کنید!"
      },
      dropdown: {
        myAcc: "حساب من",
        dash: "داشبورد",
        profile: "نمایه",
        blogs: "مقالات",
        sub: "اشتراک‌ها",
        out: "خروج",
      },
      auth: {
        login: "ورود",
        getStarted: "شروع کنید",
      },
      hero: {
        title: "تجارت هوشمندانه با هوش مصنوعی",
        title2: "تسلط بر بازار ارزهای دیجیتال",
        description:
          "قدرت تحلیل معاملات مبتنی بر هوش مصنوعی، بینش‌های بازار در لحظه و ابزارهای حرفه‌ای را برای به حداکثر رساندن پتانسیل معاملات ارز دیجیتال خود تجربه کنید.",
        getStarted: "شروع کنید",
        learnMore: "بیشتر بدانید",
      },
      features: {
        title: "ویژگی‌های قدرتمند برای معامله هوشمندانه",
        subtitle: "ابزارهای پیشرفته مبتنی بر هوش مصنوعی برای کمک به تصمیم‌گیری بهتر معاملاتی",
        realtime: {
          title: "تحلیل در زمان واقعی",
          description: "دریافت تحلیل‌های لحظه‌ای و سیگنال‌های معاملاتی بر اساس داده‌های واقعی بازار"
        },
        learn: {
          title: "یادگیری و آزمون",
          description: "با دوره‌های تعاملی استراتژی‌های معاملاتی را بیاموزید و دانش خود را بسنجید"
        },
        update: {
          title: "بروز بمانید",
          description: "جدیدترین اخبار و تحلیل‌های کریپتو را مطالعه کنید"
        },
        advanced: {
          title: "ویژگی‌های پیشرفته",
          description: "ابزارهای حرفه‌ای برای تحلیل و تصمیم‌گیری بهتر"
        }
      },
      stats: {
        title: "مورد اعتماد معامله‌گران در سراسر جهان",
        subtitle:
          "به هزاران معامله‌گر که برای تصمیمات معاملاتی خود به TradingAI اعتماد می‌کنند بپیوندید",
        users: {
          title: "کاربران فعال",
        },
        volume: {
          title: "معاملات روزانه",
        },
        accuracy: {
          title: "دقت سیگنال‌ها",
        },
        countries: {
          title: "کشورها",
        },
        uptime: {
          title: "دسترس‌پذیری پلتفرم",
        },
        support: {
          title: "پشتیبانی مشتریان",
        },
      },
      experience: {
        title: "نظرات کاربران ما",
        subtitle:
          "نظرات معامله‌گران از سراسر دنیا درباره تجربه استفاده از TradingAI را بخوانید",
        testimonials: {
          user1: {
            name: "سارا جانسون",
            role: "معامله‌گر حرفه‌ای",
            content:
              "TradingAI استراتژی معاملاتی من را کاملاً متحول کرده است. سیگنال‌های هوش مصنوعی فوق‌العاده دقیق هستند و تحلیل‌های لحظه‌ای به من در تصمیم‌گیری بهتر کمک می‌کنند.",
          },
          user2: {
            name: "دیوید چن",
            role: "سرمایه‌گذار ارز دیجیتال",
            content:
              "توقعات الذكاء الاصطناعي في المنصة ساعدتني على تحقيق أرباح مستمرة في سوق العملات الرقمية. رابط المستخدم بسيرين وفريق الدعم ممتاز.",
          },
          user3: {
            name: "محمد الراشد",
            role: "معامله‌گر فارکس",
            content:
              "من پلتفرم‌های معاملاتی زیادی را امتحان کرده‌ام، اما TradingAI تتميز بميزاتها المتقدمة وإشاراتها الموثوقة. أصبحت أداة أساسية لتداولي اليومي.",
          },
        },
      },
      startTrading: {
        title: "شروع معامله در 4 مرحله آسان",
        subtitle:
          "این مراحل ساده را برای شروع سفر معاملاتی خود با TradingAI دنبال کنید",
        steps: {
          deposit: {
            title: "واریز وجه",
            description: "واریز ایمن وجه با استفاده از روش‌های پرداخت متنوع",
          },
          analyze: {
            title: "تحلیل بازارها",
            description: "دریافت تحلیل‌های هوشمند و بررسی بازار",
          },
          trade: {
            title: "انجام معاملات",
            description: "معامله با استفاده از پلتفرم ساده ما",
          },
          secure: {
            title: "حفظ امنیت",
            description: "محافظت از دارایی‌های شما با امنیت در سطح بانکی",
          },
        },
        cta: "شروع معامله",
      },
      footer: {
        description:
          "پلتفرم معاملاتی مبتنی بر هوش مصنوعی که به معامله‌گران کمک می‌کند تصمیمات هوشمندانه‌تری با تحلیل و بینش لحظه‌ای بازار بگیرند.",
        product: {
          title: "محصول",
          features: "ویژگی‌ها",
          pricing: "قیمت‌گذاری",
          security: "امنیت",
          enterprise: "نسخه سازمانی",
        },
        company: {
          title: "شرکت",
          about: "درباره ما",
          careers: "فرصت‌های شغلی",
          blog: "وبلاگ",
          press: "رسانه‌ها",
        },
        resources: {
          title: "منابع",
          documentation: "مستندات",
          help: "مرکز کمک",
          api: "رابط برنامه‌نویسی (API)",
          status: "وضعیت",
        },
        legal: {
          title: "قوانین",
          privacy: "حریم خصوصی",
          terms: "شرایط استفاده",
          cookies: "کوکی‌ها",
          licenses: "مجوزها",
        },
        contact: {
          address: "خیابان ۱۲۳ تریدینگ، منطقه مالی، نیویورک",
          phone: "+1 (555) 123-4567",
          email: "contact@tradingai.com",
        },
        social: {
          title: "ما را دنبال کنید",
        },
        newsletter: {
          title: "عضویت در خبرنامه ما",
          placeholder: "ایمیل خود را وارد کنید",
          subscribe: "عضویت",
        },
        copyright: "© {{year}} TradingAI. تمامی حقوق محفوظ است.",
      },
      suggestions: {
        title: "پیشنهادات معاملاتی",
        subtitle:
          "پیشنهادات معاملاتی مبتنی بر هوش مصنوعی با تحلیل دقیق و مدیریت ریسک",
        confidence: "سطح اطمینان",
        entry: "قیمت ورود",
        takeProfit: "حد سود",
        stopLoss: "حد ضرر",
        searchPlaceholder: "جستجو بر اساس نام یا نماد...",
        noResults: "هیچ ارز دیجیتالی یافت نشد",
      },
      blogs: {
        title: "وبلاگ ارزهای دیجیتال",
        subtitle:
          "آخرین اخبار، تحلیل‌ها و بینش‌های مربوط به بازار ارزهای دیجیتال",
        searchPlaceholder: "جستجوی مقالات...",
        readTime: "دقیقه مطالعه",
        comments: "نظرات",
        commentPlaceholder: "نظر خود را بنویسید...",
        submitComment: "ارسال",
      },
      about: {
        title: "درباره تریدینگ AI",
        subtitle: "توانمندسازی معامله‌گران با تحلیل و بینش مبتنی بر هوش مصنوعی",
        stats: {
          users: {
            title: "کاربران فعال",
          },
          countries: {
            title: "کشور",
          },
          uptime: {
            title: "دسترس‌پذیری پلتفرم",
          },
          support: {
            title: "پشتیبانی مشتریان",
          },
        },
        mission: {
          title: "ماموریت ما",
          description:
            "دموکراتیزه کردن معاملات با ارائه ابزارها و بینش‌های پیشرفته مبتنی بر هوش مصنوعی به معامله‌گران در تمام سطوح، کمک به آنها برای تصمیم‌گیری آگاهانه‌تر در بازار ارزهای دیجیتال.",
        },
        team: {
          title: "با تیم ما آشنا شوید",
          navid: "توسعه‌دهنده فرانت‌اند و بک‌اند",
          taha: "توسعه‌دهنده فرانت‌اند",
        },
      },
      profile: {
        tabs: {
          likedBlogs: "بلاگ‌های مورد علاقه",
          comments: "نظرات",
          shared: "اشتراک گذاری",
          suggestions: "پیشنهادات",
          courses: "دوره‌ها",
        },
      },
      dashboard: {
        nav: {
          home: "خانه",
          subscription: "اشتراک",
          signout: "خروج",
        },
        side: {
          dashboard: "داشبورد",
          profile: "نمایه",
          blogs: " بلاگ ها",
          courses: "دوره ها",
          saved: "ذخیره شده",
          likes: "مورد علاقه ها",
          subscriptions: "اشتراک",
          comments: "نظرات",
          signout: "خروج",
        },
        welcome: {
          welcome: "خوش آمدید,",
        },
        pandl: {
          pandl: "س/ض",
          lastMonth: "ماه اخیر",
        },
        position: {
          title: "موقعیت فعلی",
          price: "قیمت",
          view: "مشاهده در نمودارها",
        },
        chart: {
          title: "برد/باخت در ۶ ماه گذشته",
        },
        plan: {
          current: "طرح فعلی",
          upgrade: "ارتقاء طرح",
          view: "مشاهده ویژگی‌ها",
        },
        comments: {
          title: "دیدگاه‌های شما",
        },
        stats: {
          trades: "مجموع معاملات",
          profits: "کل سود",
          win: "نرخ برد",
        },
        course: {
          title: "دوره اخیر",
        },
        blog: {
          title: "بلاگ اخیر",
        },
        modals: {
          save: "ذخیره تغییرات",
          banner: "ویرایش بنر",
          bannerDesc:
            "تغییرات بنر پروفایل خود را اینجا اعمال کنید. پس از اتمام، ذخیره را بزنید.",
          format: "فرمت‌های پشتیبانی شده: PNG, JPG (حداکثر ۵ مگابایت)",
          choose: "یک فایل انتخاب کنید یا آن را اینجا بکشید",
          upload: "فایل‌های آپلود شده:",
          avatar: "ویرایش آواتار",
          avatarDesc:
            "تغییرات آواتار خود را اینجا اعمال کنید. پس از اتمام، ذخیره را بزنید.",
          username: "ویرایش نام کاربری",
          usernameDesc:
            "تغییرات نام کاربری پروفایل خود را اینجا اعمال کنید. پس از اتمام، ذخیره را بزنید.",
          usernameInput: "نام کاربری",
          roleDesc:
            "تغییرات نقش پروفایل خود را اینجا اعمال کنید. پس از اتمام، ذخیره را بزنید.",
          role: "تعديل الدور",
          roleInput: "الدور",
          socialDesc:
            "تغییرات شبکه‌های اجتماعی خود را اینجا اعمال کنید. پس از اتمام، ذخیره را بزنید.",
          social: "تعديل وسائل التواصل الاجتماعي",
          instagram: "اینستاگرام",
          facebook: "فیس‌بوک",
          x: "ایکس",
          style: "تعديل أسلوب التداول",
          styleDesc:
            "تغییرات سبک التداول في ملفك الشخصي هنا. انقر فوق حفظ عند الانتهاء.",
          styleInput: "أسلوب التداول",
        },
        profile: {
          style: "سبک معاملاتی",
          rate: "نرخ برد",
          total: "تعداد معاملات",
          pl: "سود و زیان",
          security: "امنیت",
          email: "ایمیل",
          notification: "اعلان‌ها",
          privacy: "حریم خصوصی",
          auth: "احراز هویت",
          authInput: "احراز هویت دو مرحله‌ای",
          reset: "بازنشانی رمز عبور",
          old: "رمز عبور قدیمی",
          new: "رمز عبور جدید",
          confirm: "تأیید رمز عبور",
          receives: "دریافت اعلان‌ها",
          receivesDesc:
            "عنوان البريد الإلكتروني هذا هو الافتراضي المستخدم في TradingAI.",
          change: "تغییر البريد الإلكتروني",
          notificationInput: "السماح بالإشعارات",
          hideW: "إخفاء معدل الفوز",
          hideT: "إخفاء إجمالي الصفقات",
          hideP: "إخفاء الربح والخسارة",
        },
        sidebar: {
          dash: "داشبورد",
          prof: "نمایه",
          blogs: "مقالات",
          sub: "اشتراک",
        },
        blogs: {
          your: "مدوناتك",
          manage: "قم بإدارة مدوناتك هنا",
          create: "إنشاء مدونة",
          dropdown: {
            your: "مدوناتك",
            disliked: "المدونات غير المحبوبة",
            liked: "المدونات المحبوبة",
          },
          delete: "حذف",
          edit: {
            edit: "تعديل المدونة",
            change:
              "قم بإجراء التعديلات على مدونتك، ثم انقر على حفظ التغييرات لتطبيقها.",
            title: "العنوان",
            content: "المحتوى",
            short: "وصف قصير",
            thumb: "الصورة المصغرة",
          },
        },
        subscription: "اختر خطتك",
        commentsPage: {
          content: "المحتوى",
          likes: "الإعجابات",
          dislikes: "عدم الإعجاب",
          created: "تاريخ الإنشاء",
          actions: "الإجراءات",
          no: "لا توجد نتائج.",
          prev: "السابق",
          next: "التالي",
          edit: {
            title: "تعديل التعليق",
            desc: "قم بإجراء التعديلات على تعليقك هنا، ثم انقر على حفظ عند الانتهاء",
            content: "المحتوى",
          },
        },
      },
      hideW: "إخفاء معدل الفوز",
      hideT: "إخفاء إجمالي الصفقات",
      hideP: "إخفاء الربح والخسارة",
      history: "تاريخچه",
      activeTrades: "معاملات فعال",
      openPosition: "باز کردن معامله",
      closePosition: "بستن معامله",
      takeProfit: "حد سود",
      stopLoss: "حد ضرر",
      symbol: "نماد",
      type: "نوع",
      mode: "حالت",
      leverage: "اهرم",
      amount: "مقدار",
      entryPrice: "قیمت ورود",
      currentPrice: "قیمت لحظه ای",
      pnl: "سود/ضرر",
      exitPrice: "قیمت خروج",
      profitLoss: "سود/ضرر",
      quantity: "مقدار",
      leverageMultiplier: "اهرم",
      closeTime: "تاریخ بسته شدن",
      long: "لانگ",
      short: "شورت",
      tpSl: "TP/SL",
      cancel: "انصراف",
      applyChanges: "تطبيق التغييرات",
      percent: "النسبة المئوية",
      priceUsdt: "السعر (USDT)",
      setLimits: "تعيين حد الربح ووقف الخسارة",
      download: "تحميل",
      tradeType: "نوع التداول",
      tradeMode: "وضع التداول",
      TP_SL: "TP/SL",
      internetConnectionWarning: "يرجى التأكد من اتصال الإنترنت ووجود VPN.",
      NoOpenTrade: "لا توجد أي صفقة مفتوحة",
      signals: {
        pair: "جفت معاملاتی",
        symbol: "نماد:",
        time: "بازه زمانی:",
        candles: "تعداد شمع‌ها",
        signal: "سیگنال معاملاتی",
        fetching: "در حال دریافت داده‌ها...",
        no: "هنوز سیگنالی تولید نشده است.",
        entry: "قیمت ورود:",
        profit: "سود هدف:",
        loss: "حد ضرر:",
        level: "سطح اطمینان:",
        reason: "دلیل:",
        title: "سیگنال معاملاتی کریپتو",
        desc: "سیگنال‌های معاملاتی مبتنی بر هوش مصنوعی برای جفت‌های کریپتویی مورد علاقه شما.",
        getSignal: "دریافت سیگنال",
        loading: "در حال تحلیل داده‌های بازار...",
        error: "خطا در دریافت سیگنال. لطفاً دوباره تلاش کنید.",
        analysis: "تحلیل بازار",
        settings: "تنظیمات سیگنال",
        disclaimer: "سیگنال‌های معاملاتی صرفاً جنبه اطلاع‌رسانی دارند.",
        accuracy: "دقت سیگنال",
        risk: "سطح ریسک",
        trend: "روند بازار",
        volume: "حجم معاملات",
        selectP: "انتخاب جفت‌ارز",
        selectT: "انتخاب بازه زمانی",
        adjustC: "تنظیم تعداد کندل‌ها",
        generateS: "تولید سیگنال"
      },
      notFound: {
        title: "صفحه یافت نشد",
        subtitle: "صفحه مورد نظر شما وجود ندارد یا منتقل شده است.",
        description: "متأسفیم، صفحه‌ای که به دنبال آن هستید پیدا نشد.",
        backHome: "بازگشت به خانه",
      },
      loading: {
        title: "در حال بارگذاری...",
        subtitle: "لطفاً چند لحظه صبر کنید",
      },
      strategies: {
        title: "تسلط بر استراتژی‌های معاملاتی",
        description: "استراتژی‌های حرفه‌ای معاملات را بیاموزید و دانش خود را با تمرین‌های تعاملی و آزمون‌های جامع بسنجید",
        courses: "دوره‌های آموزشی",
        coursesDesc: "دوره‌های حرفه‌ای معاملات از مبتدی تا پیشرفته",
        exercises: "تمرین‌های عملی",
        exercisesDesc: "تمرین‌های تعاملی برای تسلط بر مهارت‌های معاملاتی",
        certificates: "گواهینامه‌ها",
        certificatesDesc: "گواهینامه‌های حرفه‌ای معاملات",
        students: "دانشجویان فعال",
        studentsDesc: "معامله‌گران موفق در جامعه ما",
        startLearning: "شروع یادگیری",
        takeTest: "شرکت در آزمون"
      },
      trading: {
        title: "ابزارهای حرفه‌ای معاملات",
        description: "قدرت معاملات مبتنی بر هوش مصنوعی را با ابزارهای پیشرفته و تحلیل‌های لحظه‌ای تجربه کنید",
        aiSignals: "سیگنال‌های هوشمند",
        aiSignalsDesc: "دریافت سیگنال‌های معاملاتی دقیق با الگوریتم‌های پیشرفته یادگیری ماشین",
        performance: "پیگیری عملکرد",
        performanceDesc: "رصد عملکرد معاملاتی با تحلیل‌های دقیق و بینش‌های عمیق",
        tracking: "تحلیل پیشرفت",
        trackingDesc: "نظارت بر پیشرفت یادگیری و بهبود معاملات در طول زمان",
        analytics: "تحلیل‌های پیشرفته",
        analyticsDesc: "بررسی عمیق الگوهای معاملاتی با ابزارهای تحلیلی حرفه‌ای",
        accuracy: "دقة الإشارة",
        profitRate: "معدل الربح",
        startNow: "شروع معاملات"
      },
      news: {
        explore: "کاوش اخبار",
        read: "خواندن وبلاگ‌ها",
        latest: {
          title: "به‌روز باشید",
          description: "آخرین اخبار و به‌روزرسانی‌های بازار مالی را به صورت لحظه‌ای دریافت کنید",
        },
        impact: {
          title: "تأثیر بر بازار",
          description: "تأثیر اخبار بر روندهای بازار را ببینید و تصمیمات آگاهانه بگیرید",
        },
        blogs: {
          title: "تحلیل‌های بازار",
          description: "مقالات جذاب درباره تحلیل بازار و استراتژی‌های معاملاتی را بخوانید",
        },
        share: {
          title: "اشتراک دانش",
          description: "بینش‌ها و تجربیات معاملاتی خود را با جامعه به اشتراک بگذارید",
        },
      },
    },
  },
  ar: {
    translation: {
      chat: "الدردشة مع الذكاء الاصطناعي",
      message: "اكتب رسالتك...",
      nav: {
        home: "الصفحة الرئيسية",
        blogs: "المدونات",
        signals: "الإشارات",
        about: "من نحن",
        trade: "التداول",
        strategies: "الاستراتيجيات",
        homeDesc: "العودة إلى الصفحة الرئيسية",
        blogsDesc: "استكشف آخر أخبار العملات الرقمية",
        signalsDesc: "عرض إشاراتنا المدعومة بالذكاء الاصطناعي",
        aboutDesc: "تعرف على المزيد حول TradingAI",
        tradeDesc: "قم بتنفيذ صفقاتك",
        strategiesDesc: "تعلم استراتيجيات التداول",
        market: "السوق",
        learn: "التعلم",
        news: "الأخبار",
        marketItems: {
          forex: "فوركس",
          crypto: "العملات الرقمية",
          stock: "الأسهم",
          commodities: "السلع",
          nft: "NFT"
        },
        learnItems: {
          strategies: "الاستراتيجيات",
          indicators: "المؤشرات",
          exams: "الاختبارات",
          certificates: "الشهادات",
          beginner: "المبتدئين",
          markets: "الأسواق",
          web3: "ويب3"
        },
        signalsItems: {
          aiGenerator: "مولد إشارات الذكاء الاصطناعي",
          suggestions: "ماذا يقترح الآخرون؟"
        },
        newsItems: {
          blogs: "المدونات",
          magazine: "مجلة الأخبار",
          events: "الفعاليات",
          podcasts: "البودكاست",
          videos: "الفيديوهات"
        }
      },
      analyze: {
        title: "راقب نمو تداولك",
        description: "استفد من أدواتنا المتقدمة ورؤى الذكاء الاصطناعي لتحليل مسيرتك في التداول وتحسين استراتيجيتك.",
        execute: "تداول تجريبي",
        analyze: "حلل نفسك",
        demo: "تداول تجريبي",
        desc: "قم بتحليل السوق ونفّذ صفقاتك في الوضع التجريبي.",
        titleR: "المرشد بالذكاء الاصطناعي",
        descR: "شاهد كيف كان أداؤك في تداولاتك الأخيرة",
        titleM: "تتبع تقدمك",
        descM: "تتبع تقدمك في رحلتك التداولية باستخدام أدوات التحليل الاحترافية",
        titleF: "شارك أرباحك",
        descF: "شارك أرباحك مع أصدقائك وادعهم إلى موقعنا!"
      },
      dropdown: {
        myAcc: "حسابي",
        dash: "لوحة التحكم",
        profile: "الملف الشخصي",
        blogs: "المدونات",
        sub: "الاشتراكات",
        out: "تسجيل الخروج",
      },
      auth: {
        login: "الدخول",
        getStarted: "ابدأ الآن",
      },
      hero: {
        title: "تداول بذكاء مع الذكاء الاصطناعي",
        title2: "أتقن سوق العملات المشفرة",
        description:
          "اختبر قوة التحليل التداولي المدعوم بالذكاء الاصطناعي، ورؤى السوق في الوقت الفعلي، وأدوات احترافية لتعظيم إمكانات تداول العملات المشفرة الخاصة بك.",
        getStarted: "ابدأ الآن",
        learnMore: "اعرف المزيد",
      },
      features: {
        title: "ميزات قوية لتداول ذكي",
        subtitle:
          "أدوات وميزات متقدمة مدعومة بالذكاء الاصطناعي لمساعدتك على اتخاذ قرارات تداول أفضل",
        realtime: {
          title: "تحليل لحظي",
          description:
            "احصل على تحليل فوري للسوق وإشارات تداول مبنية على بيانات لحظية",
        },
        learn: {
          title: "تعلم واختبر",
          description: "أتقن استراتيجيات التداول من خلال الدورات التفاعلية واختبر معرفتك بالاختبارات الشاملة",
        },
        update: {
          title: "ابقَ على اطلاع",
          description:
            "احصل على آخر أخبار العملات الرقمية وتحليلات السوق ورؤى الخبراء من خلال مدوناتنا وقسم الأخبار المحدث باستمرار",
        },
        advanced: {
          title: "ميزات متقدمة",
          description:
            "أدوات وميزات متقدمة مدعومة بالذكاء الاصطناعي لمساعدتك على اتخاذ قرارات تداول أفضل",
        },
      },
      startTrading: {
        title: "شروع التداول في 4 خطوات سهلة",
        subtitle:
          "اتبع هذه الخطوات البسيطة لبدء رحلة التداول الخاصة بك مع TradingAI",
        steps: {
          deposit: {
            title: "إيداع الأموال",
            description: "إيداع الأموال بأمان باستخدام طرق دفع متعددة",
          },
          analyze: {
            title: "تحليل الأسواق",
            description: "احصل على تحليلات مدعومة بالذكاء الاصطناعي",
          },
          trade: {
            title: "تنفيذ الصفقات",
            description: "ضع الصفقات باستخدام منصتنا سهلة الاستخدام",
          },
          secure: {
            title: "حفظ امنیت",
            description: "محافظت از دارایی‌های شما با امنیت در سطح بانکی",
          },
        },
        cta: "شروع التداول الآن",
      },
      footer: {
        description:
          "منصة تداول مدعومة بالذكاء الاصطناعي تساعد المتداولين على اتخاذ قرارات أكثر ذكاءً من خلال تحليل السوق ورؤى في الوقت الفعلي.",
        product: {
          title: "المنتج",
          features: "الميزات",
          pricing: "التسعير",
          security: "الأمان",
          enterprise: "الشركات",
        },
        company: {
          title: "الشركة",
          about: "من نحن",
          careers: "الوظائف",
          blog: "المدونة",
          press: "الإعلام",
        },
        resources: {
          title: "الموارد",
          documentation: "التوثيق",
          help: "مركز المساعدة",
          api: "رابط برمجة التطبيقات (API)",
          status: "الحالة",
        },
        legal: {
          title: "القانوني",
          privacy: "الخصوصية",
          terms: "الشروط",
          cookies: "ملفات تعريف الارتباط",
          licenses: "التراخيص",
        },
        contact: {
          address: "123 شارع التداول، المنطقة المالية، نيويورك",
          phone: "+1 (555) 123-4567",
          email: "contact@tradingai.com",
        },
        social: {
          title: "تابعنا",
        },
        newsletter: {
          title: "اشترك في النشرة الإخبارية",
          placeholder: "أدخل بريدك الإلكتروني",
          subscribe: "اشترك",
        },
        copyright: "© {{year}} TradingAI. جميع الحقوق محفوظة.",
      },
      suggestions: {
        title: "توصيات التداول",
        subtitle:
          "توصيات التداول مدعومة بالذكاء الاصطناعي بتحليل دقيق وإدارة المخاطر",
        confidence: "مستوى الثقة",
        entry: "سعر الدخول",
        takeProfit: "هدف الربح",
        stopLoss: "وقف الخسارة",
        searchPlaceholder: "البحث بالاسم أو الرمز...",
        noResults: "لم يتم العثور على عملات رقمية مطابقة",
      },
      blogs: {
        title: "مدونة العملات الرقمية",
        subtitle: "آخر الأخبار والتحليلات والرؤى حول سوق العملات الرقمية",
        searchPlaceholder: "ابحث في المقالات...",
        readTime: "دقيقة قراءة",
        comments: "التعليقات",
        commentPlaceholder: "اكتب تعليقك...",
        submitComment: "إرسال",
      },
      about: {
        title: "حول TradingAI",
        subtitle:
          "تمكين المتداولين بالتحليلات والرؤى المدعومة بالذكاء الاصطناعي",
        stats: {
          users: {
            title: "مستخدم نشط",
          },
          countries: {
            title: "دولة",
          },
          uptime: {
            title: "وقت التشغيل",
          },
          support: {
            title: "دعم العملاء",
          },
        },
        mission: {
          title: "مهمتنا",
          description:
            "دموكراتيزه کردن معاملات با ارائه ابزارها و بینش‌های پیشرفته مبتنی بر هوش مصنوعی به معامله‌گران در تمام سطوح، کمک به آنها برای تصمیم‌گیری آگاهانه‌تر در بازار ارزهای دیجیتال.",
        },
        team: {
          title: "با تیم ما آشنا شوید",
          navid: "توسعه‌دهنده فرانت‌اند و بک‌اند",
          taha: "توسعه‌دهنده فرانت‌اند",
        },
      },
      profile: {
        tabs: {
          likedBlogs: "المدونات المفضلة",
          comments: "التعليقات",
          shared: "المشاركات",
          suggestions: "الاقتراحات",
          courses: "الدورات",
        },
      },
      dashboard: {
        nav: {
          home: "الصفحة الرئيسية",
          subscription: "الاشتراكات",
          signout: "تسجيل الخروج",
        },
        side: {
          dashboard: "لوحة التحكم",
          profile: "الملف الشخصي",
          blogs: "المدونات",
          courses: "الدورات",
          saved: "المحفوظات",
          likes: "الإعجابات",
          subscriptions: "الاشتراكات",
          comments: "التعليقات",
        },
        position: {
          title: "الموقع الحالي",
          price: "السعر",
          view: "عرض على الرسوم البيانية",
        },
        chart: {
          title: "الربح/الخسارة في آخر 6 أشهر",
        },
        plan: {
          current: "الخطة الحالية",
          upgrade: "ترقية الخطة",
          view: "مشاهدة الميزات",
        },
        comments: {
          title: "دیدگاه‌های شما",
        },
        stats: {
          trades: "إجمالي الصفقات",
          profits: "إجمالي الأرباح",
          win: "نسبة النجاح",
        },
        course: {
          title: "أحدث دورة",
        },
        blog: {
          title: "حدث مدونة",
        },
        modals: {
          save: "حفظ التغييرات",
          banner: "ویرایش بنر",
          bannerDesc:
            "تغییرات بنر پروفایل خود را اینجا اعمال کنید. پس از اتمام، ذخیره را بزنید.",
          format: "فرمت‌های پشتیبانی شده: PNG, JPG (بحد أقصى 5 ميجابايت)",
          choose: "اختر ملفًا أو اسحبه هنا",
          upload: "الملفات التي تم تحميلها:",
          avatar: "تعديل الصورة الرمزية",
          avatarDesc:
            "تغییرات آواتار خود را اینجا اعمال کنید. پس از اتمام، ذخیره را بزنید.",
          username: "تعديل اسم المستخدم",
          usernameDesc:
            "تغییرات نام کاربری پروفایل خود را اینجا اعمال کنید. پس از اتمام، ذخیره را بزنید.",
          usernameInput: "نام کاربری",
          roleDesc:
            "تغییرات نقش پروفایل خود را اینجا اعمال کنید. پس از اتمام، ذخیره را بزنید.",
          role: "تعديل الدور",
          roleInput: "الدور",
          socialDesc:
            "تغییرات شبکه‌های اجتماعی خود را اینجا اعمال کنید. پس از اتمام، ذخیره را بزنید.",
          social: "تعديل وسائل التواصل الاجتماعي",
          instagram: "إنستغرام",
          facebook: "فيسبوك",
          x: "إكس",
          style: "تعديل أسلوب التداول",
          styleDesc:
            "تغییرات سبک التداول في ملفك الشخصي هنا. انقر فوق حفظ عند الانتهاء.",
          styleInput: "أسلوب التداول",
        },
        profile: {
          style: "أسلوب التداول",
          rate: "معدل الفوز",
          total: "إجمالي الصفقات",
          pl: "الربح والخسارة",
          security: "الأمان",
          email: "البريد الإلكتروني",
          notification: "الإشعارات",
          privacy: "الخصوصية",
          auth: "المصادقة",
          authInput: "المصادقة ذات الخطوتين",
          reset: "إعادة تعيين كلمة المرور",
          old: "كلمة المرور القديمة",
          new: "كلمة المرور الجديدة",
          confirm: "تأييد كلمة المرور",
          receives: "يتلقى الإشعارات",
          receivesDesc:
            "عنوان البريد الإلكتروني هذا هو الافتراضي المستخدم في TradingAI.",
          change: "تغيير البريد الإلكتروني",
          notificationInput: "السماح بالإشعارات",
          hideW: "إخفاء معدل الفوز",
          hideT: "إخفاء إجمالي الصفقات",
          hideP: "إخفاء الربح والخسارة",
        },
        sidebar: {
          dash: "داشبورد",
          prof: "الملف الشخصي",
          blogs: "المدونات",
          sub: "الاشتراك",
        },
        blogs: {
          your: "مدوناتك",
          manage: "قم بإدارة مدوناتك هنا",
          create: "إنشاء مدونة",
          dropdown: {
            your: "مدوناتك",
            disliked: "المدونات غير المحبوبة",
            liked: "المدونات المحبوبة",
          },
          delete: "حذف",
          edit: {
            edit: "تعديل المدونة",
            change:
              "قم بإجراء التعديلات على مدونتك، ثم انقر على حفظ التغييرات لتطبيقها.",
            title: "العنوان",
            content: "المحتوى",
            short: "وصف قصير",
            thumb: "الصورة المصغرة",
          },
        },
        subscription: "اختر خطتك",
        commentsPage: {
          content: "المحتوى",
          likes: "الإعجابات",
          dislikes: "عدم الإعجاب",
          created: "تاريخ الإنشاء",
          actions: "الإجراءات",
          no: "لا توجد نتائج.",
          prev: "السابق",
          next: "التالي",
          edit: {
            title: "تعديل التعليق",
            desc: "قم بإجراء التعديلات على تعليقك هنا، ثم انقر على حفظ عند الانتهاء",
            content: "المحتوى",
          },
        },
      },
      history: "تاريخ",
      activeTrades: "التداولات النشطة",
      openPosition: "فتح مركز",
      closePosition: "إغلاق المركز",
      takeProfit: "أخذ الربح",
      stopLoss: "وقف الخسارة",
      symbol: "الرمز",
      type: "النوع",
      mode: "الوضع",
      leverage: "الرافعة المالية",
      amount: "المبلغ",
      entryPrice: "سعر الدخول",
      currentPrice: "السعر الحالي",
      pnl: "الربح/الخسارة",
      exitPrice: "سعر الخروج",
      profitLoss: "الربح/الخسارة",
      quantity: "الكمية",
      leverageMultiplier: "الرافعة المالية",
      closeTime: "وقت الإغلاق",
      long: "طويل",
      short: "قصير",
      tpSl: "TP/SL",
      cancel: "إلغاء",
      applyChanges: "تطبيق التغييرات",
      percent: "النسبة المئوية",
      priceUsdt: "السعر (USDT)",
      setLimits: "تعيين حد الربح ووقف الخسارة",
      download: "تحميل",
      tradeType: "نوع التداول",
      tradeMode: "وضع التداول",
      TP_SL: "TP/SL",
      internetConnectionWarning: "يرجى التأكد من اتصال الإنترنت ووجود VPN.",
      NoOpenTrade: "لا توجد أي صفقة مفتوحة",
      signals: {
        pair: "زوج التداول",
        symbol: "الرمز:",
        time: "الإطار الزمني:",
        candles: "عدد الشموع",
        signal: "إشارة التداول",
        fetching: "جارٍ جلب البيانات...",
        no: "لم يتم توليد إشارة بعد.",
        entry: "سعر الدخول:",
        profit: "هدف الربح:",
        loss: "وقف الخسارة:",
        level: "مستوى الثقة:",
        reason: "السبب:",
        title: "إشارة تداول العملات الرقمية",
        desc: "احصل على إشارات التداول المدعومة بالذكاء الاصطناعي لأزواج العملات الرقمية المفضلة لديك.",
        getSignal: "الحصول على الإشارة",
        loading: "تحليل بيانات السوق...",
        error: "خطأ في جلب الإشارة. يرجى المحاولة مرة أخرى.",
        analysis: "تحليل السوق",
        settings: "إعدادات الإشارة",
        disclaimer: "إشارات التداول لأغراض إعلامية فقط.",
        accuracy: "دقة الإشارة",
        risk: "مستوى المخاطرة",
        trend: "اتجاه السوق",
        volume: "حجم التداول",
        selectP: "اختيار زوج العملات",
        selectT: "اختيار الإطار الزمني",
        adjustC: "تعديل عدد الشموع",
        generateS: "إنشاء الإشارة",
      },
      notFound: {
        title: "الصفحة غير موجودة",
        subtitle: "الصفحة التي تبحث عنها غير موجودة أو تم نقلها.",
        description: "عذراً، لم نتمكن من العثور على الصفحة التي تبحث عنها.",
        backHome: "العودة إلى الرئيسية",
      },
      loading: {
        title: "در حال بارگذاری...",
        subtitle: "لطفاً چند لحظه صبر کنید",
      },
      strategies: {
        title: "إتقان استراتيجيات التداول",
        description: "تعلم استراتيجيات التداول المهنية واختبر معرفتك من خلال التمارين التفاعلية والاختبارات الشاملة",
        courses: "دورات التداول",
        coursesDesc: "دورات تداول احترافية من المبتدئ إلى المتقدم",
        exercises: "تمارين عملية",
        exercisesDesc: "تمارين تفاعلية لإتقان مهارات التداول",
        certificates: "الشهادات",
        certificatesDesc: "شهادات التداول المهنية",
        students: "الطلاب النشطون",
        studentsDesc: "المتداولون الناجحون في مجتمعنا",
        startLearning: "ابدأ التعلم",
        takeTest: "خذ اختبارًا"
      },
      trading: {
        title: "أدوات التداول المهنية",
        description: "اختبر قوة التداول المدعوم بالذكاء الاصطناعي مع أدواتنا المتقدمة والتحليلات في الوقت الفعلي",
        aiSignals: "إشارات الذكاء الاصطناعي",
        aiSignalsDesc: "احصل على إشارات تداول دقيقة مدعومة بخوارزميات التعلم الآلي المتقدمة",
        performance: "تتبع الأداء",
        performanceDesc: "تتبع أداء التداول الخاص بك مع التحليلات والرؤى المفصلة",
        tracking: "تحليل التقدم",
        trackingDesc: "مراقبة تقدم التعلم وتحسين التداول بمرور الوقت",
        analytics: "تحليلات متقدمة",
        analyticsDesc: "تعمق في أنماط التداول الخاصة بك مع أدوات التحليل المهنية",
        accuracy: "دقة الإشارة",
        profitRate: "معدل الربح",
        startNow: "ابدأ التداول الآن"
      },
      news: {
        explore: "استكشاف الأخبار",
        read: "قراءة المدونات",
        latest: {
          title: "ابق على اطلاع",
          description: "احصل على آخر أخبار السوق المالية وتحديثاتها في الوقت الفعلي",
        },
        impact: {
          title: "تأثير السوق",
          description: "شاهد كيف تؤثر الأخبار على اتجاهات السوق واتخذ قرارات مدروسة",
        },
        blogs: {
          title: "رؤى السوق",
          description: "اقرأ مدونات مثيرة للاهتمام حول تحليل السوق واستراتيجيات التداول",
        },
        share: {
          title: "شارك المعرفة",
          description: "شارك رؤاك وخبراتك في التداول مع المجتمع",
        },
      },
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
