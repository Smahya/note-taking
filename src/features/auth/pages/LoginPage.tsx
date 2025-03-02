"use client";

import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Text } from "@/components/Text";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useToast } from "@/components";
import { GoogleLogin } from "../components/GoogleLogin";
import { AuthApiError } from "@supabase/supabase-js";
import { login } from "../services";

export default function LoginPage() {
  const router = useRouter();
  const toast = useToast();

  const schema = z.object({
    email: z.string().email(),
    password: z.string().min(8, "Password must be at least 8 characters"),
  });

  const { register, handleSubmit, formState } = useForm<z.infer<typeof schema>>(
    {
      resolver: zodResolver(schema),
    }
  );

  async function resetEmailVerification() {
    // // Here's how to resend the confirmation email in Supabase
    // const { data, error } = await supabase.auth.resend({
    //   type: "signup",
    //   email: getValues("email"),
    // });
    // console.log("data", data);
    // console.log("error", error);
  }

  const { mutate: loginMutation, isPending } = useMutation({
    mutationFn: async (payload: { email: string; password: string }) => {
      return await login(payload);
    },
    onSuccess: () => {
      toast.success("Login successful");
      router.push("/dashboard");
    },
    onError: (err: AuthApiError) => {
      const action =
        err.code === "email_not_confirmed" ? (
          <Button variant="link" onClick={resetEmailVerification}>
            Resend email
          </Button>
        ) : null;
      toast.error("Login failed", action);
    },
  });

  const onSubmit = handleSubmit((data) => {
    loginMutation(data);
  });

  return (
    <div className="grid gap-4">
      <div className="grid gap-2">
        <Text variant="h1" className="text-center">
          Welcome to Note
        </Text>
        <Text variant="body2" className="text-center">
          Please log in to continue
        </Text>
      </div>

      <form className="grid gap-4" onSubmit={onSubmit}>
        <Input
          label="Email Address"
          placeholder="Email Address"
          {...register("email")}
          error={formState.errors.email?.message}
        />
        <Input
          label="Password"
          placeholder="Password"
          type="password"
          {...register("password")}
          error={formState.errors.password?.message}
          hint="At least 8 characters"
        />
        <Button block type="submit" disabled={isPending} loading={isPending}>
          Login
        </Button>

        <div className="divider" />
        <Text
          variant="body2"
          className="text-center text-neutral-600 dark:text-neutral-300 my-2"
        >
          Or log in with:
        </Text>
        <GoogleLogin />
        <div className="divider" />

        <div className="flex items-center justify-center gap-1.5">
          <Text
            variant="body2"
            className="text-center text-neutral-600 dark:text-neutral-300"
          >
            No account yet?{" "}
          </Text>
          <Link href="/register">
            <Text variant="body2" className="text-neutral-950 dark:text-white">
              Sign up
            </Text>
          </Link>
        </div>
      </form>
    </div>
  );
}
