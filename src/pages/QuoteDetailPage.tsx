import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Quote, User, BookOpen, Calendar, Share2, Heart, Copy, Check } from 'lucide-react';
import { figures } from '../data/figures';
import { formatLifespan } from '../utils/dateUtils';

const QuoteDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [copied, setCopied] = useState(false);
  const [liked, setLiked] = useState(false);
  
  // Find the quote and its author
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
      <div className="min-h-screen bg-slate-50 dark:bg-navy-900 py-12">
        <div className="container-max">
          <div className="card p-8 text-center">
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

  // Get other quotes from the same author
  const otherQuotes = author.quotes.filter(q => q.id !== quote.id);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-navy-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-burgundy-800 to-navy-900 text-white py-12">
        <div className="container-max">
          <div className="flex items-center gap-4 mb-6">
            <Link to="/quotes" className="text-white/80 hover:text-white">
              <ArrowLeft size={24} />
            </Link>
            <div className="flex items-center gap-3">
              <Quote className="w-8 h-8" />
              <div>
                <h1 className="text-3xl font-serif">Historical Quote</h1>
                <p className="text-burgundy-200 mt-1">
                  Wisdom from {author.name}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container-max py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Quote */}
          <div className="lg:col-span-2">
            <div className="card p-8 mb-8">
              {/* Quote Text */}
              <blockquote className="text-center mb-8">
                <Quote className="w-12 h-12 text-burgundy-300 dark:text-burgundy-700 mx-auto mb-6 opacity-50" />
                <p className="text-2xl md:text-3xl font-serif italic text-navy-800 dark:text-navy-100 leading-relaxed mb-6">
                  "{quote.text}"
                </p>
                <footer className="text-lg text-navy-600 dark:text-navy-300">
                  <cite className="font-medium text-burgundy-700 dark:text-burgundy-300">
                    — {author.name}
                  </cite>
                </footer>
              </blockquote>

              {/* Source Information */}
              <div className="border-t border-navy-200 dark:border-navy-700 pt-6">
                <div className="flex items-center gap-2 mb-4">
                  <BookOpen className="w-5 h-5 text-navy-600 dark:text-navy-300" />
                  <h3 className="text-lg font-serif text-navy-800 dark:text-navy-100">
                    Source
                  </h3>
                </div>
                <p className="text-navy-700 dark:text-navy-300 mb-4">
                  <span className="font-medium">{quote.source}</span>
                </p>
                
                {quote.context && (
                  <>
                    <h4 className="text-md font-serif text-navy-800 dark:text-navy-100 mb-2">
                      Context
                    </h4>
                    <p className="text-navy-600 dark:text-navy-300 leading-relaxed">
                      {quote.context}
                    </p>
                  </>
                )}
              </div>

              {/* Actions */}
              <div className="border-t border-navy-200 dark:border-navy-700 pt-6 mt-6">
                <div className="flex flex-wrap gap-4">
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-2 px-4 py-2 bg-navy-100 hover:bg-navy-200 dark:bg-navy-700 dark:hover:bg-navy-600 text-navy-700 dark:text-navy-300 rounded-md transition-colors"
                  >
                    {copied ? <Check size={18} /> : <Copy size={18} />}
                    {copied ? 'Copied!' : 'Copy Quote'}
                  </button>
                  
                  <button
                    onClick={handleLike}
                    className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
                      liked 
                        ? 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300' 
                        : 'bg-navy-100 hover:bg-navy-200 dark:bg-navy-700 dark:hover:bg-navy-600 text-navy-700 dark:text-navy-300'
                    }`}
                  >
                    <Heart size={18} className={liked ? 'fill-current' : ''} />
                    {liked ? 'Liked' : 'Like'}
                  </button>
                  
                  <button className="flex items-center gap-2 px-4 py-2 bg-navy-100 hover:bg-navy-200 dark:bg-navy-700 dark:hover:bg-navy-600 text-navy-700 dark:text-navy-300 rounded-md transition-colors">
                    <Share2 size={18} />
                    Share
                  </button>
                </div>
              </div>
            </div>

            {/* Other Quotes from Same Author */}
            {otherQuotes.length > 0 && (
              <div className="card p-6">
                <h3 className="text-xl font-serif text-burgundy-700 dark:text-burgundy-300 mb-4">
                  More Quotes from {author.name}
                </h3>
                <div className="space-y-4">
                  {otherQuotes.slice(0, 3).map((otherQuote, index) => (
                    <Link
                      key={otherQuote.id}
                      to={`/quotes/${otherQuote.id}`}
                      className="block p-4 rounded-lg hover:bg-navy-50 dark:hover:bg-navy-700 transition-colors border border-transparent hover:border-burgundy-200 dark:hover:border-burgundy-700"
                    >
                      <blockquote className="border-l-2 border-burgundy-300 dark:border-burgundy-700 pl-3">
                        <p className="italic text-navy-700 dark:text-navy-300 mb-2">
                          "{otherQuote.text.length > 120 ? `${otherQuote.text.substring(0, 120)}...` : otherQuote.text}"
                        </p>
                        <footer className="text-sm text-navy-600 dark:text-navy-400">
                          {otherQuote.source}
                        </footer>
                      </blockquote>
                    </Link>
                  ))}
                </div>
                
                {otherQuotes.length > 3 && (
                  <div className="mt-4 text-center">
                    <Link 
                      to={`/figures/${author.id}`}
                      className="text-burgundy-700 dark:text-burgundy-300 hover:underline"
                    >
                      View all {otherQuotes.length + 1} quotes from {author.name} →
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Author Information */}
            <div className="card p-6">
              <div className="flex items-center gap-2 mb-4">
                <User className="w-5 h-5 text-burgundy-700 dark:text-burgundy-300" />
                <h3 className="text-xl font-serif text-burgundy-700 dark:text-burgundy-300">
                  About the Author
                </h3>
              </div>
              
              <Link to={`/figures/${author.id}`} className="block hover:opacity-80 transition-opacity">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden bg-navy-100 dark:bg-navy-700">
                    <img 
                      src={author.image} 
                      alt={author.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-medium text-navy-800 dark:text-navy-100">
                      {author.name}
                    </h4>
                    <p className="text-sm text-navy-600 dark:text-navy-300">
                      {formatLifespan(author.birthYear, author.deathYear)}
                    </p>
                  </div>
                </div>
              </Link>

              <div className="flex flex-wrap gap-2 mb-4">
                {author.roles.map(role => (
                  <span 
                    key={role}
                    className="px-2 py-1 bg-navy-100 dark:bg-navy-700 text-navy-700 dark:text-navy-300 rounded-full text-xs"
                  >
                    {role}
                  </span>
                ))}
              </div>

              <p className="text-navy-600 dark:text-navy-300 text-sm leading-relaxed mb-4">
                {author.description.length > 150 
                  ? `${author.description.substring(0, 150)}...` 
                  : author.description}
              </p>

              <Link 
                to={`/figures/${author.id}`}
                className="text-burgundy-700 dark:text-burgundy-300 hover:underline text-sm"
              >
                Learn more about {author.name} →
              </Link>
            </div>

            {/* Quote Statistics */}
            <div className="card p-6">
              <h3 className="text-lg font-serif text-burgundy-700 dark:text-burgundy-300 mb-4">
                Quote Collection
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-navy-600 dark:text-navy-300">Total Quotes</span>
                  <span className="font-medium text-navy-800 dark:text-navy-100">
                    {author.quotes.length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-navy-600 dark:text-navy-300">Historical Period</span>
                  <span className="font-medium text-navy-800 dark:text-navy-100">
                    {author.birthYear ? `${Math.floor(author.birthYear / 100) + 1}th Century` : 'Unknown'}
                  </span>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="card p-6">
              <h3 className="text-lg font-serif text-burgundy-700 dark:text-burgundy-300 mb-4">
                Explore More
              </h3>
              <div className="space-y-3">
                <Link
                  to="/quotes"
                  className="flex items-center gap-2 text-navy-600 dark:text-navy-300 hover:text-burgundy-700 dark:hover:text-burgundy-300"
                >
                  <Quote size={16} />
                  <span>Browse All Quotes</span>
                </Link>
                <Link
                  to={`/figures/${author.id}`}
                  className="flex items-center gap-2 text-navy-600 dark:text-navy-300 hover:text-burgundy-700 dark:hover:text-burgundy-300"
                >
                  <User size={16} />
                  <span>View Author Profile</span>
                </Link>
                <Link
                  to="/figures"
                  className="flex items-center gap-2 text-navy-600 dark:text-navy-300 hover:text-burgundy-700 dark:hover:text-burgundy-300"
                >
                  <Calendar size={16} />
                  <span>Historical Figures</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuoteDetailPage;