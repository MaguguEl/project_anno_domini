import React from 'react';
import { Link } from 'react-router-dom';
import { Figure } from '../../types';
import { formatLifespan } from '../../utils/dateUtils';
import { useData } from '../../context/DataContext';
import { Calendar, MapPin, BookOpen, Star } from 'lucide-react';

interface FigureCardProps {
  figure: Figure;
  index?: number;
}

const FigureCard: React.FC<FigureCardProps> = ({ figure, index = 0 }) => {
  const { eras, getEraTimelineColor } = useData();

  // Find the era object for this figure
  const figureEra = eras.find(era => era.id === figure.era);
  
  // Get timeline color based on index or era ID
  const getTimelineColor = () => {
    if (figureEra) {
      // Find the index of the era in the eras array
      const eraIndex = eras.findIndex(era => era.id === figure.era);
      return getEraTimelineColor(eraIndex);
    }
    return '#6B7280'; // Default gray if era not found
  };

  // Get era display name
  const getEraName = () => {
    switch (figure.era) {
      case 'apostolic':
        return 'Apostolic Era';
      case 'ante-nicene':
        return 'Ante-Nicene';
      case 'nicene':
        return 'Nicene Era';
      case 'medieval':
        return 'Medieval';
      case 'reformation':
        return 'Reformation';
      case 'modern':
        return 'Modern';
      default:
        return 'Unknown Era';
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

  // Get influence level based on roles and influence
  const getInfluenceLevel = () => {
    const roleCount = figure.roles.length;
    const hasMultipleRoles = roleCount >= 2;
    const hasKeyRole = figure.roles.some(role => 
      ['Apostle', 'Reformer', 'Theologian', 'Pope', 'Emperor', 'Saint', 'Martyr'].includes(role)
    );
    const hasMajorWritings = figure.documents && figure.documents.length > 0;
    const hasQuotes = figure.quotes && figure.quotes.length > 0;

    let influenceScore = 0;
    if (hasMultipleRoles) influenceScore += 1;
    if (hasKeyRole) influenceScore += 2;
    if (hasMajorWritings) influenceScore += 1;
    if (hasQuotes) influenceScore += 1;
    if (figure.influence && figure.influence.length > 100) influenceScore += 1;

    if (influenceScore >= 5) return 'Legendary';
    if (influenceScore >= 4) return 'Profound';
    if (influenceScore >= 3) return 'Significant';
    if (influenceScore >= 2) return 'Notable';
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

  // Get rarity stars based on influence
  const getRarityStars = () => {
    const influenceLevel = getInfluenceLevel();
    switch (influenceLevel) {
      case 'Legendary': return 5;
      case 'Profound': return 4;
      case 'Significant': return 3;
      case 'Notable': return 2;
      default: return 1;
    }
  };

  const rarity = getRarityStars();
  const eraColor = getTimelineColor();
  const eraName = getEraName();
  const collection = getCollection();
  const roleIcon = getRoleIcon();

  return (
    <Link to={`/figures/${figure.id}`}>
      <div 
        className="relative rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 border-gray-200 bg-parchment group"
      >
        {/* Centered Rarity Stars */}
        <div className="absolute top-2 left-1/2 transform -translate-x-1/2 z-10 flex gap-0.5">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className={`w-1.5 h-1.5 rounded-full ${
                i < rarity 
                  ? 'bg-gradient-to-br from-yellow-500 to-amber-700 shadow-sm' 
                  : 'bg-gray-300/50'
              }`}
            />
          ))}
        </div>    

        {/* Image Section */}
        <div className="relative mt-6 mx-3 mb-2 rounded-md overflow-hidden shadow-inner border border-gray-300/50" style={{ aspectRatio: '3/4' }}>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/40 z-10"></div>
          <img 
            src={figure.image} 
            alt={figure.name}
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              e.currentTarget.src = 'https://via.placeholder.com/300x400?text=Church+Father';
            }}
          />
        </div>

        {/* Info Section */}
        <div className="relative px-3 pb-3 pt-2 border-t border-gray-300/30 bg-parchment-light">
          {/* Name Banner */}
          <div className="mb-2 pb-2 border-b border-gray-300/50">
            <h3 className="text-sm font-serif text-gray-dark font-bold leading-tight truncate">
              {figure.name}
            </h3>
            {figure.roles[0] && (
              <p className="text-xs text-gray-medium font-medium mt-0.5 truncate">
                {figure.roles[0]}
              </p>
            )}
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-2 mb-2 text-[10px]">
            {/* Left Column */}
            <div className="space-y-1">
              <div className="flex items-start gap-1">
                <Calendar className="w-2.5 h-2.5 text-gray-medium mt-0.5 flex-shrink-0" />
                <div className="min-w-0">
                  <div className="text-gray-light font-medium truncate">Era:</div>
                  <div 
                    className="text-gray-dark font-semibold leading-tight truncate"
                    style={{ color: eraColor }}
                  >
                    {eraName}
                  </div>
                </div>
              </div>
              
              <div className="flex items-start gap-1">
                <BookOpen className="w-2.5 h-2.5 text-gray-medium mt-0.5 flex-shrink-0" />
                <div className="min-w-0">
                  <div className="text-gray-light font-medium truncate">Lifespan:</div>
                  <div className="text-gray-dark font-semibold leading-tight truncate">
                    {formatLifespan(figure.birthYear, figure.deathYear)}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-1">
              <div className="flex items-start gap-1">
                <MapPin className="w-2.5 h-2.5 text-gray-medium mt-0.5 flex-shrink-0" />
                <div className="min-w-0">
                  <div className="text-gray-light font-medium truncate">Location:</div>
                  <div className="text-gray-dark font-semibold leading-tight truncate">
                    {figure.location}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-1">
                <Star className="w-2.5 h-2.5 text-gray-medium mt-0.5 flex-shrink-0" />
                <div className="min-w-0">
                  <div className="text-gray-light font-medium truncate">Influence:</div>
                  <div className="text-gray-dark font-semibold leading-tight truncate">
                    {getInfluenceLevel()}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Role Icon */}
          <div className="absolute bottom-2 right-2">
            <div 
              className="w-8 h-8 rounded-full flex items-center justify-center shadow text-white text-xs font-bold border border-white/30"
              style={{ 
                backgroundColor: eraColor,
                backgroundImage: `linear-gradient(135deg, ${eraColor} 0%, ${eraColor}80 100%)`
              }}
            >
              {roleIcon}
            </div>
          </div>
        </div>

        {/* Decorative Bottom Border */}
        <div 
          className="h-1"
          style={{ 
            background: `linear-gradient(90deg, ${eraColor}40 0%, ${eraColor} 50%, ${eraColor}40 100%)`
          }}
        ></div>
      </div>
    </Link>
  );
};

export default FigureCard;