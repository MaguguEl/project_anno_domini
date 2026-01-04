import React from 'react';
import { useData } from '../../context/DataContext';
import EraCard from '../../components/ui/EraCard';
import { Clock, Calendar } from 'lucide-react';

const ErasPage: React.FC = () => {
  const { eras, getEnhancedEras, getEraTimelineColor } = useData();
  const enhancedEras = getEnhancedEras();
  
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pb-6 sm:pb-8 md:pb-12">
      {/* Header */}
      <div className="relative bg-gradient-to-br from-burgundy-900 via-burgundy-800 to-burgundy-950 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 sm:w-48 sm:h-48 bg-gold-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 sm:w-56 sm:h-56 bg-burgundy-400 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative container-max px-3 sm:px-4 py-6 sm:py-8 md:py-12 lg:py-16">
          <div className="max-w-4xl">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-white mb-2 sm:mb-3 md:mb-4 leading-tight">
              Church History Eras
            </h1>
            <p className="text-xs sm:text-sm md:text-base text-burgundy-100 leading-relaxed max-w-3xl">
              Explore the major periods that shaped the Church through two millennia of Christian history.
            </p>
            
            <div className="flex flex-wrap gap-3 sm:gap-4 md:gap-6 mt-4 sm:mt-6 md:mt-8">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center">
                  <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <div>
                  <div className="text-lg sm:text-xl md:text-2xl font-bold text-white">{eras.length}</div>
                  <div className="text-xs text-burgundy-200">Eras</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center">
                  <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <div>
                  <div className="text-lg sm:text-xl md:text-2xl font-bold text-white">2000+</div>
                  <div className="text-xs text-burgundy-200">Years</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container-max py-6">
        <div className="space-y-10">
          {/* Timeline Overview with Legend */}
          <div className="space-y-4">
            <h2 className="text-xl font-serif text-navy-800 dark:text-navy-100">
              Timeline Overview 
            </h2>
            
            {/* Timeline Graphic */}
            <div className="bg-white dark:bg-navy-800 rounded-lg shadow-sm border border-navy-200 dark:border-navy-700 p-4">
              <div className="relative h-16 bg-slate-100 dark:bg-navy-700 rounded-lg overflow-hidden shadow-inner">
                {enhancedEras.map((era, index) => (
                  <div 
                    key={era.id}
                    className="absolute top-0 h-full flex items-center justify-center text-xs font-medium overflow-hidden hover:scale-105 transition-transform duration-300 cursor-pointer"
                    style={{
                      left: `${era.timelinePosition.startPercent}%`,
                      width: `${era.timelinePosition.widthPercent}%`,
                      backgroundColor: getEraTimelineColor(index),
                      color: 'white',
                    }}
                    title={`${era.name} (${era.startYear}-${era.endYear})`}
                  >
                    <span className="truncate px-1.5">
                      {era.name}
                    </span>
                  </div>
                ))}
              </div>
              
              {/* Timeline Years */}
              <div className="flex justify-between mt-2 text-xs text-navy-600 dark:text-navy-400 font-medium">
                <span>1 CE</span>
                <span>500</span>
                <span>1000</span>
                <span>1500</span>
                <span>2000</span>
                <span>2025</span>
              </div>
              
              {/* Era Legend Colors */}
              <div className="mt-4 pt-4 border-t border-navy-200 dark:border-navy-700">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {eras.map((era, index) => (
                    <div key={era.id} className="flex items-center gap-2">
                      <div 
                        className="w-4 h-4 rounded shadow-sm flex-shrink-0"
                        style={{ backgroundColor: getEraTimelineColor(index) }}
                      />
                      <span className="text-xs text-navy-700 dark:text-navy-300 leading-tight">
                        {era.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Era Cards Grid */}
          <div>
            <div className="flex items-center gap-3 mb-4 sm:mb-6">
              <h2 className="text-xl font-serif text-navy-800 dark:text-navy-100">
                Explore Historical Eras
              </h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
              {eras.map((era, index) => (
                <div key={era.id} className="transform transition-transform hover:scale-[1.02]">
                  <EraCard era={era} index={index} />
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