import { supabaseClient } from "@/utils/supabase/client";
import { useQuery } from "@tanstack/react-query";

export const useUser = () => {
  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: () => supabaseClient.auth.getUser(),
    select: (data) => data.data.user,
  });

  return user;
};
