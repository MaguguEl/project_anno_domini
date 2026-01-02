import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { 
  Shield, 
  Calendar, 
  Clock, 
  Users, 
  FileText, 
  Library, 
  MessageSquare, 
  Home, 
  X,
  Search
} from 'lucide-react';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileDrawer: React.FC<MobileDrawerProps> = ({ isOpen, onClose }) => {
  const location = useLocation();
  
  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/figures', icon: Users, label: 'Fathers' },
    { path: '/documents', icon: FileText, label: 'Texts' },
    { path: '/timeline', icon: Clock, label: 'Timelines' },
    { path: '/eras', icon: Calendar, label: 'Eras' },
    { path: '/quotes', icon: MessageSquare, label: 'Quotes' },
    { path: '/sources', icon: Library, label: 'Sources' }
  ];

  const isActive = (path: string) => {
    if (path === '/sources' && location.pathname.startsWith('/sources')) {
      return true;
    }
    if (path === '/quotes' && location.pathname.startsWith('/quotes')) {
      return true;
    }
    return location.pathname === path;
  };

  return (
    <div 
      className={`fixed inset-0 z-50 md:hidden transform transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm" 
        onClick={onClose} 
      />
      
      {/* Drawer */}
      <div className="absolute inset-y-0 left-0 w-72 bg-white dark:bg-navy-800 border-r border-gray-200 dark:border-navy-700 shadow-xl">
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-gray-200 dark:border-navy-700">
            <div className="flex items-center justify-between mb-4">
              <Link to="/" className="flex items-center gap-3" onClick={onClose}>
                <Shield className="w-8 h-8 text-burgundy-700 dark:text-burgundy-300" />
                <div>
                  <h1 className="text-lg font-serif font-bold text-navy-800 dark:text-navy-100">
                    Anno Domini
                  </h1>
                  <p className="text-xs text-navy-600 dark:text-navy-300">
                    Church History Explorer
                  </p>
                </div>
              </Link>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 dark:hover:bg-navy-700 rounded-lg transition-colors"
                aria-label="Close menu"
              >
                <X className="w-5 h-5 text-navy-600 dark:text-navy-300" />
              </button>
            </div>
            
            {/* Search inside drawer */}
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2">
                <Search className="w-4 h-4 text-navy-400 dark:text-navy-500" />
              </div>
              <input
                type="text"
                placeholder="Search"
                className="w-full pl-9 pr-3 py-2 bg-gray-50 dark:bg-navy-900 rounded-lg text-sm text-navy-800 dark:text-navy-100 placeholder-navy-400 dark:placeholder-navy-500 border border-gray-200 dark:border-navy-700 focus:ring-2 focus:ring-burgundy-500 focus:border-burgundy-500 outline-none"
              />
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-2">
            {navItems.map(({ path, icon: Icon, label }) => {
              const active = isActive(path);
              return (
                <Link
                  key={path}
                  to={path}
                  onClick={onClose}
                  className={`w-full flex items-center gap-3 px-4 py-3 mx-2 my-1 rounded-lg text-sm font-medium transition-colors ${
                    active
                      ? 'bg-burgundy-50 dark:bg-burgundy-900/30 text-burgundy-700 dark:text-burgundy-300'
                      : 'text-navy-700 dark:text-navy-300 hover:bg-gray-100 dark:hover:bg-navy-700'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{label}</span>
                </Link>
              );
            })}
          </nav>
          
          {/* Footer */}
          <div className="p-4 border-t border-gray-200 dark:border-navy-700">
            <div className="text-xs text-navy-600 dark:text-navy-400 text-center">
              © {new Date().getFullYear()} Anno Domini
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileDrawer;