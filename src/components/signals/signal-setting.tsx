// Icons
import { HiOutlineCog } from "react-icons/hi";
// Third party component
import SymbolDropDown from "./symbol-dropdown";
import TimeFrameDropDown from "./timeframe-dropdown";
import CandlesSlider from "./candles-slider";
// Framer motion for animation
import { motion } from "framer-motion"



export default function SignalSetting({ symbol, setSymbol, timeFrame, setTimeFrame, candles, setCandles, getSignal, loading }) {
    return (
        <div className="bg-white dark:bg-black/40 rounded-2xl shadow-xl p-6 backdrop-blur-lg backdrop-filter">
            <div className="flex items-center gap-3 mb-6">
                <HiOutlineCog className="w-6 h-6 text-secondary-light dark:text-secondary-dark" />
                <h2 className="text-xl font-semibold text-primary-light dark:text-primary-dark">Signal Settings</h2>
            </div>

            <div className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-primary-light dark:text-primary-dark mb-2">
                    Symbol:
                    </label>
                    <SymbolDropDown symbol={symbol} setSymbol={setSymbol} />
                </div>

                <div>
                    <label className="block text-sm font-medium text-primary-light dark:text-primary-dark mb-2">
                    Time Frame:
                    </label>
                    <TimeFrameDropDown timeFrame={timeFrame} setTimeFrame={setTimeFrame} />
                </div>

                <div>
                    <label className="block text-sm font-medium text-primary-light dark:text-primary-dark mb-2">
                    Number of Candles
                    </label>
                    <CandlesSlider candles={candles} setCandles={setCandles} />
                </div>

                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={getSignal}
                    disabled={loading}
                    className={`w-full py-3 px-4 rounded-xl font-semibold text-white transition-all duration-300 ${loading
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:shadow-lg hover:shadow-blue-500/25'
                        }`}
                >
                    {loading ? 'Loading' : 'Get Signal'}
                </motion.button>
            </div>
        </div>
    )
}