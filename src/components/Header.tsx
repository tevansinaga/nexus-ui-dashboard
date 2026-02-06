"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { 
  Search, 
  Bell, 
  Menu, 
  ChevronRight, 
  User as UserIcon,
  Command,
} from "lucide-react";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  const pathname = usePathname();
  const [isFocused, setIsFocused] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  // Mengubah path "/analytics" menjadi "Analytics"
  const pageTitle = pathname.split("/").pop() || "Dashboard";

  // Shortcut Keyboard: Tekan '/' untuk fokus ke search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "/" && !isFocused && document.activeElement?.tagName !== "INPUT") {
        e.preventDefault();
        document.getElementById("global-search")?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isFocused]);

  return (
    <header className="sticky top-0 z-40 flex h-20 w-full items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-[#020617]/80 backdrop-blur-md px-4 md:px-10 transition-all duration-300">
      
      {/* 1. KIRI: Breadcrumbs & Page Title */}
      <div className="flex items-center gap-4">
        {/* Tombol Menu Mobile (Hanya muncul di layar kecil) */}
        <div className="md:hidden flex items-center gap-3">
          <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <UserIcon className="h-5 w-5 text-white" />
          </div>
        </div>

        <nav className="hidden sm:flex items-center gap-2 text-sm font-medium">
          <span className="text-slate-400">Pages</span>
          <ChevronRight className="h-4 w-4 text-slate-300" />
          <span className="text-slate-900 dark:text-white capitalize font-bold tracking-tight">
            {pageTitle}
          </span>
        </nav>
      </div>

      {/* 2. TENGAH: Global Search Bar */}
      <div className="hidden lg:flex flex-1 max-w-md mx-8">
        <div className={`relative w-full group transition-all duration-300 ${isFocused ? "scale-[1.02]" : "scale-100"}`}>
          <Search className={`absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 transition-colors ${isFocused ? "text-blue-600" : "text-slate-400"}`} />
          <input 
            id="global-search"
            type="text" 
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Search anything... (Press /)" 
            className="w-full pl-11 pr-16 py-2.5 bg-slate-100/50 dark:bg-slate-900/50 border border-transparent focus:border-blue-500/30 focus:bg-white dark:focus:bg-slate-950 rounded-2xl outline-none text-sm transition-all"
          />
          
          {/* Keyboard Shortcut Hint */}
          <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
            <kbd className="hidden sm:flex items-center gap-1 px-2 py-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-[10px] font-bold text-slate-400 shadow-sm">
              <Command className="h-2.5 w-2.5" /> /
            </kbd>
          </div>
        </div>
      </div>

      {/* 3. KANAN: Actions (Theme, Notif, Profile) */}
      <div className="flex items-center gap-1 md:gap-4">
        
        {/* Theme Toggle */}
        <ThemeToggle />

        {/* Notifikasi */}
        <button className="group relative p-2.5 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all">
          <Bell className="h-5 w-5 group-hover:rotate-12 transition-transform" />
          <span className="absolute top-2.5 right-2.5 h-2 w-2 bg-rose-500 rounded-full border-2 border-white dark:border-[#020617]" />
        </button>

        <div className="hidden sm:block h-6 w-[1px] bg-slate-200 dark:bg-slate-800 mx-1" />

        {/* User Profile */}
        <div className="flex items-center gap-3 pl-2 transition-all">
          <div className="hidden md:block text-right">
            <p className="text-xs font-bold text-slate-900 dark:text-white leading-none">Admin Nexus</p>
            <p className="text-[10px] text-slate-500 mt-1 font-medium">Super Admin</p>
          </div>
          
          <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 p-[2px] shadow-lg shadow-blue-500/20 active:scale-95 transition-transform cursor-pointer">
            <div className="h-full w-full rounded-[9px] bg-white dark:bg-slate-900 flex items-center justify-center overflow-hidden">
              <img 
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" 
                alt="avatar" 
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}