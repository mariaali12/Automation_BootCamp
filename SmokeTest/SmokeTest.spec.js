import { test, expect } from '../fixtures/testSetup.js';

import smokeData from '../testdata/SmokeTest.json';

import LoginPage from '../pages/LoginPage.js';

import CheckOut from '../pages/CheckOut.js';

import Logout from '../pages/LogOut.js';

import { attachStepScreenshot } from '../utilities/screenshot.js';


test(
  'SMOKE TEST - Login → Add to Cart → Checkout → Logout',
  async ({ page }) => {

    const login = new LoginPage(page);

    const checkout = new CheckOut(page);

    const logout = new Logout(page);

    const data = smokeData.smokeTests[0];


    // ======================================================
    // 1. LOGIN
    // ======================================================

    await test.step('Open Login Page', async () => {

      await login.gotoURL();

    });


    await test.step('Login with Valid Credentials', async () => {

      await login.login(
        data.username,
        data.password
      );

    });


    await test.step('Verify Login', async () => {

      await expect(login.logo)
        .toHaveText('Swag Labs');

      await attachStepScreenshot(
        page,
        '05 - Smoke Login Verified'
      );

    });


    // ======================================================
    // 2. ADD PRODUCT
    // ======================================================

    await test.step('Add Product to Cart', async () => {

      await checkout.addProductToCart();

    });


    // ======================================================
    // 3. OPEN CART
    // ======================================================

    await test.step('Open Shopping Cart', async () => {

      await checkout.openCart();

    });


    await test.step('Verify Product in Cart', async () => {

      await expect(checkout.productName)
        .toHaveText(data.productName);

      await attachStepScreenshot(
        page,
        '08 - Smoke Cart Verified'
      );

    });


    // ======================================================
    // 4. CHECKOUT
    // ======================================================

    await test.step('Open Checkout', async () => {

      await checkout.clickCheckout();

    });


    // ======================================================
    // 5. CUSTOMER INFORMATION
    // ======================================================

    await test.step('Enter Customer Information', async () => {

      await checkout.enterFirstName(
        data.firstName
      );

      await checkout.enterLastName(
        data.lastName
      );

      await checkout.enterPostalCode(
        data.postalCode
      );

      await attachStepScreenshot(
        page,
        '11 - Smoke Customer Information Entered'
      );

    });


    // ======================================================
    // 6. CONTINUE
    // ======================================================

    await test.step('Continue to Overview', async () => {

      await checkout.clickContinue();

    });


    await test.step('Verify Product on Overview', async () => {

      await expect(checkout.productName)
        .toHaveText(data.productName);

      await attachStepScreenshot(
        page,
        '13 - Smoke Checkout Overview Verified'
      );

    });


    // ======================================================
    // 7. FINISH ORDER
    // ======================================================

    await test.step('Finish Order', async () => {

      await checkout.clickFinish();

    });


    await test.step('Verify Order Completed', async () => {

      await expect(checkout.completeMessage)
        .toHaveText(data.expectedCompleteMsg);

      await attachStepScreenshot(
        page,
        '15 - Smoke Order Completed'
      );

    });


    // ======================================================
    // 8. LOGOUT
    // ======================================================

    await test.step('Open Menu', async () => {

      await logout.openMenu();

    });


    await test.step('Logout', async () => {

      await logout.logout();

    });


    // ======================================================
    // 9. VERIFY LOGOUT
    // ======================================================

    await test.step('Verify Logout', async () => {

      await expect(logout.loginButton)
        .toBeVisible();

      await attachStepScreenshot(
        page,
        '18 - Smoke Logout Verified'
      );

    });

  }
);