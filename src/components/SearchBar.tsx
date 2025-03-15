"use client";

import React, { useState, useEffect, useRef } from "react";
import SearchIcon from "@/assets/icons/search.svg";
interface SearchBarProps {
  options: string[];
  onSelect?: (selected: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ options, onSelect }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<string[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Handle clicking outside of search results
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    if (value.trim() === "") {
      setResults([]);
      setIsVisible(false);
      return;
    }

    const filtered = options.filter((option) =>
      option.toLowerCase().includes(value.toLowerCase())
    );
    setResults(filtered);
    setIsVisible(true);
  };

  const handleSelect = (selected: string) => {
    setSearchTerm(selected);
    setIsVisible(false);
    if (onSelect) {
      onSelect(selected);
    }
  };

  return (
    <div className="relative w-full" ref={searchRef}>
      <div className="relative app-background shadow-custom dark:shadow-none rounded-lg min-w-[300px]">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <SearchIcon className="text-neutral-500 dark:text-neutral-400" />
        </div>
        <input
          type="search"
          className="w-full p-3 pl-10 text-sm app-background text-neutral-900 dark:text-neutral-100 rounded-lg border border-neutral-300 dark:border-neutral-600 placeholder-neutral-500 focus:outline-none"
          placeholder="Search by title, content, or tags..."
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>

      {isVisible && results.length > 0 && (
        <div className="absolute w-full mt-2 bg-white dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-600 rounded-lg shadow-lg">
          {results.map((result, index) => (
            <div
              key={index}
              className="px-4 py-2 cursor-pointer hover:bg-neutral-200 dark:hover:bg-neutral-800"
              onClick={() => handleSelect(result)}
            >
              {result}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
