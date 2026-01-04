import { useState } from 'react';

interface UseFiltersConfig {
  initialFilters: Record<string, string>;
}

interface UseFiltersReturn {
  filters: Record<string, string>;
  updateFilter: (key: string, value: string) => void;
  resetFilters: () => void;
  getActiveFiltersCount: () => number;
  mobileFiltersOpen: boolean;
  toggleMobileFilters: () => void;
  setMobileFiltersOpen: (open: boolean) => void;
}

export const useFilters = ({ initialFilters }: UseFiltersConfig): UseFiltersReturn => {
  const [filters, setFilters] = useState(initialFilters);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const updateFilter = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setFilters(initialFilters);
  };

  const getActiveFiltersCount = () => {
    return Object.values(filters).filter(value => 
      value !== 'all' && value !== ''
    ).length;
  };

  const toggleMobileFilters = () => {
    setMobileFiltersOpen(prev => !prev);
  };

  return {
    filters,
    updateFilter,
    resetFilters,
    getActiveFiltersCount,
    mobileFiltersOpen,
    toggleMobileFilters,
    setMobileFiltersOpen
  };
};

export default useFilters;