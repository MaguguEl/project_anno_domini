import React from 'react';
import { Filter } from 'lucide-react';

interface MobileFilterToggleProps {
  activeFiltersCount: number;
  resultsCount: number;
  onToggle: () => void;
  accentGradient?: string;
}

const MobileFilterToggle: React.FC<MobileFilterToggleProps> = ({
  activeFiltersCount,
  resultsCount,
  onToggle,
  accentGradient = 'from-navy-600 to-navy-700'
}) => {
  return (
    <div className="md:hidden sticky top-0 z-20 bg-white dark:bg-navy-800 border-b-2 border-gray-200 dark:border-navy-700 shadow-md">
      <div className="container-max px-3 py-3">
        <button onClick={onToggle} className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <div className={`w-8 h-8 bg-gradient-to-br ${accentGradient} rounded-lg flex items-center justify-center shadow-sm`}>
              <Filter className="w-4 h-4 text-white" />
            </div>
            <div className="text-left">
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-navy-800 dark:text-navy-100">Filters</span>
                {activeFiltersCount > 0 && (
                  <span className="bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-sm">
                    {activeFiltersCount}
                  </span>
                )}
              </div>
            </div>
          </div>
          <span className="text-xs sm:text-sm font-bold text-navy-600 dark:text-navy-300 bg-gray-100 dark:bg-navy-700 px-2.5 py-1.5 rounded-lg">
            {resultsCount}
          </span>
        </button>
      </div>
    </div>
  );
};

export default MobileFilterToggle;