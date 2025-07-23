import {expect, Locator, Page} from '@playwright/test';
export class Homepage {
    readonly page: Page;
    readonly signupLoginButton: Locator;
    readonly deleteAccountButton: Locator;
    readonly contuctUsButton: Locator;
    readonly testCasesButton: Locator;
    readonly productsButton: Locator;
    readonly subscriptionPart: Locator;
    readonly subscribeEmailPlaceholder: Locator;
    readonly submitSubscriptionButton: Locator;
    readonly cartButton: Locator;
    readonly categoryHeading: Locator;
    readonly categorySection: Locator;
    readonly brandsHeading: Locator;
    readonly brandPolo: Locator;
    readonly brandHM: Locator;
    readonly recomenderItems: Locator;

//Locators
constructor (page: Page){
    this.page = page;
    this.signupLoginButton = page.locator('#header > div > div > div > div.col-sm-8 > div > ul > li:nth-child(4) > a');
    this.deleteAccountButton = page.getByText(' Delete Account');
    this.contuctUsButton = page.getByText(' Contact us');
    this.testCasesButton = page.getByRole('button',{name:'Test Cases'});
    this.productsButton = page.getByText(' Products');
    this.subscriptionPart = page.getByText('Subscription');
    this.subscribeEmailPlaceholder = page.locator('#susbscribe_email');
    this.submitSubscriptionButton = page.locator('#subscribe');
    this.cartButton = page.getByRole('link',{ name:' Cart'});
    this.categoryHeading = page.getByText('Category');
    this.categorySection = page.locator('[class="panel-group category-products"]');
    this.brandsHeading = page.getByText('Brands');
    this.brandPolo = page.locator('[href="/brand_products/Polo"]');
    this.brandHM = page.locator('[href="/brand_products/H&M"]');
    this.recomenderItems = page.getByText('recommended items');
}};