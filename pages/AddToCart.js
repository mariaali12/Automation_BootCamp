import { attachStepScreenshot } from '../utilities/screenshot.js';
import BasePage from './BasePage.js';

class AddToCart extends BasePage {

  constructor(page) {

    super(page);

    this.bagpack = page.locator(
      "[data-test='item-4-title-link']"
    );

    this.bikelight = page.locator(
      "[data-test='item-0-title-link']"
    );

    this.shirt = page.locator(
      "[data-test='item-1-title-link']"
    );

    this.jacket = page.locator(
      "[data-test='item-5-title-link']"
    );

    this.addToCartButton = page.locator(
      "[data-test='add-to-cart']"
    );

    this.cart = page.locator(
      '.shopping_cart_link'
    );

    this.cartBadge = page.locator(
      '.shopping_cart_badge'
    );

    this.productName = page.locator(
      '.inventory_item_name'
    );

  }


  async openProduct(value) {

    await value.click();

    await attachStepScreenshot(
      this.page,
      '06 - Product Opened'
    );

  }


  async addProduct(value) {

    await value.click();

    await attachStepScreenshot(
      this.page,
      '07 - Product Added to Cart'
    );

  }


  async openCart() {

    await this.cart.click();

    await attachStepScreenshot(
      this.page,
      '08 - Shopping Cart Opened'
    );

  }

}

export default AddToCart;