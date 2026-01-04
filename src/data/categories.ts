import { Archive, Library, BookMarked } from 'lucide-react';
import { Category } from '../types';

/* ------------------------------------------------------------------
   Category Theme Tokens
------------------------------------------------------------------- */

export type CategoryTheme = {
  gradient: string;
  bg: string;
  text: string;
  icon: string;
  subtleText: string;
};

export const CATEGORY_THEME: Record<string, CategoryTheme> = {
  books: {
    gradient:
      'from-forest-700 via-forest-800 to-forest-900 dark:from-forest-800 dark:via-forest-700 dark:to-forest-900',
    bg: 'bg-forest-900 dark:bg-forest-700',
    text: 'text-forest-900',
    icon: 'text-forest-800',
    subtleText: 'text-forest-700/80',
  },
  archives: {
    gradient:
      'from-gold-500 via-gold-400 to-gold-600 dark:from-gold-600 dark:via-gold-500 dark:to-gold-700',
    bg: 'bg-gold-600 dark:bg-gold-400',
    text: 'text-charcoal',
    icon: 'text-plum-800',
    subtleText: 'text-charcoal/80',
  },
  commentaries: {
    gradient:
      'from-plum-700 via-plum-800 to-plum-900 dark:from-plum-800 dark:via-plum-700 dark:to-plum-900',
    bg: 'bg-plum-900 dark:bg-plum-700',
    text: 'text-plum-900',
    icon: 'text-plum-800',
    subtleText: 'text-plum-700/80',
  },
};

/* ------------------------------------------------------------------
   Categories
------------------------------------------------------------------- */

export const categories: Category[] = [
  {
    id: 'books',
    title: 'External Book Repositories',
    description: 'Digital libraries and comprehensive book collections',
    icon: Library,
    stats: '1,200+ volumes',

    color: 'bg-forest-900 dark:bg-forest-700',
    textColor: 'text-forest-900 dark:text-forest-100',
    mutedTextColor: 'text-forest-700/80 dark:text-forest-200/80',
    iconColor: 'text-forest-800',
    accentColor: 'bg-forest-700 text-white',
  },
  {
    id: 'archives',
    title: 'Archive Links',
    description: 'CCEL, NewAdvent, Internet Archive, and specialized collections',
    icon: Archive,
    stats: '4 main archives',

    color: 'bg-gold-600 dark:bg-gold-400',
    textColor: 'text-charcoal',
    mutedTextColor: 'text-charcoal/80',
    iconColor: 'text-plum-800',
    accentColor: 'bg-gold-700 text-white',
  },
  {
    id: 'commentaries',
    title: 'Historians & Commentaries',
    description: 'Historical analysis and scholarly works on church history',
    icon: BookMarked,
    stats: '300+ authors',

    color: 'bg-plum-900 dark:bg-plum-700',
    textColor: 'text-plum-900 dark:text-plum-100',
    mutedTextColor: 'text-plum-700/80 dark:text-plum-200/80',
    iconColor: 'text-plum-800',
    accentColor: 'bg-plum-700 text-white',
  },
];


/* ------------------------------------------------------------------
   Helpers
------------------------------------------------------------------- */

export const getCategoryById = (id: string): Category | undefined =>
  categories.find(category => category.id === id);

export const getCategoryGradient = (categoryId: string): string =>
  CATEGORY_THEME[categoryId]?.gradient ??
  'from-gold-500 via-gold-400 to-gold-600 dark:from-gold-600 dark:via-gold-500 dark:to-gold-700';

export const getCategoryDisplayName = (categoryId: string): string => {
  const category = getCategoryById(categoryId);
  return category
    ? category.title.replace('External ', '').replace(' Links', '')
    : categoryId.replace('-', ' ');
};

export const getCategoryDescription = (categoryId: string): string => {
  const category = getCategoryById(categoryId);
  return category ? category.description : 'external resource';
};

export type { Category } from '../types';
