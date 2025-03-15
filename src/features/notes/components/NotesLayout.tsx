import { PageWrapper } from "@/components";
import SearchBar from "@/components/SearchBar";
import { LeftNotesPanel } from "./LeftNotesPanel";
import { NotesEditor } from "./NotesEditorForm";
import { RightNotesPanel } from "./RightNotesPanel";
import { NotesProvider, useNotesContext } from "../context/NotesContext";
import { NotesDataProvider } from "../context/NotesDataContext";

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
  const options = ["Option 1", "Option 2", "Another option", "Something else"];
  const { type } = useNotesContext();
  return (
    <PageWrapper
      title={type === "notes" ? "All Notes" : "Archived Notes"}
      navbarRight={
        <SearchBar
          options={options}
          onSelect={(selected) => console.log("Selected:", selected)}
        />
      }
    >
      <div className="grid grid-cols-[258px_1fr_258px] h-[calc(100vh-81px)] overflow-y-auto">
        <LeftNotesPanel />
        <NotesEditor />
        <RightNotesPanel />
      </div>
    </PageWrapper>
  );
};
