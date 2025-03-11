// Clerk imports
import { SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs";
// Icons imports
import { UserIcon } from "lucide-react";
// i18n imports
import { useTranslation } from "react-i18next";

export default function AuthButtons() {
  // i18n hooks for translation
  const { t } = useTranslation();
  return (
    <SignedOut>
      <SignInButton>
        <button
          className="hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 w-[110px]
            text-sm font-bold
            dark:text-white/80 text-black transition-colors delay-300 hover:text-[#1677ff] 
            rounded-[6px] hover:border-solid hover:border hover:border-[#1677ff]
            dark:hover:bg-white/5 hover:bg-gray-50"
        >
          <UserIcon className="w-3.5 h-3.5 xs:w-4 xs:h-4" />
          {t("auth.login")}
        </button>
      </SignInButton>
      <SignUpButton>
        <button
          className="hidden lg:block px-3 py-1.5 text-xs sm:text-sm font-medium text-white w-[120px]
            bg-gradient-to-r from-[#1890ff] to-[#69c0ff]
            rounded-[6px] transition-all duration-300
            hover:shadow-[0_0_20px_rgba(24,144,255,0.3)]
            hover:scale-[1.02]"
        >
          {t("auth.getStarted")}
        </button>
      </SignUpButton>
    </SignedOut>
  );
}
