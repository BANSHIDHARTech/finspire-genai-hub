
import React, { useEffect } from 'react';
import { ArrowRight, MessageSquare, BarChart3, CreditCard, Newspaper, BookOpen, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

const features = [
  {
    icon: <MessageSquare className="h-6 w-6" />,
    color: 'bg-blue-500',
    title: 'AI Chatbot',
    description: 'Get instant answers to all your financial questions with our GenAI powered assistant.',
    link: '/chatbot'
  },
  {
    icon: <BarChart3 className="h-6 w-6" />,
    color: 'bg-green-500',
    title: 'Portfolio Tracking',
    description: 'Visualize and analyze your investments with interactive charts and personalized insights.',
    link: '/portfolio'
  },
  {
    icon: <CreditCard className="h-6 w-6" />,
    color: 'bg-purple-500',
    title: 'Expense Management',
    description: 'Track your spending habits and get personalized recommendations to save more.',
    link: '/expenses'
  },
  {
    icon: <BookOpen className="h-6 w-6" />,
    color: 'bg-amber-500',
    title: 'Personalized Learning',
    description: 'Access curated financial content tailored to your knowledge level and goals.',
    link: '/learn'
  },
  {
    icon: <Newspaper className="h-6 w-6" />,
    color: 'bg-rose-500',
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
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-finspire-50 rounded-bl-full opacity-70"></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-finspire-50 rounded-tr-full opacity-70"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <span className="inline-block px-3 py-1 rounded-full bg-finspire-100 text-finspire-800 text-xs font-medium mb-6 scroll-fade-in">
            Powerful Features
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight scroll-fade-in">
            Everything You Need for Your <span className="text-finspire-500">Financial Journey</span>
          </h2>
          <p className="text-lg text-slate-600 scroll-fade-in">
            Our comprehensive suite of tools is designed to help you understand, manage, and grow your finances with confidence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="relative group rounded-2xl p-8 border border-slate-200 bg-white hover:shadow-xl transition-all duration-500 scroll-fade-in hover:-translate-y-2"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`absolute top-0 left-0 w-full h-1 ${feature.color} rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
              <div className={`w-14 h-14 rounded-xl ${feature.color} bg-opacity-10 flex items-center justify-center mb-6 text-${feature.color.split('-')[1]}-500 group-hover:scale-110 transition-transform duration-300`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">{feature.title}</h3>
              <p className="text-slate-600 mb-5">{feature.description}</p>
              <Link 
                to={feature.link} 
                className="inline-flex items-center text-sm font-medium text-finspire-600 hover:text-finspire-700 transition-colors group/link"
              >
                Learn more <ChevronRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-1" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
