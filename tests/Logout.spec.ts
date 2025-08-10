import test, { expect } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { LoginPage } from "../pages/LoginPage";
import { TestConfig } from "../test.config";
import { MyAccountPage } from "../pages/MyAccountPage";
import { LogoutPage } from "../pages/LogoutPage";

let homePage:HomePage;
let loginPage:LoginPage;
let config:TestConfig;
let myAccountPage:MyAccountPage;
let logoutPage:LogoutPage;

test.beforeEach(async ({ page }) =>{
    config = new TestConfig();
    await page.goto(config.appUrl);

    homePage = new HomePage(page);
    loginPage = new LoginPage(page);

    myAccountPage = new MyAccountPage(page);
    logoutPage = new LogoutPage(page);

});

test.afterEach(async({page}) =>{
    await page.waitForTimeout(3000);
    page.close();
})

test('User logout test @master @regression', async() =>{

    // navigate to login page
    await homePage.clickMyAccount();
    await homePage.clickLogin();

    //perform login using valid credentials
    await loginPage.login(config.email, config.password);

    //verify successull login
    const isAccountExist = await myAccountPage.isMyAccountPageExists();
    expect(isAccountExist).toBeTruthy();

    //click logout which returns logout page instance
    logoutPage = await myAccountPage.clickLogout();

    //verify continue button is visible
    expect(await logoutPage.isContinueButtonVisible()).toBe(true);

    homePage = await logoutPage.clickContinue();

    console.log("in home page");
    // expect(await homePage.isHomePageExist()).toBe(true);

})

