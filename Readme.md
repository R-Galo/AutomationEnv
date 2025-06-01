# Playwright E-commerce UI Automation Demo

## Overview
This project demonstrates **automated UI testing** for an e-commerce website using **Playwright and TypeScript**. The tests follow a **Black Box testing** approach, ensuring the application behaves correctly from a user’s perspective without inspecting its internal code structure.

By simulating real user interactions, this automation validates critical user flows, such as:
- **Login and authentication** (valid & invalid attempts)
- **Product search functionality**
- **Adding items to the shopping cart**
- **Navigating pages like "Contact Us" and "Registration"**

## Technologies Used
- **Playwright** – Modern UI automation framework supporting cross-browser testing.
- **TypeScript** – Enhances code reliability with static typing.
- **Node.js** – Executes Playwright tests efficiently.
- **Visual Studio Code (VS Code)** – Recommended development environment.
- **npm** – Dependency manager for installing Playwright and required packages.

## Test Approach: Black Box Testing
All tests **simulate real user interactions** without relying on internal application logic:
- **Focus**: UI-based validation.
- **No Internal Knowledge**: Does not require application source code access.
- **Purpose**: Ensures visible elements function correctly for end users.

## Target Application
Tests are executed against the following **e-commerce demo platform**:
- **Base URL**: [Lambdatest Playground](https://ecommerce-playground.lambdatest.io/)
- **Login Page**: [Account Login](https://ecommerce-playground.lambdatest.io/index.php?route=account/login)

## Prerequisites
Ensure your Windows 11 machine has the following installed:
1. **Node.js (LTS version)**
   - Download: [Node.js Official Site](https://nodejs.org/en/download/)
   - Verify installation:  
     ```bash
     node -v
     npm -v
     ```
   
2. **Visual Studio Code (VS Code)**
   - Download: [VS Code](https://code.visualstudio.com/download)
   - (Optional) Install Playwright Test Extension for VS Code.

## Project Setup Instructions
### **1️⃣ Create a New Project**
    ```bash
    mkdir PlaywrightEcommerceDemo #You can choose your own project name
    cd PlaywrightEcommerceDemo
    code .

    (Alternatively, open the folder in VS Code manually.)

    2️⃣ Initialize Playwright
    ```bash
    npm init playwright@latest
    Select TypeScript when prompted.
    Accept default paths (tests folder).
    Install Playwright browsers (Chromium, Firefox, WebKit).

    3️⃣ Create Test Files
    Inside the tests/ folder, create:

    touch tests/ecommerce.spec.ts
    Copy and paste test cases into this file.

    4️⃣ Run Playwright Tests
    📌 Headless Mode (Fast execution)
    ```bash
    npx playwright test

    📌 Headed Mode (See browser interactions)
    ```bash
    npx playwright test --headed

    📌 Run a Specific Test File
    ```bash
    npx playwright test tests/ecommerce.spec.ts --headed

    📌 Run in Debug Mode (Interactive Testing UI)
    ```bash
    npx playwright test --ui

Test Cases Overview
This project includes 10+ automated UI test cases covering essential functionalities:

Test Case ID	Description
TC001	Verify page title is correct
TC002	Validate login page elements visibility
TC003	Successfully log in with valid credentials
TC004	Display error message for invalid password
TC005	Display error message for invalid email
TC006	Navigate to the registration page
TC007	Display error for missing first name during registration
TC008	Successfully search for a product
TC009	Add a product to the shopping cart
TC010	Navigate to "Contact Us" page
Each test case ensures reliable automation and validates the UI behavior from a user perspective.

Contributing & Improvements

Feel free to fork and modify this project to:
    Add more test cases.
    Implement cross-browser testing.
    Practice debugging and fixing automation cases issues
    Enhance error handling & debugging.


Known_Issues:
    TC009: 
        Issue_description: The test case is not completed because there was a timeout error, the case was expecting a sub menu but it wasn't loaded.
        Expected_Activity: User hovers over any item and clicks on the add to cart icon to successfully add an item to the shopping cart.
        Current_Activity: The test case is not hovering over the item, therefore the submenu is not displayed.
        Solution: find a way to add an additional action to target any item in the page and hover over the product to force display the menu.

    TC010:
        Issue_description: The test case is not completed because there was a timeout error while being redirected, after redirection the test is validating the link where the user is being redirected.
        Expected_pattern: /information\/special/.
        Received_pattern: /product\/special/.
        Solution: update the expected pattern in the document mockAutomation.spec.ts line 155 to match the production pattern.

License:
This Playwright automation framework is open-source for learning and development purposes.