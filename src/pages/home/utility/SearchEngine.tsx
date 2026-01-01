import React, { useState } from 'react';
import { Search } from 'lucide-react';

const SearchEngine = () => {
  const [query, setQuery] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      console.log('Search:', query);
      setQuery('');
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="relative w-full">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search figures, events, and texts..."
        className="w-full py-3 px-4 pl-12 rounded-full border-2 border-[#8b2332]/30 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#8b2332] focus:border-[#8b2332] text-base transition-colors duration-300"
      />
      <button 
        type="submit" 
        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#8b2332] hover:text-[#6d1a27] transition-colors duration-300"
      >
        <Search size={20} />
      </button>
    </form>
  );
};

export default SearchEngine;