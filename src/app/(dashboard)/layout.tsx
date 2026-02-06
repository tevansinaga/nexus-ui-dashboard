"use client";

import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-[#020617]">
      {/* 1. Sidebar: Muncul di semua halaman dashboard */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* 2. Area Utama */}
      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden relative">
        <Header />

        {/* 3. Konten Utama: Area yang bisa di-scroll */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar">
          <div className="max-w-[1600px] mx-auto min-h-full p-4 md:p-6">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}