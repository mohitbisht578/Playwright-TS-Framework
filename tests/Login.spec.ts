import test, { expect } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { TestConfig } from "../test.config";
import { MyAccountPage } from "../pages/MyAccountPage";
import { LoginPage } from "../pages/LoginPage";

let homePage: HomePage;
let loginPage: LoginPage;
let myAccountPage: MyAccountPage;
let config: TestConfig;

test.beforeEach(async ({ page }) => {
  config = new TestConfig();
  //navigate to url
  await page.goto(config.appUrl);
  homePage = new HomePage(page);
  loginPage = new LoginPage(page);
  myAccountPage = new MyAccountPage(page);
});

test.afterEach(async ({ page }) => {
  await page.waitForTimeout(3000);
  await page.close();
});

test("user login test @master @sanity @regression", async () => {
  await homePage.clickMyAccount();
  await homePage.clickLogin();
  await loginPage.setEmail(config.email);
  await loginPage.setPassword(config.password);
  await loginPage.clickLogin();

  // alternate
  //await loginPage.login(config.email, config.password);

  const isLoggedIn = await myAccountPage.isMyAccountPageExists();
  expect(isLoggedIn).toBeTruthy();
});
