// vitest.config.ts
import { defineConfig } from "vitest/config";
import viteTsconfigPaths from "vite-tsconfig-paths";
import react from "@vitejs/plugin-react";

export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["__mocks__/matchMediaMock.js"],
    browser: {
      enabled: true,
      headless: false,
      name: "firefox", // browser name is required
      provider: "webdriverio",
    },
  },
  plugins: [viteTsconfigPaths(), react({ jsxRuntime: "classic" })],
});
