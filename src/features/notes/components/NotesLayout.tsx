import { PageWrapper } from "@/components";

import { LeftNotesPanel } from "./LeftNotesPanel";
import { RightNotesPanel } from "./RightNotesPanel";
import { NotesProvider, useNotesContext } from "../context/NotesContext";
import { NotesDataProvider } from "../context/NotesDataContext";
import { NotesSearch } from "./NotesSearch";
import { MiddlePanel } from "./MiddlePanel";
import { useQueryStates } from "nuqs";
import { parseAsString } from "nuqs";
import dynamic from "next/dynamic";

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
      <NotesDeviceProvider />
    </PageWrapper>
  );
};

export const NotesDeviceProvider = dynamic(
  () =>
    import("@/hooks/useDevice").then((mod) => {
      const DeviceComponent = () => {
        const isMobile = mod.default()?.isMobile;

        return <>{isMobile ? <NotesMobile /> : <NotesDesktop />}</>;
      };
      return DeviceComponent;
    }),
  { ssr: false }
);

const NotesDesktop = () => (
  <div className="grid grid-cols-[258px_1fr_258px] h-full">
    <LeftNotesPanel />
    <MiddlePanel />
    <RightNotesPanel />
  </div>
);

const NotesMobile = () => {
  const [screen, setScreen] = useQueryStates({
    screen: parseAsString.withDefault("left"),
  });

  return (
    <div className="grid h-full">
      <LeftNotesPanel
        className={screen.screen === "left" ? "grid" : "hidden"}
        mobile={true}
        setScreen={setScreen}
      />

      <MiddlePanel
        className={screen.screen === "middle" ? "block" : "hidden"}
        setScreen={setScreen}
      />
    </div>
  );
};
