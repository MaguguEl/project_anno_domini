import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Download, BookmarkPlus, Users, Calendar, Tag, Globe, FileText, Check, BookOpen, Archive, Layers, Clock } from 'lucide-react';
import { useData } from '../../context/DataContext';

const SourceDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getSourceById, getCategoryDisplayName, getCategoryDescription } = useData();
  const source = id ? getSourceById(id) : null;
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showBookmarkSuccess, setShowBookmarkSuccess] = useState(false);

  if (!source) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center py-16">
            <h1 className="text-2xl font-serif text-burgundy-700 dark:text-burgundy-300 mb-4">
              Source Not Found
            </h1>
            <p className="text-navy-600 dark:text-navy-300 mb-6">
              The source you're looking for doesn't exist or has been removed.
            </p>
            <Link to="/sources" className="btn-primary">
              Browse All Sources
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

  // Get category info from centralized data
  const categoryDisplayName = getCategoryDisplayName(source.category);
  
  // Get category icon
  const getCategoryIcon = (categoryId: string) => {
    switch (categoryId) {
      case 'books':
        return BookOpen;
      case 'archives':
        return Archive;
      case 'commentaries':
        return Layers;
      default:
        return BookOpen;
    }
  };

  const CategoryIcon = getCategoryIcon(source.category);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Hero Section - Consistent Styling */}
      <div className="relative bg-gradient-to-br from-burgundy-900 via-burgundy-800 to-burgundy-950 text-white overflow-hidden">
        {/* Decorative Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(255,255,255,0.1) 0%, transparent 50%)',
          }}></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link to={`/sources/${source.category}`} className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-6 transition-all hover:gap-3 group">
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Back to {categoryDisplayName}</span>
          </Link>
          
          <div className="flex flex-col gap-6 pb-10">
            <div className="space-y-4">
              {/* Metadata Badges */}
              <div className="flex flex-wrap gap-2">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                  <Calendar size={14} className="text-amber-300" />
                  <span className="text-white/90 text-sm">{source.century}th Century</span>
                </div>
                {source.author && source.author !== 'Various' && source.author !== 'CCEL' && source.author !== 'Internet Archive' && (
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                    <Users size={14} className="text-white/70" />
                    <span className="text-white/90 text-sm">{source.author}</span>
                  </div>
                )}
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full border border-white/20 capitalize">
                  <FileText size={14} className="text-white/70" />
                  <span className="text-white/90 text-sm">{source.type}</span>
                </div>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                  <Globe size={14} className="text-white/70" />
                  <span className="text-white/90 text-sm">{source.hostedOn}</span>
                </div>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-serif leading-tight bg-gradient-to-r from-white via-amber-100 to-white bg-clip-text text-transparent drop-shadow-lg">
                {source.title}
              </h1>
              
              {/* Quick Stats */}
              <div className="flex flex-wrap gap-3 pt-2">
                <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                  <CategoryIcon size={14} className="text-white/70" />
                  <span className="text-white font-semibold text-sm">{categoryDisplayName}</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                  <Clock size={14} className="text-white/70" />
                  <span className="text-white/90 text-sm">{source.century}th Century</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Wave Decoration */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-12 fill-current text-slate-50 dark:text-slate-900" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
          </svg>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Summary Card */}
            <div className="p-6">
              <h2 className="text-2xl font-serif text-burgundy-700 dark:text-burgundy-300 mb-5 pb-3 border-b-2 border-burgundy-200 dark:border-burgundy-800">
                About This Source
              </h2>
              <p className="text-base text-navy-700 dark:text-navy-300 leading-relaxed">
                {source.summary}
              </p>
            </div>

            {/* Action Buttons Card */}
            <div className="mb-6">
              <div className="flex flex-wrap gap-3">
                <a
                  href={source.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-burgundy-600 hover:bg-burgundy-700 text-white rounded-lg transition-colors text-sm font-medium"
                >
                  <ExternalLink size={16} />
                  View on {source.hostedOn}
                </a>
                
                <button 
                  onClick={handleBookmark}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg transition-colors text-sm font-medium ${
                    isBookmarked 
                      ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300' 
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-700 dark:hover:bg-slate-600 dark:text-slate-300'
                  }`}
                >
                  {isBookmarked ? <Check size={16} /> : <BookmarkPlus size={16} />}
                  {isBookmarked ? 'Bookmarked' : 'Bookmark'}
                </button>

                {showBookmarkSuccess && (
                  <div className="flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-700 rounded-lg dark:bg-emerald-900/30 dark:text-emerald-300 text-sm">
                    <Check size={16} />
                    <span>{isBookmarked ? 'Added to bookmarks!' : 'Removed from bookmarks'}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Download Options Card */}
            {source.downloadFormats && source.downloadFormats.length > 0 && (
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-4">
                  <Download className="w-5 h-5 text-burgundy-700 dark:text-burgundy-300" />
                  <h2 className="text-lg font-serif text-burgundy-700 dark:text-burgundy-300">
                    Download Options
                  </h2>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
                  {source.downloadFormats.map(format => (
                    <button
                      key={format}
                      onClick={() => window.open(source.externalUrl, '_blank')}
                      className="flex items-center justify-center gap-2 p-3 bg-slate-50 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors text-sm font-medium"
                    >
                      <FileText size={16} />
                      <span>{format.toUpperCase()}</span>
                    </button>
                  ))}
                </div>
                <p className="text-xs text-navy-600 dark:text-navy-400">
                  Downloads provided by {source.hostedOn}. Please respect copyright and usage terms.
                </p>
              </div>
            )}

            {/* Usage Guidelines Card */}
            <div className="bg-burgundy-50 dark:bg-burgundy-950/20 rounded-xl border border-burgundy-200 dark:border-burgundy-900/30 p-6">
              <h3 className="text-lg font-serif text-burgundy-900 dark:text-burgundy-300 mb-4">
                {source.category === 'books' ? 'Digital Library Access' : 
                 source.category === 'archives' ? 'Archive Usage' : 
                 'Historical Work Guidelines'}
              </h3>
              <div className="space-y-3 text-sm text-navy-700 dark:text-navy-300">
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-burgundy-600 dark:bg-burgundy-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p>This is a {getCategoryDescription(source.category)} hosted externally on {source.hostedOn}</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-burgundy-600 dark:bg-burgundy-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p>Please respect the hosting site's terms of use and copyright policies</p>
                </div>
                {source.category === 'commentaries' && (
                  <>
                    <div className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-burgundy-600 dark:bg-burgundy-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p>Historical works may reflect the perspectives and biases of their time period</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-burgundy-600 dark:bg-burgundy-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p>Consider the historical context when reading older historical works</p>
                    </div>
                  </>
                )}
                {source.category === 'archives' && (
                  <div className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-burgundy-600 dark:bg-burgundy-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p>Archive materials are often digitized from original sources - check for accuracy</p>
                  </div>
                )}
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-burgundy-600 dark:bg-burgundy-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p>For academic use, please cite both the original source and the hosting platform</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Source Info Card */}
            <div className="bg-white dark:bg-navy-800 rounded-xl shadow-md border border-navy-200 dark:border-navy-700 p-5">
              <h2 className="text-lg font-serif text-burgundy-700 dark:text-burgundy-300 mb-4 pb-3 border-b border-navy-200 dark:border-navy-700">
                Source Information
              </h2>
              <dl className="space-y-3">
                <div>
                  <dt className="text-xs font-medium text-navy-600 dark:text-navy-400 mb-1">
                    Category
                  </dt>
                  <dd className="text-sm text-navy-900 dark:text-navy-100">
                    {categoryDisplayName}
                  </dd>
                </div>
                
                <div>
                  <dt className="text-xs font-medium text-navy-600 dark:text-navy-400 mb-1">
                    Time Period
                  </dt>
                  <dd className="text-sm text-navy-900 dark:text-navy-100">
                    {source.century}th Century
                    {source.date && <span className="text-navy-600 dark:text-navy-400 ml-2">({source.date})</span>}
                  </dd>
                </div>
                
                <div>
                  <dt className="text-xs font-medium text-navy-600 dark:text-navy-400 mb-1">
                    Type
                  </dt>
                  <dd className="text-sm text-navy-900 dark:text-navy-100 capitalize">
                    {source.type}
                  </dd>
                </div>

                <div>
                  <dt className="text-xs font-medium text-navy-600 dark:text-navy-400 mb-1">
                    Hosted On
                  </dt>
                  <dd className="text-sm text-navy-900 dark:text-navy-100">
                    {source.hostedOn}
                  </dd>
                </div>

                {source.author && source.author !== 'Various' && source.author !== 'CCEL' && source.author !== 'Internet Archive' && (
                  <div>
                    <dt className="text-xs font-medium text-navy-600 dark:text-navy-400 mb-1">
                      Author/Creator
                    </dt>
                    <dd className="text-sm text-navy-900 dark:text-navy-100">
                      {source.author}
                    </dd>
                  </div>
                )}
              </dl>
            </div>

            {/* Related People Card */}
            {source.relatedPeople.length > 0 && (
              <div className="bg-white dark:bg-navy-800 rounded-xl shadow-md border border-navy-200 dark:border-navy-700 p-5">
                <div className="flex items-center gap-2 mb-4 pb-3 border-b border-navy-200 dark:border-navy-700">
                  <Users className="w-5 h-5 text-burgundy-700 dark:text-burgundy-300" />
                  <h2 className="text-lg font-serif text-burgundy-700 dark:text-burgundy-300">
                    Related People
                  </h2>
                </div>
                <div className="space-y-2">
                  {source.relatedPeople.map(person => (
                    <Link
                      key={person}
                      to={`/figures/${person}`}
                      className="block p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-navy-700 transition-colors"
                    >
                      <div className="font-medium text-sm text-navy-900 dark:text-navy-100">
                        {person.replace('-', ' ')}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Related Eras Card */}
            {source.relatedEras.length > 0 && (
              <div className="bg-white dark:bg-navy-800 rounded-xl shadow-md border border-navy-200 dark:border-navy-700 p-5">
                <div className="flex items-center gap-2 mb-4 pb-3 border-b border-navy-200 dark:border-navy-700">
                  <Calendar className="w-5 h-5 text-burgundy-700 dark:text-burgundy-300" />
                  <h2 className="text-lg font-serif text-burgundy-700 dark:text-burgundy-300">
                    Related Periods
                  </h2>
                </div>
                <div className="space-y-2">
                  {source.relatedEras.map(era => (
                    <Link
                      key={era}
                      to={`/eras/${era}`}
                      className="block p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-navy-700 transition-colors"
                    >
                      <div className="font-medium text-sm text-navy-900 dark:text-navy-100 capitalize">
                        {era.replace('-', ' ')}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SourceDetailPage;