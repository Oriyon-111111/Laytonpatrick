import { test } from "@playwright/test";

const visualProjects = new Set(["mobile-390", "desktop-1440"]);

test("captures ABOUT and CONTACT visual references", async ({ page }, testInfo) => {
  test.skip(!visualProjects.has(testInfo.project.name));

  for (const route of [
    { path: "/", name: "about" },
    { path: "/contact", name: "contact" },
  ]) {
    await page.goto(route.path);
    await page.evaluate(() => document.fonts.ready);
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.screenshot({
      path: testInfo.outputPath(`${route.name}-${testInfo.project.name}.png`),
      fullPage: true,
      caret: "initial",
    });
  }
});
