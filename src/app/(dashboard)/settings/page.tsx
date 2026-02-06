"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  User, Bell, Lock, Save, ShieldCheck, 
  CreditCard, Camera, Check, AlertCircle 
} from "lucide-react";
import { toast } from "sonner";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [isLoading, setIsLoading] = useState(false);

  // Mock toggle states untuk notifikasi
  const [notifStates, setNotifStates] = useState({
    login: true,
    report: false,
    support: true
  });

  const handleSave = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Settings Updated", {
        description: "Perubahan profil Anda telah berhasil disimpan."
      });
    }, 1000);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Card className="bg-white dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 rounded-[32px] overflow-hidden">
              <CardHeader className="border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20">
                <CardTitle className="text-lg font-bold">Public Profile</CardTitle>
              </CardHeader>
              <CardContent className="p-8 space-y-8">
                {/* Avatar Upload */}
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <div className="relative group">
                    <div className="h-24 w-24 rounded-[32px] bg-gradient-to-tr from-blue-600 to-indigo-600 p-1 shadow-xl">
                      <img 
                        src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" 
                        alt="avatar" 
                        className="h-full w-full rounded-[28px] object-cover bg-white dark:bg-slate-900"
                      />
                    </div>
                    <button className="absolute -bottom-2 -right-2 p-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-lg text-blue-600 hover:scale-110 transition-transform">
                      <Camera className="h-4 w-4" />
                    </button>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">Profile Picture</h4>
                    <p className="text-xs text-slate-500 mt-1">PNG, JPG up to 5MB. Recommended 400x400.</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase ml-1">Full Name</label>
                    <input className="w-full p-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all" defaultValue="Admin Nexus" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase ml-1">Email Address</label>
                    <input className="w-full p-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all" defaultValue="admin@nexusui.com" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase ml-1">Bio</label>
                  <textarea className="w-full p-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl outline-none h-28 resize-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all" placeholder="Tell us about yourself..." />
                </div>

                <div className="flex justify-end border-t border-slate-100 dark:border-slate-800 pt-6">
                  <button 
                    onClick={handleSave}
                    disabled={isLoading}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-2xl font-bold transition-all shadow-lg shadow-blue-500/25 active:scale-95 disabled:opacity-50"
                  >
                    {isLoading ? "Saving..." : <><Save className="h-4 w-4" /> Save Changes</>}
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>
        );
      case "notifications":
        return (
          <Card className="bg-white dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 rounded-[32px] overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
            <CardHeader className="p-8"><CardTitle className="text-lg">Notification Preferences</CardTitle></CardHeader>
            <CardContent className="px-8 pb-8 space-y-3">
              {[
                { id: "login", label: "Email alerts on new login", desc: "Get notified when someone logs into your account." },
                { id: "report", label: "Monthly performance report", desc: "A summary of your analytics sent to your inbox." },
                { id: "support", label: "Customer support messages", desc: "Direct notifications from our support team." }
              ].map((item) => (
                <div 
                  key={item.id} 
                  onClick={() => setNotifStates(prev => ({...prev, [item.id]: !prev[item.id as keyof typeof notifStates]}))}
                  className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-950/50 border border-slate-100 dark:border-slate-800/50 rounded-2xl cursor-pointer hover:border-blue-500/30 transition-all"
                >
                  <div>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">{item.label}</p>
                    <p className="text-xs text-slate-500">{item.desc}</p>
                  </div>
                  <div className={`w-12 h-6 rounded-full relative transition-colors duration-300 ${notifStates[item.id as keyof typeof notifStates] ? 'bg-blue-600' : 'bg-slate-300 dark:bg-slate-700'}`}>
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 ${notifStates[item.id as keyof typeof notifStates] ? 'right-1' : 'right-7'}`} />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        );
      case "security":
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Card className="bg-white dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 rounded-[32px]">
              <CardHeader className="p-8"><CardTitle className="text-lg">Two-Factor Authentication</CardTitle></CardHeader>
              <CardContent className="px-8 pb-8">
                <div className="flex items-start gap-4 p-4 bg-blue-50 dark:bg-blue-500/10 border border-blue-100 dark:border-blue-500/20 rounded-2xl">
                  <ShieldCheck className="h-6 w-6 text-blue-600 mt-1" />
                  <div>
                    <p className="text-sm font-bold text-blue-900 dark:text-blue-400">Secure your account</p>
                    <p className="text-xs text-blue-700 dark:text-blue-500/80 mt-1">2FA is currently <span className="font-bold underline">enabled</span>. Your account is protected by an extra layer of security.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 rounded-[32px]">
              <CardHeader className="p-8"><CardTitle className="text-lg">Change Password</CardTitle></CardHeader>
              <CardContent className="px-8 pb-8 space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase ml-1">Current Password</label>
                  <input type="password" placeholder="••••••••" className="w-full p-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase ml-1">New Password</label>
                  <input type="password" placeholder="••••••••" className="w-full p-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl outline-none" />
                </div>
                <button className="w-full py-4 bg-slate-900 dark:bg-white dark:text-slate-900 text-white rounded-2xl font-bold hover:opacity-90 transition-opacity">Update Password</button>
              </CardContent>
            </Card>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-6 md:p-10 space-y-8 animate-in fade-in duration-700">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Settings</h1>
        <p className="text-slate-500 font-medium">Manage your personal information and system preferences.</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-4 items-start">
        {/* Navigation Sidebar Internal */}
        <div className="lg:sticky lg:top-28 space-y-2">
          <TabButton active={activeTab === "profile"} onClick={() => setActiveTab("profile")} icon={User} label="My Profile" />
          <TabButton active={activeTab === "notifications"} onClick={() => setActiveTab("notifications")} icon={Bell} label="Notifications" />
          <TabButton active={activeTab === "security"} onClick={() => setActiveTab("security")} icon={Lock} label="Security & Privacy" />
          <TabButton active={activeTab === "billing"} onClick={() => setActiveTab("billing")} icon={CreditCard} label="Billing & Plan" />
        </div>

        {/* Dynamic Content */}
        <div className="lg:col-span-3">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

function TabButton({ active, onClick, icon: Icon, label }: any) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-5 py-4 rounded-2xl text-sm font-bold transition-all duration-300 ${
        active 
          ? "bg-blue-600 text-white shadow-xl shadow-blue-500/25 translate-x-2" 
          : "text-slate-500 hover:bg-white dark:hover:bg-slate-800 hover:text-blue-600"
      }`}
    >
      <Icon className={`h-5 w-5 ${active ? "text-white" : "text-slate-400 group-hover:text-blue-600"}`} />
      {label}
    </button>
  );
}