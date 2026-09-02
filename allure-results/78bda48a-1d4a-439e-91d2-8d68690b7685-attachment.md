# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests\Logout.spec.js >> TC 1 - Login and Logout
- Location: tests\Logout.spec.js:12:5

# Error details

```
TypeError: Cannot read properties of undefined (reading '0')
```

# Test source

```ts
  1  | import { test, expect } from '../fixtures/testSetup.js';
  2  | 
  3  | import logoutData from '../testdata/LogOut.json';
  4  | 
  5  | import LoginPage from '../pages/LoginPage.js';
  6  | 
  7  | import Logout from '../pages/LogOut.js';
  8  | 
  9  | import { attachStepScreenshot } from '../utilities/screenshot.js';
  10 | 
  11 | 
  12 | test('TC 1 - Login and Logout', async ({ page }) => {
  13 | 
  14 |   const login = new LoginPage(page);
  15 | 
  16 |   const logout = new Logout(page);
  17 | 
> 18 |   const data = logoutData.logoutTests[0];
     |                                      ^ TypeError: Cannot read properties of undefined (reading '0')
  19 | 
  20 | 
  21 |   // ======================================================
  22 |   // 1. LOGIN
  23 |   // ======================================================
  24 | 
  25 |   await test.step('Open Login Page', async () => {
  26 | 
  27 |     await login.gotoURL();
  28 | 
  29 |   });
  30 | 
  31 | 
  32 |   await test.step('Login with Valid Credentials', async () => {
  33 | 
  34 |     await login.login(
  35 |       data.username,
  36 |       data.password
  37 |     );
  38 | 
  39 |   });
  40 | 
  41 | 
  42 |   await test.step('Verify Login', async () => {
  43 | 
  44 |     await expect(login.logo)
  45 |       .toHaveText(data.expectedMsg);
  46 | 
  47 |     await attachStepScreenshot(
  48 |       page,
  49 |       '05 - Login Successfully Verified'
  50 |     );
  51 | 
  52 |   });
  53 | 
  54 | 
  55 |   // ======================================================
  56 |   // 2. OPEN MENU
  57 |   // ======================================================
  58 | 
  59 |   await test.step('Open Menu', async () => {
  60 | 
  61 |     await logout.openMenu();
  62 | 
  63 |   });
  64 | 
  65 | 
  66 |   // ======================================================
  67 |   // 3. LOGOUT
  68 |   // ======================================================
  69 | 
  70 |   await test.step('Logout', async () => {
  71 | 
  72 |     await logout.logout();
  73 | 
  74 |   });
  75 | 
  76 | 
  77 |   // ======================================================
  78 |   // 4. VERIFY LOGOUT
  79 |   // ======================================================
  80 | 
  81 |   await test.step('Verify Logout', async () => {
  82 | 
  83 |     await expect(logout.loginButton)
  84 |       .toBeVisible();
  85 | 
  86 |     await attachStepScreenshot(
  87 |       page,
  88 |       '08 - Logout Successfully Verified'
  89 |     );
  90 | 
  91 |   });
  92 | 
  93 | });
```