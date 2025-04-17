import { Button } from "@/components";

export default function CreateNoteButton({
  onClick,
  mobile,
}: {
  onClick: () => void;
  mobile?: boolean;
}) {
  return (
    <>
      {mobile ? (
        <Button
          onClick={onClick}
          className="text-2xl rounded-full w-12 h-12 fixed bottom-24 right-6"
        >
          +
        </Button>
      ) : (
        <Button onClick={onClick}>+ Create New Note</Button>
      )}
    </>
  );
}
