import { attachStepScreenshot } from '../utilities/screenshot.js';
import BasePage from './BasePage.js';

class CheckOut extends BasePage {

  constructor(page) {

    super(page);

    this.addProduct = page.locator(
      '[data-test="add-to-cart-sauce-labs-backpack"]'
    );

    this.cart = page.locator(
      '.shopping_cart_link'
    );

    this.checkoutButton = page.locator(
      '#checkout'
    );

    this.firstName = page.locator(
      '#first-name'
    );

    this.lastName = page.locator(
      '#last-name'
    );

    this.postalCode = page.locator(
      '#postal-code'
    );

    this.continueButton = page.locator(
      '#continue'
    );

    this.productName = page.locator(
      '.inventory_item_name'
    );

    this.finishButton = page.locator(
      '#finish'
    );

    this.completeMessage = page.locator(
      '.complete-header'
    );

  }


  async addProductToCart() {

    await this.addProduct.click();

    await attachStepScreenshot(
      this.page,
      '06 - Product Added to Cart'
    );

  }


  async openCart() {

    await this.cart.click();

    await attachStepScreenshot(
      this.page,
      '07 - Shopping Cart Opened'
    );

  }


  async clickCheckout() {

    await this.checkoutButton.click();

    await attachStepScreenshot(
      this.page,
      '08 - Checkout Page Opened'
    );

  }


  async enterFirstName(firstName) {

    await this.firstName.fill(firstName);

    await attachStepScreenshot(
      this.page,
      '09 - First Name Entered'
    );

  }


  async enterLastName(lastName) {

    await this.lastName.fill(lastName);

    await attachStepScreenshot(
      this.page,
      '10 - Last Name Entered'
    );

  }


  async enterPostalCode(postalCode) {

    await this.postalCode.fill(postalCode);

    await attachStepScreenshot(
      this.page,
      '11 - Postal Code Entered'
    );

  }


  async clickContinue() {

    await this.continueButton.click();

    await attachStepScreenshot(
      this.page,
      '12 - Checkout Overview Opened'
    );

  }


  async clickFinish() {

    await this.finishButton.click();

    await attachStepScreenshot(
      this.page,
      '13 - Order Finished'
    );

  }

}

export default CheckOut;