# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests\Login.spec.js >> TC 5 - Empty Username and Empty Password
- Location: tests\Login.spec.js:180:5

# Error details

```
TypeError: (0 , _screenshot.attachStepScreenshot) is not a function
```

```
TypeError: (0 , _screenshot.attachScreenshotAfterEach) is not a function
```

# Page snapshot

```yaml
- generic [ref=f1e3]:
  - generic [ref=f1e4]: Swag Labs
  - generic [ref=f1e5]:
    - generic [ref=f1e9]:
      - textbox "Username" [ref=f1e11]
      - textbox "Password" [ref=f1e13]
      - button "Login" [ref=f1e15] [cursor=pointer]
    - generic [ref=f1e17]:
      - generic [ref=f1e18]:
        - heading "Accepted usernames are:" [level=4] [ref=f1e19]
        - text: standard_userlocked_out_userproblem_userperformance_glitch_usererror_uservisual_user
      - generic [ref=f1e20]:
        - heading "Password for all users:" [level=4] [ref=f1e21]
        - text: secret_sauce
```

# Test source

```ts
  1  | import { test as base } from '@playwright/test';
  2  | 
  3  | import BasePage from '../pages/BasePage.js';
  4  | 
  5  | import { attachScreenshotAfterEach } from '../utilities/screenshot.js';
  6  | 
  7  | 
  8  | // Application URL
  9  | const APP_URL = 'https://www.saucedemo.com/';
  10 | 
  11 | 
  12 | // Custom Playwright Fixture
  13 | export const test = base.extend({
  14 | 
  15 |   pageSetup: [
  16 | 
  17 |     async ({ page }, use) => {
  18 | 
  19 |       const basePage = new BasePage(page);
  20 | 
  21 |       await basePage.navigate(APP_URL);
  22 | 
  23 |       await use();
  24 | 
  25 |     },
  26 | 
  27 |     { auto: true }
  28 | 
  29 |   ]
  30 | 
  31 | });
  32 | 
  33 | 
  34 | // Screenshot after each test
  35 | test.afterEach(async ({ page }, testInfo) => {
  36 | 
> 37 |   await attachScreenshotAfterEach(page, testInfo);
     |                                  ^ TypeError: (0 , _screenshot.attachScreenshotAfterEach) is not a function
  38 | 
  39 | });
  40 | 
  41 | 
  42 | // Export expect
  43 | export { expect } from '@playwright/test';
```