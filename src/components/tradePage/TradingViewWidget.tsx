/* eslint-disable */
'use client'

import { useEffect, useRef } from 'react'

let tvScriptLoadingPromise: Promise<void> | null = null;

/**
 * تعریف پراپ‌های کامپوننت TradingViewWidget
 * @interface TradingViewWidgetProps
 * @property {string} symbol - نماد جفت ارز (مثال: 'BTCUSDT')
 * @property {function} onPriceChange - تابع کالبک برای تغییرات قیمت
 */
interface TradingViewWidgetProps {
  symbol: string;
  onPriceChange: (price: number) => void;
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
    "chart_property_page_trading"
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
export const TradingViewWidget = ({ symbol, onPriceChange }: TradingViewWidgetProps) => {
  const onLoadScriptRef = useRef<(() => void) | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    onLoadScriptRef.current = createWidget;

    if (!tvScriptLoadingPromise) {
      tvScriptLoadingPromise = new Promise((resolve) => {
        const script = document.createElement('script');
        script.id = 'tradingview-widget-loading-script';
        script.src = 'https://s3.tradingview.com/tv.js';
        script.type = 'text/javascript';
        script.onload = resolve as () => void;
        document.head.appendChild(script);
      });
    }

    tvScriptLoadingPromise.then(() => onLoadScriptRef.current?.());

    return () => {
      onLoadScriptRef.current = null;
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, [symbol]);

  function createWidget() {
    if (containerRef.current) {
      containerRef.current.innerHTML = '';
      const widget = new (window as any).TradingView.widget({
        width: "100%",
        height: "600px",
        symbol: `BINANCE:${symbol}`,
        interval: "5",
        timezone: "Asia/Tehran",
        theme: "light",
        style: "1",
        locale: "fa_IR",
        toolbar_bg: "#131722",
        enable_publishing: false,
        withdateranges: true,
        hide_side_toolbar: false,
        allow_symbol_change: false,
        container_id: containerRef.current.id,
        hide_volume: false,
        library_path: "/charting_library/",
        enable_trading: true,
        trading_options: {
          show_trading_panel: true,
          trading_panel_position: 'right',
        },

        drawings_access: {
          type: 'all',
          tools: [
            { name: "Trend Line" },
            { name: "Fibonacci Retracement" },
            { name: "Horizontal Line" },
            { name: "Vertical Line" },
            { name: "Rectangle" },
            { name: "Text" }
          ]
        },

        disabled_features: [
          "header_widget",
          "left_toolbar",
          "header_symbol_search",
          "symbol_search_hot_key",
          "header_compare",
          "header_undo_redo",
          "header_screenshot",
          "header_saveload",
          "show_logo_on_all_charts",
          "caption_buttons_text_if_possible",
          "header_settings",
          "header_fullscreen_button",
          "widget_logo",
          "hotlist_widget",
          "dom_widget",
          "legend_widget"
        ],

        enabled_features: [
          "trading_panel",
          "order_panel",
          "trading_account_manager",
          "trading_order_panel",
          "side_toolbar_in_fullscreen_mode",
          "create_volume_indicator_by_default",
          "display_market_status",
          "chart_property_page_trading",
          "timeframes_toolbar",
          "bottom_toolbar",
          "use_localstorage_for_settings"
        ],

        overrides: {
          "mainSeriesProperties.candleStyle.upColor": "#26a69a",
          "mainSeriesProperties.candleStyle.downColor": "#ef5350",
          "mainSeriesProperties.candleStyle.drawWick": true,
          "mainSeriesProperties.candleStyle.drawBorder": true,
          "mainSeriesProperties.candleStyle.borderUpColor": "#26a69a",
          "mainSeriesProperties.candleStyle.borderDownColor": "#ef5350",
          "mainSeriesProperties.candleStyle.wickUpColor": "#26a69a",
          "mainSeriesProperties.candleStyle.wickDownColor": "#ef5350",
          "paneProperties.background": "#131722",
          "paneProperties.vertGridProperties.color": "#363c4e",
          "paneProperties.horzGridProperties.color": "#363c4e",
          "scalesProperties.textColor": "#AAA"
        },

        timeframes: [
          { text: "1m", resolution: "1" },
          { text: "5m", resolution: "5" },
          { text: "15m", resolution: "15" },
          { text: "30m", resolution: "30" },
          { text: "1h", resolution: "60" },
          { text: "4h", resolution: "240" },
          { text: "1D", resolution: "1D" },
          { text: "1W", resolution: "1W" },
          { text: "1M", resolution: "1M" }
        ],

        time_frames: [
          { text: "1m", resolution: "1", description: "1 Minute" },
          { text: "5m", resolution: "5", description: "5 Minutes" },
          { text: "15m", resolution: "15", description: "15 Minutes" },
          { text: "30m", resolution: "30", description: "30 Minutes" },
          { text: "1h", resolution: "60", description: "1 Hour" },
          { text: "4h", resolution: "240", description: "4 Hours" },
          { text: "1D", resolution: "1D", description: "1 Day" },
          { text: "1W", resolution: "1W", description: "1 Week" },
          { text: "1M", resolution: "1M", description: "1 Month" }
        ],

        loading_screen: { backgroundColor: "#131722" },
        time_frames_position: 'bottom',

        onReady: () => {
          const chart = widget.chart();
          chart.onSymbolChanged().subscribe(null, () => {
            const symbolInfo = chart.symbolExt();
            if (symbolInfo && symbolInfo.last_price) {
              onPriceChange(symbolInfo.last_price);
            }
          });

          chart.onDataLoaded().subscribe(null, () => {
            const symbolInfo = chart.symbolExt();
            if (symbolInfo && symbolInfo.last_price) {
              onPriceChange(symbolInfo.last_price);
            }
          });
        }
      });
    }
  }

  return (
    <div
      id='tradingview_widget_container'
      ref={containerRef}
      style={{ width: '100%' }}
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