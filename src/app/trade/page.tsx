/* eslint-disable */
"use client";

// انواع
import ImageLogo from "@/../public/image/LogoTradingAi.jpg"; // لوگوی برنامه
import { ClosedPosition, Position, PriceMap } from "@/types/trade"; // نوع موقعیت
import { DownloadOutlined } from "@ant-design/icons"; // آیکون دانلود
import html2canvas from "html2canvas"; // کتابخانه برای گرفتن عکس از صفحه
import toast from "react-hot-toast"; // کتابخانه برای نمایش نوتیفیکیشن

// کامپوننت‌های antd
import {
  Button,
  ConfigProvider,
  Layout,
  Modal,
  Select,
  Typography
} from "antd"; // کتابخانه antd برای طراحی رابط کاربری

// هوک‌های React
import { useCallback, useEffect, useRef, useState } from "react"; // هوک‌های React
 // هوک برای ترجمه

// کامپوننت‌ها
import { closeTrade } from "@/actions/trade.action"; // تابع بستن معامله
import { useRouter } from "next/navigation"; // هوک برای ناوبری
import TradeForm from "../../components/tradePage/TradeForm"; // فرم معاملات
import { TradingViewWidgetDark } from "../../components/tradePage/TradingViewWidgetDark"; // ویجت نمودار
import style from "./style.module.css"; // استایل‌های CSS

// تایپوگرافی
const { Content } = Layout; // محتوای لایه

// کلیدهای ذخیره‌سازی
const POSITIONS_STORAGE_KEY = "trading_positions"; // کلید ذخیره‌سازی موقعیت‌ها

// کامپوننت تابعی React
export default function TradePage() {
  const [selectedSymbol, setSelectedSymbol] = useState<string>("BTCUSDT"); // نماد انتخاب شده
  const [coins, setCoins] = useState([]); // لیست ارزها
  const [prices, setPrices] = useState<PriceMap>({}); // قیمت‌ها
  const [priceChanges, setPriceChanges] = useState<{ [key: string]: number }>({}); // تغییرات قیمت
  const [positions, setPositions] = useState<Position[]>([]); // موقعیت‌ها
  const [currentPrice, setCurrentPrice] = useState<number | null>(null); // قیمت فعلی
  const positionsRef = useRef<HTMLDivElement>(null); // مرجع برای موقعیت‌ها
  const [pnlState, setPnlState] = useState<{ [key: string]: { amount: number; percentage: number }; }>({}); // وضعیت سود و زیان
  const [isHistoryModalVisible, setIsHistoryModalVisible] = useState(false); // وضعیت نمایش مودال تاریخچه
  const [closedPositions, setClosedPositions] = useState<ClosedPosition[]>([]); // موقعیت‌های بسته شده
  const [isLimitModalVisible, setIsLimitModalVisible] = useState(false); // وضعیت نمایش مودال محدودیت‌ها
  const [showImage, setShowImage] = useState(false); // وضعیت نمایش یا مخفی کردن مودال تصویر
  const [selectedPosition, setSelectedPosition] = useState<Position | null>(null); // موقعیت انتخاب شده
  const [tempLimits, setTempLimits] = useState<{ takeProfit: { price: number | null; percent: number | null } | null; stopLoss: { price: number | null; percent: number | null } | null; }>({ takeProfit: null, stopLoss: null }); // محدودیت‌های موقت
  const [showChart, setShowChart] = useState(false); // وضعیت چک‌باکس نمایش نمودار
  const [isMobile, setIsMobile] = useState(false); // وضعیت برای بررسی عرض صفحه
  const [isDarkMode, setIsDarkMode] = useState(true); // وضعیت تم تاریک
   // ترجمه
  const [isSymbolModalVisible, setIsSymbolModalVisible] = useState(false); // وضعیت نمایش مودال انتخاب نماد
  const [searchQuery, setSearchQuery] = useState(''); // جستجوی نماد
  const [filteredCoins, setFilteredCoins] = useState<string[]>([]); // ارزهای فیلتر شده
  const [allCoins, setAllCoins] = useState<string[]>([]); // لیست تمام ارزها

  useEffect(() => {
    // بررسی تم ذخیره‌شده در LocalStorage
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "light") {
      document.documentElement.classList.remove("dark");
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add("dark");
      setIsDarkMode(true);
    }
  }, []);

  const toggleDarkMode = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDarkMode(true);
    }
  };

  const router = useRouter();

  // بررسی تغییر عرض صفحه
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 940) {
        setIsMobile(true); // اگر عرض کمتر از 940px شد
      } else {
        setIsMobile(false); // در غیر این صورت
      }
    };

    handleResize(); // هنگام بارگذاری صفحه ابتدا چک می‌کنیم
    window.addEventListener("resize", handleResize); // به تغییرات سایز صفحه گوش می‌دهیم

    return () => window.removeEventListener("resize", handleResize); // پاکسازی رویداد
  }, []);

  const handleCheckboxChange = () => {
    setShowChart((prevState) => !prevState); // تغییر وضعیت چک‌باکس
  };

  const calculatePnL = useCallback((position: Position, price: number) => {
    if (!price || !position.entryPrice) return { amount: 0, percentage: 0 };

    const priceDiff =
      position.type === "LONG"
        ? (price - position.entryPrice) / position.entryPrice
        : (position.entryPrice - price) / position.entryPrice;

    const pnlAmount = position.amount * priceDiff * position.leverage;
    const pnlPercentage = priceDiff * 100 * position.leverage;

    return { amount: pnlAmount, percentage: pnlPercentage };
  }, []);

  // call back to close a position
  const closePosition = useCallback(
    (timestamp: number) => {
      if (!prices[selectedSymbol]) return;

      const closedPosition = positions.find((p) => p.timestamp === timestamp);
      if (closedPosition) {
        const currentPrice = prices[closedPosition.symbol];
        const pnl = calculatePnL(closedPosition, currentPrice);

        const closedPositionData: ClosedPosition = {
          ...closedPosition,
          closePrice: currentPrice,
          closeTime: Date.now(),
          pnl: {
            amount: pnl.amount,
            percentage: pnl.percentage,
          },
          isWin: pnl.amount > 0 ? true : false,
        };

        closeTrade(closedPositionData);

        const savedClosedPositions = JSON.parse(
          localStorage.getItem("closed_positions") || "[]"
        );
        const isPositionAlreadyClosed = savedClosedPositions.some(
          (p: ClosedPosition) => p.timestamp === timestamp
        );

        if (!isPositionAlreadyClosed) {
          const uniquePositions = Array.from(
            new Map(
              [...savedClosedPositions, closedPositionData].map(
                (position: ClosedPosition) => [position.timestamp, position]
              )
            ).values()
          );
          uniquePositions.sort((a, b) => b.closeTime - a.closeTime);

          localStorage.setItem(
            "closed_positions",
            JSON.stringify(uniquePositions)
          );
          setClosedPositions(uniquePositions);
        }

        setPositions((prevPositions) => {
          const updatedPositions = prevPositions.filter(
            (p) => p.timestamp !== timestamp
          );
          localStorage.setItem(
            POSITIONS_STORAGE_KEY,
            JSON.stringify(updatedPositions)
          );
          return updatedPositions;
        });
      }
    },
    [prices, selectedSymbol, positions, calculatePnL]
  );

  // call back to check and close positions with stop loss and take profit
  const checkAndClosePositions = useCallback(() => {
    positions.forEach((position) => {
      const price = prices[position.symbol];
      if (!price) return;

      if (position.takeProfit && position.takeProfit.price || position.stopLoss && position.stopLoss.price) {
        const pnl = calculatePnL(position, price);

        if (position.mode === "isolated" && pnl.percentage <= -100) {
          closePosition(position.timestamp);
          return;
        }

        if (position.takeProfit && position.takeProfit.price) {
          if (position.type === "LONG" && price >= position.takeProfit.price) {
            console.log(
              `Closing position ${position.symbol} at take profit: ${price}`
            );
            closePosition(position.timestamp);
            return;
          }
          if (position.type === "SHORT" && price <= position.takeProfit.price) {
            console.log(
              `Closing position ${position.symbol} at take profit: ${price}`
            );
            closePosition(position.timestamp);
            return;
          }
        }

        if (position.stopLoss && position.stopLoss.price) {
          if (position.type === "LONG" && price <= position.stopLoss.price) {
            console.log(
              `Closing position ${position.symbol} at stop loss: ${price}`
            );
            closePosition(position.timestamp);
            return;
          }
          if (position.type === "SHORT" && price >= position.stopLoss.price) {
            console.log(
              `Closing position ${position.symbol} at stop loss: ${price}`
            );
            closePosition(position.timestamp);
            return;
          }
        }
      }
    });
  }, [positions, prices, calculatePnL, closePosition]);

  // update pnl state
  useEffect(() => {
    const newPnlState: {
      [key: string]: { amount: number; percentage: number };
    } = {};
    positions.forEach((position) => {
      const price = prices[position.symbol];
      if (price) {
        const pnl = calculatePnL(position, price);
        newPnlState[position.timestamp] = pnl;
      }
    });
    setPnlState(newPnlState);
    checkAndClosePositions();
  }, [positions, prices, calculatePnL, checkAndClosePositions]);

  // load positions
  useEffect(() => {
    const savedPositions = localStorage.getItem(POSITIONS_STORAGE_KEY);
    if (savedPositions) {
      try {
        const parsedPositions = JSON.parse(savedPositions);
        setPositions(parsedPositions);
        console.log("Loaded positions:", parsedPositions);
      } catch (error) {
        console.error("Error loading positions:", error);
      }
    }
  }, []);

  // open new position
  const handleOpenPosition = useCallback(
    (position: Omit<Position, "symbol" | "timestamp">) => {
      const price = prices[selectedSymbol];
      if (!price) {
        alert("قیمت فعلی در دسترس نیست");
        return;
      }

      const newPosition: Position = {
        ...position,
        symbol: selectedSymbol,
        entryPrice: price,
        timestamp: Date.now(),
        type: position.type,
        mode: position.mode,
        leverage: position.leverage,
      };

      console.log("Opening new position:", newPosition);

      setPositions((prevPositions) => {
        const updatedPositions = [...prevPositions, newPosition];
        localStorage.setItem(
          POSITIONS_STORAGE_KEY,
          JSON.stringify(updatedPositions)
        );
        return updatedPositions;
      });
    },
    [prices, selectedSymbol]
  );

  // load coins
  useEffect(() => {
    const fetchCoins = async () => {
      try {
        // استفاده از API بایننس به جای CoinGecko
        const response = await fetch(
          "https://api.binance.com/api/v3/ticker/price"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        // دریافت اطلاعات نمادها از بایننس
        const binanceData = await response.json();

        // دریافت اطلاعات بیشتر برای هر نماد (تصویر و نام کامل)
        const response2 = await fetch(
          "https://api.binance.com/api/v3/exchangeInfo"
        );
        if (!response2.ok) {
          throw new Error("Failed to fetch exchange info");
        }

        const exchangeInfo = await response2.json();
        const symbolsInfo = exchangeInfo.symbols;

        // فیلتر کردن فقط جفت‌ارزهای USDT
        const usdtPairs = binanceData.filter((item: any) =>
          item.symbol.endsWith('USDT') &&
          !item.symbol.includes('UP') &&
          !item.symbol.includes('DOWN') &&
          !item.symbol.includes('BEAR') &&
          !item.symbol.includes('BULL')
        );

        // تبدیل داده‌ها به فرمت مورد نیاز برنامه
        const formattedCoins = usdtPairs.map((item: any) => {
          const symbol = item.symbol.replace('USDT', '');
          const baseAsset = symbolsInfo.find((s: any) => s.symbol === item.symbol)?.baseAsset || symbol;

          return {
            symbol: baseAsset,
            name: baseAsset,
            image: `https://bin.bnbstatic.com/image/admin_mgs_image_upload/20201110/87496d50-380c-43c7-8cf9-9b0729d50c43.png`, // تصویر پیش‌فرض بایننس
            current_price: parseFloat(item.price),
            price_change_percentage_24h: 0, // این داده در API اصلی بایننس موجود نیست
          };
        });

        setCoins(formattedCoins);

        // به‌روزرسانی قیمت‌ها
        const newPrices: PriceMap = {};
        usdtPairs.forEach((item: any) => {
          const symbol = item.symbol;
          newPrices[symbol] = parseFloat(item.price);
        });
        setPrices(prevPrices => ({ ...prevPrices, ...newPrices }));

      } catch (err: any) {
        console.error("Error fetching data from Binance:", err);
      }
    };

    fetchCoins();

    // راه‌اندازی وب‌سوکت برای دریافت قیمت‌های لحظه‌ای
    const ws = new WebSocket('wss://stream.binance.com:9443/ws');

    // ایجاد لیست نمادهای مورد نظر برای دریافت قیمت لحظه‌ای
    const subscribeMsg = {
      method: "SUBSCRIBE",
      params: [
        "btcusdt@ticker",
        "ethusdt@ticker",
        "bnbusdt@ticker",
        "solusdt@ticker",
        "adausdt@ticker",
        "dogeusdt@ticker",
        "xrpusdt@ticker",
        "dotusdt@ticker",
        "ltcusdt@ticker",
        "linkusdt@ticker"
      ],
      id: 1
    };

    ws.onopen = () => {
      ws.send(JSON.stringify(subscribeMsg));
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.e === 'ticker') {
        const symbol = data.s;
        const price = parseFloat(data.c);

        setPrices(prevPrices => ({
          ...prevPrices,
          [symbol]: price
        }));

        if (symbol === selectedSymbol) {
          setCurrentPrice(price);
        }
      }
    };

    return () => {
      ws.close();
    };
  }, [selectedSymbol]);

  // update prices
  const updatePricesAndPnL = useCallback(async () => {
    try {
      const uniqueSymbols = Array.from(
        new Set([selectedSymbol, ...positions.map((p) => p.symbol)])
      );

      const pricePromises = uniqueSymbols.map((symbol) =>
        fetch(
          `https://api.binance.com/api/v3/ticker/price?symbol=${symbol.toUpperCase()}`
        )
          .then((res) => res.json())
          .then((data) => ({
            symbol: symbol,
            price: parseFloat(data.price),
          }))
      );

      const priceResults = await Promise.all(pricePromises);

      const newPrices: PriceMap = {};
      priceResults.forEach((result) => {
        if (!isNaN(result.price)) {
          newPrices[result.symbol] = result.price;
        }
      });

      setPrices(newPrices);
      setCurrentPrice(newPrices[selectedSymbol]);

      const newPnlState: {
        [key: string]: { amount: number; percentage: number };
      } = {};
      positions.forEach((position) => {
        const price = newPrices[position.symbol];
        if (price) {
          newPnlState[position.timestamp] = calculatePnL(position, price);
        }
      });
      setPnlState(newPnlState);
      checkAndClosePositions();
    } catch (error) {
      console.error("Error updating prices and PnL:", error);
    }
  }, [selectedSymbol, positions, calculatePnL, checkAndClosePositions]);

  useEffect(() => {
    let isSubscribed = true;

    const update = async () => {
      if (isSubscribed) {
        await updatePricesAndPnL();
        setTimeout(update, 100);
      }
    };

    update();

    return () => {
      isSubscribed = false;
    };
  }, [updatePricesAndPnL]);

  useEffect(() => {
    const savedClosedPositions = localStorage.getItem("closed_positions");
    console.log(savedClosedPositions);
    if (savedClosedPositions) {
      try {
        const parsedPositions = JSON.parse(savedClosedPositions);
        const uniquePositions: ClosedPosition[] = Array.from(
          new Map(
            parsedPositions.map((position: ClosedPosition) => [
              position.timestamp,
              position,
            ])
          ).values()
        );
        uniquePositions.sort((a, b) => b.closeTime - a.closeTime);

        setClosedPositions(uniquePositions);
        localStorage.setItem(
          "closed_positions",
          JSON.stringify(uniquePositions)
        );
      } catch (error) {
        console.error("Error loading closed positions:", error);
      }
    }
  }, []);

  // calculate price
  const calculatePricePercent = useCallback(
    (
      targetPrice: number,
      entryPrice: number,
      type: "LONG" | "SHORT",
      leverage: number
    ): number => {
      if (type === "LONG") {
        return ((targetPrice - entryPrice) / entryPrice) * 100 * leverage;
      } else {
        return ((entryPrice - targetPrice) / entryPrice) * 100 * leverage;
      }
    },
    []
  );

  // update limits (TP and SL)
  const handleUpdateLimits = useCallback(
    (
      position: Position,
      newTakeProfit: number | null,
      newStopLoss: number | null
    ) => {
      setPositions((prevPositions) => {
        const updatedPositions = prevPositions.map((p) => {
          if (p.timestamp === position.timestamp) {
            return {
              ...p,
              takeProfit: newTakeProfit
                ? {
                  price: newTakeProfit,
                  percent: calculatePricePercent(
                    newTakeProfit,
                    p.entryPrice,
                    p.type,
                    p.leverage
                  ),
                }
                : null,
              stopLoss: newStopLoss
                ? {
                  price: newStopLoss,
                  percent: calculatePricePercent(
                    newStopLoss,
                    p.entryPrice,
                    p.type,
                    p.leverage
                  ),
                  type: "manual",
                }
                : null,
            };
          }
          return p;
        });
        localStorage.setItem(
          POSITIONS_STORAGE_KEY,
          JSON.stringify(updatedPositions)
        );
        return updatedPositions;
      });
    },
    [calculatePricePercent]
  );

  // calculate estimated PnL
  const calculateEstimatedPnL = (position: Position, targetPrice: number) => {
    const priceDiff =
      position.type === "LONG"
        ? (targetPrice - position.entryPrice) / position.entryPrice
        : (position.entryPrice - targetPrice) / position.entryPrice;

    const estimatedAmount = position.amount * priceDiff * position.leverage;
    const estimatedPercentage = priceDiff * 100 * position.leverage;

    return { amount: estimatedAmount, percentage: estimatedPercentage };
  };

  const handleApplyLimits = () => {
    if (selectedPosition && tempLimits) {
      handleUpdateLimits(
        selectedPosition,
        tempLimits.takeProfit?.price || null,
        tempLimits.stopLoss?.price || null
      );
      setIsLimitModalVisible(false);
      setSelectedPosition(null);
      setTempLimits({ takeProfit: null, stopLoss: null });
    }
  };

  const captureRef = useRef<HTMLDivElement>(null);

  const downloadImage = async (format: "png" | "jpg") => {
    if (captureRef.current) {
      try {
        // نمایش موقتی قبل از گرفتن عکس
        captureRef.current.classList.remove("hidden");

        // کمی تأخیر برای اطمینان از اعمال شدن تغییرات
        await new Promise((resolve) => setTimeout(resolve, 300));

        const canvas = await html2canvas(captureRef.current, {
          useCORS: true,
          scale: 2,
        });

        // بعد از گرفتن تصویر، دوباره مخفی کن
        captureRef.current.classList.add("hidden");

        const dataUrl =
          format === "png"
            ? canvas.toDataURL("image/png")
            : canvas.toDataURL("image/jpeg", 0.95);

        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = `downloaded-image.${format}`;
        link.click();
      } catch (error) {
        console.error("Error capturing image:", error);
      }
    }
  };

  const ClosePositionToast = () => toast.success("پوزیشن با موفقیت بسته شد");

  // تابع برای تغییر نماد انتخاب شده
  const handleSymbolChange = (symbol: string) => {
    setSelectedSymbol(symbol);

    // به‌روزرسانی قیمت فعلی
    const currentSymbolPrice = prices[symbol];
    if (currentSymbolPrice) {
      setCurrentPrice(currentSymbolPrice);
    }

    // اسکرول به بالای صفحه در موبایل
    if (isMobile) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // تابع محاسبه کل سود/زیان
  const calculateTotalPnL = (positions: ClosedPosition[]): number => {
    return positions.reduce((total, position) => {
      // بررسی وجود position.pnl
      if (position.pnl && typeof position.pnl.amount === 'number') {
        return total + position.pnl.amount;
      }
      return total;
    }, 0);
  };

  // اضافه کردن تابع محاسبه درصد سود/ضرر بر اساس قیمت ورودی
  const calculateProfitPercentage = (entryPrice: number, targetPrice: number, type: 'LONG' | 'SHORT'): number => {
    if (type === 'LONG') {
      return ((targetPrice - entryPrice) / entryPrice) * 100;
    } else {
      return ((entryPrice - targetPrice) / entryPrice) * 100;
    }
  };

  // تابع برای فیلتر کردن ارزها بر اساس جستجو
  const filterCoins = useCallback((query: string) => {
    if (!query.trim()) {
      // اگر جستجو خالی باشد، همه ارزهای محبوب را نشان بده
      setFilteredCoins(Object.keys(prices).filter(symbol => symbol.endsWith('USDT')));
      return;
    }

    const lowercaseQuery = query.toLowerCase();
    const filtered = Object.keys(prices)
      .filter(symbol =>
        symbol.toLowerCase().includes(lowercaseQuery) &&
        symbol.endsWith('USDT')
      );

    setFilteredCoins(filtered);
  }, [prices]);

  // اجرای فیلتر اولیه وقتی قیمت‌ها بارگذاری می‌شوند
  useEffect(() => {
    filterCoins('');
  }, [prices, filterCoins]);

  // تابع برای نمایش مودال انتخاب نماد
  const showSymbolModal = () => {
    setIsSymbolModalVisible(true);
    filterCoins('');
  };

  // تابع برای انتخاب نماد و بستن مودال
  const selectSymbolAndClose = (symbol: string) => {
    handleSymbolChange(symbol);
    setIsSymbolModalVisible(false);
    setSearchQuery('');
  };

  // تابع برای دریافت لیست ارزها از API
  const fetchAllCoins = async () => {
    try {
      const response = await fetch('https://api.binance.com/api/v3/exchangeInfo');
      const data = await response.json();
      const symbols = data.symbols
        .filter((symbol: any) => symbol.status === 'TRADING') // فقط ارزهای قابل معامله
        .map((symbol: any) => symbol.symbol); // فقط نمادها را بگیرید
      setAllCoins(symbols); // ذخیره‌سازی در state
    } catch (error) {
      console.error("Error fetching coins:", error);
    }
  };

  // استفاده از useEffect برای بارگذاری ارزها هنگام بارگذاری کامپوننت
  useEffect(() => {
    fetchAllCoins();
  }, []);

  return (
    <div dir='ltr'>
      <ConfigProvider>
        <Layout className="min-h-screen mt-16 bg-white dark:bg-[#0e0e0e] text-black dark:text-white transition-colors duration-300">
          <Content className="p-6 bg-white dark:bg-[#0e0e0e] transition-colors duration-300">
            <div className="bg-white dark:bg-[#0e0e0e] transition-colors duration-300">
              <div className={style.ShowResChart}>
                <input
                  className="hidden"
                  type="checkbox"
                  id="ShowResChart"
                  checked={showChart}
                  onChange={handleCheckboxChange}
                  disabled={!isMobile}
                />
                <label
                  className={`cursor-pointer rounded-xl p-2 font-bold transition-colors duration-300 ${showChart
                    ? "bg-gray-200 dark:bg-[#1a1a1a]"
                    : "bg-gray-100 dark:bg-[#1a1a1a] hover:bg-gray-200 dark:hover:bg-[#252525]"
                    }`}
                  htmlFor="ShowResChart"
                >
                  <img
                    className="w-[20px]"
                    src="https://cdn-icons-png.flaticon.com/512/10799/10799630.png"
                  />
                </label>
              </div>
              <div className={`${style.contentTrade} bg-white dark:bg-[#0e0e0e] transition-colors duration-300`}>
                <div
                  className={`${style.contentTradingView
                    } bg-gray-100 dark:bg-[#0e0e0e] border border-gray-300 dark:border-[#2a2a2a] rounded-lg transition-colors duration-300 ${isMobile ? (showChart ? "flex" : "hidden") : "flex"
                    }`}
                >
                  <TradingViewWidgetDark
                    symbol={selectedSymbol}
                    onPriceChange={setCurrentPrice}
                  />
                </div>
                <div
                  className={`${style.contentTradeForm} bg-gray-100 dark:bg-[#151515] border border-gray-300 dark:border-[#2a2a2a] rounded-lg p-4 transition-colors duration-300`}
                >
                  <div className="flex justify-between items-center mb-[20px]">
                    <div className="flex items-center gap-3">
                      <label className="text-[16px] font-semibold text-black dark:text-white transition-colors duration-300">
                        Symbol:
                      </label>
                      <div className="my-auto">
                        <div className="flex flex-col">
                          <button
                            onClick={showSymbolModal}
                            className="flex items-center justify-between w-full p-2 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg text-white hover:bg-[#252525] focus:bg-[#252525] transition-colors"
                          >
                            <div className="flex justify-between gap-6 ">
                              {selectedSymbol && (
                                <span className="font-medium text-white">{selectedSymbol}</span>
                              )}
                              <img src="https://img.icons8.com/?size=100&id=132&format=png&color=ffffff" className="w-4 h-4 my-auto"></img>
                            </div>

                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <TradeForm
                    currentPrice={prices[selectedSymbol]}
                    onOpenPosition={handleOpenPosition}
                    symbol={selectedSymbol}
                    isDarkMode={isDarkMode}
                  />
                </div>
              </div>
              <div className={style.positionsHolder}>
                <div
                  className={`${style.positions} bg-gray-100 dark:bg-[#151515] border border-gray-300 dark:border-[#2a2a2a] rounded-lg p-4 mt-4 transition-colors duration-300`}
                  style={{ marginBottom: "16px" }}
                >
                  <div className="flex text-black dark:text-white mb-1 justify-between items-center mb-4 transition-colors duration-300">
                    <div className="flex gap-1.5 items-center">
                      <span className="text-[16px] font-[700] text-black dark:text-white transition-colors duration-300">
                        Active Trades
                      </span>
                      <span
                        className="text-[17px] font-bold border border-gray-300 dark:border-[#2a2a2a] text-blue-600 dark:text-[#00a0ff] px-2 py-0.5 rounded bg-white dark:bg-[#1a1a1a] transition-colors duration-300"
                      >
                        {positions.length}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setIsHistoryModalVisible(true)}
                        className="border-none flex items-center gap-1 bg-gray-100 dark:bg-[#1a1a1a] hover:bg-gray-200 dark:hover:bg-[#252525] p-2 rounded-[8px] text-blue-600 dark:text-[#00a0ff] transition-colors duration-300"
                      >
                        <span className="text-[16px]">History</span>
                        <img
                          className="w-5 h-5"
                          src={`https://img.icons8.com/?size=100&id=ZG6vinMQTTq8&format=png&color=${isDarkMode ? '00a0ff' : '0066cc'}`}
                        />
                      </button>
                    </div>
                  </div>

                  {/* BingX style position cards for mobile */}
                  <div className="lg:hidden">
                    {positions.length === 0 ? (
                      <div className="flex flex-col items-center justify-center py-8 text-gray-500 dark:text-gray-400">
                        <img
                          src="https://img.icons8.com/?size=100&id=12776&format=png&color=cccccc"
                          className="w-16 h-16 mb-4 opacity-50"
                        />
                        <p>No Active Positions</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {positions.map((position) => {
                          const pnl = pnlState[position.timestamp] || {
                            amount: 0,
                            percentage: 0,
                          };
                          const isProfitable = pnl.amount >= 0;

                          return (
                            <div
                              key={position.timestamp}
                              className={`bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#2a2a2a] rounded-lg overflow-hidden transition-all duration-300 hover:shadow-md dark:hover:border-[#3a3a3a]`}
                            >
                              {/* Header with symbol and type */}
                              <div className="flex items-center justify-between p-3 border-b border-gray-200 dark:border-[#2a2a2a]">
                                <div className="flex items-center gap-2">
                                  <span
                                    className={`${style.clickableSymbol} text-black dark:text-white`}
                                    onClick={() => handleSymbolChange(position.symbol)}
                                  >
                                    {position.symbol}
                                  </span>
                                  <span className={`px-2 py-0.5 rounded text-xs font-medium ${position.type === "LONG"
                                    ? "bg-green-100 text-green-600 dark:bg-[rgba(0,192,135,0.1)] dark:text-[#00c087]"
                                    : "bg-red-100 text-red-600 dark:bg-[rgba(255,67,67,0.1)] dark:text-[#ff4343]"
                                    }`}>
                                    {position.type}
                                  </span>
                                  <span className="px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-600 dark:bg-[#252525] dark:text-gray-300">
                                    {position.leverage}x
                                  </span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <button
                                    onClick={() => {
                                      setSelectedPosition(position);
                                      setShowImage(true);
                                    }}
                                    className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-[#252525] transition-colors"
                                  >
                                    <img
                                      className="w-5 h-5"
                                      src={`https://img.icons8.com/?size=100&id=12071&format=png&color=$000000`}
                                    />
                                  </button>
                                </div>
                              </div>

                              {/* Position details */}
                              <div className="p-3">
                                <div className="grid grid-cols-2 gap-3 mb-3">
                                  <div>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Entry Price</p>
                                    <p className="text-sm font-medium text-black dark:text-white">${(position.entryPrice != null ? position.entryPrice : 0)}</p>
                                  </div>
                                  <div>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Current Price</p>
                                    <p className="text-sm font-medium text-black dark:text-white">${prices[position.symbol] || "—"}</p>
                                  </div>
                                  <div>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Amount</p>
                                    <p className="text-sm font-medium text-black dark:text-white">${(position.amount != null ? position.amount : 0)}</p>
                                  </div>
                                  <div>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Mode</p>
                                    <p className="text-sm font-medium text-black dark:text-white">{position.mode}</p>
                                  </div>
                                </div>

                                {/* PNL and actions */}
                                <div className="flex items-center justify-between bg-gray-50 dark:bg-[#252525] p-3 rounded-lg">
                                  <div>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">PNL</p>
                                    <div className="flex items-center gap-2">
                                      <p className={`text-sm font-bold ${isProfitable ? "text-green-600 dark:text-[#00c087]" : "text-red-600 dark:text-[#ff4343]"}`}>
                                        ${Math.abs(pnl.amount).toFixed(2)}
                                      </p>
                                      <p className={`text-xs ${isProfitable ? "text-green-600 dark:text-[#00c087]" : "text-red-600 dark:text-[#ff4343]"}`}>
                                        ({pnl.percentage.toFixed(2)}%)
                                      </p>
                                    </div>
                                  </div>
                                  <div className="flex gap-2">
                                    <button
                                      onClick={() => {
                                        setSelectedPosition(position);
                                        setIsLimitModalVisible(true);
                                      }}
                                      className="px-3 py-1.5 text-xs font-medium rounded-md bg-white dark:bg-[#1a1a1a] text-blue-600 dark:text-[#00a0ff] border border-gray-200 dark:border-[#2a2a2a] hover:bg-gray-50 dark:hover:bg-[#252525] transition-colors"
                                    >
                                      TP/SL
                                    </button>
                                    <button
                                      onClick={() => closePosition(position.timestamp)}
                                      className={`px-3 py-1.5 text-xs font-medium rounded-md text-white ${isProfitable
                                        ? "bg-green-600 dark:bg-[#00c087] hover:bg-green-700 dark:hover:bg-[#00a876]"
                                        : "bg-red-600 dark:bg-[#ff4343] hover:bg-red-700 dark:hover:bg-[#e53935]"
                                        } transition-colors`}
                                    >
                                      Close Position
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  {/* BingX style position table for desktop */}
                  <div className="hidden lg:block overflow-x-auto">
                    {positions.length === 0 ? (
                      <div className="flex flex-col items-center justify-center py-8 text-gray-500 dark:text-gray-400">
                        <img
                          src="https://img.icons8.com/?size=100&id=12776&format=png&color=cccccc"
                          className="w-16 h-16 mb-4 opacity-50"
                        />
                        <p>No Active Positions</p>
                      </div>
                    ) : (
                      <table className="w-full border-collapse">
                        <thead>
                          <tr>
                            <th className="'text-left p-3 text-sm font-medium text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-[#2a2a2a]">Symbol</th>
                            <th className="'text-left p-3 text-sm font-medium text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-[#2a2a2a]">Leverage</th>
                            <th className="'text-left p-3 text-sm font-medium text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-[#2a2a2a]">Mode</th>
                            <th className="'text-left p-3 text-sm font-medium text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-[#2a2a2a]">Entry Price</th>
                            <th className="'text-left p-3 text-sm font-medium text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-[#2a2a2a]">Current Price</th>
                            <th className="'text-left p-3 text-sm font-medium text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-[#2a2a2a]">Amount</th>
                            <th className="'text-left p-3 text-sm font-medium text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-[#2a2a2a]">PNL</th>
                            <th className="'text-left p-3 text-sm font-medium text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-[#2a2a2a]"></th>
                          </tr>
                        </thead>
                        <tbody>
                          {positions.map((position) => {
                            const pnl = pnlState[position.timestamp] || {
                              amount: 0,
                              percentage: 0,
                            };
                            const isProfitable = pnl.amount >= 0;

                            return (
                              <tr
                                key={position.timestamp || Math.random()}
                                className="hover:bg-gray-50 dark:hover:bg-[#1a1a1a] transition-colors"
                              >
                                <td className='p-3 text-sm font-medium text-black dark:text-white border-b border-gray-200 dark:border-[#2a2a2a] text-left'>
                                  <span
                                    className={`${style.clickableSymbol} text-black dark:text-white`}
                                    onClick={() => handleSymbolChange(position.symbol)}
                                  >
                                    {position.symbol}
                                  </span>
                                </td>
                                <td className='p-3 border-b border-gray-200 dark:border-[#2a2a2a] text-left'>
                                  <span className={`px-2 py-0.5 rounded text-xs font-medium ${position.type === "LONG"
                                    ? "bg-green-100 text-green-600 dark:bg-[rgba(0,192,135,0.1)] dark:text-[#00c087]"
                                    : "bg-red-100 text-red-600 dark:bg-[rgba(255,67,67,0.1)] dark:text-[#ff4343]"
                                    }`}>
                                    {position.type}
                                  </span>
                                </td>
                                <td className='p-3 text-sm text-black dark:text-white border-b border-gray-200 dark:border-[#2a2a2a] text-left'>
                                  {position.leverage}x
                                </td>
                                <td className='p-3 text-sm text-black dark:text-white border-b border-gray-200 dark:border-[#2a2a2a] text-left'>
                                  {position.mode}
                                </td>
                                <td className='p-3 text-sm text-black dark:text-white border-b border-gray-200 dark:border-[#2a2a2a] text-left'>
                                  ${(position.entryPrice != null ? position.entryPrice : 0)}
                                </td>
                                <td className='p-3 text-sm text-black dark:text-white border-b border-gray-200 dark:border-[#2a2a2a] text-left'>
                                  ${prices[position.symbol] || "—"}
                                </td>
                                <td className='p-3 text-sm text-black dark:text-white border-b border-gray-200 dark:border-[#2a2a2a] text-left'>
                                  ${(position.amount != null ? position.amount : 0)}
                                </td>
                                <td className='p-3 border-b border-gray-200 dark:border-[#2a2a2a]  text-left'>
                                  <div>
                                    <p className={`text-sm font-bold ${isProfitable ? "text-green-600 dark:text-[#00c087]" : "text-red-600 dark:text-[#ff4343]"}`}>
                                      ${Math.abs(pnl.amount).toFixed(2)}
                                    </p>
                                    <p className={`text-xs ${isProfitable ? "text-green-600 dark:text-[#00c087]" : "text-red-600 dark:text-[#ff4343]"}`}>
                                      ({(pnl.percentage).toFixed(2)}%)
                                    </p>
                                  </div>
                                </td>
                                <td className='p-3 text-right border-b border-gray-200 dark:border-[#2a2a2a]'>
                                  <div className="flex justify-end gap-2">
                                    <button
                                      onClick={() => {
                                        setSelectedPosition(position);
                                        setShowImage(true);
                                      }}
                                      className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-[#252525] transition-colors"
                                    >
                                      <img
                                        className="w-5 h-5"
                                        src={`https://img.icons8.com/?size=100&id=12071&format=png&color=$000000`}
                                      />
                                    </button>
                                    <button
                                      onClick={() => {
                                        setSelectedPosition(position);
                                        setIsLimitModalVisible(true);
                                      }}
                                      className="px-3 py-1.5 text-xs font-medium rounded-md bg-white dark:bg-[#1a1a1a] text-blue-600 dark:text-[#00a0ff] border border-gray-200 dark:border-[#2a2a2a] hover:bg-gray-50 dark:hover:bg-[#252525] transition-colors"
                                    >
                                      TP/SL
                                    </button>
                                    <button
                                      onClick={() => closePosition(position.timestamp)}
                                      className={`px-3 py-1.5 text-xs font-medium rounded-md text-white ${isProfitable
                                        ? "bg-green-600 dark:bg-[#00c087] hover:bg-green-700 dark:hover:bg-[#00a876]"
                                        : "bg-red-600 dark:bg-[#ff4343] hover:bg-red-700 dark:hover:bg-[#e53935]"
                                        } transition-colors`}
                                    >
                                      Close Position
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Content>

          <Modal
            title={null}
            open={isHistoryModalVisible}
            onCancel={() => setIsHistoryModalVisible(false)}
            footer={null}
            width={900}
            className='ltr'
            styles={{
              header: {
                display: 'none'
              },
              body: {
                backgroundColor: '#151515',
                color: 'white',
                padding: '0',
                borderRadius: '12px',
                overflow: 'hidden'
              },
              mask: {
                backgroundColor: 'rgba(0, 0, 0, 0.8)'
              },
              content: {
                backgroundColor: '#151515',
                border: '1px solid #2a2a2a',
                borderRadius: '12px',
                overflow: 'hidden',
                padding: '0'
              }
            }}
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-5 border-b border-[#2a2a2a]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[rgba(0,160,255,0.1)]">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#00a0ff]" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">Trading History</h2>
                    <p className="text-sm text-gray-400">View Your Closed Positions</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsHistoryModalVisible(false)}
                    className="p-2 rounded-full hover:bg-[#252525] transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-5">
                <div className="bg-[#1a1a1a] rounded-xl p-4 border border-[#2a2a2a] shadow-sm">
                  <p className="text-sm text-gray-400 mb-1">Total trades</p>
                  <h3 className="text-2xl font-bold text-white">{closedPositions.length}</h3>
                </div>

                <div className="bg-[#1a1a1a] rounded-xl p-4 border border-[#2a2a2a] shadow-sm">
                  <p className="text-sm text-gray-400 mb-1">Total profit</p>
                  <h3 className={`text-2xl font-bold ${calculateTotalPnL(closedPositions) >= 0 ? 'text-[#00c087]' : 'text-[#ff4343]'}`}>
                    ${calculateTotalPnL(closedPositions).toFixed(2)}
                  </h3>
                </div>

                <div className="bg-[#1a1a1a] rounded-xl p-4 border border-[#2a2a2a] shadow-sm">
                  <p className="text-sm text-gray-400 mb-1">Win rate</p>
                  <h3 className="text-2xl font-bold text-white">
                    {closedPositions.length > 0
                      ? `${Math.round((closedPositions.filter(p => p.pnl && p.pnl.amount > 0).length / closedPositions.length) * 100)}%`
                      : '0%'}
                  </h3>
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-center justify-between gap-4 px-5 pb-5">
                <div className="flex items-center gap-2 w-full md:w-auto">
                  <input
                    type="text"
                    placeholder="Search symbol"
                    className="px-4 py-2 bg-[#252525] border border-[#2a2a2a] rounded-lg text-white w-full md:w-auto"
                  />
                </div>

                <div className="flex items-center gap-2 w-full md:w-auto">
                  <button
                    onClick={() => {
                      localStorage.removeItem("trading_closed_positions");
                      setClosedPositions([]);
                    }}
                    className="px-4 py-2 bg-[rgba(255,67,67,0.1)] text-[#ff4343] rounded-lg font-medium hover:bg-[rgba(255,67,67,0.2)] transition-colors w-full md:w-auto"
                  >
                    Clear history
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-hidden">
                {closedPositions.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-16 text-gray-400">
                    <div className="w-24 h-24 mb-6 bg-[#252525] rounded-full flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-white">No history yet</h3>
                    <p className="text-center max-w-md text-gray-400">Your closed position will apear hear</p>
                  </div>
                ) : (
                  <div className="overflow-auto max-h-[60vh]">
                    {/* جدول برای نمایش دسکتاپ */}
                    <div className="hidden md:block">
                      <table className="w-full">
                        <thead className="sticky top-0 z-10 bg-[#151515]">
                          <tr className="bg-[#1a1a1a]">
                          <th className="'text-left p-3 text-sm font-medium text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-[#2a2a2a]">Symbol</th>
                            <th className="'text-left p-3 text-sm font-medium text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-[#2a2a2a]">Leverage</th>
                            <th className="'text-left p-3 text-sm font-medium text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-[#2a2a2a]">Mode</th>
                            <th className="'text-left p-3 text-sm font-medium text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-[#2a2a2a]">Entry Price</th>
                            <th className="'text-left p-3 text-sm font-medium text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-[#2a2a2a]">Current Price</th>
                            <th className="'text-left p-3 text-sm font-medium text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-[#2a2a2a]">Amount</th>
                            <th className="'text-left p-3 text-sm font-medium text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-[#2a2a2a]">PNL</th>
                            <th className="'text-left p-3 text-sm font-medium text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-[#2a2a2a]">Close Time</th>
                          </tr>
                        </thead>
                        <tbody>
                          {closedPositions.map((position) => (
                            <tr key={position.timestamp || Math.random()} className="border-b border-[#2a2a2a]">
                              <td className="p-4">
                                <div className="flex items-center gap-2">
                                  <span className="font-medium text-white">{position.symbol}</span>
                                </div>
                              </td>
                              <td className="p-4">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${position.type === "LONG"
                                  ? "bg-[rgba(0,192,135,0.1)] text-[#00c087]"
                                  : "bg-[rgba(255,67,67,0.1)] text-[#ff4343]"
                                  }`}>
                                  {position.type}
                                </span>
                              </td>
                              <td className="p-4">
                                <span className="text-white">${(position.entryPrice != null ? position.entryPrice : 0)}</span>
                              </td>
                              <td className="p-4">
                                <span className="text-white">${(position.closePrice != null ? position.closePrice : 0)}</span>
                              </td>
                              <td className="p-4">
                                <span className="text-white">${(position.amount != null ? position.amount : 0)}</span>
                              </td>
                              <td className="p-4">
                                <span className="text-white">{position.leverage}x</span>
                              </td>
                              <td className="p-4">
                                <span className={`font-medium ${position.pnl && position.pnl.amount >= 0 ? 'text-[#00c087]' : 'text-[#ff4343]'}`}>
                                  ${Math.abs(position.pnl?.amount || 0).toFixed(2)} ({(position.pnl?.percentage || 0).toFixed(2)}%)
                                </span>
                              </td>
                              <td className="p-4">
                                <span className="text-gray-400">
                                  {new Date(position.closeTime).toLocaleDateString('en', {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric',
                                  })}
                                  <br />
                                  {new Date(position.closeTime).toLocaleTimeString('en', {
                                    hour: '2-digit',
                                    minute: '2-digit'
                                  })}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* کارت‌های موبایل */}
                    <div className="md:hidden space-y-4 px-4">
                      {closedPositions.map((position) => {
                        if (!position || typeof position !== 'object') {
                          return null;
                        }

                        const isProfitable = position.pnl && position.pnl.amount >= 0;

                        return (
                          <div
                            key={position.timestamp || Math.random()}
                            className="bg-[#1a1a1a] rounded-xl p-4 border border-[#2a2a2a] shadow-sm"
                          >
                            <div className="flex justify-between items-center mb-3">
                              <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-[#252525] flex items-center justify-center">
                                  <span className="text-xs font-bold text-white">{position.symbol.substring(0, 2)}</span>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-white">{position.symbol}</p>
                                  <div className="flex items-center gap-1 mt-1">
                                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${position.type === "LONG"
                                      ? "bg-[rgba(0,192,135,0.1)] text-[#00c087]"
                                      : "bg-[rgba(255,67,67,0.1)] text-[#ff4343]"
                                      }`}>
                                      {position.type}
                                    </span>
                                    <span className="px-2 py-0.5 bg-[#252525] rounded-full text-xs text-white">
                                      {position.leverage}x
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div>
                                <p className={`text-right text-sm font-bold ${isProfitable ? "text-[#00c087]" : "text-[#ff4343]"}`}>
                                  ${Math.abs(position.pnl?.amount || 0).toFixed(2)}
                                </p>
                                <p className={`text-right text-xs ${isProfitable ? "text-[#00c087]" : "text-[#ff4343]"}`}>
                                  ({(position.pnl?.percentage || 0).toFixed(2)}%)
                                </p>
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3 text-sm">
                              <div>
                                <p className="text-xs text-gray-400">Entry Price</p>
                                <p className="font-medium text-white">${(position.entryPrice != null ? position.entryPrice : 0)}</p>
                              </div>
                              <div>
                                <p className="text-xs text-gray-400">Close Price</p>
                                <p className="font-medium text-white">${(position.closePrice != null ? position.closePrice : 0).toFixed(2)}</p>
                              </div>
                              <div>
                                <p className="text-xs text-gray-400">Amount</p>
                                <p className="font-medium text-white">${(position.amount != null ? position.amount : 0).toFixed(2)}</p>
                              </div>
                              <div>
                                <p className="text-xs text-gray-400">Close Time</p>
                                <p className="font-medium text-white">
                                  {new Date(position.closeTime).toLocaleDateString('en', {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric',
                                  })}
                                </p>
                                <p className="text-xs text-gray-400">
                                  {new Date(position.closeTime).toLocaleTimeString('en', {
                                    hour: '2-digit',
                                    minute: '2-digit'
                                  })}
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Modal>

          <Modal
            title={<h2 className="text-white">Set Limits</h2>}
            open={isLimitModalVisible}
            onCancel={() => {
              setIsLimitModalVisible(false);
              setSelectedPosition(null);
              setTempLimits({ takeProfit: null, stopLoss: null });
            }}
            footer={[
              <Button
                key="cancel"
                onClick={() => {
                  setIsLimitModalVisible(false);
                  setSelectedPosition(null);
                  setTempLimits({ takeProfit: null, stopLoss: null });
                }}
                className={`${style.bingxButtonSecondary}`}
              >
                Cancel
              </Button>,
              <Button
                key="apply"
                onClick={handleApplyLimits}
                className={`${style.bingxButton}`}
              >
                Apply Changes
              </Button>,
            ]}
            width={600}
            className={`${style.bingxModal}`}
            styles={{
              header: { backgroundColor: '#151515', color: 'white', borderBottom: '1px solid #2a2a2a' },
              body: { backgroundColor: '#151515', color: 'white' },
              mask: { backgroundColor: 'rgba(0, 0, 0, 0.8)' },
              content: { backgroundColor: '#151515', border: '1px solid #2a2a2a' }
            }}
          >
            {selectedPosition && (
              <div className="space-y-6">
                <div className="bg-[#1a1a1a] p-4 rounded-lg">
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[16px] font-semibold text-white">Take Profit</span>
                      <span className={`${style.bingxTag} ${selectedPosition.type === "LONG" ? style.bingxTagLong : style.bingxTagShort
                        }`}>
                        {selectedPosition.type === "LONG" ? "Long" : "Short"}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[14px] text-[#8c8c8c] mb-2">Price</label>
                        <input
                          type="number"
                          className="w-full bg-[#252525] text-white border border-[#2a2a2a] rounded-lg p-2 focus:border-[#00a0ff] transition-colors"
                          placeholder="Entry price"
                          value={
                            tempLimits.takeProfit?.price ||
                            selectedPosition.takeProfit?.price ||
                            ""
                          }
                          onChange={(e) => {
                            const price = parseFloat(e.target.value);
                            if (!isNaN(price)) {
                              const percent = calculateProfitPercentage(
                                selectedPosition.entryPrice,
                                price,
                                selectedPosition.type
                              );
                              setTempLimits({
                                ...tempLimits,
                                takeProfit: { price, percent }
                              });
                            } else {
                              setTempLimits({
                                ...tempLimits,
                                takeProfit: null
                              });
                            }
                          }}
                        />
                      </div>
                      <div>
                        <label className="block text-[14px] text-[#8c8c8c] mb-2">Percent</label>
                        <input
                          type="number"
                          className="w-full bg-[#252525] text-white border border-[#2a2a2a] rounded-lg p-2 focus:border-[#00a0ff] transition-colors"
                          placeholder="Enter percent"
                          value={
                            tempLimits.takeProfit?.percent?.toFixed(2) ||
                            selectedPosition.takeProfit?.percent?.toFixed(2) ||
                            ""
                          }
                          onChange={(e) => {
                            const percent = parseFloat(e.target.value);
                            if (!isNaN(percent)) {
                              let price;
                              if (selectedPosition.type === "LONG") {
                                price = selectedPosition.entryPrice * (1 + percent / 100);
                              } else {
                                price = selectedPosition.entryPrice * (1 - percent / 100);
                              }
                              setTempLimits({
                                ...tempLimits,
                                takeProfit: { price, percent }
                              });
                            } else {
                              setTempLimits({
                                ...tempLimits,
                                takeProfit: null
                              });
                            }
                          }}
                        />
                      </div>
                    </div>
                    {(tempLimits.takeProfit?.price || selectedPosition.takeProfit?.price) && (
                      <div className="mt-4 p-3 bg-[rgba(0,192,135,0.1)] border border-[rgba(0,192,135,0.2)] rounded-lg">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-[14px] text-[#00c087]">Estimated Profit</p>
                            <p className="text-[18px] font-bold text-[#00c087]">
                              ${calculateEstimatedPnL(
                                selectedPosition,
                                tempLimits.takeProfit?.price || selectedPosition.takeProfit?.price || 0
                              ).amount.toFixed(2)}
                            </p>
                          </div>
                          <div>
                            <p className="text-[14px] text-[#00c087]">Profit Percent</p>
                            <p className="text-[18px] font-bold text-[#00c087]">
                              {(tempLimits.takeProfit?.percent || selectedPosition.takeProfit?.percent || 0).toFixed(2)}%
                            </p>
                          </div>
                        </div>
                        <div className="mt-2 text-xs text-[#8c8c8c]">
                          "Current Price": ${prices[selectedPosition.symbol] || "—"}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[16px] font-semibold text-white">Stop Loss</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[14px] text-[#8c8c8c] mb-2">Price</label>
                        <input
                          type="number"
                          className="w-full bg-[#252525] text-white border border-[#2a2a2a] rounded-lg p-2 focus:border-[#ff4343] transition-colors"
                          placeholder="Enter price"
                          value={
                            tempLimits.stopLoss?.price ||
                            selectedPosition.stopLoss?.price ||
                            ""
                          }
                          onChange={(e) => {
                            const price = parseFloat(e.target.value);
                            if (!isNaN(price)) {
                              const percent = calculateProfitPercentage(
                                selectedPosition.entryPrice,
                                price,
                                selectedPosition.type === 'LONG' ? 'SHORT' : 'LONG' // معکوس برای محاسبه ضرر
                              );
                              setTempLimits({
                                ...tempLimits,
                                stopLoss: { price, percent, type: 'price' }
                              });
                            } else {
                              setTempLimits({
                                ...tempLimits,
                                stopLoss: null
                              });
                            }
                          }}
                        />
                      </div>
                      <div>
                        <label className="block text-[14px] text-[#8c8c8c] mb-2">Percent</label>
                        <input
                          type="number"
                          className="w-full bg-[#252525] text-white border border-[#2a2a2a] rounded-lg p-2 focus:border-[#ff4343] transition-colors"
                          placeholder="Enter percent"
                          value={
                            tempLimits.stopLoss?.percent?.toFixed(2) ||
                            selectedPosition.stopLoss?.percent?.toFixed(2) ||
                            ""
                          }
                          onChange={(e) => {
                            const percent = parseFloat(e.target.value);
                            if (!isNaN(percent)) {
                              let price;
                              if (selectedPosition.type === "LONG") {
                                price = selectedPosition.entryPrice * (1 - percent / 100);
                              } else {
                                price = selectedPosition.entryPrice * (1 + percent / 100);
                              }
                              setTempLimits({
                                ...tempLimits,
                                stopLoss: { price, percent, type: 'percent' }
                              });
                            } else {
                              setTempLimits({
                                ...tempLimits,
                                stopLoss: null
                              });
                            }
                          }}
                        />
                      </div>
                    </div>
                    {(tempLimits.stopLoss?.price || selectedPosition.stopLoss?.price) && (
                      <div className="mt-4 p-3 bg-[rgba(255,67,67,0.1)] border border-[rgba(255,67,67,0.2)] rounded-lg">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-[14px] text-[#ff4343]">Estimated Loss</p>
                            <p className="text-[18px] font-bold text-[#ff4343]">
                              ${Math.abs(calculateEstimatedPnL(
                                selectedPosition,
                                tempLimits.stopLoss?.price || selectedPosition.stopLoss?.price || 0
                              ).amount).toFixed(2)}
                            </p>
                          </div>
                          <div>
                            <p className="text-[14px] text-[#ff4343]">Loss Percent</p>
                            <p className="text-[18px] font-bold text-[#ff4343]">
                              {(tempLimits.stopLoss?.percent || selectedPosition.stopLoss?.percent || 0).toFixed(2)}%
                            </p>
                          </div>
                        </div>
                        <div className="mt-2 text-xs text-[#8c8c8c]">
                          Current Price: ${prices[selectedPosition.symbol] || "—"}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </Modal>
          <Modal
            title="TradingAi"
            open={showImage}
            onCancel={() => setShowImage(false)}
            footer={null}
            className={style.positionModal}
            style={{ direction: "rtl" }}
          >
            {selectedPosition &&
              (() => {
                const currentPrice = prices[selectedPosition.symbol];
                const pnl = pnlState[selectedPosition.timestamp] || {
                  amount: 0,
                  percentage: 0,
                };
                const isProfitable = pnl.amount >= 0;

                return (
                  <>
                    <div className="flex flex-col flex-wrap gap-4 w-[100%] h-[472px] bg-black p-6 rounded-[20px]">
                      <span className="text-base xs:text-lg sm:text-xl lg:text-2xl font-bold mx-auto text-[#309eff]">
                        TradingAI
                      </span>
                      <div className="flex gap-[10px] ">
                        <span
                          className={`${style.titlePositionCard}  font-semibold text-white`}
                        >
                          {selectedPosition.symbol}
                        </span>
                        <span
                          className={`${style.titlePositionCard
                            }  font-semibold px-2 border-x border-[#292929]  ${selectedPosition.type === "LONG"
                              ? "text-green-600"
                              : "text-red-600"
                            }`}
                        >
                          {selectedPosition.type === "LONG" ? "long" : "short"}
                        </span>
                        <span
                          className={`${style.titlePositionCard}  font-semibold text-white`}
                        >
                          {selectedPosition.leverage}X
                        </span>
                      </div>
                      <div className=" w-full flex flex-col flex-wrap">
                        <div>
                          <h1
                            style={{
                              color: isProfitable ? "#66ff00" : "#ff0000",
                            }}
                            className="text-right relative z-[100] text-[30px] text-white mr-2"
                          >
                            {pnl.percentage.toFixed(2)}%
                          </h1>
                          <h1
                            style={{
                              color: isProfitable ? "#66ff00" : "#ff0000",
                            }}
                            className="text-right relative z-[100] text-[25px] text-white mr-2"
                          >
                            ({Math.abs(pnl.amount).toFixed(2)}USDT)
                          </h1>
                        </div>
                      </div>
                      <div className="flex relative">
                        <div className="flex flex-col gap-[15px] flex-wrap">
                          <div className="flex flex-col flex-wrap gap-[0] text-white">
                            <p className="text-[14px] text-[#969696]">Quantity</p>
                            <h1 className="text-[20px] mr-[5px]">{selectedPosition.amount}$</h1>
                          </div>
                          <div className="flex flex-col flex-wrap gap-[0] text-white">
                            <p className="text-[14px] text-[#969696]">Entry Price</p>
                            <h1 className="text-[20px] mr-[5px]">{selectedPosition.entryPrice}$</h1>
                          </div>
                          <div className="flex flex-col flex-wrap gap-[0] text-white">
                            <p className="text-[14px] text-[#969696]">Current Price</p>
                            <h1 className="text-[20px] mr-[5px]">{currentPrice | "!"}$</h1>
                          </div>
                        </div>
                        <img
                          className="absolute top-[-70px] left-px w-[250px] h-[250px]"
                          src={ImageLogo.src}
                        />
                      </div>
                    </div>
                    <div className="w-full flex justify-center">
                      <Button
                        icon={<DownloadOutlined className=" text-[24px]" />}
                        type="default"
                        onClick={() => downloadImage("jpg")}
                        className=" mt-4"
                      >
                        Download
                      </Button>
                    </div>
                    <div
                      ref={captureRef}
                      className="flex hidden flex-col flex-wrap gap-4 w-[472px] h-[472px] bg-black p-6"
                    >
                      <span className="text-base xs:text-lg sm:text-xl lg:text-2xl font-bold mx-auto text-[#309eff]">
                        TradingAI
                      </span>
                      <div className="flex gap-[10px] h-6 relative ">
                        <span
                          className={`${style.titlePositionCard} right-px font-semibold text-white`}
                        >
                          {selectedPosition.symbol}
                        </span>
                        <span
                          className={`${style.titlePositionCard
                            } right-[85px] font-semibold px-2  ${selectedPosition.type === "LONG"
                              ? "text-green-600"
                              : "text-red-600"
                            }`}
                        >
                          {selectedPosition.type === "LONG" ? "long" : "short"}
                        </span>
                        <span
                          className={`${style.titlePositionCard} right-[150px] font-semibold text-white`}
                        >
                          {selectedPosition.leverage}X
                        </span>
                      </div>
                      <div className=" w-full flex flex-col flex-wrap">
                        <div>
                          <h1
                            style={{
                              color: isProfitable ? "#51ff6c" : "#ff0000",
                            }}
                            className="text-right relative z-[100]  text-[30px] text-white mr-2"
                          >
                            {pnl.percentage.toFixed(2)}%
                          </h1>
                          <h1
                            style={{
                              color: isProfitable ? "#51ff6c" : "#ff0000",
                            }}
                            className="text-right relative z-[100]  text-[25px] text-white mr-2"
                          >
                            ){Math.abs(pnl.amount).toFixed(2)}USDT(
                          </h1>
                        </div>
                      </div>
                      <div className="flex relative">
                        <div className="flex flex-col gap-[15px] flex-wrap">
                          <div className="flex flex-col flex-wrap gap-[0] text-white">
                            <p className="text-[14px] text-[#969696]">Quantity</p>
                            <h1 className="text-[20px] mr-[5px] mt-[-19px]">
                              {selectedPosition.amount}$
                            </h1>
                          </div>
                          <div className="flex flex-col flex-wrap gap-[0] text-white">
                            <p className="text-[14px] text-[#969696]">
                              Entry Price
                            </p>
                            <h1 className="text-[20px] mr-[5px] mt-[-19px]">
                              {selectedPosition.entryPrice}$
                            </h1>
                          </div>
                          <div className="flex flex-col flex-wrap gap-[0] text-white">
                            <p className="text-[14px] text-[#969696]">
                              Current Price
                            </p>
                            <h1 className="text-[20px] mr-[5px] mt-[-19px]">
                              {prices[selectedPosition.symbol] | "!"}$
                            </h1>
                          </div>
                        </div>
                        <img
                          className="absolute top-[-70px] left-[-5px] w-[250px] h-[250px]"
                          src={ImageLogo.src}
                        />
                      </div>
                    </div>
                  </>
                );
              })()}
          </Modal>
          <Modal
            title={<h2 className="text-white">Select Symbol</h2>}
            open={isSymbolModalVisible}
            onCancel={() => setIsSymbolModalVisible(false)}
            footer={null}
            width={500}
            className={`ltr ${style.symbolModal} text-white`}
            styles={{
              header: {
                backgroundColor: '#1a1a1a',
                color: 'white',
                borderBottom: '1px solidrgb(254, 0, 0)',
                padding: '16px 24px',
                fontSize: '18px',
                fontWeight: 'bold',
              },
              body: {
                backgroundColor: '#151515',
                color: 'white',
                padding: '0',
              },
              mask: {
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
              },
              content: {
                backgroundColor: '#151515',
                border: '1px solid #2a2a2a',
                borderRadius: '12px',
                overflow: 'hidden',
              },
            }}
          >
            {/* Search Field */}
            <div className="p-4 border-b border-[#2a2a2a]">
              <input
                placeholder="Search..."
                className="w-full p-2 bg-[#252525] border border-[#2a2a2a] rounded-lg text-white"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  filterCoins(e.target.value);
                }}
              />
            </div>

            <div className="max-h-[60vh] overflow-y-auto">
              {/* All Coins */}
              <div>
                <div className="px-4 py-2 bg-[#1a1a1a] text-gray-400 text-xs uppercase tracking-wider">
                  All Coins
                </div>
                <div className="divide-y divide-[#2a2a2a]">
                  {allCoins.length > 0 ? (
                    allCoins
                      .filter(symbol => symbol.endsWith('USDT')) // Only show coins that end with USDT
                      .filter(symbol => symbol.toLowerCase().includes(searchQuery.toLowerCase())) // Filter based on search query
                      .map(symbol => (
                        <div
                          key={symbol}
                          className="p-3 hover:bg-[#252525] cursor-pointer transition-colors"
                          onClick={() => selectSymbolAndClose(symbol)}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div>
                                <div className="font-medium text-white">{symbol}</div>
                                <div className="text-xs text-gray-400">
                                  {symbol.split('/')[0]}
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-medium text-white">
                                ${prices[symbol] || "—"} {/* Display price next to the symbol */}
                              </div>
                              {prices[symbol] && priceChanges[symbol] && (
                                <div className={`text-xs ${priceChanges[symbol] >= 0 ? "text-[#00c087]" : "text-[#ff4343]"}`}>
                                  {priceChanges[symbol] >= 0 ? "+" : ""}{priceChanges[symbol].toFixed(2)}%
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))
                  ) : (
                    <div className="p-8 text-center text-gray-400">
                      <div className="mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </div>
                      <p>No Results</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Modal>
        </Layout>
      </ConfigProvider>
    </div >
  );
}

