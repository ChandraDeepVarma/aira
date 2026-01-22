"use client";

import Link from "next/link";
import localFont from "next/font/local";
import { usePathname } from "next/navigation";
import LogoutButton from "@/components/Adminlogout";

const bodoni = localFont({
  src: "../../public/fonts/BodoniModa-variableFont_opsz,wght.ttf",
  variable: "--font-bodoni",
});

export default function Header() {
  const pathname = usePathname();

  if (pathname.includes("/admin")) {
    return (
      <div className="fixed top-0 right-0 w-full h-16 bg-gradient-to-r from-blue-400 to-blue-200 text-black z-50 shadow-md flex items-center justify-between px-6">
        <header className="text-xl font-bold tracking-wide">Admin Panel</header>

        <LogoutButton />
      </div>
    );
  }

  if (pathname.includes("/auth/login")) {
    return (
      <div className="flex items-center justify-start ml-5 right-0 fixed top-0 h-16 w-full bg-[#92e0ff] text-black z-50">
        <header className={"flex gap-8 ml-4 cl-black"}>
          Admin panel Login
        </header>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-end  right-0 fixed top-0 h-16 w-full bg-[#92e0ff] text-black z-50">
      <header className={"flex gap-8 mr-4 cl-black"}>
        <Link href="/" className={`${bodoni.className}`}>
          Home
        </Link>
        <Link href="/about" className={`${bodoni.className}`}>
          About
        </Link>
        <Link href="/products" className={`${bodoni.className}`}>
          Products
        </Link>

        <Link href="/contact" className={`${bodoni.className}`}>
          Contact
        </Link>
      </header>
    </div>
  );
}
