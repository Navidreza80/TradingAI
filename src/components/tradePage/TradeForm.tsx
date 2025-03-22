'use client';

import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addPosition } from '../../hooks/redux/positionsSlice';
import type { FormData, Position } from '../../types/index';
import style from './style.module.css';
import { Statistic, Select } from 'antd';
import { useTranslation } from 'react-i18next';

const { Option } = Select;

// تعریف اینترفیس props فرم معامله
interface TradeFormProps {
  currentPrice?: number; // قیمت فعلی نماد
  onOpenPosition?: (position: any) => void; // تابعی برای باز کردن پوزیشن
  symbol?: string; // نماد معاملاتی
  isDarkMode?: boolean;
}

// کامپوننت اصلی فرم معامله
const TradeForm: React.FC<TradeFormProps> = ({ currentPrice, onOpenPosition, symbol, isDarkMode = true }) => {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();

  // وضعیت‌های مختلف فرم
  const [formData, setFormData] = useState<FormData>({
    symbol: '', // نماد
    type: 'LONG', // نوع معامله (LONG یا SHORT)
    amount: '', // مقدار
  });
  const [leverage, setLeverage] = useState(1); // اهرم
  const [TPSL, setTPSL] = useState<boolean>(false); // قیمت حد ضرر
  const [mode, setMode] = useState<'cross' | 'isolated'>('cross'); // حالت معامله (کراس یا ایزوله)
  const [takeProfitPrice, setTakeProfitPrice] = useState<string>(''); // قیمت حد سود
  const [stopLossPrice, setStopLossPrice] = useState<string>(''); // قیمت حد ضرر

  // محاسبه قیمت حد سود
  const calculateTakeProfit = (price: number, type: 'LONG' | 'SHORT', percent: number): number => {
    return type === 'LONG' ? price * (1 + (percent / 100)) : price * (1 - (percent / 100));
  };

  // محاسبه قیمت حد ضرر
  const calculateStopLoss = (price: number, type: 'LONG' | 'SHORT', percent: number): number => {
    return type === 'LONG' ? price * (1 - (percent / 100)) : price * (1 + (percent / 100));
  };

  // محاسبه درصد تغییر قیمت نسبت به قیمت اولیه
  const calculatePricePercent = (targetPrice: number, entryPrice: number, type: 'LONG' | 'SHORT'): number => {
    if (type === 'LONG') {
      return ((targetPrice - entryPrice) / entryPrice) * 100 * leverage;
    } else {
      return ((entryPrice - targetPrice) / entryPrice) * 100 * leverage;
    }
  };

  // تغییر مقدار ورودی‌های فرم
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // تغییر قیمت‌ها به طور خاص
  const handlePriceChange = (value: string, setter: (value: string) => void) => {
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setter(value);
    }
  };

  // ارسال اطلاعات فرم و باز کردن پوزیشن
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPrice) return; // اگر قیمت فعلی موجود نباشد، پوزیشن باز نمی‌شود
    try {
      // ایجاد یک شی جدید برای پوزیشن
      const newPosition: Position = {
        ...formData,
        amount: parseFloat(formData.amount),
        leverage: leverage,
        mode: mode,
        type: formData.type,
        entryPrice: currentPrice,
        takeProfit: takeProfitPrice ? { price: parseFloat(takeProfitPrice), percent: calculatePricePercent(parseFloat(takeProfitPrice), currentPrice, formData.type) } : null,
        stopLoss: mode === 'isolated' || stopLossPrice ? { price: mode === 'isolated' ? calculateStopLoss(currentPrice, formData.type, 100 / leverage) : parseFloat(stopLossPrice), percent: mode === 'isolated' ? 100 / leverage : calculatePricePercent(parseFloat(stopLossPrice), currentPrice, formData.type), type: mode === 'isolated' ? 'auto' : 'manual' } : null,
      };

      console.log('Submitting position:', newPosition);

      // در صورتی که تابع باز کردن پوزیشن وجود داشته باشد، آن را فراخوانی می‌کنیم
      if (onOpenPosition) {
        onOpenPosition(newPosition);
      }

      // ارسال داده‌های پوزیشن به سرور
      const response = await fetch('/api/positions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPosition),
      });

      if (!response.ok) {
        throw new Error('Failed to create position');
      }

      const data = await response.json();

      // اضافه کردن پوزیشن جدید به وضعیت ری‌داکس
      dispatch(addPosition(data));

      // پاک کردن مقادیر فرم بعد از ارسال
      setFormData({ symbol: '', type: 'LONG', amount: '', });
      setLeverage(1);
      setMode('cross');
      setTakeProfitPrice('');
      setStopLossPrice('');
    } catch (error) {
      console.error('Error creating position:', error);
    }
  };

  // تغییر نوع معامله (LONG یا SHORT)
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
    <form onSubmit={handleSubmit} className={`${style.Form} text-${i18n.language === 'fa' || i18n.language === 'ar' ? 'right' : 'left'}`} dir={i18n.dir()}>
      {/* نمایش قیمت فعلی */}
      <div className="bg-gray-200 dark:bg-[#1a1a1a] rounded-lg p-4 mb-4 transition-colors duration-300">
        <div className="flex justify-between items-center">
          <h1 className='text-[16px] font-semibold text-black dark:text-white transition-colors duration-300'>{t("currentPrice")}</h1>
          <h1 className='text-[20px] font-bold text-black dark:text-white transition-colors duration-300'>
            ${currentPrice || "—"}
          </h1>
        </div>
      </div>

      {/* بخش نوع معامله */}
      <div className="mb-4">
        <label className="block text-[14px] text-gray-600 dark:text-[#8c8c8c] mb-2 transition-colors duration-300">{t("tradeType")}:</label>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => handleTypeChange('LONG')}
            className={`py-2 px-4 rounded-lg font-medium transition-all ${
              formData.type === 'LONG' 
                ? 'bg-[#00c087] text-white' 
                : 'bg-white dark:bg-[#1a1a1a] text-[#00c087] border border-[#00c087] transition-colors duration-300'
            }`}
          >
            {t("long")}
          </button>
          <button
            type="button"
            onClick={() => handleTypeChange('SHORT')}
            className={`py-2 px-4 rounded-lg font-medium transition-all ${
              formData.type === 'SHORT' 
                ? 'bg-[#ff4343] text-white' 
                : 'bg-white dark:bg-[#1a1a1a] text-[#ff4343] border border-[#ff4343] transition-colors duration-300'
            }`}
          >
            {t("short")}
          </button>
        </div>
      </div>

      {/* بخش حالت معامله و اهرم*/}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-[14px] text-gray-600 dark:text-[#8c8c8c] mb-2 transition-colors duration-300">{t("tradeMode")}:</label>
          <select 
            className="w-full bg-white dark:bg-[#1a1a1a] text-black dark:text-white border border-gray-300 dark:border-[#2a2a2a] rounded-lg p-2 transition-colors duration-300" 
            name="mode" 
            onChange={handleModeChange}
          >
            <option value="cross">cross</option>
            <option value="isolated">isolated</option>
          </select>
        </div>
        <div>
          <label className="block text-[14px] text-gray-600 dark:text-[#8c8c8c] mb-2 transition-colors duration-300">{t("leverage")}: {leverage}x</label>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600 dark:text-[#8c8c8c] transition-colors duration-300">1x</span>
            <input
              type="range"
              min="1"
              max="150"
              value={leverage}
              onChange={(e) => setLeverage(Number(e.target.value))}
              className="w-full h-2 bg-gray-300 dark:bg-[#2a2a2a] rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-blue-600 dark:[&::-webkit-slider-thumb]:bg-[#00a0ff] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer transition-colors duration-300"
            />
            <span className="text-sm text-gray-600 dark:text-[#8c8c8c] transition-colors duration-300">150x</span>
          </div>
        </div>
      </div>

      {/* بخش مقدار معامله */}
      <div className="mb-4">
        <label className="block text-[14px] text-gray-600 dark:text-[#8c8c8c] mb-2 transition-colors duration-300">{t("amount")}:</label>
        <input
          type="number"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          className="w-full bg-white dark:bg-[#1a1a1a] text-black dark:text-white border border-gray-300 dark:border-[#2a2a2a] rounded-lg p-2 transition-colors duration-300"
          required
          step="0.01"
          min={0}
          max={20000}
        />
      </div>

      {/* بخش قیمت حد سود و ضرر */}
      <div className="mb-4">
        <div className='flex items-center gap-2 mb-2 cursor-pointer'>
          <input
            type='checkbox'
            className='cursor-pointer'
            id='inputTPSL'
            onChange={(e) => setTPSL(e.target.checked)}
          />
          <label className='text-[14px] text-gray-600 dark:text-[#8c8c8c] cursor-pointer transition-colors duration-300' htmlFor="inputTPSL">{t("TP_SL")}</label>
        </div>
        {TPSL && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <input
                type="text"
                value={takeProfitPrice}
                onChange={(e) => handlePriceChange(e.target.value, setTakeProfitPrice)}
                placeholder={t("takeProfit")}
                className="w-full bg-white dark:bg-[#1a1a1a] text-black dark:text-white border border-gray-300 dark:border-[#2a2a2a] rounded-lg p-2 focus:border-[#00c087] transition-colors duration-300"
              />
            </div>
            <div>
              <input
                type="text"
                value={stopLossPrice}
                onChange={(e) => handlePriceChange(e.target.value, setStopLossPrice)}
                placeholder={t("stopLoss")}
                className="w-full bg-white dark:bg-[#1a1a1a] text-black dark:text-white border border-gray-300 dark:border-[#2a2a2a] rounded-lg p-2 focus:border-[#ff4343] transition-colors duration-300"
              />
            </div>
          </div>
        )}
      </div>

      {/* دکمه ارسال فرم */}
      <button
        type="submit"
        className={`w-full py-3 px-4 rounded-lg font-medium transition-all ${
          formData.type === 'LONG' 
            ? 'bg-[#00c087] text-white hover:bg-[#00a876]' 
            : 'bg-[#ff4343] text-white hover:bg-[#e53935]'
        }`}
      >
        {t("openPosition")}
      </button>
    </form>
  );
};

export default TradeForm;
