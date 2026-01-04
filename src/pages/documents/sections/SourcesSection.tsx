import React from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../../../context/DataContext';
import { Filter, Search, BookMarked, Clock, Tags } from 'lucide-react';
import SourceCard from '../../../components/ui/SourceCard';
import QuickLinkCard from '../../../components/ui/QuickLinkCard';

const SourcesSection: React.FC = () => {
  const { categories } = useData();
  
  const quickLinks = [
    {
      title: 'My Bookmarks',
      description: 'Access saved sources',
      icon: BookMarked,
      iconColor: 'text-gold-600 dark:text-gold-400',
      path: '/sources/bookmarks',
      count: '24 saved',
    },
    {
      title: 'Advanced Search',
      description: 'Find specific sources',
      icon: Search,
      iconColor: 'text-emerald-600 dark:text-emerald-400',
      path: '/sources/search',
      count: 'Search tools',
    },
    {
      title: 'Recently Viewed',
      description: 'Your history',
      icon: Clock,
      iconColor: 'text-purple-600 dark:text-purple-400',
      path: '/sources/recent',
      count: '12 recent',
    },
    {
      title: 'Browse by Topic',
      description: 'Organized themes',
      icon: Tags,
      iconColor: 'text-navy-700 dark:text-navy-300',
      path: '/sources/topics',
      count: '15 topics',
    },
  ];
  
  return (
    <div className="container-max py-6 sm:py-8 md:py-10 px-3 sm:px-4">
      {/* Categories Grid */}
      <div className="mb-10 sm:mb-12 md:mb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-navy-800 dark:text-navy-100">
            Source Collections
          </h2>
          <div className="hidden sm:flex items-center gap-2 text-sm font-semibold text-navy-600 dark:text-navy-300 bg-gradient-to-r from-gray-100 to-gray-50 dark:from-navy-700 dark:to-navy-600 px-4 py-2 rounded-full shadow-sm">
            <Filter size={14} />
            Browse all sources
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {categories.map((category, index) => (
            <SourceCard key={category.id} category={category} index={index} />
          ))}
        </div>
      </div>

      {/* Quick Access */}
      <div className="border-t border-gray-200 dark:border-navy-700 pt-10 sm:pt-12 md:pt-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-navy-800 dark:text-navy-100">
            Quick Access
          </h2>
          <div className="hidden sm:block text-sm text-navy-600 dark:text-navy-300">
            Frequently accessed tools
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {quickLinks.map((link, index) => (
            <QuickLinkCard key={index} link={link} index={index} />
          ))}
        </div>
      </div>

      {/* Additional Info */}
      <div className="mt-10 sm:mt-12 md:mt-16 p-5 sm:p-6 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-navy-800 dark:to-navy-700 rounded-xl border border-gray-200 dark:border-navy-600">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-bold text-navy-800 dark:text-navy-100 mb-2">
              Need help finding specific sources?
            </h3>
            <p className="text-sm text-navy-600 dark:text-navy-300">
              Use our advanced search or browse by topic to locate exactly what you need.
            </p>
          </div>
          <Link
            to="/sources/search"
            className="px-5 py-2.5 bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-navy-900 font-semibold rounded-lg transition-all shadow-md hover:shadow-lg whitespace-nowrap"
          >
            Start Searching
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SourcesSection;