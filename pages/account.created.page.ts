import {expect, Locator, Page} from '@playwright/test';
export class AccountCreatedPage {
    readonly page: Page;
    readonly continueButton: Locator;

    //locators
    constructor (page: Page){
        this.page = page;
        this.continueButton = page.getByText('Continue');
    }

};
