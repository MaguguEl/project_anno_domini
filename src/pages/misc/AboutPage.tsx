import React from 'react';
import { Mail, ExternalLink, BookOpen, Users, Globe } from 'lucide-react';

const AboutPage: React.FC = () => {
  return (
    <div className="bg-slate-50 dark:bg-navy-900 min-h-screen pb-6 sm:pb-8 md:pb-12">
      {/* Header with gradient background and decorative elements */}
      <div className="relative bg-gradient-to-br from-burgundy-900 via-burgundy-800 to-burgundy-950 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 sm:w-48 sm:h-48 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 sm:w-56 sm:h-56 bg-white rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative container-max px-3 sm:px-4 py-6 sm:py-8 md:py-12 lg:py-16">
          <div className="max-w-4xl">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-white mb-2 sm:mb-3 md:mb-4 leading-tight">
              About Anno Domini
            </h1>
            <p className="text-xs sm:text-sm md:text-base text-burgundy-100 leading-relaxed max-w-3xl">
              Exploring the rich tapestry of Christian history through scholarly research, 
              primary sources, and comprehensive historical documentation.
            </p>
            
            {/* Stats Section */}
            <div className="flex flex-wrap gap-3 sm:gap-4 md:gap-6 mt-4 sm:mt-6 md:mt-8">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center">
                  <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <div>
                  <div className="text-lg sm:text-xl md:text-2xl font-bold text-white">1 AD</div>
                  <div className="text-xs text-burgundy-200">Historical Scope</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center">
                  <Users className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <div>
                  <div className="text-lg sm:text-xl md:text-2xl font-bold text-white">8</div>
                  <div className="text-xs text-burgundy-200">Historical Volumes</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center">
                  <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <div>
                  <div className="text-lg sm:text-xl md:text-2xl font-bold text-white">Catholic</div>
                  <div className="text-xs text-burgundy-200">Approach</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content - Original Structure */}
      <div className="container-max py-6 sm:py-8 md:py-12 px-3 sm:px-4">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg prose-navy dark:prose-invert max-w-none">
            <p className="text-base sm:text-lg text-navy-700 dark:text-navy-300 leading-relaxed mb-4 sm:mb-6">
              <em>Anno Domini</em> (Latin for "in the year of the Lord") is the designation used to number years in 
              the Christian calendar, counting from the traditionally recognized year of Jesus Christ's birth. This 
              Christian History Explorer bears this name to reflect its purpose: to chart the course of Christian 
              history through the centuries marked by this chronological system.
            </p>

            <p className="text-navy-700 dark:text-navy-300 leading-relaxed mb-4 sm:mb-6">
              The Christian History Explorer is a digital resource dedicated to exploring the rich heritage 
              of Christian history through direct engagement with primary sources, scholarly research, and comprehensive 
              historical documentation. Our platform serves scholars, students, and anyone interested in understanding 
              the development of Christianity from the apostolic age to the present day.
            </p>

            <p className="text-navy-700 dark:text-navy-300 leading-relaxed mb-4 sm:mb-6">
              Rather than presenting only secondary interpretations, this application provides access to the original 
              documents, creeds, confessions, letters, and writings that shaped Christian history. By consulting primary 
              sources—including patristic writings, ecumenical council declarations, reformation texts, and historical 
              correspondence—users can encounter the actual words and arguments of historical figures, gaining direct 
              insight into the theological debates, ecclesiastical decisions, and spiritual movements that formed the 
              Christian tradition.
            </p>

            <p className="text-navy-700 dark:text-navy-300 leading-relaxed mb-4 sm:mb-6">
              The historical framework of this explorer is structured around the comprehensive periodization established 
              by Philip Schaff (1819-1893), whose eight-volume "History of the Christian Church" remains a cornerstone 
              of historical scholarship. Schaff's methodology combined rigorous historical research with an appreciation 
              for the organic development of Christian doctrine and practice across distinct historical eras.
            </p>

            <p className="text-navy-700 dark:text-navy-300 leading-relaxed mb-6 sm:mb-8">
              The Christian History Explorer offers a chronological exploration of key events, comprehensive 
              biographical profiles of influential theologians and church leaders, access to foundational 
              documents and creeds, and curated educational resources organized by historical periods and themes.
            </p>

            <h2 className="text-xl sm:text-2xl font-serif text-burgundy-700 dark:text-burgundy-300 mt-6 sm:mt-12 mb-4 sm:mb-6">
              Our Approach
            </h2>

            <p className="text-navy-700 dark:text-navy-300 leading-relaxed mb-4 sm:mb-6">
              We are committed to presenting church history with academic rigor while maintaining accessibility 
              for diverse audiences. Our content is carefully researched and cross-referenced with established 
              historical sources. We strive to present multiple perspectives on historical events and developments, 
              acknowledging the complexity of historical interpretation while maintaining respect for the faith 
              traditions we document.
            </p>

            <p className="text-navy-700 dark:text-navy-300 leading-relaxed mb-6 sm:mb-8">
              Our goal is not to advocate for any particular denominational position, but to provide a comprehensive 
              and balanced exploration of the Christian historical tradition in all its richness and diversity.
            </p>

            <h2 className="text-xl sm:text-2xl font-serif text-burgundy-700 dark:text-burgundy-300 mb-4 sm:mb-6">
              Additional Information
            </h2>

            <p className="text-navy-700 dark:text-navy-300 leading-relaxed mb-3 sm:mb-4">
              <strong>Historical Scope:</strong> 1 AD - Present Day
            </p>

            <p className="text-navy-700 dark:text-navy-300 leading-relaxed mb-3 sm:mb-4">
              <strong>Primary Framework:</strong> Philip Schaff's eight-volume History of the Christian Church
            </p>

            <p className="text-navy-700 dark:text-navy-300 leading-relaxed mb-3 sm:mb-4">
              <strong>Content Focus:</strong> Historical events, biographical profiles, primary documents, and educational resources
            </p>

            <p className="text-navy-700 dark:text-navy-300 leading-relaxed mb-6 sm:mb-8">
              <strong>Approach:</strong> Scholarly, ecumenical, and accessible to diverse audiences
            </p>

            <h2 className="text-xl sm:text-2xl font-serif text-burgundy-700 dark:text-burgundy-300 mb-4 sm:mb-6">
              Related Resources
            </h2>

            <p className="text-navy-700 dark:text-navy-300 leading-relaxed mb-3">
              <a
                href="https://www.ccel.org"
                target="_blank"
                rel="noopener noreferrer"
                className="text-burgundy-700 dark:text-burgundy-300 hover:underline inline-flex items-center gap-1 sm:gap-2"
              >
                Christian Classics Ethereal Library 
                <ExternalLink size={14} className="inline" />
              </a>
            </p>

            <p className="text-navy-700 dark:text-navy-300 leading-relaxed mb-3">
              <a
                href="https://www.earlychristianwritings.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-burgundy-700 dark:text-burgundy-300 hover:underline inline-flex items-center gap-1 sm:gap-2"
              >
                Early Christian Writings 
                <ExternalLink size={14} className="inline" />
              </a>
            </p>

            <p className="text-navy-700 dark:text-navy-300 leading-relaxed mb-6 sm:mb-8">
              <a
                href="https://archive.org"
                target="_blank"
                rel="noopener noreferrer"
                className="text-burgundy-700 dark:text-burgundy-300 hover:underline inline-flex items-center gap-1 sm:gap-2"
              >
                Internet Archive 
                <ExternalLink size={14} className="inline" />
              </a>
            </p>

            <h2 className="text-xl sm:text-2xl font-serif text-burgundy-700 dark:text-burgundy-300 mb-4 sm:mb-6">
              Contact Information
            </h2>

            <p className="text-navy-700 dark:text-navy-300 leading-relaxed mb-3 sm:mb-4">
              We welcome feedback, suggestions, and scholarly contributions to improve our historical resources.
            </p>

            <p className="text-navy-700 dark:text-navy-300 leading-relaxed">
              <Mail className="w-4 h-4 inline mr-2" />
              <a 
                href="mailto:contact@annodomini.org" 
                className="text-burgundy-700 dark:text-burgundy-300 hover:underline"
              >
                contact@annodomini.org
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;