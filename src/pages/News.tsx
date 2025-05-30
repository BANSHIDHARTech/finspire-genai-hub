
import React from 'react';
import NewsFeed from '@/components/news/NewsFeed';
import NewsFilters from '@/components/news/NewsFilters';
import TrendingTopics from '@/components/news/TrendingTopics';

const News = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Financial News</h1>
          <p className="text-slate-600">Stay updated with the latest financial news and market trends</p>
        </div>
        
        <div className="space-y-8">
          <TrendingTopics />
          <NewsFilters />
          <NewsFeed />
        </div>
      </div>
    </div>
  );
};

export default News;
