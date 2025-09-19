import { expect } from "@playwright/test";
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

  test("Basket persists after navigation", async ({
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

    await inventoryPage.page.goto("/");
    await inventoryPage.productCard.viewButton.first().click();
    await productPage.openBasketBtn.click();

    await basketPage.verifyProductInBasket({
      name: product.name!,
      quantity: 1,
    });
  });

  test("Multiple items of multiple quantities can be removed from the basket", async ({
    inventoryPage,
    productPage,
    basketPage,
  }) => {
    // Add the first product to the basket 3 times
    await inventoryPage.productCard.viewButton.first().click();
    const productOne = await productPage.getProductDetails();
    await productPage.productDetails.addToBasketBtn.click();
    await productPage.productDetails.addToBasketBtn.click();
    await productPage.productDetails.addToBasketBtn.click();
    await productPage.openBasketBtn.click();
    await basketPage.verifyProductInBasket({
      name: productOne.name!,
      quantity: 3,
    });

    await inventoryPage.page.goto("/");
    await inventoryPage.productCard.viewButton.last().click();
    const productTwo = await productPage.getProductDetails();
    await productPage.productDetails.addToBasketBtn.click();
    await productPage.openBasketBtn.click();
    await basketPage.verifyProductInBasket({
      name: productTwo.name!,
      quantity: 1,
    });

    await inventoryPage.page.goto("/");
    await inventoryPage.productCard.viewButton.nth(2).click();
    const productThree = await productPage.getProductDetails();
    await productPage.productDetails.addToBasketBtn.click();
    await productPage.productDetails.addToBasketBtn.click();
    await productPage.productDetails.addToBasketBtn.click();
    await productPage.productDetails.addToBasketBtn.click();
    await productPage.productDetails.addToBasketBtn.click();
    await productPage.productDetails.addToBasketBtn.click();
    await productPage.openBasketBtn.click();
    await basketPage.verifyProductInBasket({
      name: productThree.name!,
      quantity: 6,
    });

    const productOneItem = basketPage.basketItem.filter({
      hasText: productOne.name!,
    });
    await productOneItem.getByTestId("basket-item-remove").click();
    await expect(productOneItem).toBeHidden();
    await basketPage.verifyProductInBasket({
      name: productTwo.name!,
      quantity: 1,
    });
    await basketPage.verifyProductInBasket({
      name: productThree.name!,
      quantity: 6,
    });

    const productTwoItem = basketPage.basketItem.filter({
      hasText: productTwo.name!,
    });
    await productTwoItem.getByTestId("basket-item-remove").click();
    await expect(productTwoItem).toBeHidden();
    await basketPage.verifyProductInBasket({
      name: productThree.name!,
      quantity: 6,
    });

    const productThreeItem = basketPage.basketItem.filter({
      hasText: productThree.name!,
    });
    await productThreeItem.getByTestId("basket-item-remove").click();
    await expect(productThreeItem).toBeHidden();

    await expect(basketPage.basketEmptyMessage).toBeVisible();
  });
});
