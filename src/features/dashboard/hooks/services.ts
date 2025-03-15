"use server";

import { SUPABASE_TABLES } from "@/utils/constants";
import { queryResponse } from "@/utils/helpers";
import { createClient } from "@/utils/supabase/server";

export async function getTags(userId: string) {
  const supabase = await createClient();
  const response = await supabase
    .from(SUPABASE_TABLES.TAGS)
    .select("*")
    .eq("user", userId);
  return queryResponse(response);
}
