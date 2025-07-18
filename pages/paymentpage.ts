import {expect, Locator, Page} from '@playwright/test';
export class Paymentpage {
    readonly page: Page;
    readonly cardname: Locator;
    readonly cardnumber: Locator;
    readonly cvc: Locator;
    readonly expirymonth: Locator;
    readonly expiryYear: Locator;
    readonly submitPayment: Locator;

    //Locators
    constructor (page: Page){
        this.page = page;
        this.cardname = page.locator('[name="name_on_card"]');
        this.cardnumber = page.locator('[name="card_number"]');
        this.cvc = page.locator('[name="cvc"]');
        this.expirymonth = page.locator('[name="expiry_month"]');
        this.expiryYear = page.locator('[name="expiry_year"]');
        this.submitPayment = page.locator('#submit');
}};