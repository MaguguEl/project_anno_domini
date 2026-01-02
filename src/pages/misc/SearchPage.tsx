import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Search, ArrowLeft, Filter, BookOpen, Users, Calendar, FileText } from 'lucide-react';
import { useData } from '../../context/DataContext';

const SearchPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { documents, figures, events } = useData();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<{
    documents: any[];
    figures: any[];
    events: any[];
  }>({ documents: [], figures: [], events: [] });

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get('q') || '';
    setSearchQuery(query);
    
    if (query) {
      const searchTerm = query.toLowerCase();
      
      const filteredDocuments = documents.filter(doc => 
        doc.title.toLowerCase().includes(searchTerm) ||
        doc.author?.toLowerCase().includes(searchTerm) ||
        doc.description?.toLowerCase().includes(searchTerm)
      );
      
      const filteredFigures = figures.filter(figure => 
        figure.name.toLowerCase().includes(searchTerm) ||
        figure.title?.toLowerCase().includes(searchTerm) ||
        figure.description?.toLowerCase().includes(searchTerm)
      );
      
      const filteredEvents = events.filter(event => 
        event.name.toLowerCase().includes(searchTerm) ||
        event.description?.toLowerCase().includes(searchTerm)
      );
      
      setResults({
        documents: filteredDocuments,
        figures: filteredFigures,
        events: filteredEvents
      });
    } else {
      setResults({ documents: [], figures: [], events: [] });
    }
  }, [location.search, documents, figures, events]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const totalResults = results.documents.length + results.figures.length + results.events.length;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-navy-900">
      {/* Search Header */}
      <div className="sticky top-0 z-20 bg-white dark:bg-navy-800 border-b border-gray-200 dark:border-navy-700 shadow-sm">
        <div className="container-max px-4 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-navy-700 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-navy-700 dark:text-navy-300" />
            </button>
            
            <form onSubmit={handleSearchSubmit} className="flex-1">
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2">
                  <Search className="w-5 h-5 text-navy-400 dark:text-navy-500" />
                </div>
                <input
                  type="text"
                  placeholder="Search events, figures, documents..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-100 dark:bg-navy-900 rounded-xl text-navy-800 dark:text-navy-100 placeholder-navy-500 dark:placeholder-navy-400 border border-gray-300 dark:border-navy-700 focus:ring-2 focus:ring-burgundy-500 focus:border-transparent outline-none"
                  autoFocus
                />
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="container-max px-4 py-6">
        {searchQuery ? (
          <>
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-navy-800 dark:text-navy-100 mb-2">
                Search Results
              </h1>
              <p className="text-navy-600 dark:text-navy-300">
                Found {totalResults} results for "{searchQuery}"
              </p>
            </div>

            {/* Documents Results */}
            {results.documents.length > 0 && (
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <FileText className="w-5 h-5 text-burgundy-600 dark:text-burgundy-400" />
                  <h2 className="text-lg font-bold text-navy-800 dark:text-navy-100">
                    Documents ({results.documents.length})
                  </h2>
                </div>
                <div className="space-y-3">
                  {results.documents.map(doc => (
                    <div key={doc.id} className="bg-white dark:bg-navy-800 rounded-lg border border-gray-200 dark:border-navy-700 p-4 hover:shadow-md transition-shadow">
                      <h3 className="font-bold text-navy-800 dark:text-navy-100 mb-1">
                        {doc.title}
                      </h3>
                      {doc.author && (
                        <p className="text-sm text-navy-600 dark:text-navy-300 mb-1">
                          by {doc.author}
                        </p>
                      )}
                      <p className="text-sm text-navy-600 dark:text-navy-300">
                        {doc.year} • {doc.type}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Figures Results */}
            {results.figures.length > 0 && (
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <Users className="w-5 h-5 text-burgundy-600 dark:text-burgundy-400" />
                  <h2 className="text-lg font-bold text-navy-800 dark:text-navy-100">
                    Figures ({results.figures.length})
                  </h2>
                </div>
                <div className="space-y-3">
                  {results.figures.map(figure => (
                    <div key={figure.id} className="bg-white dark:bg-navy-800 rounded-lg border border-gray-200 dark:border-navy-700 p-4 hover:shadow-md transition-shadow">
                      <h3 className="font-bold text-navy-800 dark:text-navy-100 mb-1">
                        {figure.name}
                      </h3>
                      {figure.title && (
                        <p className="text-sm text-navy-600 dark:text-navy-300 mb-1">
                          {figure.title}
                        </p>
                      )}
                      <p className="text-sm text-navy-600 dark:text-navy-300">
                        {figure.lifespan}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Events Results */}
            {results.events.length > 0 && (
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <Calendar className="w-5 h-5 text-burgundy-600 dark:text-burgundy-400" />
                  <h2 className="text-lg font-bold text-navy-800 dark:text-navy-100">
                    Events ({results.events.length})
                  </h2>
                </div>
                <div className="space-y-3">
                  {results.events.map(event => (
                    <div key={event.id} className="bg-white dark:bg-navy-800 rounded-lg border border-gray-200 dark:border-navy-700 p-4 hover:shadow-md transition-shadow">
                      <h3 className="font-bold text-navy-800 dark:text-navy-100 mb-1">
                        {event.name}
                      </h3>
                      <p className="text-sm text-navy-600 dark:text-navy-300">
                        {event.year}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {totalResults === 0 && (
              <div className="text-center py-12">
                <Search className="w-16 h-16 mx-auto text-gray-400 dark:text-navy-600 mb-4" />
                <h3 className="text-lg font-bold text-navy-800 dark:text-navy-100 mb-2">
                  No results found
                </h3>
                <p className="text-navy-600 dark:text-navy-300">
                  Try different keywords or browse our collections
                </p>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <Search className="w-16 h-16 mx-auto text-gray-400 dark:text-navy-600 mb-4" />
            <h3 className="text-lg font-bold text-navy-800 dark:text-navy-100 mb-2">
              Search Church History
            </h3>
            <p className="text-navy-600 dark:text-navy-300 mb-6">
              Enter keywords to search through documents, figures, and events
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
              <div className="bg-white dark:bg-navy-800 rounded-lg border border-gray-200 dark:border-navy-700 p-4">
                <BookOpen className="w-8 h-8 text-burgundy-600 dark:text-burgundy-400 mx-auto mb-2" />
                <h4 className="font-bold text-navy-800 dark:text-navy-100">Documents</h4>
                <p className="text-xs text-navy-600 dark:text-navy-300">Creeds, confessions, writings</p>
              </div>
              <div className="bg-white dark:bg-navy-800 rounded-lg border border-gray-200 dark:border-navy-700 p-4">
                <Users className="w-8 h-8 text-burgundy-600 dark:text-burgundy-400 mx-auto mb-2" />
                <h4 className="font-bold text-navy-800 dark:text-navy-100">Figures</h4>
                <p className="text-xs text-navy-600 dark:text-navy-300">Theologians, leaders, reformers</p>
              </div>
              <div className="bg-white dark:bg-navy-800 rounded-lg border border-gray-200 dark:border-navy-700 p-4">
                <Calendar className="w-8 h-8 text-burgundy-600 dark:text-burgundy-400 mx-auto mb-2" />
                <h4 className="font-bold text-navy-800 dark:text-navy-100">Events</h4>
                <p className="text-xs text-navy-600 dark:text-navy-300">Councils, movements, revivals</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;