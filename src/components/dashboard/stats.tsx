'use client'

// imports
import { useTranslation } from "react-i18next";

// tsx render
export function Stats() {
  const { t, i18n } = useTranslation();
  return (
    <div
      className={`${i18n.language == "fa" && "font-vazirmatn"} ${
        i18n.language == "ar" && "font-notokufi"
      } flex flex-row pr-2 py-4 border border-[#4b4b4b61] rounded-[16px] justify-start items-center dark:bg-[#4b4b4b5b] bg-white gap-8 w-2/3 transition-all duration-300 
                    hover:shadow-xl hover:scale-102 hover:border-gray-300 dark:hover:border-gray-700 flex-grow dark:text-white text-black`}
    >
        <div className="flex flex-row flex-wrap w-1/6 justify-center">
            <div className="flex flex-col items-center">
                <h1 className="w-8 h-8 bg-likes bg-cover"></h1>
                <h1 className="text-ellipsis whitespace-nowrap overflow-hidden">10 {t('dashboard.stats.likes')}</h1>
            </div>
        </div>
        <div className="flex flex-row flex-wrap w-1/5 justify-center">
            <div className="flex flex-col items-center">
                <h1 className="w-8 h-8 bg-user bg-cover"></h1>
                <h1 className="text-ellipsis whitespace-nowrap overflow-hidden">13 {t('dashboard.stats.following')}</h1>
            </div>
        </div>
        <div className="flex flex-row flex-wrap w-1/5 justify-center">
            <div className="flex flex-col items-center">
                <h1 className="w-8 h-8 bg-save bg-cover"></h1>
                <h1 className="text-ellipsis whitespace-nowrap overflow-hidden">30 {t('dashboard.stats.saved')}</h1>
            </div>
        </div>
        <div className="flex flex-row flex-wrap w-1/5 justify-center">
            <div className="flex flex-col items-center">
                <h1 className="w-8 h-8 bg-comments bg-cover"></h1>
                <h1 className="text-ellipsis whitespace-nowrap overflow-hidden">500 {t('dashboard.stats.comments')}</h1>
            </div>
        </div>
    </div>
  );
}
