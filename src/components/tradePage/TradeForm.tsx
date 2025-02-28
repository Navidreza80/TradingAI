'use client';

import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addPosition } from '../../redux/positionsSlice';
import type { FormData, Position } from '../../types/index';
import style from './style.module.css';
import { Statistic, Select } from 'antd';

const { Option } = Select;

// تعریف اینترفیس props فرم معامله
interface TradeFormProps {
  currentPrice?: number; // قیمت فعلی نماد
  onOpenPosition?: (position: any) => void; // تابعی برای باز کردن پوزیشن
  symbol?: string; // نماد معاملاتی
}

// کامپوننت اصلی فرم معامله
const TradeForm: React.FC<TradeFormProps> = ({ currentPrice, onOpenPosition, symbol }) => {
  const dispatch = useDispatch();

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
    <form onSubmit={handleSubmit} className={style.Form}>
      {/* بخش حالت معامله و اهرم*/}
      <div className={style.CrossOrIsolatedHolder}>
        <div className='w-[40%]'>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">حالت معامله:</label>
          <div className={style.CrossOrIsolated}>
            <select className="w-24 text-center text-[#394353] dark:text-[#c7cbd4] dark:bg-[#374151] px-1 rounded-xs bg-white">
              <option onClick={handleModeChange} value="cross">cross</option>
              <option onClick={handleModeChange} value="isolated">isolated</option>
            </select>
          </div>
        </div>
        <div className='w-[60%]'>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">اهرم: {leverage}x</label>
          <div className="flex items-center mt-2.5 gap-2">
            <span className="text-sm text-gray-500 dark:text-gray-400">1x</span>
            <input
              type="range"
              min="1"
              max="150"
              value={leverage}
              onChange={(e) => setLeverage(Number(e.target.value))}
              className="w-full h-2 bg-white rounded-lg appearance-none cursor-pointer dark:bg-gray-700 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-blue-500 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:transition-all [&::-webkit-slider-thumb]:hover:bg-blue-600"
            />
            <span className="text-sm text-gray-500 dark:text-gray-400">150x</span>
          </div>
        </div>
      </div>

      {/* نمایش قیمت فعلی */}
      <div className="bg-gray-400 dark:bg-gray-800 rounded-lg p-4">
        <div className="dark:text-white">
          <h1 className='text-[20px] mb-2 text-black font-bold dark:text-white'>قیمت فعلی</h1>
          <h1 className='text-[15px] text-[#202020] dark:text-gray-200'>{currentPrice || "از اتصال اینترنت و فیلترشکن مطمئن شوید"}</h1>
        </div>
      </div>

      {/* بخش نوع معامله */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">نوع معامله:</label>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => handleTypeChange('LONG')}
            className={`py-2 px-4 rounded-lg font-medium transition-all text-white ${formData.type === 'LONG' ? 'bg-[#448717] ' : 'bg-[#1fff70] '}`}
          >
            Long
          </button>
          <button
            type="button"
            onClick={() => handleTypeChange('SHORT')}
            className={`py-2 px-4 rounded-lg font-medium transition-all text-white ${formData.type === 'SHORT' ? 'bg-red-600 ' : 'bg-red-300  '}`}
          >
            Short
          </button>
        </div>
      </div>

      {/* بخش مقدار معامله */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">مقدار:</label>
        <input
          type="number"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          className="mt-1 px-1 block w-full rounded-lg text-[#707070] dark:text-white border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          required
          step="0.01"
          min={0}
          max={20000}
        />
      </div>

      {/* بخش قیمت حد سود و ضرر */}
      <div className={`${style.TargetHolderAndStopHolderHolder}`}>
        <div className='flex w-full gap-1 cursor-pointer'>
          <input
            type='checkbox'
            className='cursor-pointer bg-black'
            id='inputTPSL'
            onChange={(e) => setTPSL(e.target.checked)}
          />
          <label className='text-black dark:text-white cursor-pointer' htmlFor="inputTPSL">TP/SL</label>
        </div>
        {TPSL && (
          <div className={style.checkedTPSL}>
            <div className={style.TargetStopHolder}>
              <div className={style.TargetStopHolderInputTitle}>
                <input
                  type="text"
                  value={takeProfitPrice}
                  onChange={(e) => handlePriceChange(e.target.value, setTakeProfitPrice)}
                  placeholder="Take Profit"
                  className="mt-1 block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-green-500 focus:ring-green-500 dark:bg-gray-700 dark:text-white dark:focus:border-green-500 dark:focus:ring-green-500"
                />
              </div>
            </div>
            <div className={style.TargetStopHolder}>
              <div className={style.TargetStopHolderInputTitle}>
                <input
                  type="text"
                  value={stopLossPrice}
                  onChange={(e) => handlePriceChange(e.target.value, setStopLossPrice)}
                  placeholder="Stop Loss"
                  className="mt-1 block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-red-500 focus:ring-red-500 dark:bg-gray-700 dark:text-white dark:focus:border-red-500 dark:focus:ring-red-500"
                />
              </div>
            </div>
          </div>
        )}
        </div>


      {/* دکمه ارسال فرم */}
      <button
        type="submit"
        className={`w-full py-3 px-4 rounded-lg font-medium transition-all ${formData.type === 'LONG' ? style.ShortButton : style.LongButton
          }`}
      >
        {formData.type === 'LONG' ? 'باز کردن پوزیشن لانگ' : 'باز کردن پوزیشن شورت'}
      </button>
    </form>
  );
};

export default TradeForm;
