"use client";

import React, { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { 
  UserPlus, 
  X, 
  Edit2, 
  Loader2, 
  Mail, 
  User, 
  Trash2, 
  Search,
  Filter,
  Users,
  CheckCircle2,
  Clock
} from "lucide-react";
import { toast } from "sonner";

const initialCustomers = [
  { id: 1, name: "Alex Johnson", email: "alex@company.com", status: "Active", plan: "Pro" },
  { id: 2, name: "Sarah Williams", email: "sarah.w@gmail.com", status: "Active", plan: "Free" },
  { id: 3, name: "Michael Chen", email: "m.chen@tech.io", status: "Inactive", plan: "Enterprise" },
  { id: 4, name: "Jessica Lee", email: "jess.lee@design.co", status: "Active", plan: "Pro" },
];

export default function CustomersPage() {
  const [customersData, setCustomersData] = useState(initialCustomers);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
  
  // State Filter & Search
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // Logika Filter Data
  const filteredCustomers = useMemo(() => {
    return customersData.filter((c) => {
      const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            c.email.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === "All" || c.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [customersData, searchQuery, statusFilter]);

  // Statistik Sederhana
  const stats = {
    total: customersData.length,
    active: customersData.filter(c => c.status === "Active").length,
    inactive: customersData.filter(c => c.status === "Inactive").length,
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.currentTarget);
    const name = formData.get("fullname") as string;
    const email = formData.get("email") as string;

    setTimeout(() => {
      if (selectedCustomer) {
        setCustomersData((prev) =>
          prev.map((c) => (c.id === selectedCustomer.id ? { ...c, name, email } : c))
        );
        toast.success("Berhasil diperbarui");
      } else {
        const newCustomer = { id: Date.now(), name, email, status: "Active", plan: "Free" };
        setCustomersData((prev) => [newCustomer, ...prev]);
        toast.success("Customer ditambahkan");
      }
      setIsLoading(false);
      setIsModalOpen(false);
    }, 800);
  };

  const handleDelete = (id: number) => {
    if (confirm("Hapus customer ini?")) {
      setCustomersData(prev => prev.filter(c => c.id !== id));
      toast.error("Customer dihapus");
    }
  };

  return (
    <div className="p-4 md:p-8 space-y-6 animate-in fade-in duration-700">
      
      {/* 1. Header & Action */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Customers</h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium">User data and subscription management.</p>
        </div>
        <button 
          onClick={() => { setSelectedCustomer(null); setIsModalOpen(true); }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-bold transition-all shadow-lg shadow-blue-500/20 active:scale-95 flex items-center justify-center gap-2"
        >
          <UserPlus className="h-5 w-5" /> Add New
        </button>
      </div>

      {/* 2. Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatsCard icon={<Users className="text-blue-600"/>} label="Total Users" value={stats.total} />
        <StatsCard icon={<CheckCircle2 className="text-emerald-500"/>} label="Active" value={stats.active} color="emerald" />
        <StatsCard icon={<Clock className="text-slate-400"/>} label="Inactive" value={stats.inactive} color="slate" />
      </div>

      {/* 3. Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-white dark:bg-slate-900/50 p-4 rounded-2xl border border-slate-200 dark:border-slate-800">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input 
            type="text"
            placeholder="Search by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20 transition-all text-sm"
          />
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="h-4 w-4 text-slate-400 hidden sm:block" />
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full sm:w-40 px-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl outline-none text-sm font-medium"
          >
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* 4. Customer Table */}
      <Card className="border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden bg-white/50 dark:bg-slate-900/20 backdrop-blur-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50/50 dark:bg-slate-800/50 text-slate-500">
              <tr>
                <th className="p-5 text-xs font-bold uppercase tracking-wider">Customer</th>
                <th className="p-5 text-xs font-bold uppercase tracking-wider">Status</th>
                <th className="p-5 text-xs font-bold uppercase tracking-wider">Plan</th>
                <th className="p-5 text-xs font-bold uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredCustomers.map((user) => (
                <tr key={user.id} className="group hover:bg-blue-50/30 dark:hover:bg-blue-900/10 transition-colors">
                  <td className="p-5">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-blue-100 to-indigo-100 dark:from-blue-900/40 dark:to-indigo-900/40 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold shadow-inner">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900 dark:text-white">{user.name}</p>
                        <p className="text-xs text-slate-500">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-5">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                      user.status === 'Active' ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400' : 'bg-slate-100 text-slate-500 dark:bg-slate-800'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="p-5 text-sm font-semibold text-slate-600 dark:text-slate-400">{user.plan}</td>
                  <td className="p-5 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                      <button onClick={() => { setSelectedCustomer(user); setIsModalOpen(true); }} className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg"><Edit2 className="h-4 w-4"/></button>
                      <button onClick={() => handleDelete(user.id)} className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg"><Trash2 className="h-4 w-4"/></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredCustomers.length === 0 && (
            <div className="p-20 text-center">
              <p className="text-slate-400 font-medium">No customers found matching your criteria.</p>
            </div>
          )}
        </div>
      </Card>

      {/* 5. Modal Form */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-md" onClick={() => setIsModalOpen(false)}></div>
          <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-[32px] border border-slate-200 dark:border-slate-800 shadow-2xl animate-in zoom-in-95 duration-300">
             <form onSubmit={handleSubmit} className="p-8">
                <div className="flex justify-between mb-6">
                  <div className="h-12 w-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
                    {selectedCustomer ? <Edit2 /> : <UserPlus />}
                  </div>
                  <button type="button" onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600"><X /></button>
                </div>
                <h2 className="text-2xl font-bold mb-6">{selectedCustomer ? "Edit Customer" : "New Customer"}</h2>
                <div className="space-y-4">
                  <InputGroup label="Full Name" name="fullname" icon={<User className="h-4 w-4"/>} defaultValue={selectedCustomer?.name} />
                  <InputGroup label="Email Address" name="email" type="email" icon={<Mail className="h-4 w-4"/>} defaultValue={selectedCustomer?.email} />
                </div>
                <div className="mt-8 flex gap-3">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-3.5 font-bold text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-2xl transition-all">Cancel</button>
                  <button type="submit" disabled={isLoading} className="flex-1 py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold shadow-lg shadow-blue-500/20 flex items-center justify-center">
                    {isLoading ? <Loader2 className="animate-spin" /> : "Confirm"}
                  </button>
                </div>
             </form>
          </div>
        </div>
      )}
    </div>
  );
}

// Sub-komponen agar kode lebih bersih
function StatsCard({ icon, label, value, color = "blue" }: any) {
  return (
    <div className="bg-white dark:bg-slate-900/50 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 flex items-center gap-4">
      <div className={`h-12 w-12 rounded-2xl bg-${color}-50 dark:bg-${color}-900/20 flex items-center justify-center`}>
        {icon}
      </div>
      <div>
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{label}</p>
        <p className="text-2xl font-black text-slate-900 dark:text-white">{value}</p>
      </div>
    </div>
  );
}

function InputGroup({ label, name, icon, type = "text", defaultValue }: any) {
  return (
    <div className="space-y-2">
      <label className="text-xs font-bold text-slate-500 ml-1 uppercase tracking-wider">{label}</label>
      <div className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">{icon}</div>
        <input 
          name={name} required type={type} defaultValue={defaultValue}
          className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
        />
      </div>
    </div>
  );
}