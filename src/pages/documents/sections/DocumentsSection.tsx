import React from 'react';
import { useData } from '../../../context/DataContext';
import DocumentCard from '../../../components/ui/DocumentCard';
import { Layers, Search, FileText } from 'lucide-react';
import DesktopFilterPanel from '../../../components/filters/DesktopFilterPanel';
import MobileFilterToggle from '../../../components/filters/MobileFilterToggle';
import MobileFilterDrawer from '../../../components/filters/MobileFilterDrawer';
import EmptyState from '../../../components/filters/EmptyState';
import ResultsHeader from '../../../components/filters/ResultsHeader';
import { useFilters } from '../../../hooks/useFilters';

const DocumentsSection: React.FC = () => {
  const { eras, documents, getDocumentsByEra } = useData();
  
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
      search: ''
    }
  });
  
  // Apply filters
const filteredDocuments = (filters.era === 'all' ? documents : getDocumentsByEra(filters.era))
  .filter(doc => {
    if (filters.search) {
      const query = filters.search.toLowerCase();
      return (
        doc.title.toLowerCase().includes(query) ||
        doc.author.toLowerCase().includes(query) ||
        (doc.summary && doc.summary.toLowerCase().includes(query)) 
      );
    }
    return true;
  })
  .sort((a, b) => a.year - b.year);
  
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
      placeholder: 'Search by title or author...'
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
    }
  ];

  // Active filter tags for mobile drawer
  const activeFilterTags = [
    filters.era !== 'all' && {
      label: eras.find(e => e.id === filters.era)?.name || '',
      onRemove: () => updateFilter('era', 'all')
    }
  ].filter(Boolean) as { label: string; onRemove: () => void }[];
  
  return (
    <>
      {/* Mobile Filter Toggle */}
      <MobileFilterToggle
        activeFiltersCount={activeFiltersCount}
        resultsCount={filteredDocuments.length}
        onToggle={toggleMobileFilters}
        accentGradient="from-navy-600 to-navy-700"
      />
      
      <div className="container-max py-3 sm:py-4 md:py-6 px-3 sm:px-4">
        {/* Desktop Filter Panel */}
        <div className="hidden md:block mb-6">
          <DesktopFilterPanel
            filters={filterConfigs}
            activeFiltersCount={activeFiltersCount}
            onResetFilters={resetFilters}
            resultsCount={filteredDocuments.length}
            accentColor="navy"
          />
        </div>
        
        {/* Mobile Filter Drawer */}
        <MobileFilterDrawer
          isOpen={mobileFiltersOpen}
          onClose={() => setMobileFiltersOpen(false)}
          filters={filterConfigs}
          activeFiltersCount={activeFiltersCount}
          onResetFilters={resetFilters}
          resultsCount={filteredDocuments.length}
          accentGradient="from-navy-700 to-navy-800"
          activeFilterTags={activeFilterTags}
        />
        
        {/* Results */}
        {filteredDocuments.length === 0 ? (
          <EmptyState
            icon={FileText}
            title="No documents found"
            description="Try adjusting your filters"
            onReset={resetFilters}
            accentGradient="from-navy-600 to-navy-700"
          />
        ) : (
          <>
            <ResultsHeader
              icon={FileText}
              count={filteredDocuments.length}
              singularLabel="Document"
              pluralLabel="Documents"
              accentColor="navy"
            />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
              {filteredDocuments.map((document, index) => (
                <DocumentCard key={document.id} document={document} index={index} />
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default DocumentsSection;