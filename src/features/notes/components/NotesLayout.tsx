import { PageWrapper } from "@/components";

import { LeftNotesPanel } from "./LeftNotesPanel";
import { RightNotesPanel } from "./RightNotesPanel";
import { NotesProvider, useNotesContext } from "../context/NotesContext";
import { NotesDataProvider } from "../context/NotesDataContext";
import { NotesSearch } from "./NotesSearch";
import { MiddlePanel } from "./MiddlePanel";

export const NotesLayout = () => {
  return (
    <NotesDataProvider>
      <NotesProvider>
        <NotesLayoutContent />
      </NotesProvider>
    </NotesDataProvider>
  );
};

const NotesLayoutContent = () => {
  const { type } = useNotesContext();

  return (
    <PageWrapper
      title={type === "notes" ? "All Notes" : "Archived Notes"}
      navbarRight={<NotesSearch />}
    >
      <div className="grid grid-cols-[258px_1fr_258px] h-[calc(100vh-81px)] overflow-y-auto">
        <LeftNotesPanel />
        <MiddlePanel />
        <RightNotesPanel />
      </div>
    </PageWrapper>
  );
};
