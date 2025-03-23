import { TagsType } from "@/types/database";
import { queryResponse } from "@/utils/helpers";
import { supabaseClient } from "@/utils/supabase/client";
import { SUPABASE_TABLES } from "@/utils/constants";

export async function createNote({
  payload,
  user,
  noteId,
}: {
  payload: {
    title: string;
    note: string;
    tags: string;
  };
  user?: string;
  noteId?: string;
}) {
  if (!user) return;
  const tagsArr = payload.tags
    .split(",")
    .map((tag) => tag.trim().toLowerCase())
    .filter((tag) => tag.length > 0);

  const existingTags = await checkExistingTags(tagsArr, user);
  const newTagNames = await createNewTags(existingTags, tagsArr);
  const readyData = [{ ...payload, user, tags: newTagNames?.join(",") }];

  if (noteId) {
    const response = await supabaseClient
      .from(SUPABASE_TABLES.NOTES)
      .update({
        ...payload,
        user,
        tags: newTagNames?.join(","),
        updated_at: new Date().toISOString(),
      })
      .match({ uuid: noteId, user })
      .select("*"); // Returns all columns from the updated row
    return queryResponse(response);
  }
  const response = await supabaseClient
    .from(SUPABASE_TABLES.NOTES)
    .insert(readyData)
    .select();
  return queryResponse(response);
}

const checkExistingTags = async (tagsArr: string[], user: string) => {
  // Check existing tags
  const response = await supabaseClient
    .from(SUPABASE_TABLES.TAGS)
    .select("id, tag_name")
    .in("tag_name", tagsArr)
    .eq("user", user);

  return queryResponse(response);
};

const createNewTags = async (existingTags: TagsType[], tagsArr: string[]) => {
  // Determine which tags need to be created
  const existingTagNames =
    existingTags?.map((tag) => tag.tag_name?.toLowerCase()) || [];
  const newTags = tagsArr.filter((tag) => !existingTagNames.includes(tag));

  // Create new tags if any
  let allTagNames = [...(existingTags?.map((tag) => tag.tag_name) || [])];
  if (newTags.length > 0) {
    const { data: createdTags } = await supabaseClient
      .from(SUPABASE_TABLES.TAGS)
      .insert(
        newTags.map((tag_name) => ({
          tag_name,
        }))
      )
      .select();
    if (createdTags) {
      allTagNames = [...allTagNames, ...createdTags.map((tag) => tag.tag_name)];
    }
  }
  return allTagNames;
};

export const archiveNote = async (
  noteId: string,
  user: string,
  archived: boolean
) => {
  const response = await supabaseClient
    .from(SUPABASE_TABLES.NOTES)
    .update({ archived })
    .match({ uuid: noteId, user });
  return queryResponse(response);
};

export const deleteNote = async (noteId: string, user: string) => {
  const response = await supabaseClient
    .from(SUPABASE_TABLES.NOTES)
    .delete()
    .match({ uuid: noteId, user });
  return queryResponse(response);
};
