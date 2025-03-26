import { Suspense as ReactSuspense } from "react";

export function CustomSuspense({ children }: { children: React.ReactNode }) {
  return <ReactSuspense fallback={null}>{children}</ReactSuspense>;
}
