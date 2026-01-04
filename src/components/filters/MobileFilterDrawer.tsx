import React from 'react';
import { Filter, X } from 'lucide-react';
import { LucideIcon } from 'lucide-react';

interface FilterOption {
  value: string;
  label: string;
}

interface FilterConfig {
  id: string;
  label: string;
  icon: LucideIcon;
  value: string;
  onChange: (value: string) => void;
  options: FilterOption[];
  placeholder?: string;
  type?: 'select' | 'search';
}

interface ActiveFilterTag {
  label: string;
  onRemove: () => void;
}

interface MobileFilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterConfig[];
  activeFiltersCount: number;
  onResetFilters: () => void;
  resultsCount: number;
  accentGradient?: string;
  activeFilterTags?: ActiveFilterTag[];
}

const MobileFilterDrawer: React.FC<MobileFilterDrawerProps> = ({
  isOpen,
  onClose,
  filters,
  activeFiltersCount,
  onResetFilters,
  resultsCount,
  accentGradient = 'from-navy-700 to-navy-800',
  activeFilterTags = []
}) => {
  if (!isOpen) return null;

  return (
    <div className="md:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div className="absolute inset-y-0 left-0 w-full max-w-md bg-white dark:bg-navy-900 overflow-y-auto shadow-2xl" onClick={(e) => e.stopPropagation()}>
        {/* Drawer Header */}
        <div className={`top-0 z-10 bg-gradient-to-r ${accentGradient} px-4 py-4 shadow-lg`}>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <Filter className="w-5 h-5 text-white" />
              </div>
              <h2 className="font-bold text-white text-lg">Filters</h2>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-lg transition-colors">
              <X className="w-5 h-5 text-white" />
            </button>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-white/80">
              {resultsCount} {resultsCount === 1 ? 'result' : 'results'}
            </span>
            {activeFiltersCount > 0 && (
              <button
                onClick={onResetFilters}
                className="text-xs text-white font-semibold flex items-center gap-1 px-2 py-1 bg-white/20 hover:bg-white/30 rounded-md transition-colors"
              >
                <X size={12} />
                Clear All
              </button>
            )}
          </div>
        </div>
        
        <div className="p-4 space-y-4">
          {/* Active Filters Tags */}
          {activeFiltersCount > 0 && activeFilterTags.length > 0 && (
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/20 border-2 border-blue-200 dark:border-blue-700 rounded-xl p-3">
              <div className="text-xs font-bold text-blue-900 dark:text-blue-100 uppercase tracking-wide mb-2">
                Active Filters
              </div>
              <div className="flex flex-wrap gap-1.5">
                {activeFilterTags.map((tag, index) => (
                  <span key={index} className="inline-flex items-center gap-1 px-2.5 py-1 bg-white dark:bg-navy-800 border border-blue-400 dark:border-blue-600 rounded-full text-xs font-medium text-blue-900 dark:text-blue-100">
                    {tag.label}
                    <button onClick={tag.onRemove}>
                      <X size={12} />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {/* Filter Controls */}
          {filters.map((filter) => {
            const Icon = filter.icon;
            return (
              <div key={filter.id} className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-bold text-navy-800 dark:text-navy-100">
                  <Icon className="w-4 h-4" />
                  {filter.label}
                </label>
                {filter.type === 'search' ? (
                  <input
                    type="text"
                    value={filter.value}
                    onChange={(e) => filter.onChange(e.target.value)}
                    placeholder={filter.placeholder || `Search ${filter.label.toLowerCase()}...`}
                    className="w-full p-3 text-sm font-medium rounded-xl border-2 border-gray-300 bg-white dark:bg-navy-800 dark:border-navy-600 dark:text-navy-100 focus:border-blue-500 focus:outline-none"
                  />
                ) : (
                  <select
                    value={filter.value}
                    onChange={(e) => filter.onChange(e.target.value)}
                    className="w-full p-3 text-sm font-medium rounded-xl border-2 border-gray-300 bg-white dark:bg-navy-800 dark:border-navy-600 dark:text-navy-100 focus:border-blue-500 focus:outline-none"
                  >
                    {filter.options.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            );
          })}
          
          {/* Apply Button */}
          <button
            onClick={onClose}
            className={`w-full bg-gradient-to-r ${accentGradient} hover:opacity-90 text-white font-bold py-3.5 rounded-xl shadow-lg hover:shadow-xl transition-all`}
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default MobileFilterDrawer;