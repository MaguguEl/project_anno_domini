import React from 'react';
import { Link } from 'react-router-dom';
import { Home, AlertTriangle, ArrowLeft, Compass } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-navy-950 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        {/* 404 Badge */}
        <div className="relative mb-8">
          <div className="w-32 h-32 mx-auto bg-burgundy-50 dark:bg-burgundy-900/30 border-4 border-burgundy-200 dark:border-burgundy-800 rounded-full flex items-center justify-center shadow-lg">
            <AlertTriangle className="w-16 h-16 text-burgundy-600 dark:text-burgundy-400" />
          </div>
        </div>

        {/* Error Code */}
        <div className="mb-6">
          <h1 className="text-8xl font-black text-burgundy-700 dark:text-burgundy-400">
            404
          </h1>
          <div className="h-1 w-24 mx-auto bg-burgundy-500 dark:bg-burgundy-400 rounded-full mt-2"></div>
        </div>

        {/* Message */}
        <h2 className="text-2xl font-bold text-navy-800 dark:text-navy-100 mb-3">
          Page Not Found
        </h2>
        <p className="text-navy-600 dark:text-navy-300 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <Link
            to="/"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-burgundy-600 hover:bg-burgundy-700 dark:bg-burgundy-500 dark:hover:bg-burgundy-600 text-white font-semibold rounded-lg shadow-lg transition-all transform hover:-translate-y-0.5"
          >
            <Home className="w-4 h-4" />
            Back to Home
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-navy-600 hover:bg-navy-700 dark:bg-navy-500 dark:hover:bg-navy-600 text-white font-semibold rounded-lg shadow-lg transition-all transform hover:-translate-y-0.5"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </button>
        </div>

        {/* Navigation Tip */}
        <div className="flex items-center justify-center gap-2 text-sm text-navy-500 dark:text-navy-400">
          <Compass className="w-4 h-4" />
          <span>Check the URL or use the navigation menu</span>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;