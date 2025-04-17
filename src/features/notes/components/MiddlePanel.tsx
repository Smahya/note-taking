"use client";

import React from "react";
import { useNotesContext } from "../context/NotesContext";

import { useNotesDataContext } from "../context/NotesDataContext";
import { NotesEditorForm } from "./NotesEditorForm";
import { cn } from "@/lib/utils";

export const MiddlePanel = ({
  className,
  setScreen,
}: {
  className?: string;
  setScreen?: (screen: Record<string, any>) => void;
}) => {
  const { hasNotes } = useNotesContext();
  const { activeNote, setSearchParams, searchParams } = useNotesDataContext();

  return (
    <div className={cn("w-full p-6", className)}>
      {hasNotes ? (
        <NotesEditorForm
          key={activeNote?.uuid}
          activeNote={activeNote!}
          setSearchParams={setSearchParams}
          searchParams={searchParams}
          setScreen={setScreen}
        />
      ) : null}
    </div>
  );
};
