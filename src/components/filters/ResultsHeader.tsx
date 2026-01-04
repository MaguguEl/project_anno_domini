import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ResultsHeaderProps {
  icon: LucideIcon;
  count: number;
  singularLabel: string;
  pluralLabel: string;
  accentColor?: 'burgundy' | 'navy' | 'blue' | 'purple';
}

const ResultsHeader: React.FC<ResultsHeaderProps> = ({
  icon: Icon,
  count,
  singularLabel,
  pluralLabel,
  accentColor = 'navy'
}) => {
  const getColorClasses = () => {
    const colorMap = {
      burgundy: {
        bg: 'bg-burgundy-100 dark:bg-burgundy-900/30',
        text: 'text-burgundy-600 dark:text-burgundy-400'
      },
      navy: {
        bg: 'bg-navy-100 dark:bg-navy-900/30',
        text: 'text-navy-600 dark:text-navy-400'
      },
      blue: {
        bg: 'bg-blue-100 dark:bg-blue-900/30',
        text: 'text-blue-600 dark:text-blue-400'
      },
      purple: {
        bg: 'bg-purple-100 dark:bg-purple-900/30',
        text: 'text-purple-600 dark:text-purple-400'
      }
    };
    return colorMap[accentColor];
  };

  const colors = getColorClasses();

  return (
    <div className="flex items-center justify-between mb-4 sm:mb-6">
      <div className="flex items-center gap-2">
        <div className={`w-8 h-8 ${colors.bg} rounded-lg flex items-center justify-center`}>
          <Icon size={16} className={colors.text} />
        </div>
        <span className="text-xs sm:text-sm font-bold text-navy-700 dark:text-navy-200">
          {count} {count === 1 ? singularLabel : pluralLabel}
        </span>
      </div>
    </div>
  );
};

export default ResultsHeader;