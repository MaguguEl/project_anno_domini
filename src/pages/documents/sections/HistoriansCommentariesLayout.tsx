import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, BookOpen } from 'lucide-react';

interface Source {
  id: string;
  title: string;
  author?: string;
  century: number;
  hostedOn: string;
  type: string;
  summary: string;
  tags: string[];
  coverImage?: string;
}

interface HistoriansCommentariesLayoutProps {
  sources: Source[];
}

const HistoriansCommentariesLayout: React.FC<HistoriansCommentariesLayoutProps> = ({ sources }) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {sources.map((source) => (
        <Link
          key={source.id}
          to={`/sources/view/${source.id}`}
          className="group"
        >
          <div className="flex flex-col h-full">
            {/* Cover Image */}
            <div className="relative overflow-hidden rounded-lg mb-3 bg-gradient-to-br from-navy-100 to-navy-200 dark:from-navy-700 dark:to-navy-600">
              {source.coverImage ? (
                <img
                  src={source.coverImage}
                  alt={source.title}
                  className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                  style={{ aspectRatio: '2/3' }}
                />
              ) : (
                <div 
                  className="w-full flex items-center justify-center transition-transform duration-300 group-hover:scale-105"
                  style={{ aspectRatio: '2/3' }}
                >
                  <BookOpen className="w-12 h-12 text-navy-400 dark:text-navy-500" />
                </div>
              )}
              
              {/* Century Badge */}
              <div className="absolute top-2 right-2 bg-navy-800/90 backdrop-blur-sm text-white px-2 py-1 rounded text-xs font-bold">
                {source.century}th C.
              </div>
            </div>

            {/* Book Info */}
            <div className="flex-1 text-center">
              <h3 className="font-serif font-semibold text-navy-800 dark:text-navy-100 text-sm sm:text-base mb-1 line-clamp-2 group-hover:text-burgundy-600 dark:group-hover:text-burgundy-400 transition-colors">
                {source.title}
              </h3>
              
              {source.author && (
                <p className="font-serif text-navy-600 dark:text-navy-400 text-xs sm:text-sm mb-2">
                  {source.author}
                </p>
              )}

              {/* Type Badge */}
              <div className="flex justify-center mb-2">
                <span className="inline-block px-2.5 py-1 bg-gradient-to-r from-gray-100 to-gray-50 dark:from-navy-700 dark:to-navy-600 text-navy-700 dark:text-navy-300 rounded-full text-xs font-medium capitalize">
                  {source.type}
                </span>
              </div>

              {/* Hosted On */}
              <div className="flex items-center justify-center gap-1 text-xs text-navy-500 dark:text-navy-400">
                <Calendar size={10} />
                <span className="truncate">{source.hostedOn}</span>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default HistoriansCommentariesLayout;