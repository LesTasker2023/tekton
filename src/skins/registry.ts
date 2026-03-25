import type { SkinConfig } from "./SkinContext";
import { vanillaSkin } from "./vanilla";
import { hudSkin } from "./hud";
import { corporateSkin } from "./corporate";

const skins: Record<string, SkinConfig> = {
  vanilla: vanillaSkin,
  hud: hudSkin,
  corporate: corporateSkin,
};

export function getSkin(name: string): SkinConfig {
  return skins[name] ?? vanillaSkin;
}

export { vanillaSkin, hudSkin, corporateSkin };
