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

// Check if the clicked element is inside a Link component
    if ((event.target as HTMLElement).tagName === 'BUTTON' || (event.target as HTMLElement).closest('button')) {
        return; // Ignore clicks on buttons
    }

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
        <input
          ref={inputRef}
          type="text"
          className={`input input-bordered w-full text-sm py-1 px-2 focus:outline-none ${isExpanded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ fontSize: '0.875rem' }} // Tailwind's `text-sm`
        />
        {isExpanded ? (
          <XIcon
            className="h-5 w-5 text-gray-500 cursor-pointer ml-1 shrink-0"
            onClick={handleCollapse}
          />
        ) : (
          <SearchIcon
            className="h-5 w-5 text-gray-500 cursor-pointer shrink-0"
            onClick={handleExpand}
          />
        )}
      </div>
    </div>
  );
};

export default SearchBar;
