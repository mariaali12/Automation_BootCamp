import { test } from '../fixtures/testSetup.js';
import { attachStepScreenshot } from '../utilities/screenshot.js';
import BasePage from './BasePage.js';

class Logout extends BasePage {

  constructor(page) {

    super(page);

    this.menuButton = page.locator(
      '#react-burger-menu-btn'
    );

    this.logoutButton = page.locator(
      '#logout_sidebar_link'
    );

    this.loginButton = page.locator(
      '#login-button'
    );

  }


  async openMenu() {

    await test.step(
      'Open Menu',
      async () => {

        await this.menuButton.click();

        await attachStepScreenshot(
          this.page,
          '06 - Menu Opened'
        );

      }
    );

  }


  async logout() {

    await test.step(
      'Click Logout',
      async () => {

        await this.logoutButton.click();

        await attachStepScreenshot(
          this.page,
          '07 - After Clicking Logout'
        );

      }
    );

  }

}

export default Logout;