import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, ArrowLeft, Book, Archive, GraduationCap } from 'lucide-react';
import { motion } from 'framer-motion';

const externalResources = [
  {
    category: 'Digital Libraries',
    icon: Book,
    color: 'bg-burgundy-700 dark:bg-burgundy-300',
    links: [
      {
        title: 'Internet Archive',
        url: 'https://archive.org/details/texts?&sort=-downloads&page=1',
        description: 'Vast collection of digitized books and documents'
      },
      {
        title: 'Google Books',
        url: 'https://books.google.com',
        description: 'Extensive digital book repository'
      }
    ]
  },
  {
    category: 'Theological Databases',
    icon: Archive,
    color: 'bg-navy-700 dark:bg-navy-300',
    links: [
      {
        title: 'Christian Classics Ethereal Library',
        url: 'https://www.ccel.org',
        description: 'Classic Christian texts and resources'
      },
      {
        title: 'Early Christian Writings',
        url: 'http://www.earlychristianwritings.com',
        description: 'Collection of early Christian texts'
      }
    ]
  },
  {
    category: 'Academic Resources',
    icon: GraduationCap,
    color: 'bg-gold-600 dark:bg-gold-400',
    links: [
      {
        title: 'JSTOR',
        url: 'https://www.jstor.org',
        description: 'Academic articles and research papers'
      },
      {
        title: 'Project MUSE',
        url: 'https://muse.jhu.edu',
        description: 'Scholarly journals and books'
      }
    ]
  }
];

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
              <h1 className="text-3xl font-serif">External Resources</h1>
              <p className="text-navy-200 mt-2">
                Curated links to digital libraries and academic resources
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container-max py-8">
        <div className="space-y-12">
          {externalResources.map((category, categoryIndex) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: categoryIndex * 0.1 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <Icon className={`w-8 h-8 ${category.color} text-white rounded-lg p-1.5`} />
                  <h2 className="text-2xl font-serif text-navy-800 dark:text-navy-100">
                    {category.category}
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {category.links.map((link, linkIndex) => (
                    <motion.div
                      key={link.title}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: (categoryIndex * 0.1) + (linkIndex * 0.1) }}
                    >
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block bg-white dark:bg-navy-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                      >
                        <div className="p-6">
                          <div className="flex items-center justify-between mb-3">
                            <h3 className="text-xl font-serif text-navy-800 dark:text-navy-100">
                              {link.title}
                            </h3>
                            <ExternalLink className="w-5 h-5 text-navy-400 dark:text-navy-500" />
                          </div>
                          <p className="text-navy-600 dark:text-navy-300">
                            {link.description}
                          </p>
                        </div>
                      </a>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}

          {/* Usage Guidelines */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white dark:bg-navy-800 rounded-lg shadow-md p-6"
          >
            <h2 className="text-xl font-serif text-navy-800 dark:text-navy-100 mb-4">
              Usage Guidelines
            </h2>
            <div className="prose prose-navy dark:prose-invert max-w-none">
              <ul className="list-disc pl-4 text-navy-600 dark:text-navy-300 space-y-2">
                <li>External resources may require separate accounts or subscriptions</li>
                <li>Some academic resources are accessible through institutional login</li>
                <li>Always verify the reliability and authenticity of sources</li>
                <li>Respect copyright and usage restrictions when accessing materials</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ExternalLinksPage;