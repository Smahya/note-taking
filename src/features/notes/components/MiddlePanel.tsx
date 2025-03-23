"use client";

import React from "react";
import { useNotesContext } from "../context/NotesContext";

import { useNotesDataContext } from "../context/NotesDataContext";
import { NotesEditorForm } from "./NotesEditorForm";

export const MiddlePanel = () => {
  const { hasNotes } = useNotesContext();
  const { activeNote } = useNotesDataContext();

  return (
    <div className="w-full p-6">
      {hasNotes ? (
        <NotesEditorForm key={activeNote?.uuid} activeNote={activeNote!} />
      ) : null}
    </div>
  );
};
