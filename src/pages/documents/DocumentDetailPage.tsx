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
      <div className="min-h-screen bg-white dark:bg-slate-900 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center py-16">
            <h1 className="text-3xl font-serif text-navy-900 dark:text-navy-300 mb-4">
              Document Not Found
            </h1>
            <p className="text-slate-600 dark:text-slate-300 mb-8 text-lg">
              The document you're looking for doesn't exist or has been removed.
            </p>
            <Link to="/documents" className="inline-block px-6 py-3 bg-navy-700 text-white rounded-lg hover:bg-navy-800 transition-colors">
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
    // Copy the content to clipboard
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
      // Fallback: copy URL to clipboard
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
    <div className="min-h-screen bg-white dark:bg-slate-900">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-navy-700 to-navy-600 dark:from-navy-900 dark:to-navy-800 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Link to="/documents" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-8 transition-colors">
            <ArrowLeft size={20} />
            <span>Back to Documents</span>
          </Link>
          
          <div className="flex flex-wrap items-center gap-4 text-navy-100 text-lg mb-4">
            <div className="flex items-center gap-2">
              <Calendar size={18} />
              <span>{document.year}</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-2">
              <Users size={18} />
              <span>{document.author}</span>
            </div>
            {document.type && (
              <>
                <span>•</span>
                <div className="flex items-center gap-2 capitalize">
                  <FileText size={18} />
                  <span>{document.type}</span>
                </div>
              </>
            )}
            {document.hostedOn && (
              <>
                <span>•</span>
                <div className="flex items-center gap-2">
                  <Globe size={18} />
                  <span>{document.hostedOn}</span>
                </div>
              </>
            )}
          </div>
          
          <h1 className="text-5xl md:text-6xl font-serif mb-6 leading-tight">{document.title}</h1>
          
          {document.category && (
            <div className="flex flex-wrap gap-3 mt-4">
              <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium capitalize">
                {document.category}
              </span>
              {document.type && (
                <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium capitalize">
                  {document.type}
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Summary Section */}
            {document.summary && (
              <article className="prose prose-lg max-w-none mb-12">
                <h2 className="text-3xl font-serif text-navy-900 dark:text-navy-300 mb-6 pb-3 border-b-2 border-navy-200 dark:border-navy-800">
                  Overview
                </h2>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-lg">
                  {document.summary}
                </p>
              </article>
            )}

            {/* Document Content */}
            <div className="mb-12">
              <div className="flex items-center gap-2 mb-6 pb-3 border-b-2 border-navy-200 dark:border-navy-800">
                <FileText className="w-6 h-6 text-navy-700 dark:text-navy-300" />
                <h2 className="text-3xl font-serif text-navy-900 dark:text-navy-300">
                  Document Content
                </h2>
              </div>
              
              <div className="mb-8">
                <h3 className="text-xl font-medium text-navy-800 dark:text-navy-300 mb-4">
                  Historical Context
                </h3>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-lg">
                  {document.context}
                </p>
              </div>

              <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-6">
                <div className="space-y-6">
                  {document.content.split('\n\n').map((paragraph, index) => (
                    <p 
                      key={index}
                      className="text-slate-700 dark:text-slate-300 leading-relaxed text-lg"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </div>

{/* Action Buttons */}
            <div className="flex flex-wrap gap-4 mb-12 pb-12 border-b-2 border-slate-200 dark:border-slate-800">
              {document.externalUrl && document.hostedOn && (
                <button
                  onClick={handleViewSource}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-navy-700 hover:bg-navy-800 text-white rounded-lg transition-colors"
                >
                  <ExternalLink size={18} />
                  View on {document.hostedOn}
                </button>
              )}
              
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

              <button
                onClick={handleShare}
                className="inline-flex items-center gap-2 px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-300 rounded-lg transition-colors"
              >
                <Share2 size={18} />
                Share
              </button>

              <button
                onClick={handlePrint}
                className="inline-flex items-center gap-2 px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-300 rounded-lg transition-colors"
              >
                <Printer size={18} />
                Print
              </button>

              <button
                onClick={handleCopyContent}
                className="inline-flex items-center gap-2 px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-300 rounded-lg transition-colors"
              >
                <Copy size={18} />
                Copy Text
              </button>

              {showBookmarkSuccess && (
                <div className="flex items-center gap-2 px-4 py-3 bg-emerald-100 text-emerald-700 rounded-lg dark:bg-emerald-900/30 dark:text-emerald-300">
                  <Check size={16} />
                  <span>{isBookmarked ? 'Added to bookmarks!' : 'Removed from bookmarks'}</span>
                </div>
              )}

              {showCopySuccess && (
                <div className="flex items-center gap-2 px-4 py-3 bg-blue-100 text-blue-700 rounded-lg dark:bg-blue-900/30 dark:text-blue-300">
                  <Check size={16} />
                  <span>Content copied to clipboard!</span>
                </div>
              )}
            </div>

            {/* Download Options */}
            {document.downloadFormats && document.downloadFormats.length > 0 && (
              <div className="mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <Download className="w-6 h-6 text-navy-700 dark:text-navy-300" />
                  <h2 className="text-2xl font-serif text-navy-900 dark:text-navy-300">
                    Download Options
                  </h2>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                  {document.downloadFormats.map(format => (
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
                  {document.hostedOn 
                    ? `Downloads provided by ${document.hostedOn}. Please respect copyright and usage terms.`
                    : 'Please respect copyright and usage terms when using this document.'
                  }
                </p>
              </div>
            )}

            {/* Usage Guidelines */}
            <div className="bg-navy-50 dark:bg-slate-800 rounded-lg p-8">
              <h3 className="text-xl font-serif text-navy-900 dark:text-navy-300 mb-4">
                Usage Guidelines
              </h3>
              <div className="space-y-3 text-slate-700 dark:text-slate-300">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-navy-600 dark:bg-navy-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p>This document is preserved for historical and educational purposes</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-navy-600 dark:bg-navy-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p>For academic use, please cite appropriately using the provided citation information</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-navy-600 dark:bg-navy-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p>Refer to the original source for complete context and scholarly commentary</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="space-y-10">
            {/* Document Info */}
            <aside className="bg-navy-50 dark:bg-slate-800 p-6 rounded-lg">
              <h2 className="text-xl font-serif text-navy-900 dark:text-navy-300 mb-6">
                Document Information
              </h2>
              <dl className="space-y-4">
                <div>
                  <dt className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">
                    Author
                  </dt>
                  <dd className="text-slate-900 dark:text-slate-100">
                    {document.author}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">
                    Year
                  </dt>
                  <dd className="text-slate-900 dark:text-slate-100">
                    {document.year}
                  </dd>
                </div>
                {document.type && (
                  <div>
                    <dt className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">
                      Type
                    </dt>
                    <dd className="text-slate-900 dark:text-slate-100 capitalize">
                      {document.type}
                    </dd>
                  </div>
                )}
                {document.category && (
                  <div>
                    <dt className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">
                      Category
                    </dt>
                    <dd className="text-slate-900 dark:text-slate-100 capitalize">
                      {document.category}
                    </dd>
                  </div>
                )}
                {era && (
                  <>
                    <div>
                      <dt className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">
                        Era
                      </dt>
                      <dd className="text-slate-900 dark:text-slate-100">
                        {era.name} ({era.startYear}–{era.endYear})
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">
                        Volume
                      </dt>
                      <dd className="text-slate-900 dark:text-slate-100">
                        Volume {era.volume}
                      </dd>
                    </div>
                  </>
                )}
                {document.hostedOn && (
                  <div>
                    <dt className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">
                      Source
                    </dt>
                    <dd className="text-slate-900 dark:text-slate-100">
                      {document.hostedOn}
                    </dd>
                  </div>
                )}
              </dl>
            </aside>

            {/* Tags */}
            {document.tags && document.tags.length > 0 && (
              <aside>
                <div className="flex items-center gap-3 mb-4 pb-2 border-b-2 border-navy-200 dark:border-navy-800">
                  <Tag className="w-5 h-5 text-navy-700 dark:text-navy-300" />
                  <h2 className="text-xl font-serif text-navy-900 dark:text-navy-300">
                    Tags & Topics
                  </h2>
                </div>
                <div className="flex flex-wrap gap-2">
                  {document.tags.map(tag => (
                    <Link
                      key={tag}
                      to={`/documents/tag/${tag}`}
                      className="px-3 py-2 bg-navy-100 dark:bg-navy-900/30 text-navy-800 dark:text-navy-300 rounded-full text-sm hover:bg-navy-200 dark:hover:bg-navy-900/50 transition-colors"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              </aside>
            )}
            
            {/* Related People */}
            {relatedPeople && relatedPeople.length > 0 && (
              <aside>
                <div className="flex items-center gap-2 mb-6 pb-2 border-b-2 border-navy-200 dark:border-navy-800">
                  <Users className="w-5 h-5 text-navy-700 dark:text-navy-300" />
                  <h2 className="text-xl font-serif text-navy-900 dark:text-navy-300">
                    Related Figures
                  </h2>
                </div>
                <div className="space-y-4">
                  {relatedPeople.map((figure: any) => (
                    <Link 
                      key={figure.id}
                      to={`/figures/${figure.id}`}
                      className="flex items-center gap-4 py-3 px-4 rounded-md hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors border-l-2 border-navy-300 dark:border-navy-700"
                    >
                      <div className="w-14 h-14 rounded-full overflow-hidden bg-slate-200 dark:bg-slate-700 flex-shrink-0">
                        <img 
                          src={figure.image} 
                          alt={figure.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="font-medium text-slate-900 dark:text-slate-100">
                          {figure.name}
                        </div>
                        <div className="text-sm text-slate-600 dark:text-slate-400">
                          {figure.roles[0]}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </aside>
            )}
            
            {/* Related Events */}
            {relatedEvents && relatedEvents.length > 0 && (
              <aside>
                <div className="flex items-center gap-2 mb-6 pb-2 border-b-2 border-navy-200 dark:border-navy-800">
                  <Calendar className="w-5 h-5 text-navy-700 dark:text-navy-300" />
                  <h2 className="text-xl font-serif text-navy-900 dark:text-navy-300">
                    Related Events
                  </h2>
                </div>
                <div className="space-y-3">
                  {relatedEvents.map((event: any) => (
                    <Link 
                      key={event.id}
                      to={`/events/${event.id}`}
                      className="block py-3 px-4 rounded-md hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors border-l-2 border-navy-300 dark:border-navy-700"
                    >
                      <div className="font-medium text-slate-900 dark:text-slate-100 mb-1">
                        {event.title}
                      </div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">
                        {event.year}
                      </div>
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

export default DocumentDetailPage;