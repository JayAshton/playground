import { test } from "../fixtures.ts";

test.describe("Performance tests @performance", () => {
  test.beforeEach(async ({ inventoryPage }) => {
    // inventoryPage must be used instead of page as the lighthouse fixtures provide a new browser window
    // using page.goto() does not trigger navigation in the new lighthouse window
    await inventoryPage.page.goto("/");
  });

  test("Inventory page - performance test", async ({ lighthouseUtils }) => {
    await lighthouseUtils.audit();
  });

  test("Product page - performance test", async ({
    lighthouseUtils,
    inventoryPage,
  }) => {
    await inventoryPage.productCard.viewButton.first().click();
    await lighthouseUtils.audit();
  });
});
