import { type Page } from "@playwright/test";

export class ProductCardComponent {
  readonly card = this.page.getByTestId("product-card");
  readonly image = this.card.getByTestId("product-image");
  readonly name = this.card.getByTestId("product-name");
  readonly price = this.card.getByTestId("product-price");
  readonly viewButton = this.card.getByTestId("view-product-button");

  constructor(readonly page: Page) {}
}
