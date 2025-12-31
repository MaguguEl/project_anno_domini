export const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export const formatDay = (day: number): string => {
  if (day === 1 || day === 21 || day === 31) {
    return `${day}st`;
  } else if (day === 2 || day === 22) {
    return `${day}nd`;
  } else if (day === 3 || day === 23) {
    return `${day}rd`;
  } else {
    return `${day}th`;
  }
};

export const formatDate = (year: number, month: number, day: number): string => {
  const monthName = months[month - 1];
  const formattedDay = formatDay(day);
  return `${monthName} ${formattedDay}, ${year}`;
};

export const getTodaysDate = (): { day: number; month: number; year: number } => {
  const now = new Date();
  return {
    day: now.getDate(),
    month: now.getMonth() + 1, // JavaScript months are 0-indexed
    year: now.getFullYear()
  };
};

export const formatDateString = (dateString: string): string => {
  const [year, month, day] = dateString.split('-').map(Number);
  return formatDate(year, month, day);
};

export const formatLifespan = (birthYear?: number, deathYear?: number): string => {
  if (birthYear && deathYear) {
    return `${birthYear} - ${deathYear}`;
  } else if (birthYear) {
    return `b. ${birthYear}`;
  } else if (deathYear) {
    return `d. ${deathYear}`;
  } else {
    return 'Dates unknown';
  }
};

// Quote of the Day functionality
export const getQuoteOfTheDay = () => {
  const quotes = [
    {
      text: "The blood of the martyrs is the seed of the church.",
      author: "Tertullian",
      source: "Apologeticus",
      context: "Tertullian's famous observation about how persecution strengthens rather than weakens Christianity."
    },
    {
      text: "God became man so that man might become God.",
      author: "Athanasius of Alexandria",
      source: "On the Incarnation",
      context: "Athanasius's famous formulation of the purpose of the Incarnation and deification."
    },
    {
      text: "Thou hast made us for thyself, O Lord, and our heart is restless until it finds its rest in thee.",
      author: "Augustine of Hippo",
      source: "Confessions",
      context: "From Augustine's autobiographical work describing his spiritual journey."
    },
    {
      text: "Here I stand. I can do no other. God help me. Amen.",
      author: "Martin Luther",
      source: "Diet of Worms",
      context: "Attributed statement when asked to recant his teachings at the Diet of Worms in 1521."
    },
    {
      text: "Ignorance of Scripture is ignorance of Christ.",
      author: "Jerome",
      source: "Commentary on Isaiah",
      context: "Jerome emphasizing the importance of biblical knowledge for Christian faith."
    },
    {
      text: "It is better for me to die in behalf of Jesus Christ, than to reign over all the ends of the earth.",
      author: "Ignatius of Antioch",
      source: "Letter to the Romans",
      context: "Ignatius expressing his desire for martyrdom as he traveled to Rome."
    },
    {
      text: "The glory of God is a living man; and the life of man consists in beholding God.",
      author: "Irenaeus of Lyon",
      source: "Against Heresies",
      context: "Irenaeus expressing the relationship between God's glory and human flourishing."
    },
    {
      text: "Divine love is never idle; it does great things when it is present.",
      author: "Gregory the Great",
      source: "Homilies on Ezekiel",
      context: "Gregory's teaching on the active nature of divine love."
    },
    {
      text: "To one who has faith, no explanation is necessary. To one without faith, no explanation is possible.",
      author: "Thomas Aquinas",
      source: "Summa Theologica",
      context: "Aquinas on the relationship between faith and understanding."
    },
    {
      text: "Preach the Gospel at all times. When necessary, use words.",
      author: "Francis of Assisi",
      source: "Attributed",
      context: "Francis's emphasis on living out the Gospel through actions."
    },
    {
      text: "A dog barks when his master is attacked. I would be a coward if I saw that God's truth is attacked and yet would remain silent.",
      author: "John Calvin",
      source: "Attributed",
      context: "Calvin's defense of his vigorous theological debates."
    },
    {
      text: "Do all the good you can, by all the means you can, in all the ways you can, in all the places you can, at all the times you can, to all the people you can, as long as ever you can.",
      author: "John Wesley",
      source: "Wesley's Rule",
      context: "Wesley's famous rule for Christian living and social action."
    },
    {
      text: "Jesus does not give recipes that show the way to God as other teachers of religion do. He is himself the way.",
      author: "Karl Barth",
      source: "Dogmatics in Outline",
      context: "Barth's Christocentric approach to theology and salvation."
    },
    {
      text: "Church history is the best commentary on the Gospels.",
      author: "Philip Schaff",
      source: "History of the Christian Church",
      context: "Schaff expressing the value of historical study for understanding Christianity."
    },
    {
      text: "Tradition is the living faith of the dead, traditionalism is the dead faith of the living.",
      author: "Jaroslav Pelikan",
      source: "The Vindication of Tradition",
      context: "Pelikan's famous distinction between healthy tradition and rigid traditionalism."
    },
    {
      text: "Christ is the morning star who, when the night of this world is past, brings to his saints the promise of the light of life.",
      author: "Bede the Venerable",
      source: "Homilies on the Gospels",
      context: "Bede's reflection on Christ as the source of eternal hope."
    },
    {
      text: "We who formerly delighted in fornication, but now embrace chastity alone.",
      author: "Justin Martyr",
      source: "First Apology",
      context: "Justin describing the moral transformation that Christianity brings to believers."
    },
    {
      text: "The road to Hell is paved with the skulls of erring priests, with bishops as their signposts.",
      author: "John Chrysostom",
      source: "Homily on Matthew",
      context: "Chrysostom's warning about the responsibility of church leaders."
    },
    {
      text: "Go forth and set the world on fire.",
      author: "Ignatius of Loyola",
      source: "To early Jesuits",
      context: "Ignatius's charge to his followers to spread their mission with passion."
    },
    {
      text: "I warn you against shedding blood, indulging in it and making a habit of it.",
      author: "Saladin",
      source: "Letter to his son",
      context: "Saladin's advice on the responsible use of power and violence."
    },
    {
      text: "Deus vult! God wills it!",
      author: "Pope Urban II",
      source: "Council of Clermont",
      context: "The rallying cry that became the motto of the First Crusade."
    },
    {
      text: "I will not wear a crown of gold where my Savior wore a crown of thorns.",
      author: "Godfrey of Bouillon",
      source: "Upon refusing the title of King",
      context: "Godfrey's humble response when offered the crown of Jerusalem."
    },
    {
      text: "We are the poor knights of Christ and of the Temple of Solomon.",
      author: "Hugh de Payens",
      source: "Templar Foundation",
      context: "Hugh describing the humble origins and mission of the Knights Templar."
    },
    {
      text: "Hell is full of good intentions or desires.",
      author: "Bernard of Clairvaux",
      source: "Attributed",
      context: "Bernard's warning about the importance of action accompanying good intentions."
    },
    {
      text: "If anyone speaks badly of the Christian faith, do not defend it with words, but with your sword.",
      author: "Louis IX (Saint Louis)",
      source: "Advice to his son",
      context: "Louis's militant approach to defending Christianity."
    },
    {
      text: "It is the duty of the historian to record events as they happened, not as they should have happened.",
      author: "William of Tyre",
      source: "Historia rerum",
      context: "William expressing his commitment to historical objectivity in chronicling the Crusades."
    },
    {
      text: "The truth of history ought to be sacred to the writer.",
      author: "Matthew Paris",
      source: "Chronica Majora",
      context: "Matthew Paris expressing his commitment to historical accuracy in his chronicles."
    },
    {
      text: "Now there was about this time Jesus, a wise man, if it be lawful to call him a man.",
      author: "Flavius Josephus",
      source: "Antiquities of the Jews",
      context: "The famous Testimonium Flavianum, one of the earliest non-Christian references to Jesus."
    },
    {
      text: "It is not the part of my design to describe the misfortunes which finally came upon the whole nation.",
      author: "Eusebius of Caesarea",
      source: "Ecclesiastical History",
      context: "Eusebius reflecting on the destruction of Jerusalem and its impact on early Christianity."
    },
    {
      text: "The Gospel, as Jesus proclaimed it, has to do with the Father only and not with the Son.",
      author: "Adolf von Harnack",
      source: "What is Christianity?",
      context: "Harnack's controversial liberal interpretation of Jesus' message."
    },
    {
      text: "To have another language is to possess a second soul.",
      author: "Charlemagne",
      source: "Attributed",
      context: "Charlemagne's appreciation for learning and languages."
    }
  ];

  // Use current date to select a consistent quote for the day
  const today = new Date();
  const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000);
  const quoteIndex = dayOfYear % quotes.length;
  
  return quotes[quoteIndex];
};