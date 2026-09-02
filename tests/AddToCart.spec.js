import { test, expect } from '../fixtures/testSetup.js';

import addToCartData from '../testdata/AddToCart.json';

import LoginPage from '../pages/LoginPage.js';

import AddToCart from '../pages/AddToCart.js';

import { attachStepScreenshot } from '../utilities/screenshot.js';


test('TC 1 - Login and Add Product to Cart', async ({ page }) => {

  const login = new LoginPage(page);

  const cart = new AddToCart(page);

  const data = addToCartData.addToCartTests[0];


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


  await test.step('Verify Login Successful', async () => {

    await expect(login.logo)
      .toHaveText('Swag Labs');

    await attachStepScreenshot(
      page,
      '05 - Login Successfully Verified'
    );

  });


  // ======================================================
  // 2. OPEN PRODUCT
  // ======================================================

  await test.step('Open Product', async () => {

    await cart.openProduct(cart.shirt);

  });


  // ======================================================
  // 3. ADD PRODUCT
  // ======================================================

  await test.step('Add Product to Cart', async () => {

    await cart.addProduct(
      cart.addToCartButton
    );

  });


  // ======================================================
  // 4. VERIFY CART BADGE
  // ======================================================

  await test.step('Verify Cart Badge', async () => {

    await expect(cart.cartBadge)
      .toHaveText(data.expectedMsg);

    await attachStepScreenshot(
      page,
      '09 - Cart Badge Verified'
    );

  });


  // ======================================================
  // 5. OPEN CART
  // ======================================================

  await test.step('Open Shopping Cart', async () => {

    await cart.openCart();

  });


  // ======================================================
  // 6. VERIFY PRODUCT
  // ======================================================

  await test.step('Verify Product in Cart', async () => {

    await expect(cart.productName)
      .toHaveText(data.productName[2]);

    await attachStepScreenshot(
      page,
      '10 - Product Successfully Verified in Cart'
    );

  });

});