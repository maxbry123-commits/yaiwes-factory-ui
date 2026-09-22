"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "accent" | "ghost";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  children: ReactNode;
};

const styles: Record<Variant, string> = {
  primary:
    "bg-selection text-white hover:bg-blue-500 focus-visible:ring-selection",
  secondary:
    "bg-white/10 text-white hover:bg-white/15 focus-visible:ring-white/40",
  accent:
    "bg-transparent text-cargar border border-[#ff5500]/40 hover:bg-[#ff5500]/10 focus-visible:ring-cargar",
  ghost: "bg-transparent text-white/80 hover:bg-white/5 focus-visible:ring-white/30",
};

export function Button({
  variant = "primary",
  className = "",
  children,
  type = "button",
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-40 ${styles[variant]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
