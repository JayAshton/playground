import { type Page, expect } from "@playwright/test";
import { Base } from "../base.po";
import { ProductDetailsComponent } from "../components/product-details.component";

export class ProductPage extends Base {
  readonly openBasketBtn = this.page.getByTestId("open-basket-button");
  readonly productDetails = new ProductDetailsComponent(this.page);

  constructor(readonly page: Page) {
    super(page);
  }

  async verifyProductIsVisible(name: string, price: string) {
    await expect(this.productDetails.details).toBeVisible();
    await expect(this.productDetails.description).toBeVisible();
    await expect(this.productDetails.image).toBeVisible();
    await expect(this.productDetails.id).toBeVisible();
    await expect(this.productDetails.copyIdBtn).toBeVisible();

    await expect(this.productDetails.name).toContainText(name);
    await expect(this.productDetails.price).toContainText(price);
  }

  async getProductDetails() {
    return {
      name: await this.productDetails.name.textContent(),
      description: await this.productDetails.description.textContent(),
      price: await this.productDetails.price.textContent(),
      id: await this.productDetails.id.textContent(),
    };
  }
}
