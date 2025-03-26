"use client";

import { usePathname } from "next/navigation";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { NOTE_ID_KEY } from "../contants";
import { useQueryState } from "nuqs";

type NoteType = "notes" | "archived";
type NotesContextType = {
  type: NoteType;
  setType: (type: NoteType) => void;
  isArchived: boolean;
  hasNotes: boolean;
  noteId: string | null;
};

export const NotesContext = createContext<NotesContextType>(
  {} as NotesContextType
);

export const useNotesContext = () => {
  const context = useContext(NotesContext);
  if (!context) {
    throw new Error("useNotesContext must be used within a NotesProvider");
  }
  return context;
};

export const NotesProvider = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const [noteId] = useQueryState(NOTE_ID_KEY);

  const [type, setType] = useState<"notes" | "archived">("notes");

  const isArchived = useMemo(() => pathname.includes("archived"), [pathname]);
  const hasNotes = !!noteId;

  useEffect(() => {
    if (pathname.includes("archived")) {
      setType("archived");
    } else {
      setType("notes");
    }
  }, [pathname]);

  const value = useMemo(
    () => ({
      type,
      setType,
      isArchived,
      hasNotes,
      noteId,
    }),
    [type, setType, isArchived, hasNotes, noteId]
  );
  return (
    <NotesContext.Provider value={value}>{children}</NotesContext.Provider>
  );
};
