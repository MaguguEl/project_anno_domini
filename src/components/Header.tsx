import React, { useState, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Sun, Moon, Search, Shield, } from 'lucide-react';
import { ThemeContext } from '../context/ThemeContext';
import SearchModal from './SearchModal';

interface HeaderProps {
  onMenuClick: () => void;
}

const navItems = [
  { path: '/', label: 'Home' },
  { path: '/figures', label: 'Fathers' },
  { path: '/documents', label: 'Documents' },
  { path: '/timeline', label: 'Timeline' },
  { path: '/eras', label: 'Eras' },
  { path: '/quotes', label: 'Quotes' },
  { path: '/sources', label: 'Sources' }
];

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const location = useLocation();
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  
  const isActive = (path: string) => {
    if (path === '/sources' && location.pathname.startsWith('/sources')) {
      return true;
    }
    if (path === '/quotes' && location.pathname.startsWith('/quotes')) {
      return true;
    }
    return location.pathname === path;
  };

  const handleSearchClick = () => {
    setIsSearchModalOpen(true);
  };

  return (
    <>
      <header className="shadow-md" style={{ backgroundColor: 'var(--global-bg)' }}>
        {/* Top Bar */}
        <div className="border-b border-gray-200 dark:border-navy-700" style={{ backgroundColor: 'var(--global-bg)' }}>
          <div className="container-max py-3">
            <div className="flex justify-between items-center">
              {/* Logo - Left side */}
              <Link to="/" className="flex items-center gap-2">
                <Shield className="w-8 h-8 text-burgundy-700 dark:text-burgundy-300" />
                <div>
                  <h1 className="text-xl font-serif font-bold text-navy-800 dark:text-navy-100">
                    Anno Domini
                  </h1>
                  <p className="text-xs text-navy-600 dark:text-navy-300">Church History Explorer</p>
                </div>
              </Link>
              
              {/* Search Bar - Center */}
              <div className="hidden md:block flex-1 max-w-2xl mx-8 relative">
                <button
                  onClick={handleSearchClick}
                  className="w-full py-2 px-4 pl-10 rounded-full border border-navy-200 dark:border-navy-700 bg-white dark:bg-navy-800 text-navy-400 dark:text-navy-500 text-left focus:outline-none focus:ring-2 focus:ring-burgundy-300 dark:focus:ring-burgundy-600 hover:bg-navy-50 dark:hover:bg-navy-700 transition-colors relative"
                >
                  Search events, figures, documents...
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                    <Search size={18} className="text-navy-400 dark:text-navy-500" />
                  </div>
                </button>
              </div>
              
              {/* User Controls - Right side */}
              <div className="flex items-center gap-3">
                {/* Mobile Search Button */}
                <button 
                  onClick={handleSearchClick}
                  className="md:hidden p-2 rounded-full hover:bg-slate-100 dark:hover:bg-navy-700 transition-colors"
                  aria-label="Search"
                >
                  <Search className="w-5 h-5 text-navy-700 dark:text-navy-300" />
                </button>
                
                {/* Theme toggle */}
                <button 
                  onClick={toggleTheme} 
                  className="hidden md:block p-2 rounded-full hover:bg-slate-100 dark:hover:bg-navy-700 transition-colors"
                  aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
                >
                  {theme === 'light' ? (
                    <Moon className="w-5 h-5 text-navy-700 dark:text-navy-300" />
                  ) : (
                    <Sun className="w-5 h-5 text-navy-300" />
                  )}
                </button>
                
                {/* User Avatar */}
                <div className="hidden md:block w-8 h-8 rounded-full bg-burgundy-100 dark:bg-navy-700 flex items-center justify-center cursor-pointer hover:bg-burgundy-200 dark:hover:bg-navy-600 transition-colors">
                  <span className="text-burgundy-700 dark:text-burgundy-300 font-medium text-sm">
                    U
                  </span>
                </div>
                
                {/* Mobile menu button */}
                <button 
                  className="p-2 md:hidden" 
                  onClick={onMenuClick}
                  aria-label="Toggle menu"
                >
                  <Menu className="w-6 h-6 text-navy-800 dark:text-navy-100" />
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Navigation Bar */}
        <div className="hidden md:block">
          <div className="container-max py-3" style={{ backgroundColor: 'var(--global-bg)' }}>
            <nav className="flex items-center justify-center">
              <div className="flex items-center gap-1">
                {navItems.map((item) => {
                  const active = isActive(item.path);
                  return (
                    <Link 
                      key={item.path}
                      to={item.path} 
                      className={`flex items-center gap-1 px-4 py-2 rounded-full text-base font-medium transition-colors ${
                        active 
                          ? 'bg-burgundy-50 dark:bg-navy-700 text-burgundy-700 dark:text-burgundy-300' 
                          : 'text-navy-700 dark:text-navy-300 hover:bg-navy-50 dark:hover:bg-navy-800'
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* Search Modal */}
      <SearchModal 
        isOpen={isSearchModalOpen} 
        onClose={() => setIsSearchModalOpen(false)} 
      />
    </>
  );
};

export default Header;