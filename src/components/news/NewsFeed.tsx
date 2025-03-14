
import React, { useState, useEffect } from 'react';
import { ArrowRight, ChevronDown, Search, ExternalLink, Bookmark, BookmarkCheck, Share2, ThumbsUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// Sample data
const newsArticles = [
  {
    id: 1,
    title: 'RBI Announces New Policy Rates: What It Means For Your Loans',
    summary: 'The Reserve Bank of India has increased the repo rate by 25 basis points to 6.5%. Here\'s how it affects your existing and new loans.',
    source: 'Financial Express',
    date: '1 hour ago',
    imageUrl: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
    category: 'Banking',
    isBookmarked: false,
    readTime: '5 min read'
  },
  {
    id: 2,
    title: 'Top 5 Mutual Funds for Beginners in 2023',
    summary: 'Looking to start your investment journey? Here are the top 5 mutual funds that are perfect for beginners with low risk and steady returns.',
    source: 'Economic Times',
    date: '3 hours ago',
    imageUrl: 'https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
    category: 'Mutual Funds',
    isBookmarked: true,
    readTime: '7 min read'
  },
  {
    id: 3,
    title: 'Understanding Tax-Saving Investments: Section 80C Explained',
    summary: 'A comprehensive guide to Section 80C of the Income Tax Act and how you can save up to ₹46,800 in taxes through strategic investments.',
    source: 'LiveMint',
    date: '5 hours ago',
    imageUrl: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
    category: 'Taxation',
    isBookmarked: false,
    readTime: '10 min read'
  },
  {
    id: 4,
    title: 'Digital Rupee: India\'s CBDC Pilot Enters Second Phase',
    summary: 'The Reserve Bank of India\'s Central Bank Digital Currency (CBDC) pilot project enters its second phase with more banks joining the network.',
    source: 'Business Standard',
    date: '8 hours ago',
    imageUrl: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
    category: 'Cryptocurrency',
    isBookmarked: false,
    readTime: '6 min read'
  },
];

const categories = ['All', 'Stocks', 'Mutual Funds', 'Banking', 'Taxation', 'Cryptocurrency', 'Insurance', 'Economy'];

const NewsFeed = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [bookmarkedArticles, setBookmarkedArticles] = useState<number[]>([2]);
  
  const toggleBookmark = (id: number) => {
    setBookmarkedArticles(prev => 
      prev.includes(id) 
        ? prev.filter(articleId => articleId !== id) 
        : [...prev, id]
    );
  };
  
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
    <div className="w-full max-w-5xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-slate-900 mb-6">Financial News & Insights</h2>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex overflow-x-auto pb-2 sm:pb-0 -mx-2 sm:mx-0">
            {categories.map((category) => (
              <button
                key={category}
                className={cn(
                  "whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-medium mx-1 transition-colors",
                  activeCategory === category
                    ? "bg-finspire-500 text-white"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                )}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={16} />
            <input
              type="text"
              placeholder="Search articles..."
              className="bg-slate-50 border border-slate-200 rounded-lg pl-10 pr-4 py-2 w-full max-w-xs text-sm focus:outline-none focus:ring-2 focus:ring-finspire-300 focus:border-transparent"
            />
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {newsArticles.map((article) => (
          <div 
            key={article.id} 
            className="bg-white rounded-xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-shadow scroll-fade-in"
          >
            <div className="relative">
              <div className="progressive-img-container aspect-video">
                <img
                  src={article.imageUrl}
                  alt={article.title}
                  className="w-full h-full object-cover progressive-img-blur"
                  onLoad={(e) => e.currentTarget.classList.add('loaded')}
                />
              </div>
              <div className="absolute top-3 left-3">
                <span className="inline-block bg-white/90 backdrop-blur-sm text-xs font-medium text-slate-800 px-2.5 py-1 rounded-full">
                  {article.category}
                </span>
              </div>
              <button
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-slate-700 hover:text-finspire-600 transition-colors"
                onClick={() => toggleBookmark(article.id)}
              >
                {bookmarkedArticles.includes(article.id) ? (
                  <BookmarkCheck size={16} className="text-finspire-600" />
                ) : (
                  <Bookmark size={16} />
                )}
              </button>
            </div>
            
            <div className="p-5">
              <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
                <span>{article.source}</span>
                <span>{article.date}</span>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">{article.title}</h3>
              <p className="text-slate-600 text-sm mb-4">{article.summary}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500">{article.readTime}</span>
                <div className="flex items-center space-x-2">
                  <button className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-colors">
                    <Share2 size={14} />
                  </button>
                  <button className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-colors">
                    <ThumbsUp size={14} />
                  </button>
                  <button className="w-8 h-8 rounded-full bg-finspire-100 flex items-center justify-center text-finspire-600 hover:bg-finspire-200 transition-colors">
                    <ExternalLink size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="text-center mb-16">
        <Button variant="outline" className="rounded-full px-6 border-slate-300 text-slate-700">
          Load More <ChevronDown size={16} className="ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default NewsFeed;
