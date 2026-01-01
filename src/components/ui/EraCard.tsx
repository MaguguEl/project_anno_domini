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
      className="bg-gradient-to-r from-navy-700 to-navy-800 text-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
    >
      <div className="p-6">
        <h3 className="text-2xl font-serif mb-2">
          <Link to={`/eras/${era.id}`} className="hover:underline">
            {era.name}
          </Link>
        </h3>
        <div className="text-gold-400 font-medium mb-4">
          Volume {era.volume}: {era.startYear} - {era.endYear}
        </div>
        <p className="text-navy-100 mb-4">
          {era.description.length > 120 
            ? `${era.description.substring(0, 120)}...` 
            : era.description}
        </p>
        <div className="flex justify-between items-center pt-2 border-t border-navy-600">
          <div className="flex gap-4 text-navy-200 text-sm">
            <span>{era.events.length} Events</span>
            <span>{era.figures.length} Figures</span>
            <span>{era.documents.length} Documents</span>
          </div>
          <Link 
            to={`/eras/${era.id}`} 
            className="text-gold-400 hover:text-gold-300 transition-colors"
          >
            Explore →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EraCard;