
import React, { useState } from 'react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { ArrowDown, ArrowUp, ArrowRight, Activity, PieChart as PieChartIcon, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// Sample data
const portfolioData = [
  { name: 'Jan', value: 3000 },
  { name: 'Feb', value: 3200 },
  { name: 'Mar', value: 2800 },
  { name: 'Apr', value: 3400 },
  { name: 'May', value: 3600 },
  { name: 'Jun', value: 3200 },
  { name: 'Jul', value: 3800 },
  { name: 'Aug', value: 4000 },
  { name: 'Sep', value: 4200 },
  { name: 'Oct', value: 4400 },
  { name: 'Nov', value: 4600 },
  { name: 'Dec', value: 4800 },
];

const allocationData = [
  { name: 'Stocks', value: 45, color: '#0d91e1' },
  { name: 'Bonds', value: 25, color: '#4ade80' },
  { name: 'Cash', value: 15, color: '#f59e0b' },
  { name: 'Real Estate', value: 10, color: '#8b5cf6' },
  { name: 'Others', value: 5, color: '#ec4899' },
];

const timeRanges = ['1W', '1M', '3M', '6M', '1Y', 'All'];

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

const PortfolioChart = () => {
  const [activeRange, setActiveRange] = useState('1Y');
  const [chartType, setChartType] = useState<'line' | 'area'>('area');
  
  return (
    <div className="w-full max-w-5xl mx-auto bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-slate-200">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">Portfolio Overview</h2>
            <p className="text-slate-500">Track your investment performance</p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className={cn(
                "rounded-lg border-slate-200",
                chartType === 'line' && "bg-slate-100"
              )}
              onClick={() => setChartType('line')}
            >
              <Activity size={16} className="mr-1" /> Line
            </Button>
            <Button
              variant="outline"
              size="sm"
              className={cn(
                "rounded-lg border-slate-200",
                chartType === 'area' && "bg-slate-100"
              )}
              onClick={() => setChartType('area')}
            >
              <TrendingUp size={16} className="mr-1" /> Area
            </Button>
          </div>
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-3xl font-bold text-slate-900">₹4,800.00</div>
            <div className="flex items-center text-xs font-medium text-green-600 mt-1">
              <ArrowUp size={12} className="mr-1" /> 12.5% (₹534) from last month
            </div>
          </div>
          <div className="flex gap-2">
            {timeRanges.map((range) => (
              <Button
                key={range}
                variant="ghost"
                size="sm"
                className={cn(
                  "text-xs px-3 py-1 h-auto rounded-md",
                  activeRange === range
                    ? "bg-finspire-100 text-finspire-700 hover:bg-finspire-100"
                    : "text-slate-600 hover:bg-slate-100"
                )}
                onClick={() => setActiveRange(range)}
              >
                {range}
              </Button>
            ))}
          </div>
        </div>
        
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            {chartType === 'area' ? (
              <AreaChart data={portfolioData} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0d91e1" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#0d91e1" stopOpacity={0} />
                  </linearGradient>
                </defs>
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
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#0d91e1" 
                  strokeWidth={2} 
                  fillOpacity={1} 
                  fill="url(#colorValue)" 
                  activeDot={{ r: 6, fill: '#0d91e1', stroke: '#fff', strokeWidth: 2 }} 
                />
              </AreaChart>
            ) : (
              <LineChart data={portfolioData} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
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
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#0d91e1" 
                  strokeWidth={2} 
                  dot={false} 
                  activeDot={{ r: 6, fill: '#0d91e1', stroke: '#fff', strokeWidth: 2 }} 
                />
              </LineChart>
            )}
          </ResponsiveContainer>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-slate-900">Asset Allocation</h3>
          <Button variant="ghost" size="sm" className="text-finspire-600 hover:text-finspire-700 hover:bg-finspire-50">
            View Details <ArrowRight size={14} className="ml-1" />
          </Button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="h-64 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={allocationData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {allocationData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value}%`} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          <div>
            <ul className="space-y-3">
              {allocationData.map((item, index) => (
                <li key={index} className="flex items-center justify-between p-3 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full mr-3" style={{ backgroundColor: item.color }}></div>
                    <span className="text-slate-800">{item.name}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-medium text-slate-900">{item.value}%</span>
                    <div className="ml-4 w-16 h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${item.value}%`, backgroundColor: item.color }}></div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <Button className="w-full bg-finspire-500 hover:bg-finspire-600 text-white shadow-sm">
                Optimize Allocation
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioChart;
