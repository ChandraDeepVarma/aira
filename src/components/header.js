"use client";

import Link from "next/link";
import localFont from "next/font/local";

const bodoni = localFont({
  src: "../../public/fonts/BodoniModa-variableFont_opsz,wght.ttf",
  variable: "--font-bodoni",
});

export default function Header() {
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
