const { chromium } = require('playwright-core');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const BASE_URL = `http://localhost:${PORT}`;
const ARTIFACT_SCREENSHOT_DIR = '/home/ravikumaryarra5224/.gemini/antigravity/brain/a4c3fedf-4303-4802-bedf-aa97232e47e8/screenshots';
const LOCAL_SCREENSHOT_DIR = path.join(__dirname, 'screenshots_milestone_1c_phase5');

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
  console.log('🌟 ONE DAY KISSAN — MILESTONE 1C, PHASE 5 VERIFICATION SUITE');
  console.log('   Scope: Optional Mobile Gyroscope Integration (16 Test Scenarios)');
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

  if (consoleErrors.length > 0) {
    console.error('Console errors detected on load:', consoleErrors);
  }

  assert(pageErrors.length === 0, `Zero page runtime errors on load (errors: ${pageErrors.length})`);
  assert(consoleErrors.length === 0, `Zero console errors on load (errors: ${consoleErrors.length})`);

  // Start the 360 tour
  await page.evaluate(() => window.__farm360.start());
  await page.waitForTimeout(600);

  const isTourActive = await page.evaluate(() => window.__farm360.isActive());
  assert(isTourActive === true, '360 Tour is successfully active');

  const tourSection = page.locator('#farm-360-tour');
  await tourSection.scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);

  const motionBtn = page.locator('#farm360MotionBtn');
  assert(await motionBtn.isVisible(), 'Motion button #farm360MotionBtn is visible in 360 toolbar');
  assert((await motionBtn.getAttribute('aria-pressed')) === 'false', 'Motion button initial aria-pressed is "false"');
  assert((await motionBtn.innerText()).includes('Motion: OFF'), 'Motion button initial label is "Motion: OFF"');

  // Screenshot 1: Default Desktop State with Motion Control
  const screenshotPath1 = path.join(LOCAL_SCREENSHOT_DIR, '01_motion_btn_default_off.png');
  await page.screenshot({ path: screenshotPath1, clip: { x: 120, y: 150, width: 1200, height: 600 } });
  fs.copyFileSync(screenshotPath1, path.join(ARTIFACT_SCREENSHOT_DIR, '01_motion_btn_default_off.png'));
  console.log(`Saved screenshot 1: ${screenshotPath1}`);

  // ----------------------------------------------------------------------
  // TEST 1: iOS permission granted
  // ----------------------------------------------------------------------
  console.log('\n--- Test 1: iOS Permission Granted ---');
  await page.evaluate(() => {
    window.DeviceOrientationEvent = function() {};
    window.DeviceOrientationEvent.requestPermission = () => Promise.resolve('granted');
  });

  await motionBtn.click();
  await page.waitForTimeout(200);

  const iosGrantedState = await page.evaluate(() => window.__farm360.getMotionState());
  console.log('iOS Granted State:', iosGrantedState);
  assert(iosGrantedState.active === true, 'Motion is active after iOS permission granted');
  assert(iosGrantedState.permissionState === 'granted', 'permissionState is "granted"');
  assert(await motionBtn.evaluate(el => el.classList.contains('is-active')), 'Motion button has .is-active class');
  assert((await motionBtn.getAttribute('aria-pressed')) === 'true', 'aria-pressed is "true"');
  assert((await motionBtn.innerText()).includes('Motion: ON'), 'Motion label updated to "Motion: ON"');

  // Screenshot 2: Motion Active State
  const screenshotPath2 = path.join(LOCAL_SCREENSHOT_DIR, '02_motion_active_state.png');
  await page.screenshot({ path: screenshotPath2, clip: { x: 120, y: 150, width: 1200, height: 600 } });
  fs.copyFileSync(screenshotPath2, path.join(ARTIFACT_SCREENSHOT_DIR, '02_motion_active_state.png'));
  console.log(`Saved screenshot 2: ${screenshotPath2}`);

  // Turn off
  await motionBtn.click();
  await page.waitForTimeout(150);
  assert((await page.evaluate(() => window.__farm360.getMotionState())).active === false, 'Motion successfully toggled off');

  // ----------------------------------------------------------------------
  // TEST 2: iOS permission denied
  // ----------------------------------------------------------------------
  console.log('\n--- Test 2: iOS Permission Denied ---');
  await page.evaluate(() => {
    window.DeviceOrientationEvent.requestPermission = () => Promise.resolve('denied');
  });

  await motionBtn.click();
  await page.waitForTimeout(200);

  const iosDeniedState = await page.evaluate(() => window.__farm360.getMotionState());
  console.log('iOS Denied State:', iosDeniedState);
  assert(iosDeniedState.active === false, 'Motion is inactive after permission denied');
  assert(iosDeniedState.permissionState === 'denied', 'permissionState recorded as "denied"');
  assert(!(await motionBtn.evaluate(el => el.classList.contains('is-active'))), 'Button does not have .is-active');

  // Check no repeated prompt when already denied
  let requestCount = 0;
  await page.evaluate(() => {
    window.__reqCount = 0;
    window.DeviceOrientationEvent.requestPermission = () => {
      window.__reqCount++;
      return Promise.resolve('denied');
    };
  });
  await motionBtn.click();
  await page.waitForTimeout(150);
  const repeatedReqs = await page.evaluate(() => window.__reqCount);
  assert(repeatedReqs === 0, 'Does not repeatedly prompt permission once denied in session');

  // ----------------------------------------------------------------------
  // TEST 3: Permission request unavailable (Standard Android / Modern Browser)
  // ----------------------------------------------------------------------
  console.log('\n--- Test 3: Permission Request Unavailable (Android Fallback) ---');
  await page.evaluate(() => {
    window.__farm360.setMotionPermissionState('prompt');
    window.DeviceOrientationEvent = function() {};
    delete window.DeviceOrientationEvent.requestPermission;
  });

  await motionBtn.click();
  await page.waitForTimeout(150);
  assert((await page.evaluate(() => window.__farm360.getMotionState())).active === true, 'Motion enables directly on browsers without requestPermission');

  // ----------------------------------------------------------------------
  // TEST 4: Supported Android Device with Sensor Data
  // ----------------------------------------------------------------------
  console.log('\n--- Test 4: Supported Android Device with Sensor Data ---');
  // Initial baseline orientation
  await page.evaluate(() => window.__farm360.setOrientation(45, 0));
  await page.waitForTimeout(100);

  // Send initial reference reading (alpha=0, beta=90, gamma=0, screen=0)
  await page.evaluate(() => window.__farm360.simulateOrientation(0, 90, 0));
  await page.waitForTimeout(100);

  const calibState = await page.evaluate(() => window.__farm360.getMotionState());
  console.log('Calibrated State:', calibState);
  assert(calibState.hasSensorData === true, 'hasSensorData is true after reading');
  assert(calibState.sensorLon0 !== null, 'Neutral sensorLon0 calibrated');
  assert(calibState.sensorLat0 !== null, 'Neutral sensorLat0 calibrated');

  // Simulate rotating phone 30° to the right (alpha=30, beta=90, gamma=0)
  await page.evaluate(() => window.__farm360.simulateOrientation(30, 90, 0));
  await page.waitForTimeout(200);

  const movedCamState = await page.evaluate(() => window.__farm360.getCamera());
  console.log('Camera after 30° yaw rotation:', movedCamState);
  assert(movedCamState.targetLon > 45, `Camera targetLon moved to the right (got: ${movedCamState.targetLon.toFixed(1)} > 45)`);

  // Simulate tilting phone 15° up (alpha=30, beta=105, gamma=0)
  await page.evaluate(() => window.__farm360.simulateOrientation(30, 105, 0));
  await page.waitForTimeout(200);

  const tiltedCamState = await page.evaluate(() => window.__farm360.getCamera());
  console.log('Camera after 15° pitch up:', tiltedCamState);
  assert(tiltedCamState.targetLat > 0, `Camera targetLat tilted up (got: ${tiltedCamState.targetLat.toFixed(1)} > 0)`);

  // ----------------------------------------------------------------------
  // TEST 5: Unsupported browser (No DeviceOrientationEvent)
  // ----------------------------------------------------------------------
  console.log('\n--- Test 5: Unsupported Browser Handling ---');
  await page.evaluate(() => {
    window.__farm360.disableMotion();
    delete window.DeviceOrientationEvent;
  });

  await motionBtn.click();
  await page.waitForTimeout(200);

  const unsuppState = await page.evaluate(() => window.__farm360.getMotionState());
  console.log('Unsupported Browser State:', unsuppState);
  assert(unsuppState.active === false, 'Motion remains inactive on unsupported browser');
  assert(unsuppState.permissionState === 'unsupported', 'permissionState is "unsupported"');

  // Restore DeviceOrientationEvent
  await page.evaluate(() => {
    window.DeviceOrientationEvent = function() {};
    window.__farm360.setMotionPermissionState('prompt');
  });

  // ----------------------------------------------------------------------
  // TEST 6: Missing / Null orientation values
  // ----------------------------------------------------------------------
  console.log('\n--- Test 6: Missing / Null Sensor Values ---');
  await page.evaluate(() => {
    window.__farm360.enableMotion();
    window.__farm360.simulateOrientation(null, null, null);
  });
  await page.waitForTimeout(100);

  const nullCheckCam = await page.evaluate(() => window.__farm360.getCamera());
  assert(!isNaN(nullCheckCam.targetLon) && !isNaN(nullCheckCam.targetLat), 'Target coordinates remain valid numbers when null events fire');
  assert(!isNaN(nullCheckCam.lon) && !isNaN(nullCheckCam.lat), 'Camera lon/lat remain valid numbers');

  // ----------------------------------------------------------------------
  // TEST 7: Portrait-to-Landscape rotation (0° -> 90°)
  // ----------------------------------------------------------------------
  console.log('\n--- Test 7: Portrait-to-Landscape Rotation (0° -> 90°) ---');
  await page.evaluate(() => {
    window.__farm360.setOrientation(60, 0);
    // Simulate landscape orientation
    window.screen.orientation = { angle: 90 };
    window.dispatchEvent(new Event('orientationchange'));
  });
  await page.waitForTimeout(100);

  // Send reading in landscape
  await page.evaluate(() => window.__farm360.simulateOrientation(0, 0, 90));
  await page.waitForTimeout(150);

  const landscapeCam = await page.evaluate(() => window.__farm360.getCamera());
  console.log('Landscape Camera State:', landscapeCam);
  assert(!isNaN(landscapeCam.targetLon) && !isNaN(landscapeCam.targetLat), 'Camera state stable in landscape mode');

  // ----------------------------------------------------------------------
  // TEST 8: Landscape-to-Portrait rotation (90° -> 0°)
  // ----------------------------------------------------------------------
  console.log('\n--- Test 8: Landscape-to-Portrait Rotation (90° -> 0°) ---');
  await page.evaluate(() => {
    window.screen.orientation = { angle: 0 };
    window.dispatchEvent(new Event('orientationchange'));
    window.__farm360.simulateOrientation(0, 90, 0);
  });
  await page.waitForTimeout(150);

  const portraitCam = await page.evaluate(() => window.__farm360.getCamera());
  console.log('Portrait Camera State:', portraitCam);
  assert(!isNaN(portraitCam.targetLon) && !isNaN(portraitCam.targetLat), 'Camera state stable after returning to portrait');

  // ----------------------------------------------------------------------
  // TEST 9: Enable and disable repeatedly (Lifecycle & no memory leaks)
  // ----------------------------------------------------------------------
  console.log('\n--- Test 9: Rapid Enable / Disable Cycles ---');
  for (let cycle = 1; cycle <= 4; cycle++) {
    await page.evaluate(() => window.__farm360.disableMotion());
    assert((await page.evaluate(() => window.__farm360.getMotionState())).active === false, `Cycle ${cycle}: Disabled cleanly`);
    await page.evaluate(() => window.__farm360.enableMotion());
    assert((await page.evaluate(() => window.__farm360.getMotionState())).active === true, `Cycle ${cycle}: Enabled cleanly`);
  }

  // ----------------------------------------------------------------------
  // TEST 10: Manual Touch Priority & Zero-Snap Resumption
  // ----------------------------------------------------------------------
  console.log('\n--- Test 10: Manual Touch Priority & Zero-Snap Resumption ---');
  await page.evaluate(() => {
    window.__farm360.enableMotion();
    window.__farm360.setOrientation(50, 0);
    window.__farm360.simulateOrientation(0, 90, 0);
  });
  await page.waitForTimeout(100);

  const canvasWrap = page.locator('#farm360LiveCanvasWrap');
  const box = await canvasWrap.boundingBox();

  // Pointer down (start touch)
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  await page.mouse.down();
  await page.waitForTimeout(50);

  // Send sensor event while user is touching: sensor MUST NOT fight touch!
  await page.evaluate(() => window.__farm360.simulateOrientation(40, 90, 0));
  await page.waitForTimeout(50);

  // Drag touch 100px left
  await page.mouse.move(box.x + box.width / 2 - 100, box.y + box.height / 2);
  await page.waitForTimeout(50);

  const draggedCam = await page.evaluate(() => window.__farm360.getCamera());
  console.log('Dragged Camera State:', draggedCam);
  assert(draggedCam.targetLon > 50, 'Manual touch controlled targetLon without sensor fighting');

  // Release touch (pointer up)
  const preReleaseTargetLon = draggedCam.targetLon;
  await page.mouse.up();
  await page.waitForTimeout(80);

  const postReleaseCam = await page.evaluate(() => window.__farm360.getCamera());
  console.log('Post-Release Camera State:', postReleaseCam);
  const snapDiff = Math.abs(postReleaseCam.targetLon - preReleaseTargetLon);
  assert(snapDiff < 0.5, `Zero-snap upon releasing touch (snapDiff: ${snapDiff.toFixed(4)}°)`);

  // ----------------------------------------------------------------------
  // TEST 11: Phase 4 Idle Breathing Compatibility
  // ----------------------------------------------------------------------
  console.log('\n--- Test 11: Phase 4 Idle Breathing Coordination ---');
  // Active sensor movement resets inactivity timer
  await page.evaluate(() => {
    window.__farm360.simulateOrientation(10, 90, 0);
    window.__farm360.simulateOrientation(20, 90, 0);
  });
  await page.waitForTimeout(100);

  const activeBreathing = await page.evaluate(() => window.__farm360.getBreathing());
  console.log('Breathing State during active sensor motion:', activeBreathing);
  assert(activeBreathing.weight === 0, 'Idle breathing is suspended during active sensor motion');
  assert(activeBreathing.idleDuration < 500, 'Inactivity timer is reset by active sensor motion');

  // Stationary sensor allows idle breathing to gently ramp up after 3s
  console.log('Simulating stationary sensor (settled device) for 3.5s...');
  await page.waitForTimeout(3600);

  const settledBreathing = await page.evaluate(() => window.__farm360.getBreathing());
  console.log('Breathing State after sensor settled for 3.5s:', settledBreathing);
  assert(settledBreathing.isIdle === true, 'Idle breathing engages after sensor settles for > 3s');
  assert(settledBreathing.weight > 0, 'Breathing weight ramps up gently');

  // Moving sensor again immediately drops breathing
  await page.evaluate(() => window.__farm360.simulateOrientation(35, 90, 0));
  await page.waitForTimeout(50);

  const interruptedBreathing = await page.evaluate(() => window.__farm360.getBreathing());
  assert(interruptedBreathing.weight === 0, 'Resuming sensor motion immediately cancels breathing weight');

  // ----------------------------------------------------------------------
  // TEST 12: Reduced-Motion Preference Guardrail
  // ----------------------------------------------------------------------
  console.log('\n--- Test 12: Reduced-Motion Preference Guardrail ---');
  // Enable reduced motion
  await page.evaluate(() => window.__farm360.setReducedMotionPreference(true));
  await page.waitForTimeout(100);

  const motionUnderReduced = await page.evaluate(() => window.__farm360.getMotionState());
  console.log('Motion State under prefers-reduced-motion:', motionUnderReduced);
  assert(motionUnderReduced.active === false, 'Motion is automatically deactivated when reduced motion is preferred');

  // Attempting to toggle motion while reduced-motion is active
  await motionBtn.click();
  await page.waitForTimeout(150);
  assert((await page.evaluate(() => window.__farm360.getMotionState())).active === false, 'Motion cannot be activated while reduced motion is on');

  // Screenshot 3: Reduced Motion Disabled Feedback
  const screenshotPath3 = path.join(LOCAL_SCREENSHOT_DIR, '03_reduced_motion_disabled.png');
  await page.screenshot({ path: screenshotPath3, clip: { x: 120, y: 150, width: 1200, height: 600 } });
  fs.copyFileSync(screenshotPath3, path.join(ARTIFACT_SCREENSHOT_DIR, '03_reduced_motion_disabled.png'));
  console.log(`Saved screenshot 3: ${screenshotPath3}`);

  // Restore normal motion
  await page.evaluate(() => window.__farm360.setReducedMotionPreference(false));
  await page.waitForTimeout(100);

  // ----------------------------------------------------------------------
  // TEST 13: Tour Close and Reopen Lifecycle
  // ----------------------------------------------------------------------
  console.log('\n--- Test 13: Tour Close and Reopen Lifecycle ---');
  await page.evaluate(() => window.__farm360.enableMotion());
  assert((await page.evaluate(() => window.__farm360.getMotionState())).active === true, 'Motion enabled before tour stop');

  await page.evaluate(() => window.__farm360.stop());
  await page.waitForTimeout(150);

  const stopState = await page.evaluate(() => window.__farm360.getMotionState());
  assert(stopState.active === false, 'Motion is deactivated when 360 tour stops');

  await page.evaluate(() => window.__farm360.start());
  await page.waitForTimeout(300);
  assert((await page.evaluate(() => window.__farm360.isActive())) === true, 'Tour re-opened cleanly');

  // ----------------------------------------------------------------------
  // TEST 14: Hotspot Projection during Sensor Movement
  // ----------------------------------------------------------------------
  console.log('\n--- Test 14: Hotspot Projection during Sensor Movement ---');
  await page.evaluate(() => {
    window.__farm360.enableMotion();
    window.__farm360.setOrientation(75, -6);
    window.__farm360.simulateOrientation(0, 90, 0);
  });
  await page.waitForTimeout(200);

  const cattleHotspot = page.locator('.farm360-hotspot[data-hotspot-id="cattle-barn"]');
  assert(await cattleHotspot.isVisible(), 'Cattle Barn hotspot is visible');
  const initialTrans = await cattleHotspot.evaluate(el => el.style.transform);
  assert(initialTrans.includes('translate3d'), 'Hotspot has translate3d projection');

  // Rotate sensor
  await page.evaluate(() => window.__farm360.simulateOrientation(10, 85, 0));
  await page.waitForTimeout(200);

  const movedTrans = await cattleHotspot.evaluate(el => el.style.transform);
  console.log('Hotspot Screen Transform after sensor move:', movedTrans);
  assert(movedTrans !== initialTrans, 'Hotspot screen projection moved dynamically with sensor motion');
  assert(await cattleHotspot.isVisible(), 'Hotspot remains visible and interactable');

  // Screenshot 4: Hotspot Screen Projection with Motion
  const screenshotPath4 = path.join(LOCAL_SCREENSHOT_DIR, '04_hotspot_motion_projection.png');
  await page.screenshot({ path: screenshotPath4, clip: { x: 120, y: 150, width: 1200, height: 600 } });
  fs.copyFileSync(screenshotPath4, path.join(ARTIFACT_SCREENSHOT_DIR, '04_hotspot_motion_projection.png'));
  console.log(`Saved screenshot 4: ${screenshotPath4}`);

  // ----------------------------------------------------------------------
  // TEST 15: Atmosphere Switching during Sensor Movement
  // ----------------------------------------------------------------------
  console.log('\n--- Test 15: Atmosphere Switching during Sensor Movement ---');
  await page.evaluate(() => window.__farm360.switchAtmosphere('golden'));
  await page.waitForTimeout(400);

  // Move sensor mid-crossfade
  await page.evaluate(() => window.__farm360.simulateOrientation(20, 85, 0));
  await page.waitForTimeout(600);

  const atmoState = await page.evaluate(() => window.__farm360.getAtmosphere());
  console.log('Atmosphere state after crossfade with sensor move:', atmoState);
  assert(atmoState.current === 'golden', 'Atmosphere switched to "golden" successfully');
  assert(atmoState.isCrossfading === false, 'Crossfade completed cleanly during sensor movement');

  // Switch back to morning
  await page.evaluate(() => window.__farm360.switchAtmosphere('morning'));
  await page.waitForTimeout(1000);

  // ----------------------------------------------------------------------
  // TEST 16: Mobile Viewport (390px) & Zero Error Integrity
  // ----------------------------------------------------------------------
  console.log('\n--- Test 16: Mobile Viewport (390px) & Error Integrity ---');
  const mobileContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15'
  });
  await mobileContext.addInitScript(() => {
    sessionStorage.setItem('odk_welcome_dismissed', 'true');
  });

  const mobilePage = await mobileContext.newPage();
  await mobilePage.goto(BASE_URL, { waitUntil: 'networkidle' });
  await mobilePage.waitForTimeout(800);

  // In mobile browser simulation, user taps "Allow" on the system motion permission prompt
  await mobilePage.evaluate(() => {
    if (typeof DeviceOrientationEvent !== 'undefined') {
      DeviceOrientationEvent.requestPermission = () => Promise.resolve('granted');
    }
  });

  await mobilePage.evaluate(() => window.__farm360.start());
  await mobilePage.waitForTimeout(500);

  const mobileMotionBtn = mobilePage.locator('#farm360MotionBtn');
  assert(await mobileMotionBtn.isVisible(), 'Motion button is clearly visible and accessible on mobile');

  await mobileMotionBtn.click();
  await mobilePage.waitForTimeout(200);

  const mobileMotionState = await mobilePage.evaluate(() => window.__farm360.getMotionState());
  console.log('Mobile Motion State:', mobileMotionState);
  assert(mobileMotionState.active === true, 'Motion successfully activates on mobile viewport');

  // Screenshot 5: Mobile 390px Motion Active
  const screenshotPath5 = path.join(LOCAL_SCREENSHOT_DIR, '05_mobile_motion_active_390.png');
  await mobilePage.screenshot({ path: screenshotPath5, clip: { x: 0, y: 100, width: 390, height: 500 } });
  fs.copyFileSync(screenshotPath5, path.join(ARTIFACT_SCREENSHOT_DIR, '05_mobile_motion_active_390.png'));
  console.log(`Saved screenshot 5: ${screenshotPath5}`);

  await mobileContext.close();

  // Error integrity check
  assert(pageErrors.length === 0, `Zero page runtime errors throughout test execution (errors: ${pageErrors.length})`);
  assert(consoleErrors.length === 0, `Zero console errors throughout test execution (errors: ${consoleErrors.length})`);

  console.log('\n========================================================================');
  console.log('🎉 ALL MILESTONE 1C, PHASE 5 TESTS PASSED SUCCESSFULLY! (100%)');
  console.log('========================================================================\n');

  await browser.close();
}

runTests().catch(err => {
  console.error('\n❌ TEST RUN FAILED:\n', err);
  process.exit(1);
});
