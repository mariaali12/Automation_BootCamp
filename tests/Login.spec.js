import { test, expect } from '../fixtures/testSetup.js';

import loginData from '../testdata/loginData.json';

import LoginPage from '../pages/LoginPage.js';


// ======================================================
// TC 1 - VALID USERNAME AND VALID PASSWORD
// ======================================================

test('TC 1 - Valid Username and Valid Password', async ({ page }) => {

  const login = new LoginPage(page);

  const data = loginData.loginTests[0];


  await test.step('Open Login Page', async () => {

    await login.gotoURL();

  });


  await test.step('Enter Credentials and Login', async () => {

    await login.login(
      data.username,
      data.password
    );

  });


  await test.step('Verify Products Page', async () => {

    await expect(login.message)
      .toHaveText(data.expectedMsg);

    await login.attachScreenshot(
      '05 - Products Page Should be Displayed'
    );

  });

});


// ======================================================
// TC 2 - INVALID USERNAME AND INVALID PASSWORD
// ======================================================

test('TC 2 - Invalid Username and Invalid Password', async ({ page }) => {

  const login = new LoginPage(page);

  const data = loginData.loginTests[1];


  await test.step('Open Login Page', async () => {

    await login.gotoURL();

  });


  await test.step('Enter Invalid Credentials and Login', async () => {

    await login.login(
      data.username,
      data.password
    );

  });


  await test.step('Verify Error Message', async () => {

    await expect(login.errorMessage)
      .toContainText(data.expectedMsg);

    await login.attachScreenshot(
      '05 - Invalid Login Error Message'
    );

  });

});


// ======================================================
// TC 3 - VALID USERNAME AND INVALID PASSWORD
// ======================================================

test('TC 3 - Valid Username and Invalid Password', async ({ page }) => {

  const login = new LoginPage(page);

  const data = loginData.loginTests[2];


  await test.step('Open Login Page', async () => {

    await login.gotoURL();

  });


  await test.step('Enter Credentials and Login', async () => {

    await login.login(
      data.username,
      data.password
    );

  });


  await test.step('Verify Error Message', async () => {

    await expect(login.errorMessage)
      .toContainText(data.expectedMsg);

    await login.attachScreenshot(
      '05 - Invalid Password Error Message'
    );

  });

});


// ======================================================
// TC 4 - INVALID USERNAME AND VALID PASSWORD
// ======================================================

test('TC 4 - Invalid Username and Valid Password', async ({ page }) => {

  const login = new LoginPage(page);

  const data = loginData.loginTests[3];


  await test.step('Open Login Page', async () => {

    await login.gotoURL();

  });


  await test.step('Enter Credentials and Login', async () => {

    await login.login(
      data.username,
      data.password
    );

  });


  await test.step('Verify Error Message', async () => {

    await expect(login.errorMessage)
      .toContainText(data.expectedMsg);

    await login.attachScreenshot(
      '05 - Invalid Username Error Message'
    );

  });

});


// ======================================================
// TC 5 - EMPTY USERNAME AND EMPTY PASSWORD
// ======================================================

test('TC 5 - Empty Username and Empty Password', async ({ page }) => {

  const login = new LoginPage(page);

  const data = loginData.loginTests[4];


  await test.step('Open Login Page', async () => {

    await login.gotoURL();

  });


  await test.step('Leave Credentials Empty and Login', async () => {

    await login.login(
      data.username,
      data.password
    );

  });


  await test.step('Verify Required Username Error', async () => {

    await expect(login.errorMessage)
      .toContainText(data.expectedMsg);

    await login.attachScreenshot(
      '05 - Username Required Error Message'
    );

  });

});