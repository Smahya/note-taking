import { Note } from "@/types/database";
import { formatDate } from "@/utils/date-helpers";
import { Text } from "@/components";
import { Tag } from "@/components/Tag";
import { cn } from "@/lib/utils";

export const NotesList = ({
  data,
  handleNoteClick,
  activeId,
}: {
  data: Note[];
  handleNoteClick: (note: Note) => void;
  activeId: string;
}) => {
  return (
    <div className="grid content-start">
      {data?.map((note, index) => (
        <NoteItem
          key={note.uuid}
          note={note}
          handleNoteClick={handleNoteClick}
          activeId={activeId}
          index={index}
        />
      ))}
    </div>
  );
};

function NoteItem({
  note,
  handleNoteClick,
  activeId,
  index,
}: {
  note: Note;
  handleNoteClick: (note: Note) => void;
  activeId: string;
  index: number;
}) {
  return (
    <div
      onClick={() => {
        handleNoteClick(note);
      }}
      className={cn(
        "grid gap-2 content-start px-2 py-3 cursor-pointer",
        note.uuid === activeId
          ? "bg-neutral-100 border-none rounded-lg dark:bg-neutral-800"
          : "",
        index > 0 ? "border-b border-neutral-200 dark:border-neutral-800" : ""
      )}
    >
      <Text variant="h3">{note.title}</Text>
      <div className="flex flex-wrap gap-2">
        {note.tags?.split(",").map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </div>
      <Text variant="body2">{formatDate(note.created_at)}</Text>
    </div>
  );
}
