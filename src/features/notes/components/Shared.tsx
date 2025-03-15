import { cn } from "@/lib/utils";
import { typography } from "@/styles/typography";

import { Text } from "@/components";
import TagIcon from "@/assets/icons/tag.svg";
import ClockIcon from "@/assets/icons/clock.svg";
import React from "react";
import { formatDate } from "@/utils/date-helpers";

export const TitleInput = React.forwardRef(function TitleInput(
  props: React.InputHTMLAttributes<HTMLInputElement>,
  ref: React.Ref<HTMLInputElement>
) {
  return (
    <input
      type="text"
      className={cn(
        "w-full app-background text-neutral-950 placeholder:text-neutral-950 placeholder:font-bold placeholder:text-2xl focus:outline-none",
        typography.h1
      )}
      placeholder="Enter a title…"
      ref={ref}
      {...props}
    />
  );
});

export const TagsInput = React.forwardRef(function TagsInput(
  props: React.InputHTMLAttributes<HTMLInputElement>,
  ref: React.Ref<HTMLInputElement>
) {
  return (
    <div className="grid grid-cols-[110px_1fr] items-center gap-2">
      <Text variant="body2" className="flex items-center gap-2">
        <TagIcon className="text-xs" />
        Tags
      </Text>

      <input
        type="text"
        className={cn(
          "w-full capitalize app-background text-sm text-neutral-950 placeholder:text-neutral-400 placeholder:text-sm focus:outline-none"
        )}
        placeholder="Add tags separated by commas (e.g. Work, Planning)"
        ref={ref}
        {...props}
      />
    </div>
  );
});

export function LastEdited({ lastEdited }: { lastEdited?: string }) {
  return (
    <div className="grid grid-cols-[110px_1fr] items-center gap-2">
      <Text variant="body2" className="flex items-center gap-2">
        <ClockIcon className="text-neutral-700 dark:text-neutral-400" />
        Last edited
      </Text>
      <Text variant="body2">
        {lastEdited ? formatDate(lastEdited) : "Not yet saved"}
      </Text>
    </div>
  );
}

export function EmptyNotes({ archived }: { archived?: boolean }) {
  return (
    <div className="bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg px-2 py-3">
      {archived ? (
        <Text variant="body2">
          No notes have been archived yet. Move notes here for safekeeping,{" "}
          <br /> or <span className="underline">create a new note</span>
        </Text>
      ) : (
        <Text variant="body2">
          You don’t have any notes yet. Start a new note to capture your
          thoughts and ideas.
        </Text>
      )}
    </div>
  );
}
