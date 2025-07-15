import {expect, Locator, Page} from '@playwright/test';
export class Loginpage {
    readonly page: Page;
    readonly namePlaceholder: Locator;
    readonly emailForSignupPlaceholder: Locator;
    readonly signupButton: Locator;
    readonly emailForLoginPlaceholder: Locator;
    readonly passwordPlaceholder: Locator;
    readonly loginButton: Locator;
    readonly logoutButton: Locator;

    //Locators
    constructor (page: Page){
        this.page = page;
        this.namePlaceholder = page.getByPlaceholder('Name');
        this.emailForSignupPlaceholder = page.locator('#form > div > div > div:nth-child(3) > div > form > input[type=email]:nth-child(3)');
        this.signupButton = page.getByRole('button',{name:'Signup'});
        this.emailForLoginPlaceholder = page.locator('#form > div > div > div.col-sm-4.col-sm-offset-1 > div > form > input[type=email]:nth-child(2)');
        this.passwordPlaceholder = page.getByPlaceholder('Password');
        this.loginButton = page.getByRole('button',{name:'Login'});
        this.logoutButton = page.getByText(' Logout');
    }

};