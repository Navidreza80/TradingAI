'use client'

import { useEffect, useRef, useState } from 'react'

let tvScriptLoadingPromise: Promise<void> | null = null;

/**
 * تعریف پراپ‌های کامپوننت TradingViewWidget
 * @interface TradingViewWidgetProps
 * @property {string} symbol - نماد جفت ارز (مثال: 'BTCUSDT')
 * @property {function} onPriceChange - تابع کالبک برای تغییرات قیمت
 */
interface TradingViewWidgetDarkProps {
  symbol: string;
  onPriceChange?: (price: number) => void;
  theme?: string;
}

/**
 * تنظیمات کلی ویجت TradingView
 * شامل تمام تنظیمات ظاهری و رفتاری چارت
 */
const widgetConfig = {
  // تنظیمات پایه چارت
  chartConfig: {
    autosize: true,
    interval: "1", // تایم‌فریم یک دقیقه‌ای
    timezone: "Asia/Tehran",
    theme: "dark",
    style: "1", // نمودار شمعی
    locale: "fa_IR",
    toolbar_bg: "#131722",
    enable_publishing: false,
    allow_symbol_change: false,
    width: "100%",
    height: "600px",
    save_image: true,
    hide_side_toolbar: false,
    hide_legend: false,
    hide_volume: false,
    hide_drawing_toolbar: false,
  },

  // ابزارهای رسم برای تحلیل تکنیکال
  drawingTools: [
    "Regression Trend", // خط روند رگرسیون
    "Trend Line", // خط روند
    "Horizontal Line", // خط افقی
    "Vertical Line", // خط عمودی
    "Fibonacci Retracement", // فیبوناچی
    "Rectangle", // مستطیل
    "Circle", // دایره
    "Arrow Marker", // فلش
    "Text" // متن
  ],

  // ویژگی‌های غیرفعال در چارت
  disabledFeatures: [
    "header_symbol_search", // جستجوی نماد
    "header_interval_dialog_button", // دکمه تغییر تایم‌فریم
    "show_interval_dialog_on_key_press", // نمایش دیالوگ تایم‌فریم با کلید
    "timeframes_toolbar", // نوار تایم‌فریم‌ها
    "header_compare", // مقایسه نمادها
    "header_undo_redo", // دکمه‌های برگشت
    "header_screenshot", // دکمه اسکرین‌شات
    "header_saveload", // ذخیره و بارگذاری
  ],

  // ویژگی‌های فعال در چارت
  enabledFeatures: [
    "study_templates", // قالب‌های اندیکاتور
    "use_localstorage_for_settings", // ذخیره تنظیمات
    "save_chart_properties_to_local_storage", // ذخیره ویژگی‌های چارت
    "create_volume_indicator_by_default",
    "volume_force_overlay",
    "display_market_status",
    "legend_context_menu",
    "main_series_scale_menu",
    "show_chart_property_page",
    "chart_crosshair_menu",
    "chart_events",
    "header_chart_type",
    "header_indicators",
    "header_settings",
    "left_toolbar",
    "right_toolbar",
    "control_bar",
    "show_hide_button_in_legend",
    "format_button_in_legend",
    "study_buttons_in_legend",
    "delete_button_in_legend",
    "context_menus",
    "border_around_the_chart",
    "chart_property_page_trading",
    "header_fullscreen_button", // فعال کردن دکمه تمام صفحه داخلی TradingView
  ],

  // رنگ‌بندی چارت
  chartStyles: {
    upColor: "#448717", // رنگ سبز برای حرکت صعودی
    downColor: "#ef5350", // رنگ قرمز برای حرکت نزولی
  },

  // تنظیمات ظاهری اندیکاتورها
  studyOverrides: {
    volume: {
      colors: ["#ef5350", "#26a69a"], // رنگ‌های حجم معاملات
      transparency: 70, // شفافیت
      maColor: "#FF9800", // رنگ میانگین متحرک
      maTransparency: 30,
      maLinewidth: 2,
      showMa: true,
    },
    bollinger: {
      median: "#33FF88", // خط میانی باند بولینگر
      upper: "#4CAF50", // باند بالایی
      lower: "#F44336", // باند پایینی
    },
    macd: {
      signal: "#FF9800", // خط سیگنال
      main: "#2196F3", // خط اصلی
      histogram: "#4CAF50", // هیستوگرام
    },
  },
}

/**
 * کامپوننت TradingViewWidget
 * نمایش چارت TradingView با به‌روزرسانی قیمت لحظه‌ای
 */
export const TradingViewWidgetDark: React.FC<TradingViewWidgetDarkProps> = ({
  symbol,
  onPriceChange,
  theme = "dark"
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scriptRef = useRef<HTMLScriptElement | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // اضافه کردن event listener برای تشخیص خروج از حالت تمام صفحه
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
      document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
    };
  }, []);

  useEffect(() => {
    // تبدیل فرمت نماد به فرمت مورد نیاز TradingView
    const formattedSymbol = symbol.replace("/", "");
    
    // حذف اسکریپت قبلی اگر وجود داشته باشد
    if (scriptRef.current) {
      scriptRef.current.remove();
      scriptRef.current = null;
    }

    // پاک کردن محتوای کانتینر
    if (containerRef.current) {
      containerRef.current.innerHTML = '';
    }

    // ایجاد اسکریپت جدید
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/tv.js";
    script.async = true;
    script.onload = () => {
      if (window.TradingView && containerRef.current) {
        new window.TradingView.widget({
          autosize: true,
          symbol: `BINANCE:${formattedSymbol}`,
          interval: "1",
          timezone: "Etc/UTC",
          theme: theme,
        style: "1",
          locale: "en",
          toolbar_bg: theme === 'dark' ? "#2a2e39" : "#f1f3f6",
        enable_publishing: false,
          allow_symbol_change: false, // غیرفعال کردن تغییر نماد
          container_id: "tradingview_widget",
        hide_side_toolbar: false,
        disabled_features: [
            "header_symbol_search", // حذف جستجوی نماد
            "symbol_search_hot_key", // حذف کلید میانبر جستجو
            "header_compare", // حذف مقایسه نمادها
          ],
        enabled_features: [
            "header_fullscreen_button", // فعال کردن دکمه تمام صفحه داخلی TradingView
          ],
        });
      }
    };

    // ذخیره مرجع اسکریپت و اضافه کردن به DOM
    scriptRef.current = script;
    document.head.appendChild(script);

    return () => {
      // پاکسازی در هنگام unmount
      if (scriptRef.current) {
        scriptRef.current.remove();
      }
    };
  }, [symbol, theme]);

  return (
    <div
      ref={containerRef}
      id="tradingview_widget" 
      style={{ 
        height: isFullscreen ? "100vh" : "100%", 
        width: "100%",
        transition: "all 0.3s ease"
      }}
      className={isFullscreen ? "fixed top-0 left-0 z-50" : ""}
    />
  );
};

/**
 * تبدیل نماد معاملاتی به شناسه CoinGecko
 * @param symbol نماد معاملاتی (مثال: 'BTCUSDT')
 * @returns شناسه CoinGecko (مثال: 'bitcoin')
 */
function convertSymbolToCoinId(symbol: string): string {
  return symbol.toLowerCase()
    .replace('usdt', '')
    .replace('btc', 'bitcoin')
    .replace('eth', 'ethereum')
    .replace('bnb', 'binancecoin')
}

/**
 * راه‌اندازی ویجت TradingView با تمام تنظیمات
 * @param container المان DOM برای رندر ویجت
 * @param symbol نماد معاملاتی
 * @param widgetRef رفرنس برای ذخیره نمونه ویجت
 * @param setIsWidgetReady تابع تنظیم وضعیت آماده بودن ویجت
 * @returns تابع پاکسازی
 */
function setupTradingViewWidget(
  container: HTMLDivElement,
  symbol: string,
  widgetRef: React.MutableRefObject<any>,
  setIsWidgetReady: (ready: boolean) => void
) {
  const script = document.createElement('script')
  script.src = 'https://s3.tradingview.com/tv.js'
  script.async = true

  script.onload = () => {
    if (!window.TradingView) return

    // Load saved chart settings from localStorage
    const savedSettings = localStorage.getItem(`tradingview.chart.${symbol}`)
    const chartSettings = savedSettings ? JSON.parse(savedSettings) : {}

    // Initialize widget with all configurations
    widgetRef.current = new window.TradingView.widget({
      ...widgetConfig.chartConfig,
      symbol: `BINANCE:${symbol}`,
      container_id: "tradingview_widget",
      drawings_access: { type: 'all', tools: widgetConfig.drawingTools },
      disabled_features: widgetConfig.disabledFeatures,
      enabled_features: widgetConfig.enabledFeatures,
      overrides: generateChartOverrides(widgetConfig.chartStyles),
      studies_overrides: generateStudyOverrides(widgetConfig.studyOverrides),
      loading_screen: { backgroundColor: "#131722" },
      saved_data: chartSettings,
      auto_save_delay: 5,
      client_id: "tradingview.com",
      user_id: "public_user",
      favorites: {
        intervals: ["1", "5", "15", "30", "60", "240", "1D", "1W", "1M"],
        chartTypes: ["Candlestick"]
      },
      callback: () => initializeWidget(widgetRef.current, symbol, setIsWidgetReady, chartSettings)
    })
  }

  container.innerHTML = '<div id="tradingview_widget"></div>'
  document.head.appendChild(script)

  return () => cleanup(widgetRef.current, symbol, container, script)
}

/**
 * تولید تنظیمات ظاهری چارت از پیکربندی
 * @param styles تنظیمات استایل چارت
 * @returns آبجکت تنظیمات ظاهری
 */
function generateChartOverrides(styles: typeof widgetConfig.chartStyles) {
  return {
    "mainSeriesProperties.candleStyle.upColor": styles.upColor,
    "mainSeriesProperties.candleStyle.downColor": styles.downColor,
    "mainSeriesProperties.candleStyle.drawWick": true,
    "mainSeriesProperties.candleStyle.drawBorder": true,
    "mainSeriesProperties.candleStyle.borderUpColor": styles.upColor,
    "mainSeriesProperties.candleStyle.borderDownColor": styles.downColor,
    "mainSeriesProperties.candleStyle.wickUpColor": styles.upColor,
    "mainSeriesProperties.candleStyle.wickDownColor": styles.downColor,
    "paneProperties.background": "#131722",
    "paneProperties.vertGridProperties.color": "#363c4e",
    "paneProperties.horzGridProperties.color": "#363c4e",
    "scalesProperties.textColor": "#AAA"
  }
}

/**
 * تولید تنظیمات ظاهری اندیکاتورها
 * @param studies تنظیمات استایل اندیکاتورها
 * @returns آبجکت تنظیمات اندیکاتورها
 */
function generateStudyOverrides(studies: typeof widgetConfig.studyOverrides) {
  return {
    "volume.volume.color.0": studies.volume.colors[0],
    "volume.volume.color.1": studies.volume.colors[1],
    "volume.volume.transparency": studies.volume.transparency,
    "volume.volume ma.color": studies.volume.maColor,
    "volume.volume ma.transparency": studies.volume.maTransparency,
    "volume.volume ma.linewidth": studies.volume.maLinewidth,
    "volume.show ma": studies.volume.showMa,
    "bollinger bands.median.color": studies.bollinger.median,
    "bollinger bands.upper.color": studies.bollinger.upper,
    "bollinger bands.lower.color": studies.bollinger.lower,
    "macd.signal.color": studies.macd.signal,
    "macd.macd.color": studies.macd.main,
    "macd.histogram.color": studies.macd.histogram
  }
}

/**
 * مقداردهی اولیه ویجت پس از آماده شدن
 * راه‌اندازی ذخیره خودکار و بارگذاری تنظیمات ذخیره شده
 */
function initializeWidget(
  widget: any,
  symbol: string,
  setIsWidgetReady: (ready: boolean) => void,
  chartSettings: any,
  onPriceChange?: (price: number) => void
) {
  setIsWidgetReady(true);

  const chart = widget.chart();

  // دریافت قیمت از چارت در هر تغییر
  chart.onSymbolChanged().subscribe(null, () => {
    const symbolInfo = chart.symbolExt();
    if (symbolInfo && symbolInfo.last_price && onPriceChange) {
      onPriceChange(symbolInfo.last_price);
    }
  });

  // دریافت قیمت در هر تیک جدید
  chart.onDataLoaded().subscribe(null, () => {
    const symbolInfo = chart.symbolExt();
    if (symbolInfo && symbolInfo.last_price && onPriceChange) {
      onPriceChange(symbolInfo.last_price);
    }
  });

  // ذخیره تنظیمات
  chart.onAutoSaveNeeded().subscribe(null, () => {
    try {
      const chartData = widget.save();
      localStorage.setItem(`tradingview.chart.${symbol}`, JSON.stringify(chartData));
    } catch (error) {
      console.error('Error saving chart settings:', error);
    }
  });

  // بارگذاری تنظیمات قبلی
  if (chartSettings) {
    try {
      widget.load(chartSettings);
    } catch (error) {
      console.error('Error loading chart settings:', error);
    }
  }
}

/**
 * تابع پاکسازی برای unmount شدن ویجت
 * ذخیره تنظیمات فعلی و حذف المان‌های DOM
 */
function cleanup(widget: any, symbol: string, container: HTMLDivElement, script: HTMLScriptElement) {
  if (widget) {
    try {
      const chartData = widget.save()
      localStorage.setItem(`tradingview.chart.${symbol}`, JSON.stringify(chartData))
    } catch (error) {
      console.error('Error saving chart settings on unmount:', error)
    }
  }

  container.innerHTML = ''
  script.remove()
}

declare global {
  interface Window {
    TradingView: any
  }
} 