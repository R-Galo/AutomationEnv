import { test, expect } from '@playwright/test';
import { testConfig } from '../config/config'; // Importing user credentials and base URL from the config file
import { navigateTo, logTestStatus } from '../utils/helper';

// Use a describe block to group related tests
test.describe('Mock Automation User Flows (BBT)', () => {

    // This hook runs before each test in this describe block, ensuring we start from a clean state
    test.beforeEach(async ({ page }) => {
        await navigateTo(page, testConfig.baseUrl); //ensure we are on the login page
        await expect(page.locator('#column-right a[href*="login"]')).toBeVisible();
    });

    // Test Case 1: Verify The Page Title
    test('TC001 - Should verify the page title is correct', async ({ page }) => {
        try {
            await expect(page).toHaveTitle(/Account Login/);
            logTestStatus(true);
        } catch (error) {
            logTestStatus(false);
            throw error;
        }
    });

    // Test Case 2: Verify If Login Page Elements are Visible
    test('TC002 - Should verify if login page elements are visible', async ({ page }) => {
        try {
            await expect(page.locator('#input-email')).toBeVisible(); // Check if the email input field is visible
            await expect(page.locator('#input-password')).toBeVisible(); //
            await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
            await expect(page.getByRole('link', { name: 'Forgotten Password', exact: true })).toBeVisible(); // Check if the "Forgotten Password" link is visible
            logTestStatus(true);
        } catch (error) {
            logTestStatus(false);
            throw error;
        }
    });

    // Test Case 3: Successful Login with Valid Credentials
    test('TC003 - Should successfully log in with valid credentials', async ({ page }) => {
        try {
            await page.locator('#input-email').fill(testConfig.email);
            await page.locator('#input-password').fill(testConfig.password);
            await page.getByRole('button', { name: 'Login' }).click();
            await expect(page).toHaveURL(/account\/account/); // Expect to be redirected to the account page after login
            await expect(page.getByRole('heading', { name: 'My Account' })).toBeVisible(); // Verify the account page is displayed
            logTestStatus(true);
        } catch (error) {
            logTestStatus(false);
            throw error;
        }
    });

    // Test Case 4: Login with Invalid Password
    test('TC004 - Should show error message for invalid password', async ({ page }) => {
         try {
            await page.locator('#input-email').fill(testConfig.email);
            await page.locator('#input-password').fill('invalidpassword123');
            await page.getByRole('button', { name: 'Login' }).click();
            await expect(page.locator('.alert-danger')).toBeVisible({ timeout: 5000 }); // Expect an error message to be visible
            logTestStatus(true);
        } catch (error) {
            logTestStatus(false);
            throw error;
        }
    });

    // Test Case 5: Login with Invalid Email
    test('TC005 - Should show error message for invalid email', async ({ page }) => {
        try {
            await page.locator('#input-email').fill('nonexistent1@example.com');
            await page.locator('#input-password').fill('anypassword');
            await page.getByRole('button', { name: 'Login' }).click();
            // await expect(page.getByText('Warning: No match for E-Mail Address and/or Password.')).toBeVisible(); // Expect an error message indicating no match for email/password
            await expect(page.locator('.alert-danger')).toContainText('Warning: No match for E-Mail Address and/or Password.'); // Expect an error message indicating no match for email/password
            logTestStatus(true);
        } catch (error) {
            logTestStatus(false);
            throw error;
        }
    });

    // Test Case 6: Navigate to Registration Page
    test('TC006 - Should navigate to the registration page', async ({ page }) => {
        try {
            await page.getByRole('link', { name: 'Continue' }).click();
            await expect(page).toHaveURL(/account\/register/);
            await expect(page.locator('h1:has-text("Register Account")')).toBeVisible();
            logTestStatus(true);
        } catch (error) {
            logTestStatus(false);
            throw error;
        }
    });

    // Test Case 7: Attempt Registration with Missing Required Fields (example: First Name)
    test('TC007 - Should show error for missing first name during registration', async ({ page }) => {
        try {
            await page.getByRole('link', { name: 'Continue' }).click();
            await page.locator('#input-lastname').fill(''); // Intentionally leaving First Name empty
            // Fill other required fields with dummy data
            await page.locator('#input-email').fill(`testuser${Date.now()}@example.com`);
            await page.locator('#input-telephone').fill('1234567890');
            await page.locator('#input-password').fill('password123');
            await page.locator('#input-confirm').fill('password123');
            await page.waitForTimeout(500); // Wait for 500ms to ensure the page is ready
            await page.getByText('I have read and agree to the').click(); // Click the checkbox to agree to terms
            // await page.getByRole('checkbox', { name: 'I have read and agree to the Privacy Policy'}).click(); // updated from .check() to .click()
            await page.getByRole('button', { name: 'Continue' }).click();
            await expect(page.locator('.text-danger').filter({ hasText: 'First Name must be between 1 and 32 characters!' })).toBeVisible();
            logTestStatus(true);
        } catch (error) {
            logTestStatus(false);
            throw error;
        }
    });

    // Test Case 8: Search for a product (assuming we are already logged in or on a product page)
    // Requirements: User must be logged in to search for products, so this test assumes the user is logged in.
    // Note: The search functionality is typically available on the home page, so we will navigate there.
    // This test assumes the user is logged in, as the previous tests handle login.
    test('TC008 - Should successfully search for a product', async ({ page }) => {
        try {
            await page.goto('https://ecommerce-playground.lambdatest.io/index.php?route=common/home'); // Navigate to the home page
            await page.getByRole('textbox', { name: 'Search For Products' }).fill('nikon') // Fill the search input with 'nikon'
            await page.getByRole('button', { name: 'Search' }).click();
            await expect(page).toHaveURL(/search=nikon/); // Expect the URL to contain the search query
            await expect(page.locator('.product-layout')).toHaveCount(2); // Expect to find at least one product matching the search query
            logTestStatus(true);
        } catch (error) {
            logTestStatus(false);
            throw error;
        }
    });

    // Test Case 9: Add a product to the cart (requires navigating to product page first)
    test('TC009 - Should add a product to the cart', async ({ page }) => {
        try {
            await page.goto('https://ecommerce-playground.lambdatest.io/index.php?route=product/product&product_id=31'); // Navigate any product page
            await page.waitForTimeout(500); // Wait for 500ms to ensure the page is fully loaded
            await page.locator('#mz-product-grid-image-31-212469').hover(); // Hover over the product image to reveal the items sub menu
            await page.getByRole('button', { name: '' }).first().click(); // Click the "Add to Cart" button
            await expect(page.locator('.alert-success')).toContainText('Success: You have added a product to your shopping cart!'); // Expect a success message after adding the product to the cart
            logTestStatus(true);
        } catch (error) {
            logTestStatus(false);
            throw error;
        }
    });

    // Test Case 10: Navigate to Contact Us page
    test('TC010 - Should navigate to the Specials page', async ({ page }) => {
        try {
            await page.getByRole('link', { name: 'Special Hot', exact: true }).click(); // Click on the Specials link in the navigation bar
            await expect(page).toHaveURL(/information\/special/); // Expect to be redirected to the Contact Us page
            await expect(page.locator('h1:has-text("Special Offers")')).toBeVisible(); // Verify the Contact Us page is displayed
            logTestStatus(true);
        } catch (error) {
            logTestStatus(false);
            throw error;
        }
    });

});