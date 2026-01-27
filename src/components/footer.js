"use client";
import { usePathname } from "next/navigation";
export default function Footer() {
  const pathname = usePathname();
  // get url

  console.log(pathname);
  if (pathname.includes("/admin")) {
    return null;
  }

  if (pathname.includes("/auth/login")) {
    return null;
  }

  // console.log(params);
  return (
    <footer>
      <div className="flex items-center justify-center h-16 w-full bg-black">
        <h1>Footer</h1>
      </div>
    </footer>
  );
}
