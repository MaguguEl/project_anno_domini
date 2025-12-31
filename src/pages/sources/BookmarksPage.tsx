import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookMarked, ArrowLeft, Trash2, Edit3, Save } from 'lucide-react';
import { motion } from 'framer-motion';
import { SourceBookmark } from '../../types';

// Mock data - replace with actual data source
const mockBookmarks: SourceBookmark[] = [
  {
    id: '1',
    sourceId: 'eusebius-history',
    userId: 'user1',
    notes: 'Important reference for early church development',
    dateAdded: new Date('2024-03-15')
  },
  // Add more mock bookmarks...
];

const BookmarksPage: React.FC = () => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedNotes, setEditedNotes] = useState<string>('');

  const handleEdit = (bookmark: SourceBookmark) => {
    setEditingId(bookmark.id);
    setEditedNotes(bookmark.notes);
  };

  const handleSave = (bookmarkId: string) => {
    // Implement save functionality
    setEditingId(null);
  };

  const handleDelete = (bookmarkId: string) => {
    // Implement delete functionality
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-navy-900">
      {/* Header */}
      <div className="bg-burgundy-800 dark:bg-burgundy-900 text-white py-12">
        <div className="container-max">
          <div className="flex items-center gap-4 mb-6">
            <Link to="/sources" className="text-white/80 hover:text-white">
              <ArrowLeft size={24} />
            </Link>
            <div className="flex items-center gap-3">
              <BookMarked className="w-8 h-8" />
              <div>
                <h1 className="text-3xl font-serif">My Bookmarks</h1>
                <p className="text-burgundy-200 mt-1">
                  Your saved sources and personal notes
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container-max py-8">
        {mockBookmarks.length === 0 ? (
          <div className="bg-white dark:bg-navy-800 rounded-lg shadow-md p-8 text-center">
            <BookMarked className="w-12 h-12 text-navy-400 dark:text-navy-500 mx-auto mb-4" />
            <h2 className="text-xl font-serif text-navy-800 dark:text-navy-100 mb-2">
              No Bookmarks Yet
            </h2>
            <p className="text-navy-600 dark:text-navy-300 mb-6">
              Start saving sources and adding notes to build your personal library.
            </p>
            <Link to="/sources" className="btn-primary">
              Browse Sources
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {mockBookmarks.map((bookmark, index) => (
              <motion.div
                key={bookmark.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-navy-800 rounded-lg shadow-md overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <Link
                      to={`/sources/view/${bookmark.sourceId}`}
                      className="text-xl font-serif text-navy-800 dark:text-navy-100 hover:text-burgundy-700 dark:hover:text-burgundy-300"
                    >
                      Source Title Here {/* Replace with actual source title */}
                    </Link>
                    <div className="text-sm text-navy-600 dark:text-navy-300">
                      {bookmark.dateAdded.toLocaleDateString()}
                    </div>
                  </div>

                  {editingId === bookmark.id ? (
                    <div className="space-y-4">
                      <textarea
                        value={editedNotes}
                        onChange={(e) => setEditedNotes(e.target.value)}
                        className="w-full p-3 rounded-md border border-navy-200 bg-white dark:bg-navy-700 dark:border-navy-600 text-navy-800 dark:text-navy-100"
                        rows={3}
                      />
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => setEditingId(null)}
                          className="px-3 py-1 text-navy-600 dark:text-navy-300 hover:text-navy-800 dark:hover:text-navy-100"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => handleSave(bookmark.id)}
                          className="flex items-center gap-2 px-3 py-1 bg-burgundy-700 text-white rounded-md hover:bg-burgundy-800 dark:bg-burgundy-300 dark:text-navy-900 dark:hover:bg-burgundy-200"
                        >
                          <Save size={16} />
                          Save
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <p className="text-navy-600 dark:text-navy-300 mb-4">
                        {bookmark.notes}
                      </p>
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleEdit(bookmark)}
                          className="flex items-center gap-1 px-3 py-1 text-navy-600 dark:text-navy-300 hover:text-navy-800 dark:hover:text-navy-100"
                        >
                          <Edit3 size={16} />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(bookmark.id)}
                          className="flex items-center gap-1 px-3 py-1 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                        >
                          <Trash2 size={16} />
                          Delete
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookmarksPage;