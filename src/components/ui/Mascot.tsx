
import React from 'react';
import { IndianRupee, Lightbulb, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';

type MascotPose = 'default' | 'waving' | 'thinking' | 'excited';
type MascotSize = 'sm' | 'md' | 'lg';

interface MascotProps {
  pose?: MascotPose;
  size?: MascotSize;
  className?: string;
  speechBubble?: string;
}

const Mascot: React.FC<MascotProps> = ({ 
  pose = 'default', 
  size = 'md', 
  className,
  speechBubble
}) => {
  const sizeClass = {
    sm: 'w-12 h-12',
    md: 'w-20 h-20',
    lg: 'w-32 h-32'
  };

  return (
    <div className={cn("relative", className)}>
      {/* Speech bubble */}
      {speechBubble && (
        <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-white rounded-2xl p-3 shadow-md border border-navy-100 min-w-40 animate-chat-bubble z-10">
          <div className="text-sm text-navy-800">{speechBubble}</div>
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white border-r border-b border-navy-100 rotate-45"></div>
        </div>
      )}
      
      {/* Mascot character - Sipre */}
      <div className={cn(
        "rounded-full bg-navy-50 border-4 border-navy-700 flex items-center justify-center relative overflow-hidden",
        sizeClass[size]
      )}>
        {/* Face */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {/* Eyes */}
          <div className="flex space-x-3 mb-1">
            <div className="w-3 h-3 rounded-full bg-navy-900"></div>
            <div className="w-3 h-3 rounded-full bg-navy-900"></div>
          </div>
          
          {/* Mouth */}
          <div className="w-6 h-2 rounded-full bg-navy-900"></div>
          
          {/* Rupee emblem */}
          <div className="absolute top-2 bg-gold-400 rounded-full w-5 h-5 flex items-center justify-center">
            <IndianRupee size={12} className="text-navy-900" />
          </div>

          {/* Pose-specific elements */}
          {pose === 'waving' && (
            <div className="absolute -right-1 top-0 w-5 h-10 bg-navy-50 border-4 border-navy-700 rounded-full mascot-wave"></div>
          )}
          
          {pose === 'thinking' && (
            <div className="absolute -right-2 -top-4">
              <Lightbulb size={14} className="text-gold-400 animate-pulse" />
            </div>
          )}
          
          {pose === 'excited' && (
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <MessageSquare size={14} className="text-teal-500 animate-bounce" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Mascot;
