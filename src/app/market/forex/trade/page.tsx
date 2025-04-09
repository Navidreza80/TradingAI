"use client";
import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/UI/card';
import { Button } from '@/components/UI/Button';
import { Input } from '@/components/UI/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/UI/select';
import { TradingViewWidgetDark } from '@/components/TradingViewWidgetDark';

const currencyPairs = [
  { label: 'EUR/USD', value: 'EUR/USD', tradingViewSymbol: 'OANDA:EURUSD' },
  { label: 'GBP/USD', value: 'GBP/USD', tradingViewSymbol: 'OANDA:GBPUSD' },
  { label: 'USD/JPY', value: 'USD/JPY', tradingViewSymbol: 'OANDA:USDJPY' },
];

export default function ForexDemoTrade() {
  const [pair, setPair] = useState(currencyPairs[0]);
  const [price, setPrice] = useState(null);
  const [balance, setBalance] = useState(10000);
  const [position, setPosition] = useState(null);
  const [quantity, setQuantity] = useState(100);
  const [tp, setTp] = useState(null);
  const [sl, setSl] = useState(null);
  const [leverage, setLeverage] = useState(1);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetch(`https://api.twelvedata.com/time_series?symbol=${pair.value}&interval=1min&apikey=2494a7dfff4b4827bcdfb0e0c0a124b4`)
        .then(res => res.json())
        .then(data => {
          const latest = data?.values?.[0]?.close;
          if (latest) setPrice(parseFloat(latest));
        });
    }, 10000);
    return () => clearInterval(interval);
  }, [pair]);

  const handleTrade = (type) => {
    if (!price) return;
    const cost = (price * quantity) / leverage;
    if (type === 'buy') {
      if (balance >= cost) {
        setBalance(balance - cost);
        setPosition({ type: 'buy', quantity, entry: price, tp, sl, leverage });
      }
    } else if (type === 'sell' && position) {
      const pnl = (price - position.entry) * quantity * (position.type === 'buy' ? 1 : -1);
      setBalance(balance + cost + pnl);
      setHistory(prev => [...prev, { ...position, exit: price, pnl }]);
      setPosition(null);
    }
  };

  const closePosition = () => {
    if (!position || !price) return;
    const cost = (price * position.quantity) / position.leverage;
    const pnl = (price - position.entry) * position.quantity * (position.type === 'buy' ? 1 : -1);
    setBalance(balance + cost + pnl);
    setHistory(prev => [...prev, { ...position, exit: price, pnl }]);
    setPosition(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Forex Demo Trading</h1>

      <div className="max-w-xs mx-auto mb-6">
        <Select onValueChange={(val) => setPair(currencyPairs.find(p => p.value === val))} defaultValue={pair.value}>
          <SelectTrigger className="w-full">
            <SelectValue>{pair.label}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            {currencyPairs.map((p) => (
              <SelectItem key={p.value} value={p.value}>{p.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-white dark:bg-gray-800">
          <CardContent className="p-4 space-y-4">
            <h2 className="text-xl font-semibold mb-2">Trading Panel - {pair.label}</h2>
            <p>Current Price: <strong>{price ? `$${price.toFixed(4)}` : 'Loading...'}</strong></p>
            <p>Balance: <strong>${balance.toFixed(2)}</strong></p>

            <Input type="number" placeholder="Quantity" value={quantity} onChange={e => setQuantity(Number(e.target.value))} />
            <Input type="number" placeholder="Take Profit (TP)" value={tp || ''} onChange={e => setTp(Number(e.target.value))} />
            <Input type="number" placeholder="Stop Loss (SL)" value={sl || ''} onChange={e => setSl(Number(e.target.value))} />
            <Input type="number" placeholder="Leverage (e.g. 10)" value={leverage} onChange={e => setLeverage(Number(e.target.value))} />

            <div className="flex gap-4">
              <Button onClick={() => handleTrade('buy')} className="bg-green-600 hover:bg-green-700 text-white">Buy</Button>
              <Button onClick={() => handleTrade('sell')} className="bg-red-600 hover:bg-red-700 text-white">Sell</Button>
            </div>

            {position && (
              <div className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
                <p><strong>Open Position</strong>: {position.quantity} units @ ${position.entry.toFixed(4)} ({position.type})</p>
                <p>TP: {position.tp || 'N/A'}, SL: {position.sl || 'N/A'}, Leverage: {position.leverage}x</p>
                <Button onClick={closePosition} className="bg-yellow-600 hover:bg-yellow-700 text-white">Close Position</Button>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-800">
          <CardContent className="p-0 h-full w-full">
            <div className="w-full h-[500px]">
              <TradingViewWidgetDark symbol={pair.tradingViewSymbol} />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-white dark:bg-gray-800">
          <CardContent className="p-4">
            <h2 className="text-xl font-semibold mb-4">Open Position</h2>
            {position ? (
              <div className="text-sm text-gray-800 dark:text-gray-200">
                <p>{position.quantity} units of {pair.label}</p>
                <p>Entry: ${position.entry.toFixed(4)}</p>
                <p>TP: {tp || 'N/A'} | SL: {sl || 'N/A'} | Leverage: {leverage}x</p>
                <Button onClick={closePosition} className="mt-2 bg-yellow-600 hover:bg-yellow-700 text-white">Close Position</Button>
              </div>
            ) : <p className="text-sm text-gray-500">No open positions.</p>}
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-800">
          <CardContent className="p-4">
            <h2 className="text-xl font-semibold mb-4">Trade History</h2>
            {history.length ? (
              <ul className="space-y-2 text-sm">
                {history.map((h, i) => (
                  <li key={i} className="border-b border-gray-200 dark:border-gray-700 pb-2">
                    {h.type.toUpperCase()} {h.quantity} @ ${h.entry.toFixed(4)} → ${h.exit.toFixed(4)} | PnL: ${h.pnl.toFixed(2)}
                  </li>
                ))}
              </ul>
            ) : <p className="text-sm text-gray-500">No trade history yet.</p>}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
