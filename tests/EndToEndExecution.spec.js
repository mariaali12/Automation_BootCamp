import LoginPage from '../pages/LoginPage.js';
import CheckOut from '../pages/CheckOut.js';
import Logout from '../pages/LogOut.js';

class EndToEndExecution {

  constructor(page) {

    this.page = page;

    this.login = new LoginPage(page);
    this.checkout = new CheckOut(page);
    this.logout = new Logout(page);

  }

  async execute(data) {

    // LOGIN
    await this.login.gotoURL();

    await this.login.login(
      data.username,
      data.password
    );

    // ADD PRODUCT
    await this.checkout.addProductToCart();

    // OPEN CART
    await this.checkout.openCart();

    // CHECKOUT
    await this.checkout.clickCheckout();

    // CUSTOMER INFORMATION
    await this.checkout.enterFirstName(
      data.firstName
    );

    await this.checkout.enterLastName(
      data.lastName
    );

    await this.checkout.enterPostalCode(
      data.postalCode
    );

    // CONTINUE
    await this.checkout.clickContinue();

    // FINISH
    await this.checkout.clickFinish();

    // LOGOUT
    await this.logout.openMenu();

    await this.logout.logout();

  }

}

export default EndToEndExecution;