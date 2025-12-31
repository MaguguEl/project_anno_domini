import React from 'react';
import { Link } from 'react-router-dom';
import { Figure } from '../types';
import { formatLifespan } from '../utils/dateUtils';
import { Calendar, MapPin, BookOpen, Award } from 'lucide-react';

interface FigureCardProps {
  figure: Figure;
  index?: number;
}

const FigureCard: React.FC<FigureCardProps> = ({ figure, index = 0 }) => {
  // Get era display name and color
  const getEraDisplay = () => {
    switch (figure.era) {
      case 'apostolic':
        return { name: 'Apostolic Era', color: 'bg-red-500', borderColor: 'border-red-500' };
      case 'ante-nicene':
        return { name: 'Ante-Nicene Era', color: 'bg-green-500', borderColor: 'border-green-500' };
      case 'nicene':
        return { name: 'Nicene & Post-Nicene', color: 'bg-blue-500', borderColor: 'border-blue-500' };
      case 'medieval':
        return { name: 'Medieval Period', color: 'bg-yellow-500', borderColor: 'border-yellow-500' };
      case 'reformation':
        return { name: 'Reformation Era', color: 'bg-purple-500', borderColor: 'border-purple-500' };
      case 'modern':
        return { name: 'Modern Era', color: 'bg-gray-500', borderColor: 'border-gray-500' };
      default:
        return { name: 'Unknown Era', color: 'bg-gray-400', borderColor: 'border-gray-400' };
    }
  };

  // Get collection based on era
  const getCollection = () => {
    switch (figure.era) {
      case 'apostolic':
        return 'Apostolic Fathers';
      case 'ante-nicene':
        return 'Early Church Fathers';
      case 'nicene':
        return 'Nicene Fathers';
      case 'medieval':
        return 'Medieval Church';
      case 'reformation':
        return 'Reformation Figures';
      case 'modern':
        return 'Modern Church';
      default:
        return 'Christian History';
    }
  };

  // Get impact level based on roles and influence
  const getImpactLevel = () => {
    const roleCount = figure.roles.length;
    const hasMultipleRoles = roleCount >= 2;
    const hasKeyRole = figure.roles.some(role => 
      ['Apostle', 'Reformer', 'Theologian', 'Pope', 'Emperor', 'Saint', 'Martyr'].includes(role)
    );
    const hasMajorWritings = figure.documents && figure.documents.length > 0;
    const hasQuotes = figure.quotes && figure.quotes.length > 0;

    let impactScore = 0;
    if (hasMultipleRoles) impactScore += 1;
    if (hasKeyRole) impactScore += 2;
    if (hasMajorWritings) impactScore += 1;
    if (hasQuotes) impactScore += 1;
    if (figure.influence && figure.influence.length > 100) impactScore += 1;

    if (impactScore >= 5) return 'Legendary';
    if (impactScore >= 4) return 'Profound';
    if (impactScore >= 3) return 'Significant';
    if (impactScore >= 2) return 'Notable';
    return 'Historical';
  };

  // Get role icon based on primary role
  const getRoleIcon = () => {
    const primaryRole = figure.roles[0]?.toLowerCase() || '';
    
    if (primaryRole.includes('apostle') || primaryRole.includes('missionary')) return 'AP';
    if (primaryRole.includes('bishop') || primaryRole.includes('pope') || primaryRole.includes('archbishop')) return 'BP';
    if (primaryRole.includes('theologian') || primaryRole.includes('scholar') || primaryRole.includes('professor')) return 'TH';
    if (primaryRole.includes('martyr')) return 'MT';
    if (primaryRole.includes('reformer')) return 'RF';
    if (primaryRole.includes('monk') || primaryRole.includes('friar')) return 'MN';
    if (primaryRole.includes('king') || primaryRole.includes('emperor') || primaryRole.includes('ruler')) return 'KG';
    if (primaryRole.includes('historian') || primaryRole.includes('chronicler')) return 'HS';
    if (primaryRole.includes('preacher') || primaryRole.includes('evangelist')) return 'PR';
    
    return 'CH';
  };

  // Get rarity stars based on impact
  const getRarityStars = () => {
    const impactLevel = getImpactLevel();
    switch (impactLevel) {
      case 'Legendary': return 5;
      case 'Profound': return 4;
      case 'Significant': return 3;
      case 'Notable': return 2;
      default: return 1;
    }
  };

  const rarity = getRarityStars();
  const eraInfo = getEraDisplay();
  const collection = getCollection();
  const roleIcon = getRoleIcon();

  return (
    <Link to={`/figures/${figure.id}`}>
      <div 
        className="relative rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-gray-50 via-white to-gray-50 border-2 border-gray-300"
      >
        {/* Rarity Stars */}
        <div className="absolute top-2 left-1/2 transform -translate-x-1/2 z-10 flex gap-0.5">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className={`w-1.5 h-1.5 rounded-full ${
                i < rarity 
                  ? 'bg-gradient-to-br from-yellow-400 to-amber-600' 
                  : 'bg-gray-300'
              }`}
            />
          ))}
        </div>    

        {/* Image Section */}
        <div className="relative mt-6 mx-3 mb-2 rounded-md overflow-hidden" style={{ aspectRatio: '3/4' }}>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/60 z-10"></div>
          <img 
            src={figure.image} 
            alt={figure.name}
            className="object-cover w-full h-full"
            onError={(e) => {
              e.currentTarget.src = 'https://via.placeholder.com/300x400?text=Church+Father';
            }}
          />
          {/* Inner Frame Border */}
          <div className="absolute inset-1 border border-white/20 rounded-md pointer-events-none z-20"></div>
        </div>

        {/* Info Section */}
        <div 
          className="relative px-3 pb-3 bg-gradient-to-b from-gray-50 to-gray-100 border-t border-gray-300"
        >
          {/* Name Banner */}
          <div className="mb-2 pb-1 border-b border-gray-400/30">
            <h3 className="text-sm font-serif text-gray-800 font-bold leading-tight truncate">
              {figure.name}
            </h3>
            {figure.roles[0] && (
              <p className="text-xs text-gray-600 font-medium mt-0.5 truncate">
                {figure.roles[0]}
              </p>
            )}
          </div>

          {/* Stats Grid - Now 2x2 layout */}
          <div className="grid grid-cols-2 gap-2 mb-2 text-[10px]">
            {/* Left Column */}
            <div className="space-y-1">
              <div className="flex items-start gap-1">
                <Calendar className="w-2.5 h-2.5 text-gray-600 mt-0.5 flex-shrink-0" />
                <div className="min-w-0">
                  <div className="text-gray-500 font-medium truncate">Era:</div>
                  <div className="text-gray-800 font-semibold leading-tight truncate">
                    {eraInfo.name}
                  </div>
                </div>
              </div>
              
              <div className="flex items-start gap-1">
                <BookOpen className="w-2.5 h-2.5 text-gray-600 mt-0.5 flex-shrink-0" />
                <div className="min-w-0">
                  <div className="text-gray-500 font-medium truncate">Lifespan:</div>
                  <div className="text-gray-800 font-semibold leading-tight truncate">
                    {formatLifespan(figure.birthYear, figure.deathYear)}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-1">
              <div className="flex items-start gap-1">
                <MapPin className="w-2.5 h-2.5 text-gray-600 mt-0.5 flex-shrink-0" />
                <div className="min-w-0">
                  <div className="text-gray-500 font-medium truncate">Location:</div>
                  <div className="text-gray-800 font-semibold leading-tight truncate">
                    {figure.location}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-1">
                <BookOpen className="w-2.5 h-2.5 text-gray-600 mt-0.5 flex-shrink-0" />
                <div className="min-w-0">
                  <div className="text-gray-500 font-medium truncate">Collection:</div>
                  <div className="text-gray-800 font-semibold leading-tight truncate">
                    {collection}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Role Icon */}
          <div className="absolute bottom-2 right-2">
            <div className="w-8 h-8 bg-gradient-to-br from-gray-500 to-gray-700 rounded-full flex items-center justify-center shadow text-white text-sm font-bold">
              {roleIcon}
            </div>
          </div>
        </div>

        {/* Decorative Bottom Border with era color */}
        <div className={`h-0.5 ${eraInfo.color.replace('bg-', 'bg-gradient-to-r from-').replace('500', '400')} via-${eraInfo.color.replace('bg-', '').replace('500', '500')} to-${eraInfo.color.replace('bg-', '').replace('500', '600')}`}></div>
      </div>
    </Link>
  );
};

export default FigureCard;