import { expect } from "@playwright/test";
import { test } from "../fixtures.ts";

test.describe("Home Inventory Page @example", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("Selecting a product displays the selected product @product", async ({
    inventoryPage,
    productPage,
  }) => {
    const name = await inventoryPage.productCard.name.first().textContent();
    const price = await inventoryPage.productCard.price.first().textContent();
    expect(name).not.toBeNull();
    expect(price).not.toBeNull();

    await inventoryPage.productCard.viewButton.first().click();
    await productPage.verifyProductIsVisible(name!, price!);
  });
});
