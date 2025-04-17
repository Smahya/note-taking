import { Button, Text, useToast } from "@/components";
import DeleteIcon from "@/assets/icons/delete.svg";
import RestoreIcon from "@/assets/icons/refresh.svg";
import ArchiveIcon from "@/assets/icons/archive.svg";
import { useNotesContext } from "../context/NotesContext";
import { Modal } from "@/components/Modal";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useUser } from "@/hooks/useUser";
import { useQueryClient } from "@tanstack/react-query";
import { deleteNote } from "../service/service";
import { archiveNote } from "../service/service";
import { cn } from "@/lib/utils";
import ChevronRightMd from "@/assets/icons/chevron-right-md.svg";

export const RightNotesPanel = ({ className }: { className?: string }) => {
  const { isArchived, hasNotes, noteId } = useNotesContext();
  const [type, setType] = useState<"archive" | "delete" | "restore" | null>(
    null
  );

  const [openModal, setOpenModal] = useState(false);
  function handleOpenModal(type: "archive" | "delete" | "restore") {
    setType(type);
    setOpenModal(true);
  }

  function closeModal() {
    setOpenModal(false);
    setType(null);
  }
  return (
    hasNotes && (
      <div
        className={cn(
          "grid content-start gap-4 border-l border-neutral-200 dark:border-neutral-800 p-4",
          className
        )}
      >
        {isArchived ? (
          <Button
            onClick={() => handleOpenModal("restore")}
            variant="border"
            className="w-full"
          >
            <RestoreIcon /> Restore Note
          </Button>
        ) : (
          <Button
            onClick={() => handleOpenModal("archive")}
            variant="border"
            className="w-full"
          >
            <ArchiveIcon /> Archive Note
          </Button>
        )}
        <Button
          onClick={() => handleOpenModal("delete")}
          variant="border"
          className="w-full"
        >
          <DeleteIcon /> Delete Note
        </Button>

        <Modal
          open={openModal}
          setOpen={(open) => {
            setOpenModal(open);
          }}
        >
          <PromptModal closeModal={closeModal} type={type!} noteId={noteId!} />
        </Modal>
      </div>
    )
  );
};

export const RightNotesPanelMobile = ({
  setScreen,
  children,
}: {
  setScreen?: (screen: Record<string, any>) => void;
  children?: React.ReactNode;
}) => {
  const { isArchived, noteId } = useNotesContext();
  const [type, setType] = useState<"archive" | "delete" | "restore" | null>(
    null
  );

  const [openModal, setOpenModal] = useState(false);
  function handleOpenModal(type: "archive" | "delete" | "restore") {
    setType(type);
    setOpenModal(true);
  }

  function closeModal() {
    setOpenModal(false);
    setType(null);
    setScreen?.({ screen: "left" });
  }
  return (
    <div className="flex md:hidden items-center justify-between gap-4 pb-4 mb-4 border-b border-neutral-200 dark:border-neutral-800">
      <button
        className="flex items-center"
        onClick={() => setScreen?.({ screen: "left" })}
      >
        <ChevronRightMd className="-rotate-180 relative -left-2" />
        Go Back
      </button>

      <div className={cn("flex items-center gap-4")}>
        {isArchived ? (
          <div title="Restore Note">
            <RestoreIcon onClick={() => handleOpenModal("restore")} />
          </div>
        ) : (
          <div title="Archive Note">
            <ArchiveIcon onClick={() => handleOpenModal("archive")} />
          </div>
        )}
        <div title="Delete Note">
          <DeleteIcon onClick={() => handleOpenModal("delete")} />
        </div>
        {children}
        <Modal
          open={openModal}
          setOpen={(open) => {
            setOpenModal(open);
          }}
        >
          <PromptModal closeModal={closeModal} type={type!} noteId={noteId!} />
        </Modal>
      </div>
    </div>
  );
};

const PromptModal = ({
  type,
  noteId,
  closeModal,
}: {
  type: "archive" | "delete" | "restore";
  noteId: string;
  closeModal: () => void;
}) => {
  const icons: Record<"archive" | "delete" | "restore", React.ReactNode> = {
    archive: <ArchiveIcon />,
    delete: <DeleteIcon />,
    restore: <RestoreIcon />,
  };

  const descriptions: Record<"archive" | "delete" | "restore", string> = {
    archive:
      "Are you sure you want to archive this note? You can find it in the Archived Notes section and restore it anytime.",
    delete:
      "Are you sure you want to permanently delete this note? This action cannot be undone.",
    restore:
      "Are you sure you want to restore this note? It will be moved back to the Notes section.",
  };

  const toast = useToast();
  const user = useUser();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: () => {
      let response;
      if (type === "archive") {
        response = archiveNote(noteId!, user?.id!, true);
      } else if (type === "delete") {
        response = deleteNote(noteId!, user?.id!);
      } else if (type === "restore") {
        response = archiveNote(noteId!, user?.id!, false);
      }
      return response;
    },
    onSuccess: () => {
      toast.success(`Note ${type} successfully`);
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      closeModal();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return (
    <div>
      <div className="flex gap-4 p-4">
        <div className="text-neutral-900 dark:text-neutral-100 w-10 h-10 flex items-center justify-center bg-neutral-100 dark:bg-neutral-600 rounded-lg flex-shrink-0">
          {icons[type]}
        </div>
        <div className="grid content-start gap-1.5">
          <Text variant="h3" className="capitalize">
            {type} Note
          </Text>
          <Text variant="body1" className="">
            {descriptions[type]}
          </Text>
        </div>
      </div>

      <div className="border-t border-neutral-200 dark:border-neutral-600 p-4 flex justify-end gap-4">
        <Button onClick={closeModal} variant="secondary">
          Cancel
        </Button>
        <Button
          loading={isPending}
          disabled={isPending}
          onClick={() => mutate()}
          variant={type === "delete" ? "destructive" : "primary"}
          className="capitalize"
        >
          {type} Note
        </Button>
      </div>
    </div>
  );
};
