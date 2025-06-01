import { test, expect } from '@playwright/test';
export async function navigateTo(page, url) {
    await page.goto(url);
    await expect(page).toHaveURL(url);
}

export function logTestStatus(status: boolean) {
    console.log(`${test.info().title} ${status ? '✅ Passed' : '❌ Failed'}`);
}