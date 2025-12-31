import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Download, BookmarkPlus, Users, Calendar, Tag, Globe, FileText, Check } from 'lucide-react';
import { getSourceById } from '../../data/federatedSources';

const SourceDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const source = id ? getSourceById(id) : null;
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showBookmarkSuccess, setShowBookmarkSuccess] = useState(false);

  if (!source) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-navy-900 py-12">
        <div className="container-max">
          <div className="text-center">
            <h1 className="text-2xl font-serif text-navy-800 dark:text-navy-100 mb-4">
              Source Not Found
            </h1>
            <Link to="/sources" className="btn-primary">
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
    <div className="min-h-screen bg-slate-50 dark:bg-navy-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-burgundy-800 to-navy-900 text-white py-12">
        <div className="container-max">
          <div className="flex items-center gap-4 mb-6">
            <Link to={`/sources/${source.category}`} className="text-white/80 hover:text-white">
              <ArrowLeft size={24} />
            </Link>
            <div className="flex-1">
              <div className="flex items-center gap-4 text-burgundy-200 mb-2">
                <div className="flex items-center gap-1">
                  <Calendar size={16} />
                  <span>{source.century}th Century</span>
                </div>
                {source.author && (
                  <>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <Users size={16} />
                      <span>{source.author}</span>
                    </div>
                  </>
                )}
                <span>•</span>
                <div className="flex items-center gap-1">
                  <Globe size={16} />
                  <span>{source.hostedOn}</span>
                </div>
              </div>
              <h1 className="text-4xl font-serif mb-4">{source.title}</h1>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-white/10 rounded-full text-sm capitalize">
                  {source.type}
                </span>
                <span className="px-3 py-1 bg-white/10 rounded-full text-sm capitalize">
                  {source.category.replace('-', ' ')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container-max py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-navy-800 rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-2xl font-serif text-navy-800 dark:text-navy-100 mb-4">
                About this Source
              </h2>
              <div className="prose prose-navy dark:prose-invert max-w-none">
                <p className="text-lg text-navy-600 dark:text-navy-300 leading-relaxed mb-6">
                  {source.summary}
                </p>
                
                {/* Additional context based on source type */}
                {source.type === 'decree' && (
                  <div className="bg-burgundy-50 dark:bg-navy-700 p-4 rounded-lg mb-6">
                    <h3 className="text-lg font-serif text-burgundy-700 dark:text-burgundy-300 mb-2">
                      Historical Significance
                    </h3>
                    <p className="text-navy-700 dark:text-navy-300">
                      This decree represents a pivotal moment in church history, establishing 
                      doctrinal positions that would influence Christian theology for centuries to come.
                    </p>
                  </div>
                )}

                {source.type === 'book' && (
                  <div className="bg-gold-50 dark:bg-navy-700 p-4 rounded-lg mb-6">
                    <h3 className="text-lg font-serif text-gold-700 dark:text-gold-300 mb-2">
                      Literary Impact
                    </h3>
                    <p className="text-navy-700 dark:text-navy-300">
                      This work has been influential in shaping Christian thought and continues 
                      to be studied by theologians and historians today.
                    </p>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap gap-4 pt-6 border-t border-navy-200 dark:border-navy-700">
                <a
                  href={source.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary flex items-center gap-2"
                >
                  <ExternalLink size={18} />
                  View on {source.hostedOn}
                </a>
                
                <button 
                  onClick={handleBookmark}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
                    isBookmarked 
                      ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300' 
                      : 'bg-navy-100 hover:bg-navy-200 text-navy-700 dark:bg-navy-700 dark:hover:bg-navy-600 dark:text-navy-300'
                  }`}
                >
                  {isBookmarked ? <Check size={18} /> : <BookmarkPlus size={18} />}
                  {isBookmarked ? 'Bookmarked' : 'Bookmark'}
                </button>

                {showBookmarkSuccess && (
                  <div className="flex items-center gap-2 px-3 py-2 bg-emerald-100 text-emerald-700 rounded-md dark:bg-emerald-900 dark:text-emerald-300">
                    <Check size={16} />
                    <span className="text-sm">
                      {isBookmarked ? 'Added to bookmarks!' : 'Removed from bookmarks'}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Download Options */}
            {source.downloadFormats && source.downloadFormats.length > 0 && (
              <div className="bg-white dark:bg-navy-800 rounded-lg shadow-md p-6 mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <Download className="w-5 h-5 text-navy-600 dark:text-navy-300" />
                  <h2 className="text-xl font-serif text-navy-800 dark:text-navy-100">
                    Download Options
                  </h2>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {source.downloadFormats.map(format => (
                    <button
                      key={format}
                      className="flex items-center gap-2 p-3 bg-navy-50 dark:bg-navy-700 text-navy-700 dark:text-navy-300 rounded-lg hover:bg-navy-100 dark:hover:bg-navy-600 transition-colors"
                    >
                      <FileText size={18} />
                      <span className="font-medium">{format.toUpperCase()}</span>
                    </button>
                  ))}
                </div>
                <p className="text-sm text-navy-600 dark:text-navy-400 mt-4">
                  Downloads are provided by {source.hostedOn}. Please respect copyright and usage terms.
                </p>
              </div>
            )}

            {/* Usage Guidelines */}
            <div className="bg-white dark:bg-navy-800 rounded-lg shadow-md p-6">
              <h2 className="text-xl font-serif text-navy-800 dark:text-navy-100 mb-4">
                Usage Guidelines
              </h2>
              <div className="space-y-3 text-navy-600 dark:text-navy-300">
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-burgundy-700 dark:bg-burgundy-300 rounded-full mt-2"></div>
                  <p>This source is hosted externally on {source.hostedOn}</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-burgundy-700 dark:bg-burgundy-300 rounded-full mt-2"></div>
                  <p>Please respect the hosting site's terms of use and copyright policies</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-burgundy-700 dark:bg-burgundy-300 rounded-full mt-2"></div>
                  <p>For academic use, please cite both the original source and the hosting platform</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-burgundy-700 dark:bg-burgundy-300 rounded-full mt-2"></div>
                  <p>Report broken links or access issues to help maintain our collection</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Source Information */}
            <div className="bg-white dark:bg-navy-800 rounded-lg shadow-md p-6">
              <h2 className="text-xl font-serif text-navy-800 dark:text-navy-100 mb-4">
                Source Information
              </h2>
              <dl className="space-y-4">
                <div>
                  <dt className="flex items-center gap-2 text-sm font-medium text-navy-600 dark:text-navy-300">
                    <Calendar size={16} />
                    Time Period
                  </dt>
                  <dd className="mt-1 text-navy-800 dark:text-navy-100">
                    {source.century}th Century
                    {source.date && (
                      <span className="text-navy-600 dark:text-navy-300 ml-2">
                        ({source.date})
                      </span>
                    )}
                  </dd>
                </div>
                
                <div>
                  <dt className="flex items-center gap-2 text-sm font-medium text-navy-600 dark:text-navy-300">
                    <Tag size={16} />
                    Type
                  </dt>
                  <dd className="mt-1 text-navy-800 dark:text-navy-100 capitalize">
                    {source.type}
                  </dd>
                </div>

                <div>
                  <dt className="flex items-center gap-2 text-sm font-medium text-navy-600 dark:text-navy-300">
                    <Globe size={16} />
                    Hosted On
                  </dt>
                  <dd className="mt-1 text-navy-800 dark:text-navy-100">
                    {source.hostedOn}
                  </dd>
                </div>
                
                {source.relatedPeople.length > 0 && (
                  <div>
                    <dt className="flex items-center gap-2 text-sm font-medium text-navy-600 dark:text-navy-300">
                      <Users size={16} />
                      Related People
                    </dt>
                    <dd className="mt-1">
                      <div className="flex flex-wrap gap-2">
                        {source.relatedPeople.map(person => (
                          <Link
                            key={person}
                            to={`/figures/${person}`}
                            className="text-burgundy-700 dark:text-burgundy-300 hover:underline text-sm"
                          >
                            {person.replace('-', ' ')}
                          </Link>
                        ))}
                      </div>
                    </dd>
                  </div>
                )}
              </dl>
            </div>

            {/* Tags */}
            <div className="bg-white dark:bg-navy-800 rounded-lg shadow-md p-6">
              <h2 className="text-xl font-serif text-navy-800 dark:text-navy-100 mb-4">
                Tags & Topics
              </h2>
              <div className="flex flex-wrap gap-2">
                {source.tags.map(tag => (
                  <Link
                    key={tag}
                    to={`/sources/topic/${tag}`}
                    className="px-3 py-1 bg-burgundy-50 dark:bg-navy-700 text-burgundy-700 dark:text-burgundy-300 rounded-full text-sm hover:bg-burgundy-100 dark:hover:bg-navy-600 transition-colors"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </div>

            {/* Related Eras */}
            {source.relatedEras.length > 0 && (
              <div className="bg-white dark:bg-navy-800 rounded-lg shadow-md p-6">
                <h2 className="text-xl font-serif text-navy-800 dark:text-navy-100 mb-4">
                  Related Eras
                </h2>
                <div className="space-y-2">
                  {source.relatedEras.map(era => (
                    <Link
                      key={era}
                      to={`/eras/${era}`}
                      className="block p-2 rounded-md hover:bg-navy-50 dark:hover:bg-navy-700 transition-colors"
                    >
                      <div className="text-navy-800 dark:text-navy-100 capitalize">
                        {era.replace('-', ' ')} Era
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Quick Actions */}
            <div className="bg-white dark:bg-navy-800 rounded-lg shadow-md p-6">
              <h2 className="text-xl font-serif text-navy-800 dark:text-navy-100 mb-4">
                Quick Actions
              </h2>
              <div className="space-y-3">
                <Link
                  to="/sources/bookmarks"
                  className="flex items-center gap-2 text-navy-600 dark:text-navy-300 hover:text-burgundy-700 dark:hover:text-burgundy-300"
                >
                  <BookmarkPlus size={16} />
                  <span>View My Bookmarks</span>
                </Link>
                <Link
                  to={`/sources/${source.category}`}
                  className="flex items-center gap-2 text-navy-600 dark:text-navy-300 hover:text-burgundy-700 dark:hover:text-burgundy-300"
                >
                  <ArrowLeft size={16} />
                  <span>Back to Category</span>
                </Link>
                <Link
                  to="/sources"
                  className="flex items-center gap-2 text-navy-600 dark:text-navy-300 hover:text-burgundy-700 dark:hover:text-burgundy-300"
                >
                  <Globe size={16} />
                  <span>Browse All Sources</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SourceDetailPage;