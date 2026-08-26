# Visual QA evidence

These captures were regenerated on 26 August 2026 after installing the exact supplied `logo_LP.svg`. They were produced by `npm run test:visual` and manually reviewed against the approved ABOUT and CONTACT desktop mockups.

The dimensions in the test configuration describe the browser viewport. Because the test captures the entire document with `fullPage: true`, the PNG height expands to include content below the initial viewport.

| Page | Test viewport | Full-page PNG | Evidence |
| --- | --- | --- | --- |
| ABOUT | 1440 × 1800 | 1440 × 1854 | [about-desktop-1440.png](./about-desktop-1440.png) |
| CONTACT | 1440 × 1800 | 1440 × 1845 | [contact-desktop-1440.png](./contact-desktop-1440.png) |
| ABOUT | 390 × 844 | 390 × 2339 | [about-mobile-390.png](./about-mobile-390.png) |
| CONTACT | 390 × 844 | 390 × 1892 | [contact-mobile-390.png](./contact-mobile-390.png) |

## Manual comparison

The side-by-side review covered logo scale, header spacing and rule, navigation state, headline scale and wrapping, copy widths, CTA dimensions, image framing, section dividers, ABOUT grid proportions, CONTACT column rule and form underlines, footer alignment, and mobile stacking.

The following differences from the mockup imagery were consciously accepted:

- The final supplied production stills replace the room imagery shown in the earlier style-guide mockups. The layout and framing follow the mockups while the final supplied files control the image content.
- The desktop pages extend 45–54 pixels beyond the 1800-pixel viewport. This preserves the approved section spacing and complete footer rather than compressing the document solely to force an exact 1800-pixel canvas.
- The mobile layouts are responsive adaptations of the desktop designs because separate approved mobile mockups were not supplied.
- Minor anti-aliasing differences are expected between the rendered browser fonts and the static design exports.

No additional imagery or visual treatments were introduced.

## Asset provenance and crop review

The repository copies were compared with the supplied local masters using SHA-256:

| Asset | Source dimensions | SHA-256 result |
| --- | --- | --- |
| `about-hero.jpg` | 2400 × 2400 | Exact match: `57CEC80923C0CADECE83537C0FF746943681CAA200BFBE8BE502FB0D8690C172` |
| `contact-studio.png` | 2400 × 800 | Exact match: `AB2F721B23F69D42E75EEA98E5F53238BA84EE08E93D1EFA68BF1E9D2CB0397F` |
| `layton-patrick-logo.svg` | 900 × 300 viewBox | Exact match: `9C8B662206D973E692545FF66E968D1DB728D13108D4F31411F5E8B69E06D5BD` |

The CONTACT source is 3:1, while the approved desktop frame is 18:5. The implementation intentionally uses `object-fit: cover` with centred positioning, producing a modest vertical crop at desktop. Mobile uses a centred 16:9 crop. Both crops were reviewed in the captures above and accepted in implementation QA.

## Expected visual-test skips

Playwright defines four projects: 390, 768, 1024, and 1440 pixels wide. Functional and responsive assertions run at all four. The screenshot-capture test deliberately runs only for `mobile-390` and `desktop-1440`, so its tablet executions call `test.skip()` by design. Therefore `2 passed, 2 skipped` for `npm run test:visual` means both required visual captures passed; it does not represent a failure or omitted functional coverage.

## Deployment-stage checks

No live Resend API delivery has been claimed as tested. Actual inbox delivery, Outlook `Reply-To`, Resend domain authentication, and production BotID behaviour require a Vercel deployment with the approved environment variables and remain deployment-stage acceptance tests.
