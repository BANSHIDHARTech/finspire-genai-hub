
import React from 'react';
import VideoGrid from '@/components/learn/VideoGrid';
import LearningProgress from '@/components/learn/LearningProgress';
import TopicCategories from '@/components/learn/TopicCategories';

const Learn = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Learning Hub</h1>
          <p className="text-slate-600">Master personal finance with curated video content</p>
        </div>
        
        <div className="space-y-8">
          <LearningProgress />
          <TopicCategories />
          <VideoGrid />
        </div>
      </div>
    </div>
  );
};

export default Learn;
