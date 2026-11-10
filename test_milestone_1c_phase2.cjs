const { chromium } = require('playwright-core');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const BASE_URL = `http://localhost:${PORT}`;
const ARTIFACT_SCREENSHOT_DIR = '/home/ravikumaryarra5224/.gemini/antigravity/brain/a4c3fedf-4303-4802-bedf-aa97232e47e8/screenshots';
const LOCAL_SCREENSHOT_DIR = path.join(__dirname, 'screenshots_milestone_1c_phase2');

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
  console.log('🌟 ONE DAY KISSAN — MILESTONE 1C, PHASE 2 VERIFICATION SUITE');
  console.log('   Scope: World-Space 3D Hotspots & Screen Projection');
  console.log('========================================================================\n');

  const browser = await chromium.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 }
  });

  // Pre-seed dismissal so welcome popup doesn't block interactions
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

  assert(pageErrors.length === 0, `Zero page runtime errors on load (errors: ${pageErrors.length})`);
  assert(consoleErrors.length === 0, `Zero console errors on load (errors: ${consoleErrors.length})`);

  // ----------------------------------------------------------------------
  // TEST SUITE 1: Hotspot DOM Structure & Initial State (Tour OFF)
  // ----------------------------------------------------------------------
  console.log('\n--- 1. Testing Hotspot DOM Structure & Tour Inactive State ---');
  const hotspotsLayer = page.locator('#farm360HotspotsLayer');
  await hotspotsLayer.waitFor({ state: 'attached' });
  assert(await hotspotsLayer.count() === 1, 'Hotspots layer #farm360HotspotsLayer exists in DOM');

  const paddyEl = page.locator('#hotspot-wetland-paddy');
  const barnEl = page.locator('#hotspot-cattle-barn');
  const hearthEl = page.locator('#hotspot-pottery-hearth');

  assert(await paddyEl.count() === 1, 'Hotspot #hotspot-wetland-paddy exists');
  assert(await barnEl.count() === 1, 'Hotspot #hotspot-cattle-barn exists');
  assert(await hearthEl.count() === 1, 'Hotspot #hotspot-pottery-hearth exists');

  const paddyAttrs = await paddyEl.evaluate(el => ({
    id: el.getAttribute('data-hotspot-id'),
    lon: el.getAttribute('data-lon'),
    lat: el.getAttribute('data-lat'),
    title: el.getAttribute('data-title'),
    desc: el.getAttribute('data-desc'),
    role: el.getAttribute('role'),
    tabindex: el.getAttribute('tabindex'),
    ariaHidden: el.getAttribute('aria-hidden')
  }));

  assert(paddyAttrs.id === 'wetland-paddy', 'Wetland Paddy data-hotspot-id is correctly set');
  assert(paddyAttrs.lon === '30' && paddyAttrs.lat === '-12', 'Wetland Paddy spherical coords calibrated to (lon: 30, lat: -12)');
  assert(paddyAttrs.role === 'button', 'Wetland Paddy has role="button"');
  assert(paddyAttrs.tabindex === '-1', 'Hotspot is untabbable (tabindex="-1") when tour is inactive');
  assert(paddyAttrs.ariaHidden === 'true', 'Hotspot is aria-hidden="true" when tour is inactive');

  // ----------------------------------------------------------------------
  // TEST SUITE 2: Tour Activation & 3D World-Space Projection at Default View (lon: 45, lat: 0)
  // ----------------------------------------------------------------------
  console.log('\n--- 2. Testing 360 Tour Activation & Initial 3D Projection ---');

  // Start the 360 tour
  await page.evaluate(() => {
    window.__farm360.start();
  });
  await page.waitForTimeout(600); // Allow camera dampening & projection loop

  const isTourActive = await page.evaluate(() => window.__farm360.isActive());
  assert(isTourActive === true, '360 Tour is successfully activated');

  // Check hotspot visibility and projection at initial angle (lon: 45, lat: 0)
  const hotspotsState1 = await page.evaluate(() => {
    const wrap = document.getElementById('farm360LiveCanvasWrap');
    const wrapRect = wrap.getBoundingClientRect();
    const hs = window.__farm360.getHotspots();
    return hs.map(h => {
      const el = document.getElementById(`hotspot-${h.id}`);
      const rect = el.getBoundingClientRect();
      const style = window.getComputedStyle(el);
      return {
        id: h.id,
        title: h.title,
        isVisible: h.isVisible,
        opacity: style.opacity,
        pointerEvents: style.pointerEvents,
        tabindex: el.getAttribute('tabindex'),
        ariaHidden: el.getAttribute('aria-hidden'),
        transform: el.style.transform,
        screenX: Math.round(rect.left - wrapRect.left + rect.width / 2),
        screenY: Math.round(rect.top - wrapRect.top + rect.height / 2),
        wrapW: wrap.clientWidth,
        wrapH: wrap.clientHeight
      };
    });
  });

  console.log('Default View Hotspots State:', hotspotsState1);

  const paddyState1 = hotspotsState1.find(h => h.id === 'wetland-paddy');
  const barnState1 = hotspotsState1.find(h => h.id === 'cattle-barn');
  const hearthState1 = hotspotsState1.find(h => h.id === 'pottery-hearth');

  // At lon: 45, lat: 0:
  // - Paddy (lon: 30) should be visible on the left side of screen
  // - Cattle Barn (lon: 75) should be visible on the right side of screen
  // - Pottery Hearth (lon: 155) is behind the camera (~110° away) and MUST be culled!
  assert(paddyState1.isVisible === true, 'Wetland Paddy is visible at initial orientation');
  assert(parseFloat(paddyState1.opacity) === 1, 'Wetland Paddy has opacity: 1');
  assert(paddyState1.pointerEvents === 'auto', 'Wetland Paddy has pointer-events: auto');
  assert(paddyState1.tabindex === '0', 'Wetland Paddy is keyboard focusable (tabindex="0")');
  assert(paddyState1.ariaHidden === 'false', 'Wetland Paddy aria-hidden is "false"');
  assert(paddyState1.screenX > 0 && paddyState1.screenX < paddyState1.wrapW * 0.5, 'Wetland Paddy is accurately projected on the left half of the canvas');

  assert(barnState1.isVisible === true, 'Desi Cattle Barn is visible at initial orientation');
  assert(parseFloat(barnState1.opacity) === 1, 'Desi Cattle Barn has opacity: 1');
  assert(barnState1.pointerEvents === 'auto', 'Desi Cattle Barn has pointer-events: auto');
  assert(barnState1.tabindex === '0', 'Desi Cattle Barn is keyboard focusable (tabindex="0")');
  assert(barnState1.ariaHidden === 'false', 'Desi Cattle Barn aria-hidden is "false"');
  assert(barnState1.screenX > paddyState1.screenX && barnState1.screenX < paddyState1.wrapW, 'Desi Cattle Barn is accurately projected to the right of Wetland Paddy');

  assert(hearthState1.isVisible === false, 'Pottery Hearth is culled (behind the camera)');
  assert(parseFloat(hearthState1.opacity) === 0, 'Culled Pottery Hearth has opacity: 0');
  assert(hearthState1.pointerEvents === 'none', 'Culled Pottery Hearth has pointer-events: none');
  assert(hearthState1.tabindex === '-1', 'Culled Pottery Hearth excluded from focus (tabindex="-1")');
  assert(hearthState1.ariaHidden === 'true', 'Culled Pottery Hearth has aria-hidden="true"');

  // Take screenshot of default view with hotspots 1 & 2
  const tourSection = page.locator('#farm-360-tour');
  await tourSection.scrollIntoViewIfNeeded();
  await page.waitForTimeout(400);

  const screenshotPath1 = path.join(LOCAL_SCREENSHOT_DIR, '01_farm360_hotspots_default_view.png');
  const artifactPath1 = path.join(ARTIFACT_SCREENSHOT_DIR, '47_farm360_hotspots_default_view.png');
  await tourSection.screenshot({ path: screenshotPath1 });
  fs.copyFileSync(screenshotPath1, artifactPath1);
  console.log(`Saved screenshot 1: ${screenshotPath1}`);

  // ----------------------------------------------------------------------
  // TEST SUITE 3: 360 Rotation & Dynamic Culling Transition (rotate to lon: 155, lat: -16)
  // ----------------------------------------------------------------------
  console.log('\n--- 3. Testing 360 Rotation & Dynamic Frustum Culling ---');

  // Pan camera to face Pottery & Village Hearth directly
  await page.evaluate(() => {
    window.__farm360.setOrientation(155, -16);
  });
  await page.waitForTimeout(600); // Allow camera dampening & projection loop

  const hotspotsState2 = await page.evaluate(() => {
    const wrap = document.getElementById('farm360LiveCanvasWrap');
    const wrapRect = wrap.getBoundingClientRect();
    const hs = window.__farm360.getHotspots();
    return hs.map(h => {
      const el = document.getElementById(`hotspot-${h.id}`);
      const rect = el.getBoundingClientRect();
      const style = window.getComputedStyle(el);
      return {
        id: h.id,
        title: h.title,
        isVisible: h.isVisible,
        opacity: style.opacity,
        pointerEvents: style.pointerEvents,
        tabindex: el.getAttribute('tabindex'),
        ariaHidden: el.getAttribute('aria-hidden'),
        screenX: Math.round(rect.left - wrapRect.left + rect.width / 2),
        screenY: Math.round(rect.top - wrapRect.top + rect.height / 2),
        wrapW: wrap.clientWidth,
        wrapH: wrap.clientHeight
      };
    });
  });

  console.log('Rotated View (lon: 155, lat: -16) Hotspots State:', hotspotsState2);

  const paddyState2 = hotspotsState2.find(h => h.id === 'wetland-paddy');
  const barnState2 = hotspotsState2.find(h => h.id === 'cattle-barn');
  const hearthState2 = hotspotsState2.find(h => h.id === 'pottery-hearth');

  // At lon: 155, lat: -16:
  // - Pottery Hearth is in direct line of sight: visible, centered
  // - Wetland Paddy and Cattle Barn are now behind the camera and must be culled!
  assert(hearthState2.isVisible === true, 'Pottery Hearth is visible after rotating camera to lon: 155');
  assert(parseFloat(hearthState2.opacity) === 1, 'Pottery Hearth has opacity: 1');
  assert(hearthState2.pointerEvents === 'auto', 'Pottery Hearth has pointer-events: auto');
  assert(hearthState2.tabindex === '0', 'Pottery Hearth has tabindex="0"');
  assert(hearthState2.ariaHidden === 'false', 'Pottery Hearth has aria-hidden="false"');
  assert(Math.abs(hearthState2.screenX - hearthState2.wrapW / 2) < 40, 'Pottery Hearth is centered horizontally on screen');

  assert(paddyState2.isVisible === false, 'Wetland Paddy is smoothly culled when behind camera');
  assert(parseFloat(paddyState2.opacity) === 0, 'Culled Wetland Paddy has opacity: 0');
  assert(paddyState2.pointerEvents === 'none', 'Culled Wetland Paddy has pointer-events: none');
  assert(paddyState2.tabindex === '-1', 'Culled Wetland Paddy has tabindex="-1"');

  assert(barnState2.isVisible === false, 'Desi Cattle Barn is smoothly culled when behind camera');
  assert(parseFloat(barnState2.opacity) === 0, 'Culled Desi Cattle Barn has opacity: 0');
  assert(barnState2.pointerEvents === 'none', 'Culled Desi Cattle Barn has pointer-events: none');

  // Take screenshot of rotated view with Pottery Hearth hotspot
  const screenshotPath2 = path.join(LOCAL_SCREENSHOT_DIR, '02_farm360_hotspots_rotated_view.png');
  const artifactPath2 = path.join(ARTIFACT_SCREENSHOT_DIR, '48_farm360_hotspots_rotated_view.png');
  await tourSection.screenshot({ path: screenshotPath2 });
  fs.copyFileSync(screenshotPath2, artifactPath2);
  console.log(`Saved screenshot 2: ${screenshotPath2}`);

  // ----------------------------------------------------------------------
  // TEST SUITE 4: Zoom & FOV Perspective Adjustment (45°, 75°, 85°)
  // ----------------------------------------------------------------------
  console.log('\n--- 4. Testing Zoom & Perspective Projection Adjustment ---');

  // Return to default view (lon: 45, lat: 0)
  await page.evaluate(() => {
    window.__farm360.setOrientation(45, 0);
    window.__farm360.setFov(75);
  });
  await page.waitForTimeout(500);

  const getPaddyScreenX = async () => {
    return await page.evaluate(() => {
      const wrap = document.getElementById('farm360LiveCanvasWrap');
      const wrapRect = wrap.getBoundingClientRect();
      const el = document.getElementById('hotspot-wetland-paddy');
      const rect = el.getBoundingClientRect();
      return Math.round(rect.left - wrapRect.left + rect.width / 2);
    });
  };

  const xFov75 = await getPaddyScreenX();

  // Zoom IN to FOV 45° (objects move further from optical center towards periphery)
  await page.evaluate(() => {
    window.__farm360.setFov(45);
  });
  await page.waitForTimeout(400);
  const xFov45 = await getPaddyScreenX();

  // Zoom OUT to FOV 85° (objects compress towards optical center)
  await page.evaluate(() => {
    window.__farm360.setFov(85);
  });
  await page.waitForTimeout(400);
  const xFov85 = await getPaddyScreenX();

  console.log(`Paddy Screen X at FOV 45°: ${xFov45}px, FOV 75°: ${xFov75}px, FOV 85°: ${xFov85}px`);
  // Paddy is at lon: 30, camera at lon: 45 (to the left of center, screenX < wrapW/2).
  // When zooming IN (narrower FOV 45°), Paddy moves further left (smaller screenX).
  // When zooming OUT (wider FOV 85°), Paddy moves closer to center (larger screenX).
  assert(xFov45 < xFov75, `Zoom-in pushes off-center hotspot outwards (${xFov45} < ${xFov75})`);
  assert(xFov75 < xFov85, `Zoom-out pulls off-center hotspot towards center (${xFov75} < ${xFov85})`);

  // Reset FOV
  await page.evaluate(() => window.__farm360.setFov(75));
  await page.waitForTimeout(300);

  // ----------------------------------------------------------------------
  // TEST SUITE 5: Drag vs Click Disambiguation & Hotspot Modal
  // ----------------------------------------------------------------------
  console.log('\n--- 5. Testing Drag vs Click Disambiguation & Modal Interaction ---');
  const hotspotCard = page.locator('#farm360HotspotCard');
  assert(await hotspotCard.isVisible() === false, 'Hotspot info card is initially hidden');

  // Test Direct Click on Hotspot (Paddy) -> Should open modal card
  const paddyHotspot = page.locator('#hotspot-wetland-paddy');
  await paddyHotspot.click();
  await page.waitForTimeout(300);

  assert(await hotspotCard.isVisible() === true, 'Clicking hotspot opens #farm360HotspotCard');
  const cardTitle = await page.locator('#hotspotCardTitle').textContent();
  const cardDesc = await page.locator('#hotspotCardDesc').textContent();

  assert(cardTitle === 'Wetland Rice Paddy', `Card title matches hotspot data-title ("${cardTitle}")`);
  assert(cardDesc.includes('flooded agricultural bunds'), `Card description matches hotspot data-desc`);

  // Close the card
  await page.locator('#closeHotspotCardBtn').click();
  await page.waitForTimeout(200);
  assert(await hotspotCard.isVisible() === false, 'Closing card dismisses #farm360HotspotCard');

  // Test Drag Disambiguation:
  // User pans across the canvas starting near/over a hotspot by 100px:
  // Modal must NOT open after dragging!
  const canvasWrap = page.locator('#farm360LiveCanvasWrap');
  const wrapBox = await canvasWrap.boundingBox();
  const startDragX = wrapBox.x + wrapBox.width * 0.4;
  const startDragY = wrapBox.y + wrapBox.height * 0.5;

  await page.mouse.move(startDragX, startDragY);
  await page.mouse.down();
  await page.mouse.move(startDragX + 150, startDragY, { steps: 10 });
  await page.mouse.up();
  await page.waitForTimeout(300);

  assert(await hotspotCard.isVisible() === false, 'Panning/dragging across hotspot does NOT trigger the modal card');

  // Take screenshot with Hotspot modal open
  await paddyHotspot.click();
  await page.waitForTimeout(300);

  const screenshotPath3 = path.join(LOCAL_SCREENSHOT_DIR, '03_farm360_hotspot_modal_open.png');
  const artifactPath3 = path.join(ARTIFACT_SCREENSHOT_DIR, '49_farm360_hotspot_modal_open.png');
  await tourSection.screenshot({ path: screenshotPath3 });
  fs.copyFileSync(screenshotPath3, artifactPath3);
  console.log(`Saved screenshot 3: ${screenshotPath3}`);

  // ----------------------------------------------------------------------
  // TEST SUITE 6: Mobile Touch Target & Viewport Responsiveness (390px)
  // ----------------------------------------------------------------------
  console.log('\n--- 6. Testing Mobile Viewport & Responsiveness (390px) ---');
  await page.setViewportSize({ width: 390, height: 844 });
  await page.waitForTimeout(600); // Allow resize and projection calculation

  const mobileHotspotMetrics = await page.evaluate(() => {
    const el = document.getElementById('hotspot-wetland-paddy');
    const pill = el.querySelector('.hotspot-pill');
    const pulse = el.querySelector('.hotspot-pulse');
    const elRect = el.getBoundingClientRect();
    const pillRect = pill.getBoundingClientRect();
    return {
      elWidth: elRect.width,
      elHeight: elRect.height,
      pillHeight: pillRect.height,
      opacity: window.getComputedStyle(el).opacity,
      isVisible: el.classList.contains('is-visible')
    };
  });

  console.log('Mobile Hotspot Metrics:', mobileHotspotMetrics);
  assert(mobileHotspotMetrics.elHeight >= 28, 'Hotspot vertical touch target is comfortable on mobile');
  assert(mobileHotspotMetrics.isVisible === true, 'Hotspot remains visible and projected on mobile viewport');

  const screenshotPath4 = path.join(LOCAL_SCREENSHOT_DIR, '04_farm360_hotspots_mobile_390.png');
  const artifactPath4 = path.join(ARTIFACT_SCREENSHOT_DIR, '50_farm360_hotspots_mobile_390.png');
  await tourSection.screenshot({ path: screenshotPath4 });
  fs.copyFileSync(screenshotPath4, artifactPath4);
  console.log(`Saved screenshot 4: ${screenshotPath4}`);

  // ----------------------------------------------------------------------
  // TEST SUITE 7: Tour Stop & Cleanup
  // ----------------------------------------------------------------------
  console.log('\n--- 7. Testing Tour Shutdown & Cleanup ---');
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.evaluate(() => window.__farm360.stop());
  await page.waitForTimeout(400);

  const cleanUpState = await page.evaluate(() => {
    const card = document.getElementById('farm360HotspotCard');
    const hs = window.__farm360.getHotspots();
    const isTourActive = window.__farm360.isActive();
    return {
      isTourActive,
      cardDisplay: card.style.display,
      hotspotsCulled: hs.every(h => !h.isVisible)
    };
  });

  assert(cleanUpState.isTourActive === false, 'Tour is stopped');
  assert(cleanUpState.cardDisplay === 'none', 'Hotspot modal card is hidden on stop');
  assert(cleanUpState.hotspotsCulled === true, 'All hotspots are culled on stop');

  // Verify zero errors
  assert(pageErrors.length === 0, `Zero page runtime errors throughout test execution (errors: ${pageErrors.length})`);
  assert(consoleErrors.length === 0, `Zero console errors throughout test execution (errors: ${consoleErrors.length})`);

  await browser.close();

  console.log('\n========================================================================');
  console.log('🎉 ALL MILESTONE 1C, PHASE 2 TESTS PASSED SUCCESSFULLY! (100%)');
  console.log('========================================================================\n');
}

runTests().catch(err => {
  console.error('\n❌ Test suite failed:', err);
  process.exit(1);
});
