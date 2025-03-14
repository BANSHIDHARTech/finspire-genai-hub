
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
        isScrolled 
          ? "bg-white/80 backdrop-blur-lg border-slate-200/70 py-4" 
          : "bg-transparent border-transparent py-6"
      )}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link 
          to="/" 
          className="flex items-center space-x-2 text-xl font-medium tracking-tight"
        >
          <div className="w-8 h-8 rounded-lg bg-finspire-500 flex items-center justify-center text-white font-semibold">F</div>
          <span className={cn(
            "transition-colors duration-300",
            isScrolled ? "text-slate-900" : "text-slate-800"
          )}>
            Finspire
          </span>
        </Link>

        <nav className="hidden md:flex items-center space-x-8">
          {['Chatbot', 'Portfolio', 'Expenses', 'Learn', 'News'].map((item) => (
            <Link
              key={item}
              to={`/${item.toLowerCase()}`}
              className={cn(
                "text-sm font-medium transition-colors duration-200 relative group",
                isScrolled ? "text-slate-700 hover:text-finspire-600" : "text-slate-700 hover:text-finspire-500"
              )}
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-finspire-500 transition-all duration-200 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <Button 
            variant="outline" 
            className={cn(
              "rounded-full px-5",
              isScrolled 
                ? "border-slate-300 text-slate-700 hover:bg-slate-100 hover:text-slate-900" 
                : "border-slate-300/70 text-slate-700 hover:bg-white/20 hover:text-slate-900"
            )}
          >
            Log in
          </Button>
          <Button 
            className="rounded-full px-5 bg-finspire-500 hover:bg-finspire-600 text-white shadow-sm transition-all"
          >
            Get Started
          </Button>
        </div>

        <button 
          className="md:hidden text-slate-700" 
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-lg border-b border-slate-200 animate-slide-in-down">
          <div className="container mx-auto px-6 py-6 flex flex-col space-y-6">
            <nav className="flex flex-col space-y-4">
              {['Chatbot', 'Portfolio', 'Expenses', 'Learn', 'News'].map((item) => (
                <Link
                  key={item}
                  to={`/${item.toLowerCase()}`}
                  className="text-base font-medium text-slate-700 hover:text-finspire-500 transition-colors duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item}
                </Link>
              ))}
            </nav>
            <div className="flex flex-col space-y-3">
              <Button variant="outline" className="w-full justify-center border-slate-300">
                Log in
              </Button>
              <Button className="w-full justify-center bg-finspire-500 hover:bg-finspire-600">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
