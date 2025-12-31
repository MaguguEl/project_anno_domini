import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Download, BookmarkPlus, Users, Calendar, Tag, Globe, FileText, Check } from 'lucide-react';
import { getSourceById } from '../data/federatedSources';

const SourceDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const source = id ? getSourceById(id) : null;
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showBookmarkSuccess, setShowBookmarkSuccess] = useState(false);

  if (!source) {
    return (
      <div className="min-h-screen bg-white dark:bg-slate-900 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center py-16">
            <h1 className="text-3xl font-serif text-blue-900 dark:text-blue-300 mb-4">
              Source Not Found
            </h1>
            <p className="text-slate-600 dark:text-slate-300 mb-8 text-lg">
              The source you're looking for doesn't exist or has been removed.
            </p>
            <Link to="/sources" className="inline-block px-6 py-3 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors">
              Return to Sources
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    setShowBookmarkSuccess(true);
    setTimeout(() => setShowBookmarkSuccess(false), 2000);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-blue-900 to-blue-800 dark:from-blue-950 dark:to-blue-900 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Link to={`/sources/${source.category}`} className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-8 transition-colors">
            <ArrowLeft size={20} />
            <span>Back to {source.category.replace('-', ' ')}</span>
          </Link>
          
          <div className="flex flex-wrap items-center gap-4 text-blue-200 text-lg mb-6">
            <div className="flex items-center gap-2">
              <Calendar size={18} />
              <span>{source.century}th Century</span>
            </div>
            {source.author && (
              <>
                <span>•</span>
                <div className="flex items-center gap-2">
                  <Users size={18} />
                  <span>{source.author}</span>
                </div>
              </>
            )}
            <span>•</span>
            <div className="flex items-center gap-2">
              <Globe size={18} />
              <span>{source.hostedOn}</span>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-serif mb-6 leading-tight">{source.title}</h1>
          
          <div className="flex flex-wrap gap-3">
            <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium capitalize">
              {source.type}
            </span>
            <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium capitalize">
              {source.category.replace('-', ' ')}
            </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <article className="prose prose-lg max-w-none mb-12">
              <h2 className="text-3xl font-serif text-blue-900 dark:text-blue-300 mb-6 pb-3 border-b-2 border-blue-200 dark:border-blue-800">
                About This Source
              </h2>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-lg">
                {source.summary}
              </p>
            </article>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 mb-12 pb-12 border-b-2 border-slate-200 dark:border-slate-800">
              <a
                href={source.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-700 hover:bg-blue-800 text-white rounded-lg transition-colors"
              >
                <ExternalLink size={18} />
                View on {source.hostedOn}
              </a>
              
              <button 
                onClick={handleBookmark}
                className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg transition-colors ${
                  isBookmarked 
                    ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300' 
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-300'
                }`}
              >
                {isBookmarked ? <Check size={18} /> : <BookmarkPlus size={18} />}
                {isBookmarked ? 'Bookmarked' : 'Bookmark'}
              </button>

              {showBookmarkSuccess && (
                <div className="flex items-center gap-2 px-4 py-3 bg-emerald-100 text-emerald-700 rounded-lg dark:bg-emerald-900/30 dark:text-emerald-300">
                  <Check size={16} />
                  <span>{isBookmarked ? 'Added to bookmarks!' : 'Removed from bookmarks'}</span>
                </div>
              )}
            </div>

            {/* Download Options */}
            {source.downloadFormats && source.downloadFormats.length > 0 && (
              <div className="mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <Download className="w-6 h-6 text-blue-700 dark:text-blue-300" />
                  <h2 className="text-2xl font-serif text-blue-900 dark:text-blue-300">
                    Download Options
                  </h2>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                  {source.downloadFormats.map(format => (
                    <button
                      key={format}
                      className="flex items-center justify-center gap-2 p-4 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                    >
                      <FileText size={18} />
                      <span className="font-medium">{format.toUpperCase()}</span>
                    </button>
                  ))}
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Downloads provided by {source.hostedOn}. Please respect copyright and usage terms.
                </p>
              </div>
            )}

            {/* Usage Guidelines */}
            <div className="bg-blue-50 dark:bg-slate-800 rounded-lg p-8">
              <h3 className="text-xl font-serif text-blue-900 dark:text-blue-300 mb-4">
                Usage Guidelines
              </h3>
              <div className="space-y-3 text-slate-700 dark:text-slate-300">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p>This source is hosted externally on {source.hostedOn}</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p>Please respect the hosting site's terms of use and copyright policies</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p>For academic use, please cite both the original source and the hosting platform</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-10">
            {/* Source Info */}
            <aside className="bg-blue-50 dark:bg-slate-800 rounded-lg p-6">
              <h2 className="text-xl font-serif text-blue-900 dark:text-blue-300 mb-6">
                Source Information
              </h2>
              <dl className="space-y-4">
                <div>
                  <dt className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">
                    Time Period
                  </dt>
                  <dd className="text-slate-900 dark:text-slate-100">
                    {source.century}th Century
                    {source.date && <span className="text-slate-600 dark:text-slate-400 ml-2">({source.date})</span>}
                  </dd>
                </div>
                
                <div>
                  <dt className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">
                    Type
                  </dt>
                  <dd className="text-slate-900 dark:text-slate-100 capitalize">
                    {source.type}
                  </dd>
                </div>

                <div>
                  <dt className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">
                    Hosted On
                  </dt>
                  <dd className="text-slate-900 dark:text-slate-100">
                    {source.hostedOn}
                  </dd>
                </div>
              </dl>
            </aside>

            {/* Tags */}
            <aside>
              <h3 className="text-xl font-serif text-blue-900 dark:text-blue-300 mb-4 pb-2 border-b-2 border-blue-200 dark:border-blue-800">
                Tags & Topics
              </h3>
              <div className="flex flex-wrap gap-2">
                {source.tags.map(tag => (
                  <Link
                    key={tag}
                    to={`/sources/topic/${tag}`}
                    className="px-3 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </aside>

            {/* Related People */}
            {source.relatedPeople.length > 0 && (
              <aside>
                <h3 className="text-xl font-serif text-blue-900 dark:text-blue-300 mb-4 pb-2 border-b-2 border-blue-200 dark:border-blue-800">
                  Related People
                </h3>
                <div className="space-y-2">
                  {source.relatedPeople.map(person => (
                    <Link
                      key={person}
                      to={`/figures/${person}`}
                      className="block py-2 px-3 rounded-md hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-blue-700 dark:text-blue-300"
                    >
                      {person.replace('-', ' ')}
                    </Link>
                  ))}
                </div>
              </aside>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};


export default SourceDetailPage;