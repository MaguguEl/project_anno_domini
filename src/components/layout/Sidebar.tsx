import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {  
  Calendar, 
  Clock, 
  Users, 
  FileText, 
  Library,
  X,
  Sun,
  Moon,
  HomeIcon,
  MessageSquare,
  Shield
} from 'lucide-react';

interface SidebarProps {
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onClose }) => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  const navItems = [
    { path: '/', icon: HomeIcon, label: 'Home' },
    { path: '/figures', icon: Users, label: 'Fathers' },
    { path: '/documents', icon: FileText, label: 'Documents' },
    { path: '/timeline', icon: Clock, label: 'Timeline' },
    { path: '/eras', icon: Calendar, label: 'Eras' },
    { path: '/quotes', icon: MessageSquare, label: 'Quotes' },
    { path: '/sources', icon: Library, label: 'Sources' }
  ];
  
  return (
    <div className="w-full h-full flex flex-col" style={{ backgroundColor: 'var(--global-bg)' }}>
      {/* Header with close button */}
      <div className="p-6 border-b border-gray-200 dark:border-navy-700 flex-shrink-0">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3" onClick={onClose}>
            <Shield className="w-8 h-8 text-burgundy-700 dark:text-burgundy-300" />
            <div>
              <h1 className="text-xl font-serif font-bold text-navy-800 dark:text-navy-100">
                Anno Domini
              </h1>
              <p className="text-xs text-navy-600 dark:text-navy-300">
                Church History Explorer
              </p>
            </div>
          </Link>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-navy-700 transition-colors"
            aria-label="Close menu"
          >
            <X className="w-6 h-6 text-navy-600 dark:text-navy-300" />
          </button>
        </div>
      </div>
      
      {/* Navigation - scrollable content */}
      <div className="flex-1 overflow-y-auto">
        <nav className="p-4 space-y-2">
          {navItems.map(({ path, icon: Icon, label }) => (
            <Link
              key={path}
              to={path}
              onClick={onClose}
              className={`flex items-center gap-3 px-4 py-4 rounded-lg transition-colors text-xl ${
                isActive(path) || 
                (path === '/sources' && location.pathname.startsWith('/sources/')) ||
                (path === '/quotes' && location.pathname.startsWith('/quotes/'))
                  ? 'bg-burgundy-50 text-burgundy-700 dark:bg-navy-700 dark:text-burgundy-300'
                  : 'text-navy-600 hover:bg-gray-50 dark:text-navy-300 dark:hover:bg-navy-700'
              }`}
            >
              <Icon size={24} />
              <span className="font-medium">{label}</span>
            </Link>
          ))}
        </nav>
      </div>
      
      {/* Footer with theme toggle */}
      <div className="p-4 border-t border-gray-200 dark:border-navy-700 flex-shrink-0">
        {/* <button
          onClick={() => {
            toggleTheme();
            onClose();
          }}
          className="flex items-center gap-3 px-4 py-4 rounded-lg transition-colors text-navy-600 hover:bg-gray-50 dark:text-navy-300 dark:hover:bg-navy-700 w-full text-lg"
        >
          {theme === 'light' ? (
            <>
              <Moon size={24} />
              <span className="font-medium">Dark Mode</span>
            </>
          ) : (
            <>
              <Sun size={24} />
              <span className="font-medium">Light Mode</span>
            </>
          )}
        </button> */}
      </div>
    </div>
  );
};

export default Sidebar;