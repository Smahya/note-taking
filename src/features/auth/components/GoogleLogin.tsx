import { Button } from "@/components";
import GoogleIcon from "@/assets/icons/G.svg";
import { Text } from "@/components";
import { useMutation } from "@tanstack/react-query";
import { createClient } from "@/utils/supabase/server";
import { queryResponse } from "@/utils/helpers";

export function GoogleLogin() {
  const { mutate: loginWithGoogle } = useMutation({
    mutationFn: async () => {
      const supabase = await createClient();

      const response = await supabase.auth.signInWithOAuth({
        provider: "google",
      });
      return queryResponse(response);
    },
  });
  return (
    <Button block variant="border" onClick={() => loginWithGoogle()}>
      <GoogleIcon />
      <Text variant="h3">Google</Text>
    </Button>
  );
}
