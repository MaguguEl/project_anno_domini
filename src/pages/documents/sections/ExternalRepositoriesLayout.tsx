import React from 'react';
import { Calendar, ExternalLink, Globe, Tags } from 'lucide-react';
import { FederatedSource } from '../../../types';

interface ExternalRepositoriesLayoutProps {
  sources: FederatedSource[];
}

const ExternalRepositoriesLayout: React.FC<ExternalRepositoriesLayoutProps> = ({ sources }) => {
  return (
    <div className="space-y-0">
      {sources.map((source, index) => (
        <a
          key={source.id}
          href={source.externalUrl || '#'}
          target="_blank"
          rel="noopener noreferrer"
          className="block group"
        >
          <div className={`transition-all duration-200 ${
            index !== 0 ? 'border-t border-gray-200 dark:border-navy-700' : ''
          }`}>
            <div className="p-4 sm:p-5 hover:bg-active dark:hover:from-navy-800 dark:hover:to-navy-700">
              <div className="flex items-start gap-4">
                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h3 className="text-base sm:text-lg font-serif font-bold text-navy-800 dark:text-navy-100 group-hover:text-burgundy-600 dark:group-hover:text-burgundy-400 transition-colors">
                      {source.title}
                    </h3>
                    <ExternalLink className="w-4 h-4 text-navy-400 dark:text-navy-500 flex-shrink-0 mt-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  
                  <p className="text-sm sm:text-base text-navy-700 dark:text-navy-300 mb-3 leading-relaxed">
                    {source.summary}
                  </p>

                  {/* Metadata */}
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs sm:text-sm text-navy-500 dark:text-navy-400 mb-3">
                    <div className="flex items-center gap-1.5">
                      <Globe size={14} className="flex-shrink-0" />
                      <span className="font-medium">{source.hostedOn}</span>
                    </div>
                    {source.author && source.author !== 'Various' && source.author !== 'CCEL' && source.author !== 'Internet Archive' && (
                      <>
                        <span className="text-navy-300 dark:text-navy-600">•</span>
                        <span>{source.author}</span>
                      </>
                    )}
                    <span className="text-navy-300 dark:text-navy-600">•</span>
                    <div className="flex items-center gap-1">
                      <Calendar size={12} />
                      <span>{source.century}th Century</span>
                    </div>
                    <span className="text-navy-300 dark:text-navy-600">•</span>
                    <span className="capitalize">{source.type}</span>
                  </div>

                  {/* Tags */}
                  {source.tags.length > 0 && (
                    <div className="flex items-center gap-2">
                      <Tags size={12} className="text-navy-400 flex-shrink-0" />
                      <div className="flex flex-wrap gap-1.5">
                        {source.tags.slice(0, 5).map(tag => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 text-blue-700 dark:text-blue-300 rounded text-xs font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                        {source.tags.length > 5 && (
                          <span className="px-2 py-0.5 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-navy-700 dark:to-navy-600 text-navy-600 dark:text-navy-300 rounded text-xs font-medium">
                            +{source.tags.length - 5}
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
};

export default ExternalRepositoriesLayout;