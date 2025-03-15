"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
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

type NotesDataContextType = {
  notesQuery: ReturnType<typeof useGetListNotes>;
  handleNoteClick: (note: Note, isNew?: boolean) => void;
  activeNote: Note | null;
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
  const searchParams = useSearchParams();
  const router = useRouter();
  const [activeNote, setActiveNote] = useState<Note | null>(null);

  const isArchived = useMemo(() => pathname.includes("archived"), [pathname]);
  const noteId = searchParams.get(NOTE_ID_KEY);
  const notesQuery = useGetListNotes(isArchived);

  const handleNoteClick = useCallback(
    (note: Note, isNew?: boolean) => {
      const id = isNew ? "new" : note.uuid;
      router.push(`${pathname}?${NOTE_ID_KEY}=${id}`);
      setActiveNote(note);
    },
    [router, pathname]
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
