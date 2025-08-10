import { Locator, Page } from "@playwright/test";
import { HomePage } from "./HomePage";

export class LogoutPage {
  private readonly page: Page;
  private readonly btnContinue: Locator;
  private readonly txtAccountLogout: Locator;

  constructor(page: Page) {
    this.page = page;
    this.btnContinue = page.getByRole("link", { name: "Continue" });
    this.txtAccountLogout = page.locator("#content h1");
  }

  async clickContinue(): Promise<HomePage> {
    await this.btnContinue.click();
    return new HomePage(this.page);
  }

  async isContinueButtonVisible(): Promise<boolean> {
    return await this.btnContinue.isVisible();
  }
}
