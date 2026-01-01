import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import FigureCard from '../../components/ui/FigureCard';
import SearchBox from '../../components/ui/SearchBox';
import { Filter } from 'lucide-react';

const FiguresPage: React.FC = () => {
  const { eras, figures, getFiguresByEra } = useData();
  const [selectedEra, setSelectedEra] = useState<string>('all');
  const [selectedRole, setSelectedRole] = useState<string>('all');
  
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
  
  return (
    <div className="min-h-screen pb-12">
      <div className="bg-burgundy-800 dark:bg-burgundy-900 text-white py-8 md:py-12">
        <div className="container-max px-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-serif mb-3 md:mb-4">Church Fathers</h1>
            <p className="text-sm md:text-base text-burgundy-100 max-w-3xl">
              Explore the lives and legacies of church fathers who shaped the 
              course of Christian history, from apostles to reformers.
            </p>
          </div>
        </div>
      </div>
      
      <div className="container-max py-6 px-4">
        {/* Filter Section */}
        <div className="mb-6 border-l-4 border-burgundy-700 dark:border-burgundy-300 bg-white dark:bg-navy-800 p-4 md:p-6">
          <div className="flex items-center gap-2 mb-3 md:mb-4">
            <Filter className="w-4 h-4 md:w-5 md:h-5 text-burgundy-700 dark:text-burgundy-300" />
            <h2 className="text-lg md:text-xl font-serif text-navy-800 dark:text-navy-100">
              Filter Historical Figures
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {/* Era filter */}
            <div>
              <label htmlFor="era-filter" className="block text-xs md:text-sm font-medium text-navy-600 dark:text-navy-300 mb-1 md:mb-2">
                Filter by Era
              </label>
              <select
                id="era-filter"
                className="w-full p-2 md:p-3 text-sm rounded-md border-2 border-navy-200 bg-white dark:bg-navy-700 dark:border-navy-600 dark:text-navy-100 focus:border-burgundy-500 focus:outline-none"
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
            </div>
            
            {/* Role filter */}
            <div>
              <label htmlFor="role-filter" className="block text-xs md:text-sm font-medium text-navy-600 dark:text-navy-300 mb-1 md:mb-2">
                Filter by Role
              </label>
              <select
                id="role-filter"
                className="w-full p-2 md:p-3 text-sm rounded-md border-2 border-navy-200 bg-white dark:bg-navy-700 dark:border-navy-600 dark:text-navy-100 focus:border-burgundy-500 focus:outline-none"
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
            </div>
            
            {/* Search */}
            <div>
              <label className="block text-xs md:text-sm font-medium text-navy-600 dark:text-navy-300 mb-1 md:mb-2">
                Search Figures
              </label>
              <SearchBox placeholder="Search by name..." />
            </div>
          </div>
        </div>
        
        {filteredFigures.length === 0 ? (
          <div className="text-center py-8 md:py-12 text-navy-600 dark:text-navy-300">
            <p className="text-sm md:text-base">No figures found with the selected filters.</p>
            <button
              className="mt-3 md:mt-4 px-3 md:px-4 py-1.5 md:py-2 text-sm text-burgundy-700 bg-burgundy-50 hover:bg-burgundy-100 rounded-md transition-colors dark:bg-navy-700 dark:text-burgundy-300 dark:hover:bg-navy-600"
              onClick={() => {
                setSelectedEra('all');
                setSelectedRole('all');
              }}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <>
            <div className="text-xs md:text-sm text-navy-600 dark:text-navy-300 mb-3 md:mb-4">
              Displaying {filteredFigures.length} figures
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 md:gap-6">
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