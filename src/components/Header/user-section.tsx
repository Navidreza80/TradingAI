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

export default function UserSection() {
  
  
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
            sizes="32"
            style={{ objectFit: "contain" }}
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel> My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link href="/dashboard">Dashboard</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/dashboard/profile">Profile</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/dashboard/blogs">Blogs</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/dashboard/subscriptions">Subscriptions</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <SignOutButton>Sign Out</SignOutButton>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </SignedIn>
  );
}
