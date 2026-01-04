import React from 'react';
import { Shield, Calendar, Users, MessageSquare, Library, Clock, Home } from 'lucide-react';
import SearchEngine from './utility/SearchEngine';
import NavButton from './utility/NavButton';
import StickyRibbon from './utility/StickyRibbon';

const HeroSection = () => {
  // Navigation buttons data array
  const navButtons = [
    {
      icon: <Home className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7" />,
      title: 'Home',
      to: '/feed'
    },
    {
      icon: <Clock className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7" />,
      title: 'Timelines',
      to: '/timeline'
    },
    {
      icon: <Users className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7" />,
      title: 'Figures',
      to: '/figures'
    },
    {
      icon: <Library className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7" />,
      title: 'Library',
      to: '/documents'
    },
    {
      icon: <Calendar className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7" />,
      title: 'Eras',
      to: '/eras'
    },
    {
      icon: <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7" />,
      title: 'Quotes',
      to: '/quotes'
    },
  ];

  return (
    <div id="hero-section" className="min-h-screen flex flex-col items-center justify-center px-4 py-8 sm:py-16 bg-[#ebe9e1] relative pb-16">
      {/* Logo/Shield Image */}
      <div className="mb-6 mt-4 sm:mb-8 sm:mt-0">
        <Shield className="w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 text-[#8b2332]" strokeWidth={1.5} />
      </div>

      {/* Title with decorative lines */}
      <div className="w-full max-w-4xl mb-6 sm:mb-8">
        <div className="flex items-center justify-center gap-2 mb-2">
          <div className="flex-1 h-px bg-[#8b2332] max-w-[15%] sm:max-w-xs"></div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-[#8b2332] text-center whitespace-nowrap px-2">
            ANNO DOMINI
          </h1>
          <div className="flex-1 h-px bg-[#8b2332] max-w-[15%] sm:max-w-xs"></div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="w-full max-w-3xl mb-8 px-2 sm:mb-12 sm:px-4">
        <SearchEngine />
      </div>

      {/* Smooth Navigation Buttons */}
      <div className="w-full max-w-6xl grid grid-cols-2 gap-2 px-2 sm:grid-cols-3 lg:grid-cols-6 lg:gap-4 lg:px-4">
        {navButtons.map((button, index) => (
          <NavButton
            key={index}
            icon={button.icon}
            title={button.title}
            to={button.to}
          />
        ))}
      </div>

      {/* Sticky Ribbon */}
      <StickyRibbon />
    </div>
  );
};

export default HeroSection;