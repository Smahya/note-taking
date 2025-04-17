"use client";

import { usePathname } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { NOTE_ID_KEY } from "../contants";
import { useGetListNotes } from "../service/hooks";
import { Note } from "@/types/database";
import { parseAsString, useQueryStates } from "nuqs";

type NotesDataContextType = {
  notesQuery: ReturnType<typeof useGetListNotes>;
  handleNoteClick: (note: Note, isNew?: boolean) => void;
  activeNote: Note | null;
  setSearchParams: (params: Record<string, string>) => void;
  searchParams: Record<string, any>;
};

export const NotesDataContext = createContext<NotesDataContextType>(
  {} as NotesDataContextType
);

export const useNotesDataContext = () => {
  const context = useContext(NotesDataContext);
  if (!context) {
    throw new Error(
      "useNotesDataContext must be used within a NotesDataProvider"
    );
  }
  return context;
};

export const NotesDataProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const pathname = usePathname();
  const [searchParams, setSearchParams] = useQueryStates({
    [NOTE_ID_KEY]: parseAsString,
    tag: parseAsString,
  });
  const [activeNote, setActiveNote] = useState<Note | null>(null);

  const isArchived = useMemo(() => pathname.includes("archived"), [pathname]);
  const tag = useMemo(() => searchParams.tag, [searchParams]);
  const noteId = useMemo(() => searchParams.noteId, [searchParams]);
  const notesQuery = useGetListNotes(isArchived, tag!);

  const handleNoteClick = useCallback(
    (note: Note, isNew?: boolean) => {
      const id = isNew ? "new" : note.uuid;
      setSearchParams({ [NOTE_ID_KEY]: id });
      setActiveNote(note);
    },
    [setSearchParams]
  );

  useEffect(() => {
    if (noteId === "new") {
      setActiveNote({} as Note);
    } else if (noteId) {
      const found =
        notesQuery.data?.find((note) => note.uuid === noteId) || ({} as Note);
      setActiveNote(found);
    } else {
      const firstItem = notesQuery.data?.[0];
      if (firstItem) {
        handleNoteClick(firstItem);
      }
    }
  }, [noteId, notesQuery.data, handleNoteClick]);

  const value = useMemo(
    () => ({
      notesQuery,
      handleNoteClick,
      activeNote,
      setSearchParams,
      searchParams,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [notesQuery]
  );
  return (
    <NotesDataContext.Provider value={value}>
      {children}
    </NotesDataContext.Provider>
  );
};
