import {expect, Locator, Page} from '@playwright/test';
export class CartPage {
    readonly page: Page;
    readonly subscribeEmailPlaceholder: Locator;
    readonly submitSubscriptionButton: Locator;
    readonly proceedButton: Locator;

    //locators
    constructor (page: Page){
        this.page = page;
        this.subscribeEmailPlaceholder = page.locator('#susbscribe_email');
        this.submitSubscriptionButton = page.locator('#subscribe');
        this.proceedButton = page.getByText('Proceed To Checkout');
    }

};