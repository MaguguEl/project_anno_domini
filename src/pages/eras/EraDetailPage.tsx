import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Users, FileText, BookOpen, MapPin, Crown, ScrollText } from 'lucide-react';
import { useData } from '../../context/DataContext';
import TimelineDisplay from '../../components/ui/TimelineDisplay';
import FigureCard from '../../components/ui/FigureCard';
import DocumentCard from '../../components/ui/DocumentCard';

const EraDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { 
    getEraById, 
    getEventsByEra, 
    getFiguresByEra, 
    getDocumentsByEra,
    getHistorianFigures,
    getRelatedEntities
  } = useData();
  
  const era = id ? getEraById(id) : null;
  
  if (!era) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-navy-900 py-12">
        <div className="container-max">
          <div className="card p-8 text-center">
            <h1 className="text-2xl font-serif text-burgundy-700 dark:text-burgundy-300 mb-4">
              Era Not Found
            </h1>
            <p className="text-navy-600 dark:text-navy-300 mb-6">
              The historical era you're looking for doesn't exist or has been removed.
            </p>
            <Link to="/eras" className="btn-primary">
              Browse All Eras
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const eraEvents = getEventsByEra(era.id);
  const eraFigures = getFiguresByEra(era.id);
  const eraDocuments = getDocumentsByEra(era.id);
  const allHistorians = getHistorianFigures();
  
  // Filter historians relevant to this era
  const eraHistorians = allHistorians.filter(historian => {
    if (!historian.birthYear) return false;
    
    // Include historians who lived during or shortly after the era
    const eraEnd = era.endYear;
    const historianBirth = historian.birthYear;
    
    // Include if historian was born within 200 years after era end (to capture those who wrote about it)
    return historianBirth <= eraEnd + 200 && 
           (!historian.deathYear || historian.deathYear >= era.startYear);
  });

  // Get related sources for this era
  const relatedData = getRelatedEntities('era', era.id);
  const eraSources = relatedData.sources || [];

  // Use characteristics from era data
  const characteristics = era.characteristics || {
    keyThemes: [],
    majorCenters: [],
    challenges: [],
    achievements: [],
    historians: [],
    extendedContext: ''
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-navy-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-navy-800 to-burgundy-900 text-white py-16">
        <div className="container-max">
          <div className="flex items-center gap-4 mb-6">
            <Link to="/eras" className="text-white/80 hover:text-white">
              <ArrowLeft size={24} />
            </Link>
            <div>
              <div className="text-gold-400 mb-2 flex items-center gap-2">
                <Calendar size={16} />
                Volume {era.volume} • {era.startYear} - {era.endYear}
              </div>
              <h1 className="text-4xl font-serif mb-4">{era.name}</h1>
              <p className="text-xl text-navy-100 max-w-4xl">
                {era.description}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Era Overview Stats */}
      <div className="bg-white dark:bg-navy-800 border-b border-gray-200 dark:border-navy-700">
        <div className="container-max py-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-burgundy-700 dark:text-burgundy-300 mb-2">
                {eraEvents.length}
              </div>
              <div className="text-navy-600 dark:text-navy-300 flex items-center justify-center gap-1">
                <Calendar size={16} />
                Key Events
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-burgundy-700 dark:text-burgundy-300 mb-2">
                {eraFigures.length}
              </div>
              <div className="text-navy-600 dark:text-navy-300 flex items-center justify-center gap-1">
                <Users size={16} />
                Notable Figures
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-burgundy-700 dark:text-burgundy-300 mb-2">
                {eraDocuments.length}
              </div>
              <div className="text-navy-600 dark:text-navy-300 flex items-center justify-center gap-1">
                <FileText size={16} />
                Documents
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-burgundy-700 dark:text-burgundy-300 mb-2">
                {eraHistorians.length}
              </div>
              <div className="text-navy-600 dark:text-navy-300 flex items-center justify-center gap-1">
                <ScrollText size={16} />
                Historians
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-burgundy-700 dark:text-burgundy-300 mb-2">
                {era.endYear - era.startYear}
              </div>
              <div className="text-navy-600 dark:text-navy-300">
                Years Span
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container-max py-12">
        <div className="space-y-16">
          {/* Era Characteristics */}
          <section>
            <h2 className="text-3xl font-serif text-navy-800 dark:text-navy-100 mb-8">
              Era Characteristics
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Key Themes */}
              <div className="card p-6">
                <div className="flex items-center gap-2 mb-4">
                  <BookOpen className="w-6 h-6 text-burgundy-700 dark:text-burgundy-300" />
                  <h3 className="text-xl font-serif text-burgundy-700 dark:text-burgundy-300">
                    Key Themes
                  </h3>
                </div>
                <div className="space-y-2">
                  {characteristics.keyThemes.map((theme, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-burgundy-700 dark:bg-burgundy-300 rounded-full"></div>
                      <span className="text-navy-700 dark:text-navy-300">{theme}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Major Centers */}
              <div className="card p-6">
                <div className="flex items-center gap-2 mb-4">
                  <MapPin className="w-6 h-6 text-burgundy-700 dark:text-burgundy-300" />
                  <h3 className="text-xl font-serif text-burgundy-700 dark:text-burgundy-300">
                    Major Centers
                  </h3>
                </div>
                <div className="space-y-2">
                  {characteristics.majorCenters.map((center, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-gold-600 dark:bg-gold-400 rounded-full"></div>
                      <span className="text-navy-700 dark:text-navy-300">{center}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Challenges */}
              <div className="card p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Crown className="w-6 h-6 text-burgundy-700 dark:text-burgundy-300" />
                  <h3 className="text-xl font-serif text-burgundy-700 dark:text-burgundy-300">
                    Major Challenges
                  </h3>
                </div>
                <div className="space-y-2">
                  {characteristics.challenges.map((challenge, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-red-600 dark:bg-red-400 rounded-full"></div>
                      <span className="text-navy-700 dark:text-navy-300">{challenge}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Achievements */}
              <div className="card p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Users className="w-6 h-6 text-burgundy-700 dark:text-burgundy-300" />
                  <h3 className="text-xl font-serif text-burgundy-700 dark:text-burgundy-300">
                    Key Achievements
                  </h3>
                </div>
                <div className="space-y-2">
                  {characteristics.achievements.map((achievement, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-emerald-600 dark:bg-emerald-400 rounded-full"></div>
                      <span className="text-navy-700 dark:text-navy-300">{achievement}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Historical Documentation */}
          {characteristics.historians.length > 0 && (
            <section>
              <h2 className="text-3xl font-serif text-navy-800 dark:text-navy-100 mb-8">
                Historical Documentation
              </h2>
              <div className="card p-6">
                <div className="flex items-center gap-2 mb-4">
                  <ScrollText className="w-6 h-6 text-burgundy-700 dark:text-burgundy-300" />
                  <h3 className="text-xl font-serif text-burgundy-700 dark:text-burgundy-300">
                    How We Know About This Era
                  </h3>
                </div>
                <div className="space-y-3">
                  {characteristics.historians.map((historian, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-purple-600 dark:bg-purple-400 rounded-full mt-2"></div>
                      <span className="text-navy-700 dark:text-navy-300">{historian}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* External Sources */}
          {eraSources.length > 0 && (
            <section>
              <h2 className="text-3xl font-serif text-navy-800 dark:text-navy-100 mb-8">
                Primary Sources & External Resources
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {eraSources.slice(0, 6).map((source, index) => (
                  <div key={source.id} className="card p-4">
                    <h3 className="font-serif text-lg text-burgundy-700 dark:text-burgundy-300 mb-2">
                      {source.title}
                    </h3>
                    <p className="text-sm text-navy-600 dark:text-navy-300 mb-3">
                      {source.summary}
                    </p>
                    <a 
                      href={source.externalUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm text-gold-600 hover:text-gold-700 dark:text-gold-400"
                    >
                      View on {source.hostedOn} →
                    </a>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Notable Historians */}
          {eraHistorians.length > 0 && (
            <section>
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-serif text-navy-800 dark:text-navy-100">
                  Notable Historians
                </h2>
                <Link 
                  to="/figures" 
                  className="text-burgundy-700 dark:text-burgundy-300 hover:underline flex items-center gap-1"
                >
                  View all historians <ArrowLeft className="rotate-180" size={16} />
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {eraHistorians.slice(0, 6).map((historian, index) => (
                  <FigureCard key={historian.id} figure={historian} index={index} />
                ))}
              </div>
              {eraHistorians.length > 6 && (
                <div className="mt-8 text-center">
                  <Link to="/figures" className="btn-primary">
                    View All {eraHistorians.length} Historians
                  </Link>
                </div>
              )}
            </section>
          )}

          {/* Key Events */}
          {eraEvents.length > 0 && (
            <section>
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-serif text-navy-800 dark:text-navy-100">
                  Key Events
                </h2>
                <Link 
                  to="/timeline" 
                  className="text-burgundy-700 dark:text-burgundy-300 hover:underline flex items-center gap-1"
                >
                  View full timeline <ArrowLeft className="rotate-180" size={16} />
                </Link>
              </div>
              <div className="card p-6">
                <TimelineDisplay events={eraEvents.slice(0, 5)} />
                {eraEvents.length > 5 && (
                  <div className="mt-6 text-center">
                    <Link to="/timeline" className="btn-primary">
                      View All {eraEvents.length} Events
                    </Link>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Notable Figures */}
          {eraFigures.length > 0 && (
            <section>
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-serif text-navy-800 dark:text-navy-100">
                  Notable Figures
                </h2>
                <Link 
                  to="/figures" 
                  className="text-burgundy-700 dark:text-burgundy-300 hover:underline flex items-center gap-1"
                >
                  View all figures <ArrowLeft className="rotate-180" size={16} />
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {eraFigures.slice(0, 6).map((figure, index) => (
                  <FigureCard key={figure.id} figure={figure} index={index} />
                ))}
              </div>
              {eraFigures.length > 6 && (
                <div className="mt-8 text-center">
                  <Link to="/figures" className="btn-primary">
                    View All {eraFigures.length} Figures
                  </Link>
                </div>
              )}
            </section>
          )}

          {/* Important Documents */}
          {eraDocuments.length > 0 && (
            <section>
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-serif text-navy-800 dark:text-navy-100">
                  Important Documents
                </h2>
                <Link 
                  to="/documents" 
                  className="text-burgundy-700 dark:text-burgundy-300 hover:underline flex items-center gap-1"
                >
                  View all documents <ArrowLeft className="rotate-180" size={16} />
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {eraDocuments.slice(0, 6).map((document, index) => (
                  <DocumentCard key={document.id} document={document} index={index} />
                ))}
              </div>
              {eraDocuments.length > 6 && (
                <div className="mt-8 text-center">
                  <Link to="/documents" className="btn-primary">
                    View All {eraDocuments.length} Documents
                  </Link>
                </div>
              )}
            </section>
          )}

          {/* Historical Context */}
          <section className="card p-8">
            <h2 className="text-3xl font-serif text-burgundy-700 dark:text-burgundy-300 mb-6">
              Historical Context
            </h2>
            <div className="prose prose-navy dark:prose-invert max-w-none">
              <p className="text-lg text-navy-700 dark:text-navy-300 leading-relaxed">
                {era.description}
              </p>
              
              {/* Extended context from characteristics */}
              {characteristics.extendedContext && (
                <div className="mt-6">
                  <p className="text-navy-700 dark:text-navy-300 leading-relaxed">
                    {characteristics.extendedContext}
                  </p>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default EraDetailPage;