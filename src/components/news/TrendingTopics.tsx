
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp, AlertCircle, Globe, BarChart3 } from 'lucide-react';

const TrendingTopics = () => {
  const trendingTopics = [
    {
      title: "Nifty 50 hits new all-time high",
      change: "+2.4%",
      isPositive: true,
      icon: TrendingUp,
      category: "Markets"
    },
    {
      title: "RBI Policy Meeting Updates",
      change: "6.5%",
      isPositive: null,
      icon: AlertCircle,
      category: "Policy"
    },
    {
      title: "Global Market Trends",
      change: "-0.8%",
      isPositive: false,
      icon: Globe,
      category: "Global"
    },
    {
      title: "Mutual Fund Performance",
      change: "+1.2%",
      isPositive: true,
      icon: BarChart3,
      category: "Funds"
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp size={20} />
          Trending Now
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {trendingTopics.map((topic, index) => (
            <Button
              key={index}
              variant="outline"
              className="h-auto p-4 flex flex-col items-start text-left hover:bg-slate-50"
            >
              <div className="flex items-center gap-2 mb-2">
                <topic.icon size={16} className="text-finspire-600" />
                <span className="text-xs text-slate-500">{topic.category}</span>
              </div>
              <div className="font-medium text-sm mb-1">{topic.title}</div>
              {topic.isPositive !== null && (
                <div className={`text-xs font-medium ${
                  topic.isPositive ? 'text-green-600' : 'text-red-600'
                }`}>
                  {topic.change}
                </div>
              )}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TrendingTopics;
