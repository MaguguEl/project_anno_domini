import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, Search, User, Menu, X } from 'lucide-react';

interface MobileTopBarProps {
  onMenuClick: () => void;
}

const MobileTopBar: React.FC<MobileTopBarProps> = ({ onMenuClick }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

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

        {/* Inline Search Bar for Quick Search */}
        <form onSubmit={handleSearchSubmit} className="mt-3">
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2">
              <Search className="w-4 h-4 text-navy-400 dark:text-navy-500" />
            </div>
            <input
              type="text"
              placeholder="Search events, figures, documents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearchKeyDown}
              className="w-full pl-10 pr-3 py-2 bg-gray-50 dark:bg-navy-900 rounded-lg text-navy-800 dark:text-navy-100 placeholder-navy-500 dark:placeholder-navy-400 border border-gray-300 dark:border-navy-700 focus:ring-2 focus:ring-burgundy-500 focus:border-transparent outline-none text-sm"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1"
                aria-label="Clear search"
              >
                <X className="w-3 h-3 text-navy-400 dark:text-navy-500" />
              </button>
            )}
          </div>
          {searchQuery.trim() && (
            <button
              type="submit"
              className="w-full mt-2 py-2 bg-gradient-to-r from-burgundy-600 to-burgundy-700 hover:from-burgundy-700 hover:to-burgundy-800 text-white rounded-lg font-medium text-sm transition-all"
            >
              Search for "{searchQuery.trim()}"
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default MobileTopBar;