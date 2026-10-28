import { expect, test } from '@playwright/test';

test('shows hourly temperatures', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.hours ion-item').first()).toContainText('°C');
});
