import type { Preview } from "@storybook/react";
import "../src/styles/globals.scss";

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: "dark",
      values: [
        { name: "dark", value: "#0a0c10" },
        { name: "light", value: "#f5f5f5" },
      ],
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  globalTypes: {
    skin: {
      description: "Visual skin",
      toolbar: {
        title: "Skin",
        icon: "paintbrush",
        items: [
          { value: "vanilla", title: "Vanilla" },
          { value: "hud", title: "HUD" },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    skin: "vanilla",
  },
};

export default preview;
