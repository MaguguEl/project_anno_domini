import React, { useState, useMemo } from 'react';
import { BookOpen, Quote, User, Cake, Cross, Star, Mail, Send, Check, ChevronLeft, ChevronRight, ArrowRight, Users, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import TimelineDisplay from '../../components/ui/TimelineDisplay';

const MainContentSection = () => {
  const data = useData();
  const [currentDate, setCurrentDate] = useState(() => {
    const now = new Date();
    return { day: now.getDate(), month: now.getMonth() + 1 };
  });
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Get real data from context
  const todayEvents = useMemo(() => 
    data.getEventsByDay(currentDate.month, currentDate.day),
    [data, currentDate]
  );

  // Get quote of the day by selecting from all quotes based on current date
  const quoteOfTheDay = useMemo(() => {
    const allQuotes = data.figures.flatMap(figure => figure.quotes || []);
    if (allQuotes.length === 0) {
      return {
        text: 'The glory of God is a living man; and the life of man consists in beholding God.',
        author: 'Irenaeus of Lyon',
        source: 'Against Heresies',
        context: 'Irenaeus expressing the relationship between God\'s glory and human flourishing.'
      };
    }
    
    // Use day of year to select a consistent quote for the day
    const now = new Date();
    const dayOfYear = Math.floor((now.getTime() - new Date(now.getFullYear(), 0, 0).getTime()) / 86400000);
    const quoteIndex = dayOfYear % allQuotes.length;
    const selectedQuote = allQuotes[quoteIndex];
    
    // Find the figure who said this quote
    const figure = data.figures.find(f => f.id === selectedQuote.figureId);
    
    return {
      text: selectedQuote.text,
      author: figure?.name || 'Unknown',
      source: selectedQuote.source,
      context: selectedQuote.context
    };
  }, [data]);

  const bornToday = useMemo(() => 
    data.getFiguresByBirthDay(currentDate.month, currentDate.day),
    [data, currentDate]
  );

  const diedToday = useMemo(() => 
    data.getFiguresByDeathDay(currentDate.month, currentDate.day),
    [data, currentDate]
  );

  const eras = data.eras;

  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const goToPreviousDay = () => {
    setCurrentDate(prev => {
      let newDay = prev.day - 1;
      let newMonth = prev.month;
      if (newDay < 1) {
        newMonth = prev.month - 1;
        if (newMonth < 1) newMonth = 12;
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
        if (newMonth > 12) newMonth = 1;
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
                      <Link to="/timeline" className="mt-2 text-sm hover:underline" style={{ color: '#725d4f' }}>
                        Browse the full timeline →
                      </Link>
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
                        {bornToday.map((figure) => (
                          <Link key={figure.id} to={`/figures/${figure.id}`} className="block">
                            <div className="flex gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                              <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100 flex-shrink-0 flex items-center justify-center">
                                <User className="w-6 h-6" style={{ color: '#725d4f' }} />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="font-medium mb-1 text-sm hover:underline" style={{ color: '#725d4f' }}>
                                  {figure.name}
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
                          </Link>
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
                        {diedToday.map((figure) => (
                          <Link key={figure.id} to={`/figures/${figure.id}`} className="block">
                            <div className="flex gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                              <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100 flex-shrink-0 flex items-center justify-center">
                                <User className="w-6 h-6" style={{ color: '#725d4f' }} />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="font-medium mb-1 text-sm hover:underline" style={{ color: '#725d4f' }}>
                                  {figure.name}
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
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {bornToday.length === 0 && diedToday.length === 0 && (
                    <div className="text-center py-6" style={{ color: '#725d4f' }}>
                      <p className="text-sm">No notable figures were born or died on this day.</p>
                      <Link to="/figures" className="mt-2 text-sm hover:underline" style={{ color: '#725d4f' }}>
                        Browse historical figures →
                      </Link>
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
                  {eras.slice(0, 3).map((era) => (
                    <Link key={era.id} to={`/eras/${era.id}`} className="block">
                      <div className="p-3 rounded-lg hover:bg-gray-50 transition-colors border border-transparent hover:border-[#8b2332]/20">
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
                      </div>
                    </Link>
                  ))}
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-300">
                  <Link to="/eras" className="block">
                    <div className="flex items-center justify-center gap-2 w-full py-2 px-4 bg-[#8b2332] hover:bg-[#6d1a27] text-white rounded-lg transition-colors text-sm">
                      <BookOpen size={16} />
                      View All Eras
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Subscription Section */}
      <div className="py-16 bg-gradient-to-br from-[#8b2332] to-[#6d1a27]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-full mb-6">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl md:text-4xl font-serif text-white mb-4">
                Stay Connected to History
              </h2>
              <p className="text-lg text-white/90 max-w-2xl mx-auto">
                Join thousands of history enthusiasts receiving daily insights from church history delivered straight to your inbox.
              </p>
            </div>
            
            {/* Form Section */}
            <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
              {isSubscribed ? (
                <div className="text-center py-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                    <Check className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-serif text-gray-900 mb-2">
                    Welcome Aboard!
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Thank you for joining our community. Check your inbox for a confirmation email.
                  </p>
                  <button
                    onClick={() => setIsSubscribed(false)}
                    className="text-[#8b2332] hover:underline text-sm"
                  >
                    Subscribe another email
                  </button>
                </div>
              ) : (
                <>
                  <form onSubmit={handleSubscribe} className="mb-8">
                    <div className="relative">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email address"
                        required
                        className="w-full py-4 pl-6 pr-36 rounded-full border-2 border-[#8b2332]/30 bg-white text-gray-800 text-base focus:outline-none focus:ring-2 focus:ring-[#8b2332] focus:border-[#8b2332] placeholder-gray-400"
                      />
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center justify-center gap-2 px-6 py-3 bg-[#8b2332] hover:bg-[#6d1a27] disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold rounded-full transition-all duration-300 whitespace-nowrap text-sm shadow-lg hover:shadow-xl"
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
                  </form>
                  
                  {/* Benefits Section */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-8 h-8 bg-[#8b2332]/10 rounded-full flex items-center justify-center">
                        <Calendar className="w-4 h-4 text-[#8b2332]" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">Daily Insights</h4>
                        <p className="text-sm text-gray-600">
                          Discover historical events that happened on this day throughout church history.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-8 h-8 bg-[#8b2332]/10 rounded-full flex items-center justify-center">
                        <Quote className="w-4 h-4 text-[#8b2332]" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">Inspiring Quotes</h4>
                        <p className="text-sm text-gray-600">
                          Read wisdom from church fathers, reformers, and notable Christian figures.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-8 h-8 bg-[#8b2332]/10 rounded-full flex items-center justify-center">
                        <Users className="w-4 h-4 text-[#8b2332]" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">Notable Figures</h4>
                        <p className="text-sm text-gray-600">
                          Learn about influential theologians, martyrs, and leaders who shaped Christianity.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-center text-sm text-gray-500 mt-6">
                    We respect your privacy. Unsubscribe at any time.
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContentSection;