import { test } from '@playwright/test';

test.use({ viewport: { width: 375, height: 812 } });

test('section screenshots', async ({ page }) => {
  for (const theme of ['dark', 'light']) {
    await page.goto('http://localhost:3000');
    await page.evaluate((t) => localStorage.setItem('scentory-theme', t), theme);
    await page.reload();
    await page.waitForTimeout(1200);

    // scroll to each section and screenshot viewport
    const scrollPositions = [0, 900, 1800, 2700, 3600];
    for (let i = 0; i < scrollPositions.length; i++) {
      await page.evaluate((y) => window.scrollTo(0, y), scrollPositions[i]);
      await page.waitForTimeout(300);
      await page.screenshot({ path: `test-results/dbg-${theme}-${i+1}.png` });
    }
    await page.evaluate(() => window.scrollTo(0, 0));
  }
});
