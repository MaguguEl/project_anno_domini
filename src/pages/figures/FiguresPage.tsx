import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import FigureCard from '../../components/ui/FigureCard';
import SearchBox from '../../components/ui/SearchBox';
import { Filter, X, User, Layers, ChevronDown, Search, Users, Grid } from 'lucide-react';

const FiguresPage: React.FC = () => {
  const { eras, figures, getFiguresByEra } = useData();
  const [selectedEra, setSelectedEra] = useState<string>('all');
  const [selectedRole, setSelectedRole] = useState<string>('all');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  
  // Extract all unique roles from figures
  const roles = Array.from(
    new Set(figures.flatMap(figure => figure.roles))
  ).sort();
  
  // Get figures based on era selection
  const getFilteredFiguresByEra = () => {
    if (selectedEra === 'all') {
      return figures;
    }
    return getFiguresByEra(selectedEra);
  };
  
  // Apply all filters
  const filteredFigures = getFilteredFiguresByEra()
    .filter(figure => {
      if (selectedRole !== 'all') {
        return figure.roles.includes(selectedRole);
      }
      return true;
    })
    .sort((a, b) => a.name.localeCompare(b.name));
  
  const activeFiltersCount = 
    (selectedEra !== 'all' ? 1 : 0) + 
    (selectedRole !== 'all' ? 1 : 0);
  
  const handleResetFilters = () => {
    setSelectedEra('all');
    setSelectedRole('all');
  };
  
  return (
    <div className="min-h-screen pb-6 sm:pb-8 md:pb-12">
      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-burgundy-800 via-burgundy-900 to-burgundy-950 dark:from-burgundy-900 dark:via-burgundy-950 dark:to-black">
        {/* Decorative Background Pattern */}
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
      
      {/* Mobile Filter Toggle Bar */}
      <div className="md:hidden sticky top-0 z-20 bg-white dark:bg-navy-800 border-b-2 border-gray-200 dark:border-navy-700 shadow-md">
        <div className="container-max px-3 py-3">
          <button
            onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
            className="flex items-center justify-between w-full"
          >
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-burgundy-600 to-burgundy-700 rounded-lg flex items-center justify-center shadow-sm">
                <Filter className="w-4 h-4 text-white" />
              </div>
              <div className="text-left">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-navy-800 dark:text-navy-100">Filters</span>
                  {activeFiltersCount > 0 && (
                    <span className="bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-sm">
                      {activeFiltersCount}
                    </span>
                  )}
                </div>
                <div className="text-xs text-navy-500 dark:text-navy-400">
                  {activeFiltersCount > 0 ? 'Tap to modify' : 'Tap to filter'}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm font-bold text-navy-600 dark:text-navy-300 bg-gray-100 dark:bg-navy-700 px-2.5 py-1.5 rounded-lg">
                {filteredFigures.length}
              </span>
            </div>
          </button>
        </div>
      </div>
      
      <div className="container-max py-3 sm:py-4 md:py-6 px-3 sm:px-4">
        {/* Desktop Filter Section */}
        <div className="hidden md:block mb-6">
          <div className="bg-white dark:bg-navy-800 rounded-2xl border-2 border-gray-200 dark:border-navy-700 overflow-hidden">
            {/* Filter Header */}
            <div className="bg-gradient-to-r from-burgundy-700 via-burgundy-800 to-burgundy-900 px-4 sm:px-6 py-3 sm:py-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg">
                    <Filter className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-base sm:text-lg font-bold text-white">
                      Filter & Search
                    </h2>
                    <p className="text-xs text-burgundy-100">
                      Narrow your search by era, role, or name
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {activeFiltersCount > 0 && (
                    <button
                      onClick={handleResetFilters}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg transition-all text-xs font-semibold text-white"
                    >
                      <X size={14} />
                      Clear All
                    </button>
                  )}
                  <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg">
                    <Users size={16} className="text-white" />
                    <span className="text-sm font-bold text-white">{filteredFigures.length}</span>
                    <span className="text-xs text-burgundy-100">results</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Active Filters Pills */}
            {activeFiltersCount > 0 && (
              <div className="bg-gradient-to-br from-blue-50 via-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/20 border-b-2 border-blue-200 dark:border-blue-700 px-4 sm:px-6 py-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-bold text-blue-900 dark:text-blue-100 uppercase tracking-wide">
                    Active:
                  </span>
                  {selectedEra !== 'all' && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-navy-800 border-2 border-blue-400 dark:border-blue-600 rounded-full text-xs font-semibold text-blue-900 dark:text-blue-100 shadow-sm">
                      <Layers size={12} />
                      {eras.find(e => e.id === selectedEra)?.name}
                      <button 
                        onClick={() => setSelectedEra('all')} 
                        className="hover:bg-blue-100 dark:hover:bg-blue-700 rounded-full p-0.5 transition-colors ml-1"
                      >
                        <X size={12} />
                      </button>
                    </span>
                  )}
                  {selectedRole !== 'all' && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-navy-800 border-2 border-blue-400 dark:border-blue-600 rounded-full text-xs font-semibold text-blue-900 dark:text-blue-100 shadow-sm">
                      <User size={12} />
                      {selectedRole}
                      <button 
                        onClick={() => setSelectedRole('all')} 
                        className="hover:bg-blue-100 dark:hover:bg-blue-700 rounded-full p-0.5 transition-colors ml-1"
                      >
                        <X size={12} />
                      </button>
                    </span>
                  )}
                </div>
              </div>
            )}
            
            {/* Filter Controls */}
            <div className="p-4 sm:p-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
                {/* Era Filter */}
                <div className="space-y-2">
                  <label htmlFor="era-filter" className="flex items-center gap-2 text-xs sm:text-sm font-bold text-navy-700 dark:text-navy-200">
                    <div className="w-6 h-6 bg-burgundy-100 dark:bg-burgundy-900/30 rounded-lg flex items-center justify-center">
                      <Layers className="w-3.5 h-3.5 text-burgundy-600 dark:text-burgundy-400" />
                    </div>
                    Filter by Era
                  </label>
                  <div className="relative">
                    <select
                      id="era-filter"
                      className="w-full appearance-none p-3 pr-10 text-sm font-medium rounded-xl border-2 border-gray-300 bg-white dark:bg-navy-700 dark:border-navy-600 dark:text-navy-100 focus:border-burgundy-500 focus:ring-4 focus:ring-burgundy-100 dark:focus:ring-burgundy-900/30 focus:outline-none transition-all shadow-sm hover:border-burgundy-400 hover:shadow-md"
                      value={selectedEra}
                      onChange={(e) => setSelectedEra(e.target.value)}
                    >
                      <option value="all">All Eras</option>
                      {eras.map(era => (
                        <option key={era.id} value={era.id}>
                          {era.name} ({era.startYear}-{era.endYear})
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-navy-400 pointer-events-none" />
                  </div>
                </div>
                
                {/* Role Filter */}
                <div className="space-y-2">
                  <label htmlFor="role-filter" className="flex items-center gap-2 text-xs sm:text-sm font-bold text-navy-700 dark:text-navy-200">
                    <div className="w-6 h-6 bg-burgundy-100 dark:bg-burgundy-900/30 rounded-lg flex items-center justify-center">
                      <User className="w-3.5 h-3.5 text-burgundy-600 dark:text-burgundy-400" />
                    </div>
                    Filter by Role
                  </label>
                  <div className="relative">
                    <select
                      id="role-filter"
                      className="w-full appearance-none p-3 pr-10 text-sm font-medium rounded-xl border-2 border-gray-300 bg-white dark:bg-navy-700 dark:border-navy-600 dark:text-navy-100 focus:border-burgundy-500 focus:ring-4 focus:ring-burgundy-100 dark:focus:ring-burgundy-900/30 focus:outline-none transition-all shadow-sm hover:border-burgundy-400 hover:shadow-md"
                      value={selectedRole}
                      onChange={(e) => setSelectedRole(e.target.value)}
                    >
                      <option value="all">All Roles</option>
                      {roles.map(role => (
                        <option key={role} value={role}>
                          {role}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-navy-400 pointer-events-none" />
                  </div>
                </div>
                
                {/* Search */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-xs sm:text-sm font-bold text-navy-700 dark:text-navy-200">
                    <div className="w-6 h-6 bg-burgundy-100 dark:bg-burgundy-900/30 rounded-lg flex items-center justify-center">
                      <Search className="w-3.5 h-3.5 text-burgundy-600 dark:text-burgundy-400" />
                    </div>
                    Search by Name
                  </label>
                  <SearchBox placeholder="Type to search..." />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Mobile Filters Drawer */}
        {mobileFiltersOpen && (
          <div className="md:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-sm" onClick={() => setMobileFiltersOpen(false)}>
            <div className="absolute inset-y-0 left-0 w-full max-w-md bg-white dark:bg-navy-900 overflow-y-auto shadow-2xl" onClick={(e) => e.stopPropagation()}>
              {/* Drawer Header */}
              <div className="sticky top-0 z-10 bg-gradient-to-r from-burgundy-700 to-burgundy-800 px-4 py-4 shadow-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                      <Filter className="w-5 h-5 text-white" />
                    </div>
                    <h2 className="font-bold text-white text-lg">Filters</h2>
                  </div>
                  <button
                    onClick={() => setMobileFiltersOpen(false)}
                    className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5 text-white" />
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-burgundy-100">
                    {filteredFigures.length} results
                  </span>
                  {activeFiltersCount > 0 && (
                    <button
                      onClick={handleResetFilters}
                      className="text-xs text-white font-semibold flex items-center gap-1 px-2 py-1 bg-white/20 hover:bg-white/30 rounded-md transition-colors"
                    >
                      <X size={12} />
                      Clear All
                    </button>
                  )}
                </div>
              </div>
              
              <div className="p-4 space-y-4">
                {/* Active Filters */}
                {activeFiltersCount > 0 && (
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/20 border-2 border-blue-200 dark:border-blue-700 rounded-xl p-3">
                    <div className="text-xs font-bold text-blue-900 dark:text-blue-100 uppercase tracking-wide mb-2">
                      Active Filters
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedEra !== 'all' && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-white dark:bg-navy-800 border border-blue-400 dark:border-blue-600 rounded-full text-xs font-medium text-blue-900 dark:text-blue-100">
                          {eras.find(e => e.id === selectedEra)?.name}
                          <button onClick={() => setSelectedEra('all')}>
                            <X size={12} />
                          </button>
                        </span>
                      )}
                      {selectedRole !== 'all' && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-white dark:bg-navy-800 border border-blue-400 dark:border-blue-600 rounded-full text-xs font-medium text-blue-900 dark:text-blue-100">
                          {selectedRole}
                          <button onClick={() => setSelectedRole('all')}>
                            <X size={12} />
                          </button>
                        </span>
                      )}
                    </div>
                  </div>
                )}
                
                {/* Era Filter */}
                <div className="space-y-2">
                  <label htmlFor="mobile-era-filter" className="flex items-center gap-2 text-sm font-bold text-navy-800 dark:text-navy-100">
                    <Layers className="w-4 h-4 text-burgundy-600" />
                    Filter by Era
                  </label>
                  <div className="relative">
                    <select
                      id="mobile-era-filter"
                      className="w-full appearance-none p-3 pr-10 text-sm font-medium rounded-xl border-2 border-gray-300 bg-white dark:bg-navy-800 dark:border-navy-600 dark:text-navy-100 focus:border-burgundy-500 focus:outline-none"
                      value={selectedEra}
                      onChange={(e) => setSelectedEra(e.target.value)}
                    >
                      <option value="all">All Eras</option>
                      {eras.map(era => (
                        <option key={era.id} value={era.id}>
                          {era.name} ({era.startYear}-{era.endYear})
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-navy-400 pointer-events-none" />
                  </div>
                </div>
                
                {/* Role Filter */}
                <div className="space-y-2">
                  <label htmlFor="mobile-role-filter" className="flex items-center gap-2 text-sm font-bold text-navy-800 dark:text-navy-100">
                    <User className="w-4 h-4 text-burgundy-600" />
                    Filter by Role
                  </label>
                  <div className="relative">
                    <select
                      id="mobile-role-filter"
                      className="w-full appearance-none p-3 pr-10 text-sm font-medium rounded-xl border-2 border-gray-300 bg-white dark:bg-navy-800 dark:border-navy-600 dark:text-navy-100 focus:border-burgundy-500 focus:outline-none"
                      value={selectedRole}
                      onChange={(e) => setSelectedRole(e.target.value)}
                    >
                      <option value="all">All Roles</option>
                      {roles.map(role => (
                        <option key={role} value={role}>
                          {role}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-navy-400 pointer-events-none" />
                  </div>
                </div>
                
                {/* Search */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-bold text-navy-800 dark:text-navy-100">
                    <Search className="w-4 h-4 text-burgundy-600" />
                    Search by Name
                  </label>
                  <SearchBox placeholder="Type to search..." />
                </div>
                
                {/* Apply Button */}
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="w-full bg-gradient-to-r from-burgundy-600 to-burgundy-700 hover:from-burgundy-700 hover:to-burgundy-800 text-white font-bold py-3.5 rounded-xl shadow-lg hover:shadow-xl transition-all"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        )}
        
        {/* Results Section */}
        {filteredFigures.length === 0 ? (
          <div className="text-center py-12 sm:py-16">
            <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-navy-700 dark:to-navy-600 rounded-2xl flex items-center justify-center shadow-inner">
              <Users className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400 dark:text-navy-400" />
            </div>
            <p className="text-base sm:text-lg font-bold text-navy-700 dark:text-navy-200 mb-2">No figures found</p>
            <p className="text-xs sm:text-sm text-navy-600 dark:text-navy-300 mb-6">
              Try adjusting your filters to see more results
            </p>
            <button
              className="px-6 py-3 bg-gradient-to-r from-burgundy-600 to-burgundy-700 hover:from-burgundy-700 hover:to-burgundy-800 text-white rounded-xl shadow-lg hover:shadow-xl transition-all font-bold text-sm sm:text-base"
              onClick={handleResetFilters}
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-burgundy-100 dark:bg-burgundy-900/30 rounded-lg flex items-center justify-center">
                  <Users size={16} className="text-burgundy-600 dark:text-burgundy-400" />
                </div>
                <span className="text-xs sm:text-sm font-bold text-navy-700 dark:text-navy-200">
                  {filteredFigures.length} {filteredFigures.length === 1 ? 'Figure' : 'Figures'}
                </span>
              </div>
            </div>
            
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