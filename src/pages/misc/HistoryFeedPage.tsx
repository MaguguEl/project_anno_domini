import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useData } from '../../context/DataContext';
import { Link } from 'react-router-dom'; 
import { 
  Heart, 
  BookOpen, 
  Calendar, 
  Quote, 
  Link as LinkIcon, 
  FileText,
  ChevronDown,
  ChevronUp,
  MoreHorizontal,
  Shuffle,
  Clock,
  Menu,
  X,
  Share,
  Bookmark,
  Zap,
  Copy
} from 'lucide-react';
import { FeedItem, Document } from '../../types';

// Helper function to safely render content with HTML entities
const safeContent = (content: string): string => {
  return content
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
};

// Helper function to extract plain text from content
const getPlainText = (content: string): string => {
  return content
    .replace(/<[^>]*>/g, '')
    .replace(/\n/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
};

// Helper function to truncate text safely
const truncateText = (text: string, maxLength: number): string => {
  const plainText = getPlainText(text);
  if (plainText.length <= maxLength) return plainText;
  return plainText.substring(0, maxLength) + '...';
};

// Helper function to shuffle an array
const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Recommendation Engine Function
const getRecommendedDocuments = (documents: Document[], count: number = 3): Document[] => {
  if (documents.length === 0) return [];
  
  // Score each document based on various criteria
  const scoredDocuments = documents.map(doc => {
    let score = 0;
    
    // 1. Significance (highest weight)
    if (doc.significance) {
      const sig = doc.significance.toLowerCase();
      if (sig.includes('high') || sig.includes('critical') || sig.includes('major')) score += 30;
      if (sig.includes('medium') || sig.includes('important')) score += 20;
      if (sig.includes('low') || sig.includes('minor')) score += 10;
    }
    
    // 2. Content length (longer documents often have more substance)
    if (doc.context) {
      const contentLength = getPlainText(doc.context).length;
      if (contentLength > 500) score += 15;
      else if (contentLength > 200) score += 10;
      else if (contentLength > 50) score += 5;
    }
    
    // 3. Has summary
    if (doc.summary && doc.summary.trim().length > 0) score += 10;
    
    // 4. Older documents (ancient texts are of greater historical importance)
    if (doc.year < 500) score += 15; // Ancient texts
    else if (doc.year < 1500) score += 12; // Medieval texts
    else if (doc.year < 1800) score += 8; // Renaissance/Early Modern
    else if (doc.year < 1900) score += 5; // Modern
    else score += 3; // Contemporary
    
    // 5. Specific types get bonus
    if (doc.type) {
      const type = doc.type.toLowerCase();
      if (type.includes('treaty') || type.includes('declaration') || type.includes('constitution')) score += 20;
      if (type.includes('speech') || type.includes('letter')) score += 15;
      if (type.includes('law') || type.includes('act')) score += 10;
    }
    
    // 6. Era weighting (ancient and medieval texts are of greater importance)
    if (doc.era?.name) {
      const era = doc.era.name.toLowerCase();
      if (era.includes('ancient')) score += 15;
      if (era.includes('medieval') || era.includes('renaissance')) score += 12;
      if (era.includes('early modern')) score += 8;
      if (era.includes('modern') || era.includes('contemporary')) score += 5;
    }
    
    return { ...doc, score };
  });
  
  // Sort by score descending and return top N
  return scoredDocuments
    .sort((a, b) => (b as any).score - (a as any).score)
    .slice(0, count);
};

const HistoryFeedPage: React.FC = () => {
  const { events, documents, federatedSources, figures } = useData();
  const [feedItems, setFeedItems] = useState<FeedItem[]>([]);
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [order, setOrder] = useState<'chronological' | 'shuffled'>('chronological');
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;
  const allItemsRef = useRef<FeedItem[]>([]);
  const [activeFilter, setActiveFilter] = useState<'all' | 'event' | 'document' | 'source' | 'quote'>('all');

  // Get recommended documents using the recommendation engine
  const recommendedDocuments = getRecommendedDocuments(documents, 3);

  // Transform data into feed items with safe content handling
  const transformDataToFeedItems = useCallback(() => {
    const allItems: FeedItem[] = [];

    // Transform events
    events.slice(0, 20).forEach(event => {
      const eventDate = new Date(event.year, 0, 1);
      const figure = figures.find(f => event.relatedPeople.includes(f.id));
      
      allItems.push({
        id: `event-${event.id}`,
        type: 'event',
        author: figure?.name || 'Historical Event',
        handle: figure ? `@${figure.name.replace(/\s+/g, '').toLowerCase()}` : '@historical',
        content: `${event.title} - ${truncateText(event.description, 200)}`,
        source: 'Historical Events Database',
        sourceUrl: `/events/${event.id}`,
        detailUrl: `/events/${event.id}`,
        timestamp: eventDate,
        likes: Math.floor(Math.random() * 100),
        shares: Math.floor(Math.random() * 50),
        comments: Math.floor(Math.random() * 30),
        metadata: {
          year: event.year,
          tags: event.tags,
          locations: event.locations
        }
      });
    });

    // Transform documents
    documents.slice(0, 15).forEach(doc => {
      const docDate = new Date(doc.year, 0, 1);
      const plainContext = getPlainText(doc.context);
      
      allItems.push({
        id: `doc-${doc.id}`,
        type: 'document',
        author: doc.author,
        handle: `@${doc.author.replace(/\s+/g, '').toLowerCase()}`,
        content: `${doc.title}: ${truncateText(plainContext, 250)}`,
        source: doc.type || 'Document',
        sourceUrl: `/documents/${doc.id}`,
        detailUrl: `/documents/${doc.id}`,
        timestamp: docDate,
        likes: Math.floor(Math.random() * 80),
        shares: Math.floor(Math.random() * 40),
        comments: Math.floor(Math.random() * 25),
        metadata: {
          era: doc.era?.name || 'Unknown Era',
          year: doc.year,
          summary: doc.summary || '',
          significance: doc.significance || ''
        }
      });
    });

    // Transform federated sources
    federatedSources.slice(0, 25).forEach(source => {
      const sourceDate = new Date();
      sourceDate.setDate(sourceDate.getDate() - Math.floor(Math.random() * 365));
      
      allItems.push({
        id: `source-${source.id}`,
        type: 'source',
        author: source.contributor || source.author || 'Anonymous',
        handle: (source.contributor || source.author) ? `@${(source.contributor || source.author || '').replace(/\s+/g, '').toLowerCase()}` : '@anonymous',
        content: `${source.title}: ${truncateText(source.summary, 200)}`,
        source: source.repository || source.hostedOn || 'Unknown Source',
        sourceUrl: source.externalUrl,
        detailUrl: `/sources/view/${source.id}`,
        timestamp: sourceDate,
        likes: Math.floor(Math.random() * 120),
        shares: Math.floor(Math.random() * 60),
        comments: Math.floor(Math.random() * 35),
        metadata: {
          category: source.category,
          tags: source.tags,
          reliability: source.reliability || 'Not Rated',
          type: source.type
        }
      });
    });

    // Add quotes from figures
    figures.slice(0, 10).forEach(figure => {
      if (figure.quotes && figure.quotes.length > 0) {
        figure.quotes.forEach((quote) => {
          const quoteDate = new Date();
          quoteDate.setDate(quoteDate.getDate() - Math.floor(Math.random() * 30));
          
          allItems.push({
            id: quote.id,
            type: 'quote',
            author: figure.name,
            handle: `@${figure.name.replace(/\s+/g, '').toLowerCase()}`,
            content: `"${truncateText(quote.text, 280)}"`,
            source: figure.roles[0] || 'Historical Figure',
            sourceUrl: `/quotes/${quote.id}`,
            detailUrl: `/quotes/${quote.id}`,
            timestamp: quoteDate,
            likes: Math.floor(Math.random() * 150),
            shares: Math.floor(Math.random() * 75),
            comments: Math.floor(Math.random() * 40),
            metadata: {
              birthYear: figure.birthYear,
              deathYear: figure.deathYear,
              era: figure.era,
              source: quote.source,
              figureId: figure.id
            }
          });
        });
      }
    });

    // Sort by timestamp for chronological order
    const chronological = allItems.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
    allItemsRef.current = chronological;
    return chronological;
  }, [events, documents, federatedSources, figures]);

  // Load initial data
  useEffect(() => {
    const allItems = transformDataToFeedItems();
    const filteredItems = activeFilter === 'all' 
      ? allItems 
      : allItems.filter(item => item.type === activeFilter);
    const initialItems = filteredItems.slice(0, itemsPerPage);
    setFeedItems(initialItems);
    setHasMore(filteredItems.length > itemsPerPage);
  }, [transformDataToFeedItems, activeFilter]);

  // Load more data function
  const loadMoreItems = useCallback(() => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    setTimeout(() => {
      const allItems = order === 'chronological' 
        ? allItemsRef.current 
        : shuffleArray(allItemsRef.current);
      
      const filteredItems = activeFilter === 'all' 
        ? allItems 
        : allItems.filter(item => item.type === activeFilter);
      
      const startIndex = page * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const newItems = filteredItems.slice(startIndex, endIndex);

      if (newItems.length > 0) {
        setFeedItems(prev => [...prev, ...newItems]);
        setPage(prev => prev + 1);
        setHasMore(endIndex < filteredItems.length);
      } else {
        setHasMore(false);
      }
      setIsLoading(false);
    }, 500);
  }, [isLoading, hasMore, page, order, activeFilter]);

  // Infinite scroll setup
  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          loadMoreItems();
        }
      },
      { threshold: 0.5 }
    );

    if (loadMoreRef.current) {
      observerRef.current.observe(loadMoreRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [hasMore, isLoading, loadMoreItems]);

  // Toggle item expansion
  const toggleExpand = (id: string) => {
    setExpandedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  // Toggle order with proper shuffling
  const toggleOrder = useCallback(() => {
    setOrder(prev => {
      const newOrder = prev === 'chronological' ? 'shuffled' : 'chronological';
      
      if (newOrder === 'shuffled') {
        const shuffled = shuffleArray(allItemsRef.current);
        const filteredItems = activeFilter === 'all' 
          ? shuffled 
          : shuffled.filter(item => item.type === activeFilter);
        const currentItems = filteredItems.slice(0, page * itemsPerPage);
        setFeedItems(currentItems);
      } else {
        const chronological = [...allItemsRef.current]
          .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
        const filteredItems = activeFilter === 'all' 
          ? chronological 
          : chronological.filter(item => item.type === activeFilter);
        const currentItems = filteredItems.slice(0, page * itemsPerPage);
        setFeedItems(currentItems);
      }
      
      setPage(1);
      return newOrder;
    });
  }, [page, itemsPerPage, activeFilter]);

  // Handle filter change
  const handleFilterChange = (filter: 'all' | 'event' | 'document' | 'source' | 'quote') => {
    setActiveFilter(filter);
    setPage(1);
    setExpandedItems(new Set());
  };

  // Get type icon with burgundy accent
  const getTypeIcon = (type: FeedItem['type']) => {
    switch (type) {
      case 'event': return <Calendar className="w-4 h-4" />;
      case 'quote': return <Quote className="w-4 h-4" />;
      case 'source': return <LinkIcon className="w-4 h-4" />;
      case 'document': return <FileText className="w-4 h-4" />;
      default: return <BookOpen className="w-4 h-4" />;
    }
  };

  // Get type color with burgundy for events
  const getTypeColor = (type: FeedItem['type']) => {
    switch (type) {
      case 'event': return 'text-burgundy-600 dark:text-burgundy-400';
      case 'quote': return 'text-gold-600 dark:text-gold-400';
      case 'source': return 'text-green-600 dark:text-green-400';
      case 'document': return 'text-amber-600 dark:text-amber-400';
      default: return 'text-gray-600 dark:text-gray-400';
    }
  };

  // Format timestamp
  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(diff / (1000 * 60 * 60));
    const diffMinutes = Math.floor(diff / (1000 * 60));

    if (diffDays > 0) {
      return `${diffDays}d`;
    } else if (diffHours > 0) {
      return `${diffHours}h`;
    } else if (diffMinutes > 0) {
      return `${diffMinutes}m`;
    } else {
      return 'Just now';
    }
  };

  // Get the detail page URL based on post type
  const getDetailUrl = (item: FeedItem) => {
    if (item.detailUrl) return item.detailUrl;
    
    switch (item.type) {
      case 'event':
        const eventId = item.id.replace('event-', '');
        return `/events/${eventId}`;
      case 'document':
        const docId = item.id.replace('doc-', '');
        return `/documents/${docId}`;
      case 'source':
        const sourceId = item.id.replace('source-', '');
        return `/sources/view/${sourceId}`;
      case 'quote':
        if (item.id.startsWith('quote-')) {
          return `/quotes/${item.id}`;
        } else {
          return `/quotes/${item.id}`;
        }
      default:
        return '/';
    }
  };
  
  return (
    <div className="min-h-screen bg-slate-50 dark:from-gray-900 dark:to-gray-800 p-3 sm:p-4 md:p-6">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-4 md:gap-6">
        {/* Main Content - Left Column */}
        <div className="flex-1 lg:max-w-2xl">
          {/* Mobile Header */}
          <div className="lg:hidden mb-4">
            <div className="p-4 mb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div>
                    <h1 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white">
                      History Feed
                    </h1>
                    <p className="text-xs text-gray-600 dark:text-gray-300">
                      Events & documents
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1 sm:gap-2">
                  <button
                    onClick={toggleOrder}
                    className={`p-1.5 sm:p-2 rounded-lg ${
                      order === 'chronological'
                        ? 'text-burgundy-600 dark:text-burgundy-400'
                        : 'text-gray-600 dark:text-gray-400'
                    } hover:bg-gray-100 dark:hover:bg-gray-700`}
                  >
                    {order === 'chronological' ? (
                      <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
                    ) : (
                      <Shuffle className="w-4 h-4 sm:w-5 sm:h-5" />
                    )}
                  </button>
                  <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="p-1.5 sm:p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    {isMobileMenuOpen ? <X className="w-4 h-4 sm:w-5 sm:h-5" /> : <Menu className="w-4 h-4 sm:w-5 sm:h-5" />}
                  </button>
                </div>
              </div>
              
              {/* Mobile Menu Content */}
              {isMobileMenuOpen && (
                <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    <button
                      onClick={() => handleFilterChange('all')}
                      className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
                        activeFilter === 'all'
                          ? 'text-gray-900 dark:text-white'
                          : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300'
                      }`}
                    >
                      All
                    </button>
                    <button
                      onClick={() => handleFilterChange('event')}
                      className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
                        activeFilter === 'event'
                          ? 'text-burgundy-100 dark:text-burgundy-400'
                          : 'hover:text-burgundy-800 dark:hover:bg-burgundy-900/10'
                      } text-burgundy-600 dark:text-burgundy-400`}
                    >
                      <Calendar className="w-3 h-3" />
                      {events.length} Events
                    </button>
                    <button
                      onClick={() => handleFilterChange('document')}
                      className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
                        activeFilter === 'document'
                          ? 'text-amber-100 dark:text-amber-400'
                          : 'hover:text-amber-800 dark:hover:text-amber-400'
                      } text-amber-600 dark:text-amber-400`}
                    >
                      <FileText className="w-3 h-3" />
                      {documents.length} Docs
                    </button>
                    <button
                      onClick={() => handleFilterChange('source')}
                      className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
                        activeFilter === 'source'
                          ? 'text-green-100 dark:text-green-400'
                          : 'hover:text-green-800 dark:hover:text-green-400'
                      } text-green-600 dark:text-green-400`}
                    >
                      <LinkIcon className="w-3 h-3" />
                      {federatedSources.length} Sources
                    </button>
                    <button
                      onClick={() => handleFilterChange('quote')}
                      className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
                        activeFilter === 'quote'
                          ? 'text-gold-100 dark:text-gold-400'
                          : 'hover:text-gold-800 dark:hover:text-gold-400'
                      } text-gold-600 dark:text-gold-400`}
                    >
                      <Quote className="w-3 h-3" />
                      {figures.reduce((acc, fig) => acc + (fig.quotes?.length || 0), 0)} Quotes
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Desktop Header */}
          <div className="hidden lg:block rounded-xl p-6 mb-6 bg-slate-50">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div>
                  <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                    History Feed
                  </h1>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Events, quotes, documents & sources
                  </p>
                </div>
              </div>
              <button
                onClick={toggleOrder}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                  order === 'chronological'
                    ? 'text-burgundy-600 dark:text-burgundy-400 hover:text-burgundy-700 dark:hover:text-burgundy-300'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                {order === 'chronological' ? (
                  <>
                    <Clock className="w-4 h-4" />
                    Chronological
                  </>
                ) : (
                  <>
                    <Shuffle className="w-4 h-4" />
                    Shuffled
                  </>
                )}
              </button>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              <button
                onClick={() => handleFilterChange('all')}
                className={`px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
                  activeFilter === 'all'
                    ? 'text-gray-900 dark:text-white '
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300'
                }`}
              >
                All Posts
              </button>
              <button
                onClick={() => handleFilterChange('event')}
                className={`px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
                  activeFilter === 'event'
                    ? 'text-burgundy-100 dark:text-burgundy-400'
                    : 'hover:text-burgundy-800 dark:hover:bg-burgundy-900/10'
                } text-burgundy-600 dark:text-burgundy-400`}
              >
                <Calendar className="w-3 h-3" />
                {events.length} Events
              </button>
              <button
                onClick={() => handleFilterChange('document')}
                className={`px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
                  activeFilter === 'document'
                    ? 'text-amber-800 dark:text-amber-400'
                    : 'hover:text-amber-800 dark:hover:bg-amber-900/10                    '
                } text-amber-600 dark:text-amber-400`}
              >
                <FileText className="w-3 h-3" />
                {documents.length} Documents
              </button>
              <button
                onClick={() => handleFilterChange('source')}
                className={`px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
                  activeFilter === 'source'
                    ? 'text-green-800 dark:text-green-400'
                    : 'hover:text-green-800 dark:hover:bg-green-900/10'
                } text-green-600 dark:text-green-400`}
              >
                <LinkIcon className="w-3 h-3" />
                {federatedSources.length} Sources
              </button>
              <button
                onClick={() => handleFilterChange('quote')}
                className={`px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
                  activeFilter === 'quote'
                    ? 'text-gold-800 dark:text-gold-400'
                    : 'hover:text-gold-800 dark:hover:bg-gold-900/10'
                } text-gold-600 dark:text-gold-400`}
              >
                <Quote className="w-3 h-3" />
                {figures.reduce((acc, fig) => acc + (fig.quotes?.length || 0), 0)} Quotes
              </button>
            </div>

            {/* Feed Stats */}
            <div className="flex items-center gap-6 pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500 dark:text-gray-400">Loaded:</span>
                <span className="text-sm font-bold text-gray-900 dark:text-white">{feedItems.length} items</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500 dark:text-gray-400">Total Likes:</span>
                <span className="text-sm font-bold text-gray-900 dark:text-white">
                  {feedItems.reduce((acc, item) => acc + item.likes, 0)}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500 dark:text-gray-400">Order:</span>
                <span className="text-sm font-bold text-gray-900 dark:text-white">
                  {order === 'chronological' ? 'Chronological' : 'Shuffled'}
                </span>
              </div>
            </div>
          </div>

          {/* Feed - Main Posts */}
          <div className="space-y-0">
            {feedItems.map((item, index) => {
              const detailUrl = getDetailUrl(item);
              
              return (
                <div
                  key={item.id}
                  className={`pb-3 sm:pb-4 ${
                    index < feedItems.length - 1 
                      ? 'border-b border-gray-200 dark:border-gray-700' 
                      : ''
                  }  dark:hover:border-navy-700 transition-colors duration-200`}
                >
                  <div className="py-3 sm:py-4">
                    {/* Header */}
                    <div className="mb-3 sm:mb-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-2 sm:gap-3">
                          <Link 
                            to={detailUrl}
                            className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center ${getTypeColor(item.type)} hover:opacity-80 transition-opacity`}
                          >
                            {getTypeIcon(item.type)}
                          </Link>
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-1 sm:gap-2">
                              <Link 
                                to={detailUrl}
                                className="font-bold text-sm sm:text-base text-gray-900 dark:text-white truncate hover:text-burgundy-600 dark:hover:text-burgundy-400 transition-colors"
                              >
                                {item.author}
                              </Link>
                              <Link 
                                to={detailUrl}
                                className={`px-1.5 py-0.5 rounded-full text-[10px] sm:text-xs font-medium ${getTypeColor(item.type)} hover:opacity-80 transition-opacity`}
                              >
                                {item.type}
                              </Link>
                            </div>
                            <div className="flex flex-wrap items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-600 dark:text-gray-300 mt-0.5">
                              <Link 
                                to={detailUrl}
                                className="truncate hover:text-gray-800 dark:hover:text-gray-100 transition-colors"
                              >
                                {item.handle}
                              </Link>
                              <span>·</span>
                              <span>{formatTimestamp(item.timestamp)}</span>
                              {item.source && (
                                <>
                                  <span>·</span>
                                  <span className="flex items-center gap-1 truncate">
                                    <LinkIcon className="w-3 h-3 flex-shrink-0" />
                                    <span className="truncate">{item.source}</span>
                                  </span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                        <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg ml-1">
                          <MoreHorizontal className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                        </button>
                      </div>
                    </div>

                    {/* Content - Clickable Area */}
                    <Link 
                      to={detailUrl}
                      className="block group"
                    >
                      <div className="relative">
                        <div 
                          className={`text-sm sm:text-base text-gray-800 dark:text-gray-200 leading-relaxed whitespace-pre-line ${
                            expandedItems.has(item.id) ? '' : 'line-clamp-3 sm:line-clamp-4'
                          } group-hover:text-gray-900 dark:group-hover:text-gray-100 transition-colors`}
                          dangerouslySetInnerHTML={{ 
                            __html: expandedItems.has(item.id) 
                              ? safeContent(item.content).replace(/\n/g, '<br />')
                              : safeContent(item.content.length > 280 ? item.content.substring(0, 280) + '...' : item.content).replace(/\n/g, '<br />')
                          }}
                        />
                        {/* Hover indicator */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-transparent group-hover:via-burgundy-50/20 dark:group-hover:via-burgundy-900/10 rounded-lg transition-all duration-200 pointer-events-none" />
                      </div>
                    </Link>

                    {/* Show expand/collapse for long content */}
                    {item.content.length > 280 && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleExpand(item.id);
                        }}
                        className="mt-1 sm:mt-2 text-burgundy-600 dark:text-burgundy-400 hover:text-burgundy-700 dark:hover:text-burgundy-300 font-medium text-xs sm:text-sm flex items-center gap-1"
                      >
                        {expandedItems.has(item.id) ? (
                          <>
                            Show less
                            <ChevronUp className="w-3 h-3 sm:w-4 sm:h-4" />
                          </>
                        ) : (
                          <>
                            Show more
                            <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4" />
                          </>
                        )}
                      </button>
                    )}

                    {/* Metadata */}
                    {item.metadata && (
                      <div className="mt-3 sm:mt-4">
                        <div className="flex flex-wrap gap-1.5 sm:gap-2">
                          {item.metadata.year && (
                            <Link 
                              to={`/timeline`}
                              className="px-1.5 py-0.5 sm:px-2 sm:py-1 text-burgundy-600 dark:text-burgundy-400 text-[10px] sm:text-xs rounded border border-navy-200 dark:border-navy-700 hover:bg-burgundy-50 dark:hover:bg-burgundy-900/20 transition-colors"
                            >
                              Year: {item.metadata.year}
                            </Link>
                          )}
                          {item.metadata.tags && item.metadata.tags.slice(0, 3).map((tag: string, index: number) => (
                            <Link 
                              key={index}
                              to={`/sources/topic/${tag.toLowerCase().replace(/\s+/g, '-')}`}
                              className="px-1.5 py-0.5 sm:px-2 sm:py-1 text-gray-700 dark:text-gray-300 text-[10px] sm:text-xs rounded border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                            >
                              #{tag}
                            </Link>
                          ))}
                          {item.metadata.locations && item.metadata.locations.slice(0, 2).map((location: string, index: number) => (
                            <span key={`loc-${index}`} className="px-1.5 py-0.5 sm:px-2 sm:py-1 text-indigo-600 dark:text-indigo-400 text-[10px] sm:text-xs rounded border border-indigo-300 dark:border-indigo-600">
                              {location}
                            </span>
                          ))}
                          {item.metadata.category && (
                            <Link 
                              to={`/sources/${item.metadata.category.toLowerCase().replace(/\s+/g, '-')}`}
                              className="px-1.5 py-0.5 sm:px-2 sm:py-1 text-green-600 dark:text-green-400 text-[10px] sm:text-xs rounded border border-green-300 dark:border-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors"
                            >
                              {item.metadata.category}
                            </Link>
                          )}
                          {item.metadata.type && (
                            <span className="px-1.5 py-0.5 sm:px-2 sm:py-1 text-amber-600 dark:text-amber-400 text-[10px] sm:text-xs rounded border border-amber-300 dark:border-amber-600">
                              {item.metadata.type}
                            </span>
                          )}
                          {item.metadata.significance && (
                            <span className="px-1.5 py-0.5 sm:px-2 sm:py-1 text-gold-600 dark:text-gold-400 text-[10px] sm:text-xs rounded border border-gold-300 dark:border-gold-600">
                              Significant
                            </span>
                          )}
                          {item.metadata.reliability && (
                            <span className="px-1.5 py-0.5 sm:px-2 sm:py-1 text-emerald-600 dark:text-emerald-400 text-[10px] sm:text-xs rounded border border-emerald-300 dark:border-emerald-600">
                              {item.metadata.reliability}
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="mt-3 sm:mt-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 sm:gap-6">
                           <button 
                            className="flex items-center gap-1.5 sm:gap-2 text-gray-600 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors group"
                            onClick={(e) => {
                              e.stopPropagation();
                              console.log('Liked', item.id);
                            }}
                          >
                            <Heart className="w-4 h-4 sm:w-5 sm:h-5 group-hover:fill-current" />
                            <span className="text-xs sm:text-sm font-medium">{item.likes}</span>
                          </button>
                          <button 
                            className="flex items-center gap-1.5 sm:gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors group"
                            onClick={(e) => {
                              e.stopPropagation();
                              navigator.clipboard.writeText(getPlainText(item.content))
                                .then(() => {
                                  console.log('Copied to clipboard');
                                })
                                .catch(err => {
                                  console.error('Failed to copy:', err);
                                });
                            }}
                          >
                            <Copy className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" />
                            <span className="text-xs sm:text-sm font-medium">Copy</span>
                          </button>
                          <button 
                            className="flex items-center gap-1.5 sm:gap-2 text-gray-600 dark:text-gray-400 hover:text-purple-500 dark:hover:text-purple-400 transition-colors group"
                            onClick={(e) => {
                              e.stopPropagation();
                              console.log('Bookmarked', item.id);
                            }}
                          >
                            <Bookmark className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" />
                            <span className="text-xs sm:text-sm font-medium">Save</span>
                          </button>
                        </div>
                        <div className="flex items-center gap-2 sm:gap-3">
                          <button 
                            className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Share className="w-4 h-4 sm:w-5 sm:h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Load more ref for infinite scroll */}
            <div ref={loadMoreRef} className="py-6 sm:py-8 text-center">
              {isLoading ? (
                <div className="flex items-center justify-center gap-2 text-gray-600 dark:text-gray-400">
                  <div className="w-4 h-4 border-2 border-gray-300 border-t-burgundy-500 rounded-full animate-spin"></div>
                  <span className="text-sm">Loading more...</span>
                </div>
              ) : hasMore ? (
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  Scroll down to load more
                </p>
              ) : (
                <div className="text-center py-6 sm:py-8">
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 font-medium">
                    You've reached the end of the feed
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Sidebar - Desktop Only */}
        <div className="hidden lg:block w-80">
          <div className="sticky top-6 space-y-6">
            {/* Recommended Reading - Sticky Section */}
            <div className="sticky top-[420px]">
              <div className="bg-white dark:bg-gray-800 rounded-md p-5 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-2 mb-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white">What to Read</h3>
                </div>
                
                <div className="space-y-4 mb-6">
                  {recommendedDocuments.map((doc) => (
                    <Link
                      key={doc.id}
                      to={`/documents/${doc.id}`}
                      className="block p-3 rounded-lg hover:bg-slate/50 dark:hover:bg-gray-700/50 transition-colors group"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-gray-900 dark:text-white group-hover:text-burgundy-600 dark:group-hover:text-burgundy-400 line-clamp-2">
                            {doc.title}
                          </h4>
                          <span className="text-xs text-gray-500 dark:text-gray-400 flex-shrink-0 ml-2">
                            {doc.year}
                          </span>
                        </div>
                        {doc.significance && (
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-amber-600 dark:text-amber-400 font-medium flex items-center gap-1">
                              <Zap className="w-3 h-3" />
                              {doc.significance}
                            </span>
                          </div>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>

                <Link
                  to="/documents"
                  className="text-burgundy-700 hover:text-burgundy-800 transition-all group"
                >
                  <span className="font-medium text-sm">View All Documents</span>
                </Link>
              </div>

              {/* Footer - Simplified (no bg, no border) */}
              <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-3 text-xs">
                    <Link to="/terms" className="text-gray-600 dark:text-gray-400 hover:text-burgundy-600 dark:hover:text-burgundy-400 transition-colors">
                      Terms of Service
                    </Link>
                    <span className="text-gray-300 dark:text-gray-600">|</span>
                    <Link to="/privacy" className="text-gray-600 dark:text-gray-400 hover:text-burgundy-600 dark:hover:text-burgundy-400 transition-colors">
                      Privacy Policy
                    </Link>
                    <span className="text-gray-300 dark:text-gray-600">|</span>
                    <Link to="/cookies" className="text-gray-600 dark:text-gray-400 hover:text-burgundy-600 dark:hover:text-burgundy-400 transition-colors">
                      Cookie Policy
                    </Link>
                  </div>
                  <div className="flex flex-wrap gap-3 text-xs">
                    <Link to="/accessibility" className="text-gray-600 dark:text-gray-400 hover:text-burgundy-600 dark:hover:text-burgundy-400 transition-colors">
                      Accessibility
                    </Link>
                    <span className="text-gray-300 dark:text-gray-600">|</span>
                    <Link to="/about" className="text-gray-600 dark:text-gray-400 hover:text-burgundy-600 dark:hover:text-burgundy-400 transition-colors">
                      About
                    </Link>
                  </div>
                  <div className="pt-2">
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      © new Date().getFullYear() Anno Domini. All rights reserved.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryFeedPage;