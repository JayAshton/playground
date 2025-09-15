import { type Page } from "@playwright/test";

export class ProductDetailsComponent {
  readonly details = this.page.getByTestId("product-details");
  readonly image = this.page.getByTestId("product-image");
  readonly name = this.details.getByTestId("product-name");
  readonly price = this.details.getByTestId("product-price");
  readonly description = this.details.getByTestId("product-description");
  readonly id = this.details.getByTestId("product-id");
  readonly copyIdBtn = this.details.getByTestId("copy-id-button");

  constructor(readonly page: Page) {}
}
