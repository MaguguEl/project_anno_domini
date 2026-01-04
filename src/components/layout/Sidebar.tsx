import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { 
  Shield, 
  Search, 
  Calendar, 
  Clock, 
  Users,  
  Library, 
  MessageSquare, 
  Home,
  User
} from 'lucide-react';

interface SidebarProps {
  onClose: () => void;
  userName?: string;
  userEmail?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  onClose, 
  userName = "Guest User",
  userEmail = "guest@example.com"
}) => {
  const location = useLocation();
  
  const navItems = [
    { path: '/feed', icon: Home, label: 'Feed' },
    { path: '/timeline', icon: Clock, label: 'Timelines' },
    { path: '/figures', icon: Users, label: 'Figures' },
    { path: '/documents', icon: Library, label: 'Library' },
    { path: '/eras', icon: Calendar, label: 'Eras' },
    { path: '/quotes', icon: MessageSquare, label: 'Quotes' },
  ];

  const isActive = (path: string) => {
    if (path === '/documents' && location.pathname.startsWith('/documents')) {
      return true;
    }
    if (path === '/eras' && location.pathname.startsWith('/eras')) {
      return true;
    }
    if (path === '/quotes' && location.pathname.startsWith('/quotes')) {
      return true;
    }
    return location.pathname === path;
  };

  return (
    <div className="w-64 h-full flex flex-col bg-white dark:bg-navy-800 border-r border-gray-200 dark:border-navy-700">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-navy-700 flex-shrink-0">
        <Link to="/" className="flex items-center gap-2" onClick={onClose}>
          <Shield className="w-8 h-8 text-burgundy-700 dark:text-burgundy-300" />
          <div>
            <h1 className="text-sm font-serif font-bold text-navy-800 dark:text-navy-100">
              Anno Domini
            </h1>
            <p className="text-xs text-navy-600 dark:text-navy-300">
              Church History
            </p>
          </div>
        </Link>
      </div>

      {/* Search */}
      <div className="p-4 flex-shrink-0">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-400 dark:text-navy-500" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-9 pr-3 py-2 bg-gray-50 dark:bg-navy-900 rounded-lg text-sm text-navy-800 dark:text-navy-100 placeholder-navy-400 dark:placeholder-navy-500 border border-navy-200 dark:border-navy-700 focus:ring-2 focus:ring-burgundy-500 focus:border-burgundy-500 outline-none"
          />
        </div>
      </div>
      
      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-2">
        <nav className="space-y-1 px-3">
          {navItems.map(({ path, icon: Icon, label }) => {
            const active = isActive(path);
            return (
              <Link
                key={path}
                to={path}
                onClick={onClose}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  active
                    ? 'font-bold bg-active text-burgundy-700'
                    : ' text-navy-700 hover:bg-active hover:text-burgundy-700'
                }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <span className="text-base truncate">{label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
      
      {/* Profile Footer */}
      <div className="p-4 border-t border-gray-200 dark:border-navy-700 flex-shrink-0">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-burgundy-500 to-burgundy-700 flex items-center justify-center shadow-sm flex-shrink-0">
            <User className="w-5 h-5 text-white" />
          </div>
          
          {/* User Info */}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-navy-800 dark:text-navy-100 truncate">
              {userName}
            </p>
            <p className="text-xs text-navy-500 dark:text-navy-400 truncate">
              {userEmail}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;