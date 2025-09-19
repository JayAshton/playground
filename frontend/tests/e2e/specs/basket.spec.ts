import { test } from "../fixtures.ts";

test.describe("Basket tests @basket", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("Adding a single item to the basket", async ({
    inventoryPage,
    productPage,
    basketPage,
  }) => {
    await inventoryPage.productCard.viewButton.first().click();
    const product = await productPage.getProductDetails();
    await productPage.productDetails.addToBasketBtn.click();
    await productPage.openBasketBtn.click();

    await basketPage.verifyProductInBasket({
      name: product.name!,
      quantity: 1,
    });
  });
});
