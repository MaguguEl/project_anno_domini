import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { ArrowLeft, Calendar, BookOpen, Quote } from 'lucide-react';
import { formatLifespan } from '../utils/dateUtils';

const FigureDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getFigureById, getRelatedEntities } = useData();
  const figure = id ? getFigureById(id) : null;
  
  if (!figure) {
    return (
      <div className="min-h-screen bg-white dark:bg-slate-900 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center py-16">
            <h1 className="text-3xl font-serif text-red-900 dark:text-red-300 mb-4">
              Figure Not Found
            </h1>
            <p className="text-slate-600 dark:text-slate-300 mb-8 text-lg">
              The historical figure you're looking for doesn't exist or has been removed.
            </p>
            <Link to="/figures" className="inline-block px-6 py-3 bg-red-900 text-white rounded-lg hover:bg-red-800 transition-colors">
              Browse All Figures
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const relatedData = getRelatedEntities('figure', figure.id);
  const relatedEvents = relatedData.events || [];
  const relatedDocs = relatedData.documents || [];
  
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-red-900 to-red-800 dark:from-red-950 dark:to-red-900 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link to="/figures" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-8 transition-colors">
            <ArrowLeft size={20} />
            <span>Back to Figures</span>
          </Link>
          
          <div className="flex flex-col md:flex-row gap-12 items-start pb-12">
            <div className="w-64 h-80 rounded-lg overflow-hidden shadow-2xl flex-shrink-0 bg-slate-800">
              <img 
                src={figure.image} 
                alt={figure.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="flex-1 pt-4">
              <div className="text-red-200 text-lg mb-3 tracking-wide">
                {formatLifespan(figure.birthYear, figure.deathYear)}
              </div>
              <h1 className="text-5xl md:text-6xl font-serif mb-6 leading-tight">{figure.name}</h1>
              <div className="flex flex-wrap gap-3">
                {figure.roles.map(role => (
                  <span 
                    key={role}
                    className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium"
                  >
                    {role}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Biography Column */}
          <div className="lg:col-span-2">
            <article className="prose prose-lg max-w-none">
              <h2 className="text-3xl font-serif text-red-900 dark:text-red-300 mb-6 pb-3 border-b-2 border-red-200 dark:border-red-800">
                Biography
              </h2>
              <div className="text-slate-700 dark:text-slate-300 leading-relaxed text-lg space-y-4">
                <p>{figure.description}</p>
                
                {figure.influence && (
                  <div className="mt-8">
                    <h3 className="text-2xl font-serif text-red-900 dark:text-red-300 mb-4">
                      Historical Influence
                    </h3>
                    <p>{figure.influence}</p>
                  </div>
                )}
              </div>
            </article>
            
            {/* Notable Quotes Section */}
            {figure.quotes.length > 0 && (
              <div className="mt-16">
                <div className="flex items-center gap-3 mb-8">
                  <Quote className="w-6 h-6 text-red-700 dark:text-red-300" />
                  <h2 className="text-3xl font-serif text-red-900 dark:text-red-300">
                    Notable Quotes
                  </h2>
                </div>
                <div className="space-y-8">
                  {figure.quotes.map(quote => (
                    <blockquote 
                      key={quote.id}
                      className="border-l-4 border-red-400 dark:border-red-600 pl-6 py-2"
                    >
                      <p className="text-xl italic text-slate-800 dark:text-slate-200 mb-3 leading-relaxed">
                        "{quote.text}"
                      </p>
                      <footer className="text-slate-600 dark:text-slate-400">
                        <cite className="not-italic font-medium">— {quote.source}</cite>
                        {quote.context && (
                          <p className="mt-2 text-sm">{quote.context}</p>
                        )}
                      </footer>
                    </blockquote>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Sidebar */}
          <div className="space-y-10">
            {/* Related Events */}
            {relatedEvents.length > 0 && (
              <aside>
                <div className="flex items-center gap-2 mb-6 pb-2 border-b-2 border-red-200 dark:border-red-800">
                  <Calendar className="w-5 h-5 text-red-700 dark:text-red-300" />
                  <h2 className="text-2xl font-serif text-red-900 dark:text-red-300">
                    Key Events
                  </h2>
                </div>
                <div className="space-y-3">
                  {relatedEvents.map(event => (
                    <Link 
                      key={event.id}
                      to={`/events/${event.id}`}
                      className="block py-3 px-4 rounded-md hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors border-l-2 border-red-300 dark:border-red-700"
                    >
                      <div className="font-medium text-slate-900 dark:text-slate-100 mb-1">
                        {event.title}
                      </div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">
                        {event.year}
                      </div>
                    </Link>
                  ))}
                </div>
              </aside>
            )}
            
            {/* Related Documents */}
            {relatedDocs.length > 0 && (
              <aside>
                <div className="flex items-center gap-2 mb-6 pb-2 border-b-2 border-red-200 dark:border-red-800">
                  <BookOpen className="w-5 h-5 text-red-700 dark:text-red-300" />
                  <h2 className="text-2xl font-serif text-red-900 dark:text-red-300">
                    Writings & Documents
                  </h2>
                </div>
                <div className="space-y-3">
                  {relatedDocs.map(doc => (
                    <Link 
                      key={doc.id}
                      to={`/documents/${doc.id}`}
                      className="block py-3 px-4 rounded-md hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors border-l-2 border-red-300 dark:border-red-700"
                    >
                      <div className="font-medium text-slate-900 dark:text-slate-100 mb-1">
                        {doc.title}
                      </div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">
                        {doc.year}
                      </div>
                    </Link>
                  ))}
                </div>
              </aside>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FigureDetailPage;