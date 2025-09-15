import { type Page } from "@playwright/test";

export class ProductGridComponent {
  readonly grid = this.page.getByTestId("product-grid");

  constructor(readonly page: Page) {}
}
