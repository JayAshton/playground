import { expect } from "@playwright/test";
import { test } from "../fixtures.ts";

test.describe("Home Inventory Page @example", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("Product grid loads and has more than 3 products @inventory", async ({
    inventoryPage,
  }) => {
    await expect(inventoryPage.productGrid.grid).toBeVisible();
    expect(await inventoryPage.productCard.card.count()).toBeGreaterThan(3);
    expect(await inventoryPage.productCard.image.count()).toBeGreaterThan(3);
    expect(await inventoryPage.productCard.name.count()).toBeGreaterThan(3);
    expect(await inventoryPage.productCard.price.count()).toBeGreaterThan(3);
    expect(await inventoryPage.productCard.viewButton.count()).toBeGreaterThan(
      3,
    );

    const cards = await inventoryPage.productCard.card.all();
    for (const [index] of cards.entries()) {
      await expect(inventoryPage.productCard.name.nth(index)).not.toBeEmpty();
      await expect(inventoryPage.productCard.price.nth(index)).not.toBeEmpty();
    }
  });
});
