
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-50 border-t border-slate-200/80 pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-16">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center space-x-2 text-xl font-medium mb-4">
              <div className="w-8 h-8 rounded-lg bg-finspire-500 flex items-center justify-center text-white font-semibold">F</div>
              <span className="text-slate-900">Finspire</span>
            </Link>
            <p className="text-slate-600 text-sm mb-4 max-w-xs">
              Empowering financial literacy through AI-powered tools and personalized guidance.
            </p>
            <div className="flex space-x-4">
              {['twitter', 'facebook', 'instagram', 'linkedin'].map((social) => (
                <a 
                  key={social}
                  href={`#${social}`} 
                  className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-finspire-100 hover:text-finspire-600 transition-colors"
                >
                  <span className="sr-only">{social}</span>
                  <div className="w-4 h-4"></div>
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-slate-900 mb-4 uppercase tracking-wider">Product</h3>
            <ul className="space-y-3">
              {['Features', 'How it works', 'Pricing', 'FAQ'].map((item) => (
                <li key={item}>
                  <Link to="#" className="text-slate-600 hover:text-finspire-600 text-sm transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-slate-900 mb-4 uppercase tracking-wider">Company</h3>
            <ul className="space-y-3">
              {['About us', 'Blog', 'Careers', 'Contact', 'Press'].map((item) => (
                <li key={item}>
                  <Link to="#" className="text-slate-600 hover:text-finspire-600 text-sm transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-slate-900 mb-4 uppercase tracking-wider">Subscribe</h3>
            <p className="text-slate-600 text-sm mb-4">
              Stay up to date with the latest financial insights and updates.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-white border border-slate-200 rounded-l-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-finspire-300 focus:border-transparent"
              />
              <Button className="rounded-l-none bg-finspire-500 hover:bg-finspire-600">
                <ArrowRight size={16} />
              </Button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-slate-200/80 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-500 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Finspire. All rights reserved.
          </p>
          <div className="flex space-x-6">
            {['Privacy Policy', 'Terms of Service', 'Cookies Policy'].map((item) => (
              <Link key={item} to="#" className="text-slate-500 hover:text-finspire-600 text-sm transition-colors">
                {item}
              </Link>
            ))}
          </div>
          <button
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 w-10 h-10 bg-white rounded-full shadow-lg border border-slate-200 flex items-center justify-center text-slate-500 hover:text-finspire-600 transition-colors z-10"
            aria-label="Scroll to top"
          >
            <ArrowUp size={18} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
