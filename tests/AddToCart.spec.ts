import test, { expect } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { TestConfig } from "../test.config";
import { SearchResultPage } from "../pages/SearchResultPage";
import { ProductPage } from "../pages/ProductPage";

let homePage: HomePage;
let config: TestConfig;
let searchResultPage:SearchResultPage;
let productPage:ProductPage;

test.beforeEach(async ({ page }) => {
  config = new TestConfig();
  //navigate to url
  await page.goto(config.appUrl);
  homePage = new HomePage(page);
  searchResultPage = new SearchResultPage(page);
  productPage = new ProductPage(page);
});

test.afterEach(async ({ page }) => {
  await page.waitForTimeout(3000);
  await page.close();
});

test('Add product to cart test @master @regression', async({page}) => {
    const productName = config.productName;
    await homePage.enterProductName(productName);
    await homePage.clickSearchBtn();

     expect(await searchResultPage.isSearchResultPageExist()).toBeTruthy();
        //validate if search product appears in results
    const isProductFound = searchResultPage.isProductExist(productName);
    expect(isProductFound).toBeTruthy();

    if(await searchResultPage.isProductExist(productName)){
        await searchResultPage.selectProduct(productName);
        await productPage.setQuantity(config.productQuantity);
        await productPage.addToCart();

        expect(await productPage.isConfirmationMessageVisible()).toBeTruthy();
    }

});