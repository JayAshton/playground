import { defineConfig, devices } from "@playwright/test";
import process from "node:process";

const DEFAULT_VIEWPORT = { width: 1920, height: 1080 };
const PW_PATH = "./tests/e2e";

// https://playwright.dev/docs/test-configuration.
export default defineConfig({
  testDir: `${PW_PATH}/specs`,
  snapshotDir: `${PW_PATH}/snapshots`,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  timeout: 3 * 60 * 1000,
  workers: process.env.CI ? parseInt(`${process.env.PLAYWRIGHT_WORKERS}`) : 4,
  reporter: process.env.CI ? [["html"], ["list"]] : [["list"]],
  use: {
    baseURL: "http://localhost",
    trace: "retain-on-failure",
    video: "retain-on-failure",
    screenshot: "only-on-failure",
  },

  projects: [
    {
      name: "chrome",
      use: {
        ...devices["Desktop Chrome"],
        channel: "chrome",
        viewport: DEFAULT_VIEWPORT,
      },
    },
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        viewport: DEFAULT_VIEWPORT,
      },
    },
    {
      name: "edge",
      use: {
        ...devices["Desktop Edge"],
        channel: "msedge",
        viewport: DEFAULT_VIEWPORT,
      },
    },
    {
      name: "firefox",
      use: {
        ...devices["Desktop Firefox"],
        viewport: DEFAULT_VIEWPORT,
      },
    },
    {
      name: "webkit",
      use: {
        ...devices["Desktop Safari"],
        viewport: DEFAULT_VIEWPORT,
        // Disable video & trace for webkit due to slowness
        trace: "off",
        video: "off",
      },
    },
    // Full device list: https://github.com/microsoft/playwright/blob/main/packages/playwright-core/src/server/deviceDescriptorsSource.json
    {
      name: "tabletchrome",
      use: { ...devices["Galaxy Tab S4"] },
    },
    {
      name: "tabletwebkit",
      use: { ...devices["iPad Pro 11"] },
    },
  ],
});
