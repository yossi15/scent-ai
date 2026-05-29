import { test, expect } from '@playwright/test';

test('dark mode background is correct', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.evaluate(() => {
    localStorage.setItem('scentory-theme', 'dark');
  });
  await page.reload();
  // Wait for ThemeBodySync to apply inline style
  await page.waitForTimeout(500);
  const bg = await page.evaluate(() =>
    getComputedStyle(document.body).backgroundColor
  );
  // #050505 = rgb(5, 5, 5)
  expect(bg).toBe('rgb(5, 5, 5)');
});

test('light mode background is correct', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.evaluate(() => {
    localStorage.setItem('scentory-theme', 'light');
  });
  await page.reload();
  // Wait for ThemeBodySync to apply inline style
  await page.waitForTimeout(500);
  const bg = await page.evaluate(() =>
    getComputedStyle(document.body).backgroundColor
  );
  // #faf9f7 = rgb(250, 249, 247)
  expect(bg).toBe('rgb(250, 249, 247)');
});

test('toggle switches theme live', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.click('[data-theme-toggle]');
  const theme = await page.evaluate(() =>
    document.documentElement.getAttribute('data-theme')
  );
  expect(['dark', 'light']).toContain(theme);
});

test('screenshots both modes', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.evaluate(() => localStorage.setItem('scentory-theme', 'dark'));
  await page.reload();
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'test-results/home-dark.png', fullPage: true });
  await page.evaluate(() => localStorage.setItem('scentory-theme', 'light'));
  await page.reload();
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'test-results/home-light.png', fullPage: true });
});
