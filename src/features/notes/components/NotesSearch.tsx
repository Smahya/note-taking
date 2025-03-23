import SearchBar from "@/components/SearchBar";
import { useNotesDataContext } from "../context/NotesDataContext";
import React, { useState } from "react";
import { Note } from "@/types/database";

export const NotesSearch = () => {
  const { notesQuery, handleNoteClick } = useNotesDataContext();

  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<Note[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value.trim() === "") {
      setResults([]);
      setIsVisible(false);
      return;
    }

    const filtered = notesQuery?.data?.filter((option: Note) => {
      return (
        option.title.toLowerCase().includes(value.toLowerCase()) ||
        option.note.toLowerCase().includes(value.toLowerCase()) ||
        option.tags.toLowerCase().includes(value.toLowerCase())
      );
    });
    setResults(filtered);
    setIsVisible(true);
  };

  const handleSelect = (selected: Note) => {
    setSearchTerm(selected.title);
    setIsVisible(false);
    handleNoteClick(selected);
  };

  return (
    <SearchBar
      value={searchTerm}
      results={results}
      onChange={handleSearch}
      onSelect={handleSelect}
      isVisible={isVisible}
      setIsVisible={setIsVisible}
    />
  );
};
