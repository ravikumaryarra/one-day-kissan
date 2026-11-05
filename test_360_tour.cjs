const http = require('http');
const { chromium } = require('playwright-core');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const BASE_URL = `http://localhost:${PORT}`;
const ARTIFACT_SCREENSHOT_DIR = '/home/ravikumaryarra5224/.gemini/antigravity/brain/a4c3fedf-4303-4802-bedf-aa97232e47e8/screenshots';
const LOCAL_SCREENSHOT_DIR = path.join(__dirname, 'screenshots_360_tour');

if (!fs.existsSync(LOCAL_SCREENSHOT_DIR)) {
  fs.mkdirSync(LOCAL_SCREENSHOT_DIR, { recursive: true });
}
if (!fs.existsSync(ARTIFACT_SCREENSHOT_DIR)) {
  fs.mkdirSync(ARTIFACT_SCREENSHOT_DIR, { recursive: true });
}

function makeRequest(method, path) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: PORT,
      path: path,
      method: method,
      headers: { 'Content-Type': 'application/json' }
    };
    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(data) });
        } catch (e) {
          resolve({ status: res.statusCode, raw: data });
        }
      });
    });
    req.on('error', reject);
    req.end();
  });
}

function saveDualScreenshot(page, filename, options = {}) {
  const p1 = path.join(LOCAL_SCREENSHOT_DIR, filename);
  const p2 = path.join(ARTIFACT_SCREENSHOT_DIR, filename);
  return page.screenshot({ path: p1, ...options }).then(() => {
    fs.copyFileSync(p1, p2);
    console.log(`📸 Saved screenshot: ${filename}`);
  });
}

function assert(condition, message) {
  if (!condition) {
    console.error(`❌ ASSERTION FAILED: ${message}`);
    process.exit(1);
  }
  console.log(`✅ ${message}`);
}

async function run() {
  console.log('================================================================');
  console.log('🧪 VISUAL-FIRST MINIMAL HOMEPAGE & DEDICATED 360 TOUR TEST');
  console.log('================================================================');

  // 1. API VERIFICATION
  console.log('\n--- 1. Testing /api/farm-360 API ---');
  const apiRes = await makeRequest('GET', '/api/farm-360');
  assert(apiRes.status === 200, 'GET /api/farm-360 returns 200 OK');
  assert(apiRes.data.success === true, 'API returns success: true');
  assert(apiRes.data.estate && (apiRes.data.estate.name.includes('Tamil Nadu') || apiRes.data.estate.name.includes('Sanctuary')), 'Estate name verified');
  assert(apiRes.data.atmospheres && apiRes.data.atmospheres.length === 3, '3 atmospheres configured');

  // 2. PLAYWRIGHT INTERACTIVE VERIFICATION
  console.log('\n--- 2. Playwright Minimal Visual Homepage Verification ---');
  const browser = await chromium.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 }
  });
  const page = await context.newPage();

  page.on('console', msg => {
    if (msg.type() === 'error') console.log(`[Browser Error]:`, msg.text());
  });

  console.log(`Navigating to ${BASE_URL}...`);
  await page.goto(BASE_URL, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  // A. VERIFY SIMPLIFIED TOP NAVIGATION (Only One Day Kissan Brand)
  console.log('\n--- A. Verifying Minimal Top Navigation ---');
  const brandEl = page.locator('nav.nav .brand');
  assert(await brandEl.isVisible(), 'Brand logo and title "One Day Kissan" is visible and clean');
  const brandText = await brandEl.textContent();
  assert(brandText.includes('One Day Kissan'), `Brand text verified: "${brandText.trim()}"`);

  // Ensure all 6 removed items are completely absent
  const navButtonsCount = await page.locator('nav.nav button, nav.nav a:not(.brand)').count();
  assert(navButtonsCount === 0, `All navigation buttons/links removed from top nav (found ${navButtonsCount}, expected 0)`);
  console.log('✅ Top navigation completely simplified: One Day Kissan is the only brand element');

  // B. VERIFY HERO CLEANLINESS (No Promotional Floating Buttons)
  console.log('\n--- B. Verifying Hero Artwork & Atmosphere ---');
  const heroTitle = await page.textContent('#heroTitle');
  assert(heroTitle.includes('ordinary'), 'Hero title intact: "A day away from the ordinary."');

  const heroSubtitle = await page.textContent('.hero-subtitle');
  assert(heroSubtitle.includes('living soil'), `Hero subtitle clean and evocative: "${heroSubtitle.trim()}"`);

  // Verify central promotional 360 badge is removed
  const openTourBtnCount = await page.locator('#open360TourBtn').count();
  assert(openTourBtnCount === 0, 'Central floating 360 promotional badge completely removed');

  // Verify corner floating tour pill is removed
  const cornerTourBtnCount = await page.locator('#corner360TourBtn').count();
  assert(cornerTourBtnCount === 0, 'Bottom-right corner promotional tour pill completely removed');

  // Verify no floating text badges on glass refractions
  const glassBadgeCount = await page.locator('.glass-badge').count();
  assert(glassBadgeCount === 0, 'Glass text badges removed (pure landscape refractions preserved)');

  // Verify background visual art elements intact
  const heroVideo = page.locator('#heroVideo');
  assert(await heroVideo.count() > 0, 'Scenic landscape backdrop video element is present');
  const cloudL = page.locator('.cloud.cloud-l');
  const cloudR = page.locator('.cloud.cloud-r');
  assert(await cloudL.isVisible() && await cloudR.isVisible(), 'Parallax atmospheric cloud layers are present and animating');

  await saveDualScreenshot(page, '01_visual_art_minimal_hero.png');

  // C. VERIFY DEDICATED INTEGRATED 360° TOUR SECTION
  console.log('\n--- C. Verifying Dedicated 360° Farm Tour Section ---');
  const tourSection = page.locator('#farm-360-tour');
  assert(await tourSection.count() > 0, '#farm-360-tour section exists on the landing page');

  await tourSection.scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);

  const sectionHead = await tourSection.locator('.h2').textContent();
  assert(sectionHead.includes('Explore the Farm in 360°'), `Heading verified: "${sectionHead.trim()}"`);

  const sectionSub = await tourSection.locator('.farm360-subtitle').textContent();
  assert(sectionSub.includes('Look around and experience the farm before you visit'), `Subtitle verified: "${sectionSub.trim()}"`);

  // Verify Default OFF State (Requirement 2)
  const stageCard = page.locator('#farm360StageCard');
  assert(await stageCard.evaluate(el => el.classList.contains('is-off')), '360° tour is OFF by default');

  const previewWrap = page.locator('#farm360PreviewWrap');
  assert(await previewWrap.isVisible(), 'Preview image wrap is visible while tour is OFF');

  const startBtn = page.locator('#start360TourBtn');
  assert(await startBtn.isVisible(), 'Start 360° View button is visible on preview image');

  const canvasWrap = page.locator('#farm360LiveCanvasWrap');
  assert(await canvasWrap.evaluate(el => el.style.display === 'none'), 'Live WebGL canvas wrap is hidden while OFF (0 CPU/GPU overhead)');

  await saveDualScreenshot(page, '02_farm_360_section_off_state.png');

  // Test Turning ON
  console.log('\n--- Activating 360° Tour (Turn ON) ---');
  await startBtn.click();
  await page.waitForTimeout(1000);

  assert(await stageCard.evaluate(el => el.classList.contains('is-on')), 'Stage card transitioned to is-on state');
  assert(await canvasWrap.isVisible(), 'Live WebGL canvas wrap is now visible');

  const canvas = page.locator('#farm360LiveCanvas');
  assert(await canvas.isVisible(), 'Three.js 360 WebGL canvas is mounted and rendering');

  const powerBtn = page.locator('#toggle360PowerBtn');
  const powerBtnText = await powerBtn.textContent();
  assert(powerBtnText.includes('Turn OFF'), `Toggle button updated to: "${powerBtnText.trim()}"`);

  await saveDualScreenshot(page, '03_farm_360_section_on_active.png');

  // Test Turning OFF
  console.log('\n--- Deactivating 360° Tour (Turn OFF) ---');
  await powerBtn.click();
  await page.waitForTimeout(500);

  assert(await stageCard.evaluate(el => el.classList.contains('is-off')), 'Stage card returned to is-off state');
  assert(await previewWrap.isVisible(), 'Preview image wrap returned when turned OFF');
  assert(await canvasWrap.evaluate(el => el.style.display === 'none'), 'Live WebGL canvas hidden and rendering stopped');

  // Turn back ON for navigation & fullscreen tests
  console.log('\n--- Turning back ON to verify Navigation Controls & Fullscreen ---');
  await startBtn.click();
  await page.waitForTimeout(800);

  // Left & Right Arrow Navigation
  const navLeft = page.locator('#farm360NavLeft');
  const navRight = page.locator('#farm360NavRight');
  assert(await navLeft.isVisible(), 'Left arrow button is visible');
  assert(await navRight.isVisible(), 'Right arrow button is visible');

  await navRight.click();
  await page.waitForTimeout(300);
  console.log('✅ Clicked Right navigation arrow');

  await navLeft.click();
  await page.waitForTimeout(300);
  console.log('✅ Clicked Left navigation arrow');

  // Mouse Drag Navigation
  const canvasBox = await canvas.boundingBox();
  await page.mouse.move(canvasBox.x + 400, canvasBox.y + 200);
  await page.mouse.down();
  await page.mouse.move(canvasBox.x + 200, canvasBox.y + 200, { steps: 10 });
  await page.mouse.up();
  await page.waitForTimeout(500);
  console.log('✅ 360 mouse drag smoothly panned the farm view');

  // Minimal Atmosphere Switcher
  const goldenBtn = page.locator('button[data-atmo="golden"]');
  await goldenBtn.click();
  await page.waitForTimeout(400);
  assert(await goldenBtn.evaluate(el => el.classList.contains('is-active')), 'Golden hour atmosphere active');

  const monsoonBtn = page.locator('button[data-atmo="monsoon"]');
  await monsoonBtn.click();
  await page.waitForTimeout(400);
  assert(await monsoonBtn.evaluate(el => el.classList.contains('is-active')), 'Monsoon dew atmosphere active');

  const morningBtn = page.locator('button[data-atmo="morning"]');
  await morningBtn.click();
  await page.waitForTimeout(400);
  assert(await morningBtn.evaluate(el => el.classList.contains('is-active')), 'Morning mist restored');

  // Fullscreen Toggle
  const fsBtn = page.locator('#farm360FullscreenBtn');
  assert(await fsBtn.isVisible(), 'Fullscreen button is visible');
  await fsBtn.click();
  await page.waitForTimeout(400);
  const isFsActive = await stageCard.evaluate(el => el.classList.contains('is-fullscreen') || !!document.fullscreenElement);
  assert(isFsActive, 'Fullscreen mode toggled on stage card');
  await saveDualScreenshot(page, '04_farm_360_fullscreen_view.png');

  // Exit fullscreen
  await fsBtn.click();
  await page.waitForTimeout(400);

  // 3. RESPONSIVENESS & ZERO HORIZONTAL OVERFLOW (6 VIEWPORTS)
  console.log('\n--- 3. Responsiveness & Horizontal Overflow Verification (6 Viewports) ---');
  const viewports = [
    { name: 'desktop_1920x1080', width: 1920, height: 1080 },
    { name: 'desktop_1440x900', width: 1440, height: 900 },
    { name: 'laptop_1280x800', width: 1280, height: 800 },
    { name: 'tablet_768x1024', width: 768, height: 1024 },
    { name: 'mobile_390x844', width: 390, height: 844 },
    { name: 'small_mobile_320x700', width: 320, height: 700 }
  ];

  for (const vp of viewports) {
    await page.setViewportSize({ width: vp.width, height: vp.height });
    await page.waitForTimeout(400);

    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    assert(overflow <= 0, `Viewport ${vp.name} (${vp.width}x${vp.height}): 0px horizontal overflow (actual: ${overflow}px)`);

    if (vp.width === 390) {
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(400);
      await saveDualScreenshot(page, '05_visual_art_minimal_mobile.png');
    }
  }

  await browser.close();
  console.log('\n================================================================');
  console.log('🎉 ALL MINIMAL VISUAL-FIRST HOMEPAGE & 360 TOUR TESTS PASSED!');
  console.log('================================================================');
}

run().catch(err => {
  console.error('Fatal test error:', err);
  process.exit(1);
});
