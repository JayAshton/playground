import { test } from "../fixtures.ts";

test.describe("Accessibility tests @a11y", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("Inventory page - accessibility test", async ({ axeUtils }) => {
    await axeUtils.audit();
  });

  test("Product page - accessibility test", async ({
    axeUtils,
    inventoryPage,
  }) => {
    await inventoryPage.productCard.viewButton.first().click();
    await axeUtils.audit();
  });
});
