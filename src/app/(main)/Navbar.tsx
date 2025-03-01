"use client";

import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/logo.png";
import { dark } from "@clerk/themes";
import { UserButton } from "@clerk/nextjs";
import { CreditCard } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import { useTheme } from "next-themes";
const Navbar = () => {
  const { theme } = useTheme();
  return (
    <header className=" shadow-sm">
      <div className="max-w-7xl mx-auto p-3 flex items-center justify-between gap-3">
        <Link href="/resumes" className="flex items-center gap-2">
          <Image src={logo} alt="logo" height={35} className="rounded-full" />
          <span className="text-xl font-bold tracking-tighter font-mono">
            AI·简历生成器
          </span>
        </Link>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <UserButton
            appearance={{
              baseTheme: theme === "dark" ? dark : undefined,
              elements: {
                avatarBox: {
                  width: 35,
                  height: 35,
                },
              },
            }}
          >
            <UserButton.MenuItems>
              <UserButton.Link
                label="Billing"
                labelIcon={<CreditCard className="size-4" />}
                href="/billing"
              />
            </UserButton.MenuItems>
          </UserButton>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
