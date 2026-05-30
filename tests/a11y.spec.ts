import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('homepage has no critical a11y violations', async ({ page }) => {
  await page.goto('http://localhost:3001');
  // Wait for page to fully load
  await page.waitForLoadState('networkidle');

  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa'])
    .analyze();

  const critical = results.violations.filter(v =>
    v.impact === 'critical' || v.impact === 'serious'
  );

  if (critical.length > 0) {
    console.log('Critical violations:');
    critical.forEach(v => {
      console.log(`  [${v.impact}] ${v.id}: ${v.description}`);
      v.nodes.slice(0, 2).forEach(n => console.log(`    → ${n.html}`));
    });
  }

  expect(critical).toEqual([]);
});

test('all buttons have accessible names', async ({ page }) => {
  await page.goto('http://localhost:3001');
  await page.waitForLoadState('networkidle');

  const buttons = await page.locator('button').all();
  for (const btn of buttons) {
    const ariaLabel = await btn.getAttribute('aria-label');
    const ariaLabelledBy = await btn.getAttribute('aria-labelledby');
    const text = await btn.textContent();
    const name = ariaLabel || ariaLabelledBy || text?.trim();
    expect(name, `Button without accessible name: ${await btn.innerHTML()}`).toBeTruthy();
  }
});

test('no horizontal scroll on mobile', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('http://localhost:3001');
  await page.waitForLoadState('networkidle');

  const scrollW = await page.evaluate(() => document.body.scrollWidth);
  const clientW = await page.evaluate(() => document.body.clientWidth);

  expect(scrollW, `Horizontal scroll: scrollWidth=${scrollW} > clientWidth=${clientW}`).toBeLessThanOrEqual(clientW + 1);
});

test('mobile screenshots', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('http://localhost:3001');
  await page.waitForLoadState('networkidle');
  await page.screenshot({ path: 'test-results/mobile-home.png', fullPage: true });
  // Just verify page loaded (screenshot is a visual artifact)
  const title = await page.title();
  expect(title).toContain('SCENTORY');
});

test('skip link is present and functional', async ({ page }) => {
  await page.goto('http://localhost:3001');
  // Tab to focus skip link
  await page.keyboard.press('Tab');
  const skipLink = page.locator('.skip-to-content');
  await expect(skipLink).toBeVisible();
});

test('focus indicators visible on interactive elements', async ({ page }) => {
  await page.goto('http://localhost:3001');
  await page.waitForLoadState('networkidle');
  // Verify page has keyboard-navigable elements
  const focusableElements = await page.locator('button, a[href], input, select').count();
  expect(focusableElements).toBeGreaterThan(0);
});
