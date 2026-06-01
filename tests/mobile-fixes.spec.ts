import { test, expect } from '@playwright/test';

test.use({ viewport: { width: 375, height: 812 } });

test('light mode - nav is light', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.evaluate(() => {
    localStorage.setItem('scentory-theme', 'light');
  });
  await page.reload();
  await page.waitForTimeout(500);
  const navBg = await page.evaluate(() => {
    const nav = document.querySelector('header');
    return nav ? getComputedStyle(nav).backgroundColor : 'not found';
  });
  // light mode nav should NOT be near-black
  expect(navBg).not.toBe('rgb(5, 5, 5)');
  expect(navBg).not.toBe('rgb(12, 12, 12)');
  expect(navBg).not.toBe('rgb(3, 3, 3)');
});

test('no horizontal scroll', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.waitForTimeout(500);
  const sw = await page.evaluate(() => document.body.scrollWidth);
  const cw = await page.evaluate(() => document.body.clientWidth);
  expect(sw).toBeLessThanOrEqual(cw + 1);
});

test('comparison table fits viewport — scroll container ≤ viewport', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.waitForTimeout(500);
  // The .table-wrap container must fit within the viewport;
  // the <table> inside may be wider (that's the horizontal-scroll content).
  const wrappers = await page.locator('.table-wrap').all();
  for (const w of wrappers) {
    const box = await w.boundingBox();
    if (box) expect(box.width).toBeLessThanOrEqual(375 + 1);
  }
  // Body must NOT overflow horizontally
  const sw = await page.evaluate(() => document.body.scrollWidth);
  const cw = await page.evaluate(() => document.body.clientWidth);
  expect(sw).toBeLessThanOrEqual(cw + 1);
});

test('badge 96% is visible and not clipped', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.waitForTimeout(500);
  // Find the badge element
  const badge = page.locator('text=96% התאמה').first();
  const isVisible = await badge.isVisible();
  expect(isVisible).toBe(true);
  const box = await badge.boundingBox();
  expect(box).not.toBeNull();
  if (box) {
    // badge should be inside viewport (not hidden above top)
    expect(box.y).toBeGreaterThanOrEqual(0);
    expect(box.x).toBeGreaterThanOrEqual(0);
  }
});

test('full page screenshots both themes', async ({ page }) => {
  for (const theme of ['dark', 'light']) {
    await page.goto('http://localhost:3000');
    await page.evaluate((t) => localStorage.setItem('scentory-theme', t), theme);
    await page.reload();
    await page.waitForTimeout(800);
    await page.screenshot({
      path: `test-results/mobile-${theme}-full.png`,
      fullPage: true,
    });
  }
});
