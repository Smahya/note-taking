import { lazy } from "react";
import { LoadingWrapper, Text } from "@/components";
import { EmptyNotes } from "./Shared";
import { useNotesContext } from "../context/NotesContext";
import { NotesList } from "./NotesList";
import { Note } from "@/types/database";
import { useNotesDataContext } from "../context/NotesDataContext";
import { cn } from "@/lib/utils";

const CreateNoteButton = lazy(() => import("./CreateButton"));

export const LeftNotesPanel = ({
  className,
  mobile,
  setScreen,
}: {
  className?: string;
  mobile?: boolean;
  setScreen?: (screen: Record<string, any>) => void;
}) => {
  const { isArchived } = useNotesContext();
  const { notesQuery, handleNoteClick, activeNote } = useNotesDataContext();

  function handleCreateNote() {
    handleNoteClick({} as Note, true);
    setScreen?.({ screen: "middle" });
  }

  function onNoteClick(note: Note) {
    handleNoteClick(note);
    setScreen?.({ screen: "middle" });
  }

  return (
    <div
      className={cn(
        "relative border-r border-neutral-200 dark:border-neutral-800 pl-6 pr-4 pt-6 grid gap-3 content-start",
        className
      )}
    >
      <CreateNoteButton mobile={mobile} onClick={handleCreateNote} />
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
            handleNoteClick={onNoteClick}
          />
        )}
      </LoadingWrapper>
    </div>
  );
};
