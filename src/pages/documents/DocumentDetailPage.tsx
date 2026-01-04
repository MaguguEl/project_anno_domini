import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { 
  ArrowLeft, 
  ExternalLink, 
  Download, 
  BookmarkPlus, 
  Users, 
  Calendar, 
  Tag, 
  Globe, 
  FileText, 
  Check,
  Copy,
  Printer,
  Share2,
  Layers,
} from 'lucide-react';

const DocumentDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getDocumentById, getRelatedEntities } = useData();
  const document = id ? getDocumentById(id) : null;
  
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showBookmarkSuccess, setShowBookmarkSuccess] = useState(false);
  const [showCopySuccess, setShowCopySuccess] = useState(false);

  if (!document) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center py-16">
            <h1 className="text-2xl font-serif text-burgundy-700 dark:text-burgundy-300 mb-4">
              Document Not Found
            </h1>
            <p className="text-navy-600 dark:text-navy-300 mb-6">
              The document you're looking for doesn't exist or has been removed.
            </p>
            <Link to="/documents" className="btn-primary">
              Browse All Documents
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

  const handleCopyContent = () => {
    navigator.clipboard.writeText(document.content)
      .then(() => {
        setShowCopySuccess(true);
        setTimeout(() => setShowCopySuccess(false), 2000);
      })
      .catch(err => console.error('Failed to copy content:', err));
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: document.title,
          text: document.summary || document.context.substring(0, 100),
          url: window.location.href,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      navigator.clipboard.writeText(window.location.href)
        .then(() => {
          alert('Link copied to clipboard!');
        })
        .catch(err => console.error('Failed to copy URL:', err));
    }
  };

  const handleViewSource = () => {
    if (document.externalUrl) {
      window.open(document.externalUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const relatedData = getRelatedEntities('document', document.id) as {
    era?: any;
    people?: any[];
    events?: any[];
  };
  const relatedPeople = relatedData.people || [];
  const relatedEvents = relatedData.events || [];
  const era = relatedData.era;

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
          <Link to="/documents" className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-6 transition-all hover:gap-3 group">
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Back to Documents</span>
          </Link>
          
          <div className="flex flex-col gap-6 pb-10">
            <div className="space-y-4">
              {/* Metadata Badges */}
              <div className="flex flex-wrap gap-2">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                  <Calendar size={14} className="text-amber-300" />
                  <span className="text-white/90 text-sm">{document.year}</span>
                </div>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                  <Users size={14} className="text-white/70" />
                  <span className="text-white/90 text-sm">{document.author}</span>
                </div>
                {document.type && (
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full border border-white/20 capitalize">
                    <FileText size={14} className="text-white/70" />
                    <span className="text-white/90 text-sm">{document.type}</span>
                  </div>
                )}
                {document.hostedOn && (
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                    <Globe size={14} className="text-white/70" />
                    <span className="text-white/90 text-sm">{document.hostedOn}</span>
                  </div>
                )}
              </div>
              
              <h1 className="text-3xl md:text-4xl font-serif leading-tight bg-gradient-to-r from-white via-amber-100 to-white bg-clip-text text-transparent drop-shadow-lg">
                {document.title}
              </h1>
              
              {/* Quick Stats */}
              <div className="flex flex-wrap gap-3 pt-2">
                {era && (
                  <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                    <Layers size={14} className="text-white/70" />
                    <span className="text-white text-sm font-medium">Vol. {era.volume}</span>
                    <span className="text-white/60 text-xs">•</span>
                    <span className="text-white/90 text-sm">{era.name}</span>
                  </div>
                )}
                {relatedPeople.length > 0 && (
                  <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                    <Users size={14} className="text-white/70" />
                    <span className="text-white font-semibold text-sm">{relatedPeople.length}</span>
                    <span className="text-white/70 text-xs">Related Figures</span>
                  </div>
                )}
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
            {document.summary && (
              <div className="mt-6">
                <h2 className="text-2xl font-serif text-burgundy-700 dark:text-burgundy-300 mb-5 pb-3 border-b-2 border-burgundy-200 dark:border-burgundy-800">
                  Overview
                </h2>
                <p className="text-base text-navy-700 dark:text-navy-300 leading-relaxed">
                  {document.summary}
                </p>
              </div>
            )}

            {/* Document Content Card */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-5 pb-3 border-b-2 border-burgundy-200 dark:border-burgundy-800">
                <FileText className="w-5 h-5 text-burgundy-700 dark:text-burgundy-300" />
                <h2 className="text-2xl font-serif text-burgundy-700 dark:text-burgundy-300">
                  Document Content
                </h2>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-navy-800 dark:text-navy-200 mb-3">
                  Historical Context
                </h3>
                <p className="text-base text-navy-700 dark:text-navy-300 leading-relaxed">
                  {document.context}
                </p>
              </div>

              <div className="bg-white rounded-md p-5 border border-slate-200 dark:border-slate-700">
                <div className="space-y-4">
                  {document.content.split('\n\n').map((paragraph, index) => (
                    <p 
                      key={index}
                      className="text-base text-navy-700 dark:text-navy-300 leading-relaxed"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mb-4">
              <div className="flex flex-wrap gap-3">
                {document.externalUrl && document.hostedOn && (
                  <button
                    onClick={handleViewSource}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-burgundy-600 hover:bg-burgundy-700 text-white rounded-lg transition-colors text-sm font-medium"
                  >
                    <ExternalLink size={16} />
                    View on {document.hostedOn}
                  </button>
                )}
                
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

                <button
                  onClick={handleShare}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-700 dark:hover:bg-slate-600 dark:text-slate-300 rounded-lg transition-colors text-sm font-medium"
                >
                  <Share2 size={16} />
                  Share
                </button>

                <button
                  onClick={handlePrint}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-700 dark:hover:bg-slate-600 dark:text-slate-300 rounded-lg transition-colors text-sm font-medium"
                >
                  <Printer size={16} />
                  Print
                </button>

                <button
                  onClick={handleCopyContent}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-700 dark:hover:bg-slate-600 dark:text-slate-300 rounded-lg transition-colors text-sm font-medium"
                >
                  <Copy size={16} />
                  Copy Text
                </button>

                {showBookmarkSuccess && (
                  <div className="flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-700 rounded-lg dark:bg-emerald-900/30 dark:text-emerald-300 text-sm">
                    <Check size={16} />
                    <span>{isBookmarked ? 'Added to bookmarks!' : 'Removed from bookmarks'}</span>
                  </div>
                )}

                {showCopySuccess && (
                  <div className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg dark:bg-blue-900/30 dark:text-blue-300 text-sm">
                    <Check size={16} />
                    <span>Content copied!</span>
                  </div>
                )}
              </div>
            </div>

            {/* Download Options */}
            {document.downloadFormats && document.downloadFormats.length > 0 && (
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-4">
                  <Download className="w-5 h-5 text-burgundy-700 dark:text-burgundy-300" />
                  <h2 className="text-lg font-serif text-burgundy-700 dark:text-burgundy-300">
                    Download Options
                  </h2>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
                  {document.downloadFormats.map(format => (
                    <button
                      key={format}
                      className="flex items-center justify-center gap-2 p-3 bg-slate-50 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors text-sm font-medium"
                    >
                      <FileText size={16} />
                      <span>{format.toUpperCase()}</span>
                    </button>
                  ))}
                </div>
                <p className="text-xs text-navy-600 dark:text-navy-400">
                  {document.hostedOn 
                    ? `Downloads provided by ${document.hostedOn}. Please respect copyright and usage terms.`
                    : 'Please respect copyright and usage terms when using this document.'
                  }
                </p>
              </div>
            )}

            {/* Usage Guidelines Card */}
            <div className="bg-burgundy-50 dark:bg-burgundy-950/20 rounded-xl border border-burgundy-200 dark:border-burgundy-900/30 p-6">
              <h3 className="text-lg font-serif text-burgundy-900 dark:text-burgundy-300 mb-4">
                Usage Guidelines
              </h3>
              <div className="space-y-3 text-sm text-navy-700 dark:text-navy-300">
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-burgundy-600 dark:bg-burgundy-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p>This document is preserved for historical and educational purposes</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-burgundy-600 dark:bg-burgundy-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p>For academic use, please cite appropriately using the provided citation information</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-burgundy-600 dark:bg-burgundy-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p>Refer to the original source for complete context and scholarly commentary</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6">
            {/* Document Info Card */}
            <div className="bg-white dark:bg-navy-800 rounded-xl shadow-md border border-navy-200 dark:border-navy-700 p-5">
              <h2 className="text-lg font-serif text-burgundy-700 dark:text-burgundy-300 mb-4 pb-3 border-b border-navy-200 dark:border-navy-700">
                Document Information
              </h2>
              <dl className="space-y-3">
                <div>
                  <dt className="text-xs font-medium text-navy-600 dark:text-navy-400 mb-1">
                    Author
                  </dt>
                  <dd className="text-sm text-navy-900 dark:text-navy-100">
                    {document.author}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-medium text-navy-600 dark:text-navy-400 mb-1">
                    Year
                  </dt>
                  <dd className="text-sm text-navy-900 dark:text-navy-100">
                    {document.year}
                  </dd>
                </div>
                {document.type && (
                  <div>
                    <dt className="text-xs font-medium text-navy-600 dark:text-navy-400 mb-1">
                      Type
                    </dt>
                    <dd className="text-sm text-navy-900 dark:text-navy-100 capitalize">
                      {document.type}
                    </dd>
                  </div>
                )}
                {document.category && (
                  <div>
                    <dt className="text-xs font-medium text-navy-600 dark:text-navy-400 mb-1">
                      Category
                    </dt>
                    <dd className="text-sm text-navy-900 dark:text-navy-100 capitalize">
                      {document.category}
                    </dd>
                  </div>
                )}
                {era && (
                  <>
                    <div>
                      <dt className="text-xs font-medium text-navy-600 dark:text-navy-400 mb-1">
                        Era
                      </dt>
                      <dd className="text-sm text-navy-900 dark:text-navy-100">
                        {era.name} ({era.startYear}–{era.endYear})
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs font-medium text-navy-600 dark:text-navy-400 mb-1">
                        Volume
                      </dt>
                      <dd className="text-sm text-navy-900 dark:text-navy-100">
                        Volume {era.volume}
                      </dd>
                    </div>
                  </>
                )}
                {document.hostedOn && (
                  <div>
                    <dt className="text-xs font-medium text-navy-600 dark:text-navy-400 mb-1">
                      Source
                    </dt>
                    <dd className="text-sm text-navy-900 dark:text-navy-100">
                      {document.hostedOn}
                    </dd>
                  </div>
                )}
              </dl>
            </div>

            {/* Related People Card */}
            {relatedPeople && relatedPeople.length > 0 && (
              <div className="bg-white dark:bg-navy-800 rounded-xl shadow-md border border-navy-200 dark:border-navy-700 p-5">
                <div className="flex items-center gap-2 mb-4 pb-3 border-b border-navy-200 dark:border-navy-700">
                  <Users className="w-5 h-5 text-burgundy-700 dark:text-burgundy-300" />
                  <h2 className="text-lg font-serif text-burgundy-700 dark:text-burgundy-300">
                    Related Figures
                  </h2>
                </div>
                <div className="space-y-3">
                  {relatedPeople.map((figure: any) => (
                    <Link 
                      key={figure.id}
                      to={`/figures/${figure.id}`}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-navy-700 transition-colors group"
                    >
                      <div className="w-12 h-12 rounded-full overflow-hidden bg-slate-200 dark:bg-slate-700 flex-shrink-0 ring-2 ring-burgundy-200 dark:ring-burgundy-800 group-hover:ring-burgundy-400 dark:group-hover:ring-burgundy-600 transition-all">
                        <img 
                          src={figure.image} 
                          alt={figure.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm text-navy-900 dark:text-navy-100 truncate">
                          {figure.name}
                        </div>
                        <div className="text-xs text-navy-600 dark:text-navy-400 truncate">
                          {figure.roles[0]}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
            
            {/* Related Events Card */}
            {relatedEvents && relatedEvents.length > 0 && (
              <div className="bg-white dark:bg-navy-800 rounded-xl shadow-md border border-navy-200 dark:border-navy-700 p-5">
                <div className="flex items-center gap-2 mb-4 pb-3 border-b border-navy-200 dark:border-navy-700">
                  <Calendar className="w-5 h-5 text-burgundy-700 dark:text-burgundy-300" />
                  <h2 className="text-lg font-serif text-burgundy-700 dark:text-burgundy-300">
                    Related Events
                  </h2>
                </div>
                <div className="space-y-3">
                  {relatedEvents.map((event: any) => (
                    <Link 
                      key={event.id}
                      to={`/events/${event.id}`}
                      className="block p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-navy-700 transition-colors"
                    >
                      <div className="font-medium text-sm text-navy-900 dark:text-navy-100 mb-1 line-clamp-2">
                        {event.title}
                      </div>
                      <div className="text-xs text-navy-600 dark:text-navy-400">
                        {event.year}
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

export default DocumentDetailPage;