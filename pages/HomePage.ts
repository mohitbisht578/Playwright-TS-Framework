import { Page, expect, Locator } from "@playwright/test";

export class HomePage {
  private readonly page: Page;
  // locators
  private readonly linkMyAccount: Locator;
  private readonly linkRegister: Locator;
  private readonly linkLogin: Locator;
  private readonly txtSearchbox: Locator;
  private readonly btnSearch: Locator;

  // constructors
  // assign page to local page
  constructor(page: Page) {
    this.page = page;
   // this.linkMyAccount = page.locator('span:has-text("My Account")');
    this.linkMyAccount = page.locator('a[title="My Account"]');
    this.linkRegister = page.locator('a:has-text("Register")');
    this.linkLogin = page.getByRole("link", { name: "Login" });
    this.txtSearchbox = page.getByPlaceholder("Search");
    this.btnSearch = page.locator('#search button[type="button"]');
  }

  // action methods
  async isHomePageExist() {
    let title: string = await this.page.title();
    if (title) {
      return true;
    }
    return false;
    // try{
    //     await expect(this.page).toHaveTitle("Your Store");
    //     return true;
    // }catch(error){
    //     return false;
    // }
  }

  async clickMyAccount() {
    try {
      await this.linkMyAccount.click();
    } catch (error) {
      console.log(`Exception occured while clicking 'My Account': ${error}`);
      throw error;
    }
  }

  async clickRegister() {
    try {
      await this.linkRegister.click();
    } catch (error) {
      console.log(`Exception occured while clicking 'Register': ${error}`);
      throw error;
    }
  }

  async clickLogin() {
    try {
      await this.linkLogin.click();
    } catch (error) {
      console.log(`Exception occured while clicking 'login': ${error}`);
      throw error;
    }
  }

  // enter product in search box
  async enterProductName(productName: string) {
    try {
      await this.txtSearchbox.fill(productName);
    } catch (error) {
      console.log(`Exception occured while entering 'product name': ${error}`);
      throw error;
    }
  }

  async clickSearchBtn() {
    try {
      await this.btnSearch.click();
    } catch (error) {
      console.log(`Exception occured while clicking search button: ${error}`);
      throw error;
    }
  }
}
