import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, X, Calendar, Users, FileText, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { events } from '../../data/events';
import { figures } from '../../data/figures';
import { documents } from '../../data/documents';
import { Event, Figure, Document } from '../../types';
import TimelineDisplay from './TimelineDisplay';
import FigureCard from './FigureCard';
import DocumentCard from './DocumentCard';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuery?: string;
}

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, initialQuery = '' }) => {
  const [query, setQuery] = useState(initialQuery);
  const [activeTab, setActiveTab] = useState<'all' | 'events' | 'figures' | 'documents'>('all');
  const [matchingEvents, setMatchingEvents] = useState<Event[]>([]);
  const [matchingFigures, setMatchingFigures] = useState<Figure[]>([]);
  const [matchingDocuments, setMatchingDocuments] = useState<Document[]>([]);

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  useEffect(() => {
    if (!query.trim()) {
      setMatchingEvents([]);
      setMatchingFigures([]);
      setMatchingDocuments([]);
      return;
    }

    const normalizedQuery = query.toLowerCase();

    // Search events
    const foundEvents = events.filter(
      event => 
        event.title.toLowerCase().includes(normalizedQuery) ||
        event.description.toLowerCase().includes(normalizedQuery) ||
        event.tags.some(tag => tag.toLowerCase().includes(normalizedQuery))
    );
    setMatchingEvents(foundEvents);

    // Search figures
    const foundFigures = figures.filter(
      figure => 
        figure.name.toLowerCase().includes(normalizedQuery) ||
        figure.description.toLowerCase().includes(normalizedQuery) ||
        figure.roles.some(role => role.toLowerCase().includes(normalizedQuery))
    );
    setMatchingFigures(foundFigures);

    // Search documents
    const foundDocuments = documents.filter(
      document => 
        document.title.toLowerCase().includes(normalizedQuery) ||
        document.author.toLowerCase().includes(normalizedQuery) ||
        document.content.toLowerCase().includes(normalizedQuery) ||
        document.context.toLowerCase().includes(normalizedQuery)
    );
    setMatchingDocuments(foundDocuments);
  }, [query]);

  const totalResults = matchingEvents.length + matchingFigures.length + matchingDocuments.length;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  const popularSearches = ['Constantine', 'Reformation', 'Council of Nicaea', 'Augustine', 'Martin Luther'];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="fixed inset-x-4 top-20 bottom-4 md:inset-x-8 md:top-24 md:bottom-8 lg:inset-x-16 xl:inset-x-32 z-50"
          >
            <div 
              className="h-full rounded-lg shadow-2xl overflow-hidden flex flex-col"
              style={{ backgroundColor: 'var(--global-bg)' }}
            >
              {/* Header */}
              <div 
                className="p-6 border-b border-navy-200 dark:border-navy-700 flex-shrink-0"
                style={{ backgroundColor: 'var(--global-bg-secondary)' }}
              >
                <div className="flex items-center gap-4">
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Search events, figures, documents, or topics..."
                      className="w-full py-3 px-4 pl-12 rounded-lg border border-navy-200 dark:border-navy-700 bg-white dark:bg-navy-800 text-navy-800 dark:text-navy-100 text-lg focus:outline-none focus:ring-2 focus:ring-burgundy-300 dark:focus:ring-burgundy-600"
                      autoFocus
                    />
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-navy-400 dark:text-navy-500" size={20} />
                  </div>
                  <button
                    onClick={onClose}
                    className="p-2 rounded-lg hover:bg-navy-100 dark:hover:bg-navy-700 transition-colors"
                  >
                    <X className="w-6 h-6 text-navy-600 dark:text-navy-300" />
                  </button>
                </div>

                {query && (
                  <div className="mt-4 text-navy-600 dark:text-navy-300">
                    {totalResults > 0 
                      ? `Found ${totalResults} results for "${query}"`
                      : `No results found for "${query}"`
                    }
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="flex-1 overflow-hidden">
                {!query ? (
                  /* Search Suggestions */
                  <div className="p-6 h-full overflow-y-auto">
                    <div className="max-w-4xl mx-auto">
                      <h2 className="text-2xl font-serif text-navy-800 dark:text-navy-100 mb-6">
                        Explore Church History
                      </h2>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                        <div 
                          className="rounded-lg shadow-md p-6"
                          style={{ backgroundColor: 'var(--global-bg-secondary)' }}
                        >
                          <h3 className="text-xl font-serif text-navy-800 dark:text-navy-100 mb-4">
                            Popular Searches
                          </h3>
                          <div className="space-y-2">
                            {popularSearches.map(term => (
                              <button
                                key={term}
                                onClick={() => setQuery(term)}
                                className="block w-full text-left px-3 py-2 rounded-md hover:bg-navy-50 dark:hover:bg-navy-700 text-navy-700 dark:text-navy-300 transition-colors"
                              >
                                {term}
                              </button>
                            ))}
                          </div>
                        </div>
                        
                        <div 
                          className="rounded-lg shadow-md p-6"
                          style={{ backgroundColor: 'var(--global-bg-secondary)' }}
                        >
                          <h3 className="text-xl font-serif text-navy-800 dark:text-navy-100 mb-4">
                            Browse by Era
                          </h3>
                          <div className="space-y-2">
                            {['Apostolic', 'Ante-Nicene', 'Medieval', 'Reformation', 'Modern'].map(era => (
                              <button
                                key={era}
                                onClick={() => setQuery(era)}
                                className="block w-full text-left px-3 py-2 rounded-md hover:bg-navy-50 dark:hover:bg-navy-700 text-navy-700 dark:text-navy-300 transition-colors"
                              >
                                {era} Era
                              </button>
                            ))}
                          </div>
                        </div>
                        
                        <div 
                          className="rounded-lg shadow-md p-6"
                          style={{ backgroundColor: 'var(--global-bg-secondary)' }}
                        >
                          <h3 className="text-xl font-serif text-navy-800 dark:text-navy-100 mb-4">
                            Quick Access
                          </h3>
                          <div className="space-y-2">
                            <Link 
                              to="/timeline" 
                              onClick={onClose}
                              className="block px-3 py-2 rounded-md hover:bg-navy-50 dark:hover:bg-navy-700 text-navy-700 dark:text-navy-300 transition-colors"
                            >
                              Browse Timeline
                            </Link>
                            <Link 
                              to="/figures" 
                              onClick={onClose}
                              className="block px-3 py-2 rounded-md hover:bg-navy-50 dark:hover:bg-navy-700 text-navy-700 dark:text-navy-300 transition-colors"
                            >
                              Figures
                            </Link>
                            <Link 
                              to="/documents" 
                              onClick={onClose}
                              className="block px-3 py-2 rounded-md hover:bg-navy-50 dark:hover:bg-navy-700 text-navy-700 dark:text-navy-300 transition-colors"
                            >
                              Important Documents
                            </Link>
                            <Link 
                              to="/sources" 
                              onClick={onClose}
                              className="block px-3 py-2 rounded-md hover:bg-navy-50 dark:hover:bg-navy-700 text-navy-700 dark:text-navy-300 transition-colors"
                            >
                              External Sources
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : totalResults === 0 ? (
                  <div className="p-6 h-full flex items-center justify-center">
                    <div 
                      className="rounded-lg shadow-md p-8 text-center max-w-md"
                      style={{ backgroundColor: 'var(--global-bg-secondary)' }}
                    >
                      <h2 className="text-2xl font-serif mb-4 text-navy-800 dark:text-navy-100">
                        No Results Found
                      </h2>
                      <p className="text-navy-600 dark:text-navy-300 mb-6">
                        We couldn't find any matches for "{query}". 
                        Try different keywords or browse our content instead.
                      </p>
                      <div className="flex flex-wrap justify-center gap-4">
                        <Link 
                          to="/timeline" 
                          onClick={onClose}
                          className="btn-primary"
                        >
                          Browse Timeline
                        </Link>
                        <Link 
                          to="/figures" 
                          onClick={onClose}
                          className="btn-secondary"
                        >
                          Explore Figures
                        </Link>
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Tabs */}
                    <div 
                      className="border-b border-navy-200 dark:border-navy-700"
                      style={{ backgroundColor: 'var(--global-bg-secondary)' }}
                    >
                      <div className="flex overflow-x-auto px-6">
                        <button
                          className={activeTab === 'all' ? 'tab-active' : 'tab'}
                          onClick={() => setActiveTab('all')}
                        >
                          All Results ({totalResults})
                        </button>
                        <button
                          className={activeTab === 'events' ? 'tab-active' : 'tab'}
                          onClick={() => setActiveTab('events')}
                        >
                          <Calendar size={16} className="mr-1" />
                          Events ({matchingEvents.length})
                        </button>
                        <button
                          className={activeTab === 'figures' ? 'tab-active' : 'tab'}
                          onClick={() => setActiveTab('figures')}
                        >
                          <Users size={16} className="mr-1" />
                          Figures ({matchingFigures.length})
                        </button>
                        <button
                          className={activeTab === 'documents' ? 'tab-active' : 'tab'}
                          onClick={() => setActiveTab('documents')}
                        >
                          <FileText size={16} className="mr-1" />
                          Documents ({matchingDocuments.length})
                        </button>
                      </div>
                    </div>

                    {/* Results */}
                    <div className="flex-1 overflow-y-auto p-6">
                      <div className="space-y-8">
                        {/* Events */}
                        {(activeTab === 'all' || activeTab === 'events') && matchingEvents.length > 0 && (
                          <div>
                            <div className="flex justify-between items-center mb-4">
                              <h3 className="text-xl font-serif text-navy-800 dark:text-navy-100">
                                Events
                              </h3>
                              {activeTab === 'all' && matchingEvents.length > 3 && (
                                <button
                                  onClick={() => setActiveTab('events')}
                                  className="text-burgundy-700 dark:text-burgundy-300 hover:underline flex items-center gap-1"
                                >
                                  View all {matchingEvents.length} <ArrowRight size={16} />
                                </button>
                              )}
                            </div>
                            <div 
                              className="rounded-lg shadow-md p-4"
                              style={{ backgroundColor: 'var(--global-bg-secondary)' }}
                            >
                              <TimelineDisplay 
                                events={activeTab === 'all' ? matchingEvents.slice(0, 3) : matchingEvents} 
                              />
                            </div>
                          </div>
                        )}

                        {/* Figures */}
                        {(activeTab === 'all' || activeTab === 'figures') && matchingFigures.length > 0 && (
                          <div>
                            <div className="flex justify-between items-center mb-4">
                              <h3 className="text-xl font-serif text-navy-800 dark:text-navy-100">
                                Figures
                              </h3>
                              {activeTab === 'all' && matchingFigures.length > 3 && (
                                <button
                                  onClick={() => setActiveTab('figures')}
                                  className="text-burgundy-700 dark:text-burgundy-300 hover:underline flex items-center gap-1"
                                >
                                  View all {matchingFigures.length} <ArrowRight size={16} />
                                </button>
                              )}
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                              {(activeTab === 'all' ? matchingFigures.slice(0, 3) : matchingFigures)
                                .map((figure, index) => (
                                  <div key={figure.id} onClick={onClose}>
                                    <FigureCard figure={figure} index={index} />
                                  </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Documents */}
                        {(activeTab === 'all' || activeTab === 'documents') && matchingDocuments.length > 0 && (
                          <div>
                            <div className="flex justify-between items-center mb-4">
                              <h3 className="text-xl font-serif text-navy-800 dark:text-navy-100">
                                Documents
                              </h3>
                              {activeTab === 'all' && matchingDocuments.length > 3 && (
                                <button
                                  onClick={() => setActiveTab('documents')}
                                  className="text-burgundy-700 dark:text-burgundy-300 hover:underline flex items-center gap-1"
                                >
                                  View all {matchingDocuments.length} <ArrowRight size={16} />
                                </button>
                              )}
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                              {(activeTab === 'all' ? matchingDocuments.slice(0, 3) : matchingDocuments)
                                .map((document, index) => (
                                  <div key={document.id} onClick={onClose}>
                                    <DocumentCard document={document} index={index} />
                                  </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SearchModal;