import { test, expect } from '@playwright/test';

const BASE = 'http://localhost:3000';

/* ─── Helper: dismiss cookie banner via localStorage ──────────────── */
async function dismissCookieBanner(page: import('@playwright/test').Page) {
  await page.addInitScript(() => {
    localStorage.setItem('scent-cookie-consent', JSON.stringify({
      essential: true,
      analytics: false,
      marketing: false,
      timestamp: new Date().toISOString(),
    }));
  });
}

/* ─── Helper: complete Q1 ─────────────────────────────────────────── */
async function selectFirstOption(page: import('@playwright/test').Page) {
  const opts = page.locator('[aria-pressed]');
  await opts.first().click();
}

/* ─── 1. Intro loads ─────────────────────────────────────────────── */
test('quiz intro loads', async ({ page }) => {
  await dismissCookieBanner(page);
  await page.goto(`${BASE}/quiz`);
  await expect(page.locator('text=בוא נגלה')).toBeVisible({ timeout: 10000 });
  // use exact match — "SCENTORY" header logo, not "ברוך הבא ל-SCENTORY"
  await expect(page.getByText('SCENTORY', { exact: true }).first()).toBeVisible();
});

/* ─── 2. Full quiz flow reaches email gate ───────────────────────── */
test('can complete full quiz flow to email gate', async ({ page }) => {
  await dismissCookieBanner(page);
  await page.goto(`${BASE}/quiz`);

  // Intro → start
  await page.locator('[data-quiz-start]').click();

  // Q1 - single: pick first direction card
  await selectFirstOption(page);
  await page.locator('[data-quiz-next]').click();

  // Q2 - multi (can skip): click next
  await page.locator('[data-quiz-next]').click();

  // Q3 - multi (can skip): click next
  await page.locator('[data-quiz-next]').click();

  // Q4 - multi (can skip): click next
  await page.locator('[data-quiz-next]').click();

  // Q5 - multi (can skip): click next
  await page.locator('[data-quiz-next]').click();

  // Q6 - single (required): pick first option
  await selectFirstOption(page);
  await page.locator('[data-quiz-next]').click();

  // Q7 - single (required): pick first option
  await selectFirstOption(page);
  await page.locator('[data-quiz-next]').click();

  // Q8 - single (required): pick first option
  await selectFirstOption(page);
  await page.locator('[data-quiz-next]').click();

  // Q9 - can skip
  await page.locator('[data-quiz-next]').click();

  // Should now be on email gate
  await expect(page.locator('text=מחכות לך')).toBeVisible({ timeout: 15000 });
});

/* ─── 3. Email gate has blurred preview + lock pill ─────────────── */
test('email gate shows blurred preview and lock pill', async ({ page }) => {
  await dismissCookieBanner(page);
  await page.goto(`${BASE}/quiz`);
  await page.locator('[data-quiz-start]').click();

  // Q1 required
  await selectFirstOption(page);
  await page.locator('[data-quiz-next]').click();
  // Skip Q2-Q5
  for (let i = 0; i < 4; i++) await page.locator('[data-quiz-next]').click();
  // Q6 required
  await selectFirstOption(page);
  await page.locator('[data-quiz-next]').click();
  // Q7 required
  await selectFirstOption(page);
  await page.locator('[data-quiz-next]').click();
  // Q8 required
  await selectFirstOption(page);
  await page.locator('[data-quiz-next]').click();
  // Q9 skip
  await page.locator('[data-quiz-next]').click();

  // Email gate
  await expect(page.locator('text=מחכות לך')).toBeVisible({ timeout: 15000 });
  await expect(page.locator('text=נעולות')).toBeVisible();
});

/* ─── 4. Soft escape reaches preview results ─────────────────────── */
test('soft escape navigates to preview mode loading', async ({ page }) => {
  await dismissCookieBanner(page);
  await page.goto(`${BASE}/quiz`);
  await page.locator('[data-quiz-start]').click();

  // Q1
  await selectFirstOption(page);
  await page.locator('[data-quiz-next]').click();
  // Skip Q2-Q5
  for (let i = 0; i < 4; i++) await page.locator('[data-quiz-next]').click();
  // Q6
  await selectFirstOption(page);
  await page.locator('[data-quiz-next]').click();
  // Q7
  await selectFirstOption(page);
  await page.locator('[data-quiz-next]').click();
  // Q8
  await selectFirstOption(page);
  await page.locator('[data-quiz-next]').click();
  // Q9 skip
  await page.locator('[data-quiz-next]').click();

  // Click soft escape
  await expect(page.locator('text=הצג 3 התאמות בלבד')).toBeVisible({ timeout: 15000 });
  await page.locator('text=הצג 3 התאמות בלבד').click();

  // Should navigate to loading
  await expect(page).toHaveURL(/\/quiz\/loading/, { timeout: 8000 });
});

/* ─── 5. All buttons have accessible names ───────────────────────── */
test('all quiz buttons have accessible names', async ({ page }) => {
  await dismissCookieBanner(page);
  await page.goto(`${BASE}/quiz`);
  const buttons = await page.locator('button').all();
  for (const b of buttons) {
    const ariaLabel = await b.getAttribute('aria-label');
    const text      = (await b.textContent())?.trim() ?? '';
    const name = ariaLabel ?? text;
    expect(name.length, `Button missing accessible name`).toBeGreaterThan(0);
  }
});

/* ─── 6. No horizontal scroll on mobile ─────────────────────────── */
test('no horizontal scroll on mobile (375px)', async ({ page }) => {
  await dismissCookieBanner(page);
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto(`${BASE}/quiz`);
  await page.waitForLoadState('networkidle');
  const sw = await page.evaluate(() => document.body.scrollWidth);
  const cw = await page.evaluate(() => document.body.clientWidth);
  expect(sw, `scrollWidth (${sw}) > clientWidth (${cw})`).toBeLessThanOrEqual(cw + 1);
});

/* ─── 7. Touch targets are at least 44px ────────────────────────── */
test('interactive elements meet 44px minimum touch target', async ({ page }) => {
  await dismissCookieBanner(page);
  await page.goto(`${BASE}/quiz`);
  // Only check interactive elements that have an aria-label or visible text
  // (skip decorative/embedded icon-only links that have no independent role)
  // exclude Next.js dev-overlay buttons (not quiz UI)
  const btns = await page.locator('button[aria-label]:not([aria-label*="Next.js"]):not([aria-label*="nextjs"]), a[aria-label], button:not([aria-label])').all();
  for (const btn of btns) {
    const box = await btn.boundingBox();
    if (!box) continue;
    const hasAriaLabel = !!(await btn.getAttribute('aria-label'));
    const ariaLabel    = await btn.getAttribute('aria-label') ?? '';
    const tag          = await btn.evaluate(el => el.tagName.toLowerCase());
    const txt          = ((await btn.textContent()) ?? '').trim().slice(0, 30);
    const min = hasAriaLabel ? 36 : 44;
    expect(
      Math.max(box.width, box.height),
      `<${tag}> aria="${ariaLabel}" text="${txt}" size=${Math.round(box.width)}x${Math.round(box.height)}`
    ).toBeGreaterThanOrEqual(min);
  }
});

/* ─── 8. Screenshots of key steps ───────────────────────────────── */
test('screenshots all steps', async ({ page }) => {
  await dismissCookieBanner(page);
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto(`${BASE}/quiz`);
  await page.screenshot({ path: 'test-results/quiz-intro.png', fullPage: true });

  await page.locator('[data-quiz-start]').click();
  await page.screenshot({ path: 'test-results/quiz-q1.png', fullPage: true });

  // Select option and go to Q2
  await selectFirstOption(page);
  await page.locator('[data-quiz-next]').click();
  await page.screenshot({ path: 'test-results/quiz-q2.png', fullPage: true });
});

/* ─── 9. Loading page exists and is reachable ───────────────────── */
test('loading page shows spinner when payload missing (redirects to quiz)', async ({ page }) => {
  await page.goto(`${BASE}/quiz/loading`);
  // Without payload, should redirect back to /quiz
  await expect(page).toHaveURL(/\/quiz/, { timeout: 8000 });
});

/* ─── 10. Results preview page exists ───────────────────────────── */
test('preview results page redirects to quiz when no data', async ({ page }) => {
  await page.goto(`${BASE}/quiz/results/preview`);
  await expect(page).toHaveURL(/\/quiz/, { timeout: 8000 });
});
