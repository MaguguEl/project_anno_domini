import React, { useState } from 'react';
import { Filter, X, Calendar, Clock, Layers, ChevronDown, ChevronUp, Grid } from 'lucide-react';
import { useData } from '../../context/DataContext';
import TimelineDisplay from '../../components/ui/TimelineDisplay';

const TimelinePage: React.FC = () => {
  const { eras, events, getEventsByEra } = useData();
  const [selectedEra, setSelectedEra] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'all' | 'century' | 'year'>('all');
  const [selectedCentury, setSelectedCentury] = useState<number | null>(null);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [expandedSection, setExpandedSection] = useState<'era' | 'century' | 'year' | null>('era');
  
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
    setExpandedSection('year');
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
  
  const activeFiltersCount = 
    (selectedEra !== 'all' ? 1 : 0) + 
    (selectedCentury !== null ? 1 : 0) + 
    (selectedYear !== null ? 1 : 0);
  
  const toggleSection = (section: 'era' | 'century' | 'year') => {
    setExpandedSection(expandedSection === section ? null : section);
  };
  
  const FilterPanel = () => (
    <div className="space-y-3 sm:space-y-4">

      {/* Filter by Era */}
      <div className="bg-white dark:bg-navy-800 rounded-xl border-2 border-gray-200 dark:border-navy-700 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
        <button
          onClick={() => toggleSection('era')}
          className="w-full bg-gradient-to-r from-gold-500 to-gold-400 px-4 py-3 flex items-center justify-between transition-colors hover:from-gold-600 hover:to-gold-500"
        >
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-navy-900" />
            <h3 className="text-sm font-bold text-navy-900">Filter by Era</h3>
          </div>
          {expandedSection === 'era' ? (
            <ChevronUp className="w-5 h-5 text-navy-900" />
          ) : (
            <ChevronDown className="w-5 h-5 text-navy-900" />
          )}
        </button>
        {expandedSection === 'era' && (
          <div className="p-3 space-y-1.5 max-h-80 overflow-y-auto">
            <button
              className={`w-full text-left px-3 py-2.5 rounded-lg transition-all text-sm font-medium ${
                selectedEra === 'all' 
                  ? 'bg-gradient-to-r from-burgundy-600 to-burgundy-700 text-white shadow-md transform scale-[1.02]' 
                  : 'hover:bg-gray-50 dark:hover:bg-navy-700 text-navy-800 dark:text-navy-100 border-2 border-transparent hover:border-gray-200 dark:hover:border-navy-600'
              }`}
              onClick={() => handleEraChange('all')}
            >
              <div className="flex items-center justify-between">
                <span>All Eras</span>
                {selectedEra === 'all' && (
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                )}
              </div>
              <div className="text-xs opacity-75 mt-0.5">
                View complete timeline
              </div>
            </button>
            {eras.map(era => (
              <button
                key={era.id}
                className={`w-full text-left px-3 py-2.5 rounded-lg transition-all text-sm ${
                  selectedEra === era.id 
                    ? 'bg-gradient-to-r from-burgundy-600 to-burgundy-700 text-white shadow-md transform scale-[1.02]' 
                    : 'hover:bg-gray-50 dark:hover:bg-navy-700 text-navy-800 dark:text-navy-100 border-2 border-transparent hover:border-gray-200 dark:hover:border-navy-600'
                }`}
                onClick={() => handleEraChange(era.id)}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold">{era.name}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    selectedEra === era.id 
                      ? 'bg-white/20' 
                      : 'bg-gold-100 dark:bg-gold-900/30 text-gold-800 dark:text-gold-300'
                  }`}>
                    Vol. {era.volume}
                  </span>
                </div>
                <div className="text-xs opacity-75 flex items-center gap-1">
                  <Calendar size={12} />
                  {era.startYear} - {era.endYear}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
      
      {/* Browse by Century */}
      <div className="bg-white dark:bg-navy-800 rounded-xl border-2 border-gray-200 dark:border-navy-700 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
        <button
          onClick={() => toggleSection('century')}
          className="w-full bg-gradient-to-r from-gold-500 to-gold-400 px-4 py-3 flex items-center justify-between transition-colors hover:from-gold-600 hover:to-gold-500"
        >
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-navy-900" />
            <h3 className="text-sm text-navy-900">Browse by Century</h3>
          </div>
          {expandedSection === 'century' ? (
            <ChevronUp className="w-5 h-5 text-navy-900" />
          ) : (
            <ChevronDown className="w-5 h-5 text-navy-900" />
          )}
        </button>
        {expandedSection === 'century' && (
          <div className="p-3">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {centuries.map(century => (
                <button
                  key={century}
                  className={`px-3 py-2.5 text-sm font-bold rounded-lg transition-all ${
                    selectedCentury === century 
                      ? 'bg-gradient-to-br from-gold-500 to-gold-600 text-navy-900 shadow-lg ring-2 ring-gold-400 transform scale-105' 
                      : 'bg-gray-50 hover:bg-gray-100 dark:bg-navy-700 dark:hover:bg-navy-600 text-navy-800 dark:text-navy-100 border-2 border-gray-200 dark:border-navy-600 hover:border-gold-400 dark:hover:border-gold-600'
                  }`}
                  onClick={() => handleCenturySelect(century)}
                >
                  {century}th
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* Select Specific Year */}
      {viewMode === 'century' && selectedCentury !== null && years.length > 0 && (
        <div className="bg-white dark:bg-navy-800 rounded-xl border-2 border-gray-200 dark:border-navy-700 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
          <button
            onClick={() => toggleSection('year')}
            className="w-full bg-gradient-to-r from-gold-500 to-gold-400 px-4 py-3 flex items-center justify-between transition-colors hover:from-gold-600 hover:to-gold-500"
          >
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-navy-900" />
              <h3 className="text-sm font-bold text-navy-900">Select Specific Year</h3>
            </div>
            {expandedSection === 'year' ? (
              <ChevronUp className="w-5 h-5 text-navy-900" />
            ) : (
              <ChevronDown className="w-5 h-5 text-navy-900" />
            )}
          </button>
          {expandedSection === 'year' && (
            <div className="p-3">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-64 overflow-y-auto">
                {years.map(year => (
                  <button
                    key={year}
                    className={`px-3 py-2.5 text-sm font-bold rounded-lg transition-all ${
                      selectedYear === year 
                        ? 'bg-gradient-to-br from-gold-500 to-gold-600 text-navy-900 shadow-lg ring-2 ring-gold-400 transform scale-105' 
                        : 'bg-gray-50 hover:bg-gray-100 dark:bg-navy-700 dark:hover:bg-navy-600 text-navy-800 dark:text-navy-100 border-2 border-gray-200 dark:border-navy-600 hover:border-gold-400 dark:hover:border-gold-600'
                    }`}
                    onClick={() => handleYearSelect(year)}
                  >
                    {year}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
  
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
     {/* Header with Gold Gradient */}
<div className="relative overflow-hidden bg-gradient-to-br from-gold-500 via-gold-400 to-gold-600 dark:from-gold-600 dark:via-gold-500 dark:to-gold-700">
  <div className="absolute inset-0 opacity-10">
    <div className="absolute top-10 left-10 w-32 h-32 sm:w-48 sm:h-48 bg-white rounded-full blur-3xl"></div>
    <div className="absolute bottom-10 right-10 w-40 h-40 sm:w-56 sm:h-56 bg-white rounded-full blur-3xl"></div>
  </div>

  <div className="relative container-max px-3 sm:px-4 py-6 sm:py-8 md:py-12 lg:py-16">
    <div className="max-w-4xl">

      {/* Main Title — Plum */}
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-plum-800 mb-2 sm:mb-3 md:mb-4 leading-tight">
        Timelines
      </h1>

      {/* Description — Charcoal */}
      <p className="text-xs sm:text-sm md:text-base text-charcoal/90 leading-relaxed max-w-3xl">
        Explore the major events of Church history from the apostolic Church to the present.
        Filter by era, browse by century, or select specific years to explore.
      </p>

      {/* Stats */}
      <div className="flex flex-wrap gap-3 sm:gap-4 md:gap-6 mt-4 sm:mt-6 md:mt-8">

        {/* Events */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/30 backdrop-blur-sm rounded-lg flex items-center justify-center border-2 border-white/20">
            <Grid className="w-4 h-4 sm:w-5 sm:h-5 text-plum-800" />
          </div>
          <div>
            <div className="text-lg sm:text-xl md:text-2xl font-bold text-charcoal">
              {events.length}
            </div>
            <div className="text-xs text-forest-800/80">
              Events
            </div>
          </div>
        </div>

        {/* Eras */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/30 backdrop-blur-sm rounded-lg flex items-center justify-center border-2 border-white/20">
            <Layers className="w-4 h-4 sm:w-5 sm:h-5 text-plum-800" />
          </div>
          <div>
            <div className="text-lg sm:text-xl md:text-2xl font-bold text-charcoal">
              {eras.length}
            </div>
            <div className="text-xs text-forest-800/80">
              Eras
            </div>
          </div>
        </div>

        {/* Centuries */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/30 backdrop-blur-sm rounded-lg flex items-center justify-center border-2 border-white/20">
            <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-plum-800" />
          </div>
          <div>
            <div className="text-lg sm:text-xl md:text-2xl font-bold text-charcoal">
              {centuries.length}
            </div>
            <div className="text-xs text-forest-800/80">
              Centuries
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</div>

      
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden sticky top-0 z-20 bg-white dark:bg-navy-800 border-b-2 border-gray-200 dark:border-navy-700 px-4 py-3 shadow-md">
        <button
          onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
          className="flex items-center justify-between w-full"
        >
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gold-600" />
            <span className="font-bold text-navy-800 dark:text-navy-100">
              Filters
            </span>
            {activeFiltersCount > 0 && (
              <span className="bg-gradient-to-r from-burgundy-600 to-burgundy-700 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-md">
                {activeFiltersCount}
              </span>
            )}
          </div>
          <span className="text-sm font-semibold text-navy-600 dark:text-navy-300 bg-gray-100 dark:bg-navy-700 px-3 py-1 rounded-full">
            {filteredEvents.length} events
          </span>
        </button>
      </div>
      
      {/* Main Content */}
      <div className="container-max py-4 sm:py-6 md:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-4 sm:gap-6 lg:gap-8">
          {/* Desktop Filters Panel */}
          <div className="hidden lg:block">
            <div className="sticky top-4">
              <FilterPanel />
            </div>
          </div>
          
          {/* Mobile Filters Panel */}
          {mobileFiltersOpen && (
            <div className="lg:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-sm" onClick={() => setMobileFiltersOpen(false)}>
              <div className="absolute inset-y-0 left-0 w-full max-w-sm bg-slate-50 dark:bg-slate-900 overflow-y-auto shadow-2xl" onClick={(e) => e.stopPropagation()}>
                <div className="sticky top-0 z-10 bg-gradient-to-r from-gold-500 to-gold-400 border-b-2 border-gold-600 px-4 py-3 flex items-center justify-between shadow-md">
                  <div className="flex items-center gap-2">
                    <Filter className="w-5 h-5 text-navy-900" />
                    <h2 className="font-bold text-navy-900">Filters</h2>
                  </div>
                  <button
                    onClick={() => setMobileFiltersOpen(false)}
                    className="p-2 hover:bg-gold-600 rounded-full transition-colors"
                  >
                    <X className="w-5 h-5 text-navy-900" />
                  </button>
                </div>
                <div className="p-4">
                  <FilterPanel />
                </div>
              </div>
            </div>
          )}
          
          {/* Events Timeline Section */}
          <div className="flex-1">
            {/* Header Card */}
            <div className="mb-6">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                <div>
                  <h2 className="text-xl font-serif text-navy-800 dark:text-navy-100 font-bold mb-1">
                    {viewMode === 'all' && 'Complete Timeline'}
                    {viewMode === 'century' && selectedCentury && `${selectedCentury}th Century`}
                    {viewMode === 'year' && selectedYear && `Year ${selectedYear}`}
                  </h2>
                  {selectedEra !== 'all' && (
                    <p className="text-sm text-navy-600 dark:text-navy-400">
                      {eras.find(era => era.id === selectedEra)?.name}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-2 text-sm font-semibold text-navy-700 dark:text-navy-300 bg-slate-100 dark:bg-navy-700 px-4 py-2 rounded-full">
                  <Filter size={14} />
                  {filteredEvents.length} {filteredEvents.length === 1 ? 'event' : 'events'}
                </div>
              </div>
            </div>

            {/* Timeline Content Card */}
            <div className="bg-white dark:bg-navy-800 rounded-xl shadow-md border border-navy-200 dark:border-navy-700 overflow-hidden">
              <div className="p-5 sm:p-6">
                {filteredEvents.length === 0 ? (
                  <div className="text-center py-16 text-navy-600 dark:text-navy-300">
                    <div className="w-20 h-20 mx-auto mb-4 bg-slate-100 dark:bg-navy-700 rounded-full flex items-center justify-center">
                      <Filter className="w-10 h-10 text-navy-400 dark:text-navy-500" />
                    </div>
                    <p className="text-xl font-bold mb-2 text-navy-800 dark:text-navy-200">No events found</p>
                    <p className="text-sm mb-6">Try adjusting your filters to see more results</p>
                    <button
                      className="px-6 py-3 bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-navy-900 rounded-lg transition-all shadow-md hover:shadow-lg font-semibold"
                      onClick={handleResetFilters}
                    >
                      Reset All Filters
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
    </div>
  );
};

export default TimelinePage;