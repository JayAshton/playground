import { type Page } from "@playwright/test";
import { InventoryPage } from "./pages/inventory.po";
import { ProductPage } from "./pages/product.po";

export interface PageFixtures {
  determinePage: Page;
  inventoryPage: InventoryPage;
  productPage: ProductPage;
}

export const pageFixtures = {
  // If the test is a performance test, use lighthousePage
  // Otherwise use the regular page
  determinePage: async ({ page, lighthousePage }, use, testInfo) => {
    if (testInfo.tags.includes("@performance")) {
      await use(lighthousePage);
    } else {
      await use(page);
    }
  },
  inventoryPage: async ({ determinePage }, use) => {
    use(new InventoryPage(determinePage));
  },
  productPage: async ({ determinePage }, use) => {
    use(new ProductPage(determinePage));
  },
};
