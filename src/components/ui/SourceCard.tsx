import React from 'react';
import { Link } from 'react-router-dom';
import { Category } from '../../types';
import { LucideIcon } from 'lucide-react';

interface SourceCardProps {
  category: Category;
  index?: number;
}

const SourceCard: React.FC<SourceCardProps> = ({ category, index = 0 }) => {
  const Icon = category.icon;
  
  return (
    <div className="bg-white text-navy-800 rounded-xl overflow-hidden shadow hover:shadow-lg transition-all hover:-translate-y-0.5 border border-gray-200 dark:border-navy-700 dark:bg-navy-800 dark:text-navy-100">
      <div className={`h-1 ${category.color}`} />
      <div className="p-4">
        <div className="flex items-center gap-3 mb-3">
          <div className={`${category.color} text-white rounded-lg p-2 shadow-sm`}>
            <Icon className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-serif leading-tight font-bold">
            <Link 
              to={`/sources/${category.id}`} 
              className="hover:text-burgundy-600 dark:hover:text-burgundy-400 transition-colors"
            >
              {category.title}
            </Link>
          </h3>
        </div>
        <p className="text-navy-600 dark:text-navy-300 text-sm leading-relaxed mb-3">
          {category.description.length > 90 
            ? `${category.description.substring(0, 90)}...` 
            : category.description}
        </p>
        <div className="flex justify-between items-center pt-3 border-t border-gray-100 dark:border-navy-700">
          <span className="text-navy-500 dark:text-navy-400 text-xs">
            {category.stats}
          </span>
          <Link 
            to={`/sources/${category.id}`} 
            className="text-burgundy-600 dark:text-burgundy-400 hover:text-burgundy-700 dark:hover:text-burgundy-300 transition-colors text-xs font-medium flex items-center gap-1"
          >
            Explore 
            <span className="text-lg">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SourceCard;