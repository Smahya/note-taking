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
import { registerUser } from "../services";

export default function Register() {
  const router = useRouter();
  const toast = useToast();

  const schema = z.object({
    email: z.string().email(),
    password: z.string().refine((value) => value.length >= 8, {
      message: "Password must be at least 8 characters",
    }),
  });

  const { register, handleSubmit, formState } = useForm<z.infer<typeof schema>>(
    {
      resolver: zodResolver(schema),
    }
  );

  const { mutate: registerMutation, isPending } = useMutation({
    mutationFn: async (payload: { email: string; password: string }) => {
      return await registerUser(payload);
    },
    onSuccess: () => {
      toast.success("Sign up successful");
      router.push("/");
    },
  });

  const onSubmit = handleSubmit((data) => {
    registerMutation(data);
  });

  return (
    <div className="grid gap-4">
      <div className="grid gap-2">
        <Text variant="h1" className="text-center">
          Create Your Account
        </Text>
        <Text variant="body2" className="text-center">
          Sign up to start organizing your notes and boost your productivity.
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
        <Button
          block
          type="submit"
          disabled={isPending}
          loading={isPending}
          className="mt-8"
        >
          Sign up
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
            onClick={() => router.push("/auth/login")}
            className="text-neutral-950 dark:text-white font-semibold cursor-pointer text-sm leading-[120%] tracking-[-0.2px]"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
}
