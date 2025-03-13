// Clerk imports
import { SignedIn, SignOutButton, useUser } from "@clerk/nextjs";
// Next imports
import Image from "next/image";
import Link from "next/link";
// ShadCn imports
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../UI/dropdown-menu";
// i18n imports
import { useTranslation } from "react-i18next";

export default function UserSection() {
  // i18n hooks for translation
  const { t } = useTranslation();
  // Auth hooks
  const { user } = useUser();
  return (
    <SignedIn>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Image
            src={user?.imageUrl || "/image/user.png"}
            alt={user?.username || "User Avatar"}
            width={32}
            height={32}
            className="rounded-full"
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel> {t("dropdown.myAcc")}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link href="/dashboard">{t("dropdown.dash")}</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/dashboard/profile">{t("dropdown.profile")}</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/dashboard/blogs">{t("dropdown.blogs")}</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/dashboard/subscriptions">{t("dropdown.sub")}</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <SignOutButton>{t("dropdown.out")}</SignOutButton>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </SignedIn>
  );
}
