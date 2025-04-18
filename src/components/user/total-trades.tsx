

export default function TotalTrades({ totalTrades }) {
  return (
    <div className="p-4 rounded-xl dark:bg-gray-800 bg-gray-100">
      <div className="text-sm dark:text-gray-400 text-gray-600">
      Total Trades
      </div>
      <div className="text-xl font-bold dark:text-white text-gray-900">
        {totalTrades}
      </div>
    </div>
  );
}
