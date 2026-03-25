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
    // Use array form so specific stubs match BEFORE the general "@" alias.
    // Order matters: more specific paths first, then the catch-all "@".
    config.resolve.alias = [
      // Stub Sanity modules — must come before "@" so they match first
      { find: "@/sanity/image", replacement: resolve(__dirname, "stubs/sanity-image.ts") },
      { find: "@/sanity/client", replacement: resolve(__dirname, "stubs/sanity-client.ts") },
      { find: "@/sanity/live", replacement: resolve(__dirname, "stubs/sanity-live.ts") },
      // Stub Next.js modules
      { find: "next/image", replacement: resolve(__dirname, "stubs/next-image.tsx") },
      { find: "next/link", replacement: resolve(__dirname, "stubs/next-link.tsx") },
      { find: "next/font/google", replacement: resolve(__dirname, "stubs/next-font.ts") },
      // General "@" alias — last so specific "@/sanity/*" stubs win
      { find: "@", replacement: resolve(__dirname, "../src") },
    ];
    // Polyfill process.env for browser (Vite doesn't provide it).
    // Each key must be defined individually so Vite can statically replace
    // `process.env.X` at compile time. The catch-all `process` and
    // `process.env` ensure code that checks `typeof process` or spreads
    // process.env doesn't throw at runtime.
    config.define = {
      ...config.define,
      "process.env.NODE_ENV": JSON.stringify("development"),
      "process.env.NEXT_PUBLIC_SANITY_PROJECT_ID": JSON.stringify(""),
      "process.env.NEXT_PUBLIC_SANITY_DATASET": JSON.stringify("production"),
      "process.env.NEXT_PUBLIC_SITE_URL": JSON.stringify("https://example.com"),
      "process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID": JSON.stringify(""),
      "process.env": "{}",
      "process": JSON.stringify({ env: {} }),
    };
    return config;
  },
};

export default config;
