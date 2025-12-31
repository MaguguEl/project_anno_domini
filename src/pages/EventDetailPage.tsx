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
      <div className="min-h-screen bg-slate-50 dark:bg-navy-900 py-12">
        <div className="container-max">
          <div className="card p-8 text-center">
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

  const relatedData = getRelatedEntities('event', event.id);
  const relatedFigures = relatedData.relatedPeople || [];
  const relatedDocs = relatedData.relatedDocuments || [];
  const era = relatedData.era;
  
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-navy-900">
      {/* Header */}
      <div className="bg-burgundy-800 dark:bg-burgundy-900 text-white py-12">
        <div className="container-max">
          <div className="flex items-center gap-4 mb-6">
            <Link to="/timeline" className="text-white/80 hover:text-white">
              <ArrowLeft size={24} />
            </Link>
            <div>
              <div className="text-burgundy-200 mb-2 flex items-center gap-2">
                <Calendar size={16} />
                {formatDate(event.year, event.month, event.day)}
              </div>
              <h1 className="text-3xl font-serif">{event.title}</h1>
              {era && (
                <div className="text-burgundy-200 mt-2">
                  {era.name} ({era.startYear}-{era.endYear})
                </div>
              )}
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
                Description
              </h2>
              <p className="text-navy-700 dark:text-navy-300 leading-relaxed">
                {event.description}
              </p>
              
              {event.locations.length > 0 && (
                <div className="mt-6 flex items-center gap-2 text-navy-600 dark:text-navy-300">
                  <MapPin size={16} />
                  <span>{event.locations.join(', ')}</span>
                </div>
              )}
              
              {event.tags.length > 0 && (
                <div className="mt-6 flex flex-wrap gap-2">
                  {event.tags.map(tag => (
                    <span 
                      key={tag}
                      className="px-3 py-1 bg-burgundy-50 text-burgundy-700 dark:bg-navy-700 dark:text-burgundy-300 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="space-y-8">
            {/* Related Figures */}
            {relatedFigures.length > 0 && (
              <div className="card p-6">
                <div className="flex items-center gap-2 mb-4">
                  <User className="w-5 h-5 text-burgundy-700 dark:text-burgundy-300" />
                  <h2 className="text-xl font-serif text-burgundy-700 dark:text-burgundy-300">
                    Key Figures
                  </h2>
                </div>
                <div className="space-y-4">
                  {relatedFigures.map(figure => (
                    <Link 
                      key={figure.id}
                      to={`/figures/${figure.id}`}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-navy-50 dark:hover:bg-navy-700 transition-colors"
                    >
                      <div className="w-12 h-12 rounded-full overflow-hidden bg-navy-100 dark:bg-navy-700">
                        <img 
                          src={figure.image} 
                          alt={figure.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="font-medium text-navy-800 dark:text-navy-100">
                          {figure.name}
                        </div>
                        <div className="text-sm text-navy-600 dark:text-navy-300">
                          {figure.roles[0]}
                        </div>
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
                  <FileText className="w-5 h-5 text-burgundy-700 dark:text-burgundy-300" />
                  <h2 className="text-xl font-serif text-burgundy-700 dark:text-burgundy-300">
                    Related Documents
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
                        {doc.author} · {doc.year}
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