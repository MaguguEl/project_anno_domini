
export interface Event {
  id: string;
  title: string;
  date: Date | string;
  day: number;
  month: number;
  year: number;
  description: string;
  era: Era;
  relatedPeople: string[];
  relatedDocuments: string[];
  locations: string[];
  tags: string[];
}

export interface Figure {
  id: string;
  name: string;
  image: string;
  birthDate?: Date | string;
  birthYear?: number;
  birthMonth?: number;
  birthDay?: number;
  deathDate?: Date | string;
  deathYear?: number;
  deathMonth?: number;
  deathDay?: number;
  description: string;
  roles: string[];
  influence: string;
  events: string[];
  documents: string[];
  quotes: Quote[];
}

export interface Document {
  id: string;
  title: string;
  author: string;
  date: Date | string;
  year: number;
  context: string;
  content: string;
  events: string[];
  people: string[];
  era: Era;
}

export interface EraCharacteristics {
  keyThemes: string[];
  majorCenters: string[];
  challenges: string[];
  achievements: string[];
  historians: string[];
  extendedContext?: string;
  colorPrimary?: string;
  colorSecondary?: string;
  colorAccent?: string;
  imageBanner?: string;
  imageThumbnail?: string;
}

export interface EnhancedEra extends Era {
  characteristics?: EraCharacteristics;
  colors?: {
    primary: string;
    secondary: string;
    accent: string;
  };
  images?: {
    banner: string;
    thumbnail: string;
  };
  timelinePosition?: {
    startPercent: number;
    endPercent: number;
    widthPercent: number;
  };
}

export interface Era {
  id: string;
  name: string;
  startYear: number;
  endYear: number;
  volume: number;
  description: string;
  events: string[];
  figures: string[];
  documents: string[];
  characteristics?: EraCharacteristics; 
}

export interface Quote {
  id: string;
  text: string;
  source: string;
  figureId: string;
  date?: Date;
  context?: string;
}

export type ThemeMode = 'light' | 'dark';

export interface FederatedSource {
  id: string;
  title: string;
  author?: string;
  date?: string;
  century?: number;
  type: 'text' | 'letter' | 'decree' | 'sermon' | 'book';
  category: 'primary' | 'fathers' | 'books' | 'archives' | 'commentaries';
  summary: string;
  externalUrl: string;
  hostedOn: string;
  downloadFormats?: ('pdf' | 'epub' | 'txt')[];
  relatedPeople: string[];
  relatedEras: string[];
  relatedEvents: string[];
  tags: string[];
}

export interface SourceBookmark {
  id: string;
  sourceId: string;
  userId: string;
  notes: string;
  dateAdded: Date;
}

// New type for language support
export type LanguageCode = 'en' | 'es' | 'fr' | 'de' | 'it' | 'zh' | 'ko' | 'ja';

// Type for era validation results
export interface EraValidationResult {
  eraId: string;
  errors: string[];
  warnings: string[];
}

// Type for timeline display options
export interface TimelineDisplayOptions {
  showCenturyMarkers: boolean;
  showEraBoundaries: boolean;
  showMajorEvents: boolean;
  colorScheme: 'era-based' | 'volume-based' | 'chronological';
  density: 'sparse' | 'normal' | 'dense';
}

export interface RelatedEntities {
  eras?: Era[];
  figures?: Figure[];
  documents?: Document[];
  events?: Event[];
  sources?: FederatedSource[];
}

export type EntityType = 'era' | 'figure' | 'document' | 'event' | 'source';