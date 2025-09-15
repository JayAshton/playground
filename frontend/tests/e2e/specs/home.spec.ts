import { expect } from "@playwright/test";
import { test } from "../fixtures.ts";

test.describe("Home Inventory Page @example", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("Product grid loads and has more than 3 products", async ({
    inventoryPage,
  }) => {
    await expect(inventoryPage.productGrid.grid).toBeVisible();
  });
});
