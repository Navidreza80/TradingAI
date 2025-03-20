// Next imports
import Image from "next/image";
import Link from "next/link";
// Redux imports
import { useSelector } from "react-redux";

const Logo = () => {
  // Redux States
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  return (
    <div className="flex-shrink-0 w-[180px]">
      <Link
        href="/"
        className="group flex items-center gap-2 xs:gap-3 transition-transform duration-300 hover:scale-[1.02]"
      >
          <Image
            src={isDarkMode ? "/image/Logo.svg" : "/image/LogoDark.svg"}
            width={28}
            height={28}
            alt="TradingAI Logo"
            className="max-[900px]:hidden transition-all duration-300 w-7 h-7
            group-hover:drop-shadow-[0_0_8px_rgba(24,144,255,0.5)]"
          />
        <span
          className="text-xl max-[900px]:text-3xl font-bold 
        bg-gradient-to-r from-[#1890ff] to-[#69c0ff] bg-clip-text text-transparent"
        >
          TradingAI
        </span>
      </Link>
    </div>
  );
};
export default Logo;
