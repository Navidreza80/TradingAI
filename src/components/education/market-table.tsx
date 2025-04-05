// antd components
import { Typography } from "antd";

// antd typography
const { Title } = Typography;

export default function MarketTable() {
  const tableHeaderItems = [
    { title: "Market" },
    { title: "Beginner Friendly" },
    { title: "Capital Required" },
    { title: "Volatility" },
    { title: "Trading Hours" },
  ];

  const tableItems = [
    {
      market: "Stocks",
      beginner: "High",
      capital: "Medium",
      volatility: "Medium",
      hours: "Market Hours",
    },
    {
      market: "Forex",
      beginner: "Medium",
      capital: "Low",
      volatility: "Medium-High",
      hours: "24/7",
    },
    {
      market: "Cryptocurrency",
      beginner: "Medium",
      capital: "Low",
      volatility: "Very High",
      hours: "24/7",
    },
    {
      market: "Commodities",
      beginner: "Low",
      capital: "Medium-High",
      volatility: "Medium",
      hours: "Varies",
    },
    {
      market: "Derivatives",
      beginner: "Low",
      capital: "Medium-High",
      volatility: "High",
      hours: "Varies",
    },
  ];
  return (
    <div className="max-w-6xl mx-auto mb-16 bg-white/5 dark:bg-black/20 p-8 rounded-2xl">
      <Title level={2} className="dark:text-white text-center mb-8">
        Comparing Markets for Beginners
      </Title>
      <div className="overflow-x-auto">
        <table className="w-full dark:text-gray-300">
          <thead>
            <tr className="border-b dark:border-gray-700">
              {tableHeaderItems.map((item, index) => {
                return (
                  <th key={index} className="py-3 px-4 text-left">
                    {item.title}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {tableItems.map((item, index) => {
              return (
                <tr key={index} className="border-b dark:border-gray-800">
                  <td className="py-3 px-4 font-medium">{item.market}</td>
                  <td className="py-3 px-4">{item.beginner}</td>
                  <td className="py-3 px-4">{item.capital}</td>
                  <td className="py-3 px-4">{item.volatility}</td>
                  <td className="py-3 px-4">{item.hours}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
