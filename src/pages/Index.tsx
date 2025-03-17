import React, { useEffect, useRef, useState, lazy, Suspense } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Features from '@/components/home/Features';
import ChatInterface from '@/components/chatbot/ChatInterface';
import PortfolioChart from '@/components/portfolio/PortfolioChart';
import ExpenseTracker from '@/components/expenses/ExpenseTracker';
import NewsFeed from '@/components/news/NewsFeed';

// Lazily load 3D components
const Hero3D = lazy(() => import('@/components/home/Hero3D'));
const PortfolioRisk3D = lazy(() => import('@/components/portfolio/PortfolioRisk3D'));

// Fallback for 3D components when they fail to load
const Hero3DFallback = () => (
  <div className="min-h-[70vh] flex items-center justify-center bg-blue-50">
    <div className="text-center p-8">
      <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900 mb-6">
        Your Personal AI Financial Guide
      </h1>
      <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-8">
        Empowering financial literacy through intelligent conversations and practical tools.
      </p>
      <button className="px-6 py-3 bg-finspire-500 text-white rounded-full">
        Get Started
      </button>
    </div>
  </div>
);

const Portfolio3DFallback = () => (
  <div className="w-full max-w-5xl mx-auto bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
    <h2 className="text-2xl font-semibold text-slate-900 mb-4">Risk Assessment</h2>
    <p className="text-slate-600 mb-4">Unable to load 3D visualization. Please try again later.</p>
  </div>
);

// Add a font loader for 3D text
const FontLoader = () => {
  useEffect(() => {
    // Create a directory for fonts if it doesn't exist
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Inter:wght@400;500;600&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    
    return () => {
      document.head.removeChild(link);
    };
  }, []);
  
  return null;
};

const Index = () => {
  // State to track if 3D content should be shown
  const [show3D, setShow3D] = useState(false);
  
  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
    
    // Delay loading 3D content to improve initial page load
    const timer = setTimeout(() => {
      setShow3D(true);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <FontLoader />
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <Suspense fallback={<Hero3DFallback />}>
          {show3D ? <Hero3D /> : <Hero3DFallback />}
        </Suspense>
        
        {/* Features Section */}
        <Features />
        
        {/* ChatBot Demo Section */}
        <section className="py-20 md:py-32 bg-gradient-to-b from-white to-slate-50">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block px-3 py-1 rounded-full bg-finspire-100 text-finspire-800 text-xs font-medium mb-6">
                AI-Powered Assistance
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 tracking-tight">
                Get Expert Financial Guidance Through Natural Conversation
              </h2>
              <p className="text-lg text-slate-600">
                Ask questions, get personalized advice, and learn about complex financial topics in a simple, conversational way.
              </p>
            </div>
            
            <ChatInterface />
          </div>
        </section>
        
        {/* Portfolio Section */}
        <section className="py-20 md:py-32 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block px-3 py-1 rounded-full bg-finspire-100 text-finspire-800 text-xs font-medium mb-6">
                Smart Portfolio Tracking
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 tracking-tight">
                Visualize and Optimize Your Investment Portfolio
              </h2>
              <p className="text-lg text-slate-600">
                Monitor performance, analyze asset allocation, and get personalized recommendations to improve your investment strategy.
              </p>
            </div>
            
            <div className="space-y-12">
              <PortfolioChart />
              
              <Suspense fallback={<Portfolio3DFallback />}>
                {show3D ? <PortfolioRisk3D /> : <Portfolio3DFallback />}
              </Suspense>
            </div>
          </div>
        </section>
        
        {/* Expense Tracking Section */}
        <section className="py-20 md:py-32 bg-slate-50">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block px-3 py-1 rounded-full bg-finspire-100 text-finspire-800 text-xs font-medium mb-6">
                Expense Management
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 tracking-tight">
                Track, Analyze, and Optimize Your Spending
              </h2>
              <p className="text-lg text-slate-600">
                Gain insights into your spending habits, identify areas to save, and reach your financial goals faster.
              </p>
            </div>
            
            <ExpenseTracker />
          </div>
        </section>
        
        {/* News Feed Section */}
        <section className="py-20 md:py-32 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block px-3 py-1 rounded-full bg-finspire-100 text-finspire-800 text-xs font-medium mb-6">
                Personalized News
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 tracking-tight">
                Stay Informed with Curated Financial News
              </h2>
              <p className="text-lg text-slate-600">
                Get the latest news, insights, and analysis relevant to your financial interests and goals.
              </p>
            </div>
            
            <NewsFeed />
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 bg-finspire-900 text-white">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Take Control of Your Financial Future?
              </h2>
              <p className="text-xl text-finspire-100 mb-10 max-w-2xl mx-auto">
                Join thousands of users who are making smarter financial decisions with Finspire.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button className="bg-white text-finspire-900 hover:bg-finspire-50 px-8 py-3 rounded-full font-medium transition-colors">
                  Get Started — It's Free
                </button>
                <button className="bg-transparent border border-white/30 hover:bg-white/10 px-8 py-3 rounded-full font-medium transition-colors">
                  Book a Demo
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
