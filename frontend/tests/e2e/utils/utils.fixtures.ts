import { chromium, type Page } from "@playwright/test";
import os from "os";
import path from "path";
import { AxeUtils } from "./axe.utils.ts";
import { LighthouseUtils } from "./lighthouse.utils.ts";

export interface UtilFixtures {
  axeUtils: AxeUtils;
  lighthouseUtils: LighthouseUtils;
  lighthousePage: Page;
}

export const utilFixtures = {
  axeUtils: async ({ page }, use) => {
    use(new AxeUtils(page));
  },
  lighthouseUtils: async ({ lighthousePage, lighthousePort }, use) => {
    await use(new LighthouseUtils(lighthousePage, lighthousePort));
  },
  lighthousePage: async ({ lighthousePort, page }, use, testInfo) => {
    // Prevent creating performance page if not needed
    if (testInfo.tags.includes("@performance")) {
      // Lighthouse opens a new page and as playwright doesn't share context we need to
      // explicitly create a new browser with shared context
      const userDataDir = path.join(os.tmpdir(), "pw", String(Math.random()));
      const context = await chromium.launchPersistentContext(userDataDir, {
        args: [`--remote-debugging-port=${lighthousePort}`],
      });
      // Provide the page to the test
      await use(context.pages()[0]);
      await context.close();
    } else {
      await use(page);
    }
  },
};
