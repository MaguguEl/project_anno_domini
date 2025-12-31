import React from 'react';
import { useData } from '../context/DataContext';
import EraCard from '../components/EraCard';

const ErasPage: React.FC = () => {
  const { eras, getEnhancedEras, getEraTimelineColor } = useData();
  const enhancedEras = getEnhancedEras();
  
  return (
    <div className="min-h-screen pb-12">
      <div className="bg-burgundy-800 text-white py-12">
        <div className="container-max">
          <div>
            <h1 className="text-4xl font-serif mb-4">Eras</h1>
            <p className="text-base text-burgundy-100 max-w-3xl">
              Explore the major periods of Church history as categorized in Philip Schaff's 
              comprehensive volumes, from the apostolic age to the modern church.
            </p>
          </div>
        </div>
      </div>
      
      <div className="container-max py-8">
        <div className="space-y-16">
          {/* Timeline Overview Graphic */}
          <div className="rounded-lg shadow-md p-6" style={{ backgroundColor: 'var(--global-bg-secondary)' }}>
            <h2 className="text-2xl font-serif mb-6 text-navy-800 dark:text-navy-100">
              Church History Timeline
            </h2>
            <div className="relative h-24 bg-navy-50 dark:bg-navy-700 rounded-md overflow-hidden">
              {enhancedEras.map((era, index) => (
                <div 
                  key={era.id}
                  className="absolute top-0 h-full flex items-center justify-center text-xs md:text-sm font-medium overflow-hidden hover:scale-105 transition-transform duration-300"
                  style={{
                    left: `${era.timelinePosition.startPercent}%`,
                    width: `${era.timelinePosition.widthPercent}%`,
                    backgroundColor: getEraTimelineColor(index),
                    color: 'white',
                    cursor: 'pointer'
                  }}
                  title={`${era.name} (${era.startYear}-${era.endYear})`}
                >
                  <span className="truncate px-2">
                    {era.name}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-2 text-xs text-navy-600 dark:text-navy-300">
              <span>1 CE</span>
              <span>500</span>
              <span>1000</span>
              <span>1500</span>
              <span>2000</span>
              <span>2025</span>
            </div>
          </div>
          
          {/* Detailed Era Cards */}
          <div>
            <h2 className="text-2xl font-serif mb-6 text-navy-800 dark:text-navy-100">
              ExploreEras
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {eras.map((era, index) => (
                <EraCard 
                  key={era.id} 
                  era={era} 
                  index={index}
                />
              ))}
            </div>
          </div>
          
          {/* Era Legend */}
          <div className="rounded-lg shadow-md p-6" style={{ backgroundColor: 'var(--global-bg-secondary)' }}>
            <h3 className="text-lg font-serif mb-4 text-navy-800 dark:text-navy-100">
              Era Color Legend
            </h3>
            <div className="flex flex-wrap gap-4">
              {eras.map((era, index) => (
                <div key={era.id} className="flex items-center gap-2">
                  <div 
                    className="w-4 h-4 rounded"
                    style={{ backgroundColor: getEraTimelineColor(index) }}
                  />
                  <span className="text-sm text-navy-600 dark:text-navy-300">
                    {era.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErasPage;