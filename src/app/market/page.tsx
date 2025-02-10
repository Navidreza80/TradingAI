"use client"
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { Header } from 'antd/es/layout/layout';

interface CryptoData {
  id: string;
  name: string;
  symbol: string;
  current_price: number;
  market_cap: number;
  total_volume: number;
  price_change_percentage_24h: number;
  image: string;
}

const Home = () => {
  const [cryptoData, setCryptoData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState('current_price'); // مرتب‌سازی بر اساس market cap به صورت پیش‌فرض

  const fetchCryptoData = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
        params: {
          vs_currency: 'usd',
          order: sortOption, // مرتب‌سازی بر اساس sortOption
          per_page: 1000,
          page: 1,
          sparkline: false,
        },
      });
      setCryptoData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCryptoData();
    const interval = setInterval(fetchCryptoData, 30000); // هر 30 ثانیه داده‌ها به‌روز شوند
    return () => clearInterval(interval);
  }, [sortOption]);

  const formatPrice = (price: number): string => {
    return price < 1 ? price.toFixed(8) : price.toFixed(2);
  };

  const filteredData = cryptoData.filter(crypto => {
    const matchesSearchTerm = crypto.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      crypto.symbol.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMinPrice = minPrice ? crypto.current_price >= parseFloat(minPrice) : true;
    const matchesMaxPrice = maxPrice ? crypto.current_price <= parseFloat(maxPrice) : true;
    return matchesSearchTerm && matchesMinPrice && matchesMaxPrice;
  });


  return (
    <main className="mt-12 bg-gradient-to-b dark:from-[#0a0a0a] dark:to-[#101010] from-white to-gray-50 p-8 min-h-screen p-10">
      {/* جستجو */}
      <div className='w-full flex justify-left'>
        <div className="relative shadow-sm rounded-xl shadow-gray-500 mb-4 ml-4 w-[400px]">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name or symbol..."
            className="w-full px-4 py-3 pl-12 rounded-xl
                dark:bg-white/5 bg-white
                dark:text-white text-gray-900
                dark:border-white/10 border-gray-200 border
                focus:outline-none focus:ring-2 focus:ring-[#1890ff]
                placeholder:dark:text-gray-500 placeholder:text-gray-400
                transition-all duration-200"/>
          <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 dark:text-gray-400 text-gray-500" />
        </div>
      </div>
      {/* نمایش جدول */}
      <table className="w-full table-auto bg-white shadow-md shadow-gray-500 rounded-lg overflow-hidden">
        <thead className=" dark:bg-gray-300 bg-gray-800 text-white">
          <tr>
            <th className="px-4 text-left dark:text-gray-900 text-white py-2 cursor-pointer" >Icon</th>
            <th className="px-4 text-left dark:text-gray-900 text-white py-2 cursor-pointer" >Name</th>
            <th className="px-4 text-left dark:text-gray-900 text-white py-2 cursor-pointer" >Price</th>
            <th className="px-4 text-left dark:text-gray-900 text-white py-2 cursor-pointer" >Market Cap</th>
            <th className="px-4 text-left dark:text-gray-900 text-white py-2 cursor-pointer" >24h Volume</th>
            <th className="px-4 text-left dark:text-gray-900 text-white py-2 cursor-pointer" >24h Change</th>
          </tr>
        </thead>
        <tbody className='dark:bg-[#030303] bg-white'>
          {filteredData.length === 0 ? (
            <tr >
              <td colSpan={5} className="text-center py-4 text-gray-600">No results found ☹️</td>
            </tr>
          ) : (
            filteredData.map(crypto => (
              <tr key={crypto.id} className="border-b dark:border-[#202020] border-gray-300 hover:dark:bg-[#4a4a4a] hover:bg-gray-50">
                <td className="px-4 dark:text-white text-gray-900 py-2"><img src={crypto.image} alt={crypto.name} className="w-6 h-6 inline-block" /></td>
                <td className="px-4 dark:text-white flex gap-4 text-gray-900 py-2">
                  {crypto.name}
                </td>
                <td className="px-4 dark:text-white text-gray-900 py-2">{formatPrice(crypto.current_price)}$</td>
                <td className="px-4 dark:text-white text-gray-900 py-2">{crypto.market_cap.toLocaleString()}$</td>
                <td className="px-4 dark:text-white text-gray-900 py-2">{crypto.total_volume.toLocaleString()}$</td>
                <td className="px-4 py-2" style={{ color: crypto.price_change_percentage_24h < 0 ? '#ff2b2b' : '#16ff1e' }}>
                  {crypto.price_change_percentage_24h.toFixed(2)}%
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </main>
  );
};

export default Home;
