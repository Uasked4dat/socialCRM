import React, { useState, useRef, useEffect } from 'react';
import { SearchIcon, XIcon } from '@heroicons/react/outline';

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchQuery, setSearchQuery }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleExpand = () => {
    setIsExpanded(true);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 300); // Adjust the timeout to match the animation duration
  };

  const handleCollapse = () => {
    setIsExpanded(false);
    setSearchQuery('');
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
      handleCollapse();
    }
  };

  useEffect(() => {
    if (isExpanded) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isExpanded]);

  return (
    <div className="relative">
      <div className={`flex items-center transition-all duration-300 ${isExpanded ? 'w-48' : 'w-8'} min-w-[1.5rem]`}>
        {isExpanded && (
          <input
            ref={inputRef}
            type="text"
            className="input input-bordered w-full text-sm py-1 px-4 focus:outline-none transition-opacity duration-300 h-8"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ fontSize: '0.875rem' }} // Tailwind's `text-sm`
          />
        )}
        {isExpanded ? (
          <XIcon
            className="h-6 w-6 text-gray-500 cursor-pointer ml-1 shrink-0"
            onClick={handleCollapse}
          />
        ) : (
          <SearchIcon
            className="h-6 w-6 text-gray-500 cursor-pointer shrink-0 mx-4 mb-2"
            onClick={handleExpand}
          />
        )}
      </div>
    </div>
  );
};

export default SearchBar;
