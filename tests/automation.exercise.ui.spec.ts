import {test, expect} from '@playwright/test';
import { Homepage } from '../pages/homepage';
import { AccountCreatedPage } from '../pages/account.created.page';
import { Loginpage } from '../pages/login.page';
import { SignupPage } from '../pages/signup.page';
import { ContastUs } from '../pages/contact.us';
import path from 'path';
import { ProductsPage } from '../pages/products.page';
import { CartPage } from '../pages/cartpage';
import { Paymentpage } from '../pages/paymentpage';

//navigate to the page
test.beforeEach ("Navigating to the page", async ({page}) => {
await page.goto("https://automationexercise.com/", {waitUntil: 'domcontentloaded'});
await expect.soft(page).toHaveURL("https://automationexercise.com/");
});

//register user
test ('Register user', async ({page}) => {
    const homepage = new Homepage(page);
    const accountCreatedPage = new AccountCreatedPage(page);
    const loginpage = new Loginpage (page);
    const signuppage = new SignupPage (page);
    await homepage.signupLoginButton.click();
    await expect(page.locator('#form > div > div > div:nth-child(3) > div > h2')).toHaveText('New User Signup!');
    await loginpage.namePlaceholder.fill('Mima');
    await loginpage.emailForSignupPlaceholder.fill('mima.doe3@gmail.com');
    await loginpage.signupButton.click();
    await expect(page.getByText('Enter Account Information')).toBeVisible();
    await signuppage.mrsButton.check();
    await signuppage.passwordPlaceholder.fill('testpassword');
    await page.selectOption('#days', '15');
    await page.selectOption('#months', 'May');
    await page.selectOption('#years', '1994');
    await signuppage.newsletter.check();
    await signuppage.specialOffers.check();
    await signuppage.firstNamePlaceholder.fill('Mima');
    await signuppage.lastNamePlaceholder.fill('Doe');
    await signuppage.companyPlaceholder.fill('test company');
    await signuppage.addressPlaceholder.fill('put');
    await signuppage.address2Placeholder.fill('put2');
    await page.selectOption('#country', "Australia");
    await signuppage.statePlaceholder.fill('Srbija');
    await signuppage.cityPlaceholder.fill('Zrenjanin');
    await signuppage.zipcodePlaceholder.fill('23000');
    await signuppage.mobileNumberPlaceholder.fill('0612345678');
    await signuppage.createAccountButton.click();
    await expect(page.getByText('Account Created!')).toBeVisible();
    await accountCreatedPage.continueButton.click();
    await expect (page.getByText(' Logged in as ')).toBeVisible();
    await homepage.deleteAccountButton.click();
    await expect (page.getByText('Account Deleted!')).toBeVisible();
});

test ('Login user with correct email and password', async ({page}) => {
    const homepage = new Homepage(page);
    const loginpage = new Loginpage(page);
    await homepage.signupLoginButton.click();
    await expect(page.getByText('Login to your account')).toBeVisible(); 
    await loginpage.emailForLoginPlaceholder.fill('aladin@gmail.com');
    await loginpage.passwordPlaceholder.fill('lampa');
    await loginpage.loginButton.click();
    await expect(page.getByText('Logged in as Aladin')).toBeVisible();
    //await homepage.deleteAccountButton.click();
    //await expect (page.getByText('Account Deleted!')).toBeVisible();  //zakomentarisano da ne bi obrisao account svaki put
});

test ('Login user with incorrect email and password', async ({page}) => {
    const homepage = new Homepage(page);
    const loginpage = new Loginpage(page);
    await homepage.signupLoginButton.click();
    await expect(page.getByText('Login to your account')).toBeVisible(); 
    await loginpage.emailForLoginPlaceholder.fill('aladin22@gmail.com');
    await loginpage.passwordPlaceholder.fill('lampa22');
    await loginpage.loginButton.click();
    await expect(page.getByText('Your email or password is incorrect!')).toBeVisible();
});

test ('Logout user', async ({page}) => {
    const homepage = new Homepage(page);
    const loginpage = new Loginpage(page);
    await homepage.signupLoginButton.click();
    await expect(page.getByText('Login to your account')).toBeVisible(); 
    await loginpage.emailForLoginPlaceholder.fill('aladin@gmail.com');
    await loginpage.passwordPlaceholder.fill('lampa');
    await loginpage.loginButton.click();
    await expect(page.getByText('Logged in as Aladin')).toBeVisible();
    await loginpage.logoutButton.click();
    await expect(page).toHaveURL('https://automationexercise.com/login');
});

test ('Register user with existing email', async ({page}) => {
    const homepage = new Homepage(page);
    const loginpage = new Loginpage(page);
    await homepage.signupLoginButton.click();
    await expect(page.locator('#form > div > div > div:nth-child(3) > div > h2')).toHaveText('New User Signup!');
    await loginpage.namePlaceholder.fill('Aladin');
    await loginpage.emailForSignupPlaceholder.fill('aladin@gmail.com');
    await loginpage.signupButton.click();
    await expect(page.getByText('Email Address already exist!')).toBeVisible();
});

test ('Contact us form', async ({page}) => {
    const homepage = new Homepage(page);
    const contacpage = new ContastUs (page);
    await homepage.contuctUsButton.click();
    await expect(page.getByText('Get In Touch')).toBeVisible();
    await contacpage.namePlaceholder.fill('Aladin');
    await contacpage.emailPlaceholder.fill('aladin@gmail.com');
    await contacpage.subjectPlaceholder.fill('problem22');
    await contacpage.messagePlaceholder.fill('message22');
    const filePath = path.join(__dirname, 'test-data', 'DUMMY PDF.pdf');
    await contacpage.chooseFile.setInputFiles(filePath);
    page.on('dialog', async (dialog) => {
    console.log('DIALOG TEXT:', dialog.message());
    await dialog.accept(); });
    await contacpage.submitButton.click();
    await page.waitForLoadState('networkidle');
    await expect(page.locator('#contact-page > div.row > div.col-sm-8 > div > div.status.alert.alert-success')).toBeVisible();
    await contacpage.homeButton.click();
    await expect(page).toHaveURL('https://automationexercise.com');
});

test ('Verify test cases page', async ({page}) => {
    const homepage = new Homepage(page);
    await homepage.testCasesButton.click();
    await expect(page).toHaveURL('https://automationexercise.com/test_cases');
});

test ('Verify all products and product detail page', async ({page}) => {
    const homepage = new Homepage(page);
    const products = new ProductsPage (page);
    await homepage.productsButton.click();
    await expect(page).toHaveURL('https://automationexercise.com/products');
    await expect(page.getByText('All Products')).toBeVisible();
    await products.viewProduct1.click();
    await expect(page).toHaveURL('https://automationexercise.com/product_details/1');
    await expect(page.getByText('Blue Top')).toBeVisible();
    await expect(page.getByText('Category: Women > Tops')).toBeVisible();
    await expect(page.getByText('Rs. 500')).toBeVisible();
    await expect(page.getByText('Availability:')).toBeVisible();
    await expect(page.getByText('Condition:')).toBeVisible();
    await expect(page.getByText('Brand:')).toBeVisible();
});

test ('Search product', async ({page}) => {
    const homepage = new Homepage(page);
    const products = new ProductsPage (page);
    await homepage.productsButton.click();
    await expect(page).toHaveURL('https://automationexercise.com/products');
    await expect(page.getByText('All Products')).toBeVisible();
    await products.searchPlaceholder.fill('Winter Top');
    await products.searchButton.click();
    await expect(page.getByText('Searched Products')).toBeVisible();
});

test ('Verify subscription in homepage', async ({page}) => {
    const homepage = new Homepage(page);
    await homepage.subscriptionPart.scrollIntoViewIfNeeded();
    await homepage.subscribeEmailPlaceholder.fill('aladin@gmail.com');
    await homepage.submitSubscriptionButton.click();
    await expect(page.locator('#success-subscribe')).toHaveText('You have been successfully subscribed!')
});

test ('Verify subscription in cart page', async ({page}) => {
    const homepage = new Homepage(page);
    const cartpage = new CartPage(page);
    await homepage.cartButton.click();
    await expect(page.getByText('Subscription')).toBeVisible();
    await cartpage.subscribeEmailPlaceholder.fill('aladin@gmail.com');
    await cartpage.submitSubscriptionButton.click();
    await expect(page.locator('#success-subscribe')).toHaveText('You have been successfully subscribed!');
});

test ('Add product in cart', async ({page}) => {
    const homepage = new Homepage(page);
    const productspage = new ProductsPage(page);
    await homepage.productsButton.click();
    await productspage.fistProduct.hover();
    await page.locator('.overlay-content [data-product-id="1"]').click();
    await expect(page.locator('#cartModal > div > div > div.modal-body > p:nth-child(2) > a')).toBeVisible();
});

test ('Verify product quantity in cart', async ({page}) => {
    const homepage = new Homepage(page);
    const productspage = new ProductsPage (page);
    await homepage.productsButton.click();
    await productspage.viewProduct1.click();
    await page.locator('#quantity').fill('4');
    await page.getByText('Add to cart').click();
    await page.getByText('View Cart').click();
    await expect(page.locator('#product-1 .cart_quantity button')).toHaveText('4');
});

test ('Place order: Register while checkout', async ({page}) => {
    const homepage = new Homepage(page);
    const cartpage = new CartPage(page);
    const productspage = new ProductsPage(page);
    const loginpage = new Loginpage(page);
    const signuppage = new SignupPage(page);
    const accountCreatedPage = new AccountCreatedPage(page);
    const paymentpage = new Paymentpage(page);
    await homepage.productsButton.click();
    await productspage.fistProduct.hover();
    await page.locator('.overlay-content [data-product-id="1"]').click();
    await page.getByText('View Cart').click();
    await expect(page).toHaveURL('https://automationexercise.com/view_cart');
    await cartpage.proceedButton.click();
    await page. getByRole('link',{name:'Register / Login'}).click();
    await loginpage.namePlaceholder.fill('xxl6');
    await loginpage.emailForSignupPlaceholder.fill('xxx26@gmail.com');
    await loginpage.signupButton.click();
    await signuppage.mrsButton.check();
    await signuppage.passwordPlaceholder.fill('testpassword');
    await page.selectOption('#days', '15');
    await page.selectOption('#months', 'May');
    await page.selectOption('#years', '1994');
    await signuppage.newsletter.check();
    await signuppage.specialOffers.check();
    await signuppage.firstNamePlaceholder.fill('Mima2');
    await signuppage.lastNamePlaceholder.fill('Doe2');
    await signuppage.companyPlaceholder.fill('test company2');
    await signuppage.addressPlaceholder.fill('put2');
    await signuppage.address2Placeholder.fill('put23');
    await page.selectOption('#country', "Australia");
    await signuppage.statePlaceholder.fill('Srbija');
    await signuppage.cityPlaceholder.fill('Zrenjanin');
    await signuppage.zipcodePlaceholder.fill('23000');
    await signuppage.mobileNumberPlaceholder.fill('0612345678');
    await signuppage.createAccountButton.click();
    await expect(page.getByText('Account Created!')).toBeVisible();
    await accountCreatedPage.continueButton.click();
    await expect (page.getByText(' Logged in as ')).toBeVisible();
    await homepage.cartButton.click();
    await cartpage.proceedButton.click();
    await expect(page.getByText('Your delivery address')).toBeVisible();
    await page.locator('[name="message"]').fill('hfwueifhsjhkfb');
    await page.getByText('Place Order').click();
    await paymentpage.cardname.fill('jhsadgfr');
    await paymentpage.cardnumber.fill('4536373');
    await paymentpage.cvc.fill('322');
    await paymentpage.expirymonth.fill('06');
    await paymentpage.expiryYear.fill('29');
    await paymentpage.submitPayment.click();
    await page.getByText('Your order has been placed successfully!').isVisible();
    await homepage.deleteAccountButton.click();
    await expect (page.getByText('Account Deleted!')).toBeVisible();
});

test ('Place order: Register before checkout', async ({page}) => {
    const homepage = new Homepage(page);
    const cartpage = new CartPage(page);
    const productspage = new ProductsPage(page);
    const loginpage = new Loginpage(page);
    const signuppage = new SignupPage(page);
    const accountCreatedPage = new AccountCreatedPage(page);
    const paymentpage = new Paymentpage(page);
    await homepage.signupLoginButton.click();
    await expect(page.locator('#form > div > div > div:nth-child(3) > div > h2')).toHaveText('New User Signup!');
    await loginpage.namePlaceholder.fill('Mima53');
    await loginpage.emailForSignupPlaceholder.fill('mima.doe563@gmail.com');
    await loginpage.signupButton.click();
    await expect(page.getByText('Enter Account Information')).toBeVisible();
    await signuppage.mrsButton.check();
    await signuppage.passwordPlaceholder.fill('testpassword');
    await page.selectOption('#days', '15');
    await page.selectOption('#months', 'May');
    await page.selectOption('#years', '1994');
    await signuppage.newsletter.check();
    await signuppage.specialOffers.check();
    await signuppage.firstNamePlaceholder.fill('Mima');
    await signuppage.lastNamePlaceholder.fill('Doe');
    await signuppage.companyPlaceholder.fill('test company');
    await signuppage.addressPlaceholder.fill('put');
    await signuppage.address2Placeholder.fill('put2');
    await page.selectOption('#country', "Australia");
    await signuppage.statePlaceholder.fill('Srbija');
    await signuppage.cityPlaceholder.fill('Zrenjanin');
    await signuppage.zipcodePlaceholder.fill('23000');
    await signuppage.mobileNumberPlaceholder.fill('0612345678');
    await signuppage.createAccountButton.click();
    await expect(page.getByText('Account Created!')).toBeVisible();
    await accountCreatedPage.continueButton.click();
    await expect (page.getByText(' Logged in as ')).toBeVisible();
    await productspage.fistProduct.hover();
    await page.locator('.overlay-content [data-product-id="1"]').click();
    await page.getByText('View Cart').click();
    await expect(page).toHaveURL('https://automationexercise.com/view_cart');
    await cartpage.proceedButton.click();
    await page.locator('[name="message"]').fill('hfwueifhsjhkfb');
    await page.getByText('Place Order').click();
    await paymentpage.cardname.fill('jhsadgfr');
    await paymentpage.cardnumber.fill('4536373');
    await paymentpage.cvc.fill('322');
    await paymentpage.expirymonth.fill('06');
    await paymentpage.expiryYear.fill('29');
    await paymentpage.submitPayment.click();
    await page.getByText('Your order has been placed successfully!').isVisible();
    await homepage.deleteAccountButton.click();
    await expect (page.getByText('Account Deleted!')).toBeVisible();
});

test ('Place order: Login before checkout', async ({page}) => {
    const homepage = new Homepage(page);
    const loginpage = new Loginpage(page);
    const productspage = new ProductsPage(page);
    const paymentpage = new Paymentpage(page);
    const cartpage = new CartPage(page);
    await homepage.signupLoginButton.click();
    await expect(page.getByText('Login to your account')).toBeVisible(); 
    await loginpage.emailForLoginPlaceholder.fill('aladin@gmail.com');
    await loginpage.passwordPlaceholder.fill('lampa');
    await loginpage.loginButton.click();
    await expect(page.getByText('Logged in as Aladin')).toBeVisible();
    await productspage.fistProduct.hover();
    await page.locator('.overlay-content [data-product-id="1"]').click();
    await page.getByText('View Cart').click();
    await expect(page).toHaveURL('https://automationexercise.com/view_cart');
    await cartpage.proceedButton.click();
    await page.locator('[name="message"]').fill('hfwueifhsjhkfb');
    await page.getByText('Place Order').click();
    await paymentpage.cardname.fill('jhsadgfr');
    await paymentpage.cardnumber.fill('4536373');
    await paymentpage.cvc.fill('322');
    await paymentpage.expirymonth.fill('06');
    await paymentpage.expiryYear.fill('29');
    await paymentpage.submitPayment.click();
    await page.getByText('Your order has been placed successfully!').isVisible();
    await homepage.deleteAccountButton.click();
    await expect (page.getByText('Account Deleted!')).toBeVisible(); 
});
