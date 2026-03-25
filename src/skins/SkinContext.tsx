"use client";

import {
  createContext,
  useContext,
  useMemo,
  type ComponentType,
  type ReactNode,
} from "react";

/* ── Decorator registry ── */
export interface DecoratorRegistry {
  Panel?: ComponentType<{ uid: string }>;
  Button?: ComponentType<{ variant: string }>;
  Hero?: ComponentType;
  SectionHeader?: ComponentType<{ title: string }>;
}

/* ── Skin config ── */
export interface SkinConfig {
  name: string;
  decorators: Partial<DecoratorRegistry>;
}

const DEFAULT_SKIN: SkinConfig = {
  name: "vanilla",
  decorators: {},
};

const SkinContext = createContext<SkinConfig>(DEFAULT_SKIN);

export interface SkinProviderProps {
  skinName?: string;
  children: ReactNode;
}

/* Lazy skin registry — only loaded client-side */
function resolveSkin(name: string): SkinConfig {
  if (name === "hud") {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { hudSkin } = require("./hud") as { hudSkin: SkinConfig };
    return hudSkin;
  }
  if (name === "corporate") {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { corporateSkin } = require("./corporate") as { corporateSkin: SkinConfig };
    return corporateSkin;
  }
  return DEFAULT_SKIN;
}

export function SkinProvider({ skinName = "vanilla", children }: SkinProviderProps) {
  const skin = useMemo(() => resolveSkin(skinName), [skinName]);
  return <SkinContext.Provider value={skin}>{children}</SkinContext.Provider>;
}

export function useSkin(): SkinConfig {
  return useContext(SkinContext);
}

export function useDecorator<K extends keyof DecoratorRegistry>(
  key: K,
): DecoratorRegistry[K] | undefined {
  const { decorators } = useContext(SkinContext);
  return decorators[key];
}
