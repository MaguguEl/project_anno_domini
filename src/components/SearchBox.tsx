import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';

interface SearchBoxProps {
  placeholder?: string;
  className?: string;
}

const SearchBox: React.FC<SearchBoxProps> = ({ 
  placeholder = "Search events, figures, or documents...",
  className = ""
}) => {
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
    <form onSubmit={handleSubmit} className={`relative ${className}`}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="w-full py-2 px-4 pl-10 rounded-full border border-navy-200 dark:border-navy-700 bg-white dark:bg-navy-800 text-navy-800 dark:text-navy-100 focus:outline-none focus:ring-2 focus:ring-burgundy-300 dark:focus:ring-burgundy-600"
      />
      <button 
        type="submit" 
        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-navy-400 dark:text-navy-500"
      >
        <Search size={18} />
      </button>
    </form>
  );
};

export default SearchBox;