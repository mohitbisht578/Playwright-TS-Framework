import test, { expect } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { TestConfig } from "../test.config";
import { MyAccountPage } from "../pages/MyAccountPage";
import { LoginPage } from "../pages/LoginPage";
import { DataProvider } from "../utils/dataProvider";

// load json test data from file
const jsonPath = "testdata/logindata.json";
const jsontestData = DataProvider.getTestDataFromJson(jsonPath);

jsontestData.forEach((data) => {
    test(`Login Test with JSON Data: ${data.testName} @datadriven`, async ({ page }) => {
        const config = new TestConfig();
        await page.goto(config.appUrl);

        const homePage = new HomePage(page);
        await homePage.clickMyAccount();
        await homePage.clickLogin();

        const loginPage = new LoginPage(page);
        await loginPage.login(data.email, data.password);

        if (data.expected === "success") {
            const myAccountPage = new MyAccountPage(page);
            const isLoggedIn = await myAccountPage.isMyAccountPageExists();
            expect(isLoggedIn).toBeTruthy();
        } else if (data.expected === "failure") {
            const errorMessage = await loginPage.getLoginErrorMessage();
            expect(errorMessage).toBe('Warning: No match for E-Mail Address and/or Password.');
        }
    });
});

//load csv test data from file
const csvPath = "testdata/logindata.csv";
const csvtestData = DataProvider.getTestDataFromCsv(csvPath);

csvtestData.forEach((data) => {
    test(`Login Test with CSV Data: ${data.testName} @datadriven`, async ({ page }) => {
        const config = new TestConfig();
        await page.goto(config.appUrl);

        const homePage = new HomePage(page);
        await homePage.clickMyAccount();
        await homePage.clickLogin();

        const loginPage = new LoginPage(page);
        await loginPage.login(data.email, data.password);

        if (data.expected === "success") {
            const myAccountPage = new MyAccountPage(page);
            const isLoggedIn = await myAccountPage.isMyAccountPageExists();
            expect(isLoggedIn).toBeTruthy();
        } else if (data.expected === "failure") {
            const errorMessage = await loginPage.getLoginErrorMessage();
            expect(errorMessage).toBe('Warning: No match for E-Mail Address and/or Password.');
        }
    });
});