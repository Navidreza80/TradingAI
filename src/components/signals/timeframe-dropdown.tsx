// Icons
import { FaClock } from "react-icons/fa";

export default function TimeFrameDropDown({ timeFrame, setTimeFrame }) {
  return (
    <div className="relative">
      <select
        className="w-full p-3 bg-gray-200 dark:bg-gray-700 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
        value={timeFrame}
        onChange={(e) => setTimeFrame(e.target.value)}
      >
        <option value="1m">1 Minute</option>
        <option value="5m">5 Minutes</option>
        <option value="15m">15 Minutes</option>
        <option value="1h">1 Hour</option>
        <option value="4h">4 Hours</option>
      </select>
      <FaClock className="absolute right-3 top-3 text-gray-400" />
    </div>
  );
}
