import MDEditor from "@uiw/react-md-editor";
import { z } from "zod";
import { TitleInput, TagsInput, LastEdited } from "./Shared";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, useToast } from "@/components";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "../service/service";
import { useUser } from "@/hooks/useUser";
import { Note } from "@/types/database";

import { EditorWrapper } from "./EditorWrapper";
import { NOTE_ID_KEY } from "../contants";
import { RightNotesPanelMobile } from "./RightNotesPanel";

export const NotesEditorForm = ({
  activeNote,
  setSearchParams,
  searchParams,
  setScreen,
}: {
  activeNote: Note;
  setSearchParams: (params: Record<string, string>) => void;
  searchParams: Record<string, any>;
  setScreen?: (screen: Record<string, any>) => void;
}) => {
  const toast = useToast();
  const user = useUser();
  const queryClient = useQueryClient();

  const schema = z.object({
    title: z.string().min(1),
    tags: z.string().min(1),
    note: z.string().min(1),
  });

  const { register, handleSubmit, control, formState } = useForm<
    z.infer<typeof schema>
  >({
    resolver: zodResolver(schema),
    defaultValues: { ...(activeNote || {}) },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: z.infer<typeof schema> & { archived: boolean }) => {
      return createNote({
        payload: data,
        user: user?.id!,
        noteId: activeNote?.uuid,
      });
    },
    onSuccess: () => {
      toast.success(
        activeNote?.uuid
          ? "Note updated successfully"
          : "Note created successfully"
      );
      handleCancel();
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      queryClient.invalidateQueries({ queryKey: ["tags"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutate({ ...data, archived: false });
  });

  function handleCancel() {
    setSearchParams({ [NOTE_ID_KEY]: "" });
  }

  return (
    <>
      <RightNotesPanelMobile setScreen={setScreen}>
        <Button
          form="notes-editor-form"
          variant="link"
          type="submit"
          loading={isPending}
          disabled={isPending || !formState.isValid}
          className="text-blue-500"
        >
          Save Note
        </Button>
      </RightNotesPanelMobile>
      <form
        id="notes-editor-form"
        onSubmit={onSubmit}
        className="grid grid-rows-[auto_1fr] lg:grid-rows-[auto_1fr_140px] content-start gap-1 h-full"
      >
        <div className="grid gap-3 border-b border-neutral-200 dark:border-neutral-800 pb-4">
          <TitleInput {...register("title")} />

          <TagsInput {...register("tags")} />

          <LastEdited lastEdited={activeNote?.updated_at} />
        </div>

        <EditorWrapper>
          <Controller
            control={control}
            name="note"
            render={({ field }) => (
              <MDEditor
                value={field.value}
                onChange={(val) => {
                  field.onChange(val!);
                }}
                hideToolbar={true}
                preview="edit"
                className="!shadow-none !p-0 bg-white dark:bg-neutral-950"
                textareaProps={{
                  className: "",
                  placeholder: "Start typing your note here…",
                }}
                minHeight={200}
                height={300}
                enableScroll={false}
                visibleDragbar={false}
              />
            )}
          />
        </EditorWrapper>

        <div className="hidden justify-start md:flex gap-2 mt-auto border-t border-neutral-200 dark:border-neutral-800 pt-4">
          <Button
            type="submit"
            loading={isPending}
            disabled={isPending || !formState.isValid}
          >
            Save Note
          </Button>
          {searchParams[NOTE_ID_KEY] === "new" ? (
            <Button variant="secondary" onClick={handleCancel}>
              Cancel
            </Button>
          ) : null}
        </div>
      </form>
    </>
  );
};
