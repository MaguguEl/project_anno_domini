import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { ArrowLeft, Calendar, BookOpen, Quote } from 'lucide-react';
import { formatLifespan } from '../../utils/dateUtils';

const FigureDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getFigureById, getRelatedEntities } = useData();
  const figure = id ? getFigureById(id) : null;
  
  if (!figure) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center py-16">
            <h1 className="text-3xl font-serif text-burgundy-900 dark:text-burgundy-300 mb-4">
              Figure Not Found
            </h1>
            <p className="text-slate-600 dark:text-slate-300 mb-8 text-lg">
              The historical figure you're looking for doesn't exist or has been removed.
            </p>
            <Link to="/figures" className="inline-block px-6 py-3 bg-burgundy-900 text-white rounded-lg hover:bg-burgundy-800 transition-colors">
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
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Hero Section with Decorative Elements */}
      <div className="relative bg-gradient-to-br from-burgundy-900 via-burgundy-800 to-burgundy-950 text-white overflow-hidden">
        {/* Decorative Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(255,255,255,0.1) 0%, transparent 50%)',
          }}></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link to="/figures" className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-6 transition-all hover:gap-3 group">
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Back to Figures</span>
          </Link>
          
          <div className="flex flex-col md:flex-row gap-8 items-start pb-10">
            {/* Profile Image with Ornate Frame Effect */}
            <div className="relative group">
              <div className="absolute -inset-3 bg-gradient-to-br from-amber-400 via-burgundy-400 to-amber-500 rounded-xl opacity-75 blur-xl group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative w-48 h-64 rounded-xl overflow-hidden shadow-2xl flex-shrink-0 bg-slate-900 ring-4 ring-white/20">
                <img 
                  src={figure.image} 
                  alt={figure.name}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                {/* Vintage Corner Ornaments */}
                <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-amber-400/50 rounded-tl-xl"></div>
                <div className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-amber-400/50 rounded-tr-xl"></div>
                <div className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 border-amber-400/50 rounded-bl-xl"></div>
                <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-amber-400/50 rounded-br-xl"></div>
              </div>
            </div>
            
            <div className="flex-1 pt-2 space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                <Calendar size={16} className="text-amber-300" />
                <span className="text-amber-100 text-base font-medium tracking-wide">
                  {formatLifespan(figure.birthYear, figure.deathYear)}
                </span>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-serif mb-4 leading-tight bg-gradient-to-r from-white via-amber-100 to-white bg-clip-text text-transparent drop-shadow-lg">
                {figure.name}
              </h1>
              
              <div className="flex flex-wrap gap-2 pt-1">
                {figure.roles.map((role, idx) => (
                  <span 
                    key={role}
                    className="group relative px-4 py-1.5 bg-white/15 backdrop-blur-md rounded-full text-xs font-semibold border border-white/20 hover:bg-white/25 hover:border-amber-300/50 transition-all duration-300 hover:scale-105 shadow-lg"
                    style={{
                      animationDelay: `${idx * 100}ms`
                    }}
                  >
                    <span className="relative z-10">{role}</span>
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
              <h2 className="text-3xl font-serif text-burgundy-900 dark:text-burgundy-300 mb-6 pb-3 border-b-2 border-burgundy-200 dark:border-burgundy-800">
                Biography
              </h2>
              <div className="text-slate-700 dark:text-slate-300 leading-relaxed text-lg space-y-4">
                <p>{figure.description}</p>
                
                {figure.influence && (
                  <div className="mt-8">
                    <h3 className="text-2xl font-serif text-burgundy-900 dark:text-burgundy-300 mb-4">
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
                  <Quote className="w-6 h-6 text-burgundy-700 dark:text-burgundy-300" />
                  <h2 className="text-3xl font-serif text-burgundy-900 dark:text-burgundy-300">
                    Notable Quotes
                  </h2>
                </div>
                <div className="space-y-8">
                  {figure.quotes.map(quote => (
                    <blockquote 
                      key={quote.id}
                      className="border-l-4 border-burgundy-400 dark:border-burgundy-600 pl-6 py-2"
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
                <div className="flex items-center gap-2 mb-6 pb-2 border-b-2 border-burgundy-200 dark:border-burgundy-800">
                  <Calendar className="w-5 h-5 text-burgundy-700 dark:text-burgundy-300" />
                  <h2 className="text-2xl font-serif text-burgundy-900 dark:text-burgundy-300">
                    Key Events
                  </h2>
                </div>
                <div className="space-y-3">
                  {relatedEvents.map(event => (
                    <Link 
                      key={event.id}
                      to={`/events/${event.id}`}
                      className="block py-3 px-4 rounded-md hover:bg-active dark:hover:bg-slate-800 transition-colors"
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
                <div className="flex items-center gap-2 mb-6 pb-2 border-b-2 border-burgundy-200 dark:border-burgundy-800">
                  <BookOpen className="w-5 h-5 text-burgundy-700 dark:text-burgundy-300" />
                  <h2 className="text-2xl font-serif text-burgundy-900 dark:text-burgundy-300">
                    Writings & Documents
                  </h2>
                </div>
                <div className="space-y-3">
                  {relatedDocs.map(doc => (
                    <Link 
                      key={doc.id}
                      to={`/documents/${doc.id}`}
                      className="block py-3 px-4 rounded-md hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors border-l-2 border-burgundy-300 dark:border-burgundy-700"
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