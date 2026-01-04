import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, ArrowLeft, BookOpen, Shield, Copyright } from 'lucide-react';
import { motion } from 'framer-motion';

const ExternalLinksPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-navy-900">
      {/* Header */}
      <div className="bg-navy-800 dark:bg-navy-900 text-white py-12">
        <div className="container-max">
          <div className="flex items-center gap-4 mb-6">
            <Link to="/sources" className="text-white/80 hover:text-white">
              <ArrowLeft size={24} />
            </Link>
            <div>
              <h1 className="text-3xl font-serif">Using External Resources</h1>
              <p className="text-navy-200 mt-2">
                Guidelines for accessing and citing external sources
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container-max py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          {/* Guidelines */}
          <div className="bg-white dark:bg-navy-800 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-serif text-navy-800 dark:text-navy-100 mb-4">
              Access Guidelines
            </h2>
            <div className="space-y-4 text-navy-600 dark:text-navy-300">
              <div className="flex items-start gap-3">
                <ExternalLink className="w-5 h-5 text-gold-600 dark:text-gold-400 flex-shrink-0 mt-0.5" />
                <p>All sources are hosted on external platforms. Clicking links will open new tabs.</p>
              </div>
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                <p>Verify the reliability of sources. Archive platforms preserve original content, but always check authenticity.</p>
              </div>
              <div className="flex items-start gap-3">
                <Copyright className="w-5 h-5 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5" />
                <p>Respect copyright and usage terms. Many historical works are in the public domain, but modern editions may have restrictions.</p>
              </div>
              <div className="flex items-start gap-3">
                <BookOpen className="w-5 h-5 text-navy-600 dark:text-navy-400 flex-shrink-0 mt-0.5" />
                <p>For academic use, cite both the original work and the digital platform hosting it.</p>
              </div>
            </div>
          </div>

          {/* Quick Links to Categories */}
          <div>
            <h2 className="text-xl font-serif text-navy-800 dark:text-navy-100 mb-4">
              Browse Our Curated Collections
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link
                to="/sources/books"
                className="block p-6 bg-gold-50 dark:bg-gold-900/20 rounded-lg hover:bg-gold-100 dark:hover:bg-gold-900/30 transition-colors"
              >
                <h3 className="font-serif text-lg text-navy-800 dark:text-navy-100 mb-2">
                  Book Repositories
                </h3>
                <p className="text-sm text-navy-600 dark:text-navy-300">
                  Digital libraries like Google Books, Project Gutenberg, and Open Library
                </p>
              </Link>
              
              <Link
                to="/sources/archives"
                className="block p-6 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg hover:bg-emerald-100 dark:hover:bg-emerald-900/30 transition-colors"
              >
                <h3 className="font-serif text-lg text-navy-800 dark:text-navy-100 mb-2">
                  Archive Links
                </h3>
                <p className="text-sm text-navy-600 dark:text-navy-300">
                  Curated archives like CCEL, New Advent, and the Vatican Digital Library
                </p>
              </Link>
              
              <Link
                to="/sources/commentaries"
                className="block p-6 bg-purple-50 dark:bg-purple-900/20 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors"
              >
                <h3 className="font-serif text-lg text-navy-800 dark:text-navy-100 mb-2">
                  Historians & Commentaries
                </h3>
                <p className="text-sm text-navy-600 dark:text-navy-300">
                  Works by historians from Josephus to modern scholars like Rodney Stark
                </p>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ExternalLinksPage;