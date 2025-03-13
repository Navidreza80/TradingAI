// Icons imports
import { Bars3Icon } from "@heroicons/react/24/outline";

export default function MobileMenuButton({ setIsMobileMenuOpen }) {
  return (
    <button
      className="lg:hidden p-1.5 xs:p-2 rounded-lg 
        hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
      onClick={() => setIsMobileMenuOpen(true)}
    >
      <Bars3Icon className="w-5 h-5 xs:w-6 xs:h-6 dark:text-white/80 text-gray-700" />
    </button>
  );
}
