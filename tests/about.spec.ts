import { expect, test } from "@playwright/test";

test.describe("ABOUT page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("loads the approved content and navigation", async ({ page }) => {
    await expect(page).toHaveTitle("Layton Patrick | Independent Film Production");
    await expect(
      page.getByRole("heading", { level: 1, name: /Original stories/ }),
    ).toBeVisible();

    const navigation = page.getByRole("navigation", {
      name: "Primary navigation",
    });
    await expect(navigation.getByRole("link", { name: "ABOUT" })).toHaveAttribute(
      "aria-current",
      "page",
    );
    await expect(navigation.getByRole("link", { name: "CONTACT" })).toHaveAttribute(
      "href",
      "/contact",
    );
    await expect(navigation.getByText("DEVELOPMENT")).toHaveCount(0);
  });

  test("connects both calls to action and major sections", async ({ page }) => {
    await expect(page.getByRole("link", { name: /Company Profile/ })).toHaveAttribute(
      "href",
      "#about",
    );
    await expect(page.getByRole("link", { name: /Get in Touch/ })).toHaveAttribute(
      "href",
      "/contact",
    );
    await expect(
      page.getByRole("heading", { level: 2, name: "Selective by design." }),
    ).toBeVisible();
    await expect(page.getByText("DEVELOPMENT", { exact: true })).toBeVisible();
    await expect(page.getByText("PACKAGING", { exact: true })).toBeVisible();
    await expect(page.getByText("PRODUCTION", { exact: true })).toBeVisible();
    await expect(page.getByText("Current Focus", { exact: true })).toBeVisible();
  });

  test("scrolls to ABOUT when its fragment link is clicked repeatedly", async ({ page }) => {
    const companyProfileLink = page.getByRole("link", { name: /Company Profile/ });
    const aboutSection = page.locator("#about");

    await companyProfileLink.click();
    await expect(page).toHaveURL(/#about$/);
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(0);
    await expect(aboutSection).toBeInViewport();

    await page.evaluate(() => window.scrollTo(0, 0));
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);

    await companyProfileLink.click();
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(0);
    await expect(aboutSection).toBeInViewport();
  });

  test("has the shared footer and no horizontal overflow", async ({ page }) => {
    const footer = page.getByRole("contentinfo");
    await expect(footer.getByRole("link", { name: "Layton@laytonpatrick.com" })).toHaveAttribute(
      "href",
      "mailto:Layton@laytonpatrick.com",
    );

    const hasHorizontalOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth > window.innerWidth,
    );
    expect(hasHorizontalOverflow).toBe(false);
  });
});
