import React from 'react';
import { Folder,  Calendar, ExternalLink } from 'lucide-react';
import { FederatedSource } from '../../../types';

interface ArchiveLinksLayoutProps {
  sources: FederatedSource[];
}

const ArchiveLinksLayout: React.FC<ArchiveLinksLayoutProps> = ({ sources }) => {
  // Function to get folder color based on index or type
  const getFolderColor = (index: number) => {
    const colors = [
      'text-blue-500 dark:text-blue-400',
      'text-purple-500 dark:text-purple-400',
      'text-emerald-500 dark:text-emerald-400',
      'text-amber-500 dark:text-amber-400',
      'text-rose-500 dark:text-rose-400',
      'text-cyan-500 dark:text-cyan-400',
      'text-indigo-500 dark:text-indigo-400',
      'text-pink-500 dark:text-pink-400',
      'text-teal-500 dark:text-teal-400',
      'text-orange-500 dark:text-orange-400',
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
      {sources.map((source, index) => (
        <div key={source.id} className="group">
          <a
            href={source.externalUrl || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <div className="flex flex-col items-center text-center h-full p-2 sm:p-3 transition-all">
              {/* Folder Icon */}
              <div className="relative mb-2 sm:mb-3 transition-transform duration-300 group-hover:scale-110">
                <Folder 
                  className={`w-16 h-16 sm:w-20 sm:h-20 ${getFolderColor(index)} transition-colors`}
                  fill="currentColor"
                  strokeWidth={0.5}
                />
                {/* External Link Badge */}
               <div className="absolute -top-1 -right-1 w-5 h-5 sm:w-6 sm:h-6 bg-navy-700 dark:bg-navy-600 rounded-full flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ExternalLink className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white" />
                </div>
              </div>

              {/* Folder Label */}
              <div className="w-full px-1">
                <h3 className="font-serif font-bold text-navy-800 dark:text-navy-100 text-xs sm:text-sm mb-1 line-clamp-2 group-hover:text-burgundy-600 dark:group-hover:text-burgundy-400 transition-colors">
                  {source.title}
                </h3>

                {source.author && (
                  <p className="text-xs text-navy-600 dark:text-navy-400 mb-1 sm:mb-2 line-clamp-1">
                    {source.author}
                  </p>
                )}

                {/* Metadata */}
                <div className="flex flex-col gap-1 text-xs text-navy-500 dark:text-navy-400 mb-1 sm:mb-2">
                  <div className="flex items-center justify-center gap-1">
                    <Calendar size={10} />
                    <span>{source.century}th Century</span>
                  </div>
                  <div className="text-[10px] sm:text-xs text-navy-400 dark:text-navy-500 line-clamp-1">
                    {source.hostedOn}
                  </div>
                </div>

                {/* Type Badge */}
                <div className="flex justify-center">
                  <span className="inline-block px-2 py-0.5 bg-gradient-to-r from-gray-100 to-gray-50 dark:from-navy-700 dark:to-navy-600 text-navy-700 dark:text-navy-300 rounded text-xs font-medium capitalize">
                    {source.type}
                  </span>
                </div>
              </div>
            </div>
          </a>
          
          {/* Optional: Host info */}
          <div className="mt-1 text-center">
            <span className="text-[10px] sm:text-xs text-navy-500 dark:text-navy-400">
              Hosted on {source.hostedOn}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ArchiveLinksLayout;