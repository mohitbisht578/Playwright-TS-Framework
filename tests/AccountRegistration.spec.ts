import { test, expect } from "@playwright/test";
import { TestConfig } from "../test.config";
import { HomePage } from "../pages/HomePage";
import { RegistrationPage } from "../pages/RegistrationPage";
import { RandomDataUtil } from "../utils/randomDataGenerator";

let homePage: HomePage;
let registrationPage: RegistrationPage;

test.beforeEach(async ({ page }) => {
  const config = new TestConfig();
  //navigate to url
  await page.goto(config.appUrl);
  homePage = new HomePage(page);
  registrationPage = new RegistrationPage(page);
});

test.afterEach(async ({ page }) => {
  await page.waitForTimeout(3000);
  await page.close();
});

test("User registration test @master @sanity @regression", async () => {
  await homePage.clickMyAccount();
  await homePage.clickRegister();

  //fill data
  await registrationPage.setFirstName(RandomDataUtil.getFirstName());
  await registrationPage.setLastName(RandomDataUtil.getLastName());
  await registrationPage.setEmail(RandomDataUtil.getEmail());
  await registrationPage.setTelephone(RandomDataUtil.getPhoneNumber());

  const password = RandomDataUtil.getRandomPassword();
  console.log(password);

  await registrationPage.setPassword(password);
  await registrationPage.setConfirmPassword(password);

  await registrationPage.setPrivacyPolicy();
  await registrationPage.clickContinue();

  const confirmationMsg = await registrationPage.getConfirmationMsg();
  expect(confirmationMsg).toContain("Your Account Has Been Created!");
});
