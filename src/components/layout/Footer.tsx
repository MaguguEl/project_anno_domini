import React from 'react';
import { Link } from 'react-router-dom';
import { Github } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-slate-50 text-gray-50 dark:text-white mt-auto">
      <div className="container-max py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col items-center md:items-start gap-1">
            <div className="flex items-center gap-2 text-xs">
              <span className="text-gray-600 dark:text-gray-400">Copyright © {currentYear} </span>
              <Link 
                to="/" 
                className="text-gray-600 dark:text-burgundy-400 hover:text-burgundy-700 dark:hover:text-burgundy-300 transition-colors"
              >
                Anno Domini
              </Link>
              <span className="text-gray-600 dark:text-gray-400">•</span>
              <span className="text-gray-600 dark:text-gray-400">
                Powered by{' '}
                <a 
                  href="https://maguguel.netlify.app/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-burgundy-600 dark:text-burgundy-400 hover:text-burgundy-700 dark:hover:text-burgundy-300 transition-colors"
                >
                  Elvis Magugu
                </a>
              </span>
            </div>
            <div className="flex items-center gap-4 text-xs text-gray-600 dark:text-gray-400">
              <Link to="/about" className="hover:text-burgundy-700 dark:hover:text-burgundy-400 transition-colors">About</Link>
              <Link to="/privacy" className="hover:text-burgundy-700 dark:hover:text-burgundy-400 transition-colors">Privacy</Link>
              <Link to="/terms" className="hover:text-burgundy-700 dark:hover:text-burgundy-400 transition-colors">Terms</Link>
            </div>
          </div>
          
          <a 
            href="https://github.com/MaguguEl/project_anno_domini" 
            target="_blank" 
            rel="noreferrer" 
            className="text-xs text-gray-700 dark:text-gray-300 hover:text-burgundy-600 dark:hover:text-burgundy-400 transition-colors flex items-center gap-1.5"
          >
            <Github size={14} />
            <span>Source</span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;