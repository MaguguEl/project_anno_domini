import React from 'react';
import { Link } from 'react-router-dom';
import { Book, Users, Archive, Library, BookMarked, Tags, Clock, Search } from 'lucide-react';

const categories = [
  {
    id: 'primary',
    title: 'Primary Church Documents',
    icon: Book,
    description: 'Original texts, creeds, and official church documents',
    color: 'bg-burgundy-700 dark:bg-burgundy-300',
  },
  {
    id: 'fathers',
    title: 'Early Church Fathers Writings',
    icon: Users,
    description: 'Writings from influential early Christian leaders',
    color: 'bg-navy-700 dark:bg-navy-300',
  },
  {
    id: 'books',
    title: 'External Book Repositories',
    icon: Library,
    description: 'Digital libraries and book collections',
    color: 'bg-gold-600 dark:bg-gold-400',
  },
  {
    id: 'archives',
    title: 'Archive Links',
    icon: Archive,
    description: 'CCEL, NewAdvent, Internet Archive, and more',
    color: 'bg-emerald-600 dark:bg-emerald-400',
  },
  {
    id: 'commentaries',
    title: 'Historians & Commentaries',
    icon: BookMarked,
    description: 'Historical analysis and scholarly works',
    color: 'bg-purple-600 dark:bg-purple-400',
  },
  {
    id: 'topics',
    title: 'Topic Tags',
    icon: Tags,
    description: 'Browse by councils, theology, liturgy, and more',
    color: 'bg-rose-600 dark:bg-rose-400',
  },
];

const SourcesPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-navy-900 pb-12">
      {/* Header */}
      <div className="bg-gold-500 py-12">
        <div className="container-max">
          <div>
            <h1 className="text-4xl font-serif mb-4">Primary Sources</h1>
            <p className="text-base text-navy-800 max-w-3xl">
              Explore primary sources, historical texts, and external references from
              across church history. Access digital archives, early church writings,
              and scholarly resources.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container-max py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <div key={category.id}>
                <Link
                  to={`/sources/${category.id}`}
                  className="block h-full"
                >
                  <div className="bg-white dark:bg-navy-800 rounded-lg shadow-md overflow-hidden h-full hover:shadow-lg transition-shadow">
                    <div className={`h-2 ${category.color}`} />
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <Icon className={`w-8 h-8 ${category.color} text-white rounded-lg p-1.5`} />
                        <h2 className="text-xl font-serif text-navy-800 dark:text-navy-100">
                          {category.title}
                        </h2>
                      </div>
                      <p className="text-navy-600 dark:text-navy-300">
                        {category.description}
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>

        {/* Quick Access */}
        <div className="mt-12">
          <h2 className="text-2xl font-serif text-navy-800 dark:text-navy-100 mb-6">
            Quick Access
          </h2>
          <div className="bg-white dark:bg-navy-800 rounded-lg shadow-md p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link
                to="/sources/bookmarks"
                className="flex items-center gap-3 p-4 rounded-lg hover:bg-slate-50 dark:hover:bg-navy-700 transition-colors"
              >
                <BookMarked className="w-6 h-6 text-burgundy-700 dark:text-burgundy-300" />
                <div>
                  <div className="font-medium text-navy-800 dark:text-navy-100">
                    My Bookmarks
                  </div>
                  <div className="text-sm text-navy-600 dark:text-navy-300">
                    Access saved sources
                  </div>
                </div>
              </Link>
              
              <Link
                to="/sources/external"
                className="flex items-center gap-3 p-4 rounded-lg hover:bg-slate-50 dark:hover:bg-navy-700 transition-colors"
              >
                <Archive className="w-6 h-6 text-navy-700 dark:text-navy-300" />
                <div>
                  <div className="font-medium text-navy-800 dark:text-navy-100">
                    External Links
                  </div>
                  <div className="text-sm text-navy-600 dark:text-navy-300">
                    Browse digital libraries
                  </div>
                </div>
              </Link>
              
              <Link
                to="/sources/recent"
                className="flex items-center gap-3 p-4 rounded-lg hover:bg-slate-50 dark:hover:bg-navy-700 transition-colors"
              >
                <Clock className="w-6 h-6 text-gold-600 dark:text-gold-400" />
                <div>
                  <div className="font-medium text-navy-800 dark:text-navy-100">
                    Recently Viewed
                  </div>
                  <div className="text-sm text-navy-600 dark:text-navy-300">
                    Your history
                  </div>
                </div>
              </Link>
              
              <Link
                to="/sources/search"
                className="flex items-center gap-3 p-4 rounded-lg hover:bg-slate-50 dark:hover:bg-navy-700 transition-colors"
              >
                <Search className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                <div>
                  <div className="font-medium text-navy-800 dark:text-navy-100">
                    Advanced Search
                  </div>
                  <div className="text-sm text-navy-600 dark:text-navy-300">
                    Find specific sources
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SourcesPage;