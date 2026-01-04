import React from 'react';
import { Link } from 'react-router-dom';
import { User, Layers, Search, MessageSquareQuote, BookOpen } from 'lucide-react';
import { figures } from '../../data/figures';
import { eras } from '../../data/eras';
import DesktopFilterPanel from '../../components/filters/DesktopFilterPanel';
import MobileFilterToggle from '../../components/filters/MobileFilterToggle';
import MobileFilterDrawer from '../../components/filters/MobileFilterDrawer';
import EmptyState from '../../components/filters/EmptyState';
import ResultsHeader from '../../components/filters/ResultsHeader';
import { useFilters } from '../../hooks/useFilters';

const QuotesPage: React.FC = () => {
  // Use the custom hook for filter management
  const {
    filters,
    updateFilter,
    resetFilters,
    getActiveFiltersCount,
    mobileFiltersOpen,
    toggleMobileFilters,
    setMobileFiltersOpen
  } = useFilters({
    initialFilters: {
      search: '',
      era: 'all',
      author: 'all'
    }
  });

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

  const authorsWithQuotes = figures
    .filter(figure => figure.quotes.length > 0)
    .sort((a, b) => a.name.localeCompare(b.name));

  const filteredQuotes = allQuotes.filter(quote => {
    if (filters.search) {
      const query = filters.search.toLowerCase();
      if (!quote.text.toLowerCase().includes(query) && 
          !quote.authorName.toLowerCase().includes(query) &&
          !quote.source.toLowerCase().includes(query)) {
        return false;
      }
    }

    if (filters.author !== 'all' && quote.figureId !== filters.author) {
      return false;
    }

    if (filters.era !== 'all') {
      const era = eras.find(e => e.id === filters.era);
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

  const activeFiltersCount = getActiveFiltersCount();

  // Configure filters for the components
  const filterConfigs = [
    {
      id: 'search',
      label: 'Search',
      icon: Search,
      value: filters.search,
      onChange: (value: string) => updateFilter('search', value),
      options: [],
      type: 'search' as const,
      placeholder: 'Search text, author, source...'
    },
    {
      id: 'era',
      label: 'Era',
      icon: Layers,
      value: filters.era,
      onChange: (value: string) => updateFilter('era', value),
      options: [
        { value: 'all', label: 'All Eras' },
        ...eras.map(era => ({
          value: era.id,
          label: `${era.name} (${era.startYear}-${era.endYear})`
        }))
      ]
    },
    {
      id: 'author',
      label: 'Author',
      icon: User,
      value: filters.author,
      onChange: (value: string) => updateFilter('author', value),
      options: [
        { value: 'all', label: 'All Authors' },
        ...authorsWithQuotes.map(author => ({
          value: author.id,
          label: author.name
        }))
      ]
    }
  ];

  // Active filter tags for mobile drawer
  const activeFilterTags = [
    filters.era !== 'all' && {
      label: eras.find(e => e.id === filters.era)?.name || '',
      onRemove: () => updateFilter('era', 'all')
    },
    filters.author !== 'all' && {
      label: authorsWithQuotes.find(a => a.id === filters.author)?.name || '',
      onRemove: () => updateFilter('author', 'all')
    }
  ].filter(Boolean) as { label: string; onRemove: () => void }[];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-navy-900 pb-6 sm:pb-8 md:pb-12">
      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-navy-800 via-navy-900 to-navy-950 dark:from-navy-900 dark:via-navy-950 dark:to-black">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 sm:w-48 sm:h-48 bg-purple-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 sm:w-56 sm:h-56 bg-pink-400 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative container-max px-3 sm:px-4 py-6 sm:py-8 md:py-12 lg:py-16">
          <div className="max-w-4xl">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-white mb-2 sm:mb-3 md:mb-4 leading-tight">
              Quotes from Church History
            </h1>
            <p className="text-xs sm:text-sm md:text-base text-navy-100 leading-relaxed max-w-3xl">
              Discover inspiring quotes from theologians, reformers, and great minds of church history across the centuries.
            </p>
            
            <div className="flex flex-wrap gap-3 sm:gap-4 md:gap-6 mt-4 sm:mt-6 md:mt-8">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center">
                  <MessageSquareQuote className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <div>
                  <div className="text-lg sm:text-xl md:text-2xl font-bold text-white">{allQuotes.length}</div>
                  <div className="text-xs text-navy-200">Quotes</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center">
                  <User className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <div>
                  <div className="text-lg sm:text-xl md:text-2xl font-bold text-white">{authorsWithQuotes.length}</div>
                  <div className="text-xs text-navy-200">Authors</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Filter Toggle */}
      <MobileFilterToggle
        activeFiltersCount={activeFiltersCount}
        resultsCount={filteredQuotes.length}
        onToggle={toggleMobileFilters}
        accentGradient="from-navy-600 to-navy-700"
      />

      <div className="container-max py-3 sm:py-4 md:py-6 px-3 sm:px-4">
        {/* Desktop Filter Panel */}
        <div className="hidden md:block mb-6">
          <DesktopFilterPanel
            filters={filterConfigs}
            activeFiltersCount={activeFiltersCount}
            onResetFilters={resetFilters}
            resultsCount={filteredQuotes.length}
            accentColor="navy"
          />
        </div>

        {/* Mobile Filter Drawer */}
        <MobileFilterDrawer
          isOpen={mobileFiltersOpen}
          onClose={() => setMobileFiltersOpen(false)}
          filters={filterConfigs}
          activeFiltersCount={activeFiltersCount}
          onResetFilters={resetFilters}
          resultsCount={filteredQuotes.length}
          accentGradient="from-navy-700 to-navy-800"
          activeFilterTags={activeFilterTags}
        />

        {/* Results */}
        {filteredQuotes.length === 0 ? (
          <EmptyState
            icon={MessageSquareQuote}
            title="No quotes found"
            description="Try adjusting your filters"
            onReset={resetFilters}
            accentGradient="from-navy-600 to-navy-700"
          />
        ) : (
          <>
            <ResultsHeader
              icon={MessageSquareQuote}
              count={filteredQuotes.length}
              singularLabel="Quote"
              pluralLabel="Quotes"
              accentColor="navy"
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {filteredQuotes.map((quote) => (
                <div key={quote.id} className="bg-white dark:bg-navy-800 rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all border-2 border-transparent hover:border-navy-200 dark:hover:border-navy-600">
                  <Link to={`/quotes/${quote.id}`}>
                    <div className="p-4 sm:p-6">
                      <blockquote className="border-l-4 border-navy-300 dark:border-navy-700 pl-4 mb-4">
                        <p className="text-sm sm:text-base italic text-navy-700 dark:text-navy-300 leading-relaxed mb-3">
                          "{quote.text.length > 150 ? `${quote.text.substring(0, 150)}...` : quote.text}"
                        </p>
                      </blockquote>

                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden bg-navy-100 dark:bg-navy-700 ring-2 ring-navy-200 dark:ring-navy-600">
                          <img src={quote.authorImage} alt={quote.authorName} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <div className="font-semibold text-sm sm:text-base text-navy-800 dark:text-navy-100">
                            {quote.authorName}
                          </div>
                          <div className="text-xs text-navy-600 dark:text-navy-300">
                            {quote.authorRoles[0]}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-xs sm:text-sm text-navy-600 dark:text-navy-400">
                        <BookOpen size={14} />
                        <span>{quote.source}</span>
                      </div>

                      {quote.context && (
                        <p className="text-xs sm:text-sm text-navy-500 dark:text-navy-400 mt-2 line-clamp-2">
                          {quote.context.length > 100 ? `${quote.context.substring(0, 100)}...` : quote.context}
                        </p>
                      )}
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Featured Authors */}
        <div className="mt-12 sm:mt-16">
          <h2 className="text-lg font-serif font-bold text-navy-800 dark:text-navy-100 mb-4 sm:mb-6">
            Featured Authors
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {authorsWithQuotes.slice(0, 8).map((author) => (
              <button
                key={author.id}
                onClick={() => updateFilter('author', author.id)}
                className="p-3 sm:p-4 bg-white dark:bg-navy-800 rounded-xl shadow-md hover:shadow-xl transition-all text-left border-2 border-transparent hover:border-navy-200 dark:hover:border-navy-600"
              >
                <div className="flex items-center gap-2 sm:gap-3 mb-2">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden bg-navy-100 dark:bg-navy-700">
                    <img src={author.image} alt={author.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-xs sm:text-sm text-navy-800 dark:text-navy-100 truncate">
                      {author.name}
                    </div>
                    <div className="text-xs text-navy-600 dark:text-navy-300">
                      {author.quotes.length} quotes
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuotesPage;