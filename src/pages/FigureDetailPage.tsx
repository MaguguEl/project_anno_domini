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
      <div className="min-h-screen bg-slate-50 dark:bg-navy-900 py-12">
        <div className="container-max">
          <div className="card p-8 text-center">
            <h1 className="text-2xl font-serif text-burgundy-700 dark:text-burgundy-300 mb-4">
              Figure Not Found
            </h1>
            <p className="text-navy-600 dark:text-navy-300 mb-6">
              The historical figure you're looking for doesn't exist or has been removed.
            </p>
            <Link to="/figures" className="btn-primary">
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
    <div className="min-h-screen bg-slate-50 dark:bg-navy-900">
      {/* Header */}
      <div className="bg-burgundy-800 dark:bg-burgundy-900 text-white">
        <div className="container-max py-12">
          <div className="flex items-start gap-8">
            <Link to="/figures" className="text-white/80 hover:text-white mt-2">
              <ArrowLeft size={24} />
            </Link>
            
            <div className="flex-1">
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="w-48 h-48 rounded-lg overflow-hidden bg-navy-800">
                  <img 
                    src={figure.image} 
                    alt={figure.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="flex-1">
                  <div className="text-burgundy-200 mb-2">
                    {formatLifespan(figure.birthYear, figure.deathYear)}
                  </div>
                  <h1 className="text-4xl font-serif mb-4">{figure.name}</h1>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {figure.roles.map(role => (
                      <span 
                        key={role}
                        className="px-3 py-1 bg-white/10 rounded-full text-sm"
                      >
                        {role}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="container-max py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="card p-6 mb-8">
              <h2 className="text-2xl font-serif text-burgundy-700 dark:text-burgundy-300 mb-4">
                Biography
              </h2>
              <div className="prose prose-navy dark:prose-invert max-w-none">
                <p className="text-navy-700 dark:text-navy-300 leading-relaxed">
                  {figure.description}
                </p>
                {figure.influence && (
                  <>
                    <h3 className="text-xl font-serif text-burgundy-700 dark:text-burgundy-300 mt-6 mb-3">
                      Historical Influence
                    </h3>
                    <p className="text-navy-700 dark:text-navy-300 leading-relaxed">
                      {figure.influence}
                    </p>
                  </>
                )}
              </div>
            </div>
            
            {/* Notable Quotes */}
            {figure.quotes.length > 0 && (
              <div className="card p-6">
                <div className="flex items-center gap-2 mb-6">
                  <Quote className="w-5 h-5 text-burgundy-700 dark:text-burgundy-300" />
                  <h2 className="text-2xl font-serif text-burgundy-700 dark:text-burgundy-300">
                    Notable Quotes
                  </h2>
                </div>
                <div className="space-y-6">
                  {figure.quotes.map(quote => (
                    <blockquote 
                      key={quote.id}
                      className="border-l-4 border-burgundy-300 dark:border-burgundy-700 pl-4"
                    >
                      <p className="text-lg italic text-navy-700 dark:text-navy-300 mb-2">
                        "{quote.text}"
                      </p>
                      <footer className="text-sm text-navy-600 dark:text-navy-400">
                        <cite>{quote.source}</cite>
                        {quote.context && (
                          <p className="mt-1">{quote.context}</p>
                        )}
                      </footer>
                    </blockquote>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Sidebar */}
          <div className="space-y-8">
            {/* Related Events */}
            {relatedEvents.length > 0 && (
              <div className="card p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Calendar className="w-5 h-5 text-burgundy-700 dark:text-burgundy-300" />
                  <h2 className="text-xl font-serif text-burgundy-700 dark:text-burgundy-300">
                    Key Events
                  </h2>
                </div>
                <div className="space-y-4">
                  {relatedEvents.map(event => (
                    <Link 
                      key={event.id}
                      to={`/events/${event.id}`}
                      className="block p-3 rounded-lg hover:bg-navy-50 dark:hover:bg-navy-700 transition-colors"
                    >
                      <div className="font-medium text-navy-800 dark:text-navy-100">
                        {event.title}
                      </div>
                      <div className="text-sm text-navy-600 dark:text-navy-300">
                        {event.year}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
            
            {/* Related Documents */}
            {relatedDocs.length > 0 && (
              <div className="card p-6">
                <div className="flex items-center gap-2 mb-4">
                  <BookOpen className="w-5 h-5 text-burgundy-700 dark:text-burgundy-300" />
                  <h2 className="text-xl font-serif text-burgundy-700 dark:text-burgundy-300">
                    Writings & Documents
                  </h2>
                </div>
                <div className="space-y-4">
                  {relatedDocs.map(doc => (
                    <Link 
                      key={doc.id}
                      to={`/documents/${doc.id}`}
                      className="block p-3 rounded-lg hover:bg-navy-50 dark:hover:bg-navy-700 transition-colors"
                    >
                      <div className="font-medium text-navy-800 dark:text-navy-100">
                        {doc.title}
                      </div>
                      <div className="text-sm text-navy-600 dark:text-navy-300">
                        {doc.year}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FigureDetailPage;