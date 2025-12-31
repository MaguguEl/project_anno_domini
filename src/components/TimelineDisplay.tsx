import React from 'react';
import { Link } from 'react-router-dom';
import { Event } from '../types';
import { formatDate } from '../utils/dateUtils';
import { BookMarked, UserRound, MapPin } from 'lucide-react';

interface TimelineDisplayProps {
  events: Event[];
  title?: string;
}

const TimelineDisplay: React.FC<TimelineDisplayProps> = ({ events, title }) => {
  return (
    <div className="py-4">
      {title && <h2 className="text-2xl font-serif mb-6 text-gold-500">{title}</h2>}
      {events.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-navy-300">No events found.</p>
        </div>
      ) : (
        <div className="timeline-container relative pl-8"> 
          {events.map((event, index) => (
            <div
              key={event.id}
              className="relative mb-8"
            >
              {/* Timeline dot */}
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-gold-500 rounded-full z-10 -ml-2"></div>
              {/* Timeline line */}
              <div className="absolute left-0 top-0 h-full w-0.5 bg-gold-600"></div>

              <div className="ml-6"> {/* Content shifted to the right of the line */}
                <div className="mb-2">
                  <span className="text-sm text-secondary font-medium">
                    {formatDate(event.year, event.month, event.day)}
                  </span>
                </div>
                <div className="bg-navy-700 p-5 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                  <h3 className="text-xl font-serif text-gold-500 mb-2">
                    <Link to={`/events/${event.id}`} className="hover:underline">
                      {event.title}
                    </Link>
                  </h3>
                  <p className="text-navy-200 mb-4">
                    {event.description.length > 150
                      ? `${event.description.substring(0, 150)}...`
                      : event.description}
                  </p>
                  <div className="flex flex-wrap gap-4 text-sm text-navy-300">
                    {event.relatedPeople.length > 0 && (
                      <div className="flex items-center gap-1">
                        <UserRound size={16} className="text-gold-400" />
                        <span>{event.relatedPeople.length} figures</span>
                      </div>
                    )}
                    {event.relatedDocuments.length > 0 && (
                      <div className="flex items-center gap-1">
                        <BookMarked size={16} className="text-gold-400" />
                        <span>{event.relatedDocuments.length} documents</span>
                      </div>
                    )}
                    {event.locations.length > 0 && (
                      <div className="flex items-center gap-1">
                        <MapPin size={16} className="text-gold-400" />
                        <span>{event.locations.join(', ')}</span>
                      </div>
                    )}
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {event.tags.map(tag => (
                      <span
                        key={tag}
                        className="inline-block px-2.5 py-1 text-xs rounded-full bg-gold-700 text-white" // Tag styling
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
          {/* Ensure the timeline line extends to the bottom */}
          <div className="absolute left-0 top-0 h-full w-0.5 bg-gold-600"></div>
        </div>
      )}
    </div>
  );
};

export default TimelineDisplay;