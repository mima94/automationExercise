import {expect, Locator, Page} from '@playwright/test';
export class ProductsPage {
    readonly page: Page;
    readonly viewProduct1: Locator;
    readonly searchPlaceholder: Locator;
    readonly searchButton: Locator;
    readonly fistProduct: Locator;


//Locators
constructor (page: Page){
    this.page = page;
    this.viewProduct1 = page.locator('body > section:nth-child(3) > div > div > div.col-sm-9.padding-right > div > div:nth-child(3) > div > div.choose > ul > li > a');
    this.searchPlaceholder = page.locator('#search_product');
    this.searchButton = page.locator('#submit_search');
    this.fistProduct = page.locator('.product-image-wrapper').first();

}};