"use client";

// types
import { Coin } from "@/types/trade";
import { Position } from "@/types/trade";
import { PriceMap } from "@/types/trade";
import { ClosedPosition } from "@/types/trade";

// antd components
import {
    Button,
    Card,
    ConfigProvider,
    Divider,
    Input,
    Layout,
    Modal,
    Select,
    Space,
    Statistic,
    Tag,
    Typography,
} from "antd";
import fa_IR from "antd/locale/fa_IR";

// react hooks
import { useCallback, useEffect, useState, useRef } from "react";

// components
import TradeForm from "../../components/tradePage/TradeForm";
import style from "./style.module.css";
import { TradingViewWidgetDark } from "../../components/tradePage/TradingViewWidgetDark";
import { closeTrade } from "@/actions/trade.action";

// typography
const { Content } = Layout;
const { Text } = Typography;
const { Option } = Select;

// storage keys
const POSITIONS_STORAGE_KEY = "trading_positions";

// react functional component
export default function TradePage() {
  const [selectedSymbol, setSelectedSymbol] = useState<string>("BTCUSDT");
  const [coins, setCoins] = useState([]);
  const [prices, setPrices] = useState<PriceMap>({});
  const [positions, setPositions] = useState<Position[]>([]);
  const [currentPrice, setCurrentPrice] = useState<number | null>(null);
  const positionsRef = useRef<HTMLDivElement>(null);
  const [pnlState, setPnlState] = useState<{
    [key: string]: { amount: number; percentage: number };
  }>({});
  const [isHistoryModalVisible, setIsHistoryModalVisible] = useState(false);
  const [closedPositions, setClosedPositions] = useState<ClosedPosition[]>([]);
  const [isLimitModalVisible, setIsLimitModalVisible] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState<Position | null>(
    null
  );
  const [tempLimits, setTempLimits] = useState<{
    takeProfit: { price: number | null; percent: number | null } | null;
    stopLoss: { price: number | null; percent: number | null } | null;
  }>({ takeProfit: null, stopLoss: null });
  const [showChart, setShowChart] = useState(false); // وضعیت چک‌باکس
  const [isMobile, setIsMobile] = useState(false); // وضعیت برای بررسی عرض صفحه

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

<<<<<<< HEAD
                const closedPositionData: ClosedPosition = {
                    ...closedPosition,
                    closePrice: currentPrice,
                    closeTime: Date.now(),
                    pnl: {
                        amount: pnl.amount,
                        percentage: pnl.percentage,
                    },
                };

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

            if (position.takeProfit?.price || position.stopLoss?.price) {
                const pnl = calculatePnL(position, price);

                if (position.mode === "isolated" && pnl.percentage <= -100) {
                    closePosition(position.timestamp);
                    return;
                }

                if (position.takeProfit?.price) {
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

                if (position.stopLoss?.price) {
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
                const response = await fetch(
                    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10000&page=1"
                );
                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }
                const data: Coin[] = await response.json();
                setCoins(data);
                setLoading(false);
            } catch (err: any) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchCoins();
    }, []);

    // update prices
    const updatePricesAndPnL = useCallback(async () => {
        try {
            const uniqueSymbols = Array.from(
                new Set([selectedSymbol, ...positions.map((p) => p.symbol)])
=======
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

      if (position.takeProfit?.price || position.stopLoss?.price) {
        const pnl = calculatePnL(position, price);

        if (position.mode === "isolated" && pnl.percentage <= -100) {
          closePosition(position.timestamp);
          return;
        }

        if (position.takeProfit?.price) {
          if (position.type === "LONG" && price >= position.takeProfit.price) {
            console.log(
              `Closing position ${position.symbol} at take profit: ${price}`
>>>>>>> 912a80b07340d1937aed7d5eb33970a2e083f0e6
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

<<<<<<< HEAD
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

    return (
        <ConfigProvider locale={fa_IR} direction="rtl">
            <Layout className="min-h-screen mt-16 bg-white dark:bg-black dark:text-white">
                <Content className="p-6 bg-white dark:bg-black">
                    <div className='bg-white dark:bg-black'>
                        <div className={style.ShowResChart}>
                            <input
                                className='hidden'
                                type="checkbox"
                                id='ShowResChart'
                                checked={showChart} // وضعیت چک‌باکس
                                onChange={handleCheckboxChange} // تغییر وضعیت چک‌باکس
                                disabled={!isMobile}
                            />
                            <label
                                className={`cursor-pointer rounded-xl p-2 font-bold text-black dark:text-white ${showChart ? 'bg-gray-500 dark:bg-gray-900' : 'bg-gray-400 dark:bg-gray-600'}`}
                                htmlFor='ShowResChart'
                            >
                                نمایش نمودار
                            </label>
=======
    fetchCoins();
  }, []);

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

  return (
    <ConfigProvider locale={fa_IR} direction="rtl">
      <Layout className="min-h-screen mt-16 bg-white dark:bg-black dark:text-white">
        <Content className="p-6 bg-white dark:bg-black">
          <div className="bg-white dark:bg-black">
            <div className={style.ShowResChart}>
              <input
                className="hidden"
                type="checkbox"
                id="ShowResChart"
                checked={showChart} // وضعیت چک‌باکس
                onChange={handleCheckboxChange} // تغییر وضعیت چک‌باکس
                disabled={!isMobile}
              />
              <label
                className={`cursor-pointer rounded-xl p-2 text-black dark:text-white ${
                  showChart
                    ? "bg-gray-500 dark:bg-gray-900"
                    : "bg-gray-400 dark:bg-gray-600"
                }`}
                htmlFor="ShowResChart"
              >
                نمایش نمودار
              </label>
            </div>
            <div className={`${style.contentTrade}  bg-white dark:bg-black`}>
              <div
                className={`${
                  style.contentTradingView
                }  bg-[#f1f1f1] dark:bg-[#202020] ${
                  isMobile ? (showChart ? "flex" : "hidden") : "flex"
                }`}
              >
                <TradingViewWidgetDark
                  symbol={selectedSymbol}
                  onPriceChange={setCurrentPrice}
                />
>>>>>>> 912a80b07340d1937aed7d5eb33970a2e083f0e6

                {/* {darkMode == true ? (      NavidRezaBug
                                    <TradingViewWidgetDark
                                        symbol={selectedSymbol}
                                        onPriceChange={setCurrentPrice}
                                    />
                                ) : (
                                    <TradingViewWidget
                                        symbol={selectedSymbol}
                                        onPriceChange={setCurrentPrice}
                                    />
                                )} */}
              </div>
              <div
                className={`${style.contentTradeForm}  bg-[#f1f1f1] dark:bg-[#202020]`}
              >
                <div className="flex justify-[right] gap-3 mb-[20px]">
                  <label className="block text-[18px] font-semibold text-gray-700 dark:text-gray-200">
                    نماد:
                  </label>
                  <Select
                    value={selectedSymbol}
                    onChange={setSelectedSymbol}
                    className={`${style.OptionHolder} bg-black dark:bg-gray-700 dark:text-white`}
                    showSearch
                  >
                    {coins.map(({ symbol, image }) => (
                      <Option
                        className="bg-black dark:bg-gray-700 dark:text-white"
                        key={symbol}
                        value={symbol.toUpperCase() + "USDT"}
                      >
                        <div className={style.option}>
                          <h1>{symbol.toUpperCase() + "/USDT"}</h1>
                          <img className="w-6" src={image} />
                        </div>
                      </Option>
                    ))}
                  </Select>
                </div>
                <TradeForm
                  currentPrice={prices[selectedSymbol]}
                  onOpenPosition={handleOpenPosition}
                  symbol={selectedSymbol}
                />
              </div>
            </div>
          </div>
          <div className={style.positionsHolder}>
            <div
              className={`${style.positions} bg-[#f1f1f1] dark:bg-[#434343]`}
              style={{ marginBottom: "16px" }}
            >
              <div className="flex text-white mb-1 justify-between items-center">
                <div className="flex gap-1.5">
                  <span className="text-black text-[16px] font-[700] dark:text-white">
                    معاملات فعال:
                  </span>
                  <span
                    className={` text-[17px] font-bold  border border-black dark:border-white text-black dark:text-white px-1 rounded bg-white dark:bg-black`}
                  >
                    {positions.length}
                  </span>
                </div>
                <button
                  onClick={() => setIsHistoryModalVisible(true)}
                  className="border-none gap-1 flex bg-black p-1 rounded-[8px] bg-white dark:bg-black"
                >
                  <h1 className="text-[#202020] text-[16px] flex dark:text-white">
                    history
                  </h1>
                  <img
                    className="w-6 h-6"
                    src="https://img.icons8.com/?size=100&id=ZG6vinMQTTq8&format=png&color=7e7e7e"
                  />
                </button>
              </div>
              {positions.length > 0 ? (
                <table className="w-full table-auto border-collapse">
                  <thead>
                    <tr>
                      <th className="text-center text-black dark:text-white py-2 px-4">
                        Symbol
                      </th>
                      <th className="text-center text-black dark:text-white py-2 px-4">
                        Type
                      </th>
                      <th className="text-center text-black dark:text-white py-2 px-4">
                        Mode
                      </th>
                      <th className="text-center text-black dark:text-white py-2 px-4">
                        Leverage
                      </th>
                      <th className="text-center text-black dark:text-white py-2 px-4">
                        Amount
                      </th>
                      <th className="text-center text-black dark:text-white py-2 px-4">
                        Entry Price
                      </th>
                      <th className="text-center text-black dark:text-white py-2 px-4">
                        Current Price
                      </th>
                      <th className="text-left text-black dark:text-white py-2 px-4">
                        PNL
                      </th>
                      <th className="text-center text-black dark:text-white py-2 px-4"></th>
                    </tr>
                  </thead>
                  <tbody className="">
                    {positions.map((position) => {
                      const currentPrice = prices[position.symbol];
                      const pnl = pnlState[position.timestamp] || {
                        amount: 0,
                        percentage: 0,
                      };
                      const isProfitable = pnl.amount >= 0;

<<<<<<< HEAD
                            <div className="flex text-white mb-1 justify-between items-center mb-4">
                                <div className='flex gap-1.5'>
                                    <span className="text-black text-[16px] font-[700] dark:text-white">معاملات فعال:</span>
                                    <span className={` text-[17px] font-bold  border border-black dark:border-white text-black dark:text-white px-1 rounded bg-white dark:bg-black`}>
                                        {positions.length}
                                    </span>
                                </div>
                                <button
                                    onClick={() => setIsHistoryModalVisible(true)}
                                    className="border-none gap-1 flex bg-black p-1 rounded-[8px] bg-white dark:bg-black"
                                >
                                    <h1 className='text-[#202020] text-[16px] flex dark:text-white'>history</h1>
                                    <img className='w-6 h-6' src='https://img.icons8.com/?size=100&id=ZG6vinMQTTq8&format=png&color=7e7e7e' />
                                </button>
                            </div>
                            {positions.length > 0 ? (
                                isMobile ? (
                                    // اگر عرض صفحه کمتر از 940px باشد، نمایش کارت از Ant Design
                                    <div className="flex justify-center flex-wrap gap-4">
                                        {positions.map((position) => {
                                            const pnl = pnlState[position.timestamp] || { amount: 0, percentage: 0 };
                                            const isProfitable = pnl.amount >= 0;

                                            return (
                                                <div
                                                    key={position.timestamp}
                                                    className={`${style.positionOpen} ${isProfitable
                                                        ? 'dark:border-[#b7eb8f] border-[#3e8301]'
                                                        : 'dark:border-[#ffccc7] border-[#ff5555]'
                                                        }  bg-white dark:bg-black`}
                                                >
                                                    <div className="flex">
                                                        <Space className="flex justify-left mb-1">
                                                            <h1 className={`${style.titlePositionCard} text-black dark:text-white`}>{position.symbol}</h1>
                                                            <Tag color={position.type === 'LONG' ? 'green' : 'red'}>{position.type === 'LONG' ? 'long' : 'short'}</Tag>
                                                            <Tag className="bg-white dark:bg-gray-500 text-black dark:text-white">{position.mode}</Tag>
                                                            <Tag className="bg-white dark:bg-gray-500 text-black dark:text-white">{position.leverage}X</Tag>
                                                        </Space>
                                                    </div>
                                                    <Divider style={{ background: "#64748b", height: "1px", margin: "0 2px" }} />
                                                    <div className='flex justify-between'>
                                                        <Space className=' w-full flex justify-between'>
                                                            <Statistic
                                                                value={pnl.percentage}
                                                                precision={2}
                                                                valueStyle={{ color: isProfitable ? '#3f8600' : '#cf1322', fontSize: '20px' }}
                                                                suffix="%"
                                                                className="dark:text-white"
                                                            />
                                                            <Statistic
                                                                suffix="$"
                                                                value={Math.abs(pnl.amount)}
                                                                precision={2}
                                                                valueStyle={{ color: isProfitable ? '#3f8600' : '#cf1322', fontSize: '20px' }}
                                                                className="dark:text-white"
                                                            />
                                                        </Space>
                                                    </div>

                                                    <div className="grid grid-cols-2">
                                                        <div className="dark:text-white">
                                                            <p className='text-[14px] text-[#969696]'>اندازه</p>
                                                            <h1 className='text-[20px]'>{position.amount * position.leverage}$</h1>
                                                        </div>
                                                        <div className="dark:text-white">
                                                            <p className='text-[14px] text-[#969696]'>مقدار</p>
                                                            <h1 className='text-[20px]'>{position.amount}$</h1>
                                                        </div>
                                                        <div className="dark:text-white">
                                                            <p className='text-[14px] text-[#969696]'>قیمت ورود</p>
                                                            <h1 className='text-[20px]'>{position.entryPrice}$</h1>
                                                        </div>
                                                        <div className="dark:text-white">
                                                            <p className='text-[14px] text-[#969696]'>قیمت لحظه ای</p>
                                                            <h1 className='text-[20px]'>{prices[position.symbol] | "!"}$</h1>
                                                        </div>
                                                    </div>

                                                    <Divider style={{ margin: '2px 0' }} />
                                                    <div className='flex gap-3'>
                                                        <Button
                                                            block
                                                            type="primary"
                                                            onClick={() => {
                                                                setSelectedPosition(position);
                                                                setIsLimitModalVisible(true);
                                                            }}
                                                            className='bg-slate-500 dark:bg-gray-600 dark:text-white'
                                                        >
                                                            TP/SL
                                                        </Button>

                                                        <Button
                                                            block
                                                            type="primary"
                                                            className='bg-slate-500 dark:bg-gray-600 dark:text-white'
                                                            onClick={() => closePosition(position.timestamp)}
                                                        >
                                                            بستن معامله
                                                        </Button>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                ) : (
                                    // اگر عرض صفحه بیشتر از 940px باشد، نمایش جدول معمولی
                                    <table className={`${style.positionsTable} w-full table-auto border-collapse`}>
                                        <thead>
                                            <tr>
                                                <th className="text-center text-black dark:text-white py-2 px-4">Symbol</th>
                                                <th className="text-center text-black dark:text-white py-2 px-4">Type</th>
                                                <th className="text-center text-black dark:text-white py-2 px-4">Mode</th>
                                                <th className="text-center text-black dark:text-white py-2 px-4">Leverage</th>
                                                <th className="text-center text-black dark:text-white py-2 px-4">Amount</th>
                                                <th className="text-center text-black dark:text-white py-2 px-4">Entry Price</th>
                                                <th className="text-center text-black dark:text-white py-2 px-4">Current Price</th>
                                                <th className="text-left text-black dark:text-white py-2 px-4">PNL</th>
                                                <th className="text-center text-black dark:text-white py-2 px-4"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {positions.map((position) => {
                                                const currentPrice = prices[position.symbol];
                                                const pnl = pnlState[position.timestamp] || { amount: 0, percentage: 0 };
                                                const isProfitable = pnl.amount >= 0;

                                                return (
                                                    <tr key={position.timestamp} className={`rounded-sm border-b border-[#202020] dark:border-[#ccc]  bg-white dark:bg-black`}>
                                                        <td className="py-2 px-4 text-[16px] font-[700] text-center text-black dark:text-white">{position.symbol}</td>
                                                        <td className="py-2 px-4">
                                                            <div className='justify-center flex'>
                                                                <button className={`px-2 mx-auto py-1 rounded-full ${position.type === 'LONG' ? 'bg-green-500 dark:bg-green-700' : 'bg-red-500 dark:bg-red-700'} text-white`}>
                                                                    {position.type === 'LONG' ? 'long' : 'short'}
                                                                </button>
                                                            </div>
                                                        </td>
                                                        <td className="py-2 px-4 text-center text-black dark:text-white">{position.mode}</td>
                                                        <td className="py-2 px-4 text-center text-black dark:text-white">{position.leverage}X</td>
                                                        <td className="text-center text-black dark:text-white py-2 px-4">
                                                            {(position.amount).toFixed(2)}$
                                                        </td>
                                                        <td className="text-center text-black dark:text-white py-2 px-4">
                                                            {position.entryPrice}$
                                                        </td>
                                                        <td className="text-center text-black dark:text-white py-2 px-4">
                                                            {currentPrice || "!"}$
                                                        </td>
                                                        <td className="py-2 px-4">
                                                            <div className='flex-col justify-[left] flex-wrap flex'>
                                                                <span className='text-left text-black dark:text-white' style={{ color: isProfitable ? '#3f8600' : '#cf1322', fontSize: '16px' }}>
                                                                    {Math.abs(pnl.amount).toFixed(2) + "USDT  "}
                                                                </span>
                                                                <span className='text-left text-black dark:text-white' style={{ color: isProfitable ? '#3f8600' : '#cf1322', fontSize: '16px' }}>
                                                                    {pnl.percentage.toFixed(2)}%
                                                                </span>
                                                            </div>
                                                        </td>
                                                        <td className="py-2 px-4">
                                                            <div className="flex gap-2">
                                                                <button
                                                                    className="bg-blue-500 mr-auto text-white py-1 px-4 rounded"
                                                                    onClick={() => {
                                                                        setSelectedPosition(position);
                                                                        setIsLimitModalVisible(true);
                                                                    }}
                                                                >
                                                                    TP/SL
                                                                </button>
                                                                <button
                                                                    style={{ background: isProfitable ? '#3f8600' : '#cf1322' }}
                                                                    className="bg-red-500 ml-auto text-white py-1 px-4 rounded"
                                                                    onClick={() => closePosition(position.timestamp)}
                                                                >
                                                                    بستن معامله
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                )
                            ) : (


                                <div className={`flex justify-center w-full dark:text-white`}>
                                    هیچ معامله‌ای باز نیست
                                </div>
                            )}
                        </div>

                    </div>
                </Content>
=======
                      return (
                        <tr
                          key={position.timestamp}
                          className={`rounded-sm border-b border-[#202020] dark:border-[#ccc]  bg-white dark:bg-black `}
                        >
                          <td className="py-2 px-4 text-[16px] font-[700] text-center text-black dark:text-white ">
                            {position.symbol}
                          </td>
                          <td className="py-2  px-4">
                            <div className="justify-center flex">
                              <button
                                className={`px-2 mx-auto py-1 rounded-full ${
                                  position.type === "LONG"
                                    ? "bg-green-500 dark:bg-green-700"
                                    : "bg-red-500 dark:bg-red-700"
                                } text-white`}
                              >
                                {position.type === "LONG" ? "long" : "short"}
                              </button>
                            </div>
                          </td>
                          <td className="py-2 px-4 text-center text-black dark:text-white ">
                            {" "}
                            {position.mode}
                          </td>
                          <td className="py-2 px-4 text-center text-black dark:text-white ">
                            {position.leverage}X
                          </td>
                          <td className="text-center text-black dark:text-white py-2 px-4">
                            {position.amount.toFixed(2)}$
                          </td>
                          <td className="text-center text-black dark:text-white py-2 px-4">
                            {position.entryPrice}$
                          </td>
                          <td className="text-center text-black dark:text-white py-2 px-4">
                            {currentPrice || "!"}$
                          </td>
                          <td className="py-2 px-4  ">
                            <div className=" flex-col justify-[left] flex-wrap flex">
                              <span
                                className="text-left text-black dark:text-white"
                                style={{
                                  color: isProfitable ? "#3f8600" : "#cf1322",
                                  fontSize: "16px",
                                }}
                              >
                                {" "}
                                {Math.abs(pnl.amount).toFixed(2) + "USDT  "}
                              </span>
                              <span
                                className="text-left text-black dark:text-white"
                                style={{
                                  color: isProfitable ? "#3f8600" : "#cf1322",
                                  fontSize: "16px",
                                }}
                              >
                                {pnl.percentage.toFixed(2)}%
                              </span>
                            </div>
                          </td>
                          <td className="py-2 px-4">
                            <div className="flex gap-2">
                              <button
                                className="bg-blue-500 mr-auto text-white py-1 px-4 rounded"
                                onClick={() => {
                                  setSelectedPosition(position);
                                  setIsLimitModalVisible(true);
                                }}
                              >
                                TP/SL
                              </button>
                              <button
                                style={{
                                  background: isProfitable
                                    ? "#3f8600"
                                    : "#cf1322",
                                }}
                                className="bg-red-500 ml-auto text-white py-1 px-4 rounded"
                                onClick={() =>
                                  closePosition(position.timestamp)
                                }
                              >
                                بستن معامله
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              ) : (
                <div className={`flex justify-center w-full dark:text-white`}>
                  هیچ معامله‌ای باز نیست
                </div>
              )}
            </div>
          </div>
        </Content>
>>>>>>> 912a80b07340d1937aed7d5eb33970a2e083f0e6

                <Modal
                    title="تاریخچه معاملات"
                    open={isHistoryModalVisible}
                    onCancel={() => setIsHistoryModalVisible(false)}
                    footer={null}
                    width={800}
                    className="rtl dark:bg-gray-800 dark:text-white"
                >
                    <div className="space-y-4">
                        {closedPositions.length > 0 ? (
                            closedPositions
                                .sort((a, b) => b.closeTime - a.closeTime)
                                .map((position) => (
                                    <Card
                                        key={position.timestamp}
                                        size="small"
                                        className={`${style.historyCard} dark:bg-black`}
                                        style={{
                                            borderColor:
                                                position.pnl?.amount >= 0 ? "#b7eb8f" : "#ffccc7",
                                        }}
                                    >
                                        <div className="flex justify-between mb-4">
                                            <Space>
                                                <h1 className="text-black text-[16px] font-semibold dark:text-white">
                                                    {position.symbol}
                                                </h1>
                                                <Tag
                                                    color={"gray"}
                                                    className="text-black dark:text-white"
                                                >
                                                    {position.mode}
                                                </Tag>
                                                <Tag color={position.type === "LONG" ? "green" : "red"}>
                                                    {position.type === "LONG" ? "لانگ" : "شورت"}
                                                </Tag>
                                            </Space>
                                            <Text
                                                type={position.pnl?.amount >= 0 ? "success" : "danger"}
                                            >
                                                <div
                                                    className={
                                                        position.pnl?.percentage >= 0
                                                            ? "text-green-500"
                                                            : "text-red-500 dark:text-[#e65330]"
                                                    }
                                                >
                                                    %{Math.abs(position.pnl?.percentage || 0).toFixed(2)}
                                                </div>
                                            </Text>
                                        </div>

                                        <div className="grid grid-cols-3 gap-4">
                                            <div>
                                                <h1 className="text-black text-[14px]  dark:text-white">
                                                    قیمت ورود:
                                                </h1>
                                                <div className="dark:text-white">
                                                    ${position.entryPrice}
                                                </div>
                                            </div>
                                            <div>
                                                <h1 className="text-black text-[14px]  dark:text-white">
                                                    قیمت خروج:
                                                </h1>
                                                <div className="dark:text-white">
                                                    ${position.closePrice}
                                                </div>
                                            </div>
                                            <div>
                                                <h1 className="text-black text-[14px]  dark:text-white">
                                                    سود/ضرر:
                                                </h1>
                                                <div
                                                    className={
                                                        position.pnl?.amount >= 0
                                                            ? "text-green-500"
                                                            : "text-red-500"
                                                    }
                                                >
                                                    ${Math.abs(position.pnl?.amount || 0).toFixed(2)}
                                                </div>
                                            </div>
                                            <div>
                                                <h1 className="text-black text-[14px]  dark:text-white">
                                                    مقدار:
                                                </h1>
                                                <div className="dark:text-white">
                                                    ${position.amount}
                                                </div>
                                            </div>
                                            <div>
                                                <h1 className="text-black text-[14px]  dark:text-white">
                                                    اهرم:
                                                </h1>
                                                <div className="dark:text-white">
                                                    {position.leverage}x
                                                </div>
                                            </div>
                                            <div>
                                                <h1 className="text-black text-[14px]  dark:text-white">
                                                    تاریخ بسته شدن:
                                                </h1>
                                                <div className="dark:text-white">
                                                    {new Date(position.closeTime).toLocaleString("fa-IR")}
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                ))
                        ) : (
                            <div className="text-center text-gray-500 py-8 dark:text-gray-400">
                                تاریخچه‌ای وجود ندارد
                            </div>
                        )}
                    </div>
                </Modal>

                <Modal
                    title="تنظیم حد سود و ضرر"
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
                            className="dark:bg-gray-700 dark:text-white"
                        >
                            انصراف
                        </Button>,
                        <Button
                            key="apply"
                            type="primary"
                            onClick={handleApplyLimits}
                            style={{ backgroundColor: "#1890ff" }}
                            className="dark:bg-blue-600 dark:text-white"
                        >
                            اعمال تغییرات
                        </Button>,
                    ]}
                    width={600}
                    className="rtl dark:bg-gray-800 dark:text-white"
                >
                    {selectedPosition && (
                        <div className="space-y-6">
                            <div className="bg-gray-800 p-4 rounded-lg">
                                <div className="mb-4">
                                    <Text strong className="text-gray-300 mb-2 block">
                                        حد سود:
                                    </Text>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <Text className="text-gray-400 mb-1 block">
                                                قیمت (USDT)
                                            </Text>
                                            <Input
                                                value={
                                                    tempLimits.takeProfit?.price ||
                                                    selectedPosition.takeProfit?.price ||
                                                    ""
                                                }
                                                onChange={(e) => {
                                                    const price = parseFloat(e.target.value);
                                                    if (!isNaN(price)) {
                                                        setTempLimits((prev) => ({
                                                            ...prev,
                                                            takeProfit: {
                                                                price,
                                                                percent: calculatePricePercent(
                                                                    price,
                                                                    selectedPosition.entryPrice,
                                                                    selectedPosition.type,
                                                                    selectedPosition.leverage
                                                                ),
                                                            },
                                                        }));
                                                    }
                                                }}
                                                suffix="$"
                                                className="dark:bg-gray-700 dark:text-white"
                                            />
                                        </div>
                                        <div>
                                            <Text className="text-gray-400 mb-1 block">درصد</Text>
                                            <Input
                                                value={
                                                    tempLimits.takeProfit?.percent?.toFixed(2) ||
                                                    selectedPosition.takeProfit?.percent?.toFixed(2) ||
                                                    ""
                                                }
                                                onChange={(e) => {
                                                    const percentWithLeverage = parseFloat(
                                                        e.target.value
                                                    );
                                                    if (!isNaN(percentWithLeverage)) {
                                                        const actualPercent =
                                                            percentWithLeverage / selectedPosition.leverage;
                                                        const price =
                                                            selectedPosition.type === "LONG"
                                                                ? selectedPosition.entryPrice *
                                                                (1 + actualPercent / 100)
                                                                : selectedPosition.entryPrice *
                                                                (1 - actualPercent / 100);
                                                        setTempLimits((prev) => ({
                                                            ...prev,
                                                            takeProfit: {
                                                                price,
                                                                percent: percentWithLeverage,
                                                            },
                                                        }));
                                                    }
                                                }}
                                                suffix={`% (${selectedPosition.leverage}x)`}
                                                className="dark:bg-gray-700 dark:text-white"
                                            />
                                        </div>
                                    </div>
                                    {(tempLimits.takeProfit?.price ||
                                        selectedPosition.takeProfit?.price) && (
                                            <div className="mt-2 text-green-500">
                                                سود تخمینی: $
                                                {calculateEstimatedPnL(
                                                    selectedPosition,
                                                    tempLimits.takeProfit?.price ||
                                                    selectedPosition.takeProfit?.price ||
                                                    0
                                                ).amount.toFixed(2)}
                                            </div>
                                        )}
                                </div>

                                <div>
                                    <Text strong className="text-gray-300 mb-2 block">
                                        حد ضرر:
                                    </Text>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <Text className="text-gray-400 mb-1 block">
                                                قیمت (USDT)
                                            </Text>
                                            <Input
                                                value={
                                                    tempLimits.stopLoss?.price ||
                                                    selectedPosition.stopLoss?.price ||
                                                    ""
                                                }
                                                onChange={(e) => {
                                                    const price = parseFloat(e.target.value);
                                                    if (!isNaN(price)) {
                                                        setTempLimits((prev) => ({
                                                            ...prev,
                                                            stopLoss: {
                                                                price,
                                                                percent: calculatePricePercent(
                                                                    price,
                                                                    selectedPosition.entryPrice,
                                                                    selectedPosition.type,
                                                                    selectedPosition.leverage
                                                                ),
                                                            },
                                                        }));
                                                    }
                                                }}
                                                suffix="$"
                                                className="dark:bg-gray-700 dark:text-white"
                                            />
                                        </div>
                                        <div>
                                            <Text className="text-gray-400 mb-1 block">درصد</Text>
                                            <Input
                                                value={
                                                    tempLimits.stopLoss?.percent?.toFixed(2) ||
                                                    selectedPosition.stopLoss?.percent?.toFixed(2) ||
                                                    ""
                                                }
                                                onChange={(e) => {
                                                    const percentWithLeverage = parseFloat(
                                                        e.target.value
                                                    );
                                                    if (!isNaN(percentWithLeverage)) {
                                                        const actualPercent =
                                                            percentWithLeverage / selectedPosition.leverage;
                                                        const price =
                                                            selectedPosition.type === "LONG"
                                                                ? selectedPosition.entryPrice *
                                                                (1 - actualPercent / 100)
                                                                : selectedPosition.entryPrice *
                                                                (1 + actualPercent / 100);
                                                        setTempLimits((prev) => ({
                                                            ...prev,
                                                            stopLoss: {
                                                                price,
                                                                percent: percentWithLeverage,
                                                            },
                                                        }));
                                                    }
                                                }}
                                                suffix={`% (${selectedPosition.leverage}x)`}
                                                className="dark:bg-gray-700 dark:text-white"
                                            />
                                        </div>
                                    </div>
                                    {(tempLimits.stopLoss?.price ||
                                        selectedPosition.stopLoss?.price) && (
                                            <div
                                                className="mt-2"
                                                style={{
                                                    color:
                                                        Math.abs(
                                                            calculateEstimatedPnL(
                                                                selectedPosition,
                                                                tempLimits.stopLoss?.price ||
                                                                selectedPosition.stopLoss?.price ||
                                                                0
                                                            ).amount
                                                        ) < 1
                                                            ? "#000"
                                                            : "#3f8600",
                                                    fontSize: "20px",
                                                }}
                                            >
                                                ضرر تخمینی: $
                                                {Math.abs(
                                                    calculateEstimatedPnL(
                                                        selectedPosition,
                                                        tempLimits.stopLoss?.price ||
                                                        selectedPosition.stopLoss?.price ||
                                                        0
                                                    ).amount
                                                ).toFixed(2)}
                                            </div>
                                        )}
                                </div>
                            </div>
                        </div>
                    )}
                </Modal>
            </Layout>
        </ConfigProvider>
    );
}
