import { type Page } from "@playwright/test";

export abstract class Base {
  constructor(public readonly page: Page) {}
}
