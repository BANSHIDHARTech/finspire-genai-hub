
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Filter, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';

const NewsFilters = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [timeFilter, setTimeFilter] = useState('today');

  const categories = [
    { id: 'all', name: 'All News', count: 156 },
    { id: 'markets', name: 'Markets', count: 45 },
    { id: 'stocks', name: 'Stocks', count: 32 },
    { id: 'mutual-funds', name: 'Mutual Funds', count: 28 },
    { id: 'policy', name: 'Policy', count: 18 },
    { id: 'crypto', name: 'Crypto', count: 15 },
    { id: 'insurance', name: 'Insurance', count: 12 },
    { id: 'loans', name: 'Loans', count: 6 }
  ];

  const timeFilters = [
    { id: 'today', name: 'Today' },
    { id: 'week', name: 'This Week' },
    { id: 'month', name: 'This Month' }
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={16} />
          <Input
            placeholder="Search financial news..."
            className="pl-10"
          />
        </div>
        
        <div className="flex items-center gap-2">
          {timeFilters.map((filter) => (
            <Button
              key={filter.id}
              variant={timeFilter === filter.id ? "default" : "outline"}
              size="sm"
              onClick={() => setTimeFilter(filter.id)}
              className={cn(
                "text-xs",
                timeFilter === filter.id && "bg-finspire-500 hover:bg-finspire-600"
              )}
            >
              <Calendar size={12} className="mr-1" />
              {filter.name}
            </Button>
          ))}
        </div>
      </div>

      <div className="flex overflow-x-auto pb-2 -mx-2 sm:mx-0">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={activeFilter === category.id ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveFilter(category.id)}
            className={cn(
              "whitespace-nowrap mx-1 flex items-center gap-2 text-xs",
              activeFilter === category.id && "bg-finspire-500 hover:bg-finspire-600"
            )}
          >
            {category.name}
            <span className="bg-white/20 px-1.5 py-0.5 rounded-full text-xs">
              {category.count}
            </span>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default NewsFilters;
