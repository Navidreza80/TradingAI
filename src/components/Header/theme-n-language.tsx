// Redux imports
import { toggleDarkMode } from "@/hooks/redux/themeSlice";
import { useDispatch, useSelector } from "react-redux";
// Icons imports
import { MoonIcon, SunIcon } from "lucide-react";

export default function ThemeNLanguage({responsive}: {responsive: string}) {
  // Redux states for recognizing the app theme
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  
  return (
    <div className={`items-center ${responsive} min-[900px]:flex gap-1 p-1 bg-white/5 rounded-full`}>
      <button
        onClick={() => dispatch(toggleDarkMode())}
        className="p-1 xs:p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
      >
        {isDarkMode ? (
          <SunIcon className="w-3.5 h-3.5 xs:w-4 xs:h-4 dark:text-white/80 text-gray-700" />
        ) : (
          <MoonIcon className="w-3.5 h-3.5 xs:w-4 xs:h-4 dark:text-white/80 text-gray-700" />
        )}
      </button>
    </div>
  );
}
