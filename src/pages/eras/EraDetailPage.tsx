import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Users, FileText, BookOpen, MapPin, Crown, ScrollText, TrendingUp, AlertCircle } from 'lucide-react';
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
    const eraEnd = era.endYear;
    const historianBirth = historian.birthYear;
    return historianBirth <= eraEnd + 200 && 
           (!historian.deathYear || historian.deathYear >= era.startYear);
  });

  // Get related sources for this era
  const relatedData = getRelatedEntities('era', era.id);
  const eraSources = relatedData.sources || [];

  // Extract characteristics with safe defaults
  const characteristics = era.characteristics || {
    keyThemes: [],
    majorCenters: [],
    challenges: [],
    achievements: [],
    historians: [],
    extendedContext: ''
  };

  // Ensure arrays exist
  const keyThemes = Array.isArray(characteristics.keyThemes) ? characteristics.keyThemes : [];
  const majorCenters = Array.isArray(characteristics.majorCenters) ? characteristics.majorCenters : [];
  const challenges = Array.isArray(characteristics.challenges) ? characteristics.challenges : [];
  const achievements = Array.isArray(characteristics.achievements) ? characteristics.achievements : [];
  const historiansInfo = Array.isArray(characteristics.historians) ? characteristics.historians : [];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-burgundy-900 via-burgundy-800 to-burgundy-950 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(255,255,255,0.1) 0%, transparent 50%)',
          }}></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link to="/eras" className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-6 transition-all hover:gap-3 group">
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Back to Eras</span>
          </Link>
          
          <div className="flex flex-col gap-6 pb-10">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                <Calendar size={16} className="text-amber-300" />
                <span className="text-amber-100 text-base font-medium tracking-wide">
                  Volume {era.volume} • {era.startYear} - {era.endYear} ({era.endYear - era.startYear} years)
                </span>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-serif mb-4 leading-tight bg-gradient-to-r from-white via-amber-100 to-white bg-clip-text text-transparent drop-shadow-lg">
                {era.name}
              </h1>
              
              <p className="text-base md:text-lg text-white/90 max-w-4xl leading-relaxed">
                {era.description}
              </p>
            </div>
            
            {/* Quick Stats */}
            <div className="flex flex-wrap gap-3 pt-2">
              <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                <Calendar size={16} className="text-white/70" />
                <span className="text-white font-semibold text-sm">{eraEvents.length}</span>
                <span className="text-white/70 text-xs">Events</span>
              </div>
              
              <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                <Users size={16} className="text-white/70" />
                <span className="text-white font-semibold text-sm">{eraFigures.length}</span>
                <span className="text-white/70 text-xs">Figures</span>
              </div>
              
              <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                <FileText size={16} className="text-white/70" />
                <span className="text-white font-semibold text-sm">{eraDocuments.length}</span>
                <span className="text-white/70 text-xs">Documents</span>
              </div>
              
              <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                <BookOpen size={16} className="text-white/70" />
                <span className="text-white font-semibold text-sm">{eraSources.length}</span>
                <span className="text-white/70 text-xs">Sources</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-12 fill-current text-slate-50 dark:text-slate-900" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
          </svg>
        </div>
      </div>

      {/* Main Content */}
      <div className="container-max py-10">
        <div className="space-y-12">
          
          {/* SECTION 1: ERA OVERVIEW & CONTEXT */}
          <section className="space-y-8">
            <div>
              <h2 className="text-2xl font-serif text-navy-800 dark:text-navy-100 mb-3">
                Historical Overview
              </h2>
              <p className="text-sm text-navy-600 dark:text-navy-400">
                Understanding the context and significance of this historical period
              </p>
            </div>

            <div className="card p-6">
              <div className="prose prose-navy dark:prose-invert max-w-none">
                <p className="text-base text-navy-700 dark:text-navy-300 leading-relaxed">
                  {era.description}
                </p>
                
                {characteristics.extendedContext && (
                  <div className="mt-5 pt-5 border-t border-navy-200 dark:border-navy-700">
                    <p className="text-base text-navy-700 dark:text-navy-300 leading-relaxed">
                      {characteristics.extendedContext}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* SECTION 2: ERA CHARACTERISTICS */}
          {(keyThemes.length > 0 || majorCenters.length > 0 || challenges.length > 0 || achievements.length > 0) && (
            <section className="space-y-6">
              <div>
                <h2 className="text-2xl font-serif text-navy-800 dark:text-navy-100 mb-3">
                  Era Characteristics
                </h2>
                <p className="text-sm text-navy-600 dark:text-navy-400">
                  Key themes, locations, challenges, and achievements that defined this period
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Key Themes */}
                {keyThemes.length > 0 && (
                  <div className="card p-5">
                    <div className="flex items-center gap-2 mb-4">
                      <BookOpen className="w-5 h-5 text-burgundy-700 dark:text-burgundy-300" />
                      <h3 className="text-lg font-serif text-burgundy-700 dark:text-burgundy-300">
                        Key Themes
                      </h3>
                    </div>
                    <div className="space-y-3">
                      {keyThemes.map((theme, index) => (
                        <div key={index} className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-navy-800 rounded-lg">
                          <div className="w-1.5 h-1.5 bg-burgundy-700 dark:bg-burgundy-300 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-sm text-navy-700 dark:text-navy-300 leading-relaxed">{theme}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Major Centers */}
                {majorCenters.length > 0 && (
                  <div className="card p-5">
                    <div className="flex items-center gap-2 mb-4">
                      <MapPin className="w-5 h-5 text-burgundy-700 dark:text-burgundy-300" />
                      <h3 className="text-lg font-serif text-burgundy-700 dark:text-burgundy-300">
                        Major Centers
                      </h3>
                    </div>
                    <div className="space-y-3">
                      {majorCenters.map((center, index) => (
                        <div key={index} className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-navy-800 rounded-lg">
                          <MapPin className="w-4 h-4 text-gold-600 dark:text-gold-400 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-navy-700 dark:text-navy-300 leading-relaxed">{center}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Challenges */}
                {challenges.length > 0 && (
                  <div className="card p-5">
                    <div className="flex items-center gap-2 mb-4">
                      <AlertCircle className="w-5 h-5 text-burgundy-700 dark:text-burgundy-300" />
                      <h3 className="text-lg font-serif text-burgundy-700 dark:text-burgundy-300">
                        Major Challenges
                      </h3>
                    </div>
                    <div className="space-y-3">
                      {challenges.map((challenge, index) => (
                        <div key={index} className="flex items-start gap-3 p-3 bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-200 dark:border-red-900/30">
                          <div className="w-1.5 h-1.5 bg-red-600 dark:bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-sm text-navy-700 dark:text-navy-300 leading-relaxed">{challenge}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Achievements */}
                {achievements.length > 0 && (
                  <div className="card p-5">
                    <div className="flex items-center gap-2 mb-4">
                      <TrendingUp className="w-5 h-5 text-burgundy-700 dark:text-burgundy-300" />
                      <h3 className="text-lg font-serif text-burgundy-700 dark:text-burgundy-300">
                        Key Achievements
                      </h3>
                    </div>
                    <div className="space-y-3">
                      {achievements.map((achievement, index) => (
                        <div key={index} className="flex items-start gap-3 p-3 bg-emerald-50 dark:bg-emerald-950/20 rounded-lg border border-emerald-200 dark:border-emerald-900/30">
                          <div className="w-1.5 h-1.5 bg-emerald-600 dark:bg-emerald-400 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-sm text-navy-700 dark:text-navy-300 leading-relaxed">{achievement}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* SECTION 3: HISTORICAL SOURCES & DOCUMENTATION */}
          {(historiansInfo.length > 0 || eraSources.length > 0) && (
            <section className="space-y-6">
              <div>
                <h2 className="text-2xl font-serif text-navy-800 dark:text-navy-100 mb-3">
                  Historical Sources & Documentation
                </h2>
                <p className="text-sm text-navy-600 dark:text-navy-400">
                  How we know about this era through historical records and scholarly work
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Historical Documentation */}
                {historiansInfo.length > 0 && (
                  <div className="card p-5">
                    <div className="flex items-center gap-2 mb-4">
                      <ScrollText className="w-5 h-5 text-burgundy-700 dark:text-burgundy-300" />
                      <h3 className="text-lg font-serif text-burgundy-700 dark:text-burgundy-300">
                        Historical Records
                      </h3>
                    </div>
                    <div className="space-y-3">
                      {historiansInfo.map((historian, index) => (
                        <div key={index} className="flex items-start gap-3 p-3 bg-purple-50 dark:bg-purple-950/20 rounded-lg border border-purple-200 dark:border-purple-900/30">
                          <ScrollText className="w-4 h-4 text-purple-600 dark:text-purple-400 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-navy-700 dark:text-navy-300 leading-relaxed">{historian}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Historian Figures */}
                {eraHistorians.length > 0 && (
                  <div className="card p-5">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <Users className="w-5 h-5 text-burgundy-700 dark:text-burgundy-300" />
                        <h3 className="text-lg font-serif text-burgundy-700 dark:text-burgundy-300">
                          Notable Historians ({eraHistorians.length})
                        </h3>
                      </div>
                      <Link 
                        to="/figures" 
                        className="text-xs text-burgundy-700 dark:text-burgundy-300 hover:underline"
                      >
                        View all
                      </Link>
                    </div>
                    <div className="space-y-2">
                      {eraHistorians.slice(0, 5).map((historian) => (
                        <Link
                          key={historian.id}
                          to={`/figures/${historian.id}`}
                          className="flex items-center gap-3 p-2 hover:bg-slate-50 dark:hover:bg-navy-800 rounded-lg transition-colors"
                        >
                          <img 
                            src={historian.image} 
                            alt={historian.name}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium text-navy-800 dark:text-navy-100 truncate">
                              {historian.name}
                            </div>
                            <div className="text-xs text-navy-600 dark:text-navy-400">
                              {historian.birthYear && historian.deathYear 
                                ? `${historian.birthYear} - ${historian.deathYear}`
                                : historian.birthYear || 'Unknown dates'}
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* External Sources */}
              {eraSources.length > 0 && (
                <div>
                  <h3 className="text-lg font-serif text-navy-800 dark:text-navy-100 mb-4">
                    Primary Sources & External Resources
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {eraSources.slice(0, 6).map((source) => (
                      <div key={source.id} className="card p-4 hover:shadow-lg transition-shadow">
                        <h4 className="font-serif text-base text-burgundy-700 dark:text-burgundy-300 mb-2 line-clamp-2">
                          {source.title}
                        </h4>
                        <p className="text-xs text-navy-600 dark:text-navy-300 mb-3 line-clamp-2">
                          {source.summary}
                        </p>
                        <a 
                          href={source.externalUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-xs text-gold-600 hover:text-gold-700 dark:text-gold-400 font-medium inline-flex items-center gap-1"
                        >
                          View on {source.hostedOn} →
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </section>
          )}

          {/* SECTION 4: KEY EVENTS TIMELINE */}
          {eraEvents.length > 0 && (
            <section className="space-y-6">
              <div className="flex justify-between items-end">
                <div>
                  <h2 className="text-2xl font-serif text-navy-800 dark:text-navy-100 mb-3">
                    Key Events Timeline
                  </h2>
                  <p className="text-sm text-navy-600 dark:text-navy-400">
                    Major historical events that occurred during this era
                  </p>
                </div>
                <Link 
                  to="/timeline" 
                  className="text-sm text-burgundy-700 dark:text-burgundy-300 hover:underline flex items-center gap-1"
                >
                  View full timeline <ArrowLeft className="rotate-180" size={14} />
                </Link>
              </div>
              
              <div className="card p-5">
                <TimelineDisplay events={eraEvents.slice(0, 8)} />
                {eraEvents.length > 8 && (
                  <div className="mt-5 text-center pt-5 border-t border-navy-200 dark:border-navy-700">
                    <Link to="/timeline" className="btn-primary text-sm">
                      View All {eraEvents.length} Events
                    </Link>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* SECTION 5: NOTABLE FIGURES */}
          {eraFigures.length > 0 && (
            <section className="space-y-6">
              <div className="flex justify-between items-end">
                <div>
                  <h2 className="text-2xl font-serif text-navy-800 dark:text-navy-100 mb-3">
                    Notable Figures
                  </h2>
                  <p className="text-sm text-navy-600 dark:text-navy-400">
                    Influential people who shaped this historical period
                  </p>
                </div>
                <Link 
                  to="/figures" 
                  className="text-sm text-burgundy-700 dark:text-burgundy-300 hover:underline flex items-center gap-1"
                >
                  View all figures <ArrowLeft className="rotate-180" size={14} />
                </Link>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {eraFigures.slice(0, 8).map((figure, index) => (
                  <FigureCard key={figure.id} figure={figure} index={index} />
                ))}
              </div>
              
              {eraFigures.length > 8 && (
                <div className="text-center">
                  <Link to="/figures" className="btn-primary text-sm">
                    View All {eraFigures.length} Figures
                  </Link>
                </div>
              )}
            </section>
          )}

          {/* SECTION 6: IMPORTANT DOCUMENTS */}
          {eraDocuments.length > 0 && (
            <section className="space-y-6">
              <div className="flex justify-between items-end">
                <div>
                  <h2 className="text-2xl font-serif text-navy-800 dark:text-navy-100 mb-3">
                    Important Documents
                  </h2>
                  <p className="text-sm text-navy-600 dark:text-navy-400">
                    Significant writings and documents from this period
                  </p>
                </div>
                <Link 
                  to="/documents" 
                  className="text-sm text-burgundy-700 dark:text-burgundy-300 hover:underline flex items-center gap-1"
                >
                  View all documents <ArrowLeft className="rotate-180" size={14} />
                </Link>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {eraDocuments.slice(0, 6).map((document, index) => (
                  <DocumentCard key={document.id} document={document} index={index} />
                ))}
              </div>
              
              {eraDocuments.length > 6 && (
                <div className="text-center">
                  <Link to="/documents" className="btn-primary text-sm">
                    View All {eraDocuments.length} Documents
                  </Link>
                </div>
              )}
            </section>
          )}

        </div>
      </div>
    </div>
  );
};

export default EraDetailPage;