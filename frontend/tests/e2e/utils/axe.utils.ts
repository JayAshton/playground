import { AxeBuilder } from "@axe-core/playwright";
import { type Page, expect } from "@playwright/test";

interface AuditOptions {
  exclude?: string | string[];
  disableRules?: string | string[];
}

export class AxeUtils {
  private readonly DEFAULT_TAGS = [
    "wcag2a",
    "wcag2aa",
    "wcag21a",
    "wcag21aa",
    "wcag22a",
    "wcag22aa",
  ];

  constructor(readonly page: Page) {}

  async audit(options?: AuditOptions) {
    const builder = new AxeBuilder({ page: this.page }).withTags(
      this.DEFAULT_TAGS,
    );

    if (options?.exclude) {
      if (Array.isArray(options.exclude)) {
        options.exclude.forEach((selector) => builder.exclude(selector));
      } else {
        builder.exclude(options.exclude);
      }
    }
    if (options?.disableRules) builder.disableRules(options.disableRules);

    const results = await builder.analyze();
    expect(results.violations).toEqual([]);
  }
}
