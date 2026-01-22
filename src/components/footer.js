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
      <div className="flex items-center justify-center fixed bottom-0 left-0 right-0 h-16 w-full bg-black">
        <h1>Footer</h1>
      </div>
    </footer>
  );
}
