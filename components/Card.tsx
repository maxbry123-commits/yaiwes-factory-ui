import type { ReactNode } from "react";

type CardProps = {
  title?: string;
  children: ReactNode;
  className?: string;
};

export function Card({ title, children, className = "" }: CardProps) {
  return (
    <section
      className={`rounded-xl border border-white/10 bg-card p-5 shadow-sm ${className}`}
    >
      {title ? (
        <h2 className="mb-4 text-lg font-semibold tracking-tight text-white">
          {title}
        </h2>
      ) : null}
      {children}
    </section>
  );
}
