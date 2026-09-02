import { test, expect } from '../fixtures/testSetup.js';

import logoutData from '../testdata/LogOut.json';

import LoginPage from '../pages/LoginPage.js';

import Logout from '../pages/LogOut.js';

import { attachStepScreenshot } from '../utilities/screenshot.js';


test('TC 1 - Login and Logout', async ({ page }) => {

  const login = new LoginPage(page);

  const logout = new Logout(page);

  const data = logoutData.logoutTests[0];


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
      .toHaveText(data.expectedMsg);

    await attachStepScreenshot(
      page,
      '05 - Login Successfully Verified'
    );

  });


  // ======================================================
  // 2. OPEN MENU
  // ======================================================

  await test.step('Open Menu', async () => {

    await logout.openMenu();

  });


  // ======================================================
  // 3. LOGOUT
  // ======================================================

  await test.step('Logout', async () => {

    await logout.logout();

  });


  // ======================================================
  // 4. VERIFY LOGOUT
  // ======================================================

  await test.step('Verify Logout', async () => {

    await expect(logout.loginButton)
      .toBeVisible();

    await attachStepScreenshot(
      page,
      '08 - Logout Successfully Verified'
    );

  });

});