"use client";

/**
 * In-memory React context used by FE Pasos (factory) scaffold pages.
 * FE Pasos React context. LS + events live in factory-state.ts (FE Fusión).
 */

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type UploadedFileMeta = {
  name: string;
  size: number;
  type: string;
};

export type FactoryState = {
  description: string;
  sourceUrl: string;
  uploadedFiles: UploadedFileMeta[];
  selectedComponents: string[];
  selectedWindows: string[];
  selectedButtons: string[];
  selectedSelectors: string[];
  designStyle: string;
  tabCount: number;
  windowCount: number;
  backendFeatures: string[];
  integrations: string[];
  marketingCarousel: boolean;
  marketingSelectors: boolean;
  includeDrawings: boolean;
  includeVideo: boolean;
  include3d: boolean;
  graphicsNotes: string;
  deployTarget: string;
  pluginsChecklist: string[];
};

export type FactoryActions = {
  setDescription: (v: string) => void;
  setSourceUrl: (v: string) => void;
  addUploadedFiles: (files: UploadedFileMeta[]) => void;
  removeUploadedFile: (name: string) => void;
  toggleComponent: (id: string) => void;
  toggleWindow: (id: string) => void;
  toggleButton: (id: string) => void;
  toggleSelector: (id: string) => void;
  setDesignStyle: (v: string) => void;
  setTabCount: (n: number) => void;
  setWindowCount: (n: number) => void;
  toggleBackendFeature: (id: string) => void;
  toggleIntegration: (id: string) => void;
  setMarketingCarousel: (v: boolean) => void;
  setMarketingSelectors: (v: boolean) => void;
  setIncludeDrawings: (v: boolean) => void;
  setIncludeVideo: (v: boolean) => void;
  setInclude3d: (v: boolean) => void;
  setGraphicsNotes: (v: string) => void;
  setDeployTarget: (v: string) => void;
  togglePlugin: (id: string) => void;
  resetAll: () => void;
};

const INITIAL: FactoryState = {
  description: "",
  sourceUrl: "",
  uploadedFiles: [],
  selectedComponents: [],
  selectedWindows: [],
  selectedButtons: [],
  selectedSelectors: [],
  designStyle: "matte-fromted",
  tabCount: 3,
  windowCount: 1,
  backendFeatures: [],
  integrations: [],
  marketingCarousel: false,
  marketingSelectors: false,
  includeDrawings: false,
  includeVideo: false,
  include3d: false,
  graphicsNotes: "",
  deployTarget: "vercel",
  pluginsChecklist: [],
};

const FactoryContext = createContext<(FactoryState & FactoryActions) | null>(
  null,
);

function toggleInList(list: string[], id: string): string[] {
  return list.includes(id) ? list.filter((x) => x !== id) : [...list, id];
}

export function FactoryProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<FactoryState>(INITIAL);

  const setDescription = useCallback((v: string) => {
    setState((s) => ({ ...s, description: v }));
  }, []);
  const setSourceUrl = useCallback((v: string) => {
    setState((s) => ({ ...s, sourceUrl: v }));
  }, []);
  const addUploadedFiles = useCallback((files: UploadedFileMeta[]) => {
    setState((s) => ({
      ...s,
      uploadedFiles: [...s.uploadedFiles, ...files],
    }));
  }, []);
  const removeUploadedFile = useCallback((name: string) => {
    setState((s) => ({
      ...s,
      uploadedFiles: s.uploadedFiles.filter((f) => f.name !== name),
    }));
  }, []);
  const toggleComponent = useCallback((id: string) => {
    setState((s) => ({
      ...s,
      selectedComponents: toggleInList(s.selectedComponents, id),
    }));
  }, []);
  const toggleWindow = useCallback((id: string) => {
    setState((s) => ({
      ...s,
      selectedWindows: toggleInList(s.selectedWindows, id),
    }));
  }, []);
  const toggleButton = useCallback((id: string) => {
    setState((s) => ({
      ...s,
      selectedButtons: toggleInList(s.selectedButtons, id),
    }));
  }, []);
  const toggleSelector = useCallback((id: string) => {
    setState((s) => ({
      ...s,
      selectedSelectors: toggleInList(s.selectedSelectors, id),
    }));
  }, []);
  const setDesignStyle = useCallback((v: string) => {
    setState((s) => ({ ...s, designStyle: v }));
  }, []);
  const setTabCount = useCallback((n: number) => {
    setState((s) => ({ ...s, tabCount: Math.max(1, Math.min(20, n)) }));
  }, []);
  const setWindowCount = useCallback((n: number) => {
    setState((s) => ({ ...s, windowCount: Math.max(1, Math.min(12, n)) }));
  }, []);
  const toggleBackendFeature = useCallback((id: string) => {
    setState((s) => ({
      ...s,
      backendFeatures: toggleInList(s.backendFeatures, id),
    }));
  }, []);
  const toggleIntegration = useCallback((id: string) => {
    setState((s) => ({
      ...s,
      integrations: toggleInList(s.integrations, id),
    }));
  }, []);
  const setMarketingCarousel = useCallback((v: boolean) => {
    setState((s) => ({ ...s, marketingCarousel: v }));
  }, []);
  const setMarketingSelectors = useCallback((v: boolean) => {
    setState((s) => ({ ...s, marketingSelectors: v }));
  }, []);
  const setIncludeDrawings = useCallback((v: boolean) => {
    setState((s) => ({ ...s, includeDrawings: v }));
  }, []);
  const setIncludeVideo = useCallback((v: boolean) => {
    setState((s) => ({ ...s, includeVideo: v }));
  }, []);
  const setInclude3d = useCallback((v: boolean) => {
    setState((s) => ({ ...s, include3d: v }));
  }, []);
  const setGraphicsNotes = useCallback((v: string) => {
    setState((s) => ({ ...s, graphicsNotes: v }));
  }, []);
  const setDeployTarget = useCallback((v: string) => {
    setState((s) => ({ ...s, deployTarget: v }));
  }, []);
  const togglePlugin = useCallback((id: string) => {
    setState((s) => ({
      ...s,
      pluginsChecklist: toggleInList(s.pluginsChecklist, id),
    }));
  }, []);
  const resetAll = useCallback(() => setState(INITIAL), []);

  const value = useMemo(
    () => ({
      ...state,
      setDescription,
      setSourceUrl,
      addUploadedFiles,
      removeUploadedFile,
      toggleComponent,
      toggleWindow,
      toggleButton,
      toggleSelector,
      setDesignStyle,
      setTabCount,
      setWindowCount,
      toggleBackendFeature,
      toggleIntegration,
      setMarketingCarousel,
      setMarketingSelectors,
      setIncludeDrawings,
      setIncludeVideo,
      setInclude3d,
      setGraphicsNotes,
      setDeployTarget,
      togglePlugin,
      resetAll,
    }),
    [
      state,
      setDescription,
      setSourceUrl,
      addUploadedFiles,
      removeUploadedFile,
      toggleComponent,
      toggleWindow,
      toggleButton,
      toggleSelector,
      setDesignStyle,
      setTabCount,
      setWindowCount,
      toggleBackendFeature,
      toggleIntegration,
      setMarketingCarousel,
      setMarketingSelectors,
      setIncludeDrawings,
      setIncludeVideo,
      setInclude3d,
      setGraphicsNotes,
      setDeployTarget,
      togglePlugin,
      resetAll,
    ],
  );

  return (
    <FactoryContext.Provider value={value}>{children}</FactoryContext.Provider>
  );
}

export function useFactory(): FactoryState & FactoryActions {
  const ctx = useContext(FactoryContext);
  if (!ctx) {
    throw new Error("useFactory debe usarse dentro de FactoryProvider");
  }
  return ctx;
}
