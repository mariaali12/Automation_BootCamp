import { test } from '../fixtures/testSetup.js';
import { attachStepScreenshot } from '../utilities/screenshot.js';
import BasePage from './BasePage.js';

class LoginPage extends BasePage {

  constructor(page) {

    super(page);

    this.username = page.locator('#user-name');

    this.password = page.locator('#password');

    this.loginButton = page.locator('#login-button');

    this.logo = page.locator('.app_logo');

    this.message = page.locator('[data-test="title"]');

    this.errorMessage = page.locator('[data-test="error"]');

  }

  async gotoURL() {

    await this.navigate(
      'https://www.saucedemo.com/'
    );

    await attachStepScreenshot(
      this.page,
      '01 - Login Page Opened'
    );

  }

  async login(username, password) {

    await test.step(
      'Enter Username',
      async () => {

        await this.username.fill(username);

        await attachStepScreenshot(
          this.page,
          '02 - After Entering Username'
        );

      }
    );


    await test.step(
      'Enter Password',
      async () => {

        await this.password.fill(password);

        await attachStepScreenshot(
          this.page,
          '03 - After Entering Password'
        );

      }
    );


    await test.step(
      'Click Login',
      async () => {

        await this.loginButton.click();

        await attachStepScreenshot(
          this.page,
          '04 - After Clicking Login'
        );

      }
    );

  }

  async attachScreenshot(name) {

    await attachStepScreenshot(
      this.page,
      name
    );

  }

}

export default LoginPage;