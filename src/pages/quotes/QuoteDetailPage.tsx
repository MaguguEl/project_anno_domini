import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Quote, User, BookOpen, Heart, Copy, Check, Share } from 'lucide-react';
import { figures } from '../../data/figures';
import { formatLifespan } from '../../utils/dateUtils';
import FigureCard from '../../components/ui/FigureCard';

const QuoteDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [copied, setCopied] = useState(false);
  const [liked, setLiked] = useState(false);
  
  let quote = null;
  let author = null;
  
  for (const figure of figures) {
    const foundQuote = figure.quotes.find(q => q.id === id);
    if (foundQuote) {
      quote = foundQuote;
      author = figure;
      break;
    }
  }
  
  if (!quote || !author) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center py-16">
            <h1 className="text-2xl font-serif text-burgundy-700 dark:text-burgundy-300 mb-4">
              Quote Not Found
            </h1>
            <p className="text-navy-600 dark:text-navy-300 mb-6">
              The quote you're looking for doesn't exist or has been removed.
            </p>
            <Link to="/quotes" className="btn-primary">
              Browse All Quotes
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(`"${quote.text}" — ${author.name}, ${quote.source}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy quote:', err);
    }
  };

  const handleLike = () => {
    setLiked(!liked);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Quote by ${author.name}`,
          text: `"${quote.text}" — ${author.name}`,
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

  const otherQuotes = author.quotes.filter(q => q.id !== quote.id);

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
          <Link to="/quotes" className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-6 transition-all hover:gap-3 group">
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Back to Quotes</span>
          </Link>
          
          <div className="flex flex-col gap-6 pb-10">
            <div className="space-y-4">
              {/* Metadata Badges */}
              <div className="flex flex-wrap gap-2">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                  <User size={14} className="text-amber-300" />
                  <span className="text-white/90 text-sm">{author.name}</span>
                </div>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                  <BookOpen size={14} className="text-white/70" />
                  <span className="text-white/90 text-sm">{quote.source}</span>
                </div>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-serif leading-tight bg-gradient-to-r from-white via-amber-100 to-white bg-clip-text text-transparent drop-shadow-lg">
                Historical Quote
              </h1>
              
              {/* Quick Stats */}
              <div className="flex flex-wrap gap-3 pt-2">
                <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                  <Quote size={14} className="text-white/70" />
                  <span className="text-white/90 text-sm">Wisdom from {formatLifespan(author.birthYear, author.deathYear)}</span>
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

      {/* Main Quote Display */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quote Card */}
            <div className="rounded-md border border-hover-200 dark:border-navy-700 p-6 sm:p-8">
              <div className="text-center mb-6">
                <Quote className="w-12 h-12 sm:w-16 sm:h-16 text-burgundy-200 dark:text-burgundy-800 mx-auto mb-6 opacity-40" />
                <blockquote>
                  <p className="text-xl sm:text-2xl md:text-3xl font-serif italic text-navy-800 dark:text-navy-100 leading-relaxed mb-6">
                    "{quote.text}"
                  </p>
                  <footer className="text-base sm:text-lg text-navy-600 dark:text-navy-400">
                    <cite className="font-medium text-burgundy-800 dark:text-burgundy-300 not-italic">
                      — {author.name}
                    </cite>
                  </footer>
                </blockquote>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-center flex-wrap gap-3 pt-6 border-t border-hover-200 dark:border-navy-700">
                <button
                  onClick={handleCopy}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-active hover:bg-hover text-slate-700 dark:bg-slate-700 dark:hover:bg-slate-600 dark:text-slate-300 rounded-lg transition-colors text-sm font-medium"
                >
                  {copied ? <Check size={16} /> : <Copy size={16} />}
                  {copied ? 'Copied!' : 'Copy Quote'}
                </button>
                
                <button
                  onClick={handleLike}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg transition-colors text-sm font-medium ${
                    liked 
                      ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300' 
                      : 'bg-active hover:bg-hover text-slate-700 dark:bg-slate-700 dark:hover:bg-slate-600 dark:text-slate-300'
                  }`}
                >
                  <Heart size={16} className={liked ? 'fill-current' : ''} />
                  {liked ? 'Liked' : 'Like'}
                </button>
                
                <button 
                  onClick={handleShare}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-active hover:bg-hover text-slate-700 dark:bg-slate-700 dark:hover:bg-slate-600 dark:text-slate-300 rounded-lg transition-colors text-sm font-medium"
                >
                  <Share size={16} />
                  Share
                </button>
              </div>
            </div>

            {/* Source & Context Card */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-5 pb-3 border-b-2 border-burgundy-200 dark:border-burgundy-800">
                <BookOpen className="w-5 h-5 text-burgundy-700 dark:text-burgundy-300" />
                <h2 className="text-2xl font-serif text-burgundy-700 dark:text-burgundy-300">
                  Source & Context
                </h2>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-navy-600 dark:text-navy-400 mb-2">
                    Source
                  </h3>
                  <p className="text-base text-navy-900 dark:text-navy-100 font-medium">
                    {quote.source}
                  </p>
                </div>
                
                {quote.context && (
                  <div>
                    <h3 className="text-sm font-medium text-navy-600 dark:text-navy-400 mb-2">
                      Historical Context
                    </h3>
                    <p className="text-base text-navy-700 dark:text-navy-300 leading-relaxed">
                      {quote.context}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* More Quotes Card */}
            {otherQuotes.length > 0 && (
              <div className="bg-white dark:bg-navy-800 rounded-xl shadow-md border border-navy-200 dark:border-navy-700 p-6">
                <h2 className="text-2xl font-serif text-burgundy-700 dark:text-burgundy-300 mb-5 pb-3 border-b-2 border-burgundy-200 dark:border-burgundy-800">
                  More Quotes from {author.name}
                </h2>
                <div className="space-y-4">
                  {otherQuotes.slice(0, 3).map((otherQuote) => (
                    <Link
                      key={otherQuote.id}
                      to={`/quotes/${otherQuote.id}`}
                      className="block p-4 rounded-lg hover:bg-slate-50 dark:hover:bg-navy-700 transition-colors border-l-4 border-burgundy-300 dark:border-burgundy-700"
                    >
                      <blockquote>
                        <p className="text-base italic text-navy-700 dark:text-navy-300 mb-2">
                          "{otherQuote.text.length > 150 ? `${otherQuote.text.substring(0, 150)}...` : otherQuote.text}"
                        </p>
                        <footer className="text-sm text-navy-600 dark:text-navy-400">
                          {otherQuote.source}
                        </footer>
                      </blockquote>
                    </Link>
                  ))}
                </div>
                
                {otherQuotes.length > 3 && (
                  <div className="mt-6 pt-4 border-t border-navy-200 dark:border-navy-700">
                    <Link 
                      to={`/figures/${author.id}`}
                      className="text-burgundy-700 dark:text-burgundy-300 hover:underline text-base font-medium"
                    >
                      View all {author.quotes.length} quotes from {author.name} →
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6">
            {/* Author Info Card */}
            <div className="mb-2">
  
              <div className="max-w-xs mx-auto">
                <FigureCard figure={author} />
              </div>
            </div>

            {/* Quote Stats Card */}
            <div className="bg-white dark:bg-navy-800 rounded-md shadow-sm border border-navy-200 dark:border-navy-700 p-5">
              <h3 className="text-lg font-serif text-burgundy-700 dark:text-burgundy-300 mb-4 pb-3 border-b border-navy-200 dark:border-navy-700">
                Quote Collection
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-navy-600 dark:text-navy-400">Total Quotes</span>
                  <span className="text-lg font-semibold text-burgundy-700 dark:text-burgundy-300">
                    {author.quotes.length}
                  </span>
                </div>
                <Link 
                  to={`/figures/${author.id}`}
                  className="block w-full px-4 py-2 bg-burgundy-50 dark:bg-burgundy-900/30 text-burgundy-700 dark:text-burgundy-300 rounded-lg hover:bg-burgundy-100 dark:hover:bg-burgundy-900/50 transition-colors text-center text-sm font-medium"
                >
                  View All Quotes
                </Link>
              </div>
            </div>

            {/* Share Options Card */}
            <div className="bg-burgundy-50 dark:bg-burgundy-950/20 rounded-md border border-burgundy-200 dark:border-burgundy-900/30 p-5">
              <h3 className="text-lg font-serif text-burgundy-900 dark:text-burgundy-300 mb-4">
                Share This Quote
              </h3>
              <div className="space-y-3 text-sm text-navy-700 dark:text-navy-300">
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-burgundy-600 dark:bg-burgundy-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p>Copy the quote with proper attribution for your research</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-burgundy-600 dark:bg-burgundy-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p>Share on social media to inspire others</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-burgundy-600 dark:bg-burgundy-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p>Use in presentations with proper citation</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuoteDetailPage;