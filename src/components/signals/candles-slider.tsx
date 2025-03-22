// Icons
import { FaSlidersH } from "react-icons/fa";

export default function CandlesSlider({ candles, setCandles }) {
  return (
    <div className="flex items-center gap-4">
      <FaSlidersH className="text-secondary-light dark:text-secondary-dark" />
      <input
        type="range"
        min="100"
        max="500"
        value={candles}
        onChange={(e) => setCandles(Number(e.target.value))}
        className="w-full bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
      />
      <span className="text-gray-600 dark:text-gray-400">{candles}</span>
    </div>
  );
}
