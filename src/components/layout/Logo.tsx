
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { TrendingUp, MessageSquare, IndianRupee } from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import Logo3D from '@/components/3d/Logo3D';

interface LogoProps {
  className?: string;
  textClassName?: string;
  iconOnly?: boolean;
  use3D?: boolean;
}

const Logo = ({ className, textClassName, iconOnly = false, use3D = false }: LogoProps) => {
  // Remove 3D loading state - just use 2D for better stability
  // Always use the 2D version for better performance
  return (
    <Link 
      to="/" 
      className={cn(
        "flex items-center gap-2 group",
        className
      )}
    >
      <div className="relative w-10 h-10 flex items-center justify-center">
        {/* Base circle with chat bubble */}
        <div className="absolute inset-0 bg-navy-700 rounded-full transition-transform group-hover:scale-95 duration-300 flex items-center justify-center">
          <MessageSquare size={16} className="text-white/80" />
        </div>
        
        {/* Middle layer with growing arrow */}
        <div className="absolute inset-1 bg-gold-400 rounded-full flex items-center justify-center rotate-12 transition-all duration-300 group-hover:rotate-0">
          <TrendingUp size={14} className="text-navy-900" />
        </div>
        
        {/* Top layer with Rupee symbol */}
        <div className="absolute inset-2.5 bg-teal-500 rounded-full flex items-center justify-center shadow-sm transition-all duration-300 group-hover:scale-110">
          <IndianRupee size={14} className="text-white font-bold" />
        </div>
      </div>
      
      {!iconOnly && (
        <div className="flex flex-col items-start">
          <span className={cn(
            "font-poppins font-bold text-lg tracking-tight transition-colors duration-300 leading-none",
            textClassName || "text-navy-800"
          )}>
            Finspire
          </span>
          <span className="text-xs text-navy-600/70">Financial Wisdom</span>
        </div>
      )}
    </Link>
  );
};

export default Logo;
