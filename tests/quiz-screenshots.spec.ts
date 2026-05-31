import { test, expect } from '@playwright/test';

const BASE = 'http://localhost:3000';

async function dismissCookieBanner(page: import('@playwright/test').Page) {
  await page.addInitScript(() => {
    localStorage.setItem('scent-cookie-consent', JSON.stringify({
      essential: true, analytics: false, marketing: false,
      timestamp: new Date().toISOString(),
    }));
  });
}

async function quickNavigate(page: import('@playwright/test').Page) {
  await dismissCookieBanner(page);
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto(`${BASE}/quiz`);
  await page.click('[data-quiz-start]');
}

async function throughToEmailGate(page: import('@playwright/test').Page) {
  await quickNavigate(page);
  await page.locator('[aria-pressed]').first().click();  // Q1
  await page.locator('[data-quiz-next]').click();
  for (let i = 0; i < 4; i++) await page.locator('[data-quiz-next]').click(); // Q2-Q5 skip
  await page.locator('[aria-pressed]').first().click(); // Q6
  await page.locator('[data-quiz-next]').click();
  await page.locator('[aria-pressed]').first().click(); // Q7
  await page.locator('[data-quiz-next]').click();
  await page.locator('[aria-pressed]').first().click(); // Q8
  await page.locator('[data-quiz-next]').click();
  await page.locator('[data-quiz-next]').click(); // Q9 skip
  await expect(page.locator('text=מחכות לך')).toBeVisible({ timeout: 10000 });
}

test('mobile screenshot: intro', async ({ page }) => {
  await dismissCookieBanner(page);
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto(`${BASE}/quiz`);
  await page.screenshot({ path: 'test-results/mobile-intro.png' });
});

test('mobile screenshot: Q1 direction', async ({ page }) => {
  await quickNavigate(page);
  await page.screenshot({ path: 'test-results/mobile-q1.png' });
});

test('mobile screenshot: Q2 note chips', async ({ page }) => {
  await quickNavigate(page);
  await page.locator('[aria-pressed]').first().click();
  await page.locator('[data-quiz-next]').click();
  // wait for Q2 category text to confirm transition complete
  await page.waitForSelector('text=תווים אהובים', { timeout: 5000 });
  await page.screenshot({ path: 'test-results/mobile-q2-chips.png' });
});

test('mobile screenshot: Q3 avoided notes', async ({ page }) => {
  await quickNavigate(page);
  await page.locator('[aria-pressed]').first().click();
  await page.locator('[data-quiz-next]').click();
  await page.waitForSelector('text=תווים אהובים', { timeout: 5000 });
  await page.locator('[data-quiz-next]').click(); // skip Q2
  await page.waitForSelector('text=תווים להימנע', { timeout: 5000 });
  await page.screenshot({ path: 'test-results/mobile-q3-avoided.png' });
});

test('mobile screenshot: email gate', async ({ page }) => {
  await throughToEmailGate(page);
  await page.screenshot({ path: 'test-results/mobile-email-gate.png' });
});
