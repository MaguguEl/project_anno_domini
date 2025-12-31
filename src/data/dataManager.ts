// src/data/dataManager.ts
import { Era, Figure, Document, Event, FederatedSource } from '../types';
import { eras, getEraById } from './eras';
import { figures, getFigureById } from './figures';
import { documents, getDocumentById } from './documents';
import { events, getEventById } from './events';
import { federatedSources, getSourceById } from './federatedSources';

// Central interface for all data relationships
export interface DataRelationships {
  eras: Era[];
  figures: Figure[];
  documents: Document[];
  events: Event[];
  federatedSources: FederatedSource[];
  
  // Relationship lookups
  getRelatedEntities: (entityType: keyof DataRelationships, entityId: string) => {
    eras?: Era[];
    figures?: Figure[];
    documents?: Document[];
    events?: Event[];
    sources?: FederatedSource[];
  };
  
  // Cross-references
  getFiguresByEra: (eraId: string) => Figure[];
  getDocumentsByEra: (eraId: string) => Document[];
  getEventsByEra: (eraId: string) => Event[];
  getSourcesByEra: (eraId: string) => FederatedSource[];
  
  getErasByFigure: (figureId: string) => Era[];
  getErasByDocument: (documentId: string) => Era[];
  getErasByEvent: (eventId: string) => Era[];
  
  // Timeline utilities
  getEntitiesByYear: (year: number) => {
    events: Event[];
    figures: Figure[];
    documents: Document[];
  };
}

class DataManager implements DataRelationships {
  eras = eras;
  figures = figures;
  documents = documents;
  events = events;
  federatedSources = federatedSources;

  // Create an index for faster lookups
  private indexes = {
    figureIndex: new Map<string, Figure>(),
    documentIndex: new Map<string, Document>(),
    eventIndex: new Map<string, Event>(),
    sourceIndex: new Map<string, FederatedSource>(),
    
    // Relationship indexes
    eraToFigures: new Map<string, Set<string>>(),
    eraToDocuments: new Map<string, Set<string>>(),
    eraToEvents: new Map<string, Set<string>>(),
    
    figureToEras: new Map<string, Set<string>>(),
    documentToEras: new Map<string, Set<string>>(),
    eventToEras: new Map<string, Set<string>>(),
  };

  constructor() {
    this.buildIndexes();
    this.validateAndFixRelationships();
  }

  private buildIndexes(): void {
    // Build basic indexes
    this.figures.forEach(figure => {
      this.indexes.figureIndex.set(figure.id, figure);
    });
    
    this.documents.forEach(doc => {
      this.indexes.documentIndex.set(doc.id, doc);
    });
    
    this.events.forEach(event => {
      this.indexes.eventIndex.set(event.id, event);
    });
    
    this.federatedSources.forEach(source => {
      this.indexes.sourceIndex.set(source.id, source);
    });

    // Build era relationship indexes
    this.buildEraRelationships();
  }

  private buildEraRelationships(): void {
    // Reset all era relationship indexes
    this.indexes.eraToFigures = new Map();
    this.indexes.eraToDocuments = new Map();
    this.indexes.eraToEvents = new Map();
    this.indexes.figureToEras = new Map();
    this.indexes.documentToEras = new Map();
    this.indexes.eventToEras = new Map();

    // Initialize era sets
    this.eras.forEach(era => {
      this.indexes.eraToFigures.set(era.id, new Set());
      this.indexes.eraToDocuments.set(era.id, new Set());
      this.indexes.eraToEvents.set(era.id, new Set());
    });

    // Build figure-era relationships
    this.figures.forEach(figure => {
      const figureEras = new Set<string>();
      
      // Add eras from figure's birth/death years
      if (figure.birthYear || figure.deathYear) {
        const birthYear = figure.birthYear || 0;
        const deathYear = figure.deathYear || 2025;
        
        this.eras.forEach(era => {
          if (birthYear <= era.endYear && deathYear >= era.startYear) {
            figureEras.add(era.id);
            this.indexes.eraToFigures.get(era.id)?.add(figure.id);
          }
        });
      }
      
      this.indexes.figureToEras.set(figure.id, figureEras);
    });

    // Build document-era relationships
    this.documents.forEach(document => {
      const eraId = document.era.id;
      this.indexes.documentToEras.set(document.id, new Set([eraId]));
      this.indexes.eraToDocuments.get(eraId)?.add(document.id);
    });

    // Build event-era relationships
    this.events.forEach(event => {
      const eraId = event.era.id;
      this.indexes.eventToEras.set(event.id, new Set([eraId]));
      this.indexes.eraToEvents.get(eraId)?.add(event.id);
    });
  }

  private validateAndFixRelationships(): void {
    const errors: string[] = [];
    
    // Validate document-era references
    this.documents.forEach(doc => {
      const era = getEraById(doc.era.id);
      if (!era) {
        errors.push(`Document "${doc.title}" references non-existent era "${doc.era.id}"`);
      }
      
      // Validate related people exist
      doc.people.forEach(personId => {
        if (!this.indexes.figureIndex.has(personId)) {
          errors.push(`Document "${doc.title}" references non-existent figure "${personId}"`);
        }
      });
      
      // Validate related events exist
      doc.events.forEach(eventId => {
        if (!this.indexes.eventIndex.has(eventId)) {
          errors.push(`Document "${doc.title}" references non-existent event "${eventId}"`);
        }
      });
    });

    // Validate event-era references
    this.events.forEach(event => {
      const era = getEraById(event.era.id);
      if (!era) {
        errors.push(`Event "${event.title}" references non-existent era "${event.era.id}"`);
      }
      
      // Validate related people exist
      event.relatedPeople.forEach(personId => {
        if (!this.indexes.figureIndex.has(personId)) {
          errors.push(`Event "${event.title}" references non-existent figure "${personId}"`);
        }
      });
      
      // Validate related documents exist
      event.relatedDocuments.forEach(docId => {
        if (!this.indexes.documentIndex.has(docId)) {
          errors.push(`Event "${event.title}" references non-existent document "${docId}"`);
        }
      });
    });

    // Validate figure references
    this.figures.forEach(figure => {
      // Validate events exist
      figure.events.forEach(eventId => {
        if (!this.indexes.eventIndex.has(eventId)) {
          errors.push(`Figure "${figure.name}" references non-existent event "${eventId}"`);
        }
      });
      
      // Validate documents exist
      figure.documents.forEach(docId => {
        if (!this.indexes.documentIndex.has(docId)) {
          errors.push(`Figure "${figure.name}" references non-existent document "${docId}"`);
        }
      });
    });

    if (errors.length > 0) {
      console.warn('Data validation errors:', errors);
      // In production, you might want to throw or fix these automatically
    }
  }

  // Public methods
  getRelatedEntities(entityType: keyof DataRelationships, entityId: string) {
    const result: any = {};
    
    switch (entityType) {
      case 'eras':
        const era = getEraById(entityId);
        if (era) {
          result.figures = this.getFiguresByEra(entityId);
          result.documents = this.getDocumentsByEra(entityId);
          result.events = this.getEventsByEra(entityId);
        }
        break;
        
      case 'figures':
        const figure = getFigureById(entityId);
        if (figure) {
          result.events = figure.events.map(id => this.indexes.eventIndex.get(id)).filter(Boolean);
          result.documents = figure.documents.map(id => this.indexes.documentIndex.get(id)).filter(Boolean);
          result.eras = this.getErasByFigure(entityId);
        }
        break;
        
      case 'documents':
        const document = getDocumentById(entityId);
        if (document) {
          result.era = getEraById(document.era.id);
          result.people = document.people.map(id => this.indexes.figureIndex.get(id)).filter(Boolean);
          result.events = document.events.map(id => this.indexes.eventIndex.get(id)).filter(Boolean);
        }
        break;
        
      case 'events':
        const event = getEventById(entityId);
        if (event) {
          result.era = getEraById(event.era.id);
          result.relatedPeople = event.relatedPeople.map(id => this.indexes.figureIndex.get(id)).filter(Boolean);
          result.relatedDocuments = event.relatedDocuments.map(id => this.indexes.documentIndex.get(id)).filter(Boolean);
        }
        break;
    }
    
    return result;
  }

  getFiguresByEra(eraId: string): Figure[] {
    const figureIds = Array.from(this.indexes.eraToFigures.get(eraId) || []);
    return figureIds.map(id => this.indexes.figureIndex.get(id)).filter(Boolean) as Figure[];
  }

  getDocumentsByEra(eraId: string): Document[] {
    const docIds = Array.from(this.indexes.eraToDocuments.get(eraId) || []);
    return docIds.map(id => this.indexes.documentIndex.get(id)).filter(Boolean) as Document[];
  }

  getEventsByEra(eraId: string): Event[] {
    const eventIds = Array.from(this.indexes.eraToEvents.get(eraId) || []);
    return eventIds.map(id => this.indexes.eventIndex.get(id)).filter(Boolean) as Event[];
  }

  getSourcesByEra(eraId: string): FederatedSource[] {
    return this.federatedSources.filter(source => 
      source.relatedEras.includes(eraId)
    );
  }

  getErasByFigure(figureId: string): Era[] {
    const eraIds = Array.from(this.indexes.figureToEras.get(figureId) || []);
    return eraIds.map(id => getEraById(id)).filter(Boolean) as Era[];
  }

  getErasByDocument(documentId: string): Era[] {
    const eraIds = Array.from(this.indexes.documentToEras.get(documentId) || []);
    return eraIds.map(id => getEraById(id)).filter(Boolean) as Era[];
  }

  getErasByEvent(eventId: string): Era[] {
    const eraIds = Array.from(this.indexes.eventToEras.get(eventId) || []);
    return eraIds.map(id => getEraById(id)).filter(Boolean) as Era[];
  }

  getEntitiesByYear(year: number) {
    return {
      events: this.events.filter(event => event.year === year),
      figures: this.figures.filter(figure => 
        (figure.birthYear === year) || (figure.deathYear === year)
      ),
      documents: this.documents.filter(doc => doc.year === year)
    };
  }

  // Utility methods
  searchEntities(searchTerm: string) {
    const term = searchTerm.toLowerCase();
    
    return {
      eras: this.eras.filter(era => 
        era.name.toLowerCase().includes(term) || 
        era.description.toLowerCase().includes(term)
      ),
      figures: this.figures.filter(figure =>
        figure.name.toLowerCase().includes(term) ||
        figure.description.toLowerCase().includes(term) ||
        figure.roles.some(role => role.toLowerCase().includes(term))
      ),
      documents: this.documents.filter(doc =>
        doc.title.toLowerCase().includes(term) ||
        doc.author.toLowerCase().includes(term) ||
        doc.context.toLowerCase().includes(term)
      ),
      events: this.events.filter(event =>
        event.title.toLowerCase().includes(term) ||
        event.description.toLowerCase().includes(term)
      ),
      sources: this.federatedSources.filter(source =>
        source.title.toLowerCase().includes(term) ||
        source.summary.toLowerCase().includes(term)
      )
    };
  }

  getTimelineData(startYear: number, endYear: number) {
    const timelineEvents = this.events
      .filter(event => event.year >= startYear && event.year <= endYear)
      .sort((a, b) => a.year - b.year);
    
    const timelineFigures = this.figures
      .filter(figure => 
        (figure.birthYear && figure.birthYear >= startYear && figure.birthYear <= endYear) ||
        (figure.deathYear && figure.deathYear >= startYear && figure.deathYear <= endYear)
      )
      .sort((a, b) => (a.birthYear || 0) - (b.birthYear || 0));
    
    const timelineDocuments = this.documents
      .filter(doc => doc.year >= startYear && doc.year <= endYear)
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
  }
}

// Export singleton instance
export const dataManager = new DataManager();

// Export types for convenience
export type { Era, Figure, Document, Event, FederatedSource };