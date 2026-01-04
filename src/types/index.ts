import { LucideIcon } from "lucide-react";

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
  era: string; 
  location: string; 
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
  externalUrl?: string;           
  hostedOn?: string;           
  downloadFormats?: ('pdf' | 'epub' | 'txt')[]; 
    type?: 'creed' | 'confession' | 'treatise' | 'sermon' | 'letter' | 'book' | 'thesis' | 'declaration' | 'covenant' | 'manual'; 
  category?: 'primary' | 'secondary' | 'historical' | 'theological'; 
  tags?: string[];                
  summary?: string;     
  significance?: string;                     
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

export interface FederatedSource {
  id: string;
  title: string;
  author?: string;
  date?: string;
  century: number;
  type: 'text' | 'letter' | 'decree' | 'sermon' | 'book';
  category: 'books' | 'archives' | 'commentaries';  
  summary: string;
  externalUrl: string;
  hostedOn: string;
  downloadFormats?: ('pdf' | 'epub' | 'txt')[];
  relatedPeople: string[];
  relatedEras: string[];
  relatedEvents: string[];
  tags: string[];
  repository?: string;
  contributor?: string;
  reliability?: string;
}


export interface Category {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;

  /** Header & filter color system (matches gradient) */
  textColor: string;        // main heading text
  mutedTextColor: string;   // descriptions / helper text
  iconColor: string;        // icons
  accentColor: string;      // pills, counters, highlights

  stats: string;
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

export interface FeedItem {
  id: string;
  type: 'event' | 'quote' | 'source' | 'document';
  author?: string;
  handle?: string;
  content: string;
  source?: string;
  sourceUrl?: string;
  detailUrl?: string;
  timestamp: Date;
  likes: number;
  shares: number;
  comments: number;
  isExpanded?: boolean;
  metadata?: any;
}