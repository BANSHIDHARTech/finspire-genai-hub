
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  textClassName?: string;
  iconOnly?: boolean;
}

const Logo = ({ className, textClassName, iconOnly = false }: LogoProps) => {
  return (
    <Link 
      to="/" 
      className={cn(
        "flex items-center gap-2 group",
        className
      )}
    >
      <div className="relative w-8 h-8">
        <div className="absolute inset-0 bg-finspire-500 rounded-lg rotate-45 transition-transform group-hover:rotate-0 duration-300"></div>
        <div className="absolute inset-0 flex items-center justify-center text-white font-bold transition-all">F</div>
      </div>
      
      {!iconOnly && (
        <span className={cn(
          "font-semibold tracking-tight transition-colors duration-300",
          textClassName || "text-slate-900"
        )}>
          Finspire
        </span>
      )}
    </Link>
  );
};

export default Logo;
