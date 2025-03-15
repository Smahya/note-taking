import { lazy } from "react";
import { LoadingWrapper, Text } from "@/components";
import { EmptyNotes } from "./Shared";
import { useNotesContext } from "../context/NotesContext";
import { NotesList } from "./NotesList";
import { Note } from "@/types/database";
import { useNotesDataContext } from "../context/NotesDataContext";

const CreateNoteButton = lazy(() => import("./CreateButton"));

export const LeftNotesPanel = () => {
  const { isArchived } = useNotesContext();
  const { notesQuery, handleNoteClick, activeNote } = useNotesDataContext();

  return (
    <div className="border-r border-neutral-200 dark:border-neutral-800 pl-6 pr-4 pt-6 grid gap-3 content-start">
      <CreateNoteButton onClick={() => handleNoteClick({} as Note, true)} />
      {isArchived && (
        <Text variant="body2">
          All your archived notes are stored here. You can restore or delete
          them anytime.
        </Text>
      )}
      <LoadingWrapper isLoading={notesQuery.isLoading} loaderClassName="mt-20">
        {notesQuery.data?.length === 0 ? (
          <EmptyNotes archived={isArchived} />
        ) : (
          <NotesList
            activeId={activeNote?.uuid!}
            data={notesQuery.data}
            handleNoteClick={handleNoteClick}
          />
        )}
      </LoadingWrapper>
    </div>
  );
};
