import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import FigureCard from '../components/FigureCard';
import SearchBox from '../components/SearchBox';

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
      <div className="bg-burgundy-800 dark:bg-burgundy-900 text-white py-12">
        <div className="container-max">
          <div>
            <h1 className="text-4xl font-serif mb-4">Church Fathers</h1>
            <p className="text-base text-burgundy-100 max-w-3xl">
              Explore the lives and legacies of church fathers who shaped the 
              course of Christian history, from apostles to reformers.
            </p>
          </div>
        </div>
      </div>
      
      <div className="container-max py-8">
        <div className="rounded-lg shadow-md p-6 mb-8" style={{ backgroundColor: 'var(--global-bg-secondary)' }}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <h2 className="text-xl font-serif mb-4 text-navy-800 dark:text-navy-100">
                Filter Historical Figures
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Era filter */}
                <div>
                  <label htmlFor="era-filter" className="block text-sm font-medium text-navy-600 dark:text-navy-300 mb-2">
                    Filter by Era
                  </label>
                  <select
                    id="era-filter"
                    className="w-full p-2 rounded-md border border-navy-200 bg-white dark:bg-navy-700 dark:border-navy-600 dark:text-navy-100"
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
                  <label htmlFor="role-filter" className="block text-sm font-medium text-navy-600 dark:text-navy-300 mb-2">
                    Filter by Role
                  </label>
                  <select
                    id="role-filter"
                    className="w-full p-2 rounded-md border border-navy-200 bg-white dark:bg-navy-700 dark:border-navy-600 dark:text-navy-100"
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
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-navy-600 dark:text-navy-300 mb-2">
                Search Figures
              </label>
              <SearchBox placeholder="Search by name..." />
            </div>
          </div>
        </div>
        
        {filteredFigures.length === 0 ? (
          <div className="text-center py-12 text-navy-600 dark:text-navy-300">
            <p>No figures found with the selected filters.</p>
            <button
              className="mt-4 px-4 py-2 text-burgundy-700 bg-burgundy-50 hover:bg-burgundy-100 rounded-md transition-colors dark:bg-navy-700 dark:text-burgundy-300 dark:hover:bg-navy-600"
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
            <div className="text-sm text-navy-600 dark:text-navy-300 mb-4">
              Displaying {filteredFigures.length} figures
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredFigures.map((figure, index) => (
                <FigureCard key={figure.id} figure={figure} index={index} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default FiguresPage;