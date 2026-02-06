"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  ShoppingBag, 
  Activity 
} from "lucide-react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area 
} from "recharts";

// Data Dummy untuk Grafik
const data = [
  { name: "Jan", revenue: 4000, users: 2400 },
  { name: "Feb", revenue: 3000, users: 1398 },
  { name: "Mar", revenue: 2000, users: 9800 },
  { name: "Apr", revenue: 2780, users: 3908 },
  { name: "May", revenue: 1890, users: 4800 },
  { name: "Jun", revenue: 2390, users: 3800 },
  { name: "Jul", revenue: 3490, users: 4300 },
];

const stats = [
  { title: "Total Revenue", value: "$45,231.89", change: "+20.1%", icon: DollarSign, color: "text-emerald-600", bg: "bg-emerald-500/10" },
  { title: "Active Users", value: "2,350", change: "+180.1%", icon: Users, color: "text-blue-600", bg: "bg-blue-500/10" },
  { title: "Sales", value: "+12,234", change: "+19%", icon: ShoppingBag, color: "text-orange-600", bg: "bg-orange-500/10" },
  { title: "Active Now", value: "573", change: "-4.3%", icon: Activity, color: "text-rose-600", bg: "bg-rose-500/10" },
];

export default function DashboardPage() {
  return (
    <div className="p-6 md:p-10 space-y-8 animate-in fade-in duration-700">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Dashboard Overview</h1>
        <p className="text-slate-500 font-medium">Monitoring real-time performance of your Nexus UI account.</p>
      </div>

      {/* Stats Cards (Sama seperti sebelumnya) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <Card key={i} className="p-6 bg-white dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 rounded-[24px]">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color}`}><stat.icon className="h-6 w-6" /></div>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-1 rounded-lg">{stat.change}</span>
            </div>
            <p className="text-sm font-medium text-slate-500">{stat.title}</p>
            <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
          </Card>
        ))}
      </div>

      {/* Main Analytics Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 p-6 bg-white dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 rounded-[32px]">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold">Revenue Analytics</h3>
              <p className="text-sm text-slate-500">Monthly revenue growth in 2026</p>
            </div>
            <select title="select" className="bg-slate-50 dark:bg-slate-800 border-none rounded-xl text-xs font-bold p-2 outline-none">
              <option>Last 7 Months</option>
              <option>Last Year</option>
            </select>
          </div>

          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#94a3b8', fontSize: 12}}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#94a3b8', fontSize: 12}}
                />
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#2563eb" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorRev)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Small Progress / Activity Card */}
        <Card className="p-6 bg-white dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 rounded-[32px] flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold mb-1">Target Progress</h3>
            <p className="text-sm text-slate-500 mb-6">Monthly sales target</p>
            
            <div className="space-y-6">
              {[
                { label: "Online Store", val: 75, col: "bg-blue-600" },
                { label: "Referral", val: 45, col: "bg-emerald-500" },
                { label: "Ads", val: 30, col: "bg-orange-500" }
              ].map((item, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex justify-between text-xs font-bold">
                    <span>{item.label}</span>
                    <span>{item.val}%</span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div className={`h-full ${item.col} rounded-full`} style={{ width: `${item.val}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <button className="w-full py-3 bg-slate-900 dark:bg-white dark:text-slate-900 text-white rounded-2xl text-xs font-bold mt-8 hover:opacity-90 transition-opacity">
            Download Report
          </button>
        </Card>
      </div>
    </div>
  );
}