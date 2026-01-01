import React from 'react';
import { Link } from 'react-router-dom';
import { Document } from '../../types';

interface DocumentCardProps {
  document: Document;
  index?: number;
}

const DocumentCard: React.FC<DocumentCardProps> = ({ document, index = 0 }) => {
  return (
    <div 
      className="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
      style={{ backgroundColor: 'var(--global-bg-secondary)' }}
    >
      <div className="p-4">
        <h3 className="text-xl font-serif text-burgundy-700 dark:text-burgundy-300 mb-1">
          <Link to={`/documents/${document.id}`} className="hover:underline">
            {document.title}
          </Link>
        </h3>
        <div className="text-sm text-navy-600 dark:text-navy-400 mb-3">
          {document.author} · {document.year}
        </div>
        <p className="text-navy-700 dark:text-navy-300 text-sm mb-4">
          {document.context.length > 100 
            ? `${document.context.substring(0, 100)}...` 
            : document.context}
        </p>
        <div className="flex justify-between items-center">
          <span className="text-xs py-1 px-2 bg-gold-100 text-gold-800 rounded">
            {document.era.name}
          </span>
          <Link 
            to={`/documents/${document.id}`} 
            className="text-burgundy-700 dark:text-burgundy-300 text-sm hover:underline"
          >
            Read more →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DocumentCard;