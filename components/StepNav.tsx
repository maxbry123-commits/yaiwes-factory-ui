"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { STEPS } from "@/lib/factory-state";

export function StepNav() {
  const pathname = usePathname();

  return (
    <nav aria-label="Pasos del asistente" className="w-full">
      <ol className="flex flex-wrap items-center gap-2">
        {STEPS.map((step, index) => {
          const active =
            pathname === step.href || pathname.startsWith(`${step.href}/`);
          const fusion = step.owner === "fusion";
          return (
            <li key={step.href} className="flex items-center gap-2">
              {index > 0 ? (
                <span className="hidden text-white/30 sm:inline" aria-hidden>
                  /
                </span>
              ) : null}
              <Link
                href={step.href}
                className={`rounded-lg px-3 py-1.5 text-sm font-medium transition ${
                  active
                    ? "bg-selection text-white"
                    : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
                }`}
                aria-current={active ? "step" : undefined}
                title={
                  fusion
                    ? `${step.title} · FE Fusión`
                    : `${step.title} · FE Pasos`
                }
              >
                <span className="mr-1.5 opacity-70">{step.id}.</span>
                {step.label}
                {fusion ? (
                  <span className="ml-1.5 rounded bg-white/10 px-1.5 py-0.5 text-[10px] font-normal uppercase tracking-wide text-white/60">
                    Fusión
                  </span>
                ) : null}
              </Link>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
