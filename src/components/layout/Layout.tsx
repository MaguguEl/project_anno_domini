import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import MobileTopBar from './MobileTopBar';
import MobileDrawer from './MobileDrawer';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  
  const isHomePage = location.pathname === '/';
  
  // If it's the homepage, render only content and footer (no navigation)
  if (isHomePage) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </div>
    );
  }
  
  // For all other pages, render with full navigation
  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900 overflow-hidden">
      {/* Desktop Sidebar - Fixed width, no collapse */}
      <aside className="hidden md:block w-64 flex-shrink-0">
        <div className="h-full">
          <Sidebar onClose={() => {}} />
        </div>
      </aside>

      {/* Mobile Drawer */}
      <MobileDrawer isOpen={isMobileDrawerOpen} onClose={() => setIsMobileDrawerOpen(false)} />
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile TopBar */}
        <MobileTopBar onMenuClick={() => setIsMobileDrawerOpen(true)} />
        
        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="min-h-full flex flex-col">
            {/* Page content */}
            <div className="flex-1">
              {children}
            </div>
            
            {/* Footer  */}
            <Footer />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;