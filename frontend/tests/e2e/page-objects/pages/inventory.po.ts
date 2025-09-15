import { type Page } from "@playwright/test";
import { Base } from "../base.po";
import { ProductGridComponent } from "../components/product-grid.component";

export class InventoryPage extends Base {
  readonly productGrid = new ProductGridComponent(this.page);

  constructor(readonly page: Page) {
    super(page);
  }
}
