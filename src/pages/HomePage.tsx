import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, Calendar, Users, FileText, BookOpen, MessageSquare, List, ChevronLeft, ChevronRight, ArrowRight, Quote, User, Cake, Cross, Star, Mail, Send, Search, ChevronDown, Library } from 'lucide-react';

// Search Component 
const SearchBox = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      setQuery('');
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="relative w-full">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search figures, events, and texts..."
        className="w-full py-3 px-4 pl-12 rounded-full border-2 border-[#8b2332]/30 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#8b2332] focus:border-[#8b2332] text-base transition-colors duration-300"
      />
      <button 
        type="submit" 
        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#8b2332] hover:text-[#6d1a27] transition-colors duration-300"
      >
        <Search size={20} />
      </button>
    </form>
  );
};

// Navigation Button Component 
function NavButton({ icon, title, to }: { icon: React.ReactNode; title: string; to: string }) {
  return (
    <Link
      to={to}
      className="bg-white rounded-xl p-3 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group flex flex-col items-center justify-center text-center border border-gray-100 hover:border-[#8b2332]/20 min-h-[80px]"
    >
      <div className="text-[#8b2332] mb-2 group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <h3 className="text-xs font-medium text-gray-900 group-hover:text-[#8b2332] transition-colors duration-300 leading-tight px-1">{title}</h3>
    </Link>
  );
}

// Sticky Ribbon Component 
const StickyRibbon = () => {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.getElementById('hero-section');
      if (heroSection) {
        const heroBottom = heroSection.getBoundingClientRect().bottom;
        setIsSticky(heroBottom <= 0);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToContent = () => {
    document.getElementById('main-content')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className={`w-full bg-[#8b2332] text-white py-3 shadow-lg transition-all duration-300 ${
      isSticky 
        ? 'fixed top-0 left-0 right-0 z-50 animate-in slide-in-from-top duration-300' 
        : 'absolute bottom-0 left-0 right-0'
    }`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
              <Calendar className="w-3 h-3 text-white" />
            </div>
            <h2 className="text-sm lg:text-lg font-serif font-semibold whitespace-nowrap">
              Today in Church History
            </h2>
          </div>
          
          <button
            onClick={scrollToContent}
            className="flex items-center gap-1 px-3 py-1.5 bg-white/20 hover:bg-white/30 rounded-full transition-all duration-300 group text-sm flex-shrink-0 ml-2"
          >
            <span className="font-medium">
              {isSticky ? 'View' : 'Explore'}
            </span>
            <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${
              isSticky ? 'group-hover:translate-y-0.5' : 'group-hover:translate-y-0.5'
            }`} />
          </button>
        </div>
      </div>
    </div>
  );
};

// Timeline Display Component 
const TimelineDisplay = ({ events }: { events: any[] }) => {
  return (
    <div className="space-y-3">
      {events.map((event, index) => (
        <div key={event.id} className="flex gap-3 p-3 rounded-lg bg-gray-50">
          <div className="flex-shrink-0 w-12 text-center">
            <div className="text-base font-bold" style={{ color: '#8b2332' }}>{event.year}</div>
            <div className="text-xs" style={{ color: '#725d4f' }}>AD</div>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold mb-1 text-sm" style={{ color: '#725d4f' }}>{event.title}</h3>
            <p className="text-xs" style={{ color: '#725d4f', opacity: 0.8 }}>{event.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

// Hero Section Component
const HeroSection = () => {
  return (
    <div id="hero-section" className="min-h-screen flex flex-col items-center justify-center px-4 py-8 sm:py-16 bg-[#ebe9e1] relative pb-16">
      {/* Logo/Shield Image */}
      <div className="mb-6 mt-4 sm:mb-8 sm:mt-0">
        <Shield className="w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 text-[#8b2332]" strokeWidth={1.5} />
      </div>

      {/* Title with decorative lines */}
      <div className="w-full max-w-4xl mb-6 sm:mb-8">
        <div className="flex items-center justify-center gap-2 mb-2">
          <div className="flex-1 h-px bg-[#8b2332] max-w-[15%] sm:max-w-xs"></div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-[#8b2332] text-center whitespace-nowrap px-2">
            ANNO DOMINI
          </h1>
          <div className="flex-1 h-px bg-[#8b2332] max-w-[15%] sm:max-w-xs"></div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="w-full max-w-3xl mb-8 px-2 sm:mb-12 sm:px-4">
        <SearchBox />
      </div>

      {/* Smooth Navigation Buttons */}
      <div className="w-full max-w-6xl grid grid-cols-2 gap-2 px-2 sm:grid-cols-3 lg:grid-cols-6 lg:gap-4 lg:px-4">
        <NavButton
          icon={<Calendar className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7" />}
          title="Timeline"
          to="/timeline"
        />
        <NavButton
          icon={<Users className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7" />}
          title="Fathers"
          to="/figures"
        />
        <NavButton
          icon={<FileText className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7" />}
          title="Documents"
          to="/documents"
        />
        <NavButton
          icon={<Calendar className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7" />}
          title="Eras"
          to="/eras"
        />
          <NavButton
          icon={<MessageSquare className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7" />}
          title="Quotes"
          to="/quotes"
        />
        <NavButton
          icon={<Library className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7" />}
          title="Sources"
          to="/sources"
        />
      </div>

      {/* Decorative Corner Accents */}
      <div className="absolute top-0 left-0 w-20 h-20 opacity-10 sm:w-32 sm:h-32">
        <div className="w-full h-full border-t-2 border-l-2 border-[#8b2332] rounded-tl-lg"></div>
      </div>
      <div className="absolute top-0 right-0 w-20 h-20 opacity-10 sm:w-32 sm:h-32">
        <div className="w-full h-full border-t-2 border-r-2 border-[#8b2332] rounded-tr-lg"></div>
      </div>

      {/* Sticky Ribbon */}
      <StickyRibbon />
    </div>
  );
};

// Main Content Section 
const MainContentSection = () => {
  const [currentDate, setCurrentDate] = useState({ day: 19, month: 6 });
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock data
  const todayEvents = [
    { id: 1, year: 1560, title: 'Scottish Reformation Parliament convenes', description: 'The parliament met to reform the Scottish church.' },
    { id: 2, year: 1831, title: 'Charles Spurgeon born', description: 'The "Prince of Preachers" was born in Kelvedon, Essex.' }
  ];

  const quoteOfTheDay = {
    text: 'The church is not a gallery for the exhibition of eminent Christians, but a school for the education of imperfect ones.',
    author: 'Charles Spurgeon',
    source: 'Sermons',
    context: 'Preached in 1857'
  };

  const bornToday = [
    { id: 1, name: 'Charles Spurgeon', birthYear: 1831, image: '/spurgeon.jpg', roles: ['Preacher', 'Theologian'] }
  ];

  const diedToday = [
    { id: 2, name: 'Martin Luther', deathYear: 1546, image: '/luther.jpg', roles: ['Reformer', 'Theologian'] }
  ];

  const eras = [
    { id: 1, name: 'Early Church', startYear: '33', endYear: '500', volume: 1, description: 'The apostolic era through the early church fathers' },
    { id: 2, name: 'Medieval Period', startYear: '500', endYear: '1500', volume: 2, description: 'The development of Western Christianity' },
    { id: 3, name: 'Reformation', startYear: '1500', endYear: '1700', volume: 3, description: 'Protestant Reformation and Catholic Counter-Reformation' }
  ];

  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const goToPreviousDay = () => {
    setCurrentDate(prev => {
      let newDay = prev.day - 1;
      let newMonth = prev.month;
      if (newDay < 1) {
        newMonth = prev.month - 1;
        newDay = 31; // Simplified
      }
      return { day: newDay, month: newMonth };
    });
  };

  const goToNextDay = () => {
    setCurrentDate(prev => {
      let newDay = prev.day + 1;
      let newMonth = prev.month;
      if (newDay > 31) {
        newMonth = prev.month + 1;
        newDay = 1;
      }
      return { day: newDay, month: newMonth };
    });
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubscribed(true);
      setIsSubmitting(false);
      setEmail('');
    }, 1000);
  };

  return (
    <div id="main-content" className="bg-gray-50 pt-16">
      {/* Main Content */}
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Today's Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Events of the Day */}
              <div className="rounded-lg shadow-md overflow-hidden bg-white">
                <div className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-5 h-5" style={{ color: '#725d4f' }} />
                      <h2 className="text-xl font-serif" style={{ color: '#725d4f' }}>
                        On This Day
                      </h2>
                    </div>
                    
                    {/* Day Navigation Controls */}
                    <div className="flex items-center gap-1">
                      <button
                        onClick={goToPreviousDay}
                        className="p-1.5 rounded-full hover:bg-gray-100 transition-colors"
                        style={{ color: '#725d4f' }}
                        title="Previous day"
                      >
                        <ChevronLeft size={18} />
                      </button>
                      
                      <div className="px-2 py-1 bg-gray-100 rounded-full text-xs font-medium min-w-[80px] text-center" style={{ color: '#725d4f' }}>
                        {months[currentDate.month - 1]?.substring(0, 3)} {currentDate.day}
                      </div>
                      
                      <button
                        onClick={goToNextDay}
                        className="p-1.5 rounded-full hover:bg-gray-100 transition-colors"
                        style={{ color: '#725d4f' }}
                        title="Next day"
                      >
                        <ChevronRight size={18} />
                      </button>
                    </div>
                  </div>
                  
                  {todayEvents.length === 0 ? (
                    <div className="text-center py-8" style={{ color: '#725d4f' }}>
                      <p className="text-sm">No historical events recorded for this day.</p>
                      <p className="mt-2">
                        <Link to="/timeline" className="hover:underline text-sm" style={{ color: '#725d4f' }}>
                          Browse the full timeline →
                        </Link>
                      </p>
                    </div>
                  ) : (
                    <div className="bg-gray-50 rounded-lg p-3">
                      <TimelineDisplay events={todayEvents} />
                    </div>
                  )}
                  
                  <div className="mt-4 text-right">
                    <Link to="/timeline" className="flex items-center justify-end gap-1 hover:underline text-sm" style={{ color: '#725d4f' }}>
                      View full timeline <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Quote of the Day */}
              <div className="rounded-lg shadow-md overflow-hidden bg-white">
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-4">
                    <Quote className="w-5 h-5" style={{ color: '#725d4f' }} />
                    <h2 className="text-xl font-serif" style={{ color: '#725d4f' }}>
                      Today's Quote 
                    </h2>
                  </div>
                  
                  <blockquote className="border-l-3 pl-4 mb-4" style={{ borderColor: '#725d4f' }}>
                    <p className="text-base italic mb-3 leading-relaxed" style={{ color: '#725d4f' }}>
                      "{quoteOfTheDay.text}"
                    </p>
                    <footer style={{ color: '#725d4f' }}>
                      <cite className="font-medium text-sm">
                        — {quoteOfTheDay.author}
                      </cite>
                      <div className="text-xs mt-1">
                        <span className="font-medium">Source:</span> {quoteOfTheDay.source}
                      </div>
                      {quoteOfTheDay.context && (
                        <div className="text-xs mt-2 opacity-75">
                          {quoteOfTheDay.context}
                        </div>
                      )}
                    </footer>
                  </blockquote>
                  
                  <div className="text-right">
                    <Link to="/quotes" className="flex items-center justify-end gap-1 hover:underline text-sm" style={{ color: '#725d4f' }}>
                      Explore more quotes <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Notable Figures - Born/Died Today */}
              <div className="rounded-lg shadow-md overflow-hidden bg-white">
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-4">
                    <User className="w-5 h-5" style={{ color: '#725d4f' }} />
                    <h2 className="text-xl font-serif" style={{ color: '#725d4f' }}>
                      Notable Figures
                    </h2>
                  </div>
                  
                  {/* Born Today */}
                  {bornToday.length > 0 && (
                    <div className="mb-6">
                      <div className="flex items-center gap-2 mb-3">
                        <Cake className="w-4 h-4" style={{ color: '#725d4f' }} />
                        <h3 className="text-base font-serif" style={{ color: '#725d4f' }}>
                          Born on This Day
                        </h3>
                      </div>
                      <div className="space-y-3">
                        {bornToday.map((figure, index) => (
                          <div 
                            key={figure.id}
                            className="flex gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                          >
                            <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100 flex-shrink-0 flex items-center justify-center">
                              <User className="w-6 h-6" style={{ color: '#725d4f' }} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-medium mb-1 text-sm" style={{ color: '#725d4f' }}>
                                <Link to={`/figures/${figure.id}`} className="hover:underline">
                                  {figure.name}
                                </Link>
                              </h4>
                              <p className="text-xs mb-1" style={{ color: '#725d4f' }}>
                                Born in {figure.birthYear}
                              </p>
                              <div className="flex flex-wrap gap-1">
                                {figure.roles.slice(0, 2).map(role => (
                                  <span 
                                    key={role}
                                    className="text-xs px-1.5 py-0.5 bg-gray-100 rounded-full"
                                    style={{ color: '#725d4f' }}
                                  >
                                    {role}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Died Today */}
                  {diedToday.length > 0 && (
                    <div className={bornToday.length > 0 ? "pt-4 border-t border-gray-200" : ""}>
                      <div className="flex items-center gap-2 mb-3">
                        <Cross className="w-4 h-4" style={{ color: '#725d4f' }} />
                        <h3 className="text-base font-serif" style={{ color: '#725d4f' }}>
                          Died on This Day
                        </h3>
                      </div>
                      <div className="space-y-3">
                        {diedToday.map((figure, index) => (
                          <div 
                            key={figure.id}
                            className="flex gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                          >
                            <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100 flex-shrink-0 flex items-center justify-center">
                              <User className="w-6 h-6" style={{ color: '#725d4f' }} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-medium mb-1 text-sm" style={{ color: '#725d4f' }}>
                                <Link to={`/figures/${figure.id}`} className="hover:underline">
                                  {figure.name}
                                </Link>
                              </h4>
                              <p className="text-xs mb-1" style={{ color: '#725d4f', opacity: 0.7 }}>
                                Died in {figure.deathYear}
                              </p>
                              <div className="flex flex-wrap gap-1">
                                {figure.roles.slice(0, 2).map(role => (
                                  <span 
                                    key={role}
                                    className="text-xs px-1.5 py-0.5 bg-gray-100 rounded-full"
                                    style={{ color: '#725d4f' }}
                                  >
                                    {role}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {bornToday.length === 0 && diedToday.length === 0 && (
                    <div className="text-center py-6" style={{ color: '#725d4f' }}>
                      <p className="text-sm">No notable figures were born or died on this day.</p>
                      <p className="mt-2">
                        <Link to="/figures" className="hover:underline text-sm" style={{ color: '#725d4f' }}>
                          Browse historical figures →
                        </Link>
                      </p>
                    </div>
                  )}
                  
                  <div className="mt-4 text-right">
                    <Link to="/figures" className="flex items-center justify-end gap-1 hover:underline text-sm" style={{ color: '#725d4f' }}>
                      View all figures <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right Column - Sticky Sidebar */}
            <div className="lg:sticky lg:top-20 lg:self-start">
              <div className="bg-white rounded-lg p-4 shadow-md">
                <div className="flex items-center gap-2 mb-4">
                  <Star className="w-5 h-5" style={{ color: '#725d4f' }} />
                  <h2 className="text-lg font-serif" style={{ color: '#725d4f' }}>
                    Explore by Era
                  </h2>
                </div>
                <div className="space-y-2">
                  {eras.map((era, index) => (
                    <div key={era.id}>
                      <Link 
                        to={`/eras/${era.id}`}
                        className="block p-3 rounded-lg hover:bg-gray-50 transition-colors border border-transparent hover:border-[#8b2332]/20"
                      >
                        <div className="flex justify-between items-start mb-1">
                          <div className="font-medium text-sm" style={{ color: '#725d4f' }}>
                            {era.name}
                          </div>
                          <span className="text-xs px-1.5 py-0.5 bg-[#8b2332]/10 rounded-full" style={{ color: '#8b2332' }}>
                            Vol. {era.volume}
                          </span>
                        </div>
                        <div className="text-xs mb-1" style={{ color: '#725d4f', opacity: 0.8 }}>
                          {era.startYear} - {era.endYear}
                        </div>
                        <p className="text-xs leading-relaxed" style={{ color: '#725d4f', opacity: 0.7 }}>
                          {era.description.length > 60 
                            ? `${era.description.substring(0, 60)}...` 
                            : era.description}
                        </p>
                      </Link>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-300">
                  <Link 
                    to="/eras" 
                    className="flex items-center justify-center gap-2 w-full py-2 px-4 bg-[#8b2332] hover:bg-[#6d1a27] text-white rounded-lg transition-colors text-sm"
                  >
                    <BookOpen size={16} />
                    View All Eras
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Subscription Section  */}
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center p-6 rounded-lg shadow-lg bg-white">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Mail className="w-6 h-6" style={{ color: '#8b2332' }} />
              <h2 className="text-2xl font-serif" style={{ color: '#725d4f' }}>
                Stay Connected to History
              </h2>
            </div>
            
            <p className="text-lg mb-6 max-w-2xl mx-auto" style={{ color: '#725d4f' }}>
              Get daily insights from church history delivered to your inbox.
            </p>
            
            {isSubscribed ? (
              <div className="bg-green-100 p-4 rounded-lg max-w-md mx-auto" style={{ color: '#725d4f' }}>
                <div className="flex items-center justify-center gap-2 mb-1">
                  <Send className="w-4 h-4" />
                  <span className="font-semibold text-sm">Successfully Subscribed!</span>
                </div>
                <p className="text-xs">
                  Thank you for joining our community.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="max-w-md mx-auto">
                <div className="flex flex-col gap-3">
                  <div className="flex-1">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      required
                      className="w-full py-3 px-4 rounded-lg border border-gray-300 bg-white text-gray-800 text-base focus:outline-none focus:ring-2 focus:ring-[#8b2332] placeholder-gray-500"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-[#8b2332] hover:bg-[#6d1a27] disabled:bg-gray-400 text-white font-semibold rounded-lg transition-colors duration-300 whitespace-nowrap text-base"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Subscribing...</span>
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        <span>Subscribe</span>
                      </>
                    )}
                  </button>
                </div>
                
                <p className="text-xs mt-3" style={{ color: '#725d4f' }}>
                  Join over 10,000 history enthusiasts. Unsubscribe anytime.
                </p>
              </form>
            )}
            
            <div className="mt-6 grid grid-cols-1 gap-4 text-left">
              <div className="rounded-lg p-3 bg-gray-50">
                <h3 className="font-semibold mb-1 text-sm" style={{ color: '#725d4f' }}>Daily Insights</h3>
                <p className="text-xs" style={{ color: '#725d4f' }}>
                  Receive curated historical events and figures from this day in church history.
                </p>
              </div>
              <div className="rounded-lg p-3 bg-gray-50">
                <h3 className="font-semibold mb-1 text-sm" style={{ color: '#725d4f' }}>Weekly Deep Dives</h3>
                <p className="text-xs" style={{ color: '#725d4f' }}>
                  Explore detailed analyses of significant periods and movements in Christianity.
                </p>
              </div>
              <div className="rounded-lg p-3 bg-gray-50">
                <h3 className="font-semibold mb-1 text-sm" style={{ color: '#725d4f' }}>Exclusive Content</h3>
                <p className="text-xs" style={{ color: '#725d4f' }}>
                  Access subscriber-only articles and resources from leading church historians.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Full Screen Hero Section */}
      <HeroSection />
      
      {/* Main Content Section with Gray Background */}
      <MainContentSection />
    </div>
  );
};

export default HomePage;