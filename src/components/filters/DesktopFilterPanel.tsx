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

interface DesktopFilterPanelProps {
  filters: FilterConfig[];
  activeFiltersCount: number;
  onResetFilters: () => void;
  resultsCount: number;
  accentColor?: 'burgundy' | 'navy' | 'blue' | 'purple';
}

const DesktopFilterPanel: React.FC<DesktopFilterPanelProps> = ({
  filters,
  activeFiltersCount,
  onResetFilters,
  resultsCount,
  accentColor = 'navy'
}) => {
  const getAccentClasses = () => {
    const colorMap = {
      burgundy: {
        icon: 'text-burgundy-600 dark:text-burgundy-400',
        focus: 'focus:ring-burgundy-500 dark:focus:ring-burgundy-400'
      },
      navy: {
        icon: 'text-navy-600 dark:text-navy-400',
        focus: 'focus:ring-navy-500 dark:focus:ring-navy-400'
      },
      blue: {
        icon: 'text-blue-600 dark:text-blue-400',
        focus: 'focus:ring-blue-500 dark:focus:ring-blue-400'
      },
      purple: {
        icon: 'text-purple-600 dark:text-purple-400',
        focus: 'focus:ring-purple-500 dark:focus:ring-purple-400'
      }
    };
    return colorMap[accentColor];
  };

  const accentClasses = getAccentClasses();
  const gridCols = filters.length === 3 ? 'lg:grid-cols-3' : filters.length === 2 ? 'lg:grid-cols-2' : 'lg:grid-cols-4';

  return (
    <div className="bg-white/50 dark:bg-navy-800/50 backdrop-blur-sm rounded-lg border border-gray-200 dark:border-navy-700 p-4">
      <div className="flex items-center justify-between gap-4 mb-4">
        <div className="flex items-center gap-2">
          <Filter className={`w-4 h-4 ${accentClasses.icon}`} />
          <h3 className="text-sm font-semibold text-navy-700 dark:text-navy-200">
            Filters
          </h3>
          {activeFiltersCount > 0 && (
            <span className="text-xs px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full font-medium">
              {activeFiltersCount} active
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {activeFiltersCount > 0 && (
            <button
              onClick={onResetFilters}
              className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-navy-600 dark:text-navy-300 hover:bg-gray-100 dark:hover:bg-navy-700 rounded-md transition-colors"
            >
              <X size={14} />
              Clear
            </button>
          )}
          <span className="text-xs text-navy-500 dark:text-navy-400">
            {resultsCount} {resultsCount === 1 ? 'result' : 'results'}
          </span>
        </div>
      </div>
      
      <div className={`grid grid-cols-1 ${gridCols} gap-4`}>
        {filters.map((filter) => {
          const Icon = filter.icon;
          return (
            <div key={filter.id} className="relative">
              <Icon className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${accentClasses.icon} pointer-events-none`} />
              {filter.type === 'search' ? (
                <input
                  type="text"
                  value={filter.value}
                  onChange={(e) => filter.onChange(e.target.value)}
                  placeholder={filter.placeholder || `Search ${filter.label.toLowerCase()}...`}
                  className={`w-full pl-10 pr-4 py-2.5 text-sm bg-white dark:bg-navy-800 border border-gray-200 dark:border-navy-600 rounded-lg text-navy-700 dark:text-navy-100 focus:outline-none focus:ring-2 ${accentClasses.focus} focus:border-transparent transition-all`}
                />
              ) : (
                <select
                  value={filter.value}
                  onChange={(e) => filter.onChange(e.target.value)}
                  className={`w-full appearance-none pl-10 pr-4 py-2.5 text-sm bg-white dark:bg-navy-800 border border-gray-200 dark:border-navy-600 rounded-lg text-navy-700 dark:text-navy-100 focus:outline-none focus:ring-2 ${accentClasses.focus} focus:border-transparent transition-all`}
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
      </div>
    </div>
  );
};

export default DesktopFilterPanel;