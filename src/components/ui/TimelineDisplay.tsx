import React from 'react';
import { Link } from 'react-router-dom';

const TimelineDisplay = ({ events }: { events: any[] }) => {
  return (
    <div className="space-y-3">
      {events.map((event) => (
        <Link key={event.id} to={`/events/${event.id}`} className="block">
          <div className="flex gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
            <div className="flex-shrink-0 w-12 text-center">
              <div className="text-base font-bold" style={{ color: '#8b2332' }}>{event.year}</div>
              <div className="text-xs" style={{ color: '#725d4f' }}>AD</div>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold mb-1 text-sm" style={{ color: '#725d4f' }}>{event.title}</h3>
              <p className="text-xs" style={{ color: '#725d4f', opacity: 0.8 }}>{event.description}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default TimelineDisplay;