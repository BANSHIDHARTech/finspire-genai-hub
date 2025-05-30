
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowUp, ArrowDown, Plus, TrendingUp, Target, DollarSign } from 'lucide-react';
import { cn } from '@/lib/utils';

const PortfolioSummary = () => {
  const [timeframe, setTimeframe] = useState('1Y');
  
  const summaryData = {
    totalValue: 485000,
    totalInvested: 450000,
    totalGains: 35000,
    gainsPercentage: 7.78,
    dayChange: 2400,
    dayChangePercentage: 0.5
  };

  const timeframes = ['1D', '1W', '1M', '3M', '6M', '1Y', 'All'];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="col-span-2">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Portfolio Overview</CardTitle>
            <div className="flex gap-1">
              {timeframes.map((period) => (
                <Button
                  key={period}
                  variant={timeframe === period ? "default" : "ghost"}
                  size="sm"
                  className="h-8 px-2 text-xs"
                  onClick={() => setTimeframe(period)}
                >
                  {period}
                </Button>
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="text-2xl font-bold text-slate-900">
                ₹{summaryData.totalValue.toLocaleString()}
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-slate-500">
                  Invested: ₹{summaryData.totalInvested.toLocaleString()}
                </span>
                <div className={cn(
                  "flex items-center gap-1 font-medium",
                  summaryData.gainsPercentage >= 0 ? "text-green-600" : "text-red-600"
                )}>
                  {summaryData.gainsPercentage >= 0 ? <ArrowUp size={12} /> : <ArrowDown size={12} />}
                  ₹{Math.abs(summaryData.totalGains).toLocaleString()} ({Math.abs(summaryData.gainsPercentage)}%)
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-4 pt-2 border-t">
              <div className="flex items-center gap-2">
                <div className={cn(
                  "w-2 h-2 rounded-full",
                  summaryData.dayChange >= 0 ? "bg-green-500" : "bg-red-500"
                )}></div>
                <span className="text-sm text-slate-600">Today:</span>
                <span className={cn(
                  "text-sm font-medium",
                  summaryData.dayChange >= 0 ? "text-green-600" : "text-red-600"
                )}>
                  {summaryData.dayChange >= 0 ? '+' : ''}₹{summaryData.dayChange.toLocaleString()} 
                  ({summaryData.dayChangePercentage >= 0 ? '+' : ''}{summaryData.dayChangePercentage}%)
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                <TrendingUp className="text-blue-600" size={20} />
              </div>
              <div>
                <div className="text-sm text-slate-500">XIRR Returns</div>
                <div className="text-lg font-semibold text-slate-900">12.4%</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                <Target className="text-purple-600" size={20} />
              </div>
              <div>
                <div className="text-sm text-slate-500">Risk Score</div>
                <div className="text-lg font-semibold text-slate-900">Medium</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Button className="w-full bg-finspire-500 hover:bg-finspire-600">
          <Plus size={16} className="mr-2" /> Add Investment
        </Button>
      </div>
    </div>
  );
};

export default PortfolioSummary;
