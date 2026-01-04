import React from 'react';
import { LucideIcon } from 'lucide-react';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  onReset: () => void;
  accentGradient?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon,
  title,
  description,
  onReset,
  accentGradient = 'from-navy-600 to-navy-700'
}) => {
  return (
    <div className="text-center py-12 sm:py-16">
      <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-navy-700 dark:to-navy-600 rounded-2xl flex items-center justify-center shadow-inner">
        <Icon className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400 dark:text-navy-400" />
      </div>
      <p className="text-base sm:text-lg font-bold text-navy-700 dark:text-navy-200 mb-2">
        {title}
      </p>
      <p className="text-xs sm:text-sm text-navy-600 dark:text-navy-300 mb-6">
        {description}
      </p>
      <button
        onClick={onReset}
        className={`px-6 py-3 bg-gradient-to-r ${accentGradient} hover:opacity-90 text-white rounded-xl shadow-lg hover:shadow-xl transition-all font-bold text-sm sm:text-base`}
      >
        Reset All Filters
      </button>
    </div>
  );
};

export default EmptyState;