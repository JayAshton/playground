import { type Page, expect } from "@playwright/test";
import { Base } from "../base.po";

export class BasketPage extends Base {
  readonly basketList = this.page.getByTestId("basket-items-list");
  readonly basketItem = this.page.getByTestId("basket-item");
  readonly basketItemName = this.page.getByTestId("basket-item-name");
  readonly basketItemPrice = this.page.getByTestId("basket-item-price");
  readonly basketItemImage = this.page.getByTestId("basket-item-image");
  readonly basketItemNoImage = this.page.getByTestId("basket-item-no-image");
  readonly basketItemRemoveBtn =
    this.basketItem.getByTestId("basket-item-remove");
  readonly basketEmptyMessage = this.page.locator("p", {
    hasText: "Your basket is empty.",
  });

  constructor(readonly page: Page) {
    super(page);
  }

  async verifyProductInBasket(product: { name: string; quantity: number }) {
    const productName = this.basketItemName.filter({ hasText: product.name });
    await expect(productName).toBeVisible();

    const basketItem = this.basketItem.filter({ has: productName });
    const actualQuantity = basketItem.getByTestId("basket-item-quantity");
    await expect(actualQuantity).toHaveText(product.quantity.toString());
  }
}
