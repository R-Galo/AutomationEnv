import dotenv from 'dotenv';
dotenv.config(); // Loading environment variables from .env

export const testConfig = {
    baseUrl: 'https://ecommerce-playground.lambdatest.io/index.php?route=account/login',
    firstName: process.env.TEST_FIRST_NAME!,
    lastName: process.env.TEST_LAST_NAME!,
    email: process.env.TEST_EMAIL!,
    password: process.env.TEST_PASSWORD!
};