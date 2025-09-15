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
    if (name === null || price === null) {
      throw new Error("Product name or price not found");
    }
    await inventoryPage.productCard.viewButton.first().click();

    await productPage.verifyProductIsVisible(name, price);
  });
});
