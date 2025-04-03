import { Button, useToast } from "@/components";
import GoogleIcon from "@/assets/icons/G.svg";
import { Text } from "@/components";
import { useMutation } from "@tanstack/react-query";
import { createClient } from "@/utils/supabase/server";
import { queryResponse } from "@/utils/helpers";
import { useRouter } from "next/navigation";

export function GoogleLogin() {
  const toast = useToast();
  const router = useRouter();
  const { mutate: loginWithGoogle } = useMutation({
    mutationFn: async () => {
      const supabase = await createClient();

      const response = await supabase.auth.signInWithOAuth({
        provider: "google",
      });
      return queryResponse(response);
    },
    onSuccess: () => {
      toast.success("Login successful");
      router.push("/");
    },
    onError: () => {
      toast.error("Login failed");
    },
  });
  return (
    <Button block variant="border" onClick={() => loginWithGoogle()}>
      <GoogleIcon />
      <Text variant="h3">Google</Text>
    </Button>
  );
}
