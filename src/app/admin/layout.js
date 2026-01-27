"use client";

import LogoutButton from "@/components/Adminlogout";
import { useRouter } from "next/navigation";

export default function AdminLayout({ children }) {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-100">
      {/* ================= SIDEBAR ================= */}
      <aside className="fixed top-0 left-0 h-screen w-64 bg-white border-r border-gray-200 flex flex-col">
        {/* Sidebar Header */}
        <div className="h-16 flex items-center px-6 font-semibold text-gray-800 border-b border-gray-200">
          Admin Panel
        </div>

        {/* Sidebar Menu */}
        <div className="flex-1 p-4 space-y-2 text-gray-800 overflow-y-auto">
          <button
            className="w-full text-left px-4 py-2 rounded-md hover:bg-gray-100 font-medium"
            onClick={() => router.push("/admin/dashboard")}
          >
            Dashboard
          </button>

          <button
            className="w-full text-left px-4 py-2 rounded-md hover:bg-gray-100 font-medium"
            onClick={() => router.push("/admin/manage_products")}
          >
            Manage Products
          </button>
        </div>
      </aside>

      {/* ================= MAIN AREA ================= */}
      <div className="ml-64 flex flex-col min-h-screen">
        {/* Header */}
        <header className="fixed top-0 left-64 right-0 h-16 bg-white border-b border-gray-200 flex items-center justify-end px-6 z-10">
          <LogoutButton />
        </header>

        {/* Content */}
        <main className="mt-16 p-6 overflow-y-auto bg-zinc-50 h-[calc(100vh-4rem)]">
          {children}
        </main>
      </div>
    </div>
  );
}
