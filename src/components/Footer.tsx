import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Shield } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-navy-900 dark:bg-navy-950 text-white mt-auto">
      <div className="container-max py-12">
        {/* Main Footer Content */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-8">
          {/* Logo and Copyright Section */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <Shield className="w-12 h-12 text-burgundy-400" />
              <div>
                <div className="text-xl font-serif text-white">Anno Domini</div>
                <div className="text-sm text-gray-400">Christian History Explorer</div>
              </div>
            </div>
            <div className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Anno Domini. All rights reserved.
            </div>
          </div>
          
          {/* Links Section */}
          <div className="flex items-center gap-6">
            <Link 
              to="/about" 
              className="text-gray-300 hover:text-burgundy-400 transition-colors"
            >
              About
            </Link>
            <Link 
              to="/privacy" 
              className="text-gray-300 hover:text-burgundy-400 transition-colors"
            >
              Privacy
            </Link>
            <Link 
              to="/terms" 
              className="text-gray-300 hover:text-burgundy-400 transition-colors"
            >
              Terms
            </Link>
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noreferrer" 
              className="text-gray-300 hover:text-burgundy-400 transition-colors flex items-center gap-2"
            >
              <Github size={18} />
              <span>Source</span>
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-navy-700 my-6"></div>

        {/* Powered By Section */}
        <div className="text-center">
          <div className="text-gray-400 text-sm">
            Powered by{' '}
            <a 
              href="https://maguguel.netlify.app/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-burgundy-400 font-medium hover:text-burgundy-300 transition-colors"
            >
              Elvis Magugu
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;