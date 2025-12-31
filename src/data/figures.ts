import { Figure } from '../types';

export const figures: Figure[] = [
  // Apostolic Era Figures
  {
    id: 'paul',
    name: 'Apostle Paul',
    image: 'https://images.pexels.com/photos/17229468/pexels-photo-17229468.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    birthYear: 5,
    birthMonth: 1,
    birthDay: 25,
    deathYear: 67,
    deathMonth: 6,
    deathDay: 29,
    description: 'Paul the Apostle, originally known as Saul of Tarsus, was an apostle who taught the gospel of Christ to the first-century world. He is considered one of the most important figures of the Apostolic Age and credited with spreading the teachings of Jesus to Gentiles.',
    roles: ['Apostle', 'Missionary', 'Theologian', 'Martyr'],
    influence: 'Paul\'s writings form a significant portion of the New Testament and have been influential in the development of Christian theology. His missionary journeys spread Christianity throughout the Roman Empire.',
    events: ['jerusalem-council', 'paul-conversion'],
    documents: [],
    quotes: [
      {
        id: 'paul-quote-1',
        text: 'For I am not ashamed of the gospel, because it is the power of God that brings salvation to everyone who believes.',
        source: 'Romans 1:16',
        figureId: 'paul',
        context: 'From Paul\'s Epistle to the Romans, expressing his commitment to the gospel message.'
      }
    ]
  },
  {
    id: 'peter',
    name: 'Apostle Peter',
    image: 'https://images.pexels.com/photos/8468470/pexels-photo-8468470.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    birthYear: 1,
    deathYear: 64,
    deathMonth: 6,
    deathDay: 29,
    description: 'Simon Peter was one of the Twelve Apostles of Jesus Christ and the first leader of the early Christian Church. Known for his impulsive nature and later steadfast leadership, he was martyred in Rome under Nero.',
    roles: ['Apostle', 'Church Leader', 'Martyr', 'Fisherman'],
    influence: 'Peter\'s leadership established the foundation of the early church. His epistles and role in Acts demonstrate his transformation from impulsive disciple to mature church leader.',
    events: ['pentecost', 'jerusalem-council', 'nero-persecution'],
    documents: [],
    quotes: [
      {
        id: 'peter-quote-1',
        text: 'But you are a chosen people, a royal priesthood, a holy nation, God\'s special possession.',
        source: '1 Peter 2:9',
        figureId: 'peter',
        context: 'Peter\'s description of the Christian community\'s identity and calling.'
      }
    ]
  },
  {
    id: 'stephen',
    name: 'Stephen the Martyr',
    image: 'https://images.pexels.com/photos/6969831/pexels-photo-6969831.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    deathYear: 34,
    deathMonth: 12,
    deathDay: 26,
    description: 'Stephen was one of the seven deacons chosen by the apostles to serve the early Christian community. He became the first Christian martyr, stoned to death for his bold testimony about Jesus Christ.',
    roles: ['Deacon', 'Martyr', 'Evangelist'],
    influence: 'Stephen\'s martyrdom marked the beginning of widespread persecution and the dispersion of Christians beyond Jerusalem, inadvertently spreading the gospel throughout the Roman world.',
    events: ['stephen-martyrdom'],
    documents: [],
    quotes: [
      {
        id: 'stephen-quote-1',
        text: 'Lord, do not hold this sin against them.',
        source: 'Acts 7:60',
        figureId: 'stephen',
        context: 'Stephen\'s final words as he was being stoned, showing forgiveness toward his persecutors.'
      }
    ]
  },
  {
    id: 'josephus',
    name: 'Flavius Josephus',
    image: 'https://images.pexels.com/photos/8468500/pexels-photo-8468500.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    birthYear: 37,
    deathYear: 100,
    description: 'Flavius Josephus was a first-century Romano-Jewish historian and hagiographer of priestly and royal ancestry who recorded Jewish history, with special emphasis on the first century CE and the First Jewish–Roman War. His works provide crucial historical context for early Christianity.',
    roles: ['Historian', 'Jewish Leader', 'Roman Citizen', 'Writer'],
    influence: 'Josephus\'s historical works, particularly "Antiquities of the Jews" and "The Jewish War," provide invaluable historical context for understanding the world of early Christianity and the destruction of the Second Temple.',
    events: ['destruction-jerusalem-temple'],
    documents: ['josephus-antiquities', 'josephus-jewish-war'],
    quotes: [
      {
        id: 'josephus-quote-1',
        text: 'Now there was about this time Jesus, a wise man, if it be lawful to call him a man.',
        source: 'Antiquities of the Jews',
        figureId: 'josephus',
        context: 'The famous Testimonium Flavianum, one of the earliest non-Christian references to Jesus.'
      }
    ]
  },

  // Ante-Nicene Era Figures
  {
    id: 'ignatius',
    name: 'Ignatius of Antioch',
    image: 'https://images.pexels.com/photos/8468471/pexels-photo-8468471.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    birthYear: 35,
    deathYear: 108,
    deathMonth: 12,
    deathDay: 20,
    description: 'Ignatius was the third Bishop of Antioch and a student of the Apostle John. His seven letters written while being transported to Rome for martyrdom provide crucial insights into early church structure and theology.',
    roles: ['Bishop', 'Martyr', 'Theologian', 'Apostolic Father'],
    influence: 'Ignatius\'s letters are among the earliest Christian documents outside the New Testament, providing evidence for episcopal authority and early Christian beliefs about the Eucharist and Christ\'s divinity.',
    events: ['ignatius-martyrdom'],
    documents: ['ignatius-letters'],
    quotes: [
      {
        id: 'ignatius-quote-1',
        text: 'It is better for me to die in behalf of Jesus Christ, than to reign over all the ends of the earth.',
        source: 'Letter to the Romans',
        figureId: 'ignatius',
        context: 'Ignatius expressing his desire for martyrdom as he traveled to Rome.'
      }
    ]
  },
  {
    id: 'justin-martyr',
    name: 'Justin Martyr',
    image: 'https://images.pexels.com/photos/8468472/pexels-photo-8468472.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    birthYear: 100,
    deathYear: 165,
    deathMonth: 4,
    deathDay: 14,
    description: 'Justin Martyr was an early Christian apologist and philosopher who defended Christianity against pagan and Jewish criticisms. He established the foundation for Christian apologetics and was martyred in Rome.',
    roles: ['Apologist', 'Philosopher', 'Martyr', 'Teacher'],
    influence: 'Justin\'s apologetic works, particularly his Apologies and Dialogue with Trypho, provided intellectual defense of Christianity and influenced later Christian theology and philosophy.',
    events: ['justin-martyr-death'],
    documents: ['justin-apology'],
    quotes: [
      {
        id: 'justin-quote-1',
        text: 'We who formerly delighted in fornication, but now embrace chastity alone.',
        source: 'First Apology',
        figureId: 'justin-martyr',
        context: 'Justin describing the moral transformation that Christianity brings to believers.'
      }
    ]
  },
  {
    id: 'irenaeus',
    name: 'Irenaeus of Lyon',
    image: 'https://images.pexels.com/photos/8468473/pexels-photo-8468473.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    birthYear: 130,
    deathYear: 202,
    description: 'Irenaeus was Bishop of Lyon and a key figure in the development of Christian theology. His work "Against Heresies" was crucial in combating Gnosticism and establishing orthodox Christian doctrine.',
    roles: ['Bishop', 'Theologian', 'Anti-Gnostic Writer', 'Church Father'],
    influence: 'Irenaeus\'s theological work helped establish the canon of Scripture and provided systematic refutation of Gnostic teachings, significantly shaping orthodox Christian theology.',
    events: [],
    documents: ['against-heresies'],
    quotes: [
      {
        id: 'irenaeus-quote-1',
        text: 'The glory of God is a living man; and the life of man consists in beholding God.',
        source: 'Against Heresies',
        figureId: 'irenaeus',
        context: 'Irenaeus expressing the relationship between God\'s glory and human flourishing.'
      }
    ]
  },
  {
    id: 'tertullian',
    name: 'Tertullian',
    image: 'https://images.pexels.com/photos/8468474/pexels-photo-8468474.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    birthYear: 155,
    deathYear: 240,
    description: 'Tertullian was a prolific early Christian author from Carthage and the first Christian author to produce an extensive corpus of Latin Christian literature. He coined many theological terms still used today.',
    roles: ['Theologian', 'Apologist', 'Lawyer', 'Writer'],
    influence: 'Tertullian\'s legal background influenced his theological method, and his writings on the Trinity, using terms like "persona" and "substantia," shaped later theological development.',
    events: ['montanist-movement'],
    documents: ['tertullian-apologeticus'],
    quotes: [
      {
        id: 'tertullian-quote-1',
        text: 'The blood of the martyrs is the seed of the church.',
        source: 'Apologeticus',
        figureId: 'tertullian',
        context: 'Tertullian\'s famous observation about how persecution strengthens rather than weakens Christianity.'
      }
    ]
  },
  {
    id: 'origen',
    name: 'Origen',
    image: 'https://images.pexels.com/photos/8468475/pexels-photo-8468475.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    birthYear: 185,
    deathYear: 254,
    description: 'Origen was a scholar and early Christian theologian from Alexandria. He was one of the most prolific writers in early Christianity and a key figure in the development of Christian biblical scholarship.',
    roles: ['Theologian', 'Biblical Scholar', 'Teacher', 'Mystic'],
    influence: 'Origen\'s allegorical method of biblical interpretation and systematic theology influenced centuries of Christian thought, though some of his teachings were later condemned.',
    events: [],
    documents: ['origen-hexapla', 'on-first-principles'],
    quotes: [
      {
        id: 'origen-quote-1',
        text: 'The Word of God is living and active, and sharper than any two-edged sword.',
        source: 'Commentary on John',
        figureId: 'origen',
        context: 'Origen\'s reflection on the power and effectiveness of Scripture.'
      }
    ]
  },

  // Nicene Era Figures
  {
    id: 'constantine',
    name: 'Constantine the Great',
    image: 'https://images.pexels.com/photos/8468476/pexels-photo-8468476.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    birthYear: 272,
    deathYear: 337,
    deathMonth: 5,
    deathDay: 22,
    description: 'Constantine I was the first Roman Emperor to convert to Christianity and played a crucial role in the spread of Christianity throughout the Roman Empire. He convened the Council of Nicaea and founded Constantinople.',
    roles: ['Emperor', 'Convert', 'Church Patron', 'Military Leader'],
    influence: 'Constantine\'s conversion and the Edict of Milan transformed Christianity from a persecuted religion to the favored religion of the empire, fundamentally changing the course of Christian history.',
    events: ['edict-milan', 'council-nicaea'],
    documents: [],
    quotes: [
      {
        id: 'constantine-quote-1',
        text: 'In this sign you will conquer.',
        source: 'Vision before Battle of Milvian Bridge',
        figureId: 'constantine',
        context: 'The vision Constantine claimed to have received before his victory that led to his conversion.'
      }
    ]
  },
  {
    id: 'eusebius',
    name: 'Eusebius of Caesarea',
    image: 'https://images.pexels.com/photos/8468501/pexels-photo-8468501.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    birthYear: 260,
    deathYear: 339,
    deathMonth: 5,
    deathDay: 30,
    description: 'Eusebius of Caesarea was a historian of Christianity, exegete, and Christian polemicist. He became known as the "Father of Church History" because of his work in recording the history of the early Christian Church.',
    roles: ['Historian', 'Bishop', 'Theologian', 'Court Advisor'],
    influence: 'Eusebius\'s "Ecclesiastical History" is the principal work on the history of the Church during the apostolic and post-apostolic periods, providing invaluable documentation of early Christianity\'s development.',
    events: ['council-nicaea', 'edict-milan'],
    documents: ['ecclesiastical-history', 'life-of-constantine'],
    quotes: [
      {
        id: 'eusebius-quote-1',
        text: 'It is not the part of my design to describe the misfortunes which finally came upon the whole nation.',
        source: 'Ecclesiastical History',
        figureId: 'eusebius',
        context: 'Eusebius reflecting on the destruction of Jerusalem and its impact on early Christianity.'
      }
    ]
  },
  {
    id: 'athanasius',
    name: 'Athanasius of Alexandria',
    image: 'https://images.pexels.com/photos/8468477/pexels-photo-8468477.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    birthYear: 296,
    deathYear: 373,
    deathMonth: 5,
    deathDay: 2,
    description: 'Athanasius was the 20th Archbishop of Alexandria and a key defender of orthodox Christianity against Arianism. His theological work was crucial in establishing the doctrine of the Trinity.',
    roles: ['Archbishop', 'Theologian', 'Doctor of the Church', 'Anti-Arian Fighter'],
    influence: 'Athanasius\'s defense of Nicene orthodoxy and his theological writings, particularly "On the Incarnation," were instrumental in defeating Arianism and establishing Trinitarian doctrine.',
    events: ['council-nicaea'],
    documents: ['on-incarnation'],
    quotes: [
      {
        id: 'athanasius-quote-1',
        text: 'God became man so that man might become God.',
        source: 'On the Incarnation',
        figureId: 'athanasius',
        context: 'Athanasius\'s famous formulation of the purpose of the Incarnation and deification.'
      }
    ]
  },
  {
    id: 'augustine',
    name: 'Augustine of Hippo',
    image: 'https://images.pexels.com/photos/5766927/pexels-photo-5766927.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    birthYear: 354,
    birthMonth: 11,
    birthDay: 13,
    deathYear: 430,
    deathMonth: 8,
    deathDay: 28,
    description: 'Augustine of Hippo was a theologian and philosopher who shaped the course of Western Christianity. Born in North Africa, he experienced a dramatic conversion and became bishop of Hippo Regius. His writings on grace, free will, and original sin profoundly influenced both Catholic and Protestant thought.',
    roles: ['Bishop', 'Theologian', 'Doctor of the Church', 'Philosopher'],
    influence: 'Augustine\'s theological framework profoundly shaped Western Christianity. His concepts of original sin, divine grace, and the Church influenced Catholic dogma and later became central to Reformation debates.',
    events: [],
    documents: ['augustine-confessions', 'augustine-city-of-god'],
    quotes: [
      {
        id: 'augustine-quote-1',
        text: 'Thou hast made us for thyself, O Lord, and our heart is restless until it finds its rest in thee.',
        source: 'Confessions',
        figureId: 'augustine',
        context: 'From Augustine\'s autobiographical work describing his spiritual journey.'
      }
    ]
  },
  {
    id: 'jerome',
    name: 'Jerome',
    image: 'https://images.pexels.com/photos/8468478/pexels-photo-8468478.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    birthYear: 347,
    deathYear: 420,
    deathMonth: 9,
    deathDay: 30,
    description: 'Jerome was a priest, theologian, and historian, best known for his translation of the Bible into Latin (the Vulgate). He was also a prolific letter writer and biblical commentator.',
    roles: ['Priest', 'Translator', 'Biblical Scholar', 'Doctor of the Church'],
    influence: 'Jerome\'s Vulgate translation became the standard Bible of the Western Church for over 1000 years, and his scholarly work established principles of biblical translation and interpretation.',
    events: [],
    documents: ['jerome-vulgate'],
    quotes: [
      {
        id: 'jerome-quote-1',
        text: 'Ignorance of Scripture is ignorance of Christ.',
        source: 'Commentary on Isaiah',
        figureId: 'jerome',
        context: 'Jerome emphasizing the importance of biblical knowledge for Christian faith.'
      }
    ]
  },
  {
    id: 'john-chrysostom',
    name: 'John Chrysostom',
    image: 'https://images.pexels.com/photos/8468479/pexels-photo-8468479.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    birthYear: 349,
    deathYear: 407,
    deathMonth: 9,
    deathDay: 14,
    description: 'John Chrysostom was Archbishop of Constantinople and is known as one of the greatest preachers in Christian history, earning him the name "Golden-mouthed." His eloquent homilies and moral teachings were highly influential.',
    roles: ['Archbishop', 'Preacher', 'Doctor of the Church', 'Reformer'],
    influence: 'Chrysostom\'s preaching and biblical commentaries set the standard for Christian oratory and biblical interpretation in the Eastern Church, and his liturgy is still used today.',
    events: [],
    documents: ['chrysostom-homilies'],
    quotes: [
      {
        id: 'chrysostom-quote-1',
        text: 'The road to Hell is paved with the skulls of erring priests, with bishops as their signposts.',
        source: 'Homily on Matthew',
        figureId: 'john-chrysostom',
        context: 'Chrysostom\'s warning about the responsibility of church leaders.'
      }
    ]
  },

  // Medieval Era Figures
  {
    id: 'gregory-great',
    name: 'Gregory the Great',
    image: 'https://images.pexels.com/photos/8468480/pexels-photo-8468480.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    birthYear: 540,
    deathYear: 604,
    deathMonth: 3,
    deathDay: 12,
    description: 'Gregory I was Pope from 590 to 604 and is considered one of the greatest popes in history. He reformed the liturgy, sent missionaries to England, and established many practices that defined the medieval papacy.',
    roles: ['Pope', 'Reformer', 'Missionary Patron', 'Doctor of the Church'],
    influence: 'Gregory\'s reforms shaped the medieval church, his missionary efforts spread Christianity to England, and his writings on pastoral care influenced church leadership for centuries.',
    events: ['gregory-great-pope'],
    documents: ['pastoral-rule'],
    quotes: [
      {
        id: 'gregory-quote-1',
        text: 'Divine love is never idle; it does great things when it is present.',
        source: 'Homilies on Ezekiel',
        figureId: 'gregory-great',
        context: 'Gregory\'s teaching on the active nature of divine love.'
      }
    ]
  },
  {
    id: 'bede',
    name: 'Bede the Venerable',
    image: 'https://images.pexels.com/photos/8468502/pexels-photo-8468502.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    birthYear: 673,
    deathYear: 735,
    deathMonth: 5,
    deathDay: 26,
    description: 'Bede was an English Benedictine monk, author, and scholar. He is best known for his work "Ecclesiastical History of the English People," which earned him the title "The Father of English History."',
    roles: ['Monk', 'Historian', 'Scholar', 'Doctor of the Church'],
    influence: 'Bede\'s historical works provide crucial documentation of early English Christianity and the conversion of Anglo-Saxon England. His scholarly method influenced medieval historiography.',
    events: ['conversion-england'],
    documents: ['ecclesiastical-history-english'],
    quotes: [
      {
        id: 'bede-quote-1',
        text: 'Christ is the morning star who, when the night of this world is past, brings to his saints the promise of the light of life.',
        source: 'Homilies on the Gospels',
        figureId: 'bede',
        context: 'Bede\'s reflection on Christ as the source of eternal hope.'
      }
    ]
  },
  {
    id: 'charlemagne',
    name: 'Charlemagne',
    image: 'https://images.pexels.com/photos/8468481/pexels-photo-8468481.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    birthYear: 742,
    deathYear: 814,
    deathMonth: 1,
    deathDay: 28,
    description: 'Charlemagne was King of the Franks and later Emperor of the Romans. His coronation by the Pope established the Holy Roman Empire and the concept of a Christian emperor in medieval Europe.',
    roles: ['Emperor', 'King', 'Christian Ruler', 'Patron of Learning'],
    influence: 'Charlemagne\'s reign established the model of Christian kingship in medieval Europe and his support for education and church reform had lasting impact on European civilization.',
    events: ['coronation-charlemagne'],
    documents: [],
    quotes: [
      {
        id: 'charlemagne-quote-1',
        text: 'To have another language is to possess a second soul.',
        source: 'Attributed',
        figureId: 'charlemagne',
        context: 'Charlemagne\'s appreciation for learning and languages.'
      }
    ]
  },
  {
    id: 'thomas-aquinas',
    name: 'Thomas Aquinas',
    image: 'https://images.pexels.com/photos/8468482/pexels-photo-8468482.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    birthYear: 1225,
    deathYear: 1274,
    deathMonth: 3,
    deathDay: 7,
    description: 'Thomas Aquinas was a Dominican friar and scholastic philosopher who synthesized Aristotelian philosophy with Christian theology. His Summa Theologica remains one of the most influential works in Christian thought.',
    roles: ['Theologian', 'Philosopher', 'Dominican Friar', 'Doctor of the Church'],
    influence: 'Aquinas\'s synthesis of faith and reason became the foundation of Catholic theology and philosophy, influencing education and thought throughout the medieval and modern periods.',
    events: [],
    documents: ['aquinas-summa'],
    quotes: [
      {
        id: 'aquinas-quote-1',
        text: 'To one who has faith, no explanation is necessary. To one without faith, no explanation is possible.',
        source: 'Summa Theologica',
        figureId: 'thomas-aquinas',
        context: 'Aquinas on the relationship between faith and understanding.'
      }
    ]
  },
  {
    id: 'francis-assisi',
    name: 'Francis of Assisi',
    image: 'https://images.pexels.com/photos/8468483/pexels-photo-8468483.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    birthYear: 1181,
    deathYear: 1226,
    deathMonth: 10,
    deathDay: 3,
    description: 'Francis of Assisi was an Italian Catholic friar and mystic who founded the Franciscan order. Known for his devotion to poverty, nature, and peace, he revolutionized medieval spirituality.',
    roles: ['Friar', 'Mystic', 'Founder', 'Saint'],
    influence: 'Francis\'s emphasis on poverty, simplicity, and care for creation transformed medieval monasticism and continues to influence Christian spirituality and environmental consciousness.',
    events: ['founding-franciscans'],
    documents: ['franciscan-rule'],
    quotes: [
      {
        id: 'francis-quote-1',
        text: 'Preach the Gospel at all times. When necessary, use words.',
        source: 'Attributed',
        figureId: 'francis-assisi',
        context: 'Francis\'s emphasis on living out the Gospel through actions.'
      }
    ]
  },
  {
    id: 'matthew-paris',
    name: 'Matthew Paris',
    image: 'https://images.pexels.com/photos/8468503/pexels-photo-8468503.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    birthYear: 1200,
    deathYear: 1259,
    description: 'Matthew Paris was an English Benedictine monk and chronicler at St Albans Abbey. He is considered one of the most important medieval historians, known for his detailed chronicles of 13th-century England and Europe.',
    roles: ['Monk', 'Chronicler', 'Historian', 'Artist'],
    influence: 'Matthew Paris\'s chronicles provide detailed accounts of medieval political and religious events, including the Crusades, papal politics, and English royal history. His work is invaluable for understanding 13th-century European Christianity.',
    events: ['seventh-crusade', 'fourth-lateran-council'],
    documents: ['chronica-majora', 'historia-anglorum'],
    quotes: [
      {
        id: 'matthew-quote-1',
        text: 'The truth of history ought to be sacred to the writer.',
        source: 'Chronica Majora',
        figureId: 'matthew-paris',
        context: 'Matthew Paris expressing his commitment to historical accuracy in his chronicles.'
      }
    ]
  },

  // CRUSADES FIGURES - Major Focus
  {
    id: 'urban-ii',
    name: 'Pope Urban II',
    image: 'https://images.pexels.com/photos/8468484/pexels-photo-8468484.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    birthYear: 1035,
    deathYear: 1099,
    deathMonth: 7,
    deathDay: 29,
    description: 'Pope Urban II launched the First Crusade with his famous speech at the Council of Clermont in 1095. His call for holy war to reclaim the Holy Land from Muslim control ignited centuries of crusading fervor.',
    roles: ['Pope', 'Crusade Initiator', 'Church Reformer', 'Diplomat'],
    influence: 'Urban II\'s call for the First Crusade fundamentally changed the relationship between Christianity and Islam, established the concept of holy war in Christian thought, and shaped medieval European society.',
    events: ['first-crusade-called'],
    documents: ['urban-speech-clermont'],
    quotes: [
      {
        id: 'urban-quote-1',
        text: 'Deus vult! God wills it!',
        source: 'Council of Clermont',
        figureId: 'urban-ii',
        context: 'The rallying cry that became the motto of the First Crusade.'
      }
    ]
  },
  {
    id: 'peter-hermit',
    name: 'Peter the Hermit',
    image: 'https://images.pexels.com/photos/8468485/pexels-photo-8468485.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    birthYear: 1050,
    deathYear: 1115,
    description: 'Peter the Hermit was a French priest who preached the First Crusade and led the disastrous People\'s Crusade. His charismatic preaching inspired thousands of peasants to join the crusading movement.',
    roles: ['Priest', 'Preacher', 'Crusade Leader', 'Hermit'],
    influence: 'Peter\'s preaching demonstrated the popular appeal of the crusading ideal and the dangers of unorganized religious enthusiasm, influencing how later crusades were organized.',
    events: ['first-crusade-called', 'peoples-crusade'],
    documents: [],
    quotes: [
      {
        id: 'peter-quote-1',
        text: 'Christ himself will lead you, for it was he who inspired your vow.',
        source: 'Crusade Preaching',
        figureId: 'peter-hermit',
        context: 'Peter encouraging crusaders that their mission was divinely inspired.'
      }
    ]
  },
  {
    id: 'godfrey-bouillon',
    name: 'Godfrey of Bouillon',
    image: 'https://images.pexels.com/photos/8468486/pexels-photo-8468486.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    birthYear: 1060,
    deathYear: 1100,
    deathMonth: 7,
    deathDay: 18,
    description: 'Godfrey of Bouillon was a French knight who became the first ruler of the Crusader Kingdom of Jerusalem after the capture of the city in 1099. He refused the title of king, preferring "Defender of the Holy Sepulchre."',
    roles: ['Crusader', 'Ruler of Jerusalem', 'Knight', 'Military Leader'],
    influence: 'Godfrey\'s leadership in the First Crusade and his establishment of the Kingdom of Jerusalem created the foundation for two centuries of Crusader presence in the Holy Land.',
    events: ['capture-jerusalem-1099'],
    documents: [],
    quotes: [
      {
        id: 'godfrey-quote-1',
        text: 'I will not wear a crown of gold where my Savior wore a crown of thorns.',
        source: 'Upon refusing the title of King',
        figureId: 'godfrey-bouillon',
        context: 'Godfrey\'s humble response when offered the crown of Jerusalem.'
      }
    ]
  },
  {
    id: 'bohemond',
    name: 'Bohemond of Taranto',
    image: 'https://images.pexels.com/photos/8468487/pexels-photo-8468487.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    birthYear: 1058,
    deathYear: 1111,
    description: 'Bohemond was a Norman knight and one of the leaders of the First Crusade. He became the first Prince of Antioch after the city\'s capture in 1098, establishing one of the major Crusader states.',
    roles: ['Crusader', 'Prince of Antioch', 'Norman Knight', 'Military Strategist'],
    influence: 'Bohemond\'s military skill and political acumen were crucial to the success of the First Crusade, and his principality of Antioch became a key Crusader stronghold.',
    events: ['siege-antioch', 'capture-jerusalem-1099'],
    documents: [],
    quotes: [
      {
        id: 'bohemond-quote-1',
        text: 'Fortune favors the bold in war as in peace.',
        source: 'Chronicle accounts',
        figureId: 'bohemond',
        context: 'Bohemond\'s philosophy of aggressive military action.'
      }
    ]
  },
  {
    id: 'hugh-payens',
    name: 'Hugh de Payens',
    image: 'https://images.pexels.com/photos/8468488/pexels-photo-8468488.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    birthYear: 1070,
    deathYear: 1136,
    description: 'Hugh de Payens was a French knight who founded the Knights Templar with eight companions in 1119. He became the first Grand Master of the order, which was dedicated to protecting Christian pilgrims.',
    roles: ['Knight', 'Templar Founder', 'Grand Master', 'Pilgrim Protector'],
    influence: 'Hugh\'s founding of the Templars created the first military religious order, which became immensely powerful and influential in medieval Europe and the Crusader states.',
    events: ['founding-templars'],
    documents: ['templar-rule'],
    quotes: [
      {
        id: 'hugh-quote-1',
        text: 'We are the poor knights of Christ and of the Temple of Solomon.',
        source: 'Templar Foundation',
        figureId: 'hugh-payens',
        context: 'Hugh describing the humble origins and mission of the Knights Templar.'
      }
    ]
  },
  {
    id: 'bernard-clairvaux',
    name: 'Bernard of Clairvaux',
    image: 'https://images.pexels.com/photos/8468489/pexels-photo-8468489.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    birthYear: 1090,
    deathYear: 1153,
    deathMonth: 8,
    deathDay: 20,
    description: 'Bernard of Clairvaux was a Cistercian abbot and influential church reformer who preached the Second Crusade. His mystical writings and church reforms made him one of the most important figures of the 12th century.',
    roles: ['Abbot', 'Mystic', 'Church Reformer', 'Crusade Preacher'],
    influence: 'Bernard\'s spiritual writings influenced medieval mysticism, his support legitimized the Knights Templar, and his preaching of the Second Crusade demonstrated the church\'s continued commitment to the crusading ideal.',
    events: ['second-crusade', 'founding-templars'],
    documents: ['bernard-crusade-letters', 'on-loving-god'],
    quotes: [
      {
        id: 'bernard-quote-1',
        text: 'Hell is full of good intentions or desires.',
        source: 'Attributed',
        figureId: 'bernard-clairvaux',
        context: 'Bernard\'s warning about the importance of action accompanying good intentions.'
      }
    ]
  },
  {
    id: 'saladin',
    name: 'Saladin',
    image: 'https://images.pexels.com/photos/8468490/pexels-photo-8468490.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    birthYear: 1137,
    deathYear: 1193,
    deathMonth: 3,
    deathDay: 4,
    description: 'Saladin was the Kurdish Muslim leader who recaptured Jerusalem from the Crusaders in 1187. Known for his military skill and chivalrous treatment of enemies, he became a legendary figure in both Islamic and Christian traditions.',
    roles: ['Sultan', 'Military Leader', 'Unifier', 'Diplomat'],
    influence: 'Saladin\'s reconquest of Jerusalem and his conduct during the Crusades earned him respect from both Muslims and Christians, and his legacy influenced ideals of chivalry and honorable warfare.',
    events: ['saladin-takes-jerusalem', 'third-crusade'],
    documents: [],
    quotes: [
      {
        id: 'saladin-quote-1',
        text: 'I warn you against shedding blood, indulging in it and making a habit of it.',
        source: 'Letter to his son',
        figureId: 'saladin',
        context: 'Saladin\'s advice on the responsible use of power and violence.'
      }
    ]
  },
  {
    id: 'richard-lionheart',
    name: 'Richard the Lionheart',
    image: 'https://images.pexels.com/photos/8468491/pexels-photo-8468491.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    birthYear: 1157,
    deathYear: 1199,
    deathMonth: 4,
    deathDay: 6,
    description: 'Richard I of England, known as the Lionheart, was one of the leaders of the Third Crusade. His military prowess and rivalry with Saladin became legendary, though he failed to recapture Jerusalem.',
    roles: ['King', 'Crusader', 'Military Leader', 'Knight'],
    influence: 'Richard\'s participation in the Third Crusade and his reputation as a warrior king made him a legendary figure in medieval literature and established the romantic ideal of the crusading knight.',
    events: ['third-crusade'],
    documents: [],
    quotes: [
      {
        id: 'richard-quote-1',
        text: 'I would sell London if I could find a buyer.',
        source: 'Fundraising for Crusade',
        figureId: 'richard-lionheart',
        context: 'Richard\'s determination to raise funds for the Third Crusade.'
      }
    ]
  },
  {
    id: 'frederick-barbarossa',
    name: 'Frederick Barbarossa',
    image: 'https://images.pexels.com/photos/8468492/pexels-photo-8468492.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    birthYear: 1122,
    deathYear: 1190,
    deathMonth: 6,
    deathDay: 10,
    description: 'Frederick I, known as Barbarossa, was Holy Roman Emperor and one of the leaders of the Third Crusade. He drowned while crossing a river in Anatolia, dealing a severe blow to the crusading army.',
    roles: ['Emperor', 'Crusader', 'Military Leader', 'Politician'],
    influence: 'Frederick\'s participation lent imperial prestige to the Third Crusade, and his death demonstrated the dangers and uncertainties of crusading expeditions.',
    events: ['third-crusade'],
    documents: [],
    quotes: [
      {
        id: 'frederick-quote-1',
        text: 'It is better to die for Christ than to live without him.',
        source: 'Before departing on Crusade',
        figureId: 'frederick-barbarossa',
        context: 'Frederick\'s expression of crusading devotion before his final journey.'
      }
    ]
  },
  {
    id: 'louis-ix',
    name: 'Louis IX (Saint Louis)',
    image: 'https://images.pexels.com/photos/8468493/pexels-photo-8468493.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    birthYear: 1214,
    deathYear: 1270,
    deathMonth: 8,
    deathDay: 25,
    description: 'Louis IX of France, later canonized as Saint Louis, led the Seventh and Eighth Crusades. His personal piety and dedication to justice made him the ideal of Christian kingship in medieval Europe.',
    roles: ['King', 'Crusader', 'Saint', 'Reformer'],
    influence: 'Louis\'s crusading efforts and saintly reputation established the model of the Christian king, and his canonization linked royal authority with religious sanctity.',
    events: ['seventh-crusade'],
    documents: [],
    quotes: [
      {
        id: 'louis-quote-1',
        text: 'If anyone speaks badly of the Christian faith, do not defend it with words, but with your sword.',
        source: 'Advice to his son',
        figureId: 'louis-ix',
        context: 'Louis\'s militant approach to defending Christianity.'
      }
    ]
  },
  {
    id: 'william-tyre',
    name: 'William of Tyre',
    image: 'https://images.pexels.com/photos/8468504/pexels-photo-8468504.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    birthYear: 1130,
    deathYear: 1186,
    description: 'William of Tyre was a medieval prelate and chronicler. As Archbishop of Tyre, he was one of the most important historians of the Crusades, providing detailed accounts of the Crusader states and their conflicts.',
    roles: ['Archbishop', 'Chronicler', 'Historian', 'Diplomat'],
    influence: 'William\'s "Historia rerum in partibus transmarinis gestarum" is one of the most important sources for Crusader history, providing detailed and relatively objective accounts of events in the Holy Land.',
    events: ['third-crusade', 'saladin-takes-jerusalem'],
    documents: ['historia-rerum-transmarinis'],
    quotes: [
      {
        id: 'william-quote-1',
        text: 'It is the duty of the historian to record events as they happened, not as they should have happened.',
        source: 'Historia rerum',
        figureId: 'william-tyre',
        context: 'William expressing his commitment to historical objectivity in chronicling the Crusades.'
      }
    ]
  },

  // Reformation Era Figures
  {
    id: 'martin-luther',
    name: 'Martin Luther',
    image: 'https://images.pexels.com/photos/6508135/pexels-photo-6508135.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    birthYear: 1483,
    birthMonth: 11,
    birthDay: 10,
    deathYear: 1546,
    deathMonth: 2,
    deathDay: 18,
    description: 'Martin Luther was a German professor of theology, priest, author, and seminal figure in the Protestant Reformation. His questioning of the Catholic Church\'s practices, particularly the selling of indulgences, led to the break with Rome and the formation of Protestant denominations.',
    roles: ['Reformer', 'Theologian', 'Translator', 'Professor'],
    influence: 'Luther\'s theological insights, particularly on justification by faith alone, reshaped Western Christianity. His translation of the Bible into German made Scripture accessible to common people and standardized the German language.',
    events: ['posting-95-theses', 'diet-worms'],
    documents: ['ninety-five-theses'],
    quotes: [
      {
        id: 'luther-quote-1',
        text: 'Here I stand. I can do no other. God help me. Amen.',
        source: 'Diet of Worms',
        figureId: 'martin-luther',
        context: 'Attributed statement when asked to recant his teachings at the Diet of Worms in 1521.'
      }
    ]
  },
  {
    id: 'john-calvin',
    name: 'John Calvin',
    image: 'https://images.pexels.com/photos/8468494/pexels-photo-8468494.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    birthYear: 1509,
    deathYear: 1564,
    deathMonth: 5,
    deathDay: 27,
    description: 'John Calvin was a French theologian and pastor during the Protestant Reformation. His systematic theology and church organization in Geneva influenced Reformed churches worldwide.',
    roles: ['Theologian', 'Pastor', 'Reformer', 'Systematician'],
    influence: 'Calvin\'s Institutes of the Christian Religion provided systematic Protestant theology, and his Geneva model influenced Reformed churches, education, and government throughout Europe and America.',
    events: [],
    documents: ['calvin-institutes'],
    quotes: [
      {
        id: 'calvin-quote-1',
        text: 'A dog barks when his master is attacked. I would be a coward if I saw that God\'s truth is attacked and yet would remain silent.',
        source: 'Attributed',
        figureId: 'john-calvin',
        context: 'Calvin\'s defense of his vigorous theological debates.'
      }
    ]
  },
  {
    id: 'ignatius-loyola',
    name: 'Ignatius of Loyola',
    image: 'https://images.pexels.com/photos/8468495/pexels-photo-8468495.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    birthYear: 1491,
    deathYear: 1556,
    deathMonth: 7,
    deathDay: 31,
    description: 'Ignatius of Loyola was a Spanish priest and theologian who founded the Society of Jesus (Jesuits). His Spiritual Exercises became a cornerstone of Catholic spirituality and the Counter-Reformation.',
    roles: ['Priest', 'Founder', 'Mystic', 'Counter-Reformer'],
    influence: 'Ignatius\'s founding of the Jesuits created the most influential religious order of the Counter-Reformation, and his Spiritual Exercises continue to guide Catholic spirituality and retreat practices.',
    events: [],
    documents: ['spiritual-exercises'],
    quotes: [
      {
        id: 'ignatius-quote-1',
        text: 'Go forth and set the world on fire.',
        source: 'To early Jesuits',
        figureId: 'ignatius-loyola',
        context: 'Ignatius\'s charge to his followers to spread their mission with passion.'
      }
    ]
  },

  // Modern Era Figures
  {
    id: 'john-wesley',
    name: 'John Wesley',
    image: 'https://images.pexels.com/photos/8468496/pexels-photo-8468496.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    birthYear: 1703,
    deathYear: 1791,
    deathMonth: 3,
    deathDay: 2,
    description: 'John Wesley was an Anglican cleric and theologian who founded the Methodist movement. His emphasis on personal holiness and social reform transformed Protestant Christianity.',
    roles: ['Cleric', 'Reformer', 'Evangelist', 'Social Activist'],
    influence: 'Wesley\'s Methodist revival emphasized personal conversion and social action, influencing evangelicalism and contributing to social reforms including the abolition of slavery.',
    events: ['methodist-movement'],
    documents: ['wesley-journal'],
    quotes: [
      {
        id: 'wesley-quote-1',
        text: 'Do all the good you can, by all the means you can, in all the ways you can, in all the places you can, at all the times you can, to all the people you can, as long as ever you can.',
        source: 'Wesley\'s Rule',
        figureId: 'john-wesley',
        context: 'Wesley\'s famous rule for Christian living and social action.'
      }
    ]
  },
  {
    id: 'karl-barth',
    name: 'Karl Barth',
    image: 'https://images.pexels.com/photos/8468497/pexels-photo-8468497.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    birthYear: 1886,
    deathYear: 1968,
    deathMonth: 12,
    deathDay: 10,
    description: 'Karl Barth was a Swiss Reformed theologian who is often called the greatest Protestant theologian since Calvin. His Church Dogmatics and opposition to Nazi ideology profoundly influenced 20th-century theology.',
    roles: ['Theologian', 'Professor', 'Church Leader', 'Anti-Nazi Activist'],
    influence: 'Barth\'s neo-orthodox theology challenged liberal Protestantism and his Barmen Declaration helped the Confessing Church resist Nazi ideology, reshaping modern Protestant thought.',
    events: [],
    documents: ['church-dogmatics', 'barmen-declaration'],
    quotes: [
      {
        id: 'barth-quote-1',
        text: 'Jesus does not give recipes that show the way to God as other teachers of religion do. He is himself the way.',
        source: 'Dogmatics in Outline',
        figureId: 'karl-barth',
        context: 'Barth\'s Christocentric approach to theology and salvation.'
      }
    ]
  },
  {
    id: 'philip-schaff',
    name: 'Philip Schaff',
    image: 'https://images.pexels.com/photos/8468505/pexels-photo-8468505.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    birthYear: 1819,
    deathYear: 1893,
    deathMonth: 10,
    deathDay: 20,
    description: 'Philip Schaff was a Swiss-born, German-educated Protestant theologian and ecclesiastical historian who spent most of his adult life living and teaching in the United States. He wrote the monumental "History of the Christian Church" in eight volumes.',
    roles: ['Historian', 'Theologian', 'Professor', 'Ecumenist'],
    influence: 'Schaff\'s comprehensive church history remains one of the most important works on Christian history. His ecumenical approach and scholarly rigor influenced American theological education and interfaith dialogue.',
    events: ['mercersburg-theology'],
    documents: ['history-christian-church', 'creeds-christendom'],
    quotes: [
      {
        id: 'schaff-quote-1',
        text: 'Church history is the best commentary on the Gospels.',
        source: 'History of the Christian Church',
        figureId: 'philip-schaff',
        context: 'Schaff expressing the value of historical study for understanding Christianity.'
      }
    ]
  },
  {
    id: 'jaroslav-pelikan',
    name: 'Jaroslav Pelikan',
    image: 'https://images.pexels.com/photos/8468507/pexels-photo-8468507.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    birthYear: 1923,
    deathYear: 2006,
    deathMonth: 5,
    deathDay: 13,
    description: 'Jaroslav Pelikan was an American scholar of the history of Christianity, Christian theology, and medieval intellectual history. His five-volume work "The Christian Tradition" is considered a masterpiece of church historical scholarship.',
    roles: ['Historian', 'Professor', 'Scholar', 'Author'],
    influence: 'Pelikan\'s comprehensive study of Christian doctrine and his accessible writing style made church history available to both scholars and general readers. His work bridged denominational boundaries and emphasized the development of Christian thought.',
    events: [],
    documents: ['christian-tradition', 'jesus-through-centuries'],
    quotes: [
      {
        id: 'pelikan-quote-1',
        text: 'Tradition is the living faith of the dead, traditionalism is the dead faith of the living.',
        source: 'The Vindication of Tradition',
        figureId: 'jaroslav-pelikan',
        context: 'Pelikan\'s famous distinction between healthy tradition and rigid traditionalism.'
      }
    ]
  }
];

export const getFiguresByBirthDay = (month: number, day: number): Figure[] => {
  return figures.filter(figure => figure.birthMonth === month && figure.birthDay === day);
};

export const getFiguresByDeathDay = (month: number, day: number): Figure[] => {
  return figures.filter(figure => figure.deathMonth === month && figure.deathDay === day);
};

export const getFigureById = (id: string): Figure | undefined => {
  return figures.find(figure => figure.id === id);
};

export const getFiguresByEra = (eraId: string): Figure[] => {
  const eraYears = {
    'apostolic': { start: 1, end: 100 },
    'ante-nicene': { start: 100, end: 325 },
    'nicene': { start: 325, end: 590 },
    'medieval': { start: 590, end: 1517 },
    'reformation': { start: 1517, end: 1648 },
    'modern': { start: 1648, end: 2025 }
  };
  
  const era = eraYears[eraId as keyof typeof eraYears];
  if (!era) return [];
  
  return figures.filter(figure => {
    const birthYear = figure.birthYear || 0;
    const deathYear = figure.deathYear || new Date().getFullYear();
    
    // Figure's lifespan overlaps with era
    return (birthYear <= era.end) && (deathYear >= era.start);
  });
};

export const getCrusadeFigures = (): Figure[] => {
  return figures.filter(figure => 
    figure.events.some(event => event.includes('crusade')) ||
    figure.roles.some(role => role.toLowerCase().includes('crusader')) ||
    figure.description.toLowerCase().includes('crusade')
  );
};

export const getHistorianFigures = (): Figure[] => {
  return figures.filter(figure => 
    figure.roles.some(role => role.toLowerCase().includes('historian')) ||
    figure.roles.some(role => role.toLowerCase().includes('chronicler')) ||
    figure.description.toLowerCase().includes('historian') ||
    figure.description.toLowerCase().includes('chronicler')
  );
};

export const getFigureStatistics = () => {
  const stats = {
    totalFigures: figures.length,
    byEra: {} as Record<string, number>,
    byRole: {} as Record<string, number>,
    byCentury: {} as Record<number, number>,
    martyrs: 0,
    theologians: 0,
    historians: 0,
    averageLifespan: 0
  };
  
  // Calculate by era
  const eraYears = {
    'apostolic': { start: 1, end: 100 },
    'ante-nicene': { start: 100, end: 325 },
    'nicene': { start: 325, end: 590 },
    'medieval': { start: 590, end: 1517 },
    'reformation': { start: 1517, end: 1648 },
    'modern': { start: 1648, end: 2025 }
  };
  
  Object.keys(eraYears).forEach(eraId => {
    stats.byEra[eraId] = getFiguresByEra(eraId).length;
  });
  
  // Calculate by role
  const allRoles = figures.flatMap(figure => figure.roles);
  allRoles.forEach(role => {
    stats.byRole[role] = (stats.byRole[role] || 0) + 1;
  });
  
  // Calculate by century
  figures.forEach(figure => {
    if (figure.birthYear) {
      const century = Math.floor((figure.birthYear - 1) / 100) + 1;
      stats.byCentury[century] = (stats.byCentury[century] || 0) + 1;
    }
  });
  
  // Calculate special categories
  stats.martyrs = getMartyrs().length;
  stats.theologians = getTheologians().length;
  stats.historians = getHistorianFigures().length;
  
  // Calculate average lifespan
  const figuresWithLifespan = figures.filter(f => f.birthYear && f.deathYear);
  if (figuresWithLifespan.length > 0) {
    const totalLifespan = figuresWithLifespan.reduce((sum, figure) => {
      return sum + (figure.deathYear! - figure.birthYear!);
    }, 0);
    stats.averageLifespan = Math.round(totalLifespan / figuresWithLifespan.length);
  }
  
  return stats;
};

export const getMartyrs = (): Figure[] => {
  return figures.filter(figure => 
    figure.roles.some(role => role.toLowerCase().includes('martyr')) ||
    figure.description.toLowerCase().includes('martyr') ||
    figure.deathYear && figure.events.some(event => 
      event.toLowerCase().includes('martyrdom') || 
      event.toLowerCase().includes('execution') ||
      event.toLowerCase().includes('persecution')
    )
  );
};

export const getTheologians = (): Figure[] => {
  return figures.filter(figure => 
    figure.roles.some(role => 
      role.toLowerCase().includes('theologian') ||
      role.toLowerCase().includes('theological')
    ) ||
    figure.description.toLowerCase().includes('theologian') ||
    figure.description.toLowerCase().includes('theology') ||
    figure.documents.some(doc => 
      doc.toLowerCase().includes('summa') ||
      doc.toLowerCase().includes('institutes') ||
      doc.toLowerCase().includes('dogmatics') ||
      doc.toLowerCase().includes('heresies')
    )
  );
};

export const getTopFiguresByQuotes = (limit: number = 10): Array<{figure: Figure, quoteCount: number}> => {
  return figures
    .map(figure => ({
      figure,
      quoteCount: figure.quotes?.length || 0
    }))
    .sort((a, b) => b.quoteCount - a.quoteCount)
    .slice(0, limit);
};


