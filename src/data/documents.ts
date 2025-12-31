import { Document } from '../types';

export const documents: Document[] = [
  {
    id: 'nicene-creed',
    title: 'Nicene Creed',
    author: 'First Council of Nicaea',
    date: '325-06-19',
    year: 325,
    context: 'The Nicene Creed was formulated at the First Council of Nicaea to address controversies about the nature of Christ, particularly in response to Arianism. It established the doctrine of the Trinity and became a foundational statement of Christian belief.',
    content: `We believe in one God, the Father Almighty, Maker of all things visible and invisible.

And in one Lord Jesus Christ, the Son of God, begotten of the Father, Light of Light, very God of very God, begotten, not made, being of one substance with the Father;
By whom all things were made;
Who for us men, and for our salvation, came down and was incarnate and was made man;
He suffered, and the third day he rose again, ascended into heaven;
From thence he shall come to judge the quick and the dead.

And in the Holy Ghost.`,
    events: ['council-nicaea'],
    people: ['constantine', 'athanasius'],
    era: { id: 'nicene', name: 'Nicene & Post-Nicene', startYear: 325, endYear: 590, volume: 3, description: '', events: [], figures: [], documents: [] }
  },
  {
    id: 'apostles-creed',
    title: 'Apostles\' Creed',
    author: 'Early Church',
    date: '180-01-01',
    year: 180,
    context: 'An early statement of Christian belief, traditionally attributed to the apostles but developed over several centuries. It serves as a baptismal creed and summary of essential Christian doctrines.',
    content: `I believe in God, the Father almighty,
creator of heaven and earth.

I believe in Jesus Christ, God's only Son, our Lord,
who was conceived by the Holy Spirit,
born of the Virgin Mary,
suffered under Pontius Pilate,
was crucified, died, and was buried;
he descended to the dead.
On the third day he rose again;
he ascended into heaven,
he is seated at the right hand of the Father,
and he will come to judge the living and the dead.

I believe in the Holy Spirit,
the holy catholic Church,
the communion of saints,
the forgiveness of sins,
the resurrection of the body,
and the life everlasting. Amen.`,
    events: [],
    people: [],
    era: { id: 'ante-nicene', name: 'Ante-Nicene Church', startYear: 100, endYear: 325, volume: 2, description: '', events: [], figures: [], documents: [] }
  },
  {
    id: 'chalcedon-definition',
    title: 'Definition of Chalcedon',
    author: 'Council of Chalcedon',
    date: '451-10-25',
    year: 451,
    context: 'The Council of Chalcedon defined the two natures of Christ - fully human and fully divine - in one person. This definition became the orthodox position on Christology and was crucial in combating Monophysitism.',
    content: `We, then, following the holy Fathers, all with one consent, teach people to confess one and the same Son, our Lord Jesus Christ, the same perfect in Godhead and also perfect in manhood; truly God and truly man, of a reasonable soul and body; consubstantial with the Father according to the Godhead, and consubstantial with us according to the Manhood; in all things like unto us, without sin; begotten before all ages of the Father according to the Godhead, and in these latter days, for us and for our salvation, born of the Virgin Mary, the Mother of God, according to the Manhood; one and the same Christ, Son, Lord, only begotten, to be acknowledged in two natures, inconfusedly, unchangeably, indivisibly, inseparably; the distinction of natures being by no means taken away by the union, but rather the property of each nature being preserved, and concurring in one Person and one Subsistence, not parted or divided into two persons, but one and the same Son, and only begotten, God the Word, the Lord Jesus Christ; as the prophets from the beginning have declared concerning Him, and the Lord Jesus Christ Himself has taught us, and the Creed of the holy Fathers has handed down to us.`,
    events: ['council-chalcedon'],
    people: ['leo-great'],
    era: { id: 'nicene', name: 'Nicene & Post-Nicene', startYear: 325, endYear: 590, volume: 3, description: '', events: [], figures: [], documents: [] }
  },
  {
    id: 'augustine-confessions-excerpt',
    title: 'Confessions (Excerpt)',
    author: 'Augustine of Hippo',
    date: '400-01-01',
    year: 400,
    context: 'Augustine\'s Confessions is an autobiographical work detailing his spiritual journey and conversion to Christianity. This excerpt contains the famous opening passage that has inspired countless readers throughout history.',
    content: `Great art Thou, O Lord, and greatly to be praised; great is Thy power, and of Thy wisdom there is no end. And man, being a part of Thy creation, desires to praise Thee, man, who bears about with him his mortality, the witness of his sin, even the witness that Thou "resistest the proud," — yet man, this part of Thy creation, desires to praise Thee. 

Thou movest us to delight in praising Thee; for Thou hast formed us for Thyself, and our hearts are restless till they find rest in Thee.

Grant me, O Lord, to know and understand whether a man is first to pray to Thee for help, or to praise Thee; and whether he must know Thee before he can call upon Thee. But who can call upon Thee, not knowing Thee? For he that knoweth Thee not may call upon Thee as other than Thou art.`,
    events: [],
    people: ['augustine'],
    era: { id: 'nicene', name: 'Nicene & Post-Nicene', startYear: 325, endYear: 590, volume: 3, description: '', events: [], figures: [], documents: [] }
  },
  {
    id: 'rule-of-benedict',
    title: 'Rule of St. Benedict (Excerpt)',
    author: 'Benedict of Nursia',
    date: '530-01-01',
    year: 530,
    context: 'The Rule of St. Benedict established guidelines for monastic life that became the foundation for Western monasticism. It emphasizes prayer, work, study, and community life under the authority of an abbot.',
    content: `Listen carefully, my son, to the master's instructions, and attend to them with the ear of your heart. This is advice from a father who loves you; welcome it, and faithfully put it into practice.

The labor of obedience will bring you back to him from whom you had drifted through the sloth of disobedience. This message of mine is for you, then, if you are ready to give up your own will, once and for all, and armed with the strong and noble weapons of obedience to do battle for the true King, Christ the Lord.

First of all, every time you begin a good work, you must pray to him most earnestly to bring it to perfection. In his goodness, he has already counted us as his sons, and therefore we should never grieve him by our evil actions.`,
    events: [],
    people: ['benedict-nursia'],
    era: { id: 'nicene', name: 'Nicene & Post-Nicene', startYear: 325, endYear: 590, volume: 3, description: '', events: [], figures: [], documents: [] }
  },
  {
    id: 'anselm-proslogion',
    title: 'Proslogion (Excerpt)',
    author: 'Anselm of Canterbury',
    date: '1078-01-01',
    year: 1078,
    context: 'Anselm\'s Proslogion contains his famous ontological argument for the existence of God. This philosophical work demonstrates the medieval synthesis of faith and reason that characterized scholastic theology.',
    content: `And so, Lord, do thou, who dost give understanding to faith, give me, so far as thou knowest it to be profitable, to understand that thou art as we believe; and that thou art that which we believe. And indeed, we believe that thou art a being than which nothing greater can be conceived.

Or is there no such nature, since the fool hath said in his heart, there is no God? But, at any rate, this very fool, when he hears of this being of which I speak—a being than which nothing greater can be conceived—understands what he hears, and what he understands is in his understanding; although he does not understand it to exist.

For, it is one thing for an object to be in the understanding, and another to understand that the object exists.`,
    events: [],
    people: ['anselm'],
    era: { id: 'medieval', name: 'Medieval Church', startYear: 590, endYear: 1517, volume: 4, description: '', events: [], figures: [], documents: [] }
  },
  {
    id: 'aquinas-summa-excerpt',
    title: 'Summa Theologica (Excerpt)',
    author: 'Thomas Aquinas',
    date: '1265-01-01',
    year: 1265,
    context: 'Thomas Aquinas\'s Summa Theologica represents the pinnacle of medieval scholastic theology, synthesizing Aristotelian philosophy with Christian doctrine. This excerpt discusses the Five Ways to prove God\'s existence.',
    content: `The existence of God can be proved in five ways.

The first and more manifest way is the argument from motion. It is certain, and evident to our senses, that in the world some things are in motion. Now whatever is in motion is put in motion by another, for nothing can be in motion except it is in potentiality to that towards which it is in motion; whereas a thing moves inasmuch as it is in act.

For motion is nothing else than the reduction of something from potentiality to actuality. But nothing can be reduced from potentiality to actuality, except by something in a state of actuality.

Therefore, whatever is in motion must be put in motion by another. If that by which it is put in motion be itself put in motion, then this also must needs be put in motion by another, and that by another again. But this cannot go on to infinity, because then there would be no first mover, and, consequently, no other mover; seeing that subsequent movers move only inasmuch as they are put in motion by the first mover.

Therefore it is necessary to arrive at a first mover, put in motion by no other; and this everyone understands to be God.`,
    events: [],
    people: ['thomas-aquinas'],
    era: { id: 'medieval', name: 'Medieval Church', startYear: 590, endYear: 1517, volume: 4, description: '', events: [], figures: [], documents: [] }
  },
  {
    id: 'luther-95-theses-excerpt',
    title: 'Ninety-five Theses (Excerpt)',
    author: 'Martin Luther',
    date: '1517-10-31',
    year: 1517,
    context: 'Luther\'s Ninety-five Theses challenged the Catholic Church\'s practice of selling indulgences and sparked the Protestant Reformation. These propositions were intended for academic debate but became a catalyst for religious reform.',
    content: `Out of love for the truth and the desire to bring it to light, the following propositions will be discussed at Wittenberg, under the presidency of the Reverend Father Martin Luther, Master of Arts and of Sacred Theology, and duly appointed Lecturer on these subjects at that place.

1. When our Lord and Master Jesus Christ said "Repent" (Mt 4:17), he willed the entire life of believers to be one of repentance.

2. This word cannot be understood as referring to the sacrament of penance, that is, confession and satisfaction, as administered by the clergy.

3. Yet it does not mean solely inner repentance; such inner repentance is worthless unless it produces various outward mortifications of the flesh.

27. They preach man who say that so soon as the penny jingles into the money-box, the soul flies out [of purgatory].

28. It is certain that when the penny jingles into the money-box, gain and avarice can be increased, but the result of the intercession of the Church is in the power of God alone.`,
    events: ['posting-95-theses'],
    people: ['martin-luther'],
    era: { id: 'reformation', name: 'Reformation', startYear: 1517, endYear: 1648, volume: 7, description: '', events: [], figures: [], documents: [] }
  },
  {
    id: 'augsburg-confession',
    title: 'Augsburg Confession (Excerpt)',
    author: 'Philip Melanchthon',
    date: '1530-06-25',
    year: 1530,
    context: 'The Augsburg Confession was the primary confession of faith of the Lutheran Church, presented to Emperor Charles V at the Diet of Augsburg. It became a foundational document of Protestant theology.',
    content: `Article I: Of God
Our Churches, with common consent, do teach that the decree of the Council of Nicaea concerning the Unity of the Divine Essence and concerning the Three Persons, is true and to be believed without any doubting; that is to say, there is one Divine Essence which is called and which is God: eternal, without body, without parts, of infinite power, wisdom, and goodness, the Maker and Preserver of all things, visible and invisible; and yet there are three Persons, of the same essence and power, who also are coeternal, the Father, the Son, and the Holy Ghost.

Article IV: Of Justification
Also they teach that men cannot be justified before God by their own strength, merits, or works, but are freely justified for Christ's sake, through faith, when they believe that they are received into favor, and that their sins are forgiven for Christ's sake, who, by His death, has made satisfaction for our sins. This faith God imputes for righteousness in His sight.`,
    events: ['diet-augsburg'],
    people: ['philip-melanchthon', 'martin-luther'],
    era: { id: 'reformation', name: 'Reformation', startYear: 1517, endYear: 1648, volume: 7, description: '', events: [], figures: [], documents: [] }
  },
  {
    id: 'westminster-confession',
    title: 'Westminster Confession of Faith (Excerpt)',
    author: 'Westminster Assembly',
    date: '1646-01-01',
    year: 1646,
    context: 'The Westminster Confession of Faith was produced by the Westminster Assembly and became the doctrinal standard for Presbyterian churches. It represents Reformed theology at its most systematic.',
    content: `Chapter I: Of the Holy Scripture

I. Although the light of nature, and the works of creation and providence do so far manifest the goodness, wisdom, and power of God, as to leave men unexcusable; yet are they not sufficient to give that knowledge of God, and of his will, which is necessary unto salvation. Therefore it pleased the Lord, at sundry times, and in divers manners, to reveal himself, and to declare that his will unto his church; and afterwards, for the better preserving and propagating of the truth, and for the more sure establishment and comfort of the church against the corruption of the flesh, and the malice of Satan and of the world, to commit the same wholly unto writing: which maketh the Holy Scripture to be most necessary; those former ways of God's revealing his will unto his people being now ceased.

II. Under the name of Holy Scripture, or the Word of God written, are now contained all the books of the Old and New Testament.`,
    events: ['westminster-assembly'],
    people: ['westminster-divines'],
    era: { id: 'reformation', name: 'Reformation', startYear: 1517, endYear: 1648, volume: 7, description: '', events: [], figures: [], documents: [] }
  },
  {
    id: 'barmen-declaration',
    title: 'Barmen Declaration (Excerpt)',
    author: 'Confessing Church',
    date: '1934-05-31',
    year: 1934,
    context: 'The Barmen Declaration was a statement of faith adopted by the Confessing Church in Germany in opposition to the Nazi-influenced "German Christians" movement. It affirmed the independence of the church from state ideology.',
    content: `Jesus Christ, as he is attested for us in Holy Scripture, is the one Word of God which we have to hear and which we have to trust and obey in life and in death.

We reject the false doctrine, as though the church could and would have to acknowledge as a source of its proclamation, apart from and besides this one Word of God, still other events and powers, figures and truths, as God's revelation.

We reject the false doctrine, as though there were areas of our life in which we would not belong to Jesus Christ, but to other masters—areas in which we would not need justification and sanctification through him.

The Christian Church is the congregation of the brethren in which Jesus Christ acts presently as the Lord in Word and sacrament through the Holy Spirit. As the Church of pardoned sinners, it has to testify in the midst of a sinful world, with its faith as with its obedience, with its message as with its order, that it is solely his property, and that it lives and wants to live solely from his comfort and from his direction in the expectation of his appearance.`,
    events: ['barmen-synod'],
    people: ['karl-barth', 'dietrich-bonhoeffer'],
    era: { id: 'modern', name: 'Modern Church', startYear: 1648, endYear: 2025, volume: 8, description: '', events: [], figures: [], documents: [] }
  },
  {
    id: 'lausanne-covenant',
    title: 'Lausanne Covenant (Excerpt)',
    author: 'Lausanne Committee',
    date: '1974-07-01',
    year: 1974,
    context: 'The Lausanne Covenant emerged from the International Congress on World Evangelization and became a defining document for evangelical Christianity, emphasizing both evangelism and social responsibility.',
    content: `We affirm our belief in the one-eternal God, Creator and Lord of the world, Father, Son and Holy Spirit, who governs all things according to the purpose of his will. He has been calling out from the world a people for himself, and sending his people back into the world to be his servants and his witnesses, for the extension of his kingdom, the building up of Christ's body, and the glory of his name.

We affirm that God is both the Creator and the Judge of all men. We therefore should share his concern for justice and reconciliation throughout human society and for the liberation of men and women from every kind of oppression. Because men and women are made in the image of God, every person, regardless of race, religion, colour, culture, class, sex or age, has an intrinsic dignity because of which he or she should be respected and served, not exploited.

Here too we express penitence both for our neglect and for having sometimes regarded evangelism and social concern as mutually exclusive. Although reconciliation with man is not reconciliation with God, nor is social action evangelism, nor is political liberation salvation, nevertheless we affirm that evangelism and socio-political involvement are both part of our Christian duty.`,
    events: ['lausanne-congress'],
    people: ['john-stott', 'billy-graham'],
    era: { id: 'modern', name: 'Modern Church', startYear: 1648, endYear: 2025, volume: 8, description: '', events: [], figures: [], documents: [] }
  }
];

export const getDocumentById = (id: string): Document | undefined => {
  return documents.find(doc => doc.id === id);
};

export const getDocumentsByEra = (eraId: string): Document[] => {
  return documents.filter(doc => doc.era.id === eraId);
};