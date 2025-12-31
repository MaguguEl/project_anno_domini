import React from 'react';
import { Link } from 'react-router-dom';
import { Figure } from '../types';
import { formatLifespan } from '../utils/dateUtils';

interface FigureCardProps {
  figure: Figure;
  index?: number;
}

const FigureCard: React.FC<FigureCardProps> = ({ figure, index = 0 }) => {
  return (
    <div 
      className="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
      style={{ backgroundColor: 'var(--global-bg-secondary)' }}
    >
      <div className="aspect-w-16 aspect-h-9 bg-gray-100 dark:bg-navy-700 overflow-hidden">
        <img 
          src={figure.image} 
          alt={figure.name}
          className="object-cover w-full h-48"
        />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-serif text-burgundy-700 dark:text-burgundy-300 mb-1">
          <Link to={`/figures/${figure.id}`} className="hover:underline">
            {figure.name}
          </Link>
        </h3>
        <div className="text-sm text-navy-600 dark:text-navy-400 mb-2">
          {formatLifespan(figure.birthYear, figure.deathYear)}
        </div>
        <div className="flex flex-wrap gap-1 mb-3">
          {figure.roles.map(role => (
            <span 
              key={role} 
              className="inline-block px-2 py-1 text-xs rounded-full bg-navy-50 text-navy-700 dark:bg-navy-800 dark:text-navy-300"
            >
              {role}
            </span>
          ))}
        </div>
        <p className="text-navy-700 dark:text-navy-300 text-sm">
          {figure.description.length > 100 
            ? `${figure.description.substring(0, 100)}...` 
            : figure.description}
        </p>
      </div>
    </div>
  );
};

export default FigureCard;