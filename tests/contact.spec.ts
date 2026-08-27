import { expect, test } from "@playwright/test";

const validSubmission = {
  name: "Alex Filmmaker",
  email: "alex@example.com",
  subject: "Development enquiry",
  message: "I would like to discuss an original feature film project.",
  company: "",
};

test.describe("CONTACT page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/contact");
  });

  test("loads the contact content and shared navigation", async ({ page }) => {
    await expect(page).toHaveTitle("Contact | Layton Patrick");
    await expect(
      page.getByRole("heading", { level: 1, name: "Contact." }),
    ).toBeVisible();
    await expect(page.getByText("Layton Patrick welcomes select enquiries")).toHaveCount(0);
    await expect(page.getByText("General Enquiries")).toHaveCount(0);
    await expect(page.getByText("Based in Australia").first()).toBeVisible();
    await expect(page.getByText("Working internationally").first()).toBeVisible();
    await expect(
      page.getByText("Company profile and project materials available on request."),
    ).toBeVisible();

    const main = page.getByRole("main");
    await expect(
      main.getByRole("link", { name: "Layton@laytonpatrick.com" }),
    ).toHaveCount(0);
    await expect(
      page.getByRole("contentinfo").getByRole("link", {
        name: "Layton@laytonpatrick.com",
      }),
    ).toHaveAttribute("href", "mailto:Layton@laytonpatrick.com");
    await expect(page.locator("main img")).toHaveAttribute("loading", "eager");

    const navigation = page.getByRole("navigation", {
      name: "Primary navigation",
    });
    await expect(navigation.getByRole("link", { name: "CONTACT" })).toHaveAttribute(
      "aria-current",
      "page",
    );
    await expect(navigation.getByText("DEVELOPMENT")).toHaveCount(0);
  });

  test("exposes accessible required fields and native email validation", async ({ page }) => {
    for (const label of ["Name", "Email", "Subject", "Message"]) {
      await expect(page.getByLabel(label, { exact: true })).toHaveAttribute(
        "required",
        "",
      );
    }

    const email = page.getByLabel("Email", { exact: true });
    await email.fill("not-an-email");
    expect(await email.evaluate((element) => (element as HTMLInputElement).checkValidity())).toBe(
      false,
    );

    const formIsValid = await page
      .getByRole("button", { name: /Send Message/ })
      .evaluate((button) => (button.closest("form") as HTMLFormElement).checkValidity());
    expect(formIsValid).toBe(false);
  });

  test("shows the success state with a safely mocked delivery", async ({ page }) => {
    await page.route("**/api/contact", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ message: "Thank you. Your message has been sent." }),
      });
    });

    await page.getByLabel("Name", { exact: true }).fill(validSubmission.name);
    await page.getByLabel("Email", { exact: true }).fill(validSubmission.email);
    await page.getByLabel("Subject", { exact: true }).fill(validSubmission.subject);
    await page.getByLabel("Message", { exact: true }).fill(validSubmission.message);
    await page.getByRole("button", { name: /Send Message/ }).click();

    await expect(page.getByRole("status")).toHaveText(
      "Thank you. Your message has been sent.",
    );
  });

  test("shows a controlled failure state when delivery is unavailable", async ({ page }) => {
    await page.route("**/api/contact", async (route) => {
      await route.fulfill({
        status: 503,
        contentType: "application/json",
        body: JSON.stringify({ message: "Email delivery is temporarily unavailable." }),
      });
    });

    await page.getByLabel("Name", { exact: true }).fill(validSubmission.name);
    await page.getByLabel("Email", { exact: true }).fill(validSubmission.email);
    await page.getByLabel("Subject", { exact: true }).fill(validSubmission.subject);
    await page.getByLabel("Message", { exact: true }).fill(validSubmission.message);
    await page.getByRole("button", { name: /Send Message/ }).click();

    await expect(page.getByRole("status")).toHaveText(
      "Something went wrong. Please try again or email Layton@laytonpatrick.com.",
    );
  });

  test("prevents repeated submissions while a request is pending", async ({ page }) => {
    let requestCount = 0;
    let releaseRequest: (() => void) | undefined;
    const requestGate = new Promise<void>((resolve) => {
      releaseRequest = resolve;
    });

    await page.route("**/api/contact", async (route) => {
      requestCount += 1;
      await requestGate;
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ message: "Thank you. Your message has been sent." }),
      });
    });

    await page.getByLabel("Name", { exact: true }).fill(validSubmission.name);
    await page.getByLabel("Email", { exact: true }).fill(validSubmission.email);
    await page.getByLabel("Subject", { exact: true }).fill(validSubmission.subject);
    await page.getByLabel("Message", { exact: true }).fill(validSubmission.message);

    const button = page.getByRole("button", { name: /Send Message|Sending/ });
    await button.click();
    await expect(button).toBeDisabled();
    await expect.poll(() => requestCount).toBe(1);
    await button.click({ force: true });
    expect(requestCount).toBe(1);

    releaseRequest?.();
    await expect(page.getByRole("status")).toHaveText(
      "Thank you. Your message has been sent.",
    );
  });

  test("has no horizontal overflow", async ({ page }) => {
    const hasHorizontalOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth > window.innerWidth,
    );
    expect(hasHorizontalOverflow).toBe(false);
  });
});

test.describe("CONTACT API", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/contact");
  });

  test("rejects invalid data with field errors", async ({ page }) => {
    const response = await page.evaluate(async () => {
      const result = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "",
          email: "invalid",
          subject: "",
          message: "",
          company: "",
        }),
      });

      return { status: result.status, body: await result.json() };
    });

    expect(response.status).toBe(422);
    expect(
      (response.body as { fieldErrors?: Record<string, string> }).fieldErrors?.email,
    ).toBeTruthy();
  });

  test("blocks honeypot submissions without sending email", async ({ page }) => {
    const response = await page.evaluate(async (payload) => {
      const result = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      return { status: result.status };
    }, { ...validSubmission, company: "Filled by a bot" });

    expect(response.status).toBe(403);
  });
});
