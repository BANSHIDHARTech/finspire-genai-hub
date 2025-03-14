
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Scene3D from '@/components/3d/Scene3D';
import FloatingElements from '@/components/ui/FloatingElements';

const Hero3D = () => {
  const featuresRef = useRef<HTMLDivElement>(null);
  const [showMascot, setShowMascot] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });
    
    const elements = document.querySelectorAll('.scroll-fade-in');
    elements.forEach(el => observer.observe(el));
    
    // Show mascot after a delay for a dramatic entrance
    const timer = setTimeout(() => {
      setShowMascot(true);
    }, 2000);
    
    return () => {
      elements.forEach(el => observer.unobserve(el));
      clearTimeout(timer);
    };
  }, []);
  
  const scrollToFeatures = () => {
    featuresRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-white pointer-events-none z-0"></div>
      
      {/* 3D Floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
        <FloatingElements />
      </div>
      
      {/* Hero content */}
      <div className="relative pt-32 md:pt-40 pb-20 md:pb-32 px-6 flex-1 flex flex-col z-20">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col items-center text-center mb-8 md:mb-12">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-finspire-100 text-finspire-800 text-xs font-medium mb-6 animate-fade-in">
              <span className="flex h-2 w-2 rounded-full bg-finspire-500 mr-2 animate-pulse"></span>
              Introducing Finspire AI
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900 mb-6 max-w-4xl leading-tight md:leading-tight animate-fade-in text-balance">
              Your Personal AI Financial Guide for a 
              <span className="text-finspire-500 relative inline-block">
                <span className="relative z-10"> Smarter Future</span>
                <span className="absolute bottom-0 left-0 w-full h-3 bg-finspire-200 -z-0 transform -skew-y-1"></span>
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-600 max-w-2xl mb-8 animate-fade-in delay-100 text-balance">
              Empowering financial literacy through intelligent conversations, personalized learning, and practical tools that help you make better financial decisions.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-12 animate-fade-in delay-200">
              <Button 
                size="lg" 
                className="rounded-full px-8 py-6 bg-finspire-500 hover:bg-finspire-600 text-white shadow-md hover:shadow-lg transition-all group"
              >
                Get Started 
                <ArrowRight size={16} className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="rounded-full px-8 py-6 border-slate-300 hover:bg-slate-100 transition-all"
                onClick={scrollToFeatures}
              >
                Explore Features
              </Button>
            </div>
          </div>
          
          {/* 3D Logo and Mascot */}
          <div className="relative h-[50vh] md:h-[60vh] mx-auto max-w-5xl mb-8 animate-fade-in delay-300">
            <Scene3D 
              showLogo={true} 
              showMascot={showMascot} 
              cameraPosition={[0, 0, 5]}
              className="w-full h-full rounded-2xl bg-white/20 backdrop-blur-sm shadow-xl"
            />
          </div>
        </div>
      </div>

      {/* Partners */}
      <div className="w-full py-12 bg-white border-y border-slate-200/80">
        <div className="container mx-auto px-6">
          <p className="text-center text-sm font-medium text-slate-500 mb-8">
            TRUSTED BY FINANCIAL INSTITUTIONS AROUND THE WORLD
          </p>
          <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8">
            {[1, 2, 3, 4, 5].map((i) => (
              <div 
                key={i} 
                className="h-6 w-24 bg-slate-200 rounded opacity-50 hover:opacity-80 transition-opacity"
              ></div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Features Section Indicator */}
      <div ref={featuresRef} className="h-1 w-full"></div>
    </div>
  );
};

export default Hero3D;
