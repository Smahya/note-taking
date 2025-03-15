import { Button } from "@/components";

export default function CreateNoteButton({ onClick }: { onClick: () => void }) {
  return <Button onClick={onClick}>+ Create New Note</Button>;
}
