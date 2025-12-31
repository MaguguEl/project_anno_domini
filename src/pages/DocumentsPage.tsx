import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import DocumentCard from '../components/DocumentCard';
import SearchBox from '../components/SearchBox';

const DocumentsPage: React.FC = () => {
  const { eras, documents, getDocumentsByEra } = useData();
  const [selectedEra, setSelectedEra] = useState<string>('all');
  
  // Get documents based on era selection
  const getFilteredDocumentsByEra = () => {
    if (selectedEra === 'all') {
      return documents;
    }
    return getDocumentsByEra(selectedEra);
  };
  
  const filteredDocuments = getFilteredDocumentsByEra()
    .sort((a, b) => a.year - b.year);
  
  return (
    <div className="min-h-screen pb-12">
      <div className="bg-navy-800 text-white py-12">
        <div className="container-max">
          <div>
            <h1 className="text-4xl font-serif mb-4">
              Documents & Texts
            </h1>
            <p className="text-base text-navy-200 max-w-3xl">
              Explore the foundational texts, creeds, and significant writings 
              that shaped Christian theology and church practice throughout history.
            </p>
          </div>
        </div>
      </div>
      
      <div className="container-max py-8">
        <div className="rounded-lg shadow-md p-6 mb-8" style={{ backgroundColor: 'var(--global-bg-secondary)' }}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <h2 className="text-xl font-serif mb-4 text-navy-800 dark:text-navy-100">
                Filter Documents
              </h2>
              
              <div>
                <label htmlFor="era-filter" className="block text-sm font-medium text-navy-600 dark:text-navy-300 mb-2">
                  Filter by Era
                </label>
                <select
                  id="era-filter"
                  className="w-full sm:w-2/3 p-2 rounded-md border border-navy-200 bg-white dark:bg-navy-700 dark:border-navy-600 dark:text-navy-100"
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
            </div>
            
            <div>
              <label className="block text-sm font-medium text-navy-600 dark:text-navy-300 mb-2">
                Search Documents
              </label>
              <SearchBox placeholder="Search by title or author..." />
            </div>
          </div>
        </div>
        
        {filteredDocuments.length === 0 ? (
          <div className="text-center py-12 text-navy-600 dark:text-navy-300">
            <p>No documents found with the selected filters.</p>
            <button
              className="mt-4 px-4 py-2 text-burgundy-700 bg-burgundy-50 hover:bg-burgundy-100 rounded-md transition-colors dark:bg-navy-700 dark:text-burgundy-300 dark:hover:bg-navy-600"
              onClick={() => setSelectedEra('all')}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <>
            <div className="text-sm text-navy-600 dark:text-navy-300 mb-4">
              Displaying {filteredDocuments.length} documents
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDocuments.map((document, index) => (
                <DocumentCard key={document.id} document={document} index={index} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DocumentsPage;