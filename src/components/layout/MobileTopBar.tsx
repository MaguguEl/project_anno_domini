import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Search, User, Menu } from 'lucide-react';

interface MobileTopBarProps {
  onMenuClick: () => void;
}

const MobileTopBar: React.FC<MobileTopBarProps> = ({ onMenuClick }) => {
  return (
    <div className="md:hidden sticky top-0 z-30 bg-white dark:bg-navy-800 border-b border-gray-200 dark:border-navy-700">
      <div className="px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Menu Button */}
          <button 
            onClick={onMenuClick}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-navy-700 transition-colors"
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6 text-navy-700 dark:text-navy-300" />
          </button>

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <Shield className="w-8 h-8 text-burgundy-700 dark:text-burgundy-300" />
            <div>
              <h1 className="text-base font-serif font-bold text-navy-800 dark:text-navy-100">
                Anno Domini
              </h1>
              <p className="text-xs text-navy-600 dark:text-navy-300">Church History Explorer</p>
            </div>
          </Link>

          {/* Search & User */}
          <div className="flex items-center gap-2">
            <Link 
              to="/search"
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-navy-700 transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5 text-navy-700 dark:text-navy-300" />
            </Link>
            <div className="w-8 h-8 rounded-full bg-burgundy-100 dark:bg-navy-700 flex items-center justify-center">
              <User className="w-5 h-5 text-burgundy-700 dark:text-burgundy-300" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileTopBar;