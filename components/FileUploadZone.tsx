"use client";

import { useRef } from "react";
import { Button } from "@/components/Button";
import { useFactory, type UploadedFileMeta } from "@/lib/factory-context";

export function FileUploadZone() {
  const inputRef = useRef<HTMLInputElement>(null);
  const { uploadedFiles, addUploadedFiles, removeUploadedFile } = useFactory();

  function handlePick() {
    console.log("[upload] abrir selector de archivos");
    inputRef.current?.click();
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const list = e.target.files;
    if (!list || list.length === 0) return;
    const metas: UploadedFileMeta[] = Array.from(list).map((f) => ({
      name: f.name,
      size: f.size,
      type: f.type || "application/octet-stream",
    }));
    addUploadedFiles(metas);
    e.target.value = "";
  }

  function handleDownloadList() {
    const payload = JSON.stringify(uploadedFiles, null, 2);
    const blob = new Blob([payload], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "yaiwes-archivos.json";
    a.click();
    URL.revokeObjectURL(url);
    console.log("[upload] Descargar lista de archivos", uploadedFiles.length);
  }

  return (
    <div className="space-y-3">
      <input
        ref={inputRef}
        type="file"
        multiple
        accept="image/*,video/*,.json,.md,.txt,.pdf,.zip,.tsx,.ts,.jsx,.js"
        className="hidden"
        onChange={handleChange}
      />
      <div
        role="button"
        tabIndex={0}
        onClick={handlePick}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handlePick();
          }
        }}
        className="cursor-pointer rounded-xl border border-dashed border-white/20 bg-black/20 px-4 py-8 text-center transition hover:border-selection/60 hover:bg-black/30"
      >
        <p className="text-sm text-white/80">
          Arrastra o haz clic para subir skills, archivos, fotos o videos
        </p>
        <p className="mt-1 text-xs text-white/40">
          Imágenes, video, JSON, MD, PDF, ZIP, código
        </p>
      </div>
      <div className="flex flex-wrap gap-2">
        <Button variant="accent" onClick={handlePick}>
          Cargar
        </Button>
        <Button
          variant="accent"
          onClick={handleDownloadList}
          disabled={uploadedFiles.length === 0}
        >
          Descargar
        </Button>
      </div>
      {uploadedFiles.length > 0 ? (
        <ul className="space-y-2">
          {uploadedFiles.map((f) => (
            <li
              key={`${f.name}-${f.size}`}
              className="flex items-center justify-between gap-2 rounded-lg bg-black/30 px-3 py-2 text-sm"
            >
              <span className="truncate text-white/90">
                {f.name}{" "}
                <span className="text-white/40">
                  ({Math.round(f.size / 1024)} KB · {f.type})
                </span>
              </span>
              <Button
                variant="ghost"
                className="!px-2 !py-1 text-xs"
                onClick={() => removeUploadedFile(f.name)}
              >
                Quitar
              </Button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-xs text-white/40">Sin archivos cargados.</p>
      )}
    </div>
  );
}
