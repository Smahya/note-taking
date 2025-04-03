"use client";
import React from "react";

import AppLogo from "@/components/Logo";

export function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid items-center justify-center h-screen w-full bg-neutral-100 dark:bg-neutral-700">
      <div className="grid gap-4 bg-white dark:bg-neutral-950 mx-auto w-[540px] h-max max-w-[98vw] rounded-xl shadow-custom dark:shadow-none border border-neutral-200 dark:border-neutral-800 p-12">
        <AppLogo className="mx-auto" />

        {children}
      </div>
    </div>
  );
}
