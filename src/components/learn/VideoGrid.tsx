
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Play, Clock, CheckCircle, Bookmark } from 'lucide-react';
import { cn } from '@/lib/utils';

const VideoGrid = () => {
  // Mock data - in real app, this would come from YouTube API
  const videos = [
    {
      id: 1,
      title: "Personal Finance Basics: Emergency Fund",
      duration: "12:34",
      thumbnail: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400",
      progress: 100,
      isCompleted: true,
      category: "Basics"
    },
    {
      id: 2,
      title: "Understanding SIP Investments",
      duration: "18:45",
      thumbnail: "https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?w=400",
      progress: 65,
      isCompleted: false,
      category: "Investing"
    },
    {
      id: 3,
      title: "Credit Score: What You Need to Know",
      duration: "15:20",
      thumbnail: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400",
      progress: 0,
      isCompleted: false,
      category: "Credit"
    },
    {
      id: 4,
      title: "Tax Saving Strategies for Beginners",
      duration: "22:10",
      thumbnail: "https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=400",
      progress: 35,
      isCompleted: false,
      category: "Taxes"
    },
    {
      id: 5,
      title: "Mutual Funds vs Fixed Deposits",
      duration: "16:55",
      thumbnail: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400",
      progress: 0,
      isCompleted: false,
      category: "Investing"
    },
    {
      id: 6,
      title: "Insurance Planning for Young Adults",
      duration: "19:30",
      thumbnail: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400",
      progress: 80,
      isCompleted: false,
      category: "Insurance"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-slate-900">Video Library</h2>
        <Button variant="outline" size="sm">
          Sort by Progress
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video) => (
          <Card key={video.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative aspect-video">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                <Button size="lg" className="rounded-full w-16 h-16 p-0">
                  <Play size={24} />
                </Button>
              </div>
              
              {video.isCompleted && (
                <div className="absolute top-2 right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <CheckCircle size={16} className="text-white" />
                </div>
              )}
              
              <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs flex items-center gap-1">
                <Clock size={12} />
                {video.duration}
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-2 left-2 w-8 h-8 p-0 bg-black/50 hover:bg-black/70 text-white"
              >
                <Bookmark size={14} />
              </Button>
            </div>
            
            <CardContent className="p-4">
              <div className="space-y-3">
                <div>
                  <span className="inline-block bg-finspire-100 text-finspire-700 text-xs px-2 py-1 rounded-full mb-2">
                    {video.category}
                  </span>
                  <h3 className="font-medium text-slate-900 line-clamp-2">
                    {video.title}
                  </h3>
                </div>
                
                {video.progress > 0 && (
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs text-slate-500">
                      <span>Progress</span>
                      <span>{video.progress}%</span>
                    </div>
                    <Progress value={video.progress} className="h-1.5" />
                  </div>
                )}
                
                <Button 
                  className={cn(
                    "w-full",
                    video.isCompleted 
                      ? "bg-green-100 text-green-700 hover:bg-green-200" 
                      : video.progress > 0 
                        ? "bg-finspire-100 text-finspire-700 hover:bg-finspire-200"
                        : "bg-finspire-500 hover:bg-finspire-600 text-white"
                  )}
                  variant={video.isCompleted || video.progress > 0 ? "outline" : "default"}
                >
                  {video.isCompleted ? "Completed" : video.progress > 0 ? "Continue" : "Start Learning"}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="text-center">
        <Button variant="outline" size="lg">
          Load More Videos
        </Button>
      </div>
    </div>
  );
};

export default VideoGrid;
