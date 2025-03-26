"use client";

import React, { useEffect, useRef } from "react";
import SearchIcon from "@/assets/icons/search.svg";
import { Note } from "@/types/database";
import { useDocument } from "@/hooks/useDocument";
interface SearchBarProps {
  onSelect: (selected: Note) => void;
  results: Note[];
  value: string;
  isVisible: boolean;
  setIsVisible: (visible: boolean) => void;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSelect,
  results,
  value,
  isVisible,
  setIsVisible,
  onChange,
}) => {
  const searchRef = useRef<HTMLDivElement>(null);
  const { _document } = useDocument();
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

    _document?.addEventListener("mousedown", handleClickOutside);
    return () =>
      _document?.removeEventListener("mousedown", handleClickOutside);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          value={value}
          onChange={onChange}
        />
      </div>

      {isVisible && results.length > 0 && (
        <div className="absolute w-full mt-2 bg-white dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-600 rounded-lg shadow-lg">
          {results.map((result, index) => (
            <div
              key={index}
              className="px-4 py-2 cursor-pointer hover:bg-neutral-200 dark:hover:bg-neutral-800"
              onClick={() => onSelect(result)}
            >
              {result.title}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
