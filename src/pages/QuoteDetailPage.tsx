import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Quote, User, BookOpen, Calendar, Share2, Heart, Copy, Check } from 'lucide-react';
import { figures } from '../data/figures';
import { formatLifespan } from '../utils/dateUtils';

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
      <div className="min-h-screen bg-white dark:bg-slate-900 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center py-16">
            <h1 className="text-3xl font-serif text-burgundy-900 dark:text-burgundy-300 mb-4">
              Quote Not Found
            </h1>
            <p className="text-slate-600 dark:text-slate-300 mb-8 text-lg">
              The quote you're looking for doesn't exist or has been removed.
            </p>
            <Link to="/quotes" className="inline-block px-6 py-3 bg-burgundy-700 text-white rounded-lg hover:bg-burgundy-800 transition-colors">
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
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Link to="/quotes" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-8 transition-colors">
            <ArrowLeft size={20} />
            <span>Back to Quotes</span>
          </Link>
          
          <div className="flex items-center gap-3 mb-6">
            <Quote className="w-10 h-10 text-burgundy-200" />
            <div>
              <h2 className="text-2xl font-serif">Historical Quote</h2>
              <p className="text-burgundy-200">Wisdom from {author.name}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Quote Display */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <Quote className="w-16 h-16 text-burgundy-200 dark:text-burgundy-800 mx-auto mb-8 opacity-40" />
          <blockquote className="mb-8">
            <p className="text-3xl md:text-4xl font-serif italic text-slate-800 dark:text-slate-100 leading-relaxed mb-8">
              "{quote.text}"
            </p>
            <footer className="text-xl text-slate-600 dark:text-slate-400">
              <cite className="font-medium text-burgundy-800 dark:text-burgundy-300 not-italic">
                — {author.name}
              </cite>
            </footer>
          </blockquote>

          {/* Action Buttons */}
          <div className="flex justify-center flex-wrap gap-4 mb-12">
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 px-6 py-3 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg transition-colors"
            >
              {copied ? <Check size={18} /> : <Copy size={18} />}
              {copied ? 'Copied!' : 'Copy Quote'}
            </button>
            
            <button
              onClick={handleLike}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-colors ${
                liked 
                  ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300' 
                  : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'
              }`}
            >
              <Heart size={18} className={liked ? 'fill-current' : ''} />
              {liked ? 'Liked' : 'Like'}
            </button>
            
            <button className="flex items-center gap-2 px-6 py-3 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg transition-colors">
              <Share2 size={18} />
              Share
            </button>
          </div>
        </div>

        {/* Quote Details */}
        <div className="max-w-3xl mx-auto">
          <div className="border-t-2 border-burgundy-200 dark:border-burgundy-800 pt-8 mb-12">
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="w-6 h-6 text-burgundy-700 dark:text-burgundy-300" />
              <h3 className="text-2xl font-serif text-burgundy-900 dark:text-burgundy-300">
                Source
              </h3>
            </div>
            <p className="text-lg text-slate-700 dark:text-slate-300 mb-4">
              <span className="font-medium">{quote.source}</span>
            </p>
            
            {quote.context && (
              <>
                <h4 className="text-xl font-serif text-burgundy-900 dark:text-burgundy-300 mb-3 mt-6">
                  Context
                </h4>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg">
                  {quote.context}
                </p>
              </>
            )}
          </div>

          {/* Author Info */}
          <div className="bg-burgundy-50 dark:bg-slate-800 rounded-lg p-8 mb-12">
            <div className="flex items-center gap-2 mb-6">
              <User className="w-6 h-6 text-burgundy-700 dark:text-burgundy-300" />
              <h3 className="text-2xl font-serif text-burgundy-900 dark:text-burgundy-300">
                About the Author
              </h3>
            </div>
            
            <Link to={`/figures/${author.id}`} className="flex items-center gap-6 mb-6 hover:opacity-80 transition-opacity">
              <div className="w-24 h-24 rounded-full overflow-hidden bg-slate-200 dark:bg-slate-700 flex-shrink-0">
                <img 
                  src={author.image} 
                  alt={author.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h4 className="text-xl font-medium text-slate-900 dark:text-slate-100 mb-1">
                  {author.name}
                </h4>
                <p className="text-slate-600 dark:text-slate-400 mb-2">
                  {formatLifespan(author.birthYear, author.deathYear)}
                </p>
                <div className="flex flex-wrap gap-2">
                  {author.roles.slice(0, 3).map(role => (
                    <span 
                      key={role}
                      className="px-3 py-1 bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-full text-sm"
                    >
                      {role}
                    </span>
                  ))}
                </div>
              </div>
            </Link>

            <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
              {author.description.length > 200 
                ? `${author.description.substring(0, 200)}...` 
                : author.description}
            </p>

            <Link 
              to={`/figures/${author.id}`}
              className="text-burgundy-700 dark:text-burgundy-300 hover:underline font-medium"
            >
              Learn more about {author.name} →
            </Link>
          </div>

          {/* More Quotes */}
          {otherQuotes.length > 0 && (
            <div>
              <h3 className="text-2xl font-serif text-burgundy-900 dark:text-burgundy-300 mb-6 pb-3 border-b-2 border-burgundy-200 dark:border-burgundy-800">
                More Quotes from {author.name}
              </h3>
              <div className="space-y-6">
                {otherQuotes.slice(0, 3).map((otherQuote) => (
                  <Link
                    key={otherQuote.id}
                    to={`/quotes/${otherQuote.id}`}
                    className="block p-6 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors border-l-4 border-burgundy-300 dark:border-burgundy-700"
                  >
                    <blockquote>
                      <p className="text-lg italic text-slate-700 dark:text-slate-300 mb-3">
                        "{otherQuote.text.length > 150 ? `${otherQuote.text.substring(0, 150)}...` : otherQuote.text}"
                      </p>
                      <footer className="text-sm text-slate-600 dark:text-slate-400">
                        {otherQuote.source}
                      </footer>
                    </blockquote>
                  </Link>
                ))}
              </div>
              
              {otherQuotes.length > 3 && (
                <div className="mt-8 text-center">
                  <Link 
                    to={`/figures/${author.id}`}
                    className="text-burgundy-700 dark:text-burgundy-300 hover:underline text-lg font-medium"
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