
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { BookOpen, TrendingUp, Shield, CreditCard, Calculator, Target } from 'lucide-react';
import { cn } from '@/lib/utils';

const TopicCategories = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Topics', icon: BookOpen, count: 45 },
    { id: 'basics', name: 'Basics', icon: Calculator, count: 12 },
    { id: 'investing', name: 'Investing', icon: TrendingUp, count: 15 },
    { id: 'insurance', name: 'Insurance', icon: Shield, count: 8 },
    { id: 'loans', name: 'Loans & Credit', icon: CreditCard, count: 6 },
    { id: 'goals', name: 'Financial Goals', icon: Target, count: 4 },
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-slate-900">Browse by Topics</h2>
      <div className="flex flex-wrap gap-3">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={activeCategory === category.id ? "default" : "outline"}
            className={cn(
              "flex items-center gap-2 rounded-full",
              activeCategory === category.id && "bg-finspire-500 hover:bg-finspire-600"
            )}
            onClick={() => setActiveCategory(category.id)}
          >
            <category.icon size={16} />
            {category.name}
            <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">
              {category.count}
            </span>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default TopicCategories;
