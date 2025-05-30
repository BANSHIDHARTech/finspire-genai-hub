
import React from 'react';
import ExpenseTracker from '@/components/expenses/ExpenseTracker';
import ExpenseInput from '@/components/expenses/ExpenseInput';
import BudgetOverview from '@/components/expenses/BudgetOverview';

const Expenses = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Expense Tracker</h1>
          <p className="text-slate-600">Monitor your spending and manage budgets</p>
        </div>
        
        <div className="space-y-8">
          <BudgetOverview />
          <ExpenseInput />
          <ExpenseTracker />
        </div>
      </div>
    </div>
  );
};

export default Expenses;
