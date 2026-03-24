import type { SkinConfig } from "./SkinContext";
import { vanillaSkin } from "./vanilla";
import { hudSkin } from "./hud";

const skins: Record<string, SkinConfig> = {
  vanilla: vanillaSkin,
  hud: hudSkin,
};

export function getSkin(name: string): SkinConfig {
  return skins[name] ?? vanillaSkin;
}

export { vanillaSkin, hudSkin };
