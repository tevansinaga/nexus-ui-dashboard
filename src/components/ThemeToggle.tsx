"use client";

import React, { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    // 1. Cek apa yang tersimpan di storage saat pertama load
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    }
  }, []);

  const handleToggle = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    
    // 2. Update State
    setTheme(newTheme);
    
    // 3. Update DOM Secara Paksa
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
      console.log("Berhasil tambah class dark");
    } else {
      document.documentElement.classList.remove("dark");
      console.log("Berhasil hapus class dark");
    }
    
    // 4. Simpan ke Storage
    localStorage.setItem("theme", newTheme);
  };

  return (
    <button
      onClick={handleToggle}
      className="flex items-center gap-2 p-2 rounded-xl border transition-all duration-300
        bg-white border-slate-200 text-slate-600 
        dark:bg-slate-900 dark:border-slate-800 dark:text-slate-300 shadow-sm"
    >
      {theme === "dark" ? <Sun className="h-5 w-5 text-amber-400" /> : <Moon className="h-5 w-5 text-blue-600" />}
      <span className="text-xs font-bold hidden md:block uppercase tracking-wider">
        {theme === "dark" ? "Light Mode" : "Dark Mode"}
      </span>
    </button>
  );
}