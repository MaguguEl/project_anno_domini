import React from 'react';
import { Link } from 'react-router-dom';
import { Era } from '../../types';

interface EraCardProps {
  era: Era;
  index?: number;
}

const EraCard: React.FC<EraCardProps> = ({ era, index = 0 }) => {
  return (
    <div 
      className="bg-gradient-to-br from-navy-700 to-navy-800 text-white rounded-md overflow-hidden shadow hover:shadow-md transition-all hover:-translate-y-0.5 border border-navy-600"
    >
      <div className="p-4">
        <h3 className="text-lg font-serif mb-1 leading-tight">
          <Link to={`/eras/${era.id}`} className="hover:text-gold-400 transition-colors">
            {era.name}
          </Link>
        </h3>
        <div className="text-gold-400 text-xs font-medium mb-3">
          Vol. {era.volume} • {era.startYear}–{era.endYear}
        </div>
        <p className="text-navy-100 text-sm leading-relaxed mb-3">
          {era.description.length > 90 
            ? `${era.description.substring(0, 90)}...` 
            : era.description}
        </p>
        <div className="flex justify-between items-center pt-3 border-t border-navy-600/50">
          <div className="flex gap-3 text-navy-300 text-xs">
            <span>{era.events.length} Events</span>
            <span>{era.figures.length} Figures</span>
            <span>{era.documents.length} Docs</span>
          </div>
          <Link 
            to={`/eras/${era.id}`} 
            className="text-gold-400 hover:text-gold-300 transition-colors text-xs font-medium"
          >
            Explore →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EraCard;