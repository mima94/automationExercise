import {expect, Locator, Page} from '@playwright/test';
export class SignupPage {
    readonly page: Page;
    readonly mrsButton: Locator;
    readonly passwordPlaceholder: Locator;
    readonly newsletter: Locator;
    readonly specialOffers: Locator;
    readonly firstNamePlaceholder: Locator;
    readonly lastNamePlaceholder: Locator;
    readonly companyPlaceholder: Locator;
    readonly addressPlaceholder: Locator;
    readonly address2Placeholder: Locator;
    readonly statePlaceholder: Locator;
    readonly cityPlaceholder: Locator;
    readonly zipcodePlaceholder: Locator;
    readonly mobileNumberPlaceholder: Locator;
    readonly createAccountButton: Locator;

    //Locators
    constructor (page: Page){
        this.page = page;
        this.mrsButton = page.locator('#id_gender2');
        this.passwordPlaceholder = page.locator('#password');
        this.newsletter = page.getByText('Sign up for our newsletter!');
        this.specialOffers = page.getByText('Receive special offers from our partners!');
        this.firstNamePlaceholder = page.locator('#first_name');
        this.lastNamePlaceholder = page.locator('#last_name');
        this.companyPlaceholder = page.locator('#company');
        this.addressPlaceholder = page.locator('#address1');
        this.address2Placeholder = page.locator('#address2');
        this.statePlaceholder = page.locator('#state');
        this.cityPlaceholder = page.locator('#city');
        this.zipcodePlaceholder = page.locator('#zipcode');
        this.mobileNumberPlaceholder = page.locator('#mobile_number');
        this.createAccountButton = page.getByText('Create Account');   
    }

};