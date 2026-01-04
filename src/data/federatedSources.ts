import { FederatedSource } from '../types';

export const federatedSources: FederatedSource[] = [
  // External Book Repositories
  {
    id: 'google-books',
    title: 'Google Books',
    author: 'Various',
    century: 21,
    type: 'book',
    category: 'books',
    summary: 'Vast digital library with millions of scanned books, including many historical and theological works.',
    externalUrl: 'https://books.google.com',
    hostedOn: 'Google',
    downloadFormats: ['txt'],
    relatedPeople: [],
    relatedEras: [],
    relatedEvents: [],
    tags: ['digital library', 'scanned books', 'multi-disciplinary']
  },
  {
    id: 'open-library',
    title: 'Open Library',
    author: 'Internet Archive',
    century: 21,
    type: 'book',
    category: 'books',
    summary: 'Open, editable library catalog building towards a web page for every book ever published.',
    externalUrl: 'https://openlibrary.org',
    hostedOn: 'Internet Archive',
    downloadFormats: ['epub', 'pdf', 'txt'],
    relatedPeople: [],
    relatedEras: [],
    relatedEvents: [],
    tags: ['open access', 'catalog', 'borrowable ebooks']
  },
  {
    id: 'project-gutenberg',
    title: 'Project Gutenberg',
    author: 'Various',
    century: 21,
    type: 'book',
    category: 'books',
    summary: 'Oldest digital library of free eBooks, focusing on works in the public domain.',
    externalUrl: 'https://www.gutenberg.org',
    hostedOn: 'Project Gutenberg',
    downloadFormats: ['epub', 'pdf', 'txt'],
    relatedPeople: [],
    relatedEras: [],
    relatedEvents: [],
    tags: ['public domain', 'free ebooks', 'classic literature']
  },
  {
    id: 'world-digital-library',
    title: 'World Digital Library',
    author: 'UNESCO',
    century: 21,
    type: 'book',
    category: 'books',
    summary: 'International digital library operated by UNESCO and the Library of Congress.',
    externalUrl: 'https://www.wdl.org',
    hostedOn: 'UNESCO',
    downloadFormats: ['txt'],
    relatedPeople: [],
    relatedEras: [],
    relatedEvents: [],
    tags: ['unesco', 'international', 'cultural heritage']
  },
  {
    id: 'monergism-digital-library',
    title: 'Monergism Digital Library',
    author: 'Monergism',
    century: 21,
    type: 'book',
    category: 'books',
    summary: 'Reformed theological digital library with extensive collections of articles, books, and resources.',
    externalUrl: 'https://www.monergism.com/',
    hostedOn: 'Monergism',
    downloadFormats: ['txt'],
    relatedPeople: [],
    relatedEras: [],
    relatedEvents: [],
    tags: ['reformed theology', 'digital library', 'theological resources']
  },

  // Archive Links
  {
    id: 'ccel-archive',
    title: 'Christian Classics Ethereal Library (CCEL)',
    author: 'CCEL',
    century: 21,
    type: 'text',
    category: 'archives',
    summary: 'Digital library of Christian theological texts, including Church Fathers and historical documents.',
    externalUrl: 'https://www.ccel.org',
    hostedOn: 'CCEL',
    downloadFormats: ['pdf', 'epub', 'txt'],
    relatedPeople: [],
    relatedEras: [],
    relatedEvents: [],
    tags: ['church fathers', 'theology', 'christian classics', 'archive']
  },
  {
    id: 'new-advent',
    title: 'New Advent',
    author: 'Kevin Knight',
    century: 21,
    type: 'text',
    category: 'archives',
    summary: 'Online Catholic encyclopedia and library featuring the Church Fathers and early Christian writings.',
    externalUrl: 'https://www.newadvent.org',
    hostedOn: 'New Advent',
    downloadFormats: ['txt'],
    relatedPeople: [],
    relatedEras: [],
    relatedEvents: [],
    tags: ['catholic', 'encyclopedia', 'church fathers', 'councils', 'archive']
  },
  {
    id: 'internet-archive',
    title: 'Internet Archive',
    author: 'Various',
    century: 21,
    type: 'text',
    category: 'archives',
    summary: 'Non-profit digital library offering free universal access to books, movies, music, and archived web pages.',
    externalUrl: 'https://archive.org',
    hostedOn: 'Internet Archive',
    downloadFormats: ['pdf', 'epub', 'txt'],
    relatedPeople: [],
    relatedEras: [],
    relatedEvents: [],
    tags: ['digital archive', 'wayback machine', 'public domain', 'archive']
  },
  {
    id: 'perseus-digital-library',
    title: 'Perseus Digital Library',
    author: 'Tufts University',
    century: 21,
    type: 'text',
    category: 'archives',
    summary: 'Digital library project of Tufts University that assembles digital collections of humanities resources.',
    externalUrl: 'http://www.perseus.tufts.edu',
    hostedOn: 'Tufts University',
    downloadFormats: ['txt'],
    relatedPeople: [],
    relatedEras: [],
    relatedEvents: [],
    tags: ['classics', 'humanities', 'tufts', 'greek and latin', 'archive']
  },
  {
    id: 'vatican-digital-library',
    title: 'Vatican Library Digital Collections',
    author: 'Vatican Library',
    century: 21,
    type: 'text',
    category: 'archives',
    summary: 'Digital collections from the Vatican Library including manuscripts, incunabula, and archival materials.',
    externalUrl: 'https://digi.vatlib.it',
    hostedOn: 'Vatican Library',
    downloadFormats: ['pdf', 'txt'],
    relatedPeople: [],
    relatedEras: [],
    relatedEvents: [],
    tags: ['vatican', 'manuscripts', 'catholic history', 'rare books', 'archive']
  },

  // Historians & Commentaries
  {
    id: 'flavius-josephus-works',
    title: 'Works of Flavius Josephus',
    author: 'Flavius Josephus',
    date: 'c. 75-100',
    century: 1,
    type: 'book',
    category: 'commentaries',
    summary: 'Jewish historian under Roman patronage, provides early non-Christian references to Jesus and Christians in The Jewish War and Antiquities of the Jews.',
    externalUrl: 'https://www.ccel.org/j/josephus/works/works.html',
    hostedOn: 'CCEL',
    downloadFormats: ['pdf', 'epub', 'txt'],
    relatedPeople: ['jesus', 'various-roman-emperors'],
    relatedEras: ['roman-occupation', 'apostolic'],
    relatedEvents: ['jewish-roman-wars', 'destruction-temple'],
    tags: ['josephus', 'jewish-history', 'roman-history', 'jesus-references', 'historiography']
  },
  {
    id: 'eusebius-ecclesiastical-history',
    title: 'Ecclesiastical History',
    author: 'Eusebius of Caesarea',
    date: 'c. 312-324',
    century: 4,
    type: 'book',
    category: 'commentaries',
    summary: 'First comprehensive history of the Christian Church from apostolic times to Constantine, preserved many early Christian writings.',
    externalUrl: 'https://www.newadvent.org/fathers/2501.htm',
    hostedOn: 'New Advent',
    downloadFormats: ['pdf', 'epub', 'txt'],
    relatedPeople: ['constantine', 'early-church-fathers'],
    relatedEras: ['early-church', 'constantinian-era'],
    relatedEvents: ['council-nicaea', 'edict-milan'],
    tags: ['church-history', 'early-church', 'constantine', 'hagiography', 'historiography']
  },
  {
    id: 'bede-ecclesiastical-history',
    title: 'Ecclesiastical History of the English People',
    author: 'Bede the Venerable',
    date: 'c. 731',
    century: 8,
    type: 'book',
    category: 'commentaries',
    summary: 'Foundational work for English history and Church history, chronicling the Christianization of England.',
    externalUrl: 'https://www.ccel.org/ccel/bede/history.html',
    hostedOn: 'CCEL',
    downloadFormats: ['pdf', 'epub', 'txt'],
    relatedPeople: ['augustine-canterbury', 'king-edwin'],
    relatedEras: ['anglo-saxon', 'medieval'],
    relatedEvents: ['christianization-england', 'synod-whitby'],
    tags: ['english-history', 'church-history', 'monastic', 'anglo-saxon', 'historiography']
  },
  {
    id: 'orderic-vitalis-historia',
    title: 'Historia Ecclesiastica',
    author: 'Orderic Vitalis',
    date: 'c. 1114-1141',
    century: 12,
    type: 'book',
    category: 'commentaries',
    summary: 'Monastic chronicle of Norman and European events, particularly valuable for the Norman Conquest and medieval society.',
    externalUrl: 'https://sourcebooks.fordham.edu/basis/vitalis.asp',
    hostedOn: 'Fordham Sourcebook',
    downloadFormats: ['txt'],
    relatedPeople: ['william-conqueror', 'various-norman-lords'],
    relatedEras: ['norman', 'high-medieval'],
    relatedEvents: ['norman-conquest', 'crusades'],
    tags: ['norman-history', 'monastic-chronicle', 'medieval-history', 'historiography']
  },
  {
    id: 'froissart-chronicles',
    title: 'Chronicles of the Hundred Years\' War',
    author: 'Jean Froissart',
    date: 'c. 1369-1400',
    century: 14,
    type: 'book',
    category: 'commentaries',
    summary: 'Court chronicler\'s detailed account of the Hundred Years\' War, known for literary flair and insight into chivalric culture.',
    externalUrl: 'https://www.gutenberg.org/ebooks/author/9818',
    hostedOn: 'Project Gutenberg',
    downloadFormats: ['epub', 'txt'],
    relatedPeople: ['edward-iii', 'henry-v', 'philip-vi'],
    relatedEras: ['late-medieval'],
    relatedEvents: ['hundred-years-war'],
    tags: ['hundred-years-war', 'chivalry', 'french-history', 'court-chronicle', 'historiography']
  },
  {
    id: 'villani-nuova-cronica',
    title: 'Nuova Cronica',
    author: 'Giovanni Villani',
    date: 'c. 1300-1348',
    century: 14,
    type: 'book',
    category: 'commentaries',
    summary: 'Civic history of Florence, valuable for economic and social history of medieval Italy.',
    externalUrl: 'https://sourcebooks.fordham.edu/basis/villani.asp',
    hostedOn: 'Fordham Sourcebook',
    downloadFormats: ['txt'],
    relatedPeople: ['dante-alighieri', 'florentine-citizens'],
    relatedEras: ['late-medieval', 'renaissance'],
    relatedEvents: ['black-death', 'florentine-politics'],
    tags: ['florence', 'economic-history', 'social-history', 'medieval-italy', 'historiography']
  },
  {
    id: 'mabillon-diplomatica',
    title: 'De Re Diplomatica',
    author: 'Jean Mabillon',
    date: '1681',
    century: 17,
    type: 'book',
    category: 'commentaries',
    summary: 'Foundational work in paleography and diplomatics, establishing methods for authenticating medieval documents.',
    externalUrl: 'https://archive.org/details/dereediplomatic00mabigoog',
    hostedOn: 'Internet Archive',
    downloadFormats: ['pdf'],
    relatedPeople: ['benedictine-scholars'],
    relatedEras: ['early-modern'],
    relatedEvents: [],
    tags: ['paleography', 'diplomatics', 'document-authentication', 'benedictine', 'historiography']
  },
  {
    id: 'schaff-history-church',
    title: 'History of the Christian Church',
    author: 'Philip Schaff',
    date: '1858-1890',
    century: 19,
    type: 'book',
    category: 'commentaries',
    summary: 'Comprehensive 8-volume Protestant history of Christianity, includes translations of Church Fathers.',
    externalUrl: 'https://www.ccel.org/ccel/schaff/hcc1.html',
    hostedOn: 'CCEL',
    downloadFormats: ['pdf', 'epub'],
    relatedPeople: ['church-fathers', 'reformers'],
    relatedEras: ['all-church-history'],
    relatedEvents: [],
    tags: ['church-history', 'protestant', 'comprehensive', 'scholarly', 'historiography']
  },
  {
    id: 'mckenzie-dictionary-bible',
    title: 'Dictionary of the Bible',
    author: 'John L. McKenzie',
    date: '1965',
    century: 20,
    type: 'book',
    category: 'commentaries',
    summary: 'Influential Catholic biblical dictionary combining scholarship with doctrinal clarity.',
    externalUrl: 'https://archive.org/details/dictionaryofbibl0000mcke',
    hostedOn: 'Internet Archive',
    downloadFormats: ['pdf'],
    relatedPeople: ['biblical-figures'],
    relatedEras: ['modern'],
    relatedEvents: [],
    tags: ['biblical-scholarship', 'catholic', 'reference-work', 'historiography']
  },
  {
    id: 'stark-rise-christianity',
    title: 'The Rise of Christianity',
    author: 'Rodney Stark',
    date: '1996',
    century: 20,
    type: 'book',
    category: 'commentaries',
    summary: 'Sociological analysis of early Christianity\'s growth, challenged secularization theory with empirical data.',
    externalUrl: 'https://archive.org/details/riseofchristiani0000star',
    hostedOn: 'Internet Archive',
    downloadFormats: ['pdf'],
    relatedPeople: ['early-christians'],
    relatedEras: ['early-church'],
    relatedEvents: [],
    tags: ['sociology-of-religion', 'empirical', 'growth-patterns', 'secularization-debate', 'historiography']
  },
  {
    id: 'ibrahim-sword-scimitar',
    title: 'Sword and Scimitar',
    author: 'Raymond Ibrahim',
    date: '2018',
    century: 21,
    type: 'book',
    category: 'commentaries',
    summary: 'Civilizational history focusing on Islamic-Christian relations through military conflicts.',
    externalUrl: 'https://archive.org/details/swordscimitarfour0000ibra',
    hostedOn: 'Internet Archive',
    downloadFormats: ['pdf'],
    relatedPeople: ['muslim-conquerors', 'crusaders'],
    relatedEras: ['medieval', 'modern'],
    relatedEvents: ['crusades', 'ottoman-wars'],
    tags: ['islamic-christian-relations', 'military-history', 'civilizational-conflict', 'historiography']
  }
];

export const getSourcesByCategory = (category: string): FederatedSource[] => {
  return federatedSources.filter(source => source.category === category);
};

export const getSourceById = (id: string): FederatedSource | undefined => {
  return federatedSources.find(source => source.id === id);
};

export const getSourcesByTag = (tag: string): FederatedSource[] => {
  return federatedSources.filter(source => 
    source.tags.some(t => t.toLowerCase().includes(tag.toLowerCase()))
  );
};

export const getAllTags = (): string[] => {
  const allTags = federatedSources.flatMap(source => source.tags);
  return Array.from(new Set(allTags)).sort();
};

export const getSourcesByCentury = (century: number): FederatedSource[] => {
  return federatedSources.filter(source => source.century === century);
};