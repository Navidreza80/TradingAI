"use client";

import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
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
        title: "Smart Trading Decisions",
        title2: "with AI-Powered Insights",
        description:
          "Get real-time trading suggestions powered by artificial intelligence and comprehensive market analysis.",
        getStarted: "Get Started",
        learnMore: "Learn More",
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
        ai: {
          title: "AI-Powered Insights",
          description: "Use AI to generate trading signals",
        },
        secure: {
          title: "Secure Trading",
          description:
            "Your assets are protected with military-grade encryption and security measures",
        },
        advanced: {
          title: "Advanced Features",
          description:
            "Advanced tools and features powered by artificial intelligence to help you make better trading decisions",
        },
      },
      stats: {
        title: "Trusted by Traders Worldwide",
        subtitle:
          "Join thousands of traders who trust TradingAI for their trading decisions",
        users: {
          title: "Active Users",
        },
        volume: {
          title: "Daily Trades",
        },
        accuracy: {
          title: "Signal Accuracy",
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
      experience: {
        title: "What Our Users Say",
        subtitle:
          "Read what traders around the world say about their experience with TradingAI",
        testimonials: {
          user1: {
            name: "Sarah Johnson",
            role: "Professional Trader",
            content:
              "TradingAI has completely transformed my trading strategy. The AI signals are incredibly accurate and the real-time analysis helps me make better decisions.",
          },
          user2: {
            name: "David Chen",
            role: "Crypto Investor",
            content:
              "The platform's AI predictions have helped me achieve consistent profits in the crypto market. The user interface is intuitive and the support team is excellent.",
          },
          user3: {
            name: "Mohammed Al-Rashid",
            role: "Forex Trader",
            content:
              "I've tried many trading platforms, but TradingAI stands out with its advanced features and reliable signals. It's become an essential tool for my daily trading.",
          },
        },
      },
      startTrading: {
        title: "Start Trading in 4 Easy Steps",
        subtitle:
          "Follow these simple steps to start your trading journey with TradingAI",
        steps: {
          deposit: {
            title: "Deposit Funds",
            description:
              "Securely deposit funds using multiple payment methods",
          },
          analyze: {
            title: "Analyze Markets",
            description: "Get AI-powered insights and market analysis",
          },
          trade: {
            title: "Execute Trades",
            description: "Place trades with our easy-to-use platform",
          },
          secure: {
            title: "Stay Secure",
            description: "Your funds are protected with bank-grade security",
          },
        },
        cta: "Start Trading Now",
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
      profile: {
        tabs: {
          likedBlogs: "Blogs I Like",
          comments: "Comments",
          shared: "Shared",
          suggestions: "Suggestions",
          courses: "Courses",
        },
      },
      dashboard: {
        nav: {
          home: "Home",
          subscription: "Subscriptions",
          signout: "SignOut",
        },
        side: {
          dashboard: "dashboard",
          profile: "profile",
          blogs: "blogs",
          subscriptions: "subscriptions",
          comments: "comments",
        },
        welcome: {
          welcome: "Welcome back,",
        },
        pandl: {
          pandl: "P&L",
          lastMonth: "Last Month",
        },
        position: {
          title: "Current Position",
          price: "Price",
          view: "View On Charts",
        },
        chart: {
          title: "W/L last 6 month",
        },
        plan: {
          current: "Current Plan",
          upgrade: "upgrade plan",
          view: "view features",
        },
        comments: {
          title: "Your Comments",
        },
        stats: {
          trades: "Total Trades",
          profits: "Total Profits",
          win: "Win Rate",
        },
        course: {
          title: "Latest Course",
        },
        blog: {
          title: "Latest Blog",
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
          roleDesc:
            "            Make changes to your profile role here. Click save when you are done.",
          role: "Edit Role",
          roleInput: "Role",
          socialDesc:
            "Make changes to your social media here. Click save when you are done.",
          social: "Edit Social Media",
          instagram: "Instagram",
          facebook: "Facebook",
          x: "X",
          style: "Edit Trading Style",
          styleDesc:
            "Make changes to your profile trading style here. Click save when you are done.",
          styleInput: "Trading Style",
        },
        profile: {
          style: "Trading Style",
          rate: "Win Rate",
          total: "Total Trades",
          pl: "P&L",
          security: "Security",
          email: "Email",
          notification: "Notification",
          privacy: "Privacy",
          auth: "Authentication",
          authInput: "Two Step Authentication",
          reset: "Reset Password",
          old: "Old Password",
          new: "New Password",
          confirm: "Confirm Password",
          receives: "Receives Notifications",
          receivesDesc: "This email address is the default used for TradingAI.",
          change: "Change Email",
          notificationInput: "Allow Notification",
          hideW: "Hide Win Rate",
          hideT: "Hide Total Trades",
          hideP: "Hide P&L",
        },
        sidebar: {
          dash: "Dashboard",
          prof: "Profile",
          blogs: "Blogs",
          sub: "Subscription",
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
    },
  },
  fa: {
    translation: {
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
        title: "تصمیمات معاملاتی با هوش مصنوعی",
        title2: "با پیشنهادهای هوش مصنوعی",
        description:
          "دریافت پیشنهادات معاملاتی بلادرنگ با استفاده از هوش مصنوعی و تحلیل جامع بازار.",
        getStarted: "شروع کنید",
        learnMore: "بیشتر بدانید",
      },
      features: {
        title: "امکانات قوی برای تداول با هوش مصنوعی",
        subtitle:
          "امکانات پیشرفته مدعوم با هوش مصنوعی برای کمک به تصمیم‌گیری بهتر در معاملات",
        realtime: {
          title: "تحلیل لحظه‌ای",
          description:
            "دریافت تحلیل لحظه‌ای و سیگنال‌های معاملاتی بر اساس داده‌های لحظه‌ای",
        },
        ai: {
          title: "هوش مصنوعی",
          description: "استفاده از هوش مصنوعی برای تولید سیگنال‌های معاملاتی",
        },
        secure: {
          title: "امنیت",
          description: "دارایی‌های شما با امنیت در سطح بانکی محافظت می‌شوند",
        },
        advanced: {
          title: "امکانات پیشرفته",
          description:
            "امکانات پیشرفته مدعوم با هوش مصنوعی برای کمک به تصمیم‌گیری بهتر در معاملات",
        },
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
              "پیش‌بینی‌های هوش مصنوعی این پلتفرم به من کمک کرده‌اند تا در بازار کریپتو سودهای پایداری کسب کنم. رابط کاربری بسیار روان است و تیم پشتیبانی عالی عمل می‌کند.",
          },
          user3: {
            name: "محمد الرشید",
            role: "معامله‌گر فارکس",
            content:
              "من پلتفرم‌های معاملاتی زیادی را امتحان کرده‌ام، اما TradingAI با ویژگی‌های پیشرفته و سیگنال‌های قابل اعتماد خود متمایز است. این پلتفرم به ابزاری ضروری برای معاملات روزانه من تبدیل شده است.",
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
          role: "ویرایش نقش",
          roleInput: "نقش",
          socialDesc:
            "تغییرات شبکه‌های اجتماعی خود را اینجا اعمال کنید. پس از اتمام، ذخیره را بزنید.",
          social: "ویرایش شبکه‌های اجتماعی",
          instagram: "اینستاگرام",
          facebook: "فیس‌بوک",
          x: "ایکس",
          style: "ویرایش سبک معاملاتی",
          styleDesc:
            "تغییرات سبک معاملاتی پروفایل خود را اینجا اعمال کنید. پس از اتمام، ذخیره را بزنید.",
          styleInput: "سبک معاملاتی",
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
            "این آدرس ایمیل به‌طور پیش‌فرض برای TradingAI استفاده می‌شود.",
          change: "تغییر ایمیل",
          notificationInput: "اجازه اعلان‌ها",
          hideW: "پنهان کردن نرخ برد",
          hideT: "پنهان کردن تعداد معاملات",
          hideP: "پنهان کردن سود و زیان",
        },
        sidebar: {
          dash: "داشبورد",
          prof: "نمایه",
          blogs: "مقالات",
          sub: "اشتراک",
        },
        blogs: {
          your: "وبلاگ‌های شما",
          manage: "وبلاگ‌های خود را در اینجا مدیریت کنید",
          create: "ایجاد وبلاگ",
          dropdown: {
            your: "وبلاگ‌های شما",
            disliked: "وبلاگ‌های نپسندیده",
            liked: "وبلاگ‌های پسندیده",
          },
          edit: {
            edit: "ویرایش وبلاگ",
            change:
              "تغییرات مورد نظر را در وبلاگ خود اعمال کنید و روی ذخیره تغییرات کلیک کنید.",
            title: "عنوان",
            content: "محتوا",
            short: "توضیح کوتاه",
            thumb: "تصویر شاخص",
          },
        },
        subscription: "طرح خود را انتخاب کنید",
        commentsPage: {
          content: "محتوا",
          likes: "پسندها",
          dislikes: "نپسندها",
          created: "ایجاد شده در",
          actions: "عملیات",
          no: "نتیجه‌ای یافت نشد.",
          prev: "قبلی",
          next: "بعدی",
          edit: {
            title: "ویرایش دیدگاه",
            desc: "تغییرات مورد نظر خود را در اینجا اعمال کنید و پس از اتمام، روی ذخیره کلیک کنید",
            content: "محتوا",
          },
        },
      },
    },
  },
  ar: {
    translation: {
      nav: {
        home: "الرئيسية",
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
        title: "اتخاذ قرارات ذكية في الأسواق المالية",
        title2: "مع اقتراحات الذكاء الاصطناعي",
        description:
          "احصل على توصيات التداول في الوقت الفعلي مدعومة بالذكاء الاصطناعي وتحليل السوق الشامل.",
        getStarted: "ابدأ الآن",
        learnMore: "اعرف المزيد",
      },
      features: {
        title: "الميزات القوية",
        subtitle:
          "الميزات المتقدمة مدعومة بالذكاء الاصطناعي لمساعدتك في اتخاذ قرارات تداول أفضل",
        realtime: {
          title: "التحليل اللحظي",
          description:
            "احصل على تحليل فوري للسوق وإشارات تداول بناءً على البيانات في الوقت الحقيقي",
        },
        ai: {
          title: "رؤى مدعومة بالذكاء الاصطناعي",
          description: "استخدم الذكاء الاصطناعي لإنشاء إشارات التداول",
        },
        secure: {
          title: "تداول آمن",
          description: "أصولك محمية بتشفير عسكري وإجراءات أمان متقدمة",
        },
        advanced: {
          title: "ميزات متقدمة",
          description:
            "أدوات وميزات متطورة مدعومة بالذكاء الاصطناعي لمساعدتك على اتخاذ قرارات تداول أفضل",
        },
      },
      stats: {
        title: "موثوق به من قبل المتداولين حول العالم",
        subtitle:
          "انضم إلى الآلاف من المتداولين الذين يثقون بـ TradingAI في قراراتهم التجارية",
        users: {
          title: "المستخدمون النشطون",
        },
        volume: {
          title: "التداولات اليومية",
        },
        accuracy: {
          title: "دقة الإشارات",
        },
        countries: {
          title: "الدول",
        },
        uptime: {
          title: "وقت التشغيل",
        },
        support: {
          title: "دعم العملاء",
        },
      },
      experience: {
        title: "ماذا يقول مستخدمونا",
        subtitle: "اقرأ ما يقوله المتداولين حول العالم عن تجربتهم مع TradingAI",
        testimonials: {
          user1: {
            name: "سارة جونسون",
            role: "متداولة محترفة",
            content:
              "TradingAI غيّرت استراتيجيتي في التداول بشكل كامل. إشارات الذكاء الاصطناعي دقيقة للغاية، والتحليل الفوري يساعدني في اتخاذ قرارات أفضل.",
          },
          user2: {
            name: "ديفيد تشين",
            role: "مستثمر في العملات الرقمية",
            content:
              "توقعات الذكاء الاصطناعي في المنصة ساعدتني على تحقيق أرباح مستمرة في سوق العملات الرقمية. واجهة المستخدم بديهية وفريق الدعم ممتاز.",
          },
          user3: {
            name: "محمد الراشد",
            role: "متداول فوركس",
            content:
              "لقد جربت العديد من منصات التداول، ولكن TradingAI تتميز بميزاتها المتقدمة وإشاراتها الموثوقة. أصبحت أداة أساسية لتداولي اليومي.",
          },
        },
      },
      startTrading: {
        title: "ابدأ التداول في 4 خطوات سهلة",
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
            title: "الحفاظ على الأمن",
            description: "محافظت از دارایی‌های شما با امنیت در سطح بانکی",
          },
        },
        cta: "ابدأ التداول الآن",
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
          api: "واجهة برمجة التطبيقات (API)",
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
            "إضفاء الطابع الديمقراطي على التداول من خلال توفير أدوات ورؤى متقدمة مدعومة بالذكاء الاصطناعي للمتداولين من جميع المستويات، ومساعدتهم على اتخاذ قرارات أكثر استنارة في سوق العملات الرقمية.",
        },
        team: {
          title: "تعرف على فريقنا",
          navid: "مطور الواجهة الأمامية والخلفية",
          taha: "مطور الواجهة الأمامية",
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
          title: "تعليقاتك",
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
          banner: "تعديل البانر",
          bannerDesc:
            "قم بإجراء تغييرات على بانر ملفك الشخصي هنا. انقر فوق حفظ عند الانتهاء.",
          format: "التنسيقات المدعومة: PNG, JPG (بحد أقصى 5 ميجابايت)",
          choose: "اختر ملفًا أو اسحبه هنا",
          upload: "الملفات التي تم تحميلها:",
          avatar: "تعديل الصورة الرمزية",
          avatarDesc:
            "قم بإجراء تغييرات على صورتك الرمزية هنا. انقر فوق حفظ عند الانتهاء.",
          username: "تعديل اسم المستخدم",
          usernameDesc:
            "قم بإجراء تغييرات على اسم مستخدم ملفك الشخصي هنا. انقر فوق حفظ عند الانتهاء.",
          usernameInput: "اسم المستخدم",
          roleDesc:
            "قم بإجراء تغييرات على دور ملفك الشخصي هنا. انقر فوق حفظ عند الانتهاء.",
          role: "تعديل الدور",
          roleInput: "الدور",
          socialDesc:
            "قم بإجراء تغييرات على وسائل التواصل الاجتماعي هنا. انقر فوق حفظ عند الانتهاء.",
          social: "تعديل وسائل التواصل الاجتماعي",
          instagram: "إنستغرام",
          facebook: "فيسبوك",
          x: "إكس",
          style: "تعديل أسلوب التداول",
          styleDesc:
            "قم بإجراء تغييرات على أسلوب التداول في ملفك الشخصي هنا. انقر فوق حفظ عند الانتهاء.",
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
          confirm: "تأكيد كلمة المرور",
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
          dash: "لوحة التحكم",
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
