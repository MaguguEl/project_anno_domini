import React from 'react';
import { User, Layers, Search, Users, Grid } from 'lucide-react';
import { useData } from '../../context/DataContext';
import FigureCard from '../../components/ui/FigureCard';
import DesktopFilterPanel from '../../components/filters/DesktopFilterPanel';
import MobileFilterToggle from '../../components/filters/MobileFilterToggle';
import MobileFilterDrawer from '../../components/filters/MobileFilterDrawer';
import EmptyState from '../../components/filters/EmptyState';
import ResultsHeader from '../../components/filters/ResultsHeader';
import { useFilters } from '../../hooks/useFilters';

const FiguresPage: React.FC = () => {
  const { eras, figures, getFiguresByEra } = useData();
  
  // Use the custom hook for filter management
  const {
    filters,
    updateFilter,
    resetFilters,
    getActiveFiltersCount,
    mobileFiltersOpen,
    toggleMobileFilters,
    setMobileFiltersOpen
  } = useFilters({
    initialFilters: {
      era: 'all',
      role: 'all',
      search: ''
    }
  });
  
  // Extract all unique roles from figures
  const roles = Array.from(
    new Set(figures.flatMap(figure => figure.roles))
  ).sort();
  
  // Apply filters
  const filteredFigures = (filters.era === 'all' ? figures : getFiguresByEra(filters.era))
    .filter(figure => {
      if (filters.role !== 'all' && !figure.roles.includes(filters.role)) {
        return false;
      }
      if (filters.search) {
        const query = filters.search.toLowerCase();
        return figure.name.toLowerCase().includes(query);
      }
      return true;
    })
    .sort((a, b) => a.name.localeCompare(b.name));
  
  const activeFiltersCount = getActiveFiltersCount();
  
  // Configure filters for the components
  const filterConfigs = [
    {
      id: 'search',
      label: 'Search',
      icon: Search,
      value: filters.search,
      onChange: (value: string) => updateFilter('search', value),
      options: [],
      type: 'search' as const,
      placeholder: 'Search by name...'
    },
    {
      id: 'era',
      label: 'Era',
      icon: Layers,
      value: filters.era,
      onChange: (value: string) => updateFilter('era', value),
      options: [
        { value: 'all', label: 'All Eras' },
        ...eras.map(era => ({
          value: era.id,
          label: `${era.name} (${era.startYear}-${era.endYear})`
        }))
      ]
    },
    {
      id: 'role',
      label: 'Role',
      icon: User,
      value: filters.role,
      onChange: (value: string) => updateFilter('role', value),
      options: [
        { value: 'all', label: 'All Roles' },
        ...roles.map(role => ({ value: role, label: role }))
      ]
    },
  ];

  // Active filter tags for mobile drawer
  const activeFilterTags = [
    filters.era !== 'all' && {
      label: eras.find(e => e.id === filters.era)?.name || '',
      onRemove: () => updateFilter('era', 'all')
    },
    filters.role !== 'all' && {
      label: filters.role,
      onRemove: () => updateFilter('role', 'all')
    }
  ].filter(Boolean) as { label: string; onRemove: () => void }[];

  return (
    <div className="bg-slate-50 dark:bg-navy-900 min-h-screen pb-6 sm:pb-8 md:pb-12">
      {/* Header */}
      <div className="relative bg-gradient-to-br from-burgundy-900 via-burgundy-800 to-burgundy-950 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 sm:w-48 sm:h-48 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 sm:w-56 sm:h-56 bg-white rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative container-max px-3 sm:px-4 py-6 sm:py-8 md:py-12 lg:py-16">
          <div className="max-w-4xl">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-white mb-2 sm:mb-3 md:mb-4 leading-tight">
              Church Fathers & Reformers
            </h1>
            <p className="text-xs sm:text-sm md:text-base text-burgundy-100 leading-relaxed max-w-3xl">
              Explore the lives, teachings, and legacies of church fathers, theologians, and reformers who shaped the 
              course of Christian history from the apostolic age to the present day.
            </p>
            
            {/* Stats */}
            <div className="flex flex-wrap gap-3 sm:gap-4 md:gap-6 mt-4 sm:mt-6 md:mt-8">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center">
                  <Users className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <div>
                  <div className="text-lg sm:text-xl md:text-2xl font-bold text-white">{figures.length}</div>
                  <div className="text-xs text-burgundy-200">Figures</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center">
                  <Layers className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <div>
                  <div className="text-lg sm:text-xl md:text-2xl font-bold text-white">{eras.length}</div>
                  <div className="text-xs text-burgundy-200">Eras</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center">
                  <Grid className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <div>
                  <div className="text-lg sm:text-xl md:text-2xl font-bold text-white">{roles.length}</div>
                  <div className="text-xs text-burgundy-200">Roles</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile Filter Toggle */}
      <MobileFilterToggle
        activeFiltersCount={activeFiltersCount}
        resultsCount={filteredFigures.length}
        onToggle={toggleMobileFilters}
        accentGradient="from-burgundy-600 to-burgundy-700"
      />
      
      <div className="container-max py-3 sm:py-4 md:py-6 px-3 sm:px-4">
        {/* Desktop Filter Panel */}
        <div className="hidden md:block mb-6">
          <DesktopFilterPanel
            filters={filterConfigs}
            activeFiltersCount={activeFiltersCount}
            onResetFilters={resetFilters}
            resultsCount={filteredFigures.length}
            accentColor="burgundy"
          />
        </div>
        
        {/* Mobile Filter Drawer */}
        <MobileFilterDrawer
          isOpen={mobileFiltersOpen}
          onClose={() => setMobileFiltersOpen(false)}
          filters={filterConfigs}
          activeFiltersCount={activeFiltersCount}
          onResetFilters={resetFilters}
          resultsCount={filteredFigures.length}
          accentGradient="from-burgundy-700 to-burgundy-800"
          activeFilterTags={activeFilterTags}
        />
        
        {/* Results Section */}
        {filteredFigures.length === 0 ? (
          <EmptyState
            icon={Users}
            title="No figures found"
            description="Try adjusting your filters to see more results"
            onReset={resetFilters}
            accentGradient="from-burgundy-600 to-burgundy-700"
          />
        ) : (
          <>
            <ResultsHeader
              icon={Users}
              count={filteredFigures.length}
              singularLabel="Figure"
              pluralLabel="Figures"
              accentColor="burgundy"
            />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3 sm:gap-4 md:gap-6">
              {filteredFigures.map((figure, index) => (
                <div key={figure.id} className="transform transition-transform hover:scale-[1.02]">
                  <FigureCard figure={figure} index={index} />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default FiguresPage;