"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";

type InfoTipProps = {
  text: string;
  label?: string;
};

export default function InfoTip({ text, label = "Más información" }: InfoTipProps) {
  const [open, setOpen] = useState(false);
  const tipId = useId();
  const btnRef = useRef<HTMLButtonElement>(null);
  const popRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
        btnRef.current?.focus();
      }
    };
    const onPointer = (e: MouseEvent) => {
      const t = e.target as Node;
      if (
        popRef.current &&
        !popRef.current.contains(t) &&
        btnRef.current &&
        !btnRef.current.contains(t)
      ) {
        close();
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onPointer);
    };
  }, [open, close]);

  return (
    <span className="info-tip">
      <button
        ref={btnRef}
        type="button"
        className="info-tip__btn"
        aria-label={label}
        aria-expanded={open}
        aria-controls={tipId}
        aria-haspopup="dialog"
        onClick={() => setOpen((v) => !v)}
        onFocus={() => setOpen(true)}
      >
        i
      </button>
      {open ? (
        <div
          ref={popRef}
          id={tipId}
          role="dialog"
          aria-label={label}
          className="info-tip__popover"
        >
          {text}
        </div>
      ) : null}
    </span>
  );
}
