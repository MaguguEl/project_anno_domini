import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { ArrowLeft, Calendar, MapPin, User, FileText, Tag } from 'lucide-react';
import { formatDate } from '../../utils/dateUtils';

const EventDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getEventById, getRelatedEntities } = useData();
  const event = id ? getEventById(id) : null;
  
  if (!event) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center py-16">
            <h1 className="text-2xl font-serif text-burgundy-700 dark:text-burgundy-300 mb-4">
              Event Not Found
            </h1>
            <p className="text-navy-600 dark:text-navy-300 mb-6">
              The event you're looking for doesn't exist or has been removed.
            </p>
            <Link to="/timeline" className="btn-primary">
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
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Hero Section with Consistent Styling */}
      <div className="relative bg-gradient-to-br from-burgundy-900 via-burgundy-800 to-burgundy-950 text-white overflow-hidden">
        {/* Decorative Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(255,255,255,0.1) 0%, transparent 50%)',
          }}></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link to="/timeline" className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-6 transition-all hover:gap-3 group">
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Back to Timeline</span>
          </Link>
          
          <div className="flex flex-col gap-6 pb-10">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                <Calendar size={16} className="text-amber-300" />
                <span className="text-amber-100 text-base font-medium tracking-wide">
                  {formatDate(event.year, event.month, event.day)}
                </span>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-serif mb-4 leading-tight bg-gradient-to-r from-white via-amber-100 to-white bg-clip-text text-transparent drop-shadow-lg">
                {event.title}
              </h1>
              
              <div className="flex flex-wrap gap-3 pt-1">
                {era && (
                  <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                    <span className="text-white/90 text-sm">{era.name}</span>
                    <span className="text-white/60 text-xs">•</span>
                    <span className="text-white/70 text-xs">{era.startYear}–{era.endYear}</span>
                  </div>
                )}
                
                {event.locations.length > 0 && (
                  <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                    <MapPin size={14} className="text-white/70" />
                    <span className="text-white/90 text-sm">{event.locations.join(', ')}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Wave Decoration */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-12 fill-current text-slate-50 dark:text-slate-900" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
          </svg>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description Card */}
            <div className="bg-white dark:bg-navy-800 rounded-xl shadow-md border border-navy-200 dark:border-navy-700 p-6">
              <h2 className="text-2xl font-serif text-burgundy-700 dark:text-burgundy-300 mb-5 pb-3 border-b-2 border-burgundy-200 dark:border-burgundy-800">
                What Happened
              </h2>
              <div className="prose prose-navy dark:prose-invert max-w-none">
                <p className="text-base text-navy-700 dark:text-navy-300 leading-relaxed">
                  {event.description}
                </p>
              </div>
            </div>
            
            {/* Tags Section */}
            {event.tags.length > 0 && (
              <div className="bg-white dark:bg-navy-800 rounded-xl shadow-md border border-navy-200 dark:border-navy-700 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Tag className="w-5 h-5 text-burgundy-700 dark:text-burgundy-300" />
                  <h3 className="text-lg font-serif text-burgundy-700 dark:text-burgundy-300">
                    Topics & Themes
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {event.tags.map(tag => (
                    <span 
                      key={tag}
                      className="px-3 py-1.5 bg-burgundy-50 text-burgundy-800 dark:bg-burgundy-900/30 dark:text-burgundy-300 rounded-full text-sm font-medium border border-burgundy-200 dark:border-burgundy-800"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6">
            {/* Related Figures */}
            {relatedFigures && relatedFigures.length > 0 && (
              <div className="bg-white dark:bg-navy-800 rounded-xl shadow-md border border-navy-200 dark:border-navy-700 p-5">
                <div className="flex items-center gap-2 mb-4 pb-3 border-b border-navy-200 dark:border-navy-700">
                  <User className="w-5 h-5 text-burgundy-700 dark:text-burgundy-300" />
                  <h2 className="text-lg font-serif text-burgundy-700 dark:text-burgundy-300">
                    Key Figures
                  </h2>
                </div>
                <div className="space-y-3">
                  {relatedFigures.map((figure: any) => (
                    <Link 
                      key={figure.id}
                      to={`/figures/${figure.id}`}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-navy-700 transition-colors group"
                    >
                      <div className="w-12 h-12 rounded-full overflow-hidden bg-slate-200 dark:bg-slate-700 flex-shrink-0 ring-2 ring-burgundy-200 dark:ring-burgundy-800 group-hover:ring-burgundy-400 dark:group-hover:ring-burgundy-600 transition-all">
                        <img 
                          src={figure.image} 
                          alt={figure.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm text-navy-900 dark:text-navy-100 truncate">
                          {figure.name}
                        </div>
                        <div className="text-xs text-navy-600 dark:text-navy-400 truncate">
                          {figure.roles[0]}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
            
            {/* Related Documents */}
            {relatedDocs && relatedDocs.length > 0 && (
              <div className="bg-white dark:bg-navy-800 rounded-xl shadow-md border border-navy-200 dark:border-navy-700 p-5">
                <div className="flex items-center gap-2 mb-4 pb-3 border-b border-navy-200 dark:border-navy-700">
                  <FileText className="w-5 h-5 text-burgundy-700 dark:text-burgundy-300" />
                  <h2 className="text-lg font-serif text-burgundy-700 dark:text-burgundy-300">
                    Related Documents
                  </h2>
                </div>
                <div className="space-y-3">
                  {relatedDocs.map((doc: any) => (
                    <Link 
                      key={doc.id}
                      to={`/documents/${doc.id}`}
                      className="block p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-navy-700 transition-colors"
                    >
                      <div className="font-medium text-sm text-navy-900 dark:text-navy-100 mb-1 line-clamp-2">
                        {doc.title}
                      </div>
                      <div className="text-xs text-navy-600 dark:text-navy-400">
                        {doc.author} • {doc.year}
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

export default EventDetailPage;