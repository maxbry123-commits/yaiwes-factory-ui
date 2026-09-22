"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { STEPS } from "@/lib/factory-state";

export default function FactoryNav() {
  const pathname = usePathname();

  return (
    <header className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/10 bg-card px-4 py-3">
      <div>
        <div className="text-sm font-semibold text-white">
          YAIWES FROMTED · Factory UI
        </div>
        <div className="text-xs text-white/45">
          Interna · matte lock · pasos 4–5 FE Fusión
        </div>
      </div>
      <nav aria-label="Pasos del asistente" className="flex flex-wrap gap-1.5">
        {STEPS.map((step) => {
          const active =
            pathname === step.href || pathname.startsWith(`${step.href}/`);
          const fusion = step.owner === "fusion";
          return (
            <Link
              key={step.href}
              href={step.href}
              className={`rounded-lg border px-2.5 py-1.5 text-xs font-medium transition ${
                active
                  ? "border-selection bg-selection/20 text-white"
                  : "border-transparent bg-white/5 text-white/65 hover:bg-white/10"
              }`}
              title={
                fusion
                  ? `${step.title} · FE Fusión`
                  : `${step.title} · FE Pasos`
              }
            >
              {step.id}. {step.label}
              {fusion ? " · Fusión" : ""}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
