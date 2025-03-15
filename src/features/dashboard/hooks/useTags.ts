import { useQuery } from "@tanstack/react-query";
import { getTags } from "./services";
import { useUser } from "@/hooks/useUser";

export const useTags = () => {
  const user = useUser();

  return useQuery({
    queryKey: ["tags", user?.id],
    queryFn: () => {
      if (!user?.id) throw new Error("User ID is required");
      return getTags(user.id);
    },
    select: (data) => data,
  });
};
