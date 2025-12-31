import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  
  // Check if current route is the homepage
  const isHomePage = location.pathname === '/';
  
  return (
    <div className="flex h-screen bg-slate-50 dark:bg-navy-900">
      {/* Mobile Sidebar - slides in from right and fills screen */}
      <div className={`fixed inset-0 z-50 transform ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out md:hidden`}>
        <Sidebar onClose={() => setIsSidebarOpen(false)} />
      </div>
      
      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Conditionally render Header - hide on homepage */}
        {!isHomePage && <Header onMenuClick={() => setIsSidebarOpen(true)} />}
        
        {/* Main Scrollable Area */}
        <main className={`flex-1 overflow-auto ${isHomePage ? 'pt-0' : ''}`}>
          {children}
          <Footer />
        </main>
        
      </div>
    </div>
  );
};

export default Layout;