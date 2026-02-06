"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  Zap, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  Github, 
  AlertCircle 
} from "lucide-react";
import { toast } from "sonner";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Required fields", { description: "Please fill in all the fields." });
      return;
    }
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      toast.success("Welcome back!", { description: "Redirecting to dashboard..." });
      router.push("/dashboard");
    } catch (error) {
      toast.error("Login Failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] w-full h-screen flex bg-white dark:bg-[#020617] overflow-hidden">
      
      {/* KIRI: Form Section */}
      <div className="flex-[0.8] lg:flex-[1] xl:flex-[0.8] flex flex-col justify-center px-8 md:px-16 lg:px-20 relative z-20 bg-white dark:bg-[#020617]">
        
        {/* Efek Gradasi Penyatu ke Tengah */}
        <div className="hidden lg:block absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-blue-50/50 dark:from-blue-900/10 to-transparent pointer-events-none" />

        <div className="max-w-md w-full mx-auto space-y-10 animate-in fade-in slide-in-from-left-4 duration-1000">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 bg-blue-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-500/40 rotate-3 group">
              <Zap className="h-7 w-7 text-white fill-white/20" />
            </div>
            <span className="text-2xl font-black tracking-tighter text-slate-900 dark:text-white uppercase">
              Nexus<span className="text-blue-600">UI</span>
            </span>
          </div>

          <div className="space-y-3">
            <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-none">
              Welcome Back.
            </h1>
            <p className="text-slate-500 dark:text-slate-400 font-medium italic">
              "Precision is the soul of every great interface."
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest font-black text-slate-400 dark:text-slate-500 ml-1">Account Email</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-300 group-focus-within:text-blue-600 transition-colors" />
                <input 
                  required type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-900/50 border-2 border-slate-100 dark:border-slate-800 rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-sm font-medium"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-xs uppercase tracking-widest font-black text-slate-400 dark:text-slate-500">Password</label>
                <button type="button" className="text-xs font-bold text-blue-600 hover:underline">Reset?</button>
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-300 group-focus-within:text-blue-600 transition-colors" />
                <input 
                  required type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-12 py-4 bg-slate-50 dark:bg-slate-900/50 border-2 border-slate-100 dark:border-slate-800 rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-sm font-medium"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-600">
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <button disabled={isLoading} className="w-full py-4 bg-slate-900 dark:bg-blue-600 hover:bg-black dark:hover:bg-blue-700 text-white rounded-2xl font-black shadow-2xl transition-all active:scale-[0.98] flex items-center justify-center gap-3 disabled:opacity-70 group overflow-hidden relative">
              {isLoading ? (
                <div className="h-5 w-5 border-3 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span className="relative z-10">Authorize Access</span>
                  <ArrowRight className="h-5 w-5 relative z-10 group-hover:translate-x-2 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="relative py-4">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100 dark:border-slate-800"></div></div>
            <div className="relative flex justify-center text-[10px] uppercase tracking-[0.3em] font-black text-slate-400 bg-white dark:bg-[#020617] px-4">Trusted Security</div>
          </div>

          <button className="w-full py-4 border-2 border-slate-100 dark:border-slate-800 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-slate-50 dark:hover:bg-slate-900 transition-all text-sm">
            <Github className="h-5 w-5" /> Continue with GitHub
          </button>
        </div>
      </div>

      {/* KANAN: Visual Section */}
      <div className="hidden lg:flex flex-1 bg-[#0a52f5] relative overflow-hidden flex-col justify-between p-20 text-white">
        
        {/* MESH GRADIENT & TEXTURE 
            Ini yang membuat warna biru tidak flat dan menyatu dengan transisi tengah
        */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-950" />
        <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(#fff_1px,transparent_1px)] [background-size:32px_32px]" />
        
        {/* Glow Orbs */}
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-400/30 rounded-full blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-indigo-500/40 rounded-full blur-[100px]" />

        {/* ATAS: Floating Preview */}
        <div className="relative z-10 w-full perspective-1000">
          <div className="relative group animate-bounce-slow">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
            
            {/* Mockup Dashboard Sederhana */}
            <div className="relative w-full max-w-md bg-white/10 backdrop-blur-3xl border border-white/20 rounded-3xl shadow-2xl overflow-hidden transform rotate-x-6 -rotate-y-12 rotate-2 transition-transform duration-700">
              <div className="h-10 bg-white/10 border-b border-white/10 flex items-center px-5 gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400/40" />
                <div className="w-3 h-3 rounded-full bg-yellow-400/40" />
                <div className="w-3 h-3 rounded-full bg-green-400/40" />
              </div>
              <div className="p-6 space-y-5">
                <div className="grid grid-cols-3 gap-3">
                  <div className="h-20 bg-white/20 rounded-2xl animate-pulse" />
                  <div className="h-20 bg-white/10 rounded-2xl" />
                  <div className="h-20 bg-white/10 rounded-2xl" />
                </div>
                <div className="space-y-3">
                  <div className="h-3 w-2/3 bg-white/20 rounded-full" />
                  <div className="h-3 w-full bg-white/10 rounded-full" />
                  <div className="h-3 w-4/5 bg-white/10 rounded-full" />
                </div>
              </div>
            </div>

            {/* Floating Stats Card */}
            <div className="absolute -bottom-10 -left-10 w-44 bg-white/20 backdrop-blur-2xl border border-white/30 rounded-3xl p-5 shadow-2xl transform -rotate-12 hover:rotate-0 transition-transform duration-500">
               <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-blue-500 rounded-xl shadow-lg"><Zap className="h-5 w-5 fill-white" /></div>
                  <div className="h-2 w-12 bg-white/40 rounded-full" />
               </div>
               <div className="h-4 w-full bg-white/10 rounded-full" />
            </div>
          </div>
        </div>

        {/* BAWAH: Copywriting */}
        <div className="relative z-10 space-y-10">
          <div className="space-y-5">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-xs font-bold tracking-widest uppercase shadow-xl">
              <span className="flex h-2 w-2 rounded-full bg-green-400 animate-ping" />
              v3.2 New Version
            </div>
            <h2 className="text-6xl font-black leading-[0.95] tracking-tighter">
              Redefine your <br />
              <span className="text-blue-300">Management.</span>
            </h2>
            <p className="text-blue-100/70 text-xl font-medium max-w-md leading-relaxed">
              Experience the world's most intuitive dashboard system built for high-performance teams.
            </p>
          </div>

          <div className="flex items-center gap-8 pt-10 border-t border-white/10">
            <div className="flex -space-x-4">
              {[...Array(4)].map((_, i) => (
                <img key={i} className="h-12 w-12 rounded-full border-4 border-blue-700 shadow-2xl" src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i + 40}`} alt="user" />
              ))}
            </div>
            <div className="h-12 w-[2px] bg-white/10" />
            <div>
              <p className="text-2xl font-black">2,400+</p>
              <p className="text-blue-200/50 text-xs font-bold uppercase tracking-widest">Global Teams</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}