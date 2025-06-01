import dotenv from 'dotenv';
dotenv.config(); // Loading environment variables from .env you should create .env in your project to add sensitive information and preventing a breach of security

export const testConfig = {
    baseUrl: 'https://ecommerce-playground.lambdatest.io/index.php?route=account/login',
    firstName: process.env.TEST_FIRST_NAME!, //This information is pulled from .env doc you can set your own information here *NOT RECOMMENDED: unless you add this doc to .gitignore*, or create a .env doc to add sensitive information there and import the data from here 
    lastName: process.env.TEST_LAST_NAME!,
    email: process.env.TEST_EMAIL!,
    password: process.env.TEST_PASSWORD!
};
