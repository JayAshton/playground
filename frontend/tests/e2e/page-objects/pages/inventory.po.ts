import { type Page } from "@playwright/test";
import { Base } from "../base.po";
import { ProductCardComponent } from "../components/product-card.component";
import { ProductGridComponent } from "../components/product-grid.component";

export class InventoryPage extends Base {
  readonly productGrid = new ProductGridComponent(this.page);
  readonly productCard = new ProductCardComponent(this.page);

  constructor(readonly page: Page) {
    super(page);
  }
}
