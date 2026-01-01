import React, { useState } from 'react';
import { ArrowLeft, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import TimelineDisplay from '../../components/ui/TimelineDisplay';

const TimelinePage: React.FC = () => {
  const { eras, events, getEventsByEra } = useData();
  const [selectedEra, setSelectedEra] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'all' | 'century' | 'year'>('all');
  const [selectedCentury, setSelectedCentury] = useState<number | null>(null);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  
  const centuries = Array.from(
    new Set(events.map(event => Math.floor(event.year / 100) + 1))
  ).sort((a, b) => a - b);
  
  const years = Array.from(
    new Set(events
      .filter(event => selectedCentury !== null && Math.floor(event.year / 100) + 1 === selectedCentury)
      .map(event => event.year))
  ).sort((a, b) => a - b);
  
  const getFilteredEvents = () => {
    let filtered = events;
    
    if (selectedEra !== 'all') {
      filtered = getEventsByEra(selectedEra);
    }
    
    if (viewMode === 'century' && selectedCentury !== null) {
      filtered = filtered.filter(event => 
        Math.floor(event.year / 100) + 1 === selectedCentury
      );
    }
    
    if (viewMode === 'year' && selectedYear !== null) {
      filtered = filtered.filter(event => event.year === selectedYear);
    }
    
    return filtered.sort((a, b) => a.year - b.year);
  };
  
  const filteredEvents = getFilteredEvents();
  
  const handleEraChange = (eraId: string) => {
    setSelectedEra(eraId);
    setViewMode('all');
    setSelectedCentury(null);
    setSelectedYear(null);
  };
  
  const handleCenturySelect = (century: number) => {
    setSelectedCentury(century);
    setViewMode('century');
    setSelectedYear(null);
  };
  
  const handleYearSelect = (year: number) => {
    setSelectedYear(year);
    setViewMode('year');
  };
  
  const handleResetFilters = () => {
    setSelectedEra('all');
    setViewMode('all');
    setSelectedCentury(null);
    setSelectedYear(null);
  };
  
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-navy-900">
      {/* Header */}
      <div className="bg-gold-500 py-12">
        <div className="container-max">
          <div>
            <h1 className="text-3xl font-serif text-navy-900 mb-2">Historical Timeline</h1>
             <p className="text-sm md:text-base text-navy-800 max-w-3xl">
             Explore the major events of Church history as they unfolded over time, traced through Philip Schaff’s historical writings from the apostolic Church to the present.
            </p>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="container-max py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Panel */}
          <div>
            <div className="border-l-4 border-gold-600 bg-white dark:bg-navy-800 p-6 sticky top-4">
              <div className="flex items-center gap-2 mb-4">
                <Filter className="w-5 h-5 text-gold-600" />
                <h2 className="text-xl font-serif text-navy-800 dark:text-navy-100">
                  Filter Timeline
                </h2>
              </div>
              
              <div className="space-y-2">
                <button
                  className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                    selectedEra === 'all' 
                      ? 'bg-burgundy-700 text-white dark:bg-burgundy-300 dark:text-navy-900' 
                      : 'hover:bg-navy-50 dark:hover:bg-navy-700 text-navy-800 dark:text-navy-100'
                  }`}
                  onClick={() => handleEraChange('all')}
                >
                  All Eras
                </button>
                {eras.map(era => (
                  <button
                    key={era.id}
                    className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                      selectedEra === era.id 
                        ? 'bg-burgundy-700 text-white dark:bg-burgundy-300 dark:text-navy-900' 
                        : 'hover:bg-navy-50 dark:hover:bg-navy-700 text-navy-800 dark:text-navy-100'
                    }`}
                    onClick={() => handleEraChange(era.id)}
                  >
                    <div className="font-medium">{era.name}</div>
                    <div className="text-sm opacity-75">
                      {era.startYear} - {era.endYear}
                    </div>
                  </button>
                ))}
              </div>
              
              {/* Century Filter */}
              <div className="mt-6 pt-6 border-t border-navy-200 dark:border-navy-700">
                <h3 className="text-sm font-semibold text-navy-700 dark:text-navy-200 mb-3">
                  Browse by Century
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {centuries.map(century => (
                    <button
                      key={century}
                      className={`px-3 py-2 text-sm rounded-md transition-colors ${
                        selectedCentury === century 
                          ? 'bg-gold-500 text-navy-900' 
                          : 'bg-navy-50 hover:bg-navy-100 dark:bg-navy-700 dark:hover:bg-navy-600 text-navy-800 dark:text-navy-100'
                      }`}
                      onClick={() => handleCenturySelect(century)}
                    >
                      {century}th
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Year Select */}
              {viewMode === 'century' && selectedCentury !== null && years.length > 0 && (
                <div className="mt-6 pt-6 border-t border-navy-200 dark:border-navy-700">
                  <h3 className="text-sm font-semibold text-navy-700 dark:text-navy-200 mb-3">
                    Select Year
                  </h3>
                  <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto">
                    {years.map(year => (
                      <button
                        key={year}
                        className={`px-3 py-2 text-sm rounded-md transition-colors ${
                          selectedYear === year 
                            ? 'bg-gold-500 text-navy-900' 
                            : 'bg-navy-50 hover:bg-navy-100 dark:bg-navy-700 dark:hover:bg-navy-600 text-navy-800 dark:text-navy-100'
                        }`}
                        onClick={() => handleYearSelect(year)}
                      >
                        {year}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Reset Button */}
              {(selectedEra !== 'all' || viewMode !== 'all') && (
                <button
                  className="w-full px-4 py-2 mt-6 text-burgundy-700 bg-burgundy-50 hover:bg-burgundy-100 rounded-md transition-colors dark:bg-navy-700 dark:text-burgundy-300 dark:hover:bg-navy-600"
                  onClick={handleResetFilters}
                >
                  Reset Filters
                </button>
              )}
            </div>
          </div>
          
          {/* Events Timeline */}
          <div className="lg:col-span-3">
            <div className="border-l-4 border-navy-700 dark:border-navy-300 bg-white dark:bg-navy-800 p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-serif text-navy-800 dark:text-navy-100">
                  {viewMode === 'all' && 'Complete Timeline'}
                  {viewMode === 'century' && selectedCentury && `${selectedCentury}th Century`}
                  {viewMode === 'year' && selectedYear && `Year ${selectedYear}`}
                  {selectedEra !== 'all' && ` • ${eras.find(era => era.id === selectedEra)?.name}`}
                </h2>
                <div className="text-sm text-navy-600 dark:text-navy-300">
                  {filteredEvents.length} events
                </div>
              </div>
              
              {filteredEvents.length === 0 ? (
                <div className="text-center py-12 text-navy-600 dark:text-navy-300">
                  <p>No events found with the selected filters.</p>
                  <button
                    className="mt-4 px-4 py-2 text-burgundy-700 bg-burgundy-50 hover:bg-burgundy-100 rounded-md transition-colors dark:bg-navy-700 dark:text-burgundy-300 dark:hover:bg-navy-600"
                    onClick={handleResetFilters}
                  >
                    Reset Filters
                  </button>
                </div>
              ) : (
                <TimelineDisplay events={filteredEvents} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimelinePage;