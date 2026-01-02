import React, { useState, useEffect } from 'react';
import { Calendar, ChevronDown } from 'lucide-react';

const StickyRibbon = () => {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.getElementById('hero-section');
      if (heroSection) {
        const heroBottom = heroSection.getBoundingClientRect().bottom;
        setIsSticky(heroBottom <= 0);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToContent = () => {
    document.getElementById('main-content')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className={`w-full bg-[#8b2332] text-white py-3 shadow-lg transition-all duration-300 ${
      isSticky 
        ? 'fixed top-0 left-0 right-0 z-50 animate-in slide-in-from-top duration-300' 
        : 'absolute bottom-0 left-0 right-0'
    }`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-sm lg:text-lg font-serif font-semibold whitespace-nowrap">
              Today in Church History
            </h2>
          </div>
          
          <button
            onClick={scrollToContent}
            className="flex items-center gap-1 px-3 py-1.5 bg-white/20 hover:bg-white/30 rounded-full transition-all duration-300 group text-sm flex-shrink-0 ml-2"
          >
            <span className="font-medium">
              {isSticky ? 'View' : 'Explore'}
            </span>
            <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${
              isSticky ? 'group-hover:translate-y-0.5' : 'group-hover:translate-y-0.5'
            }`} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default StickyRibbon;