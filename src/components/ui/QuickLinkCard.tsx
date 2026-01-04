import React from 'react';
import { Link } from 'react-router-dom';

interface QuickLink {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  iconColor: string;
  path: string;
  count: string;
}

interface QuickLinkCardProps {
  link: QuickLink;
  index?: number;
}

const QuickLinkCard: React.FC<QuickLinkCardProps> = ({ link, index = 0 }) => {
  const Icon = link.icon;
  
  return (
    <Link to={link.path} className="group">
      <div className="bg-white dark:bg-navy-800 rounded-xl border-2 border-gray-200 dark:border-navy-700 p-4 sm:p-5 hover:shadow-lg transition-all duration-300 hover:border-gold-400 dark:hover:border-gold-600 group-hover:scale-[1.02]">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-br from-gray-50 to-gray-100 dark:from-navy-700 dark:to-navy-600">
              <Icon className={`w-5 h-5 ${link.iconColor}`} />
            </div>
            <h3 className="font-bold text-navy-800 dark:text-navy-100 text-sm sm:text-base">
              {link.title}
            </h3>
          </div>
        </div>
        <p className="text-xs text-navy-600 dark:text-navy-300 mb-3">
          {link.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-navy-500 dark:text-navy-400">
            {link.count}
          </span>
          <span className="text-xs font-semibold text-gold-700 dark:text-gold-400 group-hover:text-gold-800 dark:group-hover:text-gold-300">
            Open →
          </span>
        </div>
      </div>
    </Link>
  );
};

export default QuickLinkCard;