import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Text } from "@/components/Text";
import GoogleIcon from "@/assets/icons/G.svg";
import Link from "next/link";
export default function LoginPage() {
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

      <form className="grid gap-4">
        <Input placeholder="Email Address" />
        <Input placeholder="Password" type="password" />
        <Button block>Login</Button>

        <div className="w-full h-px bg-neutral-200 dark:bg-neutral-800" />
        <Text
          variant="body2"
          className="text-center text-neutral-600 dark:text-neutral-300 my-2"
        >
          Or log in with:
        </Text>

        <Button block variant="border">
          <GoogleIcon />
          <Text variant="h3">Google</Text>
        </Button>

        <div className="w-full h-px bg-neutral-200 dark:bg-neutral-800" />

        <div className="flex items-center justify-center gap-1.5">
          <Text
            variant="body2"
            className="text-center text-neutral-600 dark:text-neutral-300"
          >
            No account yet?{" "}
          </Text>
          <Link href="/">
            <Text variant="body2" className="text-neutral-950 dark:text-white">
              Sign up
            </Text>
          </Link>
        </div>
      </form>
    </div>
  );
}
