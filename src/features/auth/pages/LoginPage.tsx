"use client";

import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Text } from "@/components/Text";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useToast } from "@/components";
import { login } from "../services";
import { useState } from "react";
export default function LoginPage() {
  const router = useRouter();
  const toast = useToast();
  const [isGuestLoginPending, setIsGuestLoginPending] = useState(false);

  const schema = z.object({
    email: z.string().email(),
    password: z.string(),
  });

  const { register, handleSubmit, formState } = useForm<z.infer<typeof schema>>(
    {
      resolver: zodResolver(schema),
    }
  );

  const { mutate: loginMutation, isPending } = useMutation({
    mutationFn: async (payload: { email: string; password: string }) => {
      return await login(payload);
    },
    onSuccess: () => {
      setIsGuestLoginPending(false);
      toast.success("Login successful");
      router.push("/");
    },
    onError: () => {
      toast.error("Login failed");
    },
  });

  const onSubmit = handleSubmit((data) => {
    loginMutation(data);
  });

  function handleGuestLogin() {
    setIsGuestLoginPending(true);
    loginMutation({
      email: "salnaj14@gmail.com",
      password: "Password@1",
    });
  }

  return (
    <div className="grid gap-4">
      <div className="grid gap-2">
        <Text variant="h1" className="text-center">
          Welcome to Note
        </Text>

        <div className="flex items-center justify-center gap-1.5">
          <Text
            variant="body2"
            className="text-center text-neutral-600 dark:text-neutral-300"
          >
            Don't want to create an account?{" "}
          </Text>
          <Button
            form="login"
            variant="link"
            disabled={isPending || isGuestLoginPending}
            onClick={handleGuestLogin}
          >
            {isGuestLoginPending ? "Logging in..." : "Login as guest"}
          </Button>
        </div>
      </div>

      <form id="login" className="grid gap-4" onSubmit={onSubmit}>
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
        />
        <Button
          block
          type="submit"
          disabled={isPending}
          loading={isPending && !isGuestLoginPending}
          className="mt-8"
        >
          Login
        </Button>

        <div className="flex items-center justify-center gap-1.5">
          <Text
            variant="body2"
            className="text-center text-neutral-600 dark:text-neutral-300"
          >
            No account yet?{" "}
          </Text>
          <button
            type="button"
            onClick={() => router.push("/auth/register")}
            className="text-neutral-950 dark:text-white font-semibold cursor-pointer text-sm leading-[120%] tracking-[-0.2px]"
          >
            Sign up
          </button>
        </div>
      </form>
    </div>
  );
}
