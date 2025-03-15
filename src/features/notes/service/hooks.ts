import { useQuery } from "@tanstack/react-query";
import { useUser } from "@/hooks/useUser";
import { supabaseClient } from "@/utils/supabase/client";
import { queryResponse } from "@/utils/helpers";
import { SUPABASE_TABLES } from "@/utils/constants";

export const useGetListNotes = (isArchived: boolean) => {
  const user = useUser();

  return useQuery({
    queryKey: ["notes", user?.id, isArchived],
    queryFn: () => {
      if (!user?.id) throw new Error("User ID is required");
      return getListNotes(user.id, isArchived);
    },
    select: (data) => data,
  });
};

/**
 * Get list of notes for a user
 * @param userId - User ID
 * @returns List of notes
 */
const getListNotes = async (userId: string, isArchived: boolean) => {
  const response = await supabaseClient
    .from(SUPABASE_TABLES.NOTES)
    .select("*")
    .eq("user", userId)
    .eq("archived", isArchived)
    .order("updated_at", { ascending: false });
  return queryResponse(response);
};
