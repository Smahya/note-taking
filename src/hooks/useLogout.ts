import { supabaseClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

export const useLogout = () => {
  const router = useRouter();

  const logout = async () => {
    const { error } = await supabaseClient.auth.signOut();
    if (error) {
      console.error(error);
    }
    router.push("/");
  };
  return logout;
};
