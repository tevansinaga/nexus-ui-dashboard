"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { 
  ArrowDownLeft, 
  ArrowUpRight, 
  Search, 
  FileText, 
  Filter,
  CheckCircle2,
  Clock,
  XCircle
} from "lucide-react";
import { toast } from "sonner";

const transactions = [
  { id: "TX-9021", date: "Feb 05, 2026", amount: 250.00, status: "Completed", method: "Visa **** 4242", type: "income" },
  { id: "TX-9022", date: "Feb 04, 2026", amount: 12.50, status: "Completed", method: "Internal", type: "expense" },
  { id: "TX-9023", date: "Feb 04, 2026", amount: 1200.00, status: "Processing", method: "Bank Transfer", type: "income" },
  { id: "TX-9024", date: "Feb 03, 2026", amount: 45.00, status: "Failed", method: "Mastercard **** 8812", type: "income" },
  { id: "TX-9025", date: "Feb 02, 2026", amount: 89.99, status: "Completed", method: "PayPal", type: "expense" },
];

export default function TransactionsPage() {
  const [filter, setFilter] = useState("All");

  // LOGIKA EXPORT CSV
  const exportToCSV = () => {
    // Header CSV
    const headers = ["ID,Date,Amount,Method,Status,Type\n"];
    
    // Data Rows
    const rows = transactions.map(tx => 
      `${tx.id},${tx.date},${tx.amount},${tx.method},${tx.status},${tx.type}`
    ).join("\n");

    const blob = new Blob([headers + rows], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    
    a.setAttribute("hidden", "");
    a.setAttribute("href", url);
    a.setAttribute("download", `Transactions_${new Date().toLocaleDateString()}.csv`);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    toast.success("Export Success!", {
      description: "Data transaksi telah diunduh sebagai CSV.",
    });
  };

  // Filter Logic
  const filteredData = filter === "All" 
    ? transactions 
    : transactions.filter(t => t.status === filter);

  return (
    <div className="p-6 md:p-10 space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Transactions</h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium">Monitor and manage your financial history.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <select 
            onChange={(e) => setFilter(e.target.value)}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2 text-sm font-semibold outline-none focus:ring-2 focus:ring-blue-500/20"
          >
            <option value="All">All Status</option>
            <option value="Completed">Completed</option>
            <option value="Processing">Processing</option>
            <option value="Failed">Failed</option>
          </select>

          <button 
            onClick={exportToCSV}
            className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-500/20 transition-all active:scale-95"
          >
            <FileText className="h-4 w-4" /> 
            Export CSV
          </button>
        </div>
      </div>

      {/* Stats Mini */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-4 bg-emerald-50/50 dark:bg-emerald-500/5 border-emerald-100 dark:border-emerald-500/10 rounded-2xl">
          <p className="text-xs font-bold text-emerald-600 uppercase">Total Income</p>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">$1,495.00</h2>
        </Card>
        <Card className="p-4 bg-rose-50/50 dark:bg-rose-500/5 border-rose-100 dark:border-rose-500/10 rounded-2xl">
          <p className="text-xs font-bold text-rose-600 uppercase">Total Expense</p>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">$102.49</h2>
        </Card>
        <Card className="p-4 bg-blue-50/50 dark:bg-blue-500/5 border-blue-100 dark:border-blue-500/10 rounded-2xl">
          <p className="text-xs font-bold text-blue-600 uppercase">Net Balance</p>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">$1,392.51</h2>
        </Card>
      </div>

      {/* Table Card */}
      <Card className="bg-white dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
                <th className="p-5 text-xs font-bold text-slate-400 uppercase tracking-wider">Transaction</th>
                <th className="p-5 text-xs font-bold text-slate-400 uppercase tracking-wider">Amount</th>
                <th className="p-5 text-xs font-bold text-slate-400 uppercase tracking-wider">Method</th>
                <th className="p-5 text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
                <th className="p-5 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-800/50">
              {filteredData.map((tx) => (
                <tr key={tx.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors group">
                  <td className="p-5">
                    <div className="flex items-center gap-3">
                      <div className={`h-10 w-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 ${
                        tx.type === 'income' ? 'bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600' : 'bg-rose-100 dark:bg-rose-500/10 text-rose-600'
                      }`}>
                        {tx.type === 'income' ? <ArrowDownLeft className="h-5 w-5" /> : <ArrowUpRight className="h-5 w-5" />}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900 dark:text-white">{tx.id}</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase">{tx.type}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-5">
                    <p className={`text-sm font-bold ${tx.type === 'income' ? 'text-emerald-600' : 'text-rose-600'}`}>
                      {tx.type === 'income' ? '+' : '-'}${tx.amount.toFixed(2)}
                    </p>
                  </td>
                  <td className="p-5 text-sm font-medium text-slate-600 dark:text-slate-400">
                    {tx.method}
                  </td>
                  <td className="p-5">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wide ${
                      tx.status === 'Completed' ? 'bg-emerald-100/50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400' : 
                      tx.status === 'Processing' ? 'bg-blue-100/50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400' : 
                      'bg-rose-100/50 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400'
                    }`}>
                      {tx.status === 'Completed' && <CheckCircle2 className="h-3 w-3" />}
                      {tx.status === 'Processing' && <Clock className="h-3 w-3" />}
                      {tx.status === 'Failed' && <XCircle className="h-3 w-3" />}
                      {tx.status}
                    </span>
                  </td>
                  <td className="p-5 text-right text-sm font-medium text-slate-500">
                    {tx.date}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
      
      {filteredData.length === 0 && (
        <div className="text-center py-20 bg-slate-50 dark:bg-slate-900/20 rounded-[32px] border-2 border-dashed border-slate-200 dark:border-slate-800">
          <p className="text-slate-500 font-medium">No transactions found for this filter.</p>
        </div>
      )}
    </div>
  );
}