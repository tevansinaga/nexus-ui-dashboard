"use client";

import React from "react";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, Legend 
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight, Users, MousePointer2, Clock } from "lucide-react";

// Data untuk Bar Chart (User Growth)
const barData = [
  { name: "Mon", users: 400 },
  { name: "Tue", users: 700 },
  { name: "Wed", users: 500 },
  { name: "Thu", users: 900 },
  { name: "Fri", users: 1100 },
  { name: "Sat", users: 800 },
  { name: "Sun", users: 600 },
];

// Data untuk Pie Chart (Plan Distribution)
const pieData = [
  { name: "Free", value: 400 },
  { name: "Pro", value: 300 },
  { name: "Enterprise", value: 200 },
];

const COLORS = ["#94a3b8", "#3b82f6", "#1e293b"];

export default function AnalyticsPage() {
  return (
    <div className="p-6 md:p-10 space-y-8 animate-in fade-in duration-700">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Analytics Insights</h1>
        <p className="text-slate-500 dark:text-slate-400 font-medium">Deep dive into your platform performance and user behavior.</p>
      </div>

      {/* Mini Stats Row */}
      <div className="grid gap-6 md:grid-cols-3">
        <MiniStatsCard label="Conversion Rate" value="3.24%" trend="+0.4%" icon={MousePointer2} />
        <MiniStatsCard label="Avg. Session" value="4m 32s" trend="+12%" icon={Clock} />
        <MiniStatsCard label="Bounce Rate" value="42.1%" trend="-2.1%" trendUp={false} icon={Users} />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Bar Chart - Pertumbuhan Pengguna */}
        <Card className="lg:col-span-2 bg-white dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-bold">Weekly User Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} fontSize={12} tick={{fill: '#94a3b8'}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} fontSize={12} tick={{fill: '#94a3b8'}} />
                  <Tooltip 
                    cursor={{fill: '#f1f5f9'}}
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  />
                  <Bar dataKey="users" fill="#3b82f6" radius={[6, 6, 0, 0]} barSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Pie Chart - Distribusi Paket */}
        <Card className="bg-white dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-bold">Subscription Plans</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={8}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend verticalAlign="bottom" height={36}/>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 text-center">
              <p className="text-sm text-slate-500 font-medium">Most popular plan</p>
              <p className="text-xl font-bold text-blue-600">Free Tier (44%)</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function MiniStatsCard({ label, value, trend, icon: Icon, trendUp = true }: any) {
  return (
    <Card className="bg-white dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm">
      <CardContent className="p-6 flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{label}</p>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{value}</h3>
          <div className={`flex items-center gap-1 mt-2 text-xs font-bold ${trendUp ? 'text-emerald-600' : 'text-rose-600'}`}>
            {trendUp ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
            {trend}
            <span className="text-slate-400 font-normal ml-1">vs last month</span>
          </div>
        </div>
        <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
          <Icon className="h-6 w-6 text-slate-400" />
        </div>
      </CardContent>
    </Card>
  );
}