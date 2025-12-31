import { FederatedSource } from '../types';

export const federatedSources: FederatedSource[] = [
  // Primary Church Documents
  {
    id: 'nicene-creed-325',
    title: 'Nicene Creed (325 AD)',
    author: 'First Council of Nicaea',
    date: '325-06-19',
    century: 4,
    type: 'decree',
    category: 'primary',
    summary: 'The foundational creed establishing the doctrine of the Trinity and Christ\'s divinity, formulated to counter Arianism.',
    externalUrl: 'https://www.ccel.org/creeds/nicene.creed.html',
    hostedOn: 'CCEL',
    downloadFormats: ['pdf', 'txt'],
    relatedPeople: ['constantine', 'athanasius', 'arius'],
    relatedEras: ['nicene'],
    relatedEvents: ['council-nicaea'],
    tags: ['creed', 'trinity', 'council', 'arianism']
  },
  {
    id: 'apostles-creed',
    title: 'Apostles\' Creed',
    author: 'Early Church',
    century: 2,
    type: 'decree',
    category: 'primary',
    summary: 'An early statement of Christian belief, traditionally attributed to the apostles but developed over several centuries.',
    externalUrl: 'https://www.ccel.org/creeds/apostles.creed.html',
    hostedOn: 'CCEL',
    downloadFormats: ['pdf', 'txt'],
    relatedPeople: [],
    relatedEras: ['ante-nicene'],
    relatedEvents: [],
    tags: ['creed', 'early church', 'belief']
  },
  {
    id: 'chalcedon-definition',
    title: 'Definition of Chalcedon',
    author: 'Council of Chalcedon',
    date: '451-10-25',
    century: 5,
    type: 'decree',
    category: 'primary',
    summary: 'Defines the two natures of Christ - fully human and fully divine - in response to Monophysite controversies.',
    externalUrl: 'https://www.ccel.org/fathers/NPNF2-14/npnf2-14-11.htm',
    hostedOn: 'CCEL',
    downloadFormats: ['pdf', 'epub'],
    relatedPeople: ['leo-great'],
    relatedEras: ['nicene'],
    relatedEvents: ['council-chalcedon'],
    tags: ['christology', 'council', 'two natures', 'monophysitism']
  },

  // Early Church Fathers
  {
    id: 'augustine-confessions',
    title: 'Confessions',
    author: 'Augustine of Hippo',
    date: '397-400',
    century: 4,
    type: 'book',
    category: 'fathers',
    summary: 'Augustine\'s autobiographical work detailing his conversion and spiritual journey, considered the first Western autobiography.',
    externalUrl: 'https://www.ccel.org/ccel/augustine/confessions.html',
    hostedOn: 'CCEL',
    downloadFormats: ['pdf', 'epub', 'txt'],
    relatedPeople: ['augustine'],
    relatedEras: ['nicene'],
    relatedEvents: [],
    tags: ['autobiography', 'conversion', 'spirituality', 'philosophy']
  },
  {
    id: 'chrysostom-homilies',
    title: 'Homilies on Matthew',
    author: 'John Chrysostom',
    century: 4,
    type: 'sermon',
    category: 'fathers',
    summary: 'A series of eloquent sermons on the Gospel of Matthew by the "Golden-mouthed" preacher of Constantinople.',
    externalUrl: 'https://www.ccel.org/ccel/chrysostom/homilies_matthew.html',
    hostedOn: 'CCEL',
    downloadFormats: ['pdf', 'epub'],
    relatedPeople: ['john-chrysostom'],
    relatedEras: ['nicene'],
    relatedEvents: [],
    tags: ['homilies', 'preaching', 'matthew', 'exegesis']
  },
  {
    id: 'jerome-vulgate',
    title: 'Vulgate Bible',
    author: 'Jerome',
    date: '382-405',
    century: 4,
    type: 'book',
    category: 'fathers',
    summary: 'Jerome\'s Latin translation of the Bible, which became the standard Bible of the Western Church for over 1000 years.',
    externalUrl: 'https://www.ccel.org/bible/vulgate/',
    hostedOn: 'CCEL',
    downloadFormats: ['pdf'],
    relatedPeople: ['jerome'],
    relatedEras: ['nicene'],
    relatedEvents: [],
    tags: ['bible', 'translation', 'latin', 'scripture']
  },

  // External Book Repositories
  {
    id: 'eusebius-history',
    title: 'Ecclesiastical History',
    author: 'Eusebius of Caesarea',
    century: 4,
    type: 'book',
    category: 'books',
    summary: 'The first comprehensive history of the Christian Church from apostolic times to Constantine\'s reign.',
    externalUrl: 'https://www.newadvent.org/fathers/2501.htm',
    hostedOn: 'New Advent',
    downloadFormats: ['pdf', 'epub', 'txt'],
    relatedPeople: ['eusebius', 'constantine'],
    relatedEras: ['ante-nicene', 'nicene'],
    relatedEvents: ['edict-milan', 'council-nicaea'],
    tags: ['history', 'early church', 'constantine', 'persecution']
  },
  {
    id: 'schaff-history',
    title: 'History of the Christian Church',
    author: 'Philip Schaff',
    century: 19,
    type: 'book',
    category: 'books',
    summary: 'Comprehensive 8-volume history of Christianity from apostolic times through the Reformation.',
    externalUrl: 'https://www.ccel.org/ccel/schaff/hcc1.html',
    hostedOn: 'CCEL',
    downloadFormats: ['pdf', 'epub'],
    relatedPeople: ['philip-schaff'],
    relatedEras: ['modern'],
    relatedEvents: [],
    tags: ['church history', 'comprehensive', 'reformation', 'scholarship']
  },

  // Archive Links
  {
    id: 'didache',
    title: 'The Didache',
    author: 'Unknown',
    century: 1,
    type: 'text',
    category: 'archives',
    summary: 'Early Christian treatise on church order and Christian ethics, also known as "The Teaching of the Twelve Apostles".',
    externalUrl: 'https://www.earlychristianwritings.com/didache.html',
    hostedOn: 'Early Christian Writings',
    downloadFormats: ['txt'],
    relatedPeople: [],
    relatedEras: ['apostolic'],
    relatedEvents: [],
    tags: ['early church', 'church order', 'ethics', 'apostolic']
  },
  {
    id: 'clement-letter',
    title: 'First Letter of Clement',
    author: 'Clement of Rome',
    date: '96',
    century: 1,
    type: 'letter',
    category: 'archives',
    summary: 'One of the earliest Christian documents outside the New Testament, addressing divisions in the Corinthian church.',
    externalUrl: 'https://www.earlychristianwritings.com/1clement.html',
    hostedOn: 'Early Christian Writings',
    downloadFormats: ['txt'],
    relatedPeople: ['clement-rome'],
    relatedEras: ['apostolic'],
    relatedEvents: [],
    tags: ['apostolic fathers', 'corinth', 'church unity', 'early letter']
  },

  // Historians & Commentaries
  {
    id: 'aquinas-summa',
    title: 'Summa Theologica',
    author: 'Thomas Aquinas',
    century: 13,
    type: 'book',
    category: 'commentaries',
    summary: 'Comprehensive theological work synthesizing Christian doctrine with Aristotelian philosophy.',
    externalUrl: 'https://www.ccel.org/ccel/aquinas/summa.html',
    hostedOn: 'CCEL',
    downloadFormats: ['pdf', 'epub'],
    relatedPeople: ['thomas-aquinas'],
    relatedEras: ['medieval'],
    relatedEvents: [],
    tags: ['scholasticism', 'theology', 'philosophy', 'medieval']
  },
  {
    id: 'calvin-institutes',
    title: 'Institutes of the Christian Religion',
    author: 'John Calvin',
    century: 16,
    type: 'book',
    category: 'commentaries',
    summary: 'Systematic presentation of Protestant theology and Calvin\'s most important work.',
    externalUrl: 'https://www.ccel.org/ccel/calvin/institutes.html',
    hostedOn: 'CCEL',
    downloadFormats: ['pdf', 'epub'],
    relatedPeople: ['john-calvin'],
    relatedEras: ['reformation'],
    relatedEvents: [],
    tags: ['reformation', 'systematic theology', 'protestantism', 'calvin']
  },
    // Additional Ecumenical Councils & Creeds
  {
    id: 'constantinople-creed-381',
    title: 'Niceno-Constantinopolitan Creed',
    author: 'First Council of Constantinople',
    date: '381-07-01',
    century: 4,
    type: 'decree',
    category: 'primary',
    summary: 'Expanded Nicene Creed clarifying the divinity of the Holy Spirit and Trinitarian doctrine.',
    externalUrl: 'https://www.ccel.org/creeds/nicene.creed.html',
    hostedOn: 'CCEL',
    downloadFormats: ['pdf', 'txt'],
    relatedPeople: ['theodosius-i', 'gregory-nazianzus'],
    relatedEras: ['nicene'],
    relatedEvents: ['council-constantinople'],
    tags: ['creed', 'trinity', 'holy spirit', 'council']
  },

  // Apostolic & Sub-Apostolic Fathers
  {
    id: 'ignatius-letters',
    title: 'Letters of Ignatius of Antioch',
    author: 'Ignatius of Antioch',
    century: 2,
    type: 'letter',
    category: 'archives',
    summary: 'Letters emphasizing church unity, episcopal authority, and martyrdom theology.',
    externalUrl: 'https://www.ccel.org/ccel/ignatius/epistles.html',
    hostedOn: 'CCEL',
    downloadFormats: ['pdf', 'txt'],
    relatedPeople: ['ignatius-antioch'],
    relatedEras: ['apostolic'],
    relatedEvents: [],
    tags: ['apostolic fathers', 'bishop', 'martyrdom', 'church unity']
  },

  {
    id: 'polycarp-martyrdom',
    title: 'Martyrdom of Polycarp',
    author: 'Church of Smyrna',
    century: 2,
    type: 'text',
    category: 'archives',
    summary: 'Earliest detailed Christian martyr narrative, reflecting early theology of suffering and witness.',
    externalUrl: 'https://www.ccel.org/ccel/polycarp/martyrdom.html',
    hostedOn: 'CCEL',
    downloadFormats: ['pdf', 'txt'],
    relatedPeople: ['polycarp'],
    relatedEras: ['apostolic'],
    relatedEvents: ['early-persecutions'],
    tags: ['martyrdom', 'persecution', 'apostolic fathers']
  },

  // Apologists & Early Theology
  {
    id: 'justin-apology',
    title: 'First Apology',
    author: 'Justin Martyr',
    century: 2,
    type: 'book',
    category: 'fathers',
    summary: 'Defense of Christianity addressed to Roman authorities explaining Christian beliefs and practices.',
    externalUrl: 'https://www.ccel.org/ccel/justin/apology.html',
    hostedOn: 'CCEL',
    downloadFormats: ['pdf', 'txt'],
    relatedPeople: ['justin-martyr'],
    relatedEras: ['ante-nicene'],
    relatedEvents: [],
    tags: ['apologetics', 'roman empire', 'persecution']
  },

  {
    id: 'irenaeus-heresies',
    title: 'Against Heresies',
    author: 'Irenaeus of Lyons',
    century: 2,
    type: 'book',
    category: 'fathers',
    summary: 'Foundational work defending apostolic tradition against Gnostic movements.',
    externalUrl: 'https://www.ccel.org/ccel/irenaeus/against_heresies.html',
    hostedOn: 'CCEL',
    downloadFormats: ['pdf', 'txt'],
    relatedPeople: ['irenaeus'],
    relatedEras: ['ante-nicene'],
    relatedEvents: [],
    tags: ['gnosticism', 'heresy', 'apostolic tradition']
  },

  // Monastic & Spiritual Sources
  {
    id: 'rule-benedict',
    title: 'Rule of Saint Benedict',
    author: 'Benedict of Nursia',
    century: 6,
    type: 'decree',
    category: 'primary',
    summary: 'Foundational monastic rule shaping Western monasticism and medieval Christian life.',
    externalUrl: 'https://www.ccel.org/ccel/benedict/rule.html',
    hostedOn: 'CCEL',
    downloadFormats: ['pdf', 'txt'],
    relatedPeople: ['benedict-nursia'],
    relatedEras: ['medieval'],
    relatedEvents: [],
    tags: ['monasticism', 'discipline', 'spiritual life']
  },

  // Medieval Church History
  {
    id: 'bede-history',
    title: 'Ecclesiastical History of the English People',
    author: 'Bede the Venerable',
    century: 8,
    type: 'book',
    category: 'books',
    summary: 'Primary historical account of Christianity in England from Roman times to the 8th century.',
    externalUrl: 'https://www.ccel.org/ccel/bede/history.html',
    hostedOn: 'CCEL',
    downloadFormats: ['pdf', 'txt'],
    relatedPeople: ['bede'],
    relatedEras: ['medieval'],
    relatedEvents: [],
    tags: ['church history', 'england', 'mission', 'medieval']
  },

  // Pre-Reformation Reform Voices
  {
    id: 'wycliffe-dominion',
    title: 'On Civil Dominion',
    author: 'John Wycliffe',
    century: 14,
    type: 'book',
    category: 'commentaries',
    summary: 'Critique of ecclesiastical wealth and authority that anticipated Reformation ideas.',
    externalUrl: 'https://archive.org/details/oncivildominion',
    hostedOn: 'Internet Archive',
    downloadFormats: ['pdf'],
    relatedPeople: ['john-wycliffe'],
    relatedEras: ['late-medieval'],
    relatedEvents: [],
    tags: ['reform', 'church authority', 'pre-reformation']
  },

  {
    id: 'hus-on-church',
    title: 'On the Church',
    author: 'Jan Hus',
    century: 15,
    type: 'book',
    category: 'commentaries',
    summary: 'Ecclesiological critique asserting Christ as head of the Church rather than the papacy.',
    externalUrl: 'https://archive.org/details/onthechurch',
    hostedOn: 'Internet Archive',
    downloadFormats: ['pdf'],
    relatedPeople: ['jan-hus'],
    relatedEras: ['late-medieval'],
    relatedEvents: ['council-constance'],
    tags: ['reform', 'ecclesiology', 'pre-reformation']
  },
    // Early Church Orders & Discipline
  {
    id: 'apostolic-tradition',
    title: 'Apostolic Tradition',
    author: 'Hippolytus of Rome',
    century: 3,
    type: 'text',
    category: 'primary',
    summary: 'Early church manual describing liturgy, baptism, ordination, and church order.',
    externalUrl: 'https://www.ccel.org/ccel/hippolytus/apostolic_tradition.html',
    hostedOn: 'CCEL',
    downloadFormats: ['pdf', 'txt'],
    relatedPeople: ['hippolytus'],
    relatedEras: ['ante-nicene'],
    relatedEvents: [],
    tags: ['church order', 'liturgy', 'ordination', 'early church']
  },

  {
    id: 'didascalia-apostolorum',
    title: 'Didascalia Apostolorum',
    author: 'Unknown',
    century: 3,
    type: 'text',
    category: 'primary',
    summary: 'Early Syriac church order emphasizing episcopal authority and pastoral care.',
    externalUrl: 'https://www.ccel.org/ccel/anonymous/didascalia.html',
    hostedOn: 'CCEL',
    downloadFormats: ['txt'],
    relatedPeople: [],
    relatedEras: ['ante-nicene'],
    relatedEvents: [],
    tags: ['church order', 'bishop', 'discipline']
  },

  // Major Patristic Theology
  {
    id: 'athanasius-incarnation',
    title: 'On the Incarnation',
    author: 'Athanasius of Alexandria',
    century: 4,
    type: 'book',
    category: 'fathers',
    summary: 'Classic defense of the incarnation and divinity of Christ against Arianism.',
    externalUrl: 'https://www.ccel.org/ccel/athanasius/incarnation.html',
    hostedOn: 'CCEL',
    downloadFormats: ['pdf', 'txt'],
    relatedPeople: ['athanasius'],
    relatedEras: ['nicene'],
    relatedEvents: ['arian-controversy'],
    tags: ['christology', 'incarnation', 'arianism']
  },

  {
    id: 'augustine-city-god',
    title: 'City of God',
    author: 'Augustine of Hippo',
    century: 5,
    type: 'book',
    category: 'fathers',
    summary: 'Christian philosophy of history contrasting the City of God with earthly empires.',
    externalUrl: 'https://www.ccel.org/ccel/augustine/cityofgod.html',
    hostedOn: 'CCEL',
    downloadFormats: ['pdf', 'epub'],
    relatedPeople: ['augustine'],
    relatedEras: ['late-antiquity'],
    relatedEvents: ['fall-rome'],
    tags: ['history', 'theology', 'politics', 'roman empire']
  },

  // Byzantine & Eastern Christianity
  {
    id: 'john-damascene-orthodox-faith',
    title: 'Exposition of the Orthodox Faith',
    author: 'John of Damascus',
    century: 8,
    type: 'book',
    category: 'fathers',
    summary: 'Systematic summary of Eastern Orthodox theology during the iconoclastic period.',
    externalUrl: 'https://www.ccel.org/ccel/damascus/orthodox_faith.html',
    hostedOn: 'CCEL',
    downloadFormats: ['pdf', 'txt'],
    relatedPeople: ['john-damascene'],
    relatedEras: ['byzantine'],
    relatedEvents: ['iconoclasm'],
    tags: ['orthodoxy', 'icons', 'systematic theology']
  },

  // Papacy & Medieval Authority
  {
    id: 'leo-tome',
    title: 'Tome of Leo',
    author: 'Leo the Great',
    century: 5,
    type: 'letter',
    category: 'primary',
    summary: 'Authoritative Christological letter influential at the Council of Chalcedon.',
    externalUrl: 'https://www.ccel.org/ccel/schaff/npnf212.vii.i.html',
    hostedOn: 'CCEL',
    downloadFormats: ['txt'],
    relatedPeople: ['leo-great'],
    relatedEras: ['nicene'],
    relatedEvents: ['council-chalcedon'],
    tags: ['papacy', 'christology', 'two natures']
  },

  {
    id: 'dictatus-papae',
    title: 'Dictatus Papae',
    author: 'Pope Gregory VII',
    century: 11,
    type: 'decree',
    category: 'primary',
    summary: 'Statements asserting papal authority during the Investiture Controversy.',
    externalUrl: 'https://sourcebooks.fordham.edu/source/g7-dictatus.asp',
    hostedOn: 'Fordham Sourcebook',
    downloadFormats: ['txt'],
    relatedPeople: ['gregory-vii'],
    relatedEras: ['medieval'],
    relatedEvents: ['investiture-controversy'],
    tags: ['papacy', 'authority', 'church-state']
  },

  // Councils Beyond Chalcedon
  {
    id: 'trullo-canons',
    title: 'Canons of the Quinisext Council (Trullo)',
    author: 'Quinisext Council',
    century: 7,
    type: 'decree',
    category: 'primary',
    summary: 'Disciplinary canons governing Eastern Christian practice.',
    externalUrl: 'https://www.ccel.org/ccel/schaff/npnf214.xviii.html',
    hostedOn: 'CCEL',
    downloadFormats: ['txt'],
    relatedPeople: [],
    relatedEras: ['byzantine'],
    relatedEvents: ['council-trullo'],
    tags: ['canon law', 'discipline', 'eastern church']
  },

  // Late Medieval Devotion
  {
    id: 'imitation-christ',
    title: 'The Imitation of Christ',
    author: 'Thomas à Kempis',
    century: 15,
    type: 'book',
    category: 'primary',
    summary: 'Influential devotional work emphasizing humility and inner spiritual life.',
    externalUrl: 'https://www.ccel.org/ccel/kempis/imitation.html',
    hostedOn: 'CCEL',
    downloadFormats: ['pdf', 'epub'],
    relatedPeople: ['thomas-a-kempis'],
    relatedEras: ['late-medieval'],
    relatedEvents: [],
    tags: ['devotion', 'spirituality', 'piety']
  },

  // Early Reformation Foundations
  {
    id: 'luther-babylonian-captivity',
    title: 'The Babylonian Captivity of the Church',
    author: 'Martin Luther',
    century: 16,
    type: 'book',
    category: 'primary',
    summary: 'Critique of sacramental theology and medieval church practices.',
    externalUrl: 'https://www.ccel.org/ccel/luther/babylonian.html',
    hostedOn: 'CCEL',
    downloadFormats: ['pdf'],
    relatedPeople: ['martin-luther'],
    relatedEras: ['reformation'],
    relatedEvents: [],
    tags: ['reformation', 'sacraments', 'church critique']
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