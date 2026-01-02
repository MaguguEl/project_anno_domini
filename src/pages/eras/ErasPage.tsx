// ==================== ERAS PAGE ====================
import React from 'react';
import { useData } from '../../context/DataContext';
import EraCard from '../../components/ui/EraCard';
import { Clock, BookOpen, Users, Calendar } from 'lucide-react';

const ErasPage: React.FC = () => {
  const { eras, getEnhancedEras, getEraTimelineColor } = useData();
  const enhancedEras = getEnhancedEras();
  
  return (
    <div className="min-h-screen pb-6 sm:pb-8 md:pb-12">
      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-burgundy-800 via-burgundy-900 to-burgundy-950 dark:from-burgundy-900 dark:via-burgundy-950 dark:to-black">
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
              Explore the major periods that shaped the Church through two millennia of Christian history. .
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
          {/* Timeline Overview Graphic */}
          <div className="border-l-4 border-burgundy-700 dark:border-burgundy-300 bg-white dark:bg-navy-800 p-4">
            <h2 className="text-xl font-serif mb-4 text-navy-800 dark:text-navy-100">
              Church History Timeline
                  </h2>
            <div className="relative h-16 bg-navy-50 dark:bg-navy-700 rounded overflow-hidden">
                {enhancedEras.map((era, index) => (
                  <div 
                    key={era.id}
                  className="absolute top-0 h-full flex items-center justify-center text-xs font-medium overflow-hidden hover:scale-105 transition-transform duration-300"
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
            <div className="flex justify-between mt-1.5 text-xs text-navy-600 dark:text-navy-300">
                <span>1 CE</span>
              <span>500</span>
                <span>1000</span>
              <span>1500</span>
                <span>2000</span>
                <span>2025</span>
            </div>
          </div>
          
          {/* Era Cards Grid */}
          <div>
            <div className="flex items-center gap-3 mb-4 sm:mb-6">
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-navy-800 dark:text-navy-100">
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
          
          {/* Era Legend */}
          <div className="border-l-4 border-navy-700 dark:border-navy-300 bg-white dark:bg-navy-800 p-4">
            <h3 className="text-base font-serif mb-3 text-navy-800 dark:text-navy-100">
              Era Color Legend
                  </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {eras.map((era, index) => (
                <div key={era.id} className="flex items-center gap-2">
                    <div 
                    className="w-3 h-3 rounded flex-shrink-0"
                      style={{ backgroundColor: getEraTimelineColor(index) }}
                    />
                  <span className="text-xs text-navy-600 dark:text-navy-300">
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