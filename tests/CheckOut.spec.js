import { test, expect } from '../fixtures/testSetup.js';

import checkoutData from '../testdata/CheckOut.json';

import LoginPage from '../pages/LoginPage.js';

import CheckOut from '../pages/CheckOut.js';

import { attachStepScreenshot } from '../utilities/screenshot.js';


test('TC 1 - Login and Checkout Product', async ({ page }) => {

  const login = new LoginPage(page);

  const checkout = new CheckOut(page);

  const data = checkoutData.checkoutTests[0];


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
      '05 - Login Successfully Verified'
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
      '08 - Product Verified in Cart'
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

  await test.step('Enter First Name', async () => {

    await checkout.enterFirstName(
      data.firstName
    );

  });


  await test.step('Enter Last Name', async () => {

    await checkout.enterLastName(
      data.lastName
    );

  });


  await test.step('Enter Postal Code', async () => {

    await checkout.enterPostalCode(
      data.postalCode
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
      '13 - Checkout Overview Verified'
    );

  });


  // ======================================================
  // 7. FINISH ORDER
  // ======================================================

  await test.step('Finish Order', async () => {

    await checkout.clickFinish();

  });


  // ======================================================
  // 8. VERIFY ORDER
  // ======================================================

  await test.step('Verify Order Completed', async () => {

    await expect(checkout.completeMessage)
      .toHaveText(data.expectedMsg);

    await attachStepScreenshot(
      page,
      '15 - Order Successfully Completed'
    );

  });

});