import test, { expect } from "@playwright/test";
import { TestConfig } from "../test.config";
import { HomePage } from "../pages/HomePage";
import { SearchResultPage } from "../pages/SearchResultPage";

let config:TestConfig;
let homePage:HomePage;
let searchResultPage:SearchResultPage;

test.beforeEach(async({page}) =>{
    config = new TestConfig();
    page.goto(config.appUrl);
    homePage = new HomePage(page);
    searchResultPage = new SearchResultPage(page);
})


test.afterEach(async({page}) =>{
    await page.waitForTimeout(3000);
    page.close();
})

test('Product search test @master @regression', async() =>{
    const productName = config.productName;
    homePage.enterProductName(productName);
    homePage.clickSearchBtn();

    //veriify if search result page is displayed
    expect(await searchResultPage.isSearchResultPageExist()).toBeTruthy();

    //validate if search product appears in results
    const isProductFound = searchResultPage.isProductExist(productName);
    expect(isProductFound).toBeTruthy();

});