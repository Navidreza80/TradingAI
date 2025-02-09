'use client'
type Coin = {
    id: string;
    name: string;
    symbol: string;
    current_price: number;
    image: string;
};
type Price = {
    symbol: string;
    price: number;
};
import { useState, useEffect, useCallback, useRef } from 'react'
import { TradingViewWidget } from '../../components/tradePage/TradingViewWidget'
import TradeForm from '../../components/tradePage/TradeForm'
import { Layout, Select, Card, Button, Typography, Space, Tag, Statistic, Divider, Modal, Input } from 'antd'
import { DeleteOutlined, ArrowUpOutlined, ArrowDownOutlined, MoreOutlined, BookOutlined } from '@ant-design/icons'
import { ConfigProvider } from 'antd'
import style from './style.module.css'
import fa_IR from 'antd/locale/fa_IR'
import Link from 'next/link'

const { Header, Content } = Layout
const { Title, Text } = Typography
const { Option } = Select

interface Position {
    symbol: string;
    amount: number;
    leverage: number;
    mode: 'cross' | 'isolated';
    type: 'LONG' | 'SHORT';
    entryPrice: number;
    takeProfit: number | null;
    stopLoss: number | null;
    timestamp: number;
    margin?: number;
    maintenanceMargin?: number;
}

interface Candle {
    openTime: number
    open: string
    high: string
    low: string
    close: string
    volume: string
    closeTime: number
}

interface PriceMap {
    [symbol: string]: number
}

interface ClosedPosition extends Position {
    closePrice: number;
    closeTime: number;
    pnl: {
        amount: number;
        percentage: number;
    };
}

const POSITIONS_STORAGE_KEY = 'trading_positions'

export default function TradePage() {
    const [selectedSymbol, setSelectedSymbol] = useState<string>('BTCUSDT')
    const [prices, setPrices] = useState<PriceMap>({})
    const [positions, setPositions] = useState<Position[]>([])
    const [currentPrice, setCurrentPrice] = useState<number | null>(null)
    const positionsRef = useRef<HTMLDivElement>(null)
    const [pnlState, setPnlState] = useState<{[key: string]: { amount: number; percentage: number }}>({})
    const [isHistoryModalVisible, setIsHistoryModalVisible] = useState(false);
    const [closedPositions, setClosedPositions] = useState<ClosedPosition[]>([]);
    const [isLimitModalVisible, setIsLimitModalVisible] = useState(false);
    const [selectedPosition, setSelectedPosition] = useState<Position | null>(null);
    const [tempLimits, setTempLimits] = useState<{
        takeProfit: { price: number | null; percent: number | null; } | null;
        stopLoss: { price: number | null; percent: number | null; } | null;
    }>({ takeProfit: null, stopLoss: null });

    const calculatePnL = useCallback((position: Position, price: number) => {
        if (!price || !position.entryPrice) return { amount: 0, percentage: 0 }

        const priceDiff = position.type === 'LONG'
            ? (price - position.entryPrice) / position.entryPrice
            : (position.entryPrice - price) / position.entryPrice

        const pnlAmount = position.amount * priceDiff * position.leverage
        const pnlPercentage = priceDiff * 100 * position.leverage

        return { amount: pnlAmount, percentage: pnlPercentage }
    }, [])

    const closePosition = useCallback((timestamp: number) => {
        if (!prices[selectedSymbol]) return;

        const closedPosition = positions.find(p => p.timestamp === timestamp);
        if (closedPosition) {
            const currentPrice = prices[closedPosition.symbol];
            const pnl = calculatePnL(closedPosition, currentPrice);

            const closedPositionData: ClosedPosition = {
                ...closedPosition,
                closePrice: currentPrice,
                closeTime: Date.now(),
                pnl: {
                    amount: pnl.amount,
                    percentage: pnl.percentage
                }
            };

            const savedClosedPositions = JSON.parse(localStorage.getItem('closed_positions') || '[]');
            const isPositionAlreadyClosed = savedClosedPositions.some(
                (p: ClosedPosition) => p.timestamp === timestamp
            );

            if (!isPositionAlreadyClosed) {
                const uniquePositions = Array.from(
                    new Map([...savedClosedPositions, closedPositionData].map(
                        (position: ClosedPosition) => [position.timestamp, position]
                    )).values()
                );
                uniquePositions.sort((a, b) => b.closeTime - a.closeTime);
                
                localStorage.setItem('closed_positions', JSON.stringify(uniquePositions));
                setClosedPositions(uniquePositions);
            }

            setPositions(prevPositions => {
                const updatedPositions = prevPositions.filter(p => p.timestamp !== timestamp);
                localStorage.setItem(POSITIONS_STORAGE_KEY, JSON.stringify(updatedPositions));
                return updatedPositions;
            });
        }
    }, [prices, selectedSymbol, positions, calculatePnL]);

    const checkAndClosePositions = useCallback(() => {
        positions.forEach(position => {
            const price = prices[position.symbol];
            if (!price) return;

            if (position.takeProfit?.price || position.stopLoss?.price) {
                const pnl = calculatePnL(position, price);

                if (position.mode === 'isolated' && pnl.percentage <= -100) {
                    closePosition(position.timestamp);
                    return;
                }

                if (position.takeProfit?.price) {
                    if (position.type === 'LONG' && price >= position.takeProfit.price) {
                        console.log(`Closing position ${position.symbol} at take profit: ${price}`);
                        closePosition(position.timestamp);
                        return;
                    }
                    if (position.type === 'SHORT' && price <= position.takeProfit.price) {
                        console.log(`Closing position ${position.symbol} at take profit: ${price}`);
                        closePosition(position.timestamp);
                        return;
                    }
                }

                if (position.stopLoss?.price) {
                    if (position.type === 'LONG' && price <= position.stopLoss.price) {
                        console.log(`Closing position ${position.symbol} at stop loss: ${price}`);
                        closePosition(position.timestamp);
                        return;
                    }
                    if (position.type === 'SHORT' && price >= position.stopLoss.price) {
                        console.log(`Closing position ${position.symbol} at stop loss: ${price}`);
                        closePosition(position.timestamp);
                        return;
                    }
                }
            }
        });
    }, [positions, prices, calculatePnL, closePosition]);

    useEffect(() => {
        const newPnlState: {[key: string]: { amount: number; percentage: number }} = {};
        positions.forEach(position => {
            const price = prices[position.symbol];
            if (price) {
                const pnl = calculatePnL(position, price);
                newPnlState[position.timestamp] = pnl;
            }
        });
        setPnlState(newPnlState);
        checkAndClosePositions();
    }, [positions, prices, calculatePnL, checkAndClosePositions]);

    useEffect(() => {
            const savedPositions = localStorage.getItem(POSITIONS_STORAGE_KEY)
            if (savedPositions) {
            try {
                const parsedPositions = JSON.parse(savedPositions)
                setPositions(parsedPositions)
                console.log('Loaded positions:', parsedPositions)
            } catch (error) {
                console.error('Error loading positions:', error)
            }
        }
    }, [])

    const handleOpenPosition = useCallback((position: Omit<Position, 'symbol' | 'timestamp'>) => {
        const price = prices[selectedSymbol]
        if (!price) {
            alert('قیمت فعلی در دسترس نیست')
            return
        }

        const newPosition: Position = {
            ...position,
            symbol: selectedSymbol,
            entryPrice: price,
            timestamp: Date.now(),
            type: position.type,
            mode: position.mode,
            leverage: position.leverage
        }

        console.log('Opening new position:', newPosition)

        setPositions(prevPositions => {
            const updatedPositions = [...prevPositions, newPosition]
            localStorage.setItem(POSITIONS_STORAGE_KEY, JSON.stringify(updatedPositions))
            return updatedPositions
        })
    }, [prices, selectedSymbol])

    const [coins, setCoins] = useState<Coin[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchCoins = async () => {
            try {
                const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10000&page=1')
                if (!response.ok) {
                    throw new Error('Failed to fetch data')
                }
                const data: Coin[] = await response.json()
                setCoins(data)
                setLoading(false)
            } catch (err: any) {
                setError(err.message)
                setLoading(false)
            }
        }

        fetchCoins()
    }, [])

    const updatePricesAndPnL = useCallback(async () => {
        try {
            const uniqueSymbols = Array.from(
                new Set([selectedSymbol, ...positions.map(p => p.symbol)])
            );

            const pricePromises = uniqueSymbols.map(symbol =>
                fetch(`https://api.binance.com/api/v3/ticker/price?symbol=${symbol.toUpperCase()}`)
                    .then(res => res.json())
                    .then(data => ({
                        symbol: symbol,
                        price: parseFloat(data.price)
                    }))
            );

            const priceResults = await Promise.all(pricePromises);
            
            const newPrices: PriceMap = {};
            priceResults.forEach(result => {
                if (!isNaN(result.price)) {
                    newPrices[result.symbol] = result.price;
                }
            });

            setPrices(newPrices);
            setCurrentPrice(newPrices[selectedSymbol]);

            const newPnlState: {[key: string]: { amount: number; percentage: number }} = {};
            positions.forEach(position => {
                const price = newPrices[position.symbol];
                if (price) {
                    newPnlState[position.timestamp] = calculatePnL(position, price);
                }
            });
            setPnlState(newPnlState);
            checkAndClosePositions();

        } catch (error) {
            console.error('Error updating prices and PnL:', error);
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

    const formatPrice = (price: number): string => {
        return price < 1 ? price.toFixed(8) : price.toFixed(2)
    }

    const handleClearAllPositions = () => {
        if (window.confirm('آیا مطمئن هستید که می‌خواهید همه معاملات را پاک کنید؟')) {
            setPositions([])
            localStorage.removeItem(POSITIONS_STORAGE_KEY)
        }
    }

    useEffect(() => {
        const savedClosedPositions = localStorage.getItem('closed_positions');
        if (savedClosedPositions) {
            try {
                const parsedPositions = JSON.parse(savedClosedPositions);
                const uniquePositions = Array.from(
                    new Map(parsedPositions.map((position: ClosedPosition) => [position.timestamp, position]))
                    .values()
                );
                uniquePositions.sort((a, b) => b.closeTime - a.closeTime);
                
                setClosedPositions(uniquePositions);
                localStorage.setItem('closed_positions', JSON.stringify(uniquePositions));
            } catch (error) {
                console.error('Error loading closed positions:', error);
            }
        }
    }, []);

    const calculatePricePercent = useCallback((targetPrice: number, entryPrice: number, type: 'LONG' | 'SHORT', leverage: number): number => {
        if (type === 'LONG') {
            return ((targetPrice - entryPrice) / entryPrice) * 100 * leverage;
        } else {
            return ((entryPrice - targetPrice) / entryPrice) * 100 * leverage;
        }
    }, []);

    const handleUpdateLimits = useCallback((position: Position, newTakeProfit: number | null, newStopLoss: number | null) => {
        setPositions(prevPositions => {
            const updatedPositions = prevPositions.map(p => {
                if (p.timestamp === position.timestamp) {
                    return {
                        ...p,
                        takeProfit: newTakeProfit ? {
                            price: newTakeProfit,
                            percent: calculatePricePercent(newTakeProfit, p.entryPrice, p.type, p.leverage)
                        } : null,
                        stopLoss: newStopLoss ? {
                            price: newStopLoss,
                            percent: calculatePricePercent(newStopLoss, p.entryPrice, p.type, p.leverage),
                            type: 'manual'
                        } : null
                    };
                }
                return p;
            });
            localStorage.setItem(POSITIONS_STORAGE_KEY, JSON.stringify(updatedPositions));
            return updatedPositions;
        });
    }, [calculatePricePercent]);

    const calculateEstimatedPnL = (position: Position, targetPrice: number) => {
        const priceDiff = position.type === 'LONG'
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
            <Layout className="min-h-screen">
                <Header className={style.header}>
                    <div className="flex items-center gap-4">
                    <Title level={3}>TradingAi</Title>
                        <Space>
                            <Button 
                                onClick={() => setIsHistoryModalVisible(true)}
                                type="primary"
                                ghost
                            >
                                تاریخچه معاملات
                            </Button>
                            <Link href="/education">
                                <Button type="primary" ghost icon={<BookOutlined />}>
                                    آموزش ترید
                                </Button>
                            </Link>
                        </Space>
                    </div>
                    <Space size="large">
                        <Select
                            value={selectedSymbol}
                            onChange={setSelectedSymbol}
                            className={style.OptionHolder}
                            showSearch
                            optionFilterProp="children"
                            filterOption={(input: string, option: any) =>
                                (option?.children?.toString().toLowerCase().indexOf(input.toLowerCase()) ?? -1) >= 0
                            }
                        >
                            {coins.map(({ symbol, name, image }) => (
                                <Option key={symbol} value={symbol.toUpperCase() + "USDT"}><div className={style.option}><h1>{symbol.toUpperCase() + "/USDT"}</h1><img className='w-6' src={image} /></div></Option>
                            ))}
                        </Select>
                    </Space>
                </Header>

                <Content className="p-6 bg-black">
                    <div>
                        <div className={style.contentTrade}>
                            <div className={style.contentTradingView}>
                                <TradingViewWidget
                                    symbol={selectedSymbol}
                                    onPriceChange={setCurrentPrice}
                                />
                            </div>

                            <div className={style.contentTradeForm}>
                                <TradeForm
                                    currentPrice={prices[selectedSymbol]}
                                    onOpenPosition={handleOpenPosition}
                                    symbol={selectedSymbol}
                                />

                            </div>
                        </div>
                    </div>
                    <div className={style.positionsHolder}>
                        {positions.length > 0 ? (
                            <Card
                                title={
                                    <div className="flex justify-between items-center">
                                        <span>معاملات فعال</span>
                                        <Tag className={style.OpenPositionTag}>{positions.length}</Tag>
                                    </div>
                                }
                                className={style.positions}
                            >
                                <Space direction="vertical" className={style.positionHolder}>
                                    <div className={style.positionHolderFlex}>
                                        {positions.map((position) => {
                                            const currentPrice = prices[position.symbol]

                                            const pnl = pnlState[position.timestamp] || { amount: 0, percentage: 0 }
                                            const isProfitable = pnl.amount >= 0


                                            return (
                                                <Card
                                                    key={position.timestamp}
                                                    size="small"
                                                    className={style.positionOpen}
                                                    style={{
                                                        borderColor: isProfitable ? '#b7eb8f' : '#ffccc7',
                                                        marginBottom: 16,
                                                        background: '#1f2937'
                                                    }}
                                                >
                                                    <div className="flex justify-between mb-4">
                                                        <Space>
                                                            <Text className={style.titlePositionCard} strong>{position.symbol}</Text>
                                                            <Tag color={position.mode === 'cross' ? 'blue' : 'purple'}>
                                                                {position.mode}
                                                            </Tag>
                                                            <Tag color={position.type === 'LONG' ? 'green' : 'red'}>
                                                                {position.type === 'LONG' ? 'لانگ' : 'شورت'}
                                                            </Tag>
                                                        </Space>
                                                        <Space>
                                                        <Statistic
                                                            value={pnl.percentage}
                                                            precision={2}
                                                                valueStyle={{ color: isProfitable ? '#3f8600' : '#cf1322', fontSize: '16px' }}
                                                            prefix={isProfitable ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                                                            suffix="%"
                                                        />
                                                        </Space>
                                                    </div>

                                                    <div className="grid grid-cols-2 gap-4 mb-4">
                                                        <Statistic title="مقدار" prefix="$" value={position.amount} />
                                                        <Statistic title="اهرم" value={position.leverage} suffix="x" />
                                                        <Statistic
                                                            title="قیمت ورود"
                                                            value={position.entryPrice}
                                                            prefix="$"
                                                        />
                                                        <Statistic
                                                            title="سود/ضرر"
                                                            prefix="$"
                                                            value={Math.abs(pnl.amount)}
                                                            precision={2}
                                                            valueStyle={{ color: isProfitable ? '#3f8600' : '#cf1322' }}
                                                        />
                                                    </div>

                                                    <Divider style={{ margin: '12px 0' }} />

                                                    <Button
                                                        block
                                                        type="primary"
                                                        icon={<MoreOutlined />}
                                                        onClick={() => {
                                                            setSelectedPosition(position);
                                                            setIsLimitModalVisible(true);
                                                        }}
                                                        className="mb-2"
                                                        style={{ backgroundColor: '#1890ff' }}
                                                    >
                                                        تنظیم حد سود و ضرر
                                                    </Button>

                                                    <Button
                                                        block
                                                        type="primary"
                                                        danger={!isProfitable}
                                                        onClick={() => closePosition(position.timestamp)}
                                                    >
                                                        بستن معامله
                                                    </Button>
                                                </Card>
                                            )

                                        })}
                                    </div>
                                </Space>
                            </Card>
                        ) : (
                            <div className={style.noPositions}>هیچ معامله‌ای باز نیست</div>
                        )}
                    </div>
                </Content>

                <Modal
                    title="تاریخچه معاملات"
                    open={isHistoryModalVisible}
                    onCancel={() => setIsHistoryModalVisible(false)}
                    footer={null}
                    width={800}
                    className="rtl"
                >
                    <div className="space-y-4">
                        {closedPositions.length > 0 ? (
                            closedPositions
                                .sort((a, b) => b.closeTime - a.closeTime)
                                .map((position) => (
                                    <Card
                                        key={position.timestamp}
                                        size="small"
                                        className={style.historyCard}
                                        style={{
                                            borderColor: position.pnl?.amount >= 0 ? '#b7eb8f' : '#ffccc7',
                                        }}
                                    >
                                        <div className="flex justify-between mb-4">
                                            <Space>
                                                <Text strong>{position.symbol}</Text>
                                                <Tag color={'gray'} className='text-black'>
                                                    {position.mode}
                                                </Tag>
                                                <Tag color={position.type === 'LONG' ? 'green' : 'red'}>
                                                    {position.type === 'LONG' ? 'لانگ' : 'شورت'}
                                                </Tag>
                                            </Space>
                                            <Text type={position.pnl?.amount >= 0 ? 'success' : 'danger'}>
                                                {position.pnl?.percentage.toFixed(2)}%
                                            </Text>
                                        </div>

                                        <div className="grid grid-cols-3 gap-4">
                                            <div>
                                                <Text type="secondary">قیمت ورود:</Text>
                                                <div>${position.entryPrice}</div>
                                            </div>
                                            <div>
                                                <Text type="secondary">قیمت خروج:</Text>
                                                <div>${position.closePrice}</div>
                                            </div>
                                            <div>
                                                <Text type="secondary">سود/ضرر:</Text>
                                                <div className={position.pnl?.amount >= 0 ? 'text-green-500' : 'text-red-500'}>
                                                    ${Math.abs(position.pnl?.amount || 0).toFixed(2)}
                                                </div>
                                            </div>
                                            <div>
                                                <Text type="secondary">مقدار:</Text>
                                                <div>${position.amount}</div>
                                            </div>
                                            <div>
                                                <Text type="secondary">اهرم:</Text>
                                                <div>{position.leverage}x</div>
                                            </div>
                                            <div>
                                                <Text type="secondary">تاریخ بسته شدن:</Text>
                                                <div>{new Date(position.closeTime).toLocaleString('fa-IR')}</div>
                                            </div>
                                        </div>
                                    </Card>
                                ))
                        ) : (
                            <div className="text-center text-gray-500 py-8">
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
                        >
                            انصراف
                        </Button>,
                        <Button
                            key="apply"
                            type="primary"
                            onClick={handleApplyLimits}
                            style={{ backgroundColor: '#1890ff' }}
                        >
                            اعمال تغییرات
                        </Button>
                    ]}
                    width={600}
                    className="rtl"
                >
                    {selectedPosition && (
                        <div className="space-y-6">
                            <div className="bg-gray-800 p-4 rounded-lg">
                                <div className="mb-4">
                                    <Text strong className="text-gray-300 mb-2 block">حد سود:</Text>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <Text className="text-gray-400 mb-1 block">قیمت (USDT)</Text>
                                            <Input
                                                value={tempLimits.takeProfit?.price || selectedPosition.takeProfit?.price || ''}
                                                onChange={(e) => {
                                                    const price = parseFloat(e.target.value);
                                                    if (!isNaN(price)) {
                                                        setTempLimits(prev => ({
                                                            ...prev,
                                                            takeProfit: {
                                                                price,
                                                                percent: calculatePricePercent(price, selectedPosition.entryPrice, selectedPosition.type, selectedPosition.leverage)
                                                            }
                                                        }));
                                                    }
                                                }}
                                                suffix="$"
                                            />
                                        </div>
                                        <div>
                                            <Text className="text-gray-400 mb-1 block">درصد</Text>
                                            <Input
                                                value={tempLimits.takeProfit?.percent?.toFixed(2) || selectedPosition.takeProfit?.percent?.toFixed(2) || ''}
                                                onChange={(e) => {
                                                    const percentWithLeverage = parseFloat(e.target.value);
                                                    if (!isNaN(percentWithLeverage)) {
                                                        const actualPercent = percentWithLeverage / selectedPosition.leverage;
                                                        const price = selectedPosition.type === 'LONG'
                                                            ? selectedPosition.entryPrice * (1 + actualPercent/100)
                                                            : selectedPosition.entryPrice * (1 - actualPercent/100);
                                                        setTempLimits(prev => ({
                                                            ...prev,
                                                            takeProfit: { 
                                                                price, 
                                                                percent: percentWithLeverage
                                                            }
                                                        }));
                                                    }
                                                }}
                                                suffix={`% (${selectedPosition.leverage}x)`}
                                            />
                                        </div>
                                    </div>
                                    {(tempLimits.takeProfit?.price || selectedPosition.takeProfit?.price) && (
                                        <div className="mt-2 text-green-500">
                                            سود تخمینی: ${calculateEstimatedPnL(selectedPosition, tempLimits.takeProfit?.price || selectedPosition.takeProfit?.price || 0).amount.toFixed(2)}
                                            ({calculateEstimatedPnL(selectedPosition, tempLimits.takeProfit?.price || selectedPosition.takeProfit?.price || 0).percentage.toFixed(2)}%)
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <Text strong className="text-gray-300 mb-2 block">حد ضرر:</Text>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <Text className="text-gray-400 mb-1 block">قیمت (USDT)</Text>
                                            <Input
                                                value={tempLimits.stopLoss?.price || selectedPosition.stopLoss?.price || ''}
                                                onChange={(e) => {
                                                    const price = parseFloat(e.target.value);
                                                    if (!isNaN(price)) {
                                                        setTempLimits(prev => ({
                                                            ...prev,
                                                            stopLoss: {
                                                                price,
                                                                percent: calculatePricePercent(price, selectedPosition.entryPrice, selectedPosition.type, selectedPosition.leverage)
                                                            }
                                                        }));
                                                    }
                                                }}
                                                suffix="$"
                                            />
                                        </div>
                                        <div>
                                            <Text className="text-gray-400 mb-1 block">درصد</Text>
                                            <Input
                                                value={tempLimits.stopLoss?.percent?.toFixed(2) || selectedPosition.stopLoss?.percent?.toFixed(2) || ''}
                                                onChange={(e) => {
                                                    const percentWithLeverage = parseFloat(e.target.value);
                                                    if (!isNaN(percentWithLeverage)) {
                                                        const actualPercent = percentWithLeverage / selectedPosition.leverage;
                                                        const price = selectedPosition.type === 'LONG'
                                                            ? selectedPosition.entryPrice * (1 - actualPercent/100)
                                                            : selectedPosition.entryPrice * (1 + actualPercent/100);
                                                        setTempLimits(prev => ({
                                                            ...prev,
                                                            stopLoss: { 
                                                                price, 
                                                                percent: percentWithLeverage
                                                            }
                                                        }));
                                                    }
                                                }}
                                                suffix={`% (${selectedPosition.leverage}x)`}
                                            />
                                        </div>
                                    </div>
                                    {(tempLimits.stopLoss?.price || selectedPosition.stopLoss?.price) && (
                                        <div className="mt-2 text-red-500">
                                            ضرر تخمینی: ${Math.abs(calculateEstimatedPnL(selectedPosition, tempLimits.stopLoss?.price || selectedPosition.stopLoss?.price || 0).amount).toFixed(2)}
                                            ({Math.abs(calculateEstimatedPnL(selectedPosition, tempLimits.stopLoss?.price || selectedPosition.stopLoss?.price || 0).percentage).toFixed(2)}%)
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </Modal>
            </Layout>
        </ConfigProvider>
    )
}