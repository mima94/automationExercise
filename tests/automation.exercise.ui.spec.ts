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
    await loginpage.namePlaceholder.fill('Mima698');
    await loginpage.emailForSignupPlaceholder.fill('mima.doe66698@gmail.com');
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
    await contacpage.subjectPlaceholder.fill('problem225');
    await contacpage.messagePlaceholder.fill('message225');
    const filePath = path.join(__dirname, 'test-data', 'DUMMY PDF.pdf');
    await contacpage.chooseFile.setInputFiles(filePath);
    page.on('dialog', async (dialog) => {
    console.log('DIALOG TEXT:', dialog.message());
    await dialog.accept(); });
    await contacpage.submitButton.click();
    //await expect(page.getByText('Success! Your details have been submitted successfully.')).toBeVisible();
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

test ('Remove products from cart', async ({page}) => {
    const homepage = new Homepage(page);
    const productspage = new ProductsPage(page);
    await homepage.productsButton.click();
    await productspage.fistProduct.hover();
    await page.locator('.overlay-content [data-product-id="1"]').click();
    await page.getByText('View Cart').click();
    await expect(page).toHaveURL('https://automationexercise.com/view_cart');
    await page.locator('[class="cart_quantity_delete"]').click();
    await page.getByText('Cart is empty!').isVisible();
});

test ('View category products', async ({page}) => {
    const homepage = new Homepage(page);
    await homepage.categoryHeading.isVisible();
    await homepage.categorySection.isVisible();
    await page.locator('[href="#Women"]').click();
    await page.getByRole('link',{name:'Dress'}).click();
    await expect(page).toHaveURL('https://automationexercise.com/category_products/1');
    await expect(page.getByText('Women - Dress Products')).toBeVisible();
    await page.locator('[href="#Men"]').click();
    await page.getByRole('link',{name:'Tshirts'}).click();
    await expect(page).toHaveURL('https://automationexercise.com/category_products/3');
});

test ('view & cart brand products', async ({page}) => {
    const homepage = new Homepage(page);
    await homepage.productsButton.click();
    await expect(homepage.brandsHeading).toBeVisible();
    await homepage.brandPolo.click();
    await expect(page.getByText('Brand - Polo Products')).toBeVisible();
    await homepage.brandHM.click();
    await expect(page.getByText('Brand - H&M Products')).toBeVisible();
});

test ('search products and verify cart after login', async ({page}) => {
    const homepage = new Homepage(page);
    const products = new ProductsPage(page);
    const loginpage = new Loginpage(page);
    await homepage.productsButton.click();
    await expect(page).toHaveURL('https://automationexercise.com/products');
    await expect(page.getByText('All Products')).toBeVisible();
    await products.searchPlaceholder.fill('Winter Top');
    await products.searchButton.click();
    await expect(page.getByText('Searched Products')).toBeVisible();
    await expect(page.getByText('Winter Top').first()).toBeVisible();
    await page.getByText('Add to cart').first().click();
    await page.getByText('View Cart').click();
    await expect(page.getByText('Winter Top')).toBeVisible();
    await homepage.signupLoginButton.click();
    await loginpage.emailForLoginPlaceholder.fill('aladinprimer@gmail.com');
    await loginpage.passwordPlaceholder.fill('lampa');
    await loginpage.loginButton.click();
    await expect(page.getByText('Logged in as Aladin')).toBeVisible();
    await homepage.cartButton.click();
    await expect(page.getByText('Winter Top')).toBeVisible();
});

test ('add review on product', async ({page}) => {
    const homepage = new Homepage(page);
    const products = new ProductsPage(page);
    await homepage.productsButton.click();
    await expect(page).toHaveURL('https://automationexercise.com/products');
    await expect(page.getByText('All Products')).toBeVisible();
    await products.viewProduct1.click();
    await page.getByText('Write Your Review').isVisible();
    await page.locator('#name').fill('Aladin');
    await page.locator('#email').fill('aladin@gmail.com');
    await page.locator('[placeholder="Add Review Here!"]').fill('uyrghuiwyerghwoiueyhweiurghiw');
    await page.locator('[id="button-review"]').click();
    await page.getByText('Thank you for your review.').isVisible();
});

test ('add to cart from recommended items', async ({page}) => {
    const homepage = new Homepage(page);
    await homepage.recomenderItems.scrollIntoViewIfNeeded();
    await page.locator('#recommended-item-carousel .carousel-inner .item .col-sm-4 .add-to-cart').first().click();
    await page.getByText('View Cart').click();
    await expect(page.locator('#product-1')).toBeVisible();
    await expect(page.locator('.cart_description')).toContainText('Women > Tops');
});

test ('verify address details in checkout page', async ({page}) => {
    const homepage = new Homepage(page);
    const loginpage = new Loginpage(page);
    const signuppage = new SignupPage(page);
    const accountCreatedPage = new AccountCreatedPage(page);
    const productspage = new ProductsPage(page);
    const cartpage = new CartPage(page);
    await homepage.signupLoginButton.click();
    await expect(page.locator('#form > div > div > div:nth-child(3) > div > h2')).toHaveText('New User Signup!');
    await loginpage.namePlaceholder.fill('Mima335');
    await loginpage.emailForSignupPlaceholder.fill('mima.doe335@gmail.com');
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
    await homepage.productsButton.click();
    await productspage.fistProduct.hover();
    await page.locator('.overlay-content [data-product-id="1"]').click();
    await expect(page.locator('#cartModal > div > div > div.modal-body > p:nth-child(2) > a')).toBeVisible();
    await page.getByText('View Cart').click();
    await expect(page).toHaveURL('https://automationexercise.com/view_cart');
    await cartpage.proceedButton.click();
    await expect(page.locator('#address_delivery')).toContainText('Mima');
    await expect(page.locator('#address_delivery')).toContainText('Doe');
    await expect(page.locator('#address_delivery')).toContainText('test company');
    await expect(page.locator('#address_delivery')).toContainText('put');
    await expect(page.locator('#address_delivery')).toContainText('put2');
    await expect(page.locator('#address_delivery')).toContainText('Srbija');
    await expect(page.locator('#address_delivery')).toContainText('Zrenjanin');
    await expect(page.locator('#address_delivery')).toContainText('23000');
    await expect(page.locator('#address_delivery')).toContainText('0612345678');
    await expect(page.locator('#address_invoice')).toContainText('Mima');
    await expect(page.locator('#address_invoice')).toContainText('Doe');
    await expect(page.locator('#address_invoice')).toContainText('test company');
    await expect(page.locator('#address_invoice')).toContainText('put');
    await expect(page.locator('#address_invoice')).toContainText('put2');
    await expect(page.locator('#address_invoice')).toContainText('Srbija');
    await expect(page.locator('#address_invoice')).toContainText('Zrenjanin');
    await expect(page.locator('#address_invoice')).toContainText('23000');
    await expect(page.locator('#address_invoice')).toContainText('0612345678');
    await homepage.deleteAccountButton.click();
    await expect (page.getByText('Account Deleted!')).toBeVisible();
});


test ('Download invoice after purchase order', async ({page}) => {
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
    await loginpage.namePlaceholder.fill('xxl5');
    await loginpage.emailForSignupPlaceholder.fill('xxx256@gmail.com');
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
    await expect(page.locator('#address_delivery')).toContainText('Mima');
    await expect(page.locator('#address_delivery')).toContainText('Doe');
    await expect(page.locator('#address_delivery')).toContainText('test company');
    await expect(page.locator('#address_delivery')).toContainText('put');
    await expect(page.locator('#address_delivery')).toContainText('put2');
    await expect(page.locator('#address_delivery')).toContainText('Srbija');
    await expect(page.locator('#address_delivery')).toContainText('Zrenjanin');
    await expect(page.locator('#address_delivery')).toContainText('23000');
    await expect(page.locator('#address_delivery')).toContainText('0612345678');
    await expect(page.locator('#address_invoice')).toContainText('Mima');
    await expect(page.locator('#address_invoice')).toContainText('Doe');
    await expect(page.locator('#address_invoice')).toContainText('test company');
    await expect(page.locator('#address_invoice')).toContainText('put');
    await expect(page.locator('#address_invoice')).toContainText('put2');
    await expect(page.locator('#address_invoice')).toContainText('Srbija');
    await expect(page.locator('#address_invoice')).toContainText('Zrenjanin');
    await expect(page.locator('#address_invoice')).toContainText('23000');
    await expect(page.locator('#address_invoice')).toContainText('0612345678');
    await page.locator('[name="message"]').fill('hfwueifhsjhkfb');
    await page.getByText('Place Order').click();
    await paymentpage.cardname.fill('jhsadgfr');
    await paymentpage.cardnumber.fill('4536373');
    await paymentpage.cvc.fill('322');
    await paymentpage.expirymonth.fill('06');
    await paymentpage.expiryYear.fill('29');
    await paymentpage.submitPayment.click();
    await page.getByText('Your order has been placed successfully!').isVisible();
    await page.getByText('Download Invoice').click();
    await page.getByText('Continue').click();
    await homepage.deleteAccountButton.click();
    await expect (page.getByText('Account Deleted!')).toBeVisible();
});

test ('verify scroll up using arrow button and scroll down functionality', async ({page}) => {
    const homepage = new Homepage(page);
    await page.locator('footer').scrollIntoViewIfNeeded();
    await expect(page.getByText('Subscription')).toBeVisible();
    await page.locator('#scrollUp').click();
    await expect(page.getByRole('heading',{name:'Full-Fledged practice website'})).toBeVisible();
});

test ('verify scroll up without arrow button and scroll down functionality', async ({page}) => {
    const homepage = new Homepage(page);
    await page.locator('footer').scrollIntoViewIfNeeded();
    await expect(page.getByText('Subscription')).toBeVisible();
    await page.evaluate(() => window.scrollTo(0, 0));
    await expect(page.getByRole('heading',{name:'Full-Fledged practice website'})).toBeVisible();
});