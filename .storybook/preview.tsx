import React from "react";
import type { Preview, Decorator } from "@storybook/react";
import "./storybook-fonts.css";
import "../src/styles/globals.scss";
import "./storybook-overrides.css";

/**
 * Decorator that wraps every story in a container with:
 * - data-skin attribute (driven by the toolbar skin switcher)
 * - Correct background/text color from tokens
 * - Full-width layout
 */
const withSkin: Decorator = (Story, context) => {
  const skin = (context.globals.skin as string) ?? "vanilla";
  return (
    <div
      data-skin={skin}
      style={{
        padding: "2rem",
        minHeight: "100%",
        backgroundColor: "var(--bg-base)",
        color: "var(--text-primary)",
        fontFamily: "var(--font-body)",
      }}
    >
      <Story />
    </div>
  );
};

const preview: Preview = {
  decorators: [withSkin],
  parameters: {
    backgrounds: { disable: true },
    layout: "fullscreen",
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
          { value: "corporate", title: "Corporate" },
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
