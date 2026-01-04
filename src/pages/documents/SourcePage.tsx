import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Book, ArrowLeft, Filter, Archive, Tags, Calendar, Search, ChevronDown, ChevronUp, X, Grid, Layers, Clock } from 'lucide-react';
import { useData } from '../../context/DataContext';
import ExternalRepositoriesLayout from './sections/ExternalRepositoriesLayout';
import ArchiveLinksLayout from './sections/ArchiveLinksLayout';
import HistoriansCommentariesLayout from './sections/HistoriansCommentariesLayout';

const SourcePage: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const { 
    getSourcesByCategory, 
    getCategoryById, 
    getCategoryGradient,
    getAllTags,
    getSourcesByTag 
  } = useData();
  
  const [timeFilter, setTimeFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [expandedSection, setExpandedSection] = useState<'time' | 'type' | 'search' | null>('time');
  
  const categoryInfo = category ? getCategoryById(category) : null;
  
  if (!categoryInfo) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-navy-900 py-12">
        <div className="container-max">
          <div className="text-center py-16">
            <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-navy-700 dark:to-navy-600 rounded-full flex items-center justify-center shadow-inner">
              <Book className="w-10 h-10 text-gray-400 dark:text-navy-400" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-navy-800 dark:text-navy-100 mb-4">
              Category Not Found
            </h1>
            <Link to="/sources" className="inline-block px-6 py-3 bg-gradient-to-r from-burgundy-600 to-burgundy-700 hover:from-burgundy-700 hover:to-burgundy-800 text-white font-semibold rounded-lg transition-all shadow-md hover:shadow-lg">
              Return to Sources
            </Link>
          </div>
        </div>
      </div>
    );
  }

  let sources = getSourcesByCategory(category!);

  // Apply filters
  sources = sources.filter(source => {
    // Time filter
    if (timeFilter !== 'all') {
      const [startCentury, endCentury] = timeFilter.split('-').map(Number);
      if (source.century < startCentury || source.century > endCentury) {
        return false;
      }
    }

    // Type filter
    if (typeFilter !== 'all' && source.type !== typeFilter) {
      return false;
    }

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        source.title.toLowerCase().includes(query) ||
        (source.author && source.author.toLowerCase().includes(query)) ||
        source.summary.toLowerCase().includes(query) ||
        source.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    return true;
  });

  const activeFiltersCount = 
    (timeFilter !== 'all' ? 1 : 0) + 
    (typeFilter !== 'all' ? 1 : 0) + 
    (searchQuery ? 1 : 0);

  const handleResetFilters = () => {
    setTimeFilter('all');
    setTypeFilter('all');
    setSearchQuery('');
  };

  const toggleSection = (section: 'time' | 'type' | 'search') => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  // Get gradient colors from DataContext
  const categoryGradient = getCategoryGradient(category!);

  const FilterPanel = () => (
    <div className="space-y-3 sm:space-y-4">
      {/* Time Period Filter */}
      <div className="bg-white dark:bg-navy-800 rounded-xl border-2 border-gray-200 dark:border-navy-700 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
        <button
          onClick={() => toggleSection('time')}
          className={`w-full bg-gradient-to-r ${categoryGradient} px-4 py-3 flex items-center justify-between transition-colors hover:opacity-90`}
        >
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-white" />
            <h3 className="text-sm font-bold text-white">Time Period</h3>
          </div>
          {expandedSection === 'time' ? (
            <ChevronUp className="w-5 h-5 text-white" />
          ) : (
            <ChevronDown className="w-5 h-5 text-white" />
          )}
        </button>
        {expandedSection === 'time' && (
          <div className="p-4">
            <select
              value={timeFilter}
              onChange={(e) => setTimeFilter(e.target.value)}
              className="w-full p-3 rounded-lg border-2 border-gray-200 dark:border-navy-600 bg-white dark:bg-navy-700 dark:text-navy-100 font-medium focus:border-burgundy-500 dark:focus:border-burgundy-400 focus:ring-2 focus:ring-burgundy-200 dark:focus:ring-burgundy-900"
            >
              <option value="all">All Time Periods</option>
              <option value="1-3">1st-3rd Century (Early Church)</option>
              <option value="4-6">4th-6th Century (Patristic)</option>
              <option value="7-10">7th-10th Century (Early Medieval)</option>
              <option value="11-15">11th-15th Century (High Medieval)</option>
              <option value="16-18">16th-18th Century (Reformation)</option>
              <option value="19-21">19th-21st Century (Modern)</option>
            </select>
          </div>
        )}
      </div>

      {/* Document Type Filter */}
      <div className="bg-white dark:bg-navy-800 rounded-xl border-2 border-gray-200 dark:border-navy-700 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
        <button
          onClick={() => toggleSection('type')}
          className={`w-full bg-gradient-to-r ${categoryGradient} px-4 py-3 flex items-center justify-between transition-colors hover:opacity-90`}
        >
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-white" />
            <h3 className="text-sm font-bold text-white">Document Type</h3>
          </div>
          {expandedSection === 'type' ? (
            <ChevronUp className="w-5 h-5 text-white" />
          ) : (
            <ChevronDown className="w-5 h-5 text-white" />
          )}
        </button>
        {expandedSection === 'type' && (
          <div className="p-4">
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="w-full p-3 rounded-lg border-2 border-gray-200 dark:border-navy-600 bg-white dark:bg-navy-700 dark:text-navy-100 font-medium focus:border-burgundy-500 dark:focus:border-burgundy-400 focus:ring-2 focus:ring-burgundy-200 dark:focus:ring-burgundy-900"
            >
              <option value="all">All Document Types</option>
              <option value="text">Text</option>
              <option value="letter">Letter</option>
              <option value="decree">Decree</option>
              <option value="sermon">Sermon</option>
              <option value="book">Book</option>
              <option value="archive">Archive Collection</option>
              <option value="commentary">Commentary</option>
            </select>
          </div>
        )}
      </div>

      {/* Search Filter */}
      <div className="bg-white dark:bg-navy-800 rounded-xl border-2 border-gray-200 dark:border-navy-700 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
        <button
          onClick={() => toggleSection('search')}
          className={`w-full bg-gradient-to-r ${categoryGradient} px-4 py-3 flex items-center justify-between transition-colors hover:opacity-90`}
        >
          <div className="flex items-center gap-2">
            <Search className="w-5 h-5 text-white" />
            <h3 className="text-sm font-bold text-white">Search Sources</h3>
          </div>
          {expandedSection === 'search' ? (
            <ChevronUp className="w-5 h-5 text-white" />
          ) : (
            <ChevronDown className="w-5 h-5 text-white" />
          )}
        </button>
        {expandedSection === 'search' && (
          <div className="p-4">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by title, author, or keywords..."
                className="w-full p-3 pl-10 rounded-lg border-2 border-gray-200 dark:border-navy-600 bg-white dark:bg-navy-700 dark:text-navy-100 font-medium focus:border-burgundy-500 dark:focus:border-burgundy-400 focus:ring-2 focus:ring-burgundy-200 dark:focus:ring-burgundy-900"
              />
              <Search size={18} className="absolute left-3 top-3.5 text-gray-400 dark:text-navy-400" />
            </div>
          </div>
        )}
      </div>

      {/* Reset Button */}
      {activeFiltersCount > 0 && (
        <button
          onClick={handleResetFilters}
          className="w-full px-4 py-3 bg-gradient-to-r from-burgundy-600 to-burgundy-700 hover:from-burgundy-700 hover:to-burgundy-800 text-white font-semibold rounded-lg transition-all shadow-md hover:shadow-lg"
        >
          Clear All Filters ({activeFiltersCount})
        </button>
      )}
    </div>
  );

  // Determine which layout to use based on category
  const renderSourcesLayout = () => {
    if (sources.length === 0) {
      return (
        <div className="text-center py-12 sm:py-16 text-navy-600 dark:text-navy-300">
          <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-navy-700 dark:to-navy-600 rounded-full flex items-center justify-center shadow-inner">
            <Archive className="w-10 h-10 text-gray-400 dark:text-navy-400" />
          </div>
          <p className="text-xl font-bold mb-2">No sources found</p>
          <p className="text-sm mb-6">Try adjusting your filters or search terms</p>
          <button
            className="px-6 py-3 bg-gradient-to-r from-burgundy-600 to-burgundy-700 hover:from-burgundy-700 hover:to-burgundy-800 text-white rounded-lg transition-all shadow-md hover:shadow-lg font-semibold"
            onClick={handleResetFilters}
          >
            Reset All Filters
          </button>
        </div>
      );
    }

    // External Book Repositories - Display as links
    if (category === 'external-repositories' || category === 'digital-libraries') {
      return <ExternalRepositoriesLayout sources={sources} />;
    }

    // Archive Links - Display as archive cards
    if (category === 'archives' || category === 'archive-collections') {
      return <ArchiveLinksLayout sources={sources} />;
    }

    // Historians & Commentaries - Display as book cards
    if (category === 'historians' || category === 'commentaries' || category === 'historians-commentaries') {
      return <HistoriansCommentariesLayout sources={sources} />;
    }

    // Default fallback to ArchiveLinksLayout
    return <ArchiveLinksLayout sources={sources} />;
  };

  // Special handling for topics category
  if (category === 'topics') {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-navy-900">
        {/* Header with Category-Specific Gradient */}
        <div className={`relative overflow-hidden bg-gradient-to-br ${categoryGradient}`}>
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-32 h-32 sm:w-48 sm:h-48 bg-white rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 right-10 w-40 h-40 sm:w-56 sm:h-56 bg-white rounded-full blur-3xl"></div>
          </div>
          
          <div className="relative container-max px-3 sm:px-4 py-6 sm:py-8 md:py-12">
            <Link 
              to="/sources" 
              className="inline-flex items-center gap-2 text-white/90 hover:text-white mb-6 transition-colors group"
            >
              <div className="w-8 h-8 bg-white/30 backdrop-blur-sm rounded-lg flex items-center justify-center border-2 border-white/20 group-hover:bg-white/40">
                <ArrowLeft size={16} className="text-white" />
              </div>
              <span className="font-medium text-white">Back to All Sources</span>
            </Link>
            
            <div className="flex items-center gap-3 mb-4">
              <div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-white leading-tight">
                  {categoryInfo.title}
                </h1>
                <p className="text-sm sm:text-base text-white/90 mt-1">
                  {categoryInfo.description}
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-4 mt-6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/30 backdrop-blur-sm rounded-lg flex items-center justify-center border-2 border-white/20">
                  <Tags className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <div>
                  <div className="text-sm sm:text-base font-bold text-white">10 Topics</div>
                  <div className="text-xs text-white/80">Organized themes</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/30 backdrop-blur-sm rounded-lg flex items-center justify-center border-2 border-white/20">
                  <Grid className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <div>
                  <div className="text-sm sm:text-base font-bold text-white">+500 Sources</div>
                  <div className="text-xs text-white/80">Across all topics</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Topics Grid */}
        <div className="container-max py-6 sm:py-8 md:py-10">
          <div className="mb-6 sm:mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-navy-800 dark:text-navy-100">
                Browse Topics
              </h2>
              <div className="hidden sm:flex items-center gap-2 text-sm font-semibold text-navy-600 dark:text-navy-300 bg-gradient-to-r from-gray-100 to-gray-50 dark:from-navy-700 dark:to-navy-600 px-4 py-2 rounded-full shadow-sm">
                <Grid size={14} />
                Select a topic to explore
              </div>
            </div>
            <p className="text-navy-600 dark:text-navy-300">
              Explore sources organized by theological and historical themes
            </p>
          </div>

          <TopicsGrid />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-navy-900">
      {/* Header with Category-Specific Gradient */}
      <div className={`relative overflow-hidden bg-gradient-to-br ${categoryGradient}`}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 sm:w-48 sm:h-48 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 sm:w-56 sm:h-56 bg-white rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative container-max px-3 sm:px-4 py-6 sm:py-8 md:py-12">
          <Link 
            to="/sources" 
            className="inline-flex items-center gap-2 text-white/90 hover:text-white mb-6 transition-colors group"
          >
            <div className="w-8 h-8 bg-white/30 backdrop-blur-sm rounded-lg flex items-center justify-center border-2 border-white/20 group-hover:bg-white/40">
              <ArrowLeft size={16} className="text-white" />
            </div>
            <span className="font-medium text-white">Back to All Sources</span>
          </Link>
          
          <div className="flex items-center gap-3 mb-4">
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-white leading-tight">
                {categoryInfo.title}
              </h1>
              <p className="text-sm sm:text-base text-white/90 mt-1">
                {categoryInfo.description}
              </p>
              <p className="text-xs text-white/80 mt-1">
                {categoryInfo.stats}
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-4 mt-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/30 backdrop-blur-sm rounded-lg flex items-center justify-center border-2 border-white/20">
                <Grid className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <div>
                <div className="text-sm sm:text-base font-bold text-white">{sources.length} Sources</div>
                <div className="text-xs text-white/80">In this collection</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/30 backdrop-blur-sm rounded-lg flex items-center justify-center border-2 border-white/20">
                <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <div>
                <div className="text-sm sm:text-base font-bold text-white">Centuries 1-21</div>
                <div className="text-xs text-white/80">Historical coverage</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden sticky top-0 z-20 bg-white dark:bg-navy-800 border-b-2 border-gray-200 dark:border-navy-700 px-4 py-3 shadow-md">
        <button
          onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
          className="flex items-center justify-between w-full"
        >
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-burgundy-600 dark:text-burgundy-400" />
            <span className="font-bold text-navy-800 dark:text-navy-100">
              Filters
            </span>
            {activeFiltersCount > 0 && (
              <span className="bg-gradient-to-r from-burgundy-600 to-burgundy-700 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-md">
                {activeFiltersCount}
              </span>
            )}
          </div>
          <span className="text-sm font-semibold text-navy-600 dark:text-navy-300 bg-gray-100 dark:bg-navy-700 px-3 py-1 rounded-full">
            {sources.length} sources
          </span>
        </button>
      </div>
      
      {/* Main Content */}
      <div className="container-max py-4 sm:py-6 md:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {/* Desktop Filters Panel */}
          <div className="hidden lg:block">
            <div className="sticky top-4">
              <FilterPanel />
            </div>
          </div>
          
          {/* Mobile Filters Panel */}
          {mobileFiltersOpen && (
            <div className="lg:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-sm" onClick={() => setMobileFiltersOpen(false)}>
              <div className="absolute inset-y-0 left-0 w-full max-w-sm bg-slate-50 dark:bg-navy-900 overflow-y-auto shadow-2xl" onClick={(e) => e.stopPropagation()}>
                <div className={`sticky top-0 z-10 bg-gradient-to-r ${categoryGradient} border-b-2 border-white/20 px-4 py-3 flex items-center justify-between shadow-md`}>
                  <div className="flex items-center gap-2">
                    <Filter className="w-5 h-5 text-white" />
                    <h2 className="font-bold text-white">Filters</h2>
                  </div>
                  <button
                    onClick={() => setMobileFiltersOpen(false)}
                    className="p-2 hover:bg-white/20 rounded-full transition-colors"
                  >
                    <X className="w-5 h-5 text-white" />
                  </button>
                </div>
                <div className="p-4">
                  <FilterPanel />
                </div>
              </div>
            </div>
          )}
          
          {/* Sources List */}
          <div className="lg:col-span-3">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-6">
              <h2 className="text-xl sm:text-2xl font-serif text-navy-800 dark:text-navy-100 font-bold">
                {sources.length} {sources.length === 1 ? 'Source' : 'Sources'} 
                {timeFilter !== 'all' && ' in Selected Period'}
                {typeFilter !== 'all' && ` • ${typeFilter}`}
                {searchQuery && ` • "${searchQuery}"`}
              </h2>
              <div className="hidden lg:flex items-center gap-2 text-sm font-semibold text-navy-600 dark:text-navy-300 bg-gradient-to-r from-gray-100 to-gray-50 dark:from-navy-700 dark:to-navy-600 px-4 py-2 rounded-full shadow-sm">
                <Filter size={14} />
                {activeFiltersCount} filter{activeFiltersCount !== 1 ? 's' : ''} active
              </div>
            </div>
            
            {renderSourcesLayout()}
          </div>
        </div>
      </div>
    </div>
  );
};

// Topics Grid Component
const TopicsGrid: React.FC = () => {
  const { getAllTags, getSourcesByTag } = useData();
  const allTags = getAllTags();
  
  const topics = allTags.map(tag => {
    const sources = getSourcesByTag(tag);
    const count = sources.length;
    
    const getColor = (tagName: string) => {
      const tagLower = tagName.toLowerCase();
      if (tagLower.includes('historiography') || tagLower.includes('history')) return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      if (tagLower.includes('archive') || tagLower.includes('digital')) return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200';
      if (tagLower.includes('church') || tagLower.includes('christian')) return 'bg-burgundy-100 text-burgundy-800 dark:bg-burgundy-900 dark:text-burgundy-200';
      if (tagLower.includes('biblical') || tagLower.includes('scripture')) return 'bg-navy-100 text-navy-800 dark:bg-navy-900 dark:text-navy-200';
      if (tagLower.includes('medieval') || tagLower.includes('middle ages')) return 'bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-200';
      if (tagLower.includes('roman') || tagLower.includes('roman empire')) return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200';
      if (tagLower.includes('norman') || tagLower.includes('crusade')) return 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200';
      if (tagLower.includes('sociology') || tagLower.includes('social')) return 'bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200';
      if (tagLower.includes('islam') || tagLower.includes('muslim')) return 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200';
      return 'bg-violet-100 text-violet-800 dark:bg-violet-900 dark:text-violet-200';
    };

    return {
      name: tag,
      count,
      color: getColor(tag)
    };
  }).filter(topic => topic.count > 0)
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
      {topics.map((topic) => (
        <div key={topic.name} className="group">
          <Link
            to={`/sources/topic/${encodeURIComponent(topic.name.toLowerCase().replace(/ /g, '-'))}`}
            className="block h-full"
          >
            <div className="bg-white dark:bg-navy-800 rounded-xl border-2 border-gray-200 dark:border-navy-700 overflow-hidden h-full hover:shadow-xl transition-all duration-300 hover:border-burgundy-400 dark:hover:border-burgundy-600 group-hover:scale-[1.02]">
              <div className="p-4 sm:p-5">
                <div className={`p-4 rounded-lg ${topic.color} mb-3 shadow-sm`}>
                  <div className="flex justify-between items-center">
                    <h3 className="font-serif text-lg font-bold">{topic.name}</h3>
                    <span className="text-sm font-bold px-2 py-1 bg-white/20 dark:bg-black/20 rounded-full">
                      {topic.count}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-navy-600 dark:text-navy-300">
                    Explore {topic.count} {topic.count === 1 ? 'source' : 'sources'}
                  </span>
                  <span className="text-xs font-semibold text-burgundy-700 dark:text-burgundy-400 group-hover:text-burgundy-800 dark:group-hover:text-burgundy-300">
                    View →
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default SourcePage;