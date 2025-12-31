import { Era, EraCharacteristics } from '../types';

export const getDefaultCharacteristics = (): EraCharacteristics => ({
  keyThemes: [],
  majorCenters: [],
  challenges: [],
  achievements: [],
  historians: [],
  extendedContext: ''
});

const eraColors: Record<string, { primary: string; secondary: string; accent: string }> = {
  'apostolic': {
    primary: '#8B0000', // Deep red
    secondary: '#B22222', // Firebrick
    accent: '#DC143C' // Crimson
  },
  'ante-nicene': {
    primary: '#2E8B57', // Sea green
    secondary: '#3CB371', // Medium sea green
    accent: '#32CD32' // Lime green
  },
  'nicene': {
    primary: '#4682B4', // Steel blue
    secondary: '#5F9EA0', // Cadet blue
    accent: '#87CEEB' // Sky blue
  },
  'medieval': {
    primary: '#8B4513', // Saddle brown
    secondary: '#A0522D', // Sienna
    accent: '#D2691E' // Chocolate
  },
  'reformation': {
    primary: '#4B0082', // Indigo
    secondary: '#483D8B', // Dark slate blue
    accent: '#6A5ACD' // Slate blue
  },
  'modern': {
    primary: '#2F4F4F', // Dark slate gray
    secondary: '#556B2F', // Dark olive green
    accent: '#808000' // Olive
  }
};

const eraImages: Record<string, { banner: string; thumbnail: string }> = {
  'apostolic': {
    banner: '/images/eras/apostolic-banner.jpg',
    thumbnail: '/images/eras/apostolic-thumb.jpg'
  },
  'ante-nicene': {
    banner: '/images/eras/antenicene-banner.jpg',
    thumbnail: '/images/eras/antenicene-thumb.jpg'
  },
  'nicene': {
    banner: '/images/eras/nicene-banner.jpg',
    thumbnail: '/images/eras/nicene-thumb.jpg'
  },
  'medieval': {
    banner: '/images/eras/medieval-banner.jpg',
    thumbnail: '/images/eras/medieval-thumb.jpg'
  },
  'reformation': {
    banner: '/images/eras/reformation-banner.jpg',
    thumbnail: '/images/eras/reformation-thumb.jpg'
  },
  'modern': {
    banner: '/images/eras/modern-banner.jpg',
    thumbnail: '/images/eras/modern-thumb.jpg'
  }
};

const eraCharacteristicsMultiLang: Record<string, Record<string, EraCharacteristics>> = {
  'apostolic': {
    'en': {
      keyThemes: ['Foundation of Christianity', 'Apostolic Authority', 'Early Evangelism', 'Persecution'],
      majorCenters: ['Jerusalem', 'Antioch', 'Rome', 'Ephesus'],
      challenges: ['Jewish-Gentile Relations', 'Roman Persecution', 'Doctrinal Disputes'],
      achievements: ['New Testament Formation', 'Church Establishment', 'Missionary Expansion'],
      historians: ['Josephus documented the Jewish context', 'Luke wrote Acts of the Apostles', 'Early church fathers preserved apostolic traditions'],
      extendedContext: 
        'The Apostolic era represents the foundational period of Christianity, marked by the direct leadership of Jesus\' apostles and the rapid spread of the gospel throughout the Roman Empire. This period saw the establishment of the first Christian communities, the writing of the New Testament, and the initial persecution of believers under Roman rule. Historians like Josephus provide crucial context for understanding the Jewish world in which Christianity emerged.'
    },
    'es': {
      keyThemes: ['Fundación del Cristianismo', 'Autoridad Apostólica', 'Evangelismo Temprano', 'Persecución'],
      majorCenters: ['Jerusalén', 'Antioquía', 'Roma', 'Éfeso'],
      challenges: ['Relaciones Judío-Gentiles', 'Persecución Romana', 'Disputas Doctrinales'],
      achievements: ['Formación del Nuevo Testamento', 'Establecimiento de la Iglesia', 'Expansión Misionera'],
      historians: ['Josefo documentó el contexto judío', 'Lucas escribió los Hechos de los Apóstoles', 'Los padres de la iglesia primitiva preservaron las tradiciones apostólicas'],
      extendedContext: 
        'La era apostólica representa el período fundacional del cristianismo, marcado por el liderazgo directo de los apóstoles de Jesús y la rápida propagación del evangelio en todo el Imperio Romano. Este período vio el establecimiento de las primeras comunidades cristianas, la escritura del Nuevo Testamento y la persecución inicial de los creyentes bajo el dominio romano. Historiadores como Josefo proporcionan un contexto crucial para comprender el mundo judío en el que surgió el cristianismo.'
    }
  },
  'ante-nicene': {
    'en': {
      keyThemes: ['Apologetics', 'Martyrdom', 'Theological Development', 'Church Organization'],
      majorCenters: ['Rome', 'Alexandria', 'Carthage', 'Antioch'],
      challenges: ['Imperial Persecution', 'Gnosticism', 'Montanism', 'Donatism'],
      achievements: ['Apostolic Fathers Writings', 'Canon Development', 'Theological Schools'],
      historians: ['Eusebius later chronicled this period', 'Justin Martyr provided apologetic accounts', 'Irenaeus documented heresies'],
      extendedContext:
        'The Ante-Nicene period witnessed Christianity\'s transformation from a small Jewish sect to a major religious movement throughout the Roman Empire. This era is documented by early church historians like Eusebius, who preserved accounts of martyrdoms, theological developments, and the church\'s struggle against various heresies and imperial persecution.'
    }
  },
};

const DEFAULT_LANGUAGE = 'en';

export const getEraCharacteristics = (
  eraId: string, 
  language: string = DEFAULT_LANGUAGE
): EraCharacteristics => {
  const eraChar = eraCharacteristicsMultiLang[eraId];
  if (!eraChar) {
    console.warn(`No characteristics found for era: ${eraId}`);
    return getDefaultCharacteristics();
  }
  
  return eraChar[language] || eraChar[DEFAULT_LANGUAGE] || getDefaultCharacteristics();
};

export const validateEraCharacteristics = (eraId: string): string[] => {
  const errors: string[] = [];
  const characteristics = getEraCharacteristics(eraId);
  
  if (characteristics.keyThemes.length === 0) {
    errors.push(`Missing keyThemes for era: ${eraId}`);
  }
  if (characteristics.majorCenters.length === 0) {
    errors.push(`Missing majorCenters for era: ${eraId}`);
  }
  if (characteristics.challenges.length === 0) {
    errors.push(`Missing challenges for era: ${eraId}`);
  }
  if (characteristics.achievements.length === 0) {
    errors.push(`Missing achievements for era: ${eraId}`);
  }
  if (characteristics.historians.length === 0) {
    errors.push(`Missing historians for era: ${eraId}`);
  }
  if (!characteristics.extendedContext) {
    errors.push(`Missing extendedContext for era: ${eraId}`);
  }
  
  return errors;
};

export const validateAllEraCharacteristics = (): Record<string, string[]> => {
  const validationResults: Record<string, string[]> = {};
  
  eras.forEach(era => {
    const errors = validateEraCharacteristics(era.id);
    if (errors.length > 0) {
      validationResults[era.id] = errors;
    }
  });
  
  return validationResults;
};

export interface EnhancedEra extends Era {
  colors: { primary: string; secondary: string; accent: string };
  images: { banner: string; thumbnail: string };
  timelinePosition: {
    startPercent: number;
    endPercent: number;
    widthPercent: number;
  };
}

const calculateTimelinePosition = (era: Era, maxYear: number = 2025) => {
  const startPercent = (era.startYear / maxYear) * 100;
  const endPercent = (era.endYear / maxYear) * 100;
  const widthPercent = endPercent - startPercent;
  
  return { startPercent, endPercent, widthPercent };
};

export const getEnhancedEra = (eraId: string): EnhancedEra | undefined => {
  const era = eras.find(e => e.id === eraId);
  if (!era) return undefined;
  
  return {
    ...era,
    colors: eraColors[eraId] || { primary: '#14213D', secondary: '#8B0000', accent: '#FCA311' },
    images: eraImages[eraId] || { banner: '', thumbnail: '' },
    timelinePosition: calculateTimelinePosition(era)
  };
};

export const getEnhancedEras = (): EnhancedEra[] => {
  return eras.map(era => ({
    ...era,
    colors: eraColors[era.id] || { primary: '#14213D', secondary: '#8B0000', accent: '#FCA311' },
    images: eraImages[era.id] || { banner: '', thumbnail: '' },
    timelinePosition: calculateTimelinePosition(era)
  }));
};

export const eras: Era[] = [
  {
    id: 'apostolic',
    name: 'Apostolic Church',
    startYear: 1,
    endYear: 100,
    volume: 1,
    description: 
      'The Apostolic era covers the foundation of Christianity from the ministry of Christ to the death of the last apostle. This period encompasses the writing of the New Testament, the spread of the early church, and the first persecutions.',
    events: [
      'pentecost',
      'jerusalem-council',
      'nero-persecution',
      'destruction-jerusalem-temple'
    ],
    figures: [
      'jesus',
      'paul',
      'peter',
      'john'
    ],
    documents: [
      'didache',
      'clement-letter-corinthians'
    ],
    characteristics: getEraCharacteristics('apostolic')
  },
  {
    id: 'ante-nicene',
    name: 'Ante-Nicene Church',
    startYear: 100,
    endYear: 325,
    volume: 2,
    description: 
      'The Ante-Nicene period extends from the apostolic age to the First Council of Nicaea. This era saw the spread of Christianity throughout the Roman Empire, the development of early theology, and significant persecutions.',
    events: [
      'diocletian-persecution',
      'edict-milan'
    ],
    figures: [
      'ignatius',
      'justin-martyr',
      'irenaeus',
      'tertullian',
      'origen',
      'constantine'
    ],
    documents: [
      'shepherd-hermas',
      'justin-apology'
    ],
    characteristics: getEraCharacteristics('ante-nicene')
  },
  {
    id: 'nicene',
    name: 'Nicene & Post-Nicene',
    startYear: 325,
    endYear: 590,
    volume: 3,
    description: 
      'The Nicene and Post-Nicene era begins with the First Council of Nicaea and extends to Pope Gregory I. This period saw the formalization of orthodox Christian doctrine, the fall of the Western Roman Empire, and the rise of monasticism.',
    events: [
      'council-nicaea',
      'council-constantinople',
      'fall-rome'
    ],
    figures: [
      'athanasius',
      'augustine',
      'ambrose',
      'jerome'
    ],
    documents: [
      'nicene-creed',
      'augustine-confessions',
      'augustine-city-of-god'
    ],
    characteristics: getEraCharacteristics('nicene')
  },
  {
    id: 'medieval',
    name: 'Medieval Church',
    startYear: 590,
    endYear: 1517,
    volume: 4,
    description: 
      'The Medieval period spans nearly a millennium from Gregory I to the beginning of the Reformation. This era saw the Christianization of Europe, the Great Schism, the Crusades, and the rise of scholasticism.',
    events: [
      'coronation-charlemagne',
      'great-schism',
      'first-crusade',
      'fourth-lateran-council'
    ],
    figures: [
      'gregory-great',
      'thomas-aquinas',
      'anselm',
      'francis-assisi'
    ],
    documents: [
      'rule-benedict',
      'summa-theologica'
    ],
    characteristics: getEraCharacteristics('medieval')
  },
  {
    id: 'reformation',
    name: 'Reformation',
    startYear: 1517,
    endYear: 1648,
    volume: 7,
    description: 
      'The Reformation era begins with Luther\'s 95 Theses and extends to the Peace of Westphalia. This period saw the Protestant Reformation, the Catholic Counter-Reformation, and religious wars across Europe.',
    events: [
      'posting-95-theses',
      'council-trent',
      'thirty-years-war'
    ],
    figures: [
      'martin-luther',
      'john-calvin',
      'thomas-cranmer',
      'ignatius-loyola'
    ],
    documents: [
      'ninety-five-theses',
      'augsburg-confession',
      'institutes-christian-religion'
    ],
    characteristics: getEraCharacteristics('reformation')
  },
  {
    id: 'modern',
    name: 'Modern Church',
    startYear: 1648,
    endYear: 2025,
    volume: 8,
    description: 
      'The Modern era extends from the Peace of Westphalia to the present day. This period has seen the rise of denominations, missionary movements, theological liberalism and conservatism, and global Christianity.',
    events: [
      'first-vatican-council',
      'second-vatican-council',
      'edinburgh-missionary-conference'
    ],
    figures: [
      'john-wesley',
      'friedrich-schleiermacher',
      'karl-barth',
      'mother-teresa'
    ],
    documents: [
      'barmen-declaration',
      'lausanne-covenant'
    ],
    characteristics: getEraCharacteristics('modern')
  }
];

export const getEraByYear = (year: number): Era | undefined => {
  return eras.find(era => year >= era.startYear && year <= era.endYear);
};

export const getEraById = (id: string): Era | undefined => {
  return eras.find(era => era.id === id);
};

export const getEraColors = (eraId: string) => {
  return eraColors[eraId] || { primary: '#14213D', secondary: '#8B0000', accent: '#FCA311' };
};

export const getEraTimelineColor = (index: number) => {
  const colors = [
    '#8B0000', 
    '#2E8B57',
    '#4682B4', 
    '#8B4513', 
    '#4B0082',
    '#2F4F4F'  
  ];
  return colors[index % colors.length];
};