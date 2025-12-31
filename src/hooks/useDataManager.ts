import { useMemo } from 'react';
import { Era, Figure, Document, Event, FederatedSource } from '../types';
import { 
  eras, 
  getEraById, 
  getEraByYear, 
  getEraColors,
  getEraTimelineColor,
  getEnhancedEra,
  getEnhancedEras,
  validateEraCharacteristics
} from '../data/eras';
import { 
  figures, 
  getFigureById, 
  getFiguresByBirthDay, 
  getFiguresByDeathDay,
  getFiguresByEra,
  getCrusadeFigures,
  getHistorianFigures
} from '../data/figures';
import { 
  documents, 
  getDocumentById, 
  getDocumentsByEra 
} from '../data/documents';
import { 
  events, 
  getEventById, 
  getEventsByDay, 
  getEventsByEra,
  getCrusadeEvents,
  getEventsByTag
} from '../data/events';
import { 
  federatedSources, 
  getSourceById, 
  getSourcesByCategory, 
  getSourcesByTag,
  getSourcesByCentury,
  getAllTags
} from '../data/federatedSources';

// Define the search results interface
interface SearchResults {
  eras: Era[];
  figures: Figure[];
  documents: Document[];
  events: Event[];
  sources: FederatedSource[];
  total: number;
}

// Define the timeline data interface
interface TimelineData {
  events: Event[];
  figures: Figure[];
  documents: Document[];
  years: number[];
}

// Define the DataManager interface
export interface UseDataManagerReturn {
  // Basic data access
  eras: Era[];
  figures: Figure[];
  documents: Document[];
  events: Event[];
  federatedSources: FederatedSource[];
  
  // Era utilities
  getEraById: (id: string) => Era | undefined;
  getEraByYear: (year: number) => Era | undefined;
  getEraColors: (eraId: string) => { primary: string; secondary: string; accent: string };
  getEraTimelineColor: (index: number) => string;
  getEnhancedEra: (eraId: string) => any | undefined;
  getEnhancedEras: () => any[];
  
  // Figure utilities
  getFigureById: (id: string) => Figure | undefined;
  getFiguresByBirthDay: (month: number, day: number) => Figure[];
  getFiguresByDeathDay: (month: number, day: number) => Figure[];
  getFiguresByEra: (eraId: string) => Figure[];
  getCrusadeFigures: () => Figure[];
  getHistorianFigures: () => Figure[];
  
  // Document utilities
  getDocumentById: (id: string) => Document | undefined;
  getDocumentsByEra: (eraId: string) => Document[];
  
  // Event utilities
  getEventById: (id: string) => Event | undefined;
  getEventsByDay: (month: number, day: number) => Event[];
  getEventsByEra: (eraId: string) => Event[];
  getCrusadeEvents: () => Event[];
  getEventsByTag: (tag: string) => Event[];
  
  // Source utilities
  getSourceById: (id: string) => FederatedSource | undefined;
  getSourcesByCategory: (category: string) => FederatedSource[];
  getSourcesByTag: (tag: string) => FederatedSource[];
  getSourcesByCentury: (century: number) => FederatedSource[];
  getAllTags: () => string[];
  
  // Relationship methods
  getRelatedEntities: (entityType: 'figure' | 'document' | 'event' | 'era', entityId: string) => {
    eras?: Era[];
    figures?: Figure[];
    documents?: Document[];
    events?: Event[];
    sources?: FederatedSource[];
  };
  
  // Timeline utilities
  getTimelineData: (startYear?: number, endYear?: number) => TimelineData;
  
  // Search functionality
  search: (query: string) => SearchResults;
  
  // Statistics
  getStatistics: () => {
    totalEras: number;
    totalFigures: number;
    totalDocuments: number;
    totalEvents: number;
    totalSources: number;
  };
  
  // Validation
  validateData: () => void;
}

export const useDataManager = (): UseDataManagerReturn => {
  // Memoize the relationship cache for better performance
  const relationshipCache = useMemo(() => {
    const cache = new Map<string, any>();
    
    // Pre-build era relationships
    const eraRelationships = new Map<string, any>();
    eras.forEach(era => {
      const eraFigures = getFiguresByEra(era.id);
      const eraDocuments = getDocumentsByEra(era.id);
      const eraEvents = getEventsByEra(era.id);
      
      eraRelationships.set(era.id, {
        figures: eraFigures,
        documents: eraDocuments,
        events: eraEvents
      });
      
      // Cache figure relationships
      eraFigures.forEach(figure => {
        const key = `figure-${figure.id}`;
        if (!cache.has(key)) {
          cache.set(key, {
            events: figure.events.map(id => getEventById(id)).filter(Boolean),
            documents: figure.documents.map(id => getDocumentById(id)).filter(Boolean),
            quotes: figure.quotes || []
          });
        }
      });
      
      // Cache document relationships
      eraDocuments.forEach(doc => {
        const key = `document-${doc.id}`;
        if (!cache.has(key)) {
          const era = getEraById(doc.era.id);
          cache.set(key, {
            era: era,
            people: doc.people.map(id => getFigureById(id)).filter(Boolean),
            events: doc.events.map(id => getEventById(id)).filter(Boolean)
          });
        }
      });
      
      // Cache event relationships
      eraEvents.forEach(event => {
        const key = `event-${event.id}`;
        if (!cache.has(key)) {
          const era = getEraById(event.era.id);
          cache.set(key, {
            era: era,
            relatedPeople: event.relatedPeople.map(id => getFigureById(id)).filter(Boolean),
            relatedDocuments: event.relatedDocuments.map(id => getDocumentById(id)).filter(Boolean)
          });
        }
      });
    });
    
    cache.set('era-relationships', eraRelationships);
    return cache;
  }, []);

  const getRelatedEntities = (entityType: 'figure' | 'document' | 'event' | 'era', entityId: string) => {
    const result: any = {};
    
    switch (entityType) {
      case 'era': {
        const era = getEraById(entityId);
        if (era) {
          result.figures = getFiguresByEra(entityId);
          result.documents = getDocumentsByEra(entityId);
          result.events = getEventsByEra(entityId);
          
          // Get sources related to this era
          const eraSources = federatedSources.filter(source => 
            source.relatedEras.includes(entityId)
          );
          result.sources = eraSources;
        }
        break;
      }
      
      case 'figure': {
        const figure = getFigureById(entityId);
        if (figure) {
          result.events = figure.events.map(id => getEventById(id)).filter(Boolean);
          result.documents = figure.documents.map(id => getDocumentById(id)).filter(Boolean);
          
          // Get eras this figure belongs to based on lifespan
          const figureEras = eras.filter(era => {
            const birthYear = figure.birthYear || 0;
            const deathYear = figure.deathYear || 2025;
            return birthYear <= era.endYear && deathYear >= era.startYear;
          });
          result.eras = figureEras;
        }
        break;
      }
      
      case 'document': {
        const document = getDocumentById(entityId);
        if (document) {
          result.era = getEraById(document.era.id);
          result.people = document.people.map(id => getFigureById(id)).filter(Boolean);
          result.events = document.events.map(id => getEventById(id)).filter(Boolean);
        }
        break;
      }
      
      case 'event': {
        const event = getEventById(entityId);
        if (event) {
          result.era = getEraById(event.era.id);
          result.relatedPeople = event.relatedPeople.map(id => getFigureById(id)).filter(Boolean);
          result.relatedDocuments = event.relatedDocuments.map(id => getDocumentById(id)).filter(Boolean);
        }
        break;
      }
    }
    
    return result;
  };

  const getTimelineData = (startYear?: number, endYear?: number): TimelineData => {
    const defaultStartYear = eras[0]?.startYear || 1;
    const defaultEndYear = eras[eras.length - 1]?.endYear || 2025;
    
    const start = startYear || defaultStartYear;
    const end = endYear || defaultEndYear;
    
    const timelineEvents = events
      .filter(event => event.year >= start && event.year <= end)
      .sort((a, b) => a.year - b.year);
    
    const timelineFigures = figures
      .filter(figure => {
        const birthYear = figure.birthYear || 0;
        const deathYear = figure.deathYear || 2025;
        return (
          (birthYear >= start && birthYear <= end) ||
          (deathYear >= start && deathYear <= end) ||
          (birthYear <= start && deathYear >= end)
        );
      })
      .sort((a, b) => (a.birthYear || 0) - (b.birthYear || 0));
    
    const timelineDocuments = documents
      .filter(doc => doc.year >= start && doc.year <= end)
      .sort((a, b) => a.year - b.year);
    
    return {
      events: timelineEvents,
      figures: timelineFigures,
      documents: timelineDocuments,
      years: Array.from(
        new Set([
          ...timelineEvents.map(e => e.year),
          ...timelineFigures.flatMap(f => [f.birthYear, f.deathYear].filter(Boolean) as number[]),
          ...timelineDocuments.map(d => d.year)
        ])
      ).sort((a, b) => a - b)
    };
  };

  const search = (query: string): SearchResults => {
    const searchTerm = query.toLowerCase().trim();
    if (!searchTerm) {
      return {
        eras: [],
        figures: [],
        documents: [],
        events: [],
        sources: [],
        total: 0
      };
    }
    
    const searchResults = {
      eras: eras.filter(era => 
        era.name.toLowerCase().includes(searchTerm) ||
        era.description.toLowerCase().includes(searchTerm) ||
        era.characteristics?.keyThemes?.some(theme => theme.toLowerCase().includes(searchTerm))
      ),
      figures: figures.filter(figure =>
        figure.name.toLowerCase().includes(searchTerm) ||
        figure.description.toLowerCase().includes(searchTerm) ||
        figure.roles.some(role => role.toLowerCase().includes(searchTerm))
      ),
      documents: documents.filter(doc =>
        doc.title.toLowerCase().includes(searchTerm) ||
        doc.author.toLowerCase().includes(searchTerm) ||
        doc.context.toLowerCase().includes(searchTerm)
      ),
      events: events.filter(event =>
        event.title.toLowerCase().includes(searchTerm) ||
        event.description.toLowerCase().includes(searchTerm) ||
        event.tags.some(tag => tag.toLowerCase().includes(searchTerm))
      ),
      sources: federatedSources.filter(source =>
        source.title.toLowerCase().includes(searchTerm) ||
        source.summary.toLowerCase().includes(searchTerm) ||
        source.tags.some(tag => tag.toLowerCase().includes(searchTerm))
      )
    };
    
    const total = Object.values(searchResults).reduce((sum, arr) => sum + arr.length, 0);
    
    return { ...searchResults, total };
  };

  const getStatistics = () => ({
    totalEras: eras.length,
    totalFigures: figures.length,
    totalDocuments: documents.length,
    totalEvents: events.length,
    totalSources: federatedSources.length
  });

  const validateData = () => {
    console.log('Validating data relationships...');
    
    // Validate era characteristics
    eras.forEach(era => {
      const errors = validateEraCharacteristics(era.id);
      if (errors.length > 0) {
        console.warn(`Era ${era.id} validation errors:`, errors);
      }
    });
    
    // Validate cross-references
    const crossRefErrors: string[] = [];
    
    figures.forEach(figure => {
      figure.events.forEach(eventId => {
        if (!getEventById(eventId)) {
          crossRefErrors.push(`Figure "${figure.name}" references non-existent event: ${eventId}`);
        }
      });
      
      figure.documents.forEach(docId => {
        if (!getDocumentById(docId)) {
          crossRefErrors.push(`Figure "${figure.name}" references non-existent document: ${docId}`);
        }
      });
    });
    
    if (crossRefErrors.length > 0) {
      console.warn('Cross-reference validation errors:', crossRefErrors);
    }
    
    console.log('Data validation complete');
  };

  return {
    // Basic data
    eras,
    figures,
    documents,
    events,
    federatedSources,
    
    // Era utilities
    getEraById,
    getEraByYear,
    getEraColors,
    getEraTimelineColor,
    getEnhancedEra,
    getEnhancedEras,
    
    // Figure utilities
    getFigureById,
    getFiguresByBirthDay,
    getFiguresByDeathDay,
    getFiguresByEra,
    getCrusadeFigures,
    getHistorianFigures,
    
    // Document utilities
    getDocumentById,
    getDocumentsByEra,
    
    // Event utilities
    getEventById,
    getEventsByDay,
    getEventsByEra,
    getCrusadeEvents,
    getEventsByTag,
    
    // Source utilities
    getSourceById,
    getSourcesByCategory,
    getSourcesByTag,
    getSourcesByCentury,
    getAllTags,
    
    // Relationship methods
    getRelatedEntities,
    
    // Timeline utilities
    getTimelineData,
    
    // Search functionality
    search,
    
    // Statistics
    getStatistics,
    
    // Validation
    validateData
  };
};