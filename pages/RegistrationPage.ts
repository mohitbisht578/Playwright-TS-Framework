import { Page, expect, Locator } from "@playwright/test";

export class RegistrationPage {
  private readonly page: Page;

  // locators
  private readonly txtFirstName: Locator;
  private readonly txtLastName: Locator;
  private readonly txtEmail: Locator;
  private readonly txtTelephone: Locator;
  private readonly txtPassword: Locator;
  private readonly txtConfirmPassword: Locator;
  private readonly chkdPolicy: Locator;
  private readonly btnContinue: Locator;
  private readonly msgConfirmation: Locator;

  //constructor
  constructor(page: Page) {
    this.page = page;
    this.txtFirstName = page.locator("#input-firstname");
    this.txtLastName = page.locator("#input-lastname");
    this.txtEmail = page.locator("#input-email");
    this.txtTelephone = page.locator("#input-telephone");
    this.txtPassword = page.locator("#input-password");
    this.txtConfirmPassword = page.locator("#input-confirm");
    this.chkdPolicy = page.locator('input[name="agree"]');
    this.btnContinue = page.locator('input[value="Continue"]');
    this.msgConfirmation = page.locator(
      'h1:has-text("Your Account Has been Created!")'
    );
  }

  //page actions
  async setFirstName(firstName: string): Promise<void> {
    await this.txtFirstName.fill(firstName);
  }

  async setLastName(lastName: string): Promise<void> {
    await this.txtLastName.fill(lastName);
  }

  async setEmail(email: string): Promise<void> {
    await this.txtEmail.fill(email);
  }

  async setTelephone(telephone: string): Promise<void> {
    await this.txtTelephone.fill(telephone);
  }

  async setPassword(password: string): Promise<void> {
    await this.txtPassword.fill(password);
  }

  async setConfirmPassword(confirmPassword: string): Promise<void> {
    await this.txtConfirmPassword.fill(confirmPassword);
  }

  async setPrivacyPolicy(): Promise<void> {
    await this.chkdPolicy.click();
  }

  async clickContinue(): Promise<void> {
    await this.btnContinue.click();
  }

  async getConfirmationMsg(): Promise<string> {
    return (await this.msgConfirmation.textContent()) ?? "";
  }

  //complete registration form
  async completeRegistraion(userData: {
    firstName: string;
    lastName: string;
    email: string;
    telephone: string;
    password: string;
  }): Promise<void> {
    await this.setFirstName(userData.firstName);
    await this.setLastName(userData.lastName);
    await this.setEmail(userData.email);
    await this.setTelephone(userData.telephone);
    await this.setPassword(userData.password);
    await this.setConfirmPassword(userData.password);
    await this.setPrivacyPolicy();
    await this.clickContinue();
    await expect(this.msgConfirmation).toBeVisible();
  }
}
