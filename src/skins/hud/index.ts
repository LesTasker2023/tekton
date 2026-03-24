import type { SkinConfig } from "../SkinContext";
import { HudPanelDecorator } from "./HudPanelDecorator";

export const hudSkin: SkinConfig = {
  name: "hud",
  decorators: {
    Panel: HudPanelDecorator,
  },
};
