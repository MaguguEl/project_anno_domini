import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { ArrowLeft, Calendar, User, BookOpen } from 'lucide-react';

const DocumentDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getDocumentById, getRelatedEntities } = useData();
  const document = id ? getDocumentById(id) : null;
  
  if (!document) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-navy-900 py-12">
        <div className="container-max">
          <div className="card p-8 text-center">
            <h1 className="text-2xl font-serif text-burgundy-700 dark:text-burgundy-300 mb-4">
              Document Not Found
            </h1>
            <p className="text-navy-600 dark:text-navy-300 mb-6">
              The document you're looking for doesn't exist or has been removed.
            </p>
            <Link to="/documents" className="btn-primary">
              Browse All Documents
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const relatedData = getRelatedEntities('document', document.id);
  const relatedPeople = relatedData.people || [];
  const relatedEvents = relatedData.events || [];
  const era = relatedData.era;
  
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-navy-900">
      {/* Header */}
      <div className="bg-gold-500 py-12">
        <div className="container-max">
          <div className="flex items-center gap-4 mb-6">
            <Link to="/documents" className="text-navy-900 hover:text-navy-700">
              <ArrowLeft size={24} />
            </Link>
            <div>
              <div className="flex items-center gap-2 text-navy-800 mb-2">
                <Calendar size={16} />
                <span>{document.year}</span>
                <span className="mx-2">·</span>
                <BookOpen size={16} />
                <span>{document.author}</span>
              </div>
              <h1 className="text-3xl font-serif text-navy-900">{document.title}</h1>
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
                Historical Context
              </h2>
              <p className="text-navy-700 dark:text-navy-300 leading-relaxed mb-8">
                {document.context}
              </p>
              
              <h2 className="text-2xl font-serif text-burgundy-700 dark:text-burgundy-300 mb-4">
                Document Content
              </h2>
              <div className="prose prose-navy dark:prose-invert max-w-none">
                {document.content.split('\n\n').map((paragraph, index) => (
                  <p 
                    key={index}
                    className="text-navy-700 dark:text-navy-300 leading-relaxed mb-4"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="space-y-8">
            {/* Related People */}
            {relatedPeople.length > 0 && (
              <div className="card p-6">
                <div className="flex items-center gap-2 mb-4">
                  <User className="w-5 h-5 text-burgundy-700 dark:text-burgundy-300" />
                  <h2 className="text-xl font-serif text-burgundy-700 dark:text-burgundy-300">
                    Related Figures
                  </h2>
                </div>
                <div className="space-y-4">
                  {relatedPeople.map(figure => (
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
            
            {/* Related Events */}
            {relatedEvents.length > 0 && (
              <div className="card p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Calendar className="w-5 h-5 text-burgundy-700 dark:text-burgundy-300" />
                  <h2 className="text-xl font-serif text-burgundy-700 dark:text-burgundy-300">
                    Related Events
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
            
            {/* Document Info */}
            <div className="card p-6">
              <h2 className="text-xl font-serif text-burgundy-700 dark:text-burgundy-300 mb-4">
                Document Information
              </h2>
              <dl className="space-y-3">
                <div>
                  <dt className="text-sm font-medium text-navy-600 dark:text-navy-300">
                    Era
                  </dt>
                  <dd className="text-navy-800 dark:text-navy-100">
                    {era?.name} ({era?.startYear}-{era?.endYear})
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-navy-600 dark:text-navy-300">
                    Volume
                  </dt>
                  <dd className="text-navy-800 dark:text-navy-100">
                    Volume {era?.volume || 'N/A'}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentDetailPage;