
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { BookOpen, Award, Clock, Target } from 'lucide-react';

const LearningProgress = () => {
  const progressData = {
    videosWatched: 12,
    totalVideos: 45,
    hoursLearned: 8.5,
    streak: 7,
    completedTopics: ['Budgeting Basics', 'Emergency Fund']
  };

  const progressPercentage = (progressData.videosWatched / progressData.totalVideos) * 100;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen size={20} />
            Learning Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Videos Completed</span>
                <span>{progressData.videosWatched} / {progressData.totalVideos}</span>
              </div>
              <Progress value={progressPercentage} className="h-2" />
              <div className="text-xs text-slate-500 mt-1">
                {progressPercentage.toFixed(1)}% complete
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 pt-4 border-t">
              <div className="text-center">
                <div className="text-2xl font-bold text-finspire-600">{progressData.hoursLearned}</div>
                <div className="text-xs text-slate-500">Hours Learned</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{progressData.streak}</div>
                <div className="text-xs text-slate-500">Day Streak</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
              <Award className="text-purple-600" size={20} />
            </div>
            <div>
              <div className="text-sm text-slate-500">Achievements</div>
              <div className="text-lg font-semibold text-slate-900">5</div>
              <div className="text-xs text-purple-600">Badges earned</div>
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
              <div className="text-sm text-slate-500">Next Goal</div>
              <div className="text-lg font-semibold text-slate-900">20</div>
              <div className="text-xs text-blue-600">Videos to go</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LearningProgress;
