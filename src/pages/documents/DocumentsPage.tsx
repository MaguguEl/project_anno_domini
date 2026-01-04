import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import DocumentsSection from './sections/DocumentsSection';
import SourcesSection from './sections/SourcesSection';
import { FileText, Library, BookOpen, Layers } from 'lucide-react';

const DocumentsPage: React.FC = () => {
  const { eras, documents, federatedSources } = useData();
  const location = useLocation();
  const navigate = useNavigate();
  
  // Determine active tab based on URL path
  const [activeTab, setActiveTab] = useState<'documents' | 'sources'>(
    location.pathname.startsWith('/sources') ? 'sources' : 'documents'
  );
  
  // Update active tab when location changes
  useEffect(() => {
    setActiveTab(location.pathname.startsWith('/sources') ? 'sources' : 'documents');
  }, [location.pathname]);
  
  const totalSources = federatedSources.length;
  
  return (
    <div className="bg-slate-50 min-h-screen pb-6 sm:pb-8 md:pb-12">
      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-navy-800 via-navy-900 to-navy-950 dark:from-navy-900 dark:via-navy-950 dark:to-black">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 sm:w-48 sm:h-48 bg-gold-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 sm:w-56 sm:h-56 bg-navy-400 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative container-max px-3 sm:px-4 py-6 sm:py-8 md:py-12 lg:py-16">
          <div className="max-w-4xl">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-white mb-2 sm:mb-3 md:mb-4 leading-tight">
              Library & Resources
            </h1>
            <p className="text-xs sm:text-sm md:text-base text-navy-100 leading-relaxed max-w-3xl">
              Explore foundational texts, creeds, confessions, and curated external sources. 
              Access sacred documents, digital libraries, and historical archives.
            </p>
            
            <div className="flex flex-wrap gap-3 sm:gap-4 md:gap-6 mt-4 sm:mt-6 md:mt-8">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center">
                  <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <div>
                  <div className="text-lg sm:text-xl md:text-2xl font-bold text-white">{documents.length}</div>
                  <div className="text-xs text-navy-200">Documents</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center">
                  <Library className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <div>
                  <div className="text-lg sm:text-xl md:text-2xl font-bold text-white">{totalSources.toLocaleString()}+</div>
                  <div className="text-xs text-navy-200">External Sources</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center">
                  <Layers className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <div>
                  <div className="text-lg sm:text-xl md:text-2xl font-bold text-white">{eras.length}</div>
                  <div className="text-xs text-navy-200">Eras</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="sticky top-0 z-30 bg-white dark:bg-navy-800 border-b-2 border-gray-200 dark:border-navy-700 shadow-md">
        <div className="container-max px-3 sm:px-4">
          <div className="flex gap-1">
            <button
              onClick={() => navigate('/documents')}
              className={`flex items-center gap-2 px-4 sm:px-6 py-3 sm:py-4 font-bold text-sm sm:text-base transition-all ${
                activeTab === 'documents'
                  ? 'text-navy-700 dark:text-white border-b-4 border-navy-700 dark:border-gold-400'
                  : 'text-navy-500 dark:text-navy-400 hover:text-navy-700 dark:hover:text-navy-200'
              }`}
            >
              <FileText className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Sacred Texts</span>
            </button>
            <button
              onClick={() => navigate('/sources')}
              className={`flex items-center gap-2 px-4 sm:px-6 py-3 sm:py-4 font-bold text-sm sm:text-base transition-all ${
                activeTab === 'sources'
                  ? 'text-navy-700 dark:text-white border-b-4 border-navy-700 dark:border-gold-400'
                  : 'text-navy-500 dark:text-navy-400 hover:text-navy-700 dark:hover:text-navy-200'
              }`}
            >
              <Library className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>External Sources</span>
            </button>
          </div>
        </div>
      </div>
      
      {/* Tab Content */}
      {activeTab === 'documents' ? <DocumentsSection /> : <SourcesSection />}
    </div>
  );
};

export default DocumentsPage;