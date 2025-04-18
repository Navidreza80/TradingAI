


export default function TotalProfit({ totalPnL }) {
  
  return (
    <div className="p-4 rounded-xl dark:bg-gray-800 bg-gray-100">
      <div className="text-sm dark:text-gray-400 text-gray-600">
        Total Profits
      </div>
      <div
        className={`text-xl font-bold ${
          totalPnL >= 0 ? "text-green-500" : "text-red-500"
        }`}
      >
        {totalPnL >= 0 ? "+" : ""}
        {Math.ceil(totalPnL)}%
      </div>
    </div>
  );
}
