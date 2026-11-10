const { chromium } = require('playwright-core');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const BASE_URL = `http://localhost:${PORT}`;
const ARTIFACT_SCREENSHOT_DIR = '/home/ravikumaryarra5224/.gemini/antigravity/brain/a4c3fedf-4303-4802-bedf-aa97232e47e8/screenshots';
const LOCAL_SCREENSHOT_DIR = path.join(__dirname, 'screenshots_milestone_1a');

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
  console.log('🌟 ONE DAY KISSAN — MILESTONE 1A VERIFICATION TEST SUITE');
  console.log('   Scope: Navigation & Design System Consolidation');
  console.log('========================================================================\n');

  const browser = await chromium.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 }
  });

  // Pre-seed dismissal so welcome popup doesn't block header clicks
  await context.addInitScript(() => {
    sessionStorage.setItem('odk_welcome_dismissed', 'true');
  });

  const page = await context.newPage();

  const pageErrors = [];
  const consoleErrors = [];
  page.on('pageerror', err => pageErrors.push(err.message));
  page.on('console', msg => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });

  console.log(`Navigating to ${BASE_URL}...`);
  await page.goto(BASE_URL, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  assert(pageErrors.length === 0, `Zero page runtime errors on initial load (errors: ${pageErrors.length})`);
  assert(consoleErrors.length === 0, `Zero console errors detected on initial load (errors: ${consoleErrors.length})`);

  // --- TEST SUITE 1: DESIGN SYSTEM TOKEN CONSOLIDATION ---
  console.log('\n--- TEST SUITE 1: Design System Token Consolidation ---');
  const tokens = await page.evaluate(() => {
    const cs = getComputedStyle(document.documentElement);
    return {
      forestPrimary: cs.getPropertyValue('--color-forest-primary').trim(),
      harvestGold: cs.getPropertyValue('--color-harvest-gold').trim(),
      redClay: cs.getPropertyValue('--color-red-clay').trim(),
      ivoryGround: cs.getPropertyValue('--color-ivory-ground').trim(),
      fontDisplay: cs.getPropertyValue('--font-display').trim(),
      fontBody: cs.getPropertyValue('--font-body').trim(),
      space24: cs.getPropertyValue('--space-24').trim(),
      radiusLg: cs.getPropertyValue('--radius-lg').trim(),
      shadowMd: cs.getPropertyValue('--shadow-md').trim(),
      zHeader: cs.getPropertyValue('--z-header').trim(),
      aliasForest: cs.getPropertyValue('--forest').trim(),
      aliasHarvest: cs.getPropertyValue('--harvest').trim()
    };
  });

  assert(tokens.forestPrimary === '#173B2B', `Primary Forest token verified: "${tokens.forestPrimary}"`);
  assert(tokens.harvestGold === '#DCA64F', `Harvest Gold token verified: "${tokens.harvestGold}"`);
  assert(tokens.redClay === '#9E5A38', `Telangana Red Clay token verified: "${tokens.redClay}"`);
  assert(tokens.ivoryGround === '#F4F0E6', `Rural Ivory ground token verified: "${tokens.ivoryGround}"`);
  assert(tokens.fontDisplay.includes('Playfair Display'), `Display Font token verified: "${tokens.fontDisplay}"`);
  assert(tokens.fontBody.includes('Manrope'), `Body Font token verified: "${tokens.fontBody}"`);
  assert(tokens.zHeader === '1000', `Header Z-Index token verified: "${tokens.zHeader}"`);
  assert(tokens.aliasForest.length > 0, `Legacy alias --forest is active and resolves`);
  assert(tokens.aliasHarvest.length > 0, `Legacy alias --harvest is active and resolves`);

  // --- TEST SUITE 2: DESKTOP HEADER & NAVIGATION BAR ---
  console.log('\n--- TEST SUITE 2: Desktop Header & Navigation Bar ---');
  const header = page.locator('#siteHeader');
  assert(await header.isVisible(), 'Site header #siteHeader is visible in DOM');

  const headerPosition = await header.evaluate(el => getComputedStyle(el).position);
  assert(headerPosition === 'fixed', `Site header is fixed to viewport (got: "${headerPosition}")`);

  const brand = page.locator('#siteHeader .site-header-container .brand');
  assert(await brand.isVisible(), 'Official brand logo is visible on the left');
  assert(await brand.locator('svg').count() > 0, 'Brand sprout SVG emblem is rendered');
  const brandName = (await brand.textContent()).trim();
  assert(brandName.includes('One Day Kissan'), `Brand title verified: "${brandName}"`);

  // Check 7 desktop navigation links
  const expectedLinks = [
    { text: 'Home', href: '#hero' },
    { text: 'About', href: '#stories' },
    { text: 'Activities', href: '#farm-activities' },
    { text: 'Gallery', href: '#gallery' },
    { text: 'Testimonials', href: '#reviews' },
    { text: 'Schools', href: '#schools' },
    { text: 'Contact', href: '#contact' }
  ];

  const desktopNav = page.locator('.site-nav-desktop');
  assert(await desktopNav.isVisible(), 'Desktop navigation links container is visible');

  for (const item of expectedLinks) {
    const link = desktopNav.locator(`a[href="${item.href}"]`);
    assert(await link.count() === 1, `Desktop nav link "${item.text}" (${item.href}) exists`);
    const linkText = (await link.textContent()).trim();
    assert(linkText === item.text, `Link text matches expected: "${linkText}" === "${item.text}"`);

    // Verify target section exists in DOM
    const targetElement = page.locator(item.href);
    assert(await targetElement.count() >= 1, `Target anchor destination "${item.href}" exists in DOM`);
  }

  // Check right contact actions on desktop
  const phoneBtn = page.locator('#siteHeader .header-phone-btn');
  assert(await phoneBtn.isVisible(), 'Direct phone button is visible on desktop');
  assert((await phoneBtn.getAttribute('href')) === 'tel:+919849798674', 'Phone button links to tel:+919849798674');
  assert((await phoneBtn.textContent()).includes('+91 98497 98674'), 'Phone button displays official number');

  const waBtn = page.locator('#siteHeader .header-whatsapp-btn');
  assert(await waBtn.isVisible(), 'Direct WhatsApp button is visible on desktop');
  const waHref = await waBtn.getAttribute('href');
  assert(waHref.includes('wa.me/919849798674'), `WhatsApp button links to verified number: "${waHref}"`);
  assert(await waBtn.getAttribute('target') === '_blank', 'WhatsApp button opens in new tab (target="_blank")');

  const bookBtn = page.locator('#siteHeader .header-book-btn');
  assert(await bookBtn.isVisible(), 'Quick "Book Visit" CTA button is visible on desktop');
  assert((await bookBtn.getAttribute('href')) === '#booking', 'Book button links to #booking');

  // Screenshot Desktop Header Initial State
  const shotDesktopHeader = path.join(LOCAL_SCREENSHOT_DIR, '01_desktop_header_initial.png');
  await page.screenshot({ path: shotDesktopHeader, clip: { x: 0, y: 0, width: 1440, height: 160 } });
  fs.copyFileSync(shotDesktopHeader, path.join(ARTIFACT_SCREENSHOT_DIR, '01_desktop_header_initial.png'));
  console.log('📸 Saved screenshot: 01_desktop_header_initial.png');

  // --- TEST SUITE 3: SCROLL STATE TRANSITION & FROSTED GLASS ---
  console.log('\n--- TEST SUITE 3: Scroll State Transition & Frosted Glass ---');
  // Initially at top (y=0), header should NOT have .is-scrolled
  const initialScrolled = await header.evaluate(el => el.classList.contains('is-scrolled'));
  assert(!initialScrolled, 'Header initially does not have .is-scrolled at top of page');

  // Scroll down 150px
  await page.evaluate(() => window.scrollTo(0, 200));
  await page.waitForTimeout(300);

  const afterScrolled = await header.evaluate(el => el.classList.contains('is-scrolled'));
  assert(afterScrolled, 'Header receives .is-scrolled after scrolling down past 40px');

  const scrolledStyle = await header.evaluate(el => {
    const cs = getComputedStyle(el);
    return {
      height: cs.height,
      backdropFilter: cs.backdropFilter || cs.webkitBackdropFilter,
      boxShadow: cs.boxShadow
    };
  });
  console.log('   Scrolled Header Specs:', scrolledStyle);
  assert(Math.round(parseFloat(scrolledStyle.height)) === 66, `Header condensed from 76px to 66px: "${scrolledStyle.height}"`);
  assert(scrolledStyle.boxShadow !== 'none', 'Header has elevation drop-shadow when scrolled');

  // Screenshot Scrolled Header
  const shotScrolledHeader = path.join(LOCAL_SCREENSHOT_DIR, '02_desktop_header_scrolled.png');
  await page.screenshot({ path: shotScrolledHeader, clip: { x: 0, y: 0, width: 1440, height: 160 } });
  fs.copyFileSync(shotScrolledHeader, path.join(ARTIFACT_SCREENSHOT_DIR, '02_desktop_header_scrolled.png'));
  console.log('📸 Saved screenshot: 02_desktop_header_scrolled.png');

  // Scroll back to top
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(300);
  assert(!(await header.evaluate(el => el.classList.contains('is-scrolled'))), 'Header removes .is-scrolled when back at top');

  // --- TEST SUITE 4: WHATSAPP NUMBER PURGE AUDIT ---
  console.log('\n--- TEST SUITE 4: WhatsApp Number Purge Audit ---');
  // Check line 8449 in #experienceModal
  const expModalWa = page.locator('#experienceModal a[href*="wa.me"]');
  assert(await expModalWa.count() === 1, 'Experience modal contains WhatsApp link');
  const expWaHref = await expModalWa.getAttribute('href');
  assert(expWaHref.includes('wa.me/919849798674'), `Experience modal WhatsApp link corrected to 919849798674 (got: "${expWaHref}")`);
  assert(!expWaHref.includes('919989912345'), 'Dummy number 919989912345 completely eliminated from experience modal');

  // Audit all wa.me links in the DOM
  const allWaLinks = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('a[href*="wa.me"]')).map(a => a.href);
  });
  console.log(`   Found ${allWaLinks.length} WhatsApp links on page:`);
  allWaLinks.forEach((l, idx) => console.log(`     [${idx + 1}] ${l}`));
  assert(allWaLinks.length >= 3, `At least 3 official WhatsApp access points verified (found: ${allWaLinks.length})`);
  for (const link of allWaLinks) {
    assert(link.includes('919849798674'), `Link uses verified official number: ${link}`);
    assert(!link.includes('9989912345'), `Link strictly does not contain dummy number: ${link}`);
  }

  // --- TEST SUITE 5: MOBILE HEADER, DRAWER & TOUCH TARGETS (390px) ---
  console.log('\n--- TEST SUITE 5: Mobile Header, Drawer & Touch Targets (390px) ---');
  await page.setViewportSize({ width: 390, height: 844 });
  await page.waitForTimeout(400);

  // Desktop nav should be hidden on mobile
  const desktopNavVisible = await desktopNav.isVisible();
  assert(!desktopNavVisible, 'Desktop navigation links are hidden on mobile 390px viewport');

  // Mobile menu toggle should be visible
  const menuToggle = page.locator('#mobileMenuToggle');
  assert(await menuToggle.isVisible(), 'Mobile menu toggle button is visible');
  assert((await menuToggle.getAttribute('aria-expanded')) === 'false', 'Toggle button has initial aria-expanded="false"');
  assert((await menuToggle.getAttribute('aria-controls')) === 'mobileNavDrawer', 'Toggle button controls #mobileNavDrawer');

  // Verify touch target size of hamburger button
  const toggleBox = await menuToggle.boundingBox();
  assert(toggleBox && toggleBox.width >= 38 && toggleBox.height >= 38, `Hamburger touch target is adequate: ${toggleBox.width}x${toggleBox.height}px`);

  // Mobile Drawer should be initially closed
  const drawer = page.locator('#mobileNavDrawer');
  assert(!(await drawer.evaluate(el => el.classList.contains('is-open'))), 'Mobile drawer is initially closed');

  // Screenshot Mobile Header Closed
  const shotMobileHeaderClosed = path.join(LOCAL_SCREENSHOT_DIR, '03_mobile_header_closed_390.png');
  await page.screenshot({ path: shotMobileHeaderClosed, clip: { x: 0, y: 0, width: 390, height: 120 } });
  fs.copyFileSync(shotMobileHeaderClosed, path.join(ARTIFACT_SCREENSHOT_DIR, '03_mobile_header_closed_390.png'));
  console.log('📸 Saved screenshot: 03_mobile_header_closed_390.png');

  // Click toggle to open drawer
  await menuToggle.click();
  await page.waitForTimeout(400);

  assert(await drawer.evaluate(el => el.classList.contains('is-open')), 'Mobile drawer opens on toggle click');
  assert((await menuToggle.getAttribute('aria-expanded')) === 'true', 'Toggle button aria-expanded updated to "true"');

  const bodyLocked = await page.evaluate(() => document.body.classList.contains('mobile-nav-locked'));
  assert(bodyLocked, 'Body scrolling is locked while mobile drawer is open');

  // Check mobile navigation links
  const mobileLinks = page.locator('.mobile-drawer-nav .mobile-nav-item');
  const mCount = await mobileLinks.count();
  assert(mCount >= 7, `All mobile navigation links are present in drawer (found ${mCount})`);

  // Verify touch targets for mobile nav links (minimum 44px height)
  for (let i = 0; i < mCount; i++) {
    const mLink = mobileLinks.nth(i);
    const box = await mLink.boundingBox();
    assert(box && box.height >= 44, `Mobile nav link [${i}] touch target >= 44px (got ${box ? box.height : 0}px)`);
  }

  // Check mobile drawer contact actions
  const mCall = page.locator('.mobile-drawer-footer .mobile-call-pill');
  assert(await mCall.isVisible(), 'Mobile call button is visible in drawer');
  assert((await mCall.getAttribute('href')) === 'tel:+919849798674', 'Mobile call button links to tel:+919849798674');

  const mWa = page.locator('.mobile-drawer-footer .mobile-whatsapp-pill');
  assert(await mWa.isVisible(), 'Mobile WhatsApp button is visible in drawer');
  assert((await mWa.getAttribute('href')).includes('wa.me/919849798674'), 'Mobile WhatsApp button links to wa.me/919849798674');

  const mBook = page.locator('.mobile-drawer-footer .mobile-book-cta');
  assert(await mBook.isVisible(), 'Mobile Plan Your Farm Visit button is visible in drawer');

  // Screenshot Mobile Drawer Open
  const shotMobileDrawerOpen = path.join(LOCAL_SCREENSHOT_DIR, '04_mobile_drawer_open_390.png');
  await page.screenshot({ path: shotMobileDrawerOpen });
  fs.copyFileSync(shotMobileDrawerOpen, path.join(ARTIFACT_SCREENSHOT_DIR, '04_mobile_drawer_open_390.png'));
  console.log('📸 Saved screenshot: 04_mobile_drawer_open_390.png');

  // Test close via Escape key
  await page.keyboard.press('Escape');
  await page.waitForTimeout(400);

  assert(!(await drawer.evaluate(el => el.classList.contains('is-open'))), 'Mobile drawer closed cleanly via Escape key');
  assert((await menuToggle.getAttribute('aria-expanded')) === 'false', 'Toggle button aria-expanded reset to "false"');
  assert(!(await page.evaluate(() => document.body.classList.contains('mobile-nav-locked'))), 'Body scrolling restored after drawer close');

  // Test click mobile link closes drawer
  await menuToggle.click();
  await page.waitForTimeout(300);
  assert(await drawer.evaluate(el => el.classList.contains('is-open')), 'Drawer re-opened for link click test');

  await mobileLinks.nth(2).click(); // Click "Activities"
  await page.waitForTimeout(400);
  assert(!(await drawer.evaluate(el => el.classList.contains('is-open'))), 'Clicking a mobile nav link automatically closes drawer');

  // --- TEST SUITE 6: HORIZONTAL OVERFLOW AUDIT ACROSS 6 VIEWPORTS ---
  console.log('\n--- TEST SUITE 6: Viewport Responsiveness & Overflow Audit ---');
  const viewports = [
    { name: 'Desktop Large (1920x1080)', width: 1920, height: 1080 },
    { name: 'Desktop Standard (1440x900)', width: 1440, height: 900 },
    { name: 'Laptop (1280x800)', width: 1280, height: 800 },
    { name: 'Tablet Portrait (768x1024)', width: 768, height: 1024 },
    { name: 'Mobile iPhone 14 (390x844)', width: 390, height: 844 },
    { name: 'Small Mobile (320x600)', width: 320, height: 600 }
  ];

  for (const vp of viewports) {
    await page.setViewportSize({ width: vp.width, height: vp.height });
    await page.waitForTimeout(200);

    const overflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth;
    });
    assert(!overflow, `Zero horizontal overflow on ${vp.name}`);
  }

  // --- TEST SUITE 7: 3D & GSAP PRESERVATION AUDIT ---
  console.log('\n--- TEST SUITE 7: 3D Three.js & Animation System Preservation ---');
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.waitForTimeout(300);

  const threeOk = await page.evaluate(() => {
    return typeof THREE !== 'undefined' && !!window.__farm360 && typeof window.__farm360.start === 'function';
  });
  assert(threeOk, 'Three.js library and window.__farm360 engine strictly preserved and functional');

  const gsapOk = await page.evaluate(() => {
    return typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined';
  });
  assert(gsapOk, 'GSAP and ScrollTrigger strictly preserved and active');

  const lenisOk = await page.evaluate(() => {
    return !!window.__lenis;
  });
  assert(lenisOk, 'Lenis smooth inertial scrolling strictly preserved and running');

  console.log('\n========================================================================');
  console.log('🎉 ALL MILESTONE 1A VERIFICATION TESTS PASSED WITH 100% SUCCESS!');
  console.log('========================================================================\n');

  await browser.close();
}

runTests().catch(err => {
  console.error('\n❌ TEST RUN FAILED:', err);
  process.exit(1);
});
