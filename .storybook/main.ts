import type { StorybookConfig } from "@storybook/react-vite";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(ts|tsx)"],
  addons: [
    "@storybook/addon-a11y",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  viteFinal: async (config) => {
    config.resolve = config.resolve ?? {};
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": resolve(__dirname, "../src"),
      // Stub next/* imports for Storybook
      "next/image": resolve(__dirname, "stubs/next-image.tsx"),
      "next/link": resolve(__dirname, "stubs/next-link.tsx"),
      "next/font/google": resolve(__dirname, "stubs/next-font.ts"),
    };
    return config;
  },
};

export default config;
