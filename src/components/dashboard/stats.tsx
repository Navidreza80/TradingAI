'use client'

// imports
import { useTranslation } from "react-i18next";

// tsx render
export function Stats() {
  const { t } = useTranslation();

  return (
    <div className={`flex flex-row p-4 border border-[#4b4b4b61] rounded-[16px] justify-between items-center dark:bg-[#4b4b4b5b] bg-white gap-4 sm:gap-8 w-full transition-all duration-300 
                    hover:shadow-xl hover:scale-102 hover:border-gray-300 dark:hover:border-gray-700 dark:text-white text-black`}
    >
      {/* Likes */}
      <div className="flex flex-col items-center w-full sm:w-auto">
        <div className="w-8 h-8 bg-likes bg-cover"></div>
        <h1 className="text-sm sm:text-base text-ellipsis whitespace-nowrap overflow-hidden">
          10 {t('dashboard.stats.likes')}
        </h1>
      </div>

      {/* Following */}
      <div className="flex flex-col items-center w-full sm:w-auto">
        <div className="w-8 h-8 bg-user bg-cover"></div>
        <h1 className="text-sm sm:text-base text-ellipsis whitespace-nowrap overflow-hidden">
          13 {t('dashboard.stats.following')}
        </h1>
      </div>

      {/* Saved */}
      <div className="flex flex-col items-center w-full sm:w-auto">
        <div className="w-8 h-8 bg-save bg-cover"></div>
        <h1 className="text-sm sm:text-base text-ellipsis whitespace-nowrap overflow-hidden">
          30 {t('dashboard.stats.saved')}
        </h1>
      </div>

      {/* Comments */}
      <div className="flex flex-col items-center w-full sm:w-auto">
        <div className="w-8 h-8 bg-comments bg-cover"></div>
        <h1 className="text-sm sm:text-base text-ellipsis whitespace-nowrap overflow-hidden">
          500 {t('dashboard.stats.comments')}
        </h1>
      </div>
    </div>
  );
}