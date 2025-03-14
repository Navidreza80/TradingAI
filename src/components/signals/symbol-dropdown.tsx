// Icons
import { FaBitcoin } from "react-icons/fa";

export default function SymbolDropDown({symbol, setSymbol}) {
  return (
    <div className="relative">
      <select
        className="w-full p-3 bg-gray-200 dark:bg-gray-700 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
        value={symbol}
        onChange={(e) => setSymbol(e.target.value)}
      >
        <option value="BTCUSDT">BTC/USDT</option>
        <option value="ETHUSDT">ETH/USDT</option>
        <option value="BNBUSDT">BNB/USDT</option>
      </select>
      <FaBitcoin className="absolute right-3 top-3 text-gray-400" />
    </div>
  );
}
