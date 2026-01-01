import React from 'react';
import HeroSection from './HeroSection';
import MainContentSection from './MainContentSection';

const Homepage = () => {
  return (
    <div className="min-h-screen bg-[#ebe9e1]">
      <HeroSection />
      <MainContentSection />
    </div>
  );
};

export default Homepage;