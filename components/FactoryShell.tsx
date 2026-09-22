"use client";

import type { ReactNode } from "react";
import { StepNav } from "@/components/StepNav";

type FactoryShellProps = {
  title: string;
  subtitle?: string;
  children: ReactNode;
};

export function FactoryShell({ title, subtitle, children }: FactoryShellProps) {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-4 py-6 sm:px-6">
      <header className="mb-6 space-y-4 border-b border-white/10 pb-5">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-white/40">
            YAIWES Factory UI
          </p>
          <h1 className="text-2xl font-semibold tracking-tight text-white">
            {title}
          </h1>
          {subtitle ? (
            <p className="mt-1 text-sm text-white/55">{subtitle}</p>
          ) : null}
        </div>
        <StepNav />
      </header>
      <main className="flex-1 space-y-5">{children}</main>
    </div>
  );
}
