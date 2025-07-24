import {expect, Locator, Page} from '@playwright/test';
export class ContastUs {
    readonly page: Page;
    readonly namePlaceholder: Locator;
    readonly emailPlaceholder: Locator;
    readonly subjectPlaceholder: Locator;
    readonly messagePlaceholder: Locator;
    readonly chooseFile: Locator;
    readonly submitButton: Locator;
    readonly homeButton: Locator;


//Locators
constructor (page: Page){
    this.page = page;
    this.namePlaceholder = page.getByPlaceholder('Name');
    this.emailPlaceholder = page.locator('#contact-us-form > div:nth-child(3) > input');
    this.subjectPlaceholder = page.getByPlaceholder('Subject');
    this.messagePlaceholder = page.getByPlaceholder('Your Message Here');
    this.chooseFile = page.locator('[name="upload_file"]');
    this.submitButton = page.locator('[name="submit"]');
    this.homeButton = page.getByText(' Home');

}};