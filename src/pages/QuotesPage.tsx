import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Quote, Search, Filter, BookOpen } from 'lucide-react';
import { figures } from '../data/figures';
import { eras } from '../data/eras';

const QuotesPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEra, setSelectedEra] = useState<string>('all');
  const [selectedAuthor, setSelectedAuthor] = useState<string>('all');

  // Collect all quotes from figures
  const allQuotes = figures.flatMap(figure => 
    figure.quotes.map(quote => ({
      ...quote,
      authorName: figure.name,
      authorImage: figure.image,
      authorRoles: figure.roles,
      authorBirthYear: figure.birthYear,
      authorDeathYear: figure.deathYear
    }))
  );

  // Get unique authors who have quotes
  const authorsWithQuotes = figures
    .filter(figure => figure.quotes.length > 0)
    .sort((a, b) => a.name.localeCompare(b.name));

  // Filter quotes based on search and filters
  const filteredQuotes = allQuotes.filter(quote => {
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      if (!quote.text.toLowerCase().includes(query) && 
          !quote.authorName.toLowerCase().includes(query) &&
          !quote.source.toLowerCase().includes(query)) {
        return false;
      }
    }

    // Author filter
    if (selectedAuthor !== 'all' && quote.figureId !== selectedAuthor) {
      return false;
    }

    // Era filter (simplified - based on author's lifespan)
    if (selectedEra !== 'all') {
      const era = eras.find(e => e.id === selectedEra);
      if (era && quote.authorBirthYear) {
        const authorLivedInEra = (
          (quote.authorBirthYear >= era.startYear && quote.authorBirthYear <= era.endYear) ||
          (quote.authorDeathYear && quote.authorDeathYear >= era.startYear && quote.authorDeathYear <= era.endYear) ||
          (quote.authorBirthYear <= era.endYear && (!quote.authorDeathYear || quote.authorDeathYear >= era.startYear))
        );
        if (!authorLivedInEra) return false;
      }
    }

    return true;
  });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-navy-900 pb-12">
      {/* Header */}
      <div className="bg-navy-800 text-white py-12">
        <div className="container-max">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <h1 className="text-4xl font-serif">Quotes</h1>
            </div>
            <p className="text-base text-navy-200 max-w-3xl">
              Discover wisdom from the great minds of church history. Explore inspiring quotes 
              from theologians, reformers, and spiritual leaders across the centuries.
            </p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="container-max py-8">
        <div className="border-l-4 border-navy-700 dark:border-navy-300 bg-white dark:bg-navy-800 p-6 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Filter size={20} className="text-navy-700 dark:text-navy-300" />
            <h2 className="text-xl font-serif text-navy-800 dark:text-navy-100">
              Find Quotes
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Search */}
            <div>
              <label className="block text-sm font-medium text-navy-600 dark:text-navy-300 mb-2">
                Search Quotes
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by text, author, or source..."
                  className="w-full p-3 pl-10 rounded-md border-2 border-navy-200 bg-white dark:bg-navy-700 dark:border-navy-600 dark:text-navy-100 focus:border-navy-500 focus:outline-none"
                />
                <Search size={18} className="absolute left-3 top-3.5 text-navy-400 dark:text-navy-500" />
              </div>
            </div>
            
            {/* Era Filter */}
            <div>
              <label className="block text-sm font-medium text-navy-600 dark:text-navy-300 mb-2">
                Historical Era
              </label>
              <select
                value={selectedEra}
                onChange={(e) => setSelectedEra(e.target.value)}
                className="w-full p-3 rounded-md border-2 border-navy-200 bg-white dark:bg-navy-700 dark:border-navy-600 dark:text-navy-100 focus:border-navy-500 focus:outline-none"
              >
                <option value="all">All Eras</option>
                {eras.map(era => (
                  <option key={era.id} value={era.id}>
                    {era.name} ({era.startYear}-{era.endYear})
                  </option>
                ))}
              </select>
            </div>

            {/* Author Filter */}
            <div>
              <label className="block text-sm font-medium text-navy-600 dark:text-navy-300 mb-2">
                Author
              </label>
              <select
                value={selectedAuthor}
                onChange={(e) => setSelectedAuthor(e.target.value)}
                className="w-full p-3 rounded-md border-2 border-navy-200 bg-white dark:bg-navy-700 dark:border-navy-600 dark:text-navy-100 focus:border-navy-500 focus:outline-none"
              >
                <option value="all">All Authors</option>
                {authorsWithQuotes.map(author => (
                  <option key={author.id} value={author.id}>
                    {author.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Clear Filters */}
          {(searchQuery || selectedEra !== 'all' || selectedAuthor !== 'all') && (
            <div className="mt-4 text-right">
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedEra('all');
                  setSelectedAuthor('all');
                }}
                className="text-burgundy-700 dark:text-burgundy-300 hover:underline text-sm"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>

        {/* Results */}
        <div className="mb-4 flex justify-between items-center">
          <h3 className="text-lg font-serif text-navy-800 dark:text-navy-100">
            {filteredQuotes.length} quotes found
          </h3>
        </div>

        {filteredQuotes.length === 0 ? (
          <div className="bg-white dark:bg-navy-800 rounded-lg shadow-md p-8 text-center">
            <Quote className="w-12 h-12 text-navy-400 dark:text-navy-500 mx-auto mb-4" />
            <h3 className="text-xl font-serif text-navy-800 dark:text-navy-100 mb-2">
              No quotes found
            </h3>
            <p className="text-navy-600 dark:text-navy-300 mb-4">
              Try adjusting your search terms or filters.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedEra('all');
                setSelectedAuthor('all');
              }}
              className="px-4 py-2 bg-burgundy-700 text-white rounded-md hover:bg-burgundy-800 transition-colors"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredQuotes.map((quote, index) => (
              <div
                key={quote.id}
                className="bg-white dark:bg-navy-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <Link to={`/quotes/${quote.id}`}>
                  <div className="p-6">
                    {/* Quote Text */}
                    <blockquote className="border-l-4 border-burgundy-300 dark:border-burgundy-700 pl-4 mb-4">
                      <p className="text-lg italic text-navy-700 dark:text-navy-300 leading-relaxed mb-3">
                        "{quote.text.length > 150 ? `${quote.text.substring(0, 150)}...` : quote.text}"
                      </p>
                    </blockquote>

                    {/* Author Info */}
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 rounded-full overflow-hidden bg-navy-100 dark:bg-navy-700">
                        <img 
                          src={quote.authorImage} 
                          alt={quote.authorName}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="font-medium text-navy-800 dark:text-navy-100">
                          {quote.authorName}
                        </div>
                        <div className="text-sm text-navy-600 dark:text-navy-300">
                          {quote.authorRoles[0]}
                        </div>
                      </div>
                    </div>

                    {/* Source */}
                    <div className="flex items-center gap-2 text-sm text-navy-600 dark:text-navy-400">
                      <BookOpen size={14} />
                      <span>{quote.source}</span>
                    </div>

                    {/* Context Preview */}
                    {quote.context && (
                      <p className="text-sm text-navy-500 dark:text-navy-400 mt-2 line-clamp-2">
                        {quote.context.length > 100 ? `${quote.context.substring(0, 100)}...` : quote.context}
                      </p>
                    )}
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}

        {/* Featured Authors */}
        <div className="mt-16">
          <h2 className="text-2xl font-serif text-navy-800 dark:text-navy-100 mb-6">
            Featured Authors
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {authorsWithQuotes.slice(0, 8).map((author, index) => (
              <div key={author.id}>
                <button
                  onClick={() => setSelectedAuthor(author.id)}
                  className="w-full p-4 bg-white dark:bg-navy-800 rounded-lg shadow-md hover:shadow-lg transition-shadow text-left"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-navy-100 dark:bg-navy-700">
                      <img 
                        src={author.image} 
                        alt={author.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-medium text-navy-800 dark:text-navy-100 text-sm">
                        {author.name}
                      </div>
                      <div className="text-xs text-navy-600 dark:text-navy-300">
                        {author.quotes.length} quotes
                      </div>
                    </div>
                  </div>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuotesPage;