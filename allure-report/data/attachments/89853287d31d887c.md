# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests\Login.spec.js >> TC 2 - Invalid Username and Invalid Password
- Location: tests\Login.spec.js:54:5

# Error details

```
TypeError: (0 , _screenshot.attachStepScreenshot) is not a function
```

```
TypeError: (0 , _screenshot.attachScreenshotAfterEach) is not a function
```

# Page snapshot

```yaml
- generic [ref=e3]:
  - generic [ref=e4]: Swag Labs
  - generic [ref=e5]:
    - generic [ref=e9]:
      - textbox "Username" [ref=e11]
      - textbox "Password" [ref=e13]
      - button "Login" [ref=e15] [cursor=pointer]
    - generic [ref=e17]:
      - generic [ref=e18]:
        - heading "Accepted usernames are:" [level=4] [ref=e19]
        - text: standard_userlocked_out_userproblem_userperformance_glitch_usererror_uservisual_user
      - generic [ref=e20]:
        - heading "Password for all users:" [level=4] [ref=e21]
        - text: secret_sauce
```

# Test source

```ts
  1  | import { test as base } from '@playwright/test';
  2  | 
  3  | import { attachScreenshotAfterEach } from '../utilities/screenshot.js';
  4  | 
  5  | 
  6  | // ======================================================
  7  | // CUSTOM PLAYWRIGHT FIXTURE
  8  | // ======================================================
  9  | 
  10 | export const test = base.extend({
  11 | 
  12 |   pageSetup: [
  13 | 
  14 |     async ({ page }, use) => {
  15 | 
  16 |       await use();
  17 | 
  18 |     },
  19 | 
  20 |     { auto: true }
  21 | 
  22 |   ]
  23 | 
  24 | });
  25 | 
  26 | 
  27 | // ======================================================
  28 | // SCREENSHOT AFTER EACH TEST
  29 | // ======================================================
  30 | 
  31 | test.afterEach(async ({ page }, testInfo) => {
  32 | 
> 33 |   await attachScreenshotAfterEach(
     |                                  ^ TypeError: (0 , _screenshot.attachScreenshotAfterEach) is not a function
  34 |     page,
  35 |     testInfo
  36 |   );
  37 | 
  38 | });
  39 | 
  40 | 
  41 | // ======================================================
  42 | // EXPECT
  43 | // ======================================================
  44 | 
  45 | export { expect } from '@playwright/test';
```