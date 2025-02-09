'use client';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addPosition } from '../../redux/positionsSlice';
import type { FormData, Position } from '../../types';
import style from './style.module.css';
import { Statistic } from 'antd';

interface TradeFormProps {
  currentPrice?: number; // قیمت فعلی
  onOpenPosition?: (position: any) => void; // تابع برای باز کردن موقعیت جدید
  symbol?: string; // نماد مورد معامله
}

const TradeForm: React.FC<TradeFormProps> = ({ currentPrice, onOpenPosition, symbol }) => {
  const dispatch = useDispatch();

  // وضعیت‌های محلی برای ذخیره داده‌های فرم
  const [formData, setFormData] = useState<FormData>({ symbol: '', type: 'LONG', amount: '' });
  const [leverage, setLeverage] = useState(1); // اهرم
  const [mode, setMode] = useState<'cross' | 'isolated'>('cross'); // حالت معامله (کراس یا ایزوله)
  const [takeProfitPrice, setTakeProfitPrice] = useState<string>(''); // قیمت حد سود
  const [stopLossPrice, setStopLossPrice] = useState<string>(''); // قیمت حد ضرر

  // محاسبه قیمت حد سود با توجه به درصد
  const calculateTakeProfit = (price: number, type: 'LONG' | 'SHORT', percent: number): number => {
    return type === 'LONG' ? price * (1 + (percent / 100)) : price * (1 - (percent / 100));
  };

  // محاسبه قیمت حد ضرر با توجه به درصد
  const calculateStopLoss = (price: number, type: 'LONG' | 'SHORT', percent: number): number => {
    return type === 'LONG' ? price * (1 - (percent / 100)) : price * (1 + (percent / 100));
  };

  // محاسبه درصد سود یا ضرر بر اساس قیمت هدف و قیمت ورود
  const calculatePricePercent = (targetPrice: number, entryPrice: number, type: 'LONG' | 'SHORT'): number => {
    if (type === 'LONG') {
      return ((targetPrice - entryPrice) / entryPrice) * 100 * leverage;
    } else {
      return ((entryPrice - targetPrice) / entryPrice) * 100 * leverage;
    }
  };

  // تغییرات ورودی‌ها و به روز رسانی فرم
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // محدود کردن ورودی قیمت‌ها به عدد معتبر
  const handlePriceChange = (value: string, setter: (value: string) => void) => {
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setter(value);
    }
  };

  // ارسال فرم و ایجاد پوزیشن جدید
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPrice) return;

    try {
      const newPosition: Position = {
        ...formData,
        amount: parseFloat(formData.amount),
        leverage: leverage,
        mode: mode,
        type: formData.type,
        entryPrice: currentPrice,
        takeProfit: takeProfitPrice ? {
          price: parseFloat(takeProfitPrice),
          percent: calculatePricePercent(parseFloat(takeProfitPrice), currentPrice, formData.type)
        } : null,
        stopLoss: mode === 'isolated' || stopLossPrice ? {
          price: mode === 'isolated' ? calculateStopLoss(currentPrice, formData.type, 100 / leverage) : parseFloat(stopLossPrice),
          percent: mode === 'isolated' ? 100 / leverage : calculatePricePercent(parseFloat(stopLossPrice), currentPrice, formData.type),
          type: mode === 'isolated' ? 'auto' : 'manual'
        } : null,
      };

      console.log('Submitting position:', newPosition);

      if (onOpenPosition) {
        onOpenPosition(newPosition); // باز کردن پوزیشن جدید
      }

      const response = await fetch('/api/positions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPosition),
      });

      if (!response.ok) {
        throw new Error('Failed to create position');
      }

      const data = await response.json();
      dispatch(addPosition(data)); // اضافه کردن پوزیشن جدید به استیت ریداکس

      // ریست کردن فرم
      setFormData({ symbol: '', type: 'LONG', amount: '' });
      setLeverage(1);
      setMode('cross');
      setTakeProfitPrice('');
      setStopLossPrice('');
    } catch (error) {
      console.error('Error creating position:', error);
    }
  };

  // تغییر نوع معامله (لانگ یا شورت)
  const handleTypeChange = (type: 'LONG' | 'SHORT') => {
    setFormData(prev => ({ ...prev, type }));
    console.log('Type changed to:', type);
  };

  // تغییر حالت معامله (کراس یا ایزوله)
  const handleModeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMode(e.target.value as 'cross' | 'isolated');
    console.log('Mode changed to:', e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className={style.Form}>
      {/* فرم نماد معاملاتی */}
      <div className={style.symbolForm}>
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200">نماد:</label>
        <input
          type="text"
          name="symbol"
          value={symbol || formData.symbol}
          onChange={handleChange}
          className="block rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          required
          disabled={!!symbol}
        />
      </div>

      {/* نمایش قیمت فعلی */}
      <div className="mb-8 bg-gray-800 rounded-lg p-6">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-gray-300 text-lg">قیمت فعلی</h1>
        </div>
        <Statistic
          value={currentPrice || "از اتصال اینترنت و فیلترشکن مطمئن شوید"}
          valueStyle={{ fontSize: '20px', fontWeight: 'bold', textAlign: "right", color: "white" }}
        />
      </div>

      {/* انتخاب نوع معامله */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">نوع معامله:</label>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => handleTypeChange('LONG')}
            className={`py-2 px-4 rounded-lg font-medium transition-all ${formData.type === 'LONG' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200'}`}
          >
            لانگ
          </button>
          <button
            type="button"
            onClick={() => handleTypeChange('SHORT')}
            className={`py-2 px-4 rounded-lg font-medium transition-all ${formData.type === 'SHORT' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200'}`}
          >
            شورت
          </button>
        </div>
      </div>

      {/* انتخاب حالت معامله (کراس یا ایزوله) */}
      <div className={style.CrossOrIsolatedHolder}>
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">حالت معامله:</label>
        <div className={style.CrossOrIsolated}>
          <label className="inline-flex items-center">
            <input
              type="radio"
              value="cross"
              checked={mode === 'cross'}
              onChange={handleModeChange}
              className="form-radio text-blue-600"
            />
            <span className="ml-2 text-gray-700 dark:text-gray-200">کراس</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              value="isolated"
              checked={mode === 'isolated'}
              onChange={handleModeChange}
              className="form-radio text-blue-600"
            />
            <span className="ml-2 text-gray-700 dark:text-gray-200">ایزوله</span>
          </label>
        </div>
        {mode === 'isolated' && (
          <p className="mt-1 text-xs text-yellow-600 dark:text-yellow-500">
            در حالت ایزوله، معامله در صورت رسیدن به 100% ضرر به صورت خودکار بسته خواهد شد.
          </p>
        )}
      </div>

      {/* وارد کردن مقدار */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">مقدار:</label>
        <input
          type="number"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          className="mt-1 px-1 block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          required
          step="1"
          min={0}
          max={10000}
        />
      </div>

      {/* وارد کردن اهرم */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
          اهرم: {leverage}x
        </label>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500 dark:text-gray-400">1x</span>
          <input
            type="range"
            min="1"
            max="150"
            value={leverage}
            onChange={(e) => setLeverage(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
          />
          <span className="text-sm text-gray-500 dark:text-gray-400">150x</span>
        </div>
      </div>

      {/* قیمت حد سود و ضرر */}
      <div className={style.TargetHolderAndStopHolderHolder}>
        <div className={style.TargetStopHolder}>
          <div className={style.TargetStopHolderInputTitle}>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
              قیمت حد سود:
            </label>
            <input
              type="text"
              value={takeProfitPrice}
              onChange={(e) => handlePriceChange(e.target.value, setTakeProfitPrice)}
              placeholder="USDT"
              className="mt-1 block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-green-500 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
          {currentPrice && takeProfitPrice && !isNaN(parseFloat(takeProfitPrice)) && (
            <div className="mt-1 text-sm text-green-600">
              درصد سود با لوریج: {calculatePricePercent(parseFloat(takeProfitPrice), currentPrice, formData.type).toFixed(2)}%
            </div>
          )}
        </div>

        <div className={style.TargetStopHolder}>
          <div className={style.TargetStopHolderInputTitle}>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
              قیمت حد ضرر:
            </label>
            <input
              type="text"
              value={stopLossPrice}
              onChange={(e) => handlePriceChange(e.target.value, setStopLossPrice)}
              placeholder="USDT"
              className="mt-1 block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-red-500 focus:ring-red-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
          {currentPrice && stopLossPrice && !isNaN(parseFloat(stopLossPrice)) && (
            <div className="mt-1 text-sm text-red-600">
              درصد ضرر با لوریج: {calculatePricePercent(parseFloat(stopLossPrice), currentPrice, formData.type).toFixed(2)}%
            </div>
          )}
        </div>
      </div>

      {/* دکمه ارسال فرم */}
      <button
        type="submit"
        className={`w-full py-3 px-4 rounded-lg font-medium transition-all ${
          formData.type === 'LONG' ? style.ShortButton : style.LongButton
        }`}
      >
        {formData.type === 'LONG' ? 'باز کردن پوزیشن لانگ' : 'باز کردن پوزیشن شورت'}
      </button>
    </form>
  );
};

export default TradeForm;
