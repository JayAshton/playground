import { test as baseTest } from "@playwright/test";
import getPort from "get-port";
import {
  type PageFixtures,
  pageFixtures,
} from "./page-objects/page-fixtures.ts";
import { type UtilFixtures, utilFixtures } from "./utils/utils.fixtures.ts";

type CustomFixtures = UtilFixtures & PageFixtures;

export const test = baseTest.extend<CustomFixtures, { lighthousePort: number }>(
  {
    ...utilFixtures,
    ...pageFixtures,
    lighthousePort: [
      async ({}, use) => {
        const port = await getPort();
        await use(port);
      },
      { scope: "worker" },
    ],
  },
);
