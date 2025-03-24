"use client";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import style from "./style.module.css";

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
  const [cryptoData, setCryptoData] = useState<CryptoData[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState<
    "price" | "marketCap" | "volume" | "change"
  >("marketCap");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const { t, i18n } = useTranslation();

  const fetchCryptoData = async () => {
    setLoading(true); // شروع بارگذاری داده‌ها
    try {
      const response = await axios.get(
        "https://api.coingecko.com/api/v3/coins/markets",
        {
          params: {
            vs_currency: "usd",
            order: sortOption,
            per_page: 1000,
            page: 1,
            sparkline: false,
          },
        }
      );
      setCryptoData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false); // پایان بارگذاری داده‌ها
    }
  };

  useEffect(() => {
    fetchCryptoData();
    const interval = setInterval(fetchCryptoData, 30000); // هر 30 ثانیه به‌روز شود

    return () => clearInterval(interval); // پاک کردن interval هنگام unmount
  }, [sortOption]);

  const filteredData = cryptoData.filter((crypto) => {
    const matchesSearchTerm =
      crypto.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      crypto.symbol.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMinPrice = minPrice
      ? crypto.current_price >= parseFloat(minPrice)
      : true;
    const matchesMaxPrice = maxPrice
      ? crypto.current_price <= parseFloat(maxPrice)
      : true;

    return matchesSearchTerm && matchesMinPrice && matchesMaxPrice;
  });

  const sortedData = [...filteredData].sort((a, b) => {
    let comparison = 0;
    switch (sortOption) {
      case "price":
        comparison = a.current_price - b.current_price;
        break;
      case "marketCap":
        comparison = a.market_cap - b.market_cap;
        break;
      case "volume":
        comparison = a.total_volume - b.total_volume;
        break;
      case "change":
        comparison =
          a.price_change_percentage_24h - b.price_change_percentage_24h;
        break;
      default:
        return 0;
    }
    return sortOrder === "desc" ? comparison : -comparison;
  });

  return (
    <main
      className={`mt-12 bg-gradient-to-b dark:from-[#0a0a0a] dark:to-[#101010] from-white to-gray-50 p-8 min-h-screen p-10 ${
        style.main
      } ${
        i18n.language === "fa" || i18n.language === "ar"
          ? "text-right"
          : "text-left"
      }`}
    >
      {/* جستجو */}
      <div className="mb-4">
        <div
          className={`w-[500px] flex rounded-xl flex-col flex-wrap border border-black dark:border-[#606060] p-[15px] justify-left  bg-[#f0f0f0] dark:bg-[#0f0f0f] ${style.filter}`}
        >
          <div className="relative mx-auto shadow-sm rounded-xl shadow-gray-500 mb-4 w-full md:w-[400px] dark:bg-[#030303] bg-white">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={t("searchPlaceholder")}
              className="w-full px-4 py-3 pl-12 rounded-xl
                dark:bg-white/5 bg-white
                dark:text-white text-gray-900
                dark:border-white/10 border-gray-200 border
                focus:outline-none focus:ring-2 focus:ring-[#1890ff]
                placeholder:dark:text-gray-500 placeholder:text-gray-400
                transition-all duration-200"
            />
            <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 dark:text-gray-400 text-gray-500" />
          </div>
          {/* انتخاب گزینه سورت */}
          <div className="mx-auto w-[400px] justify-between flex md:flex-row">
            <select
              value={sortOption}
              onChange={(e) =>
                setSortOption(
                  e.target.value as "marketCap" | "price" | "volume" | "change"
                )
              }
              className="p-2 border bg-white text-black dark:bg-[#202020] dark:border-[#252525] dark:text-white cursor-pointer rounded mr-2 mb-2 md:mb-0"
            >
              <option className="cursor-pointer" value="volume">
                {t("sortByVolume")}
              </option>
              <option className="cursor-pointer" value="price">
                {t("sortByPrice")}
              </option>
              <option className="cursor-pointer" value="marketCap">
                {t("sortByMarketCap")}
              </option>
              <option className="cursor-pointer" value="change">
                {t("sortByChange")}
              </option>
            </select>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as "desc" | "asc")}
              className="p-2 border bg-white text-black dark:border-[#303030] dark:bg-[#202020] dark:text-white cursor-pointer rounded"
            >
              <option className="cursor-pointer" value="desc">
                {t("descending")}
              </option>
              <option className="cursor-pointer" value="asc">
                {t("ascending")}
              </option>
            </select>
          </div>
        </div>
      </div>
      {/* نمایش جدول */}
      <div className={style.tableHolder}>
        <table
          className={`w-full table-auto shadow-md shadow-gray-500 dark:shadow-xs dark:shadow-[#383838] rounded-lg overflow-hidden ${style.table}`}
        >
          <thead className="dark:bg-[#383838] bg-gray-800 text-white">
            <tr>
              <th
                className={`px-4 text-white py-2 cursor-pointer text-[18px] ${
                  i18n.language === "fa" || i18n.language === "ar"
                    ? "text-right"
                    : "text-left"
                }`}
              >
                {t("icon")}
              </th>
              <th
                className={`px-4 text-white py-2 cursor-pointer text-[18px] ${
                  i18n.language === "fa" || i18n.language === "ar"
                    ? "text-right"
                    : "text-left"
                }`}
              >
                {t("name")}
              </th>
              <th
                className={`px-4 text-white py-2 cursor-pointer text-[18px] ${
                  i18n.language === "fa" || i18n.language === "ar"
                    ? "text-right"
                    : "text-left"
                }`}
              >
                {t("price")}
              </th>
              <th
                className={`px-4 text-white py-2 cursor-pointer text-[18px] ${
                  i18n.language === "fa" || i18n.language === "ar"
                    ? "text-right"
                    : "text-left"
                }`}
              >
                {t("marketCap")}
              </th>
              <th
                className={`px-4 text-white py-2 cursor-pointer text-[18px] ${
                  i18n.language === "fa" || i18n.language === "ar"
                    ? "text-right"
                    : "text-left"
                }`}
              >
                {t("volume")}
              </th>
              <th
                className={`px-4 text-white py-2 cursor-pointer text-[18px] ${
                  i18n.language === "fa" || i18n.language === "ar"
                    ? "text-right"
                    : "text-left"
                }`}
              >
                {t("change")}
              </th>
            </tr>
          </thead>
          {loading ? (
            <tbody className="dark:bg-[#030303] bg-white">
              <tr className="w-full py-4 dark:text-white text-gray-900">
                <td
                  colSpan={6}
                  className="w-full py-4 dark:text-white text-gray-900"
                >
                  <div className="flex justify-center gap-4 m-auto">
                    <div
                      className={`border-black dark:border-white] ${style.loader}`}
                    ></div>
                    <h1 className="text-xl text-left text-black dark:text-white cursor-pointer">
                      {t("loading")}
                    </h1>
                  </div>
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody className={`dark:bg-[#030303] bg-white ${style.tbody}`}>
              {sortedData.length === 0 ? (
                <tr className="w-full">
                  <td
                    colSpan={6}
                    className="text-center w-full py-4 dark:text-white text-gray-900"
                  >
                    {t("noResults")}
                  </td>
                </tr>
              ) : (
                sortedData.map((crypto) => (
                  <tr
                    key={crypto.id}
                    className="border-b h-16 dark:border-[#202020] border-gray-300 hover:dark:bg-[#4a4a4a] hover:bg-gray-50"
                  >
                    <td className="px-4 text-lg dark:text-[#a3a3a3] text-gray-900 py-2">
                      <img
                        src={crypto.image}
                        alt={crypto.name}
                        className="w-10 h-10 inline-block"
                      />
                    </td>
                    <td className="px-4 text-lg dark:text-[#a3a3a3] font-bold text-gray-900 py-2">
                      {" "}
                      {crypto.symbol.toUpperCase() + "/USDT"}{" "}
                    </td>
                    <td className="px-4 text-lg dark:text-[#a3a3a3] text-gray-900 py-2">
                      ${crypto.current_price}
                    </td>
                    <td className="px-4 text-lg dark:text-[#a3a3a3] text-gray-900 py-2">
                      ${crypto.market_cap.toLocaleString()}
                    </td>
                    <td className="px-4 text-lg dark:text-[#a3a3a3] text-gray-900 py-2">
                      ${crypto.total_volume.toLocaleString()}
                    </td>
                    <td
                      className={`px-4 text-lg py-2 ${
                        crypto.price_change_percentage_24h < 0
                          ? "text-[#ff0000] dark:text-[#ff2b2b]"
                          : "dark:text-[#16ff1e] text-[#00a305]"
                      }`}
                    >
                      {crypto.price_change_percentage_24h.toFixed(2)}%
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          )}
        </table>
      </div>
    </main>
  );
};

export default Home;
