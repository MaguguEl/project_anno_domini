import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Book, ArrowLeft, Filter, Users, Archive, Library, BookMarked, Tags, Calendar, Search } from 'lucide-react';
import { getSourcesByCategory } from '../../data/federatedSources';

const categoryInfo = {
  primary: {
    title: 'Primary Church Documents',
    description: 'Original texts, creeds, and official church documents that shaped Christian doctrine',
    icon: Book,
    color: 'bg-burgundy-700 dark:bg-burgundy-300',
    subtitle: 'Foundational texts that established core Christian beliefs and practices'
  },
  fathers: {
    title: 'Early Church Fathers Writings',
    description: 'Writings from influential early Christian leaders and theologians',
    icon: Users,
    color: 'bg-navy-700 dark:bg-navy-300',
    subtitle: 'Theological works from the great minds of early Christianity'
  },
  books: {
    title: 'External Book Repositories',
    description: 'Digital libraries and comprehensive book collections',
    icon: Library,
    color: 'bg-gold-600 dark:bg-gold-400',
    subtitle: 'Extensive collections of historical and theological works'
  },
  archives: {
    title: 'Archive Links',
    description: 'CCEL, NewAdvent, Internet Archive, and specialized collections',
    icon: Archive,
    color: 'bg-emerald-600 dark:bg-emerald-400',
    subtitle: 'Curated archives of historical Christian documents'
  },
  commentaries: {
    title: 'Historians & Commentaries',
    description: 'Historical analysis and scholarly works on church history',
    icon: BookMarked,
    color: 'bg-purple-600 dark:bg-purple-400',
    subtitle: 'Scholarly interpretations and historical analyses'
  },
  topics: {
    title: 'Topic Tags',
    description: 'Browse by councils, theology, liturgy, and more',
    icon: Tags,
    color: 'bg-rose-600 dark:bg-rose-400',
    subtitle: 'Organized by theological and historical themes'
  }
};

const SourceCategoryPage: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const [timeFilter, setTimeFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  const info = category ? categoryInfo[category as keyof typeof categoryInfo] : null;
  
  if (!info) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-navy-900 py-12">
        <div className="container-max">
          <div className="text-center">
            <h1 className="text-2xl font-serif text-navy-800 dark:text-navy-100 mb-4">
              Category Not Found
            </h1>
            <Link to="/sources" className="btn-primary">
              Return to Sources
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const Icon = info.icon;
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
        source.author?.toLowerCase().includes(query) ||
        source.summary.toLowerCase().includes(query) ||
        source.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    return true;
  });

  // Special handling for topics category
  if (category === 'topics') {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-navy-900">
        {/* Header */}
        <div className={`${info.color} bg-opacity-10 dark:bg-opacity-20 py-12`}>
          <div className="container-max">
            <div className="flex items-center gap-4 mb-6">
              <Link to="/sources" className="text-navy-800 dark:text-navy-100">
                <ArrowLeft size={24} />
              </Link>
              <div className="flex items-center gap-3">
                <Icon className={`w-8 h-8 ${info.color} text-white rounded-lg p-1.5`} />
                <div>
                  <h1 className="text-3xl font-serif text-navy-800 dark:text-navy-100">
                    {info.title}
                  </h1>
                  <p className="text-navy-600 dark:text-navy-300">
                    {info.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Topics Grid */}
        <div className="container-max py-8">
          <TopicsGrid />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-navy-900">
      {/* Header */}
      <div className={`${info.color} bg-opacity-10 dark:bg-opacity-20 py-12`}>
        <div className="container-max">
          <div className="flex items-center gap-4 mb-6">
            <Link to="/sources" className="text-navy-800 dark:text-navy-100">
              <ArrowLeft size={24} />
            </Link>
            <div className="flex items-center gap-3">
              <Icon className={`w-8 h-8 ${info.color} text-white rounded-lg p-1.5`} />
              <div>
                <h1 className="text-3xl font-serif text-navy-800 dark:text-navy-100">
                  {info.title}
                </h1>
                <p className="text-navy-600 dark:text-navy-300 mb-2">
                  {info.description}
                </p>
                <p className="text-sm text-navy-500 dark:text-navy-400">
                  {info.subtitle}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="container-max py-8">
        <div className="bg-white dark:bg-navy-800 rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Filter size={20} className="text-navy-600 dark:text-navy-300" />
            <h2 className="text-xl font-serif text-navy-800 dark:text-navy-100">
              Filter Sources
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-navy-600 dark:text-navy-300 mb-2">
                Time Period
              </label>
              <select
                value={timeFilter}
                onChange={(e) => setTimeFilter(e.target.value)}
                className="w-full p-2 rounded-md border border-navy-200 bg-white dark:bg-navy-700 dark:border-navy-600 dark:text-navy-100"
              >
                <option value="all">All Periods</option>
                <option value="1-3">1st-3rd Century</option>
                <option value="4-6">4th-6th Century</option>
                <option value="7-10">7th-10th Century</option>
                <option value="11-15">11th-15th Century</option>
                <option value="16-18">16th-18th Century</option>
                <option value="19-21">19th-21st Century</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-navy-600 dark:text-navy-300 mb-2">
                Document Type
              </label>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="w-full p-2 rounded-md border border-navy-200 bg-white dark:bg-navy-700 dark:border-navy-600 dark:text-navy-100"
              >
                <option value="all">All Types</option>
                <option value="text">Text</option>
                <option value="letter">Letter</option>
                <option value="decree">Decree</option>
                <option value="sermon">Sermon</option>
                <option value="book">Book</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-navy-600 dark:text-navy-300 mb-2">
                Search
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search sources..."
                  className="w-full p-2 pl-8 rounded-md border border-navy-200 bg-white dark:bg-navy-700 dark:border-navy-600 dark:text-navy-100"
                />
                <Search size={16} className="absolute left-2 top-3 text-navy-400 dark:text-navy-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="mb-4 flex justify-between items-center">
          <h3 className="text-lg font-serif text-navy-800 dark:text-navy-100">
            {sources.length} sources found
          </h3>
          {(timeFilter !== 'all' || typeFilter !== 'all' || searchQuery) && (
            <button
              onClick={() => {
                setTimeFilter('all');
                setTypeFilter('all');
                setSearchQuery('');
              }}
              className="text-burgundy-700 dark:text-burgundy-300 hover:underline"
            >
              Clear filters
            </button>
          )}
        </div>

        <div className="space-y-6">
          {sources.map((source, index) => (
            <div
              key={source.id}
              className="bg-white dark:bg-navy-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <Link to={`/sources/view/${source.id}`}>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-serif text-navy-800 dark:text-navy-100 mb-1 hover:text-burgundy-700 dark:hover:text-burgundy-300">
                        {source.title}
                      </h3>
                      {source.author && (
                        <div className="text-navy-600 dark:text-navy-300 text-sm mb-2">
                          by {source.author} · {source.century}th Century
                        </div>
                      )}
                      <div className="flex items-center gap-2 text-xs text-navy-500 dark:text-navy-400 mb-3">
                        <Calendar size={12} />
                        <span>Hosted on {source.hostedOn}</span>
                        <span>•</span>
                        <span className="capitalize">{source.type}</span>
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-navy-50 dark:bg-navy-700 text-navy-700 dark:text-navy-300 rounded-full text-sm">
                      {source.type}
                    </span>
                  </div>
                  
                  <p className="text-navy-600 dark:text-navy-300 mb-4 leading-relaxed">
                    {source.summary}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {source.tags.slice(0, 4).map(tag => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-burgundy-50 dark:bg-navy-700 text-burgundy-700 dark:text-burgundy-300 rounded-full text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                    {source.tags.length > 4 && (
                      <span className="px-2 py-1 bg-navy-50 dark:bg-navy-700 text-navy-600 dark:text-navy-300 rounded-full text-xs">
                        +{source.tags.length - 4} more
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {sources.length === 0 && (
          <div className="text-center py-12">
            <div className="text-navy-400 dark:text-navy-500 mb-4">
              <Archive size={48} className="mx-auto" />
            </div>
            <h3 className="text-xl font-serif text-navy-800 dark:text-navy-100 mb-2">
              No sources found
            </h3>
            <p className="text-navy-600 dark:text-navy-300 mb-4">
              Try adjusting your filters or search terms.
            </p>
            <button
              onClick={() => {
                setTimeFilter('all');
                setTypeFilter('all');
                setSearchQuery('');
              }}
              className="btn-primary"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// Topics Grid Component
const TopicsGrid: React.FC = () => {
  const topics = [
    { name: 'Councils', count: 12, color: 'bg-burgundy-100 text-burgundy-800 dark:bg-burgundy-900 dark:text-burgundy-200' },
    { name: 'Creeds', count: 8, color: 'bg-navy-100 text-navy-800 dark:bg-navy-900 dark:text-navy-200' },
    { name: 'Theology', count: 24, color: 'bg-gold-100 text-gold-800 dark:bg-gold-900 dark:text-gold-200' },
    { name: 'Liturgy', count: 15, color: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200' },
    { name: 'Missions', count: 18, color: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200' },
    { name: 'Monasticism', count: 10, color: 'bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-200' },
    { name: 'Reformation', count: 22, color: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200' },
    { name: 'Persecution', count: 14, color: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' },
    { name: 'Scholasticism', count: 9, color: 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200' },
    { name: 'Ecumenism', count: 7, color: 'bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200' },
    { name: 'Apologetics', count: 16, color: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200' },
    { name: 'Mysticism', count: 11, color: 'bg-violet-100 text-violet-800 dark:bg-violet-900 dark:text-violet-200' }
  ];

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-serif text-navy-800 dark:text-navy-100 mb-4">
          Browse by Topic
        </h2>
        <p className="text-navy-600 dark:text-navy-300">
          Explore sources organized by theological and historical themes
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {topics.map((topic, index) => (
          <div key={topic.name}>
            <Link
              to={`/sources/topic/${topic.name.toLowerCase()}`}
              className="block p-4 rounded-lg border-2 border-transparent hover:border-burgundy-300 dark:hover:border-burgundy-700 transition-colors"
            >
              <div className={`p-4 rounded-lg ${topic.color}`}>
                <div className="flex justify-between items-center">
                  <h3 className="font-serif text-lg">{topic.name}</h3>
                  <span className="text-sm opacity-75">{topic.count}</span>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SourceCategoryPage;