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
  console.log('🧪 360° REALTIME ANIMATED FARM TOUR - FULL VERIFICATION TEST');
  console.log('================================================================');

  // 1. API VERIFICATION
  console.log('\n--- 1. Testing /api/farm-360 API ---');
  const apiRes = await makeRequest('GET', '/api/farm-360');
  assert(apiRes.status === 200, 'GET /api/farm-360 returns 200 OK');
  assert(apiRes.data.success === true, 'API returns success: true');
  assert(apiRes.data.estate && (apiRes.data.estate.name.includes('Tamil Nadu') || apiRes.data.estate.name.includes('Sanctuary')), 'Estate name includes Tamil Nadu / Sanctuary');
  assert(apiRes.data.sectors && apiRes.data.sectors.length === 5, '5 estate sectors returned by API');
  assert(apiRes.data.atmospheres && apiRes.data.atmospheres.length === 3, '3 atmospheres returned');

  // 2. PLAYWRIGHT BROWSER AUTOMATION
  console.log('\n--- 2. Playwright Interactive Verification ---');
  const browser = await chromium.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 }
  });
  const page = await context.newPage();

  // Listen for console errors
  page.on('console', msg => {
    if (msg.type() === 'error') console.log(`[Browser Error]:`, msg.text());
  });

  console.log(`Navigating to ${BASE_URL}...`);
  await page.goto(BASE_URL, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);

  // Verify Hero Section
  console.log('\n--- Checking Hero Section & Tour Badges ---');
  const heroTitle = await page.textContent('#heroTitle');
  assert(heroTitle.includes('ordinary'), 'Hero title intact');

  const tourBtn = page.locator('#open360TourBtn');
  assert(await tourBtn.isVisible(), 'Hero 360 Tour badge is visible');

  const cornerBtn = page.locator('#corner360TourBtn');
  assert(await cornerBtn.isVisible(), 'Floating corner 360 tour pill is visible on desktop');

  await saveDualScreenshot(page, '01_hero_with_tour_badge.png');

  // Launch 360 Tour Modal
  console.log('\n--- Launching 360 Realtime Farm Tour Modal ---');
  await tourBtn.click();
  await page.waitForTimeout(1000);

  const modal = page.locator('#farm360Modal');
  const isModalOpen = await modal.evaluate(el => el.classList.contains('is-open'));
  assert(isModalOpen, '#farm360Modal opened with is-open class');

  // Verify WebGL Canvas
  const canvas = page.locator('#three360Canvas');
  assert(await canvas.isVisible(), 'Three.js 360 WebGL canvas is mounted and visible');

  // Verify Live Heading
  const liveHeading = await page.textContent('#hudLiveBearing');
  assert(liveHeading.includes('Heading:'), `Live compass heading active: "${liveHeading}"`);

  // Verify 5 Hotspot Pins rendered in DOM
  const hotspotCount = await page.locator('.hotspot-pin').count();
  assert(hotspotCount === 5, `All 5 3D Hotspot pins projected in DOM (found ${hotspotCount})`);

  await saveDualScreenshot(page, '02_farm_360_panorama_viewer.png');

  // Test Mouse Drag Navigation
  console.log('\n--- Testing 360 Mouse Pan Interaction ---');
  const initialHeading = await page.textContent('#hudLiveBearing');
  const canvasBox = await canvas.boundingBox();

  // Drag horizontally across canvas
  await page.mouse.move(canvasBox.x + 600, canvasBox.y + 300);
  await page.mouse.down();
  await page.mouse.move(canvasBox.x + 200, canvasBox.y + 300, { steps: 15 });
  await page.mouse.up();
  await page.waitForTimeout(600);

  const postDragHeading = await page.textContent('#hudLiveBearing');
  assert(initialHeading !== postDragHeading, `Heading updated after 360 drag: from "${initialHeading}" to "${postDragHeading}"`);

  // Test Atmosphere Switcher
  console.log('\n--- Testing Atmosphere Switcher (Golden Hour & Monsoon) ---');
  const goldenBtn = page.locator('button[data-atmo="golden"]');
  await goldenBtn.click();
  await page.waitForTimeout(600);
  const isGoldenActive = await goldenBtn.evaluate(el => el.classList.contains('is-active'));
  assert(isGoldenActive, 'Golden Hour atmosphere activated');
  await saveDualScreenshot(page, '04_farm_360_atmosphere_shift.png');

  const monsoonBtn = page.locator('button[data-atmo="monsoon"]');
  await monsoonBtn.click();
  await page.waitForTimeout(600);
  const isMonsoonActive = await monsoonBtn.evaluate(el => el.classList.contains('is-active'));
  assert(isMonsoonActive, 'Monsoon Dew atmosphere activated');

  const morningBtn = page.locator('button[data-atmo="morning"]');
  await morningBtn.click();
  await page.waitForTimeout(600);
  assert(await morningBtn.evaluate(el => el.classList.contains('is-active')), 'Morning Mist restored');

  // Test Auto-Orbit Toggle
  console.log('\n--- Testing Auto-Orbit Toggle ---');
  const orbitBtn = page.locator('#toggleAutoOrbitBtn');
  await orbitBtn.click();
  const orbitText = await page.textContent('#autoOrbitLabel');
  assert(orbitText.includes('Off'), `Auto-orbit toggled: "${orbitText}"`);

  // Test Hotspot Interaction (Ancestral Thotti House)
  console.log('\n--- Testing Hotspot Interaction & Drawer ---');
  const thottiSectorBtn = page.locator('.sector-pill-btn[data-hotspot-id="thotti-house"]');
  await thottiSectorBtn.click();
  await page.waitForTimeout(600);

  const drawer = page.locator('#hotspotDrawer');
  const isDrawerOpen = await drawer.evaluate(el => el.classList.contains('is-open'));
  assert(isDrawerOpen, 'Hotspot details drawer opened with is-open');

  const drawerTitle = await page.textContent('#drawerTitle');
  assert(drawerTitle.includes('Tamil') || drawerTitle.includes('Farmhouse') || drawerTitle.includes('Thotti'), `Drawer title verified: "${drawerTitle}"`);

  const drawerDesc = await page.textContent('#drawerDesc');
  assert(drawerDesc.includes('Tamil') || drawerDesc.includes('farmhouse') || drawerDesc.includes('courtyard') || drawerDesc.includes('Thotti'), 'Drawer description verified');

  const highlightsCount = await page.locator('#drawerHighlightsList li').count();
  assert(highlightsCount >= 3, `Sector highlights rendered (${highlightsCount} items)`);

  await saveDualScreenshot(page, '03_farm_360_hotspot_drawer.png');

  // Test Direct Booking Action Bridge
  console.log('\n--- Testing Direct Booking Bridge from 360 Tour ---');
  const bookBtn = page.locator('#drawerBookBtn');
  await bookBtn.click();
  await page.waitForTimeout(1000);

  // Modal should be closed
  const isModalClosed = await modal.evaluate(el => !el.classList.contains('is-open'));
  assert(isModalClosed, '#farm360Modal closed after clicking Book Immersion');

  // Region select should have 'sahyadri' selected
  const selectedRegion = await page.inputValue('#regionSelect');
  assert(selectedRegion === 'sahyadri', `Region input auto-selected to "${selectedRegion}" (Western Ghats Foothills)`);

  // Toast should be visible
  const toast = page.locator('#toastMessage');
  const isToastVisible = await toast.evaluate(el => el.classList.contains('is-visible'));
  assert(isToastVisible, 'Confirmation toast displayed confirming hill estate selection');

  await saveDualScreenshot(page, '05_booking_preselected_from_360.png');

  // 3. RESPONSIVENESS & ZERO HORIZONTAL OVERFLOW TESTING
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

    // Check main page horizontal overflow
    const overflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth - window.innerWidth;
    });
    assert(overflow <= 0, `Viewport ${vp.name} (${vp.width}x${vp.height}): 0px horizontal overflow (actual: ${overflow}px)`);

    // In mobile viewports, test opening 360 modal to verify mobile HUD & controls
    if (vp.width <= 768) {
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(300);
      await page.click('#open360TourBtn');
      await page.waitForTimeout(500);

      const modalOpen = await modal.evaluate(el => el.classList.contains('is-open'));
      assert(modalOpen, `Viewport ${vp.name}: 360 modal opens cleanly on mobile`);

      if (vp.width === 390) {
        await saveDualScreenshot(page, '06_responsive_360_tour_mobile.png');
      }

      await page.click('#close360ModalBtn');
      await page.waitForTimeout(300);
    }
  }

  await browser.close();
  console.log('\n================================================================');
  console.log('🎉 ALL 360° REALTIME ANIMATED FARM TOUR VERIFICATION TESTS PASSED!');
  console.log('================================================================');
}

run().catch(err => {
  console.error('Fatal test error:', err);
  process.exit(1);
});
