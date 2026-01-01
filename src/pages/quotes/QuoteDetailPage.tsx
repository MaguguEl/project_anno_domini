import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Quote, User, BookOpen, Calendar, Share2, Heart, Copy, Check } from 'lucide-react';
import { figures } from '../../data/figures';
import { formatLifespan } from '../../utils/dateUtils';

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
      <div className="min-h-screen bg-white dark:bg-slate-900 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center py-12">
            <h1 className="text-2xl sm:text-3xl font-serif text-burgundy-900 dark:text-burgundy-300 mb-3">
              Quote Not Found
            </h1>
            <p className="text-slate-600 dark:text-slate-300 mb-6 text-base sm:text-lg">
              The quote you're looking for doesn't exist or has been removed.
            </p>
            <Link to="/quotes" className="inline-block px-5 py-2.5 sm:px-6 sm:py-3 bg-burgundy-700 text-white rounded-lg hover:bg-burgundy-800 transition-colors text-sm sm:text-base">
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

  const otherQuotes = author.quotes.filter(q => q.id !== quote.id);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-burgundy-900 to-burgundy-800 dark:from-burgundy-950 dark:to-burgundy-900 text-white">
        <div className="max-w-5xl mx-auto px-4 py-6 sm:py-8 md:py-12">
          <Link to="/quotes" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 sm:mb-8 transition-colors text-sm sm:text-base">
            <ArrowLeft size={18} className="sm:w-5 sm:h-5" />
            <span>Back to Quotes</span>
          </Link>
          
          <div className="flex items-center gap-2.5 sm:gap-3">
            <Quote className="w-8 h-8 sm:w-10 sm:h-10 text-burgundy-200" />
            <div>
              <h2 className="text-xl sm:text-2xl font-serif">Historical Quote</h2>
              <p className="text-sm sm:text-base text-burgundy-200">Wisdom from {author.name}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Quote Display */}
      <div className="max-w-5xl mx-auto px-4 py-8 sm:py-12 md:py-16">
        <div className="text-center mb-8 sm:mb-12">
          <Quote className="w-12 h-12 sm:w-16 sm:h-16 text-burgundy-200 dark:text-burgundy-800 mx-auto mb-6 sm:mb-8 opacity-40" />
          <blockquote className="mb-6 sm:mb-8">
            <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-serif italic text-slate-800 dark:text-slate-100 leading-relaxed mb-6 sm:mb-8 px-2">
              "{quote.text}"
            </p>
            <footer className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-400">
              <cite className="font-medium text-burgundy-800 dark:text-burgundy-300 not-italic">
                — {author.name}
              </cite>
            </footer>
          </blockquote>

          {/* Action Buttons */}
          <div className="flex justify-center flex-wrap gap-2 sm:gap-3 md:gap-4 mb-8 sm:mb-12">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 sm:gap-2 px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg transition-colors text-sm sm:text-base"
            >
              {copied ? <Check size={16} className="sm:w-[18px] sm:h-[18px]" /> : <Copy size={16} className="sm:w-[18px] sm:h-[18px]" />}
              {copied ? 'Copied!' : 'Copy'}
            </button>
            
            <button
              onClick={handleLike}
              className={`flex items-center gap-1.5 sm:gap-2 px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 rounded-lg transition-colors text-sm sm:text-base ${
                liked 
                  ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300' 
                  : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'
              }`}
            >
              <Heart size={16} className={`sm:w-[18px] sm:h-[18px] ${liked ? 'fill-current' : ''}`} />
              {liked ? 'Liked' : 'Like'}
            </button>
            
            <button className="flex items-center gap-1.5 sm:gap-2 px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg transition-colors text-sm sm:text-base">
              <Share2 size={16} className="sm:w-[18px] sm:h-[18px]" />
              Share
            </button>
          </div>
        </div>

        {/* Quote Details */}
        <div className="max-w-3xl mx-auto">
          <div className="border-t-2 border-burgundy-200 dark:border-burgundy-800 pt-6 sm:pt-8 mb-8 sm:mb-12">
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-burgundy-700 dark:text-burgundy-300" />
              <h3 className="text-xl sm:text-2xl font-serif text-burgundy-900 dark:text-burgundy-300">
                Source
              </h3>
            </div>
            <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 mb-3 sm:mb-4">
              <span className="font-medium">{quote.source}</span>
            </p>
            
            {quote.context && (
              <>
                <h4 className="text-lg sm:text-xl font-serif text-burgundy-900 dark:text-burgundy-300 mb-2 sm:mb-3 mt-4 sm:mt-6">
                  Context
                </h4>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-base sm:text-lg">
                  {quote.context}
                </p>
              </>
            )}
          </div>

          {/* Author Info */}
          <div className="bg-burgundy-50 dark:bg-slate-800 rounded-lg p-5 sm:p-6 md:p-8 mb-8 sm:mb-12">
            <div className="flex items-center gap-2 mb-4 sm:mb-6">
              <User className="w-5 h-5 sm:w-6 sm:h-6 text-burgundy-700 dark:text-burgundy-300" />
              <h3 className="text-xl sm:text-2xl font-serif text-burgundy-900 dark:text-burgundy-300">
                About the Author
              </h3>
            </div>
            
            <Link to={`/figures/${author.id}`} className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 mb-4 sm:mb-6 hover:opacity-80 transition-opacity">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden bg-slate-200 dark:bg-slate-700 flex-shrink-0">
                <img 
                  src={author.image} 
                  alt={author.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-center sm:text-left">
                <h4 className="text-lg sm:text-xl font-medium text-slate-900 dark:text-slate-100 mb-1">
                  {author.name}
                </h4>
                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mb-2">
                  {formatLifespan(author.birthYear, author.deathYear)}
                </p>
                <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                  {author.roles.slice(0, 3).map(role => (
                    <span 
                      key={role}
                      className="px-2.5 py-1 sm:px-3 bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-full text-xs sm:text-sm"
                    >
                      {role}
                    </span>
                  ))}
                </div>
              </div>
            </Link>

            <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-3 sm:mb-4 text-sm sm:text-base">
              {author.description.length > 200 
                ? `${author.description.substring(0, 200)}...` 
                : author.description}
            </p>

            <Link 
              to={`/figures/${author.id}`}
              className="text-burgundy-700 dark:text-burgundy-300 hover:underline font-medium text-sm sm:text-base"
            >
              Learn more about {author.name} →
            </Link>
          </div>

          {/* More Quotes */}
          {otherQuotes.length > 0 && (
            <div>
              <h3 className="text-xl sm:text-2xl font-serif text-burgundy-900 dark:text-burgundy-300 mb-4 sm:mb-6 pb-2 sm:pb-3 border-b-2 border-burgundy-200 dark:border-burgundy-800">
                More Quotes from {author.name}
              </h3>
              <div className="space-y-4 sm:space-y-6">
                {otherQuotes.slice(0, 3).map((otherQuote) => (
                  <Link
                    key={otherQuote.id}
                    to={`/quotes/${otherQuote.id}`}
                    className="block p-4 sm:p-6 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors border-l-4 border-burgundy-300 dark:border-burgundy-700"
                  >
                    <blockquote>
                      <p className="text-base sm:text-lg italic text-slate-700 dark:text-slate-300 mb-2 sm:mb-3">
                        "{otherQuote.text.length > 150 ? `${otherQuote.text.substring(0, 150)}...` : otherQuote.text}"
                      </p>
                      <footer className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                        {otherQuote.source}
                      </footer>
                    </blockquote>
                  </Link>
                ))}
              </div>
              
              {otherQuotes.length > 3 && (
                <div className="mt-6 sm:mt-8 text-center">
                  <Link 
                    to={`/figures/${author.id}`}
                    className="text-burgundy-700 dark:text-burgundy-300 hover:underline text-base sm:text-lg font-medium"
                  >
                    View all {author.quotes.length} quotes from {author.name} →
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuoteDetailPage;