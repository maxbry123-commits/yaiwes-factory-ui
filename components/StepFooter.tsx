"use client";

import Link from "next/link";
import { Button } from "@/components/Button";
import { STEPS } from "@/lib/factory-state";

type StepFooterProps = {
  current: number;
};

export function StepFooter({ current }: StepFooterProps) {
  const prev = STEPS.find((s) => s.id === current - 1);
  const next = STEPS.find((s) => s.id === current + 1);

  return (
    <footer className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-5">
      {prev ? (
        <Link href={prev.href}>
          <Button variant="secondary">← Anterior: {prev.label}</Button>
        </Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link href={next.href}>
          <Button variant="primary">Siguiente: {next.label} →</Button>
        </Link>
      ) : (
        <Button variant="accent">Fin del asistente</Button>
      )}
    </footer>
  );
}
