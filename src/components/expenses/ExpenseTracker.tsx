
import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import { ArrowDown, ArrowUp, Plus, Filter, ChevronDown, Search, CreditCard, Tag, ShoppingCart, Coffee, Home, Utensils, Car, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// Sample data
const expenseData = [
  { name: 'Jan', value: 3000 },
  { name: 'Feb', value: 2800 },
  { name: 'Mar', value: 3200 },
  { name: 'Apr', value: 2600 },
  { name: 'May', value: 2400 },
  { name: 'Jun', value: 2800 },
  { name: 'Jul', value: 3000 },
  { name: 'Aug', value: 3200 },
  { name: 'Sep', value: 3400 },
  { name: 'Oct', value: 3000 },
  { name: 'Nov', value: 2800 },
  { name: 'Dec', value: 3600 },
];

const categoryData = [
  { name: 'Housing', value: 35, icon: <Home size={16} />, color: '#0d91e1' },
  { name: 'Food', value: 25, icon: <Utensils size={16} />, color: '#4ade80' },
  { name: 'Transport', value: 15, icon: <Car size={16} />, color: '#f59e0b' },
  { name: 'Shopping', value: 15, icon: <ShoppingCart size={16} />, color: '#8b5cf6' },
  { name: 'Others', value: 10, icon: <Tag size={16} />, color: '#ec4899' },
];

const transactions = [
  { id: 1, name: 'Apartment Rent', category: 'Housing', amount: 15000, date: '15 May, 2023', icon: <Home size={16} />, color: '#0d91e1' },
  { id: 2, name: 'Grocery Shopping', category: 'Food', amount: 2500, date: '12 May, 2023', icon: <ShoppingCart size={16} />, color: '#4ade80' },
  { id: 3, name: 'Uber Ride', category: 'Transport', amount: 450, date: '10 May, 2023', icon: <Car size={16} />, color: '#f59e0b' },
  { id: 4, name: 'Coffee Shop', category: 'Food', amount: 250, date: '8 May, 2023', icon: <Coffee size={16} />, color: '#4ade80' },
  { id: 5, name: 'Mobile Phone Bill', category: 'Others', amount: 999, date: '5 May, 2023', icon: <Tag size={16} />, color: '#ec4899' },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-slate-200 rounded-lg shadow-md text-xs">
        <p className="text-slate-600 mb-1">{label}</p>
        <p className="font-medium text-slate-900">₹{payload[0].value.toLocaleString()}</p>
      </div>
    );
  }
  return null;
};

const ExpenseTracker = () => {
  const [activeTab, setActiveTab] = useState('overview');
  
  return (
    <div className="w-full max-w-5xl mx-auto bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-slate-200">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">Expense Tracker</h2>
            <p className="text-slate-500">Monitor your spending habits</p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className={cn(
                "rounded-lg border-slate-200",
                activeTab === 'overview' && "bg-slate-100"
              )}
              onClick={() => setActiveTab('overview')}
            >
              <Activity size={16} className="mr-1" /> Overview
            </Button>
            <Button
              variant="outline"
              size="sm"
              className={cn(
                "rounded-lg border-slate-200",
                activeTab === 'transactions' && "bg-slate-100"
              )}
              onClick={() => setActiveTab('transactions')}
            >
              <CreditCard size={16} className="mr-1" /> Transactions
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <div className="text-sm text-slate-500 mb-2">Total Expenses</div>
            <div className="text-2xl font-bold text-slate-900">₹32,400</div>
            <div className="flex items-center text-xs font-medium text-red-600 mt-1">
              <ArrowUp size={12} className="mr-1" /> 8.2% from last month
            </div>
          </div>
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <div className="text-sm text-slate-500 mb-2">Monthly Average</div>
            <div className="text-2xl font-bold text-slate-900">₹2,950</div>
            <div className="flex items-center text-xs font-medium text-green-600 mt-1">
              <ArrowDown size={12} className="mr-1" /> 3.5% from last month
            </div>
          </div>
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <div className="text-sm text-slate-500 mb-2">Budget Remaining</div>
            <div className="text-2xl font-bold text-slate-900">₹17,600</div>
            <div className="w-full h-2 bg-slate-200 rounded-full mt-2 overflow-hidden">
              <div className="h-full bg-finspire-500 rounded-full" style={{ width: '65%' }}></div>
            </div>
          </div>
        </div>
        
        {activeTab === 'overview' ? (
          <>
            <div className="mb-6">
              <h3 className="text-lg font-medium text-slate-900 mb-4">Monthly Expenses</h3>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={expenseData} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis 
                      dataKey="name" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: '#94a3b8', fontSize: 12 }} 
                    />
                    <YAxis 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: '#94a3b8', fontSize: 12 }} 
                      tickFormatter={(tick) => `₹${tick}`} 
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar 
                      dataKey="value" 
                      radius={[4, 4, 0, 0]} 
                      barSize={30}
                    >
                      {expenseData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={index === 11 ? '#0d91e1' : '#cbd5e1'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-slate-900 mb-4">Expense by Category</h3>
              <ul className="space-y-3">
                {categoryData.map((item, index) => (
                  <li key={index} className="flex items-center justify-between p-3 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center mr-3" style={{ backgroundColor: item.color + '20', color: item.color }}>
                        {item.icon}
                      </div>
                      <span className="text-slate-800">{item.name}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium text-slate-900">{item.value}%</span>
                      <div className="ml-4 w-20 h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${item.value}%`, backgroundColor: item.color }}></div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </>
        ) : (
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={16} />
                <input
                  type="text"
                  placeholder="Search transactions..."
                  className="bg-slate-50 border border-slate-200 rounded-lg pl-10 pr-4 py-2 w-full max-w-xs text-sm focus:outline-none focus:ring-2 focus:ring-finspire-300 focus:border-transparent"
                />
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="rounded-lg border-slate-200">
                  <Filter size={14} className="mr-1" /> Filter
                </Button>
                <Button className="rounded-lg bg-finspire-500 hover:bg-finspire-600">
                  <Plus size={14} className="mr-1" /> Add Expense
                </Button>
              </div>
            </div>
            
            <div className="space-y-3">
              {transactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-4 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center mr-4" style={{ backgroundColor: transaction.color + '20', color: transaction.color }}>
                      {transaction.icon}
                    </div>
                    <div>
                      <div className="font-medium text-slate-900">{transaction.name}</div>
                      <div className="text-xs text-slate-500">{transaction.date}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-slate-900">₹{transaction.amount.toLocaleString()}</div>
                    <div className="text-xs text-slate-500">{transaction.category}</div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 text-center">
              <Button variant="outline" className="rounded-lg border-slate-200 text-slate-600">
                Load More <ChevronDown size={14} className="ml-1" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExpenseTracker;
