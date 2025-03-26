"use client";

import { cn } from "@/lib/utils";
import { useTags } from "../hooks/useTags";
import TagIcon from "@/assets/icons/tag.svg";
import { LoadingWrapper, Text } from "@/components";
import { useQueryState } from "nuqs";
import { useMemo } from "react";

export function SidebarTags() {
  const [searchParams, setSearchParams] = useQueryState("tag");
  const { data: tags, isLoading } = useTags();

  const activeTag = useMemo(() => searchParams, [searchParams]);

  return (
    <div className="grid content-start gap-1 border-t border-neutral-200 dark:border-neutral-800 py-4 min-h-60">
      <Text variant="body1" className="text-neutral-500 dark:text-neutral-400">
        Tags
      </Text>
      <LoadingWrapper isLoading={isLoading} loaderClassName="my-10">
        <div className="grid content-start gap-1 my-4">
          {tags?.map((tag) => {
            const isActive = tag.tag_name === activeTag;
            return (
              <button
                key={tag.id}
                className={cn(
                  "w-full flex items-center justify-between gap-2 group/item hover:bg-neutral-100 dark:hover:bg-neutral-800 p-2 rounded-md",
                  isActive && "bg-neutral-100 dark:bg-neutral-800"
                )}
                onClick={() => {
                  setSearchParams(tag.tag_name);
                }}
              >
                <div className="flex items-center gap-2">
                  <TagIcon className="group-hover/item:text-blue-500" />
                  <Text variant="body1" className="capitalize">
                    {tag.tag_name}
                  </Text>
                </div>
              </button>
            );
          })}
        </div>
      </LoadingWrapper>
    </div>
  );
}
