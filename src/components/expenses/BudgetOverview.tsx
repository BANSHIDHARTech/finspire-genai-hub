
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { AlertTriangle, TrendingDown, TrendingUp, Target, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

const BudgetOverview = () => {
  const budgets = [
    { category: 'Food & Dining', spent: 8500, budget: 10000, color: 'bg-green-500' },
    { category: 'Transportation', spent: 4200, budget: 5000, color: 'bg-blue-500' },
    { category: 'Shopping', spent: 15000, budget: 12000, color: 'bg-red-500' },
    { category: 'Entertainment', spent: 2800, budget: 4000, color: 'bg-purple-500' },
    { category: 'Bills & Utilities', spent: 6500, budget: 7000, color: 'bg-orange-500' },
  ];

  const totalSpent = budgets.reduce((sum, budget) => sum + budget.spent, 0);
  const totalBudget = budgets.reduce((sum, budget) => sum + budget.budget, 0);
  const overallProgress = (totalSpent / totalBudget) * 100;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="lg:col-span-2">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Monthly Budget Overview</CardTitle>
          <Button variant="outline" size="sm">
            <Settings size={16} className="mr-2" />
            Manage Budgets
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-2xl font-bold">₹{totalSpent.toLocaleString()}</div>
                <div className="text-sm text-slate-500">
                  of ₹{totalBudget.toLocaleString()} budgeted
                </div>
              </div>
              <div className={cn(
                "text-sm font-medium",
                overallProgress > 100 ? "text-red-600" : overallProgress > 80 ? "text-orange-600" : "text-green-600"
              )}>
                {overallProgress.toFixed(1)}% used
              </div>
            </div>
            
            <Progress value={overallProgress} className="h-2" />
            
            <div className="space-y-4">
              {budgets.map((budget, index) => {
                const percentage = (budget.spent / budget.budget) * 100;
                const isOverBudget = percentage > 100;
                const isNearLimit = percentage > 80;
                
                return (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${budget.color}`}></div>
                        <span className="text-sm font-medium">{budget.category}</span>
                        {isOverBudget && <AlertTriangle size={14} className="text-red-500" />}
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">
                          ₹{budget.spent.toLocaleString()} / ₹{budget.budget.toLocaleString()}
                        </div>
                        <div className={cn(
                          "text-xs",
                          isOverBudget ? "text-red-600" : isNearLimit ? "text-orange-600" : "text-green-600"
                        )}>
                          {percentage.toFixed(1)}%
                        </div>
                      </div>
                    </div>
                    <Progress 
                      value={Math.min(percentage, 100)} 
                      className="h-1.5"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                <TrendingDown className="text-green-600" size={20} />
              </div>
              <div>
                <div className="text-sm text-slate-500">This Month</div>
                <div className="text-lg font-semibold text-slate-900">₹{totalSpent.toLocaleString()}</div>
                <div className="text-xs text-green-600">-12% from last month</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                <Target className="text-blue-600" size={20} />
              </div>
              <div>
                <div className="text-sm text-slate-500">Avg Daily Spend</div>
                <div className="text-lg font-semibold text-slate-900">₹{Math.round(totalSpent / 30).toLocaleString()}</div>
                <div className="text-xs text-slate-500">Based on 30 days</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                <TrendingUp className="text-purple-600" size={20} />
              </div>
              <div>
                <div className="text-sm text-slate-500">Savings Goal</div>
                <div className="text-lg font-semibold text-slate-900">78%</div>
                <div className="text-xs text-purple-600">₹15,600 saved</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BudgetOverview;
