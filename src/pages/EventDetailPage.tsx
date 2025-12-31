import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { ArrowLeft, Calendar, MapPin, User, FileText } from 'lucide-react';
import { formatDate } from '../utils/dateUtils';

const EventDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getEventById, getRelatedEntities } = useData();
  const event = id ? getEventById(id) : null;
  
  if (!event) {
    return (
      <div className="min-h-screen bg-white dark:bg-slate-900 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center py-16">
            <h1 className="text-3xl font-serif text-red-900 dark:text-red-300 mb-4">
              Event Not Found
            </h1>
            <p className="text-slate-600 dark:text-slate-300 mb-8 text-lg">
              The event you're looking for doesn't exist or has been removed.
            </p>
            <Link to="/timeline" className="inline-block px-6 py-3 bg-red-900 text-white rounded-lg hover:bg-red-800 transition-colors">
              Return to Timeline
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const relatedData = getRelatedEntities('event', event.id) as {
    era?: any;
    relatedPeople?: any[];
    relatedDocuments?: any[];
  };
  const relatedFigures = relatedData.relatedPeople || [];
  const relatedDocs = relatedData.relatedDocuments || [];
  const era = relatedData.era;
  
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-red-900 to-red-800 dark:from-red-950 dark:to-red-900 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Link to="/timeline" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-8 transition-colors">
            <ArrowLeft size={20} />
            <span>Back to Timeline</span>
          </Link>
          
          <div className="flex items-center gap-3 text-red-200 mb-4">
            <Calendar size={20} />
            <span className="text-lg">{formatDate(event.year, event.month, event.day)}</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-serif mb-6 leading-tight">{event.title}</h1>
          
          {era && (
            <div className="text-red-200 text-lg">
              {era.name} • {era.startYear}–{era.endYear}
            </div>
          )}
          
          {event.locations.length > 0 && (
            <div className="flex items-center gap-2 text-red-200 mt-4">
              <MapPin size={18} />
              <span>{event.locations.join(', ')}</span>
            </div>
          )}
        </div>
      </div>
      
      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <article className="prose prose-lg max-w-none">
              <h2 className="text-3xl font-serif text-red-900 dark:text-red-300 mb-6 pb-3 border-b-2 border-red-200 dark:border-red-800">
                What Happened
              </h2>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-lg">
                {event.description}
              </p>
            </article>
            
            {event.tags.length > 0 && (
              <div className="mt-12">
                <h3 className="text-xl font-serif text-red-900 dark:text-red-300 mb-4">
                  Topics
                </h3>
                <div className="flex flex-wrap gap-3">
                  {event.tags.map(tag => (
                    <span 
                      key={tag}
                      className="px-4 py-2 bg-red-50 text-red-800 dark:bg-red-900/30 dark:text-red-300 rounded-full text-sm font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Sidebar */}
          <div className="space-y-10">
            {/* Related Figures */}
            {relatedFigures && relatedFigures.length > 0 && (
              <aside>
                <div className="flex items-center gap-2 mb-6 pb-2 border-b-2 border-red-200 dark:border-red-800">
                  <User className="w-5 h-5 text-red-700 dark:text-red-300" />
                  <h2 className="text-2xl font-serif text-red-900 dark:text-red-300">
                    Key Figures
                  </h2>
                </div>
                <div className="space-y-4">
                  {relatedFigures.map((figure: any) => (
                    <Link 
                      key={figure.id}
                      to={`/figures/${figure.id}`}
                      className="flex items-center gap-4 py-3 px-4 rounded-md hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors border-l-2 border-red-300 dark:border-red-700"
                    >
                      <div className="w-14 h-14 rounded-full overflow-hidden bg-slate-200 dark:bg-slate-700 flex-shrink-0">
                        <img 
                          src={figure.image} 
                          alt={figure.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="font-medium text-slate-900 dark:text-slate-100">
                          {figure.name}
                        </div>
                        <div className="text-sm text-slate-600 dark:text-slate-400">
                          {figure.roles[0]}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </aside>
            )}
            
            {/* Related Documents */}
            {relatedDocs && relatedDocs.length > 0 && (
              <aside>
                <div className="flex items-center gap-2 mb-6 pb-2 border-b-2 border-red-200 dark:border-red-800">
                  <FileText className="w-5 h-5 text-red-700 dark:text-red-300" />
                  <h2 className="text-2xl font-serif text-red-900 dark:text-red-300">
                    Related Documents
                  </h2>
                </div>
                <div className="space-y-3">
                  {relatedDocs.map((doc: any) => (
                    <Link 
                      key={doc.id}
                      to={`/documents/${doc.id}`}
                      className="block py-3 px-4 rounded-md hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors border-l-2 border-red-300 dark:border-red-700"
                    >
                      <div className="font-medium text-slate-900 dark:text-slate-100 mb-1">
                        {doc.title}
                      </div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">
                        {doc.author} • {doc.year}
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

export default EventDetailPage;