import { expect, test } from "@playwright/test";

test("ABOUT and CONTACT load without browser runtime errors", async ({ page }) => {
  const consoleErrors: string[] = [];
  const pageErrors: string[] = [];
  const failedResources: string[] = [];

  page.on("console", (message) => {
    if (message.type() === "error") {
      consoleErrors.push(message.text());
    }
  });
  page.on("pageerror", (error) => pageErrors.push(error.message));
  page.on("response", (response) => {
    if (response.status() >= 400 && response.request().resourceType() !== "document") {
      failedResources.push(`${response.status()} ${response.url()}`);
    }
  });

  for (const route of ["/", "/contact"]) {
    await page.goto(route);
    await page.evaluate(() => document.fonts.ready);
  }

  expect(consoleErrors).toEqual([]);
  expect(pageErrors).toEqual([]);
  expect(failedResources).toEqual([]);
});
