"use client";

import { cn } from "@/lib/utils";
import { useTags } from "../hooks/useTags";
import TagIcon from "@/assets/icons/tag.svg";
import { LoadingWrapper, Text } from "@/components";
import { useQueryState } from "nuqs";
import { useMemo } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export function SidebarTags({ onClick }: { onClick?: any }) {
  const [searchParams] = useQueryState("tag");
  const { data: tags, isLoading } = useTags();
  const pathname = usePathname();

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
            const isArchived = pathname.includes("archived");
            return (
              <Link
                href={`${
                  isArchived
                    ? `/archived?tag=${tag.tag_name}`
                    : `/?tag=${tag.tag_name}`
                }`}
                key={tag.id}
                className={cn(
                  "w-full flex items-center justify-between gap-2 group/item hover:bg-neutral-100 dark:hover:bg-neutral-800 p-2 rounded-md",
                  isActive && "bg-neutral-100 dark:bg-neutral-800"
                )}
                onClick={onClick}
              >
                <div className="flex items-center gap-2">
                  <TagIcon className="group-hover/item:text-blue-500" />
                  <Text variant="body1" className="capitalize">
                    {tag.tag_name}
                  </Text>
                </div>
              </Link>
            );
          })}
        </div>
      </LoadingWrapper>
    </div>
  );
}
