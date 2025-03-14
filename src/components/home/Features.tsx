
import React, { useEffect } from 'react';
import { ArrowRight, MessageSquare, BarChart3, CreditCard, Newspaper, BookOpen, ChevronRight, IndianRupee, Lock, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import Mascot from '../ui/Mascot';

const features = [
  {
    icon: <MessageSquare className="h-6 w-6" />,
    color: 'bg-navy-700',
    title: 'AI Chatbot',
    description: 'No dumb questions, promise! Get instant answers to all your financial questions with our GenAI powered assistant.',
    link: '/chatbot'
  },
  {
    icon: <BarChart3 className="h-6 w-6" />,
    color: 'bg-gold-400',
    title: 'Portfolio Tracking',
    description: 'Visualize and analyze your investments with interactive charts and personalized insights.',
    link: '/portfolio'
  },
  {
    icon: <CreditCard className="h-6 w-6" />,
    color: 'bg-teal-500',
    title: 'Expense Management',
    description: 'Track your spending habits and get personalized recommendations to save more.',
    link: '/expenses'
  },
  {
    icon: <BookOpen className="h-6 w-6" />,
    color: 'bg-navy-400',
    title: 'Personalized Learning',
    description: 'Access curated financial content tailored to your knowledge level and goals.',
    link: '/learn'
  },
  {
    icon: <Newspaper className="h-6 w-6" />,
    color: 'bg-gold-500',
    title: 'Financial News',
    description: 'Stay updated with the latest market trends and news relevant to your financial interests.',
    link: '/news'
  }
];

const Features = () => {
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
    
    return () => {
      elements.forEach(el => observer.unobserve(el));
    };
  }, []);

  return (
    <section className="py-20 md:py-32 bg-white relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-navy-50 rounded-bl-full opacity-70"></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-gold-50 rounded-tr-full opacity-70"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <span className="inline-block px-3 py-1 rounded-full bg-teal-100 text-teal-800 text-xs font-medium mb-6 scroll-fade-in">
            Powerful Features
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-navy-900 mb-6 tracking-tight scroll-fade-in">
            Everything You Need for Your <span className="text-teal-500">Financial Journey</span>
          </h2>
          <p className="text-lg text-navy-600 scroll-fade-in">
            Our comprehensive suite of tools is designed to help you understand, manage, and grow your finances with confidence.
          </p>
          
          {/* Mascot */}
          <div className="flex justify-center mt-8 mb-4 scroll-fade-in">
            <Mascot 
              pose="excited" 
              size="md" 
              speechBubble="Hi, I'm Sipre! I'll guide you through your financial journey!"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="relative group rounded-2xl p-8 border border-slate-200 bg-white hover:shadow-xl transition-all duration-500 scroll-fade-in hover:-translate-y-2 md3-card"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`absolute top-0 left-0 w-full h-1 ${feature.color} rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
              <div className={`w-14 h-14 rounded-xl ${feature.color} flex items-center justify-center mb-6 text-white group-hover:scale-110 transition-transform duration-300`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-navy-900 mb-3">{feature.title}</h3>
              <p className="text-navy-600 mb-5">{feature.description}</p>
              <Link 
                to={feature.link} 
                className="inline-flex items-center text-sm font-medium text-teal-600 hover:text-teal-700 transition-colors group/link"
              >
                Learn more <ChevronRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-1" />
              </Link>
            </div>
          ))}
        </div>
        
        {/* Trust signals section */}
        <div className="mt-24 text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-navy-50 border border-navy-100 mb-10 scroll-fade-in">
            <Lock size={16} className="text-navy-700 mr-2" />
            <span className="text-sm font-medium text-navy-700">SEBI-approved | Enterprise-grade security</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {/* Material Design Components Showcase */}
            <div className="md3-card p-6 scroll-fade-in">
              <h3 className="font-semibold text-lg text-navy-800 mb-4">Material Design Buttons</h3>
              <div className="flex flex-col gap-3">
                <button className="md3-button md3-button-primary">
                  <Sparkles size={16} />
                  Primary Button
                </button>
                <button className="md3-button md3-button-secondary">
                  <IndianRupee size={16} />
                  Gold Button
                </button>
                <button className="md3-button md3-button-teal">
                  <MessageSquare size={16} />
                  Teal Button
                </button>
                <button className="md3-button md3-button-outline">
                  <BarChart3 size={16} />
                  Outline Button
                </button>
              </div>
            </div>
            
            {/* Slider Component */}
            <div className="md3-card p-6 scroll-fade-in">
              <h3 className="font-semibold text-lg text-navy-800 mb-4">Interactive Sliders</h3>
              <div className="space-y-8">
                <div>
                  <label className="block text-sm font-medium text-navy-700 mb-2">Investment Amount</label>
                  <div className="relative h-2 bg-navy-200 rounded-full">
                    <div className="absolute h-full w-3/5 bg-navy-700 rounded-full"></div>
                    <div className="absolute h-6 w-6 rounded-full bg-white border-2 border-navy-700 top-1/2 left-3/5 transform -translate-y-1/2 -translate-x-1/2 shadow-md"></div>
                  </div>
                  <div className="flex justify-between mt-2 text-xs text-navy-600">
                    <span>₹1,000</span>
                    <span>₹5,00,000</span>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-navy-700 mb-2">Risk Tolerance</label>
                  <div className="relative h-2 bg-gradient-to-r from-teal-500 via-gold-400 to-red-500 rounded-full">
                    <div className="absolute h-6 w-6 rounded-full bg-white border-2 border-navy-700 top-1/2 left-1/3 transform -translate-y-1/2 -translate-x-1/2 shadow-md"></div>
                  </div>
                  <div className="flex justify-between mt-2 text-xs">
                    <span className="text-teal-600">Conservative</span>
                    <span className="text-gold-700">Moderate</span>
                    <span className="text-red-600">Aggressive</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Material Card with Interaction */}
            <div className="md3-card p-0 overflow-hidden scroll-fade-in">
              <div className="bg-navy-700 h-32 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-navy-900 to-navy-700 opacity-90"></div>
                <div className="relative z-10 text-white text-center p-4">
                  <BarChart3 size={32} className="mx-auto mb-2" />
                  <h3 className="font-bold">Performance Tracker</h3>
                </div>
              </div>
              <div className="p-4">
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-navy-700">NIFTY 50</span>
                  <span className="text-sm font-semibold text-green-600">+1.2%</span>
                </div>
                <div className="h-2 bg-navy-100 rounded-full mb-4">
                  <div className="h-full w-3/4 bg-green-500 rounded-full"></div>
                </div>
                <button className="w-full md3-button md3-button-primary text-sm">View Details</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
