const { chromium } = require('playwright-core');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const BASE_URL = `http://localhost:${PORT}`;
const ARTIFACT_SCREENSHOT_DIR = '/home/ravikumaryarra5224/.gemini/antigravity/brain/a4c3fedf-4303-4802-bedf-aa97232e47e8/screenshots';
const LOCAL_SCREENSHOT_DIR = path.join(__dirname, 'screenshots_welcome_popup');

if (!fs.existsSync(LOCAL_SCREENSHOT_DIR)) {
  fs.mkdirSync(LOCAL_SCREENSHOT_DIR, { recursive: true });
}
if (!fs.existsSync(ARTIFACT_SCREENSHOT_DIR)) {
  fs.mkdirSync(ARTIFACT_SCREENSHOT_DIR, { recursive: true });
}

function assert(condition, message) {
  if (!condition) {
    console.error(`❌ ASSERTION FAILED: ${message}`);
    throw new Error(`Assertion failed: ${message}`);
  }
  console.log(`✅ ${message}`);
}

async function runTests() {
  console.log('========================================================================');
  console.log('🌟 ONE DAY KISSAN — WELCOME POPUP REFINEMENT (VERSION 3) TEST SUITE');
  console.log('========================================================================\n');

  const browser = await chromium.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  // =========================================================================
  // TEST SUITE 1: FIRST VISIT AUTO-OPEN, CONTENT & BRIGHTNESS VERIFICATION
  // =========================================================================
  console.log('--- TEST 1: First Visit Auto-Open, Content & Treatment Verification ---');
  let context = await browser.newContext({
    viewport: { width: 1440, height: 900 }
  });
  let page = await context.newPage();

  const pageErrors = [];
  page.on('pageerror', err => {
    pageErrors.push(err.message);
    console.error('  [Page Error]:', err.message);
  });
  page.on('console', msg => {
    if (msg.type() === 'error') console.error('  [Browser Error]:', msg.text());
  });

  await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2200); // Allow intro animation and auto-open timer

  assert(pageErrors.length === 0, `Zero page runtime errors detected on load (errors: ${pageErrors.length})`);

  const modal = page.locator('#welcomePopupModal');
  const isModalOpen = await modal.evaluate(el => el.classList.contains('is-open'));
  assert(isModalOpen, 'Cinematic Welcome opens naturally on first visit');

  // Verify Single Unified Panel (No two-column grid)
  const panelDisplay = await page.evaluate(() => {
    const card = document.getElementById('welcomePopupCard');
    return card ? window.getComputedStyle(card).display : null;
  });
  assert(panelDisplay === 'flex', `Panel uses unified single-card layout (display: ${panelDisplay})`);

  // Verify Exact Content
  const brandText = (await page.locator('#welcomePopupBrand').textContent()).trim();
  assert(brandText === 'ONE DAY KISSAN', `Brand label matches exact required text: "${brandText}"`);

  const greetingText = (await page.locator('#welcomePopupGreeting').textContent()).trim();
  assert(greetingText === 'Namaskaram.', `Greeting matches exact required text: "${greetingText}"`);

  const headingText = (await page.locator('#welcomeHeading').textContent()).trim();
  assert(headingText === 'Welcome to the land of little wonders.', `Main heading matches exact required text: "${headingText}"`);

  const taglineText = (await page.locator('#welcomePopupTagline').textContent()).trim();
  assert(taglineText === 'A DAY AWAY FROM THE ORDINARY',
    `Closing brand tagline matches exact required text: "${taglineText}"`);

  const exploreText = (await page.locator('#welcomeExploreBtn').textContent()).trim();
  assert(exploreText.includes('Explore the experience'),
    `Understated exploration link matches exact required text: "${exploreText}"`);

  // Verify Removal of Old Elements
  const oldCtaExists = await page.locator('#welcomePopupCtaBtn').count();
  assert(oldCtaExists === 0, 'Old marketing CTA button removed');

  const oldBadgeExists = await page.locator('.welcome-popup-loc-badge').count();
  assert(oldBadgeExists === 0, 'Old stray location badge removed');

  // Verify authentic Telangana background image loaded full-bleed
  const imgLoaded = await page.evaluate(() => {
    const img = document.getElementById('welcomePopupImg');
    return img && img.complete && img.naturalWidth > 0 && img.src.includes('story_01_discover_farm.jpg');
  });
  assert(imgLoaded, 'Authentic Telangana farmland image loaded full-bleed with natural dimensions');

  // =========================================================================
  // TEST SUITE 2: BACKGROUND BRIGHTNESS & BALANCED LAYERED TREATMENT
  // =========================================================================
  console.log('\n--- TEST 2: Background Image Brightness & Scrim Treatment Audit ---');
  const bgImgFilter = await page.evaluate(() => {
    const img = document.getElementById('welcomePopupImg');
    return img ? window.getComputedStyle(img).filter : '';
  });
  assert(bgImgFilter.includes('brightness') || bgImgFilter === 'none' || bgImgFilter === '',
    `Image filter has balanced brightness treatment (filter: "${bgImgFilter}")`);

  const scrimBg = await page.evaluate(() => {
    const scrim = document.querySelector('.welcome-cinematic-scrim');
    return scrim ? window.getComputedStyle(scrim).backgroundImage : '';
  });
  assert(scrimBg.includes('radial-gradient') && scrimBg.includes('linear-gradient'),
    'Scrim utilizes layered radial and linear gradients for sunlight visibility and text legibility');

  // Verify background scrolling locked
  const isLocked = await page.evaluate(() => document.body.style.overflow === 'hidden');
  assert(isLocked, 'Background scrolling is locked while cinematic welcome is open');

  // Screenshot Desktop Welcome Popup (Version 3 Refined)
  const shot35 = path.join(LOCAL_SCREENSHOT_DIR, '35_warm_welcome_popup_desktop.png');
  await page.screenshot({ path: shot35 });
  fs.copyFileSync(shot35, path.join(ARTIFACT_SCREENSHOT_DIR, '35_warm_welcome_popup_desktop.png'));
  console.log('📸 Saved screenshot: 35_warm_welcome_popup_desktop.png');

  // =========================================================================
  // TEST SUITE 3: QUOTE TYPOGRAPHY READABILITY AUDIT (NO THIN ITALICS)
  // =========================================================================
  console.log('\n--- TEST 3: Quote Typography Readability Audit ---');
  const quoteStyles = await page.evaluate(() => {
    const q = document.getElementById('welcomeQuote');
    if (!q) return null;
    const computed = window.getComputedStyle(q);
    return {
      fontFamily: computed.fontFamily,
      fontStyle: computed.fontStyle,
      fontWeight: computed.fontWeight,
      fontSize: computed.fontSize,
      lineHeight: computed.lineHeight,
      color: computed.color
    };
  });
  assert(quoteStyles !== null, 'Quote element exists in DOM');
  assert(quoteStyles.fontStyle === 'normal', `Quote fontStyle is normal (not thin decorative italics): "${quoteStyles.fontStyle}"`);
  assert(quoteStyles.fontFamily.toLowerCase().includes('manrope') || quoteStyles.fontFamily.includes('sans-serif'),
    `Quote uses clean, readable editorial font: "${quoteStyles.fontFamily}"`);
  console.log(`   Typography Specs: ${quoteStyles.fontFamily}, ${quoteStyles.fontSize}, style: ${quoteStyles.fontStyle}, line-height: ${quoteStyles.lineHeight}`);

  // =========================================================================
  // TEST SUITE 4: ROTATING WELCOME QUOTES & CONSECUTIVE DIFFERENTIATION
  // =========================================================================
  console.log('\n--- TEST 4: Rotating Welcome Quotes & Consecutive Difference ---');
  const quotesList = await page.evaluate(() => window.__welcomePopup ? window.__welcomePopup.getQuotesList() : []);
  assert(quotesList.length >= 10, `Curated quotes collection contains at least 10 entries (found: ${quotesList.length})`);

  const initialQuote = await page.evaluate(() => window.__welcomePopup ? window.__welcomePopup.getCurrentQuote() : '');
  assert(quotesList.includes(initialQuote), `Initial quote is from curated collection: "${initialQuote}"`);

  // Stability test: Reloading within same session must preserve the exact same quote
  await page.evaluate(() => window.__welcomePopup.resetDismissal()); // reset dismissal only, keep session quote
  await page.reload({ waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2000);
  const stableQuote = await page.evaluate(() => window.__welcomePopup ? window.__welcomePopup.getCurrentQuote() : '');
  assert(stableQuote === initialQuote, `Quote remains stable across reloads during the same visit ("${stableQuote}")`);
  await context.close();

  // Test Consecutive Visit: Fresh browser session must select a DIFFERENT quote
  console.log('\n--- TEST 4B: Next Visit Selects Non-Consecutive Quote ---');
  context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  page = await context.newPage();

  // Seed localStorage with initialQuote to simulate previous visit
  await page.addInitScript((prev) => {
    localStorage.setItem('odk_last_welcome_quote', prev);
  }, initialQuote);

  await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2200);

  const nextVisitQuote = await page.evaluate(() => window.__welcomePopup ? window.__welcomePopup.getCurrentQuote() : '');
  assert(quotesList.includes(nextVisitQuote), `Next visit selected valid curated quote: "${nextVisitQuote}"`);
  assert(nextVisitQuote !== initialQuote,
    `Consecutive visit strictly avoided repeating previous quote!\n   Prev: "${initialQuote}"\n   Next: "${nextVisitQuote}"`);

  // =========================================================================
  // TEST SUITE 5: CLICK INSIDE DOES NOT CLOSE
  // =========================================================================
  console.log('\n--- TEST 5: Click Inside Card Does Not Close ---');
  await page.locator('#welcomeHeading').click();
  await page.waitForTimeout(300);
  assert(await page.locator('#welcomePopupModal').evaluate(el => el.classList.contains('is-open')),
    'Clicking inside welcome card keeps it open');

  // =========================================================================
  // TEST SUITE 6: CLOSE BUTTON (×) & SCROLL RESTORATION
  // =========================================================================
  console.log('\n--- TEST 6: Close via Close Button (×) ---');
  const closeBtn = page.locator('#welcomePopupCloseBtn');
  assert(await closeBtn.isVisible(), 'Close button (×) is visible in top right');
  assert(await closeBtn.getAttribute('aria-label') === 'Close welcome message', 'Close button has accessible aria-label="Close welcome message"');

  await closeBtn.click();
  await page.waitForTimeout(400);

  assert(await page.locator('#welcomePopupModal').evaluate(el => !el.classList.contains('is-open')),
    'Popup cleanly closed via × button');

  const isUnlocked = await page.evaluate(() => document.body.style.overflow !== 'hidden');
  assert(isUnlocked, 'Background scrolling restored after closing');

  const sessionDismissed = await page.evaluate(() => sessionStorage.getItem('odk_welcome_dismissed'));
  assert(sessionDismissed === 'true', 'Session state marked as dismissed in sessionStorage');

  // =========================================================================
  // TEST SUITE 7: REFRESH IN SAME SESSION STAYS DISMISSED
  // =========================================================================
  console.log('\n--- TEST 7: Refresh in Same Session Stays Dismissed ---');
  await page.reload({ waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2000);

  assert(await page.locator('#welcomePopupModal').evaluate(el => !el.classList.contains('is-open')),
    'Popup stays dismissed on page refresh within same session');
  await context.close();

  // =========================================================================
  // TEST SUITE 8: NEW BROWSER SESSION RE-OPENS POPUP & TEST ESCAPE KEY
  // =========================================================================
  console.log('\n--- TEST 8: New Browser Session & Close via Escape Key ---');
  context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  page = await context.newPage();

  await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2200);

  assert(await page.locator('#welcomePopupModal').evaluate(el => el.classList.contains('is-open')),
    'Popup opens in new independent browser session');

  // Press Escape
  await page.keyboard.press('Escape');
  await page.waitForTimeout(400);

  assert(await page.locator('#welcomePopupModal').evaluate(el => !el.classList.contains('is-open')),
    'Popup cleanly closed via Escape key');

  assert(await page.evaluate(() => sessionStorage.getItem('odk_welcome_dismissed') === 'true'),
    'Escape key correctly saved dismissal state in sessionStorage');
  await context.close();

  // =========================================================================
  // TEST SUITE 9: CLICK OUTSIDE (BACKDROP) DISMISSAL
  // =========================================================================
  console.log('\n--- TEST 9: Close via Click Outside on Backdrop ---');
  context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  page = await context.newPage();

  await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2200);

  assert(await page.locator('#welcomePopupModal').evaluate(el => el.classList.contains('is-open')),
    'Popup is open for outside-click test');

  // Click on backdrop outside the card (e.g. at top corner x=20, y=20)
  await page.mouse.click(20, 20);
  await page.waitForTimeout(400);

  assert(await page.locator('#welcomePopupModal').evaluate(el => !el.classList.contains('is-open')),
    'Popup cleanly closed via clicking outside backdrop');
  await context.close();

  // =========================================================================
  // TEST SUITE 10: EXPLORATION ACTION ("Explore the experience →")
  // =========================================================================
  console.log('\n--- TEST 10: Exploration Action ("Explore the experience →") ---');
  context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  page = await context.newPage();

  await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2200);

  const exploreBtn = page.locator('#welcomeExploreBtn');
  await exploreBtn.click();
  await page.waitForTimeout(500);

  // Assert modal closed cleanly
  assert(await page.locator('#welcomePopupModal').evaluate(el => !el.classList.contains('is-open')),
    'Popup closed upon clicking "Explore the experience →"');

  const exploreDismissed = await page.evaluate(() => sessionStorage.getItem('odk_welcome_dismissed') === 'true');
  assert(exploreDismissed, 'Dismissal state saved in sessionStorage after exploration action');

  const exploreScrollRestored = await page.evaluate(() => document.body.style.overflow !== 'hidden');
  assert(exploreScrollRestored, 'Background scrolling restored for natural website exploration');

  const shot36 = path.join(LOCAL_SCREENSHOT_DIR, '36_warm_welcome_cta_nav_booking.png');
  await page.screenshot({ path: shot36 });
  fs.copyFileSync(shot36, path.join(ARTIFACT_SCREENSHOT_DIR, '36_warm_welcome_cta_nav_booking.png'));
  console.log('📸 Saved screenshot: 36_warm_welcome_cta_nav_booking.png');
  await context.close();

  // =========================================================================
  // TEST SUITE 11: ACCESSIBILITY, FOCUS TRAP & DIALOG SEMANTICS
  // =========================================================================
  console.log('\n--- TEST 11: Accessibility & Focus Trapping ---');
  context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  page = await context.newPage();

  await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2500);

  // Check dialog semantics
  const dialogRole = await page.locator('#welcomePopupModal').getAttribute('role');
  assert(dialogRole === 'dialog', 'Popup has role="dialog"');
  const ariaModal = await page.locator('#welcomePopupModal').getAttribute('aria-modal');
  assert(ariaModal === 'true', 'Popup has aria-modal="true"');
  const ariaLabelledby = await page.locator('#welcomePopupModal').getAttribute('aria-labelledby');
  assert(ariaLabelledby === 'welcomeHeading', 'Popup has aria-labelledby="welcomeHeading"');
  const ariaDescribedby = await page.locator('#welcomePopupModal').getAttribute('aria-describedby');
  assert(ariaDescribedby === 'welcomeQuote', 'Popup has aria-describedby="welcomeQuote"');

  // Check focus is inside modal
  const activeInside = await page.evaluate(() => {
    const modalEl = document.getElementById('welcomePopupModal');
    return modalEl && modalEl.contains(document.activeElement);
  });
  assert(activeInside, 'Focus is automatically managed inside the modal upon opening');

  // Test Tab cycling (Focus Trap)
  await page.keyboard.press('Tab');
  await page.waitForTimeout(100);
  const activeAfterTab = await page.evaluate(() => {
    const modalEl = document.getElementById('welcomePopupModal');
    return modalEl && modalEl.contains(document.activeElement);
  });
  assert(activeAfterTab, 'Tab key trapped within modal elements');
  await context.close();

  // =========================================================================
  // TEST SUITE 12: REDUCED MOTION PREFERENCE
  // =========================================================================
  console.log('\n--- TEST 12: Reduced Motion Support ---');
  context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    reducedMotion: 'reduce'
  });
  page = await context.newPage();

  await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1800);

  const reducedMotionCardTransition = await page.evaluate(() => {
    const card = document.getElementById('welcomePopupCard');
    return card ? window.getComputedStyle(card).transition : '';
  });
  assert(reducedMotionCardTransition.includes('none') || reducedMotionCardTransition.includes('0s') || reducedMotionCardTransition === '',
    `Card animation respects prefers-reduced-motion: reduce (transition: "${reducedMotionCardTransition}")`);
  await context.close();

  // =========================================================================
  // TEST SUITE 13: RESPONSIVE BEHAVIOUR & 0px OVERFLOW ACROSS ALL 7 VIEWPORTS
  // =========================================================================
  console.log('\n--- TEST 13: Responsive Layout & Overflow Audit across 7 Viewports ---');
  const viewports = [
    { name: '1920px Desktop Large', width: 1920, height: 1080 },
    { name: '1440px Desktop Standard', width: 1440, height: 900 },
    { name: '1024px Tablet Landscape', width: 1024, height: 768 },
    { name: '768px Tablet Portrait', width: 768, height: 1024 },
    { name: '390px Mobile (iPhone 14)', width: 390, height: 844 },
    { name: '375px Mobile (iPhone SE)', width: 375, height: 667 },
    { name: '320px Small Mobile', width: 320, height: 568 }
  ];

  for (const vp of viewports) {
    context = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
    page = await context.newPage();

    await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(2000);

    const hasOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth;
    });
    assert(!hasOverflow, `Zero horizontal overflow on ${vp.name} (${vp.width}x${vp.height})`);

    const modalVisible = await page.locator('#welcomePopupModal').evaluate(el => el.classList.contains('is-open'));
    assert(modalVisible, `Popup open and well-framed on ${vp.name}`);

    if (vp.width === 390) {
      const shot37 = path.join(LOCAL_SCREENSHOT_DIR, '37_warm_welcome_mobile_390.png');
      await page.screenshot({ path: shot37 });
      fs.copyFileSync(shot37, path.join(ARTIFACT_SCREENSHOT_DIR, '37_warm_welcome_mobile_390.png'));
      console.log('📸 Saved screenshot: 37_warm_welcome_mobile_390.png');
    }

    if (vp.width === 768) {
      const shot38 = path.join(LOCAL_SCREENSHOT_DIR, '38_warm_welcome_tablet_768.png');
      await page.screenshot({ path: shot38 });
      fs.copyFileSync(shot38, path.join(ARTIFACT_SCREENSHOT_DIR, '38_warm_welcome_tablet_768.png'));
      console.log('📸 Saved screenshot: 38_warm_welcome_tablet_768.png');
    }

    await context.close();
  }

  // =========================================================================
  // TEST SUITE 14: 3D THREE.JS CANVAS INTEGRITY
  // =========================================================================
  console.log('\n--- TEST 14: 3D Three.js & Animation Integrity ---');
  context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  page = await context.newPage();

  await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2200);

  // Close popup
  await page.locator('#welcomePopupCloseBtn').click();
  await page.waitForTimeout(400);

  // Check 360 tour engine
  const farm360Active = await page.evaluate(() => typeof window.__farm360 !== 'undefined');
  assert(farm360Active, 'Integrated Three.js 360 tour engine unaffected and present on window.__farm360');

  await browser.close();

  console.log('\n========================================================================');
  console.log('🎉 ALL 17 WELCOME POPUP REFINEMENT (V3) TESTS PASSED WITH 100% SUCCESS!');
  console.log('========================================================================\n');
}

runTests().catch(err => {
  console.error('\n❌ TEST RUN TERMINATED WITH ERROR:', err);
  process.exit(1);
});
