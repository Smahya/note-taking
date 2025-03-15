"use client";

import React from "react";
import MDEditor from "@uiw/react-md-editor";
import { z } from "zod";
import { TitleInput, TagsInput, LastEdited } from "./Shared";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, useToast } from "@/components";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "../service/service";
import { useUser } from "@/hooks/useUser";
import { useNotesContext } from "../context/NotesContext";
import { Note } from "@/types/database";
import { useNotesDataContext } from "../context/NotesDataContext";

export const NotesEditor = () => {
  const { hasNotes } = useNotesContext();
  const { activeNote } = useNotesDataContext();

  return (
    <div className="w-full p-6">
      {hasNotes ? (
        <NotesForm key={activeNote?.uuid} activeNote={activeNote!} />
      ) : null}
    </div>
  );
};

const NotesForm = ({ activeNote }: { activeNote: Note }) => {
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
    mutationFn: (data: z.infer<typeof schema>) => {
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
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      queryClient.invalidateQueries({ queryKey: ["tags"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutate(data);
  });

  return (
    <form
      onSubmit={onSubmit}
      className="grid grid-rows-[auto_1fr] lg:grid-rows-[auto_1fr_auto] content-start gap-1 h-full"
    >
      <div className="grid gap-3 border-b border-neutral-200 dark:border-neutral-800 pb-4">
        <TitleInput {...register("title")} />

        <TagsInput {...register("tags")} />

        <LastEdited lastEdited={activeNote?.updated_at} />
      </div>

      <div
        className="max-w-[400px] content-start"
        data-color-mode={localStorage.getItem("theme")}
      >
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
              className="!shadow-none !p-0"
              textareaProps={{
                className: "",
                placeholder: "Start typing your note here…",
              }}
              minHeight={200}
              height={400}
              enableScroll={false}
              visibleDragbar={false}
            />
          )}
        />
      </div>

      <div className="hidden justify-start lg:flex gap-2 border-t border-neutral-200 dark:border-neutral-800 pt-4">
        <Button
          type="submit"
          loading={isPending}
          disabled={isPending || !formState.isValid}
        >
          Save note
        </Button>
        <Button variant="secondary">Cancel</Button>
      </div>
    </form>
  );
};
