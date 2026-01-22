"use client";

import LogoutButton from "@/components/Adminlogout";
import { useRouter } from "next/navigation";

export default function AdminLayout({ children }) {
  const router = useRouter();
  return (
    <>
      {/* ================= Admin Header ================= */}
      <div className="fixed top-0 left-0 w-full h-16 bg-gradient-to-r from-pink-400 to-white-200 text-black z-50 shadow-md flex items-center justify-between px-6">
        <header className="text-xl font-bold tracking-wide">Admin Panel</header>
        <LogoutButton />
      </div>

      {/* ================= Admin Sidebar ================= */}
      <div className="fixed top-16 left-0 h-[calc(100vh-4rem)] w-64 bg-white border-r shadow-sm z-40">
        <nav className="p-4 space-y-2 text-black">
          <h2 className="text-sm font-semibold text-gray-500 mb-4">
            ADMIN MENU
          </h2>

          <button
            className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100 font-medium"
            onClick={() => router.push("/admin/dashboard")}
          >
            Dashboard
          </button>

          <button
            className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100 font-medium"
            onClick={() => router.push("/admin/manage_products")}
          >
            Manage Products
          </button>

          {/* <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100 font-medium">
            Orders
          </button>

          <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100 font-medium">
            Users
          </button> */}
        </nav>
      </div>

      {/* ================= Admin Content ================= */}
      <main className="ml-64 pt-16 min-h-screen bg-zinc-50">{children}</main>
    </>
  );
}
