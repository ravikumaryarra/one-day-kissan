const { chromium } = require('playwright-core');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const BASE_URL = `http://localhost:${PORT}`;
const ARTIFACT_SCREENSHOT_DIR = '/home/ravikumaryarra5224/.gemini/antigravity/brain/a4c3fedf-4303-4802-bedf-aa97232e47e8/screenshots';
const LOCAL_SCREENSHOT_DIR = path.join(__dirname, 'screenshots_milestone_1c_phase4');

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
  console.log('🌟 ONE DAY KISSAN — MILESTONE 1C, PHASE 4 VERIFICATION SUITE');
  console.log('   Scope: Organic Idle Camera Breathing & Reduced-Motion Guardrails');
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

  if (pageErrors.length > 0) {
    console.error('Page errors details:', pageErrors);
  }
  if (consoleErrors.length > 0) {
    console.error('Console errors details:', consoleErrors);
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

  // ----------------------------------------------------------------------
  // TEST SUITE 1: 3-Second Inactivity Threshold Verification
  // ----------------------------------------------------------------------
  console.log('\n--- 1. Testing 3-Second Inactivity Threshold ---');
  // Reset idle timer
  await page.evaluate(() => window.__farm360.resetIdleTimer());
  
  // At t = 500ms (well under 3000ms threshold): breathing MUST be dormant
  await page.waitForTimeout(500);
  const stateAt500ms = await page.evaluate(() => window.__farm360.getBreathing());
  console.log('Breathing State at 500ms:', stateAt500ms);
  assert(stateAt500ms.weight === 0, 'Breathing weight is strictly 0 at 500ms inactivity');
  assert(stateAt500ms.breatheLon === 0, 'breatheLon is strictly 0 at 500ms');
  assert(stateAt500ms.breatheLat === 0, 'breatheLat is strictly 0 at 500ms');
  assert(stateAt500ms.isIdle === false, 'isIdle is false before 3000ms');

  // At t = 2000ms (still under 3000ms threshold):
  await page.waitForTimeout(1500);
  const stateAt2000ms = await page.evaluate(() => window.__farm360.getBreathing());
  console.log('Breathing State at 2000ms:', stateAt2000ms);
  assert(stateAt2000ms.weight === 0, 'Breathing weight is strictly 0 at 2000ms inactivity');
  assert(stateAt2000ms.breatheLon === 0, 'breatheLon is strictly 0 at 2000ms');
  assert(stateAt2000ms.breatheLat === 0, 'breatheLat is strictly 0 at 2000ms');
  assert(stateAt2000ms.isIdle === false, 'isIdle is false at 2000ms');

  // Screenshot: Idle Dormant Baseline
  const screenshotPath1 = path.join(LOCAL_SCREENSHOT_DIR, '01_breathing_dormant_baseline.png');
  await page.screenshot({ path: screenshotPath1, clip: { x: 120, y: 150, width: 1200, height: 600 } });
  fs.copyFileSync(screenshotPath1, path.join(ARTIFACT_SCREENSHOT_DIR, '01_breathing_dormant_baseline.png'));
  console.log(`Saved screenshot 1: ${screenshotPath1}`);

  // ----------------------------------------------------------------------
  // TEST SUITE 2: Smooth Hermite Ramp-Up (3000ms → 4500ms)
  // ----------------------------------------------------------------------
  console.log('\n--- 2. Testing Smooth Gradual Ramp-Up ---');
  // Wait until t = 3700ms (~700ms into the 1500ms ramp)
  await page.waitForTimeout(1700);
  const stateRamping = await page.evaluate(() => window.__farm360.getBreathing());
  console.log('Breathing State ramping (~3700ms):', stateRamping);
  assert(stateRamping.isIdle === true, 'isIdle is true after 3000ms');
  assert(stateRamping.weight > 0 && stateRamping.weight < 1.0, `Breathing weight is smoothly ramping (got: ${stateRamping.weight.toFixed(3)})`);

  // Wait until t = 5000ms (fully ramped: 3000ms threshold + 1500ms ramp = 4500ms, so weight = 1.0)
  await page.waitForTimeout(1300);
  const stateFullyRamped = await page.evaluate(() => window.__farm360.getBreathing());
  console.log('Breathing State fully ramped (~5000ms):', stateFullyRamped);
  assert(Math.abs(stateFullyRamped.weight - 1.0) < 0.001, `Breathing weight reaches 1.0 after full ramp duration (got: ${stateFullyRamped.weight})`);
  assert(stateFullyRamped.breatheLon !== 0 || stateFullyRamped.breatheLat !== 0, 'Ambient breathing offset is actively modulating view direction');

  // Screenshot: Active Breathing State
  const screenshotPath2 = path.join(LOCAL_SCREENSHOT_DIR, '02_breathing_active_motion.png');
  await page.screenshot({ path: screenshotPath2, clip: { x: 120, y: 150, width: 1200, height: 600 } });
  fs.copyFileSync(screenshotPath2, path.join(ARTIFACT_SCREENSHOT_DIR, '02_breathing_active_motion.png'));
  console.log(`Saved screenshot 2: ${screenshotPath2}`);

  // ----------------------------------------------------------------------
  // TEST SUITE 3: Strict Angular Bounds & Zero Roll (Yaw <= 0.15°, Pitch <= 0.08°, Roll = 0°)
  // ----------------------------------------------------------------------
  console.log('\n--- 3. Testing Strict Angular Bounds & Zero Roll ---');
  // Sample breathing motion over 2 seconds (10 samples @ 200ms)
  let maxObservedYaw = 0;
  let maxObservedPitch = 0;
  let maxObservedRoll = 0;

  for (let i = 0; i < 10; i++) {
    await page.waitForTimeout(200);
    const sample = await page.evaluate(() => window.__farm360.getBreathing());
    const absLon = Math.abs(sample.breatheLon);
    const absLat = Math.abs(sample.breatheLat);
    const absRoll = Math.abs(sample.roll);

    if (absLon > maxObservedYaw) maxObservedYaw = absLon;
    if (absLat > maxObservedPitch) maxObservedPitch = absLat;
    if (absRoll > maxObservedRoll) maxObservedRoll = absRoll;
  }

  console.log(`Sampled Max Yaw: ${maxObservedYaw.toFixed(4)}° (Limit: 0.15°)`);
  console.log(`Sampled Max Pitch: ${maxObservedPitch.toFixed(4)}° (Limit: 0.08°)`);
  console.log(`Sampled Max Roll: ${maxObservedRoll.toFixed(6)}° (Limit: 0°)`);

  assert(maxObservedYaw <= 0.150001, `Max Yaw (${maxObservedYaw.toFixed(4)}°) is strictly <= 0.15°`);
  assert(maxObservedPitch <= 0.080001, `Max Pitch (${maxObservedPitch.toFixed(4)}°) is strictly <= 0.08°`);
  assert(maxObservedRoll < 0.0001, `Roll is strictly zero (got: ${maxObservedRoll})`);

  // ----------------------------------------------------------------------
  // TEST SUITE 4: Zero-Pixel Jump & Immediate Interruption on Pointer Down
  // ----------------------------------------------------------------------
  console.log('\n--- 4. Testing Zero-Pixel Jump & Immediate Interruption on Pointer Down ---');
  // Wait to ensure breathing is non-zero
  await page.waitForTimeout(500);
  const preClickState = await page.evaluate(() => window.__farm360.getBreathing());
  console.log('Pre-Click Breathing State:', preClickState);
  assert(preClickState.weight > 0.8, 'Breathing was active before pointerdown');

  const preClickEffectiveLon = preClickState.effectiveLon;
  const preClickEffectiveLat = preClickState.effectiveLat;

  // Dispatch pointerdown on the farm canvas container
  const canvasWrap = page.locator('#farm360LiveCanvasWrap');
  const box = await canvasWrap.boundingBox();
  assert(!!box, 'Canvas bounding box located');

  // Set up capture probe directly in the page to record exact pre-down and post-down values
  await page.evaluate(() => {
    window.__pointerDownProbe = null;
    const targetEl = document.getElementById('farm360LiveCanvasWrap');
    if (targetEl) {
      targetEl.addEventListener('pointerdown', () => {
        const preCam = window.__farm360.getCamera();
        const preBreathe = window.__farm360.getBreathing();
        setTimeout(() => {
          const postCam = window.__farm360.getCamera();
          const postBreathe = window.__farm360.getBreathing();
          window.__pointerDownProbe = {
            preEffectiveLon: preCam.effectiveLon,
            postEffectiveLon: postCam.effectiveLon,
            lonDelta: Math.abs(postCam.effectiveLon - preCam.effectiveLon),
            latDelta: Math.abs(postCam.effectiveLat - preCam.effectiveLat)
          };
        }, 0);
      }, { capture: true, once: true });
    }
  });

  // Trigger pointerdown
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  await page.mouse.down();
  await page.waitForTimeout(60); // allow frame update

  const postClickState = await page.evaluate(() => {
    const cam = window.__farm360.getCamera();
    const breathe = window.__farm360.getBreathing();
    const probe = window.__pointerDownProbe;
    return { cam, breathe, probe };
  });
  console.log('Post-Pointerdown State:', postClickState);

  // Assert breathing offset is immediately dropped to 0 and weight is 0
  assert(postClickState.breathe.weight === 0, 'Breathing weight immediately dropped to 0 on pointerdown');
  assert(postClickState.breathe.breatheLon === 0, 'breatheLon immediately dropped to 0 on pointerdown');
  assert(postClickState.breathe.breatheLat === 0, 'breatheLat immediately dropped to 0 on pointerdown');

  // Assert effective orientation was seamlessly absorbed into baseline (zero pixel snap!)
  const lonDiff = Math.abs(postClickState.cam.effectiveLon - preClickEffectiveLon);
  const latDiff = Math.abs(postClickState.cam.effectiveLat - preClickEffectiveLat);
  console.log(`Angle discrepancy on pointerdown: Lon Δ = ${lonDiff.toFixed(6)}°, Lat Δ = ${latDiff.toFixed(6)}°`);
  assert(lonDiff < 0.02, `Orientation delta is imperceptible on pointerdown (Lon Δ: ${lonDiff.toFixed(6)}°)`);
  assert(latDiff < 0.02, `Orientation delta is imperceptible on pointerdown (Lat Δ: ${latDiff.toFixed(6)}°)`);

  if (postClickState.probe) {
    console.log('Synchronous Probe Result:', postClickState.probe);
    assert(postClickState.probe.lonDelta < 0.001, `Synchronous Lon Delta is mathematically zero (got: ${postClickState.probe.lonDelta})`);
  }

  // Release mouse
  await page.mouse.up();
  await page.waitForTimeout(100);

  // ----------------------------------------------------------------------
  // TEST SUITE 5: Interaction Interruption (Wheel Zoom & Keyboard Arrows)
  // ----------------------------------------------------------------------
  console.log('\n--- 5. Testing Interaction Interruption (Wheel Zoom & Keyboard Arrows) ---');
  // Wait 3.5s so breathing starts to ramp up
  await page.waitForTimeout(3500);
  const midRamp = await page.evaluate(() => window.__farm360.getBreathing());
  assert(midRamp.weight > 0, 'Breathing weight is active before wheel event');

  // Dispatch wheel event
  await canvasWrap.evaluate(el => {
    el.dispatchEvent(new WheelEvent('wheel', { deltaY: 100, bubbles: true, cancelable: true }));
  });
  await page.waitForTimeout(50);

  const postWheelState = await page.evaluate(() => window.__farm360.getBreathing());
  console.log('Post-Wheel Breathing State:', postWheelState);
  assert(postWheelState.weight === 0, 'Wheel zoom immediately reset breathing weight to 0');
  assert(postWheelState.breatheLon === 0, 'Wheel zoom immediately reset breatheLon to 0');
  assert(postWheelState.idleDuration < 200, `Idle duration was reset by wheel zoom (got: ${postWheelState.idleDuration.toFixed(0)}ms)`);

  // Wait 3.5s again
  await page.waitForTimeout(3500);
  assert((await page.evaluate(() => window.__farm360.getBreathing())).weight > 0, 'Breathing active before keyboard press');

  // Press ArrowLeft
  await page.keyboard.press('ArrowLeft');
  await page.waitForTimeout(50);

  const postKeyState = await page.evaluate(() => window.__farm360.getBreathing());
  console.log('Post-Keyboard Breathing State:', postKeyState);
  assert(postKeyState.weight === 0, 'Keyboard arrow immediately reset breathing weight to 0');
  assert(postKeyState.idleDuration < 200, `Idle duration was reset by keyboard interaction (got: ${postKeyState.idleDuration.toFixed(0)}ms)`);

  // ----------------------------------------------------------------------
  // TEST SUITE 6: Reduced-Motion Accessibility Guardrails
  // ----------------------------------------------------------------------
  console.log('\n--- 6. Testing Accessibility: prefers-reduced-motion Guardrails ---');
  // Set reduced-motion to true
  await page.evaluate(() => window.__farm360.setReducedMotionPreference(true));
  const reducedState = await page.evaluate(() => window.__farm360.getBreathing());
  console.log('Reduced-Motion Active State:', reducedState);
  assert(reducedState.enabled === false, 'Breathing is reported as disabled under reduced motion');
  assert(reducedState.weight === 0, 'Weight is strictly 0 under reduced motion');

  // Wait 4 seconds idle under reduced-motion
  console.log('Waiting 4s idle with prefers-reduced-motion: reduce enabled...');
  await page.waitForTimeout(4000);

  const reducedIdleState = await page.evaluate(() => window.__farm360.getBreathing());
  console.log('State after 4s idle under reduced-motion:', reducedIdleState);
  assert(reducedIdleState.weight === 0, 'Breathing weight remains strictly 0 when reduced motion is preferred');
  assert(reducedIdleState.breatheLon === 0, 'breatheLon remains strictly 0 when reduced motion is preferred');
  assert(reducedIdleState.breatheLat === 0, 'breatheLat remains strictly 0 when reduced motion is preferred');

  // Screenshot: Reduced Motion Inactive
  const screenshotPath3 = path.join(LOCAL_SCREENSHOT_DIR, '03_reduced_motion_dormant.png');
  await page.screenshot({ path: screenshotPath3, clip: { x: 120, y: 150, width: 1200, height: 600 } });
  fs.copyFileSync(screenshotPath3, path.join(ARTIFACT_SCREENSHOT_DIR, '03_reduced_motion_dormant.png'));
  console.log(`Saved screenshot 3: ${screenshotPath3}`);

  // Re-enable motion preference
  await page.evaluate(() => {
    window.__farm360.setReducedMotionPreference(false);
    window.__farm360.resetIdleTimer();
  });
  console.log('Restored normal motion preference. Waiting for idle breathing to resume...');
  await page.waitForTimeout(4800);

  const resumedState = await page.evaluate(() => window.__farm360.getBreathing());
  console.log('Resumed State after restoring motion:', resumedState);
  assert(resumedState.enabled === true, 'Breathing enabled restored');
  assert(resumedState.weight > 0.8, `Breathing smoothly resumed (weight: ${resumedState.weight.toFixed(3)})`);

  // ----------------------------------------------------------------------
  // TEST SUITE 7: Hotspot Projection & Screen Transform During Breathing
  // ----------------------------------------------------------------------
  console.log('\n--- 7. Testing Hotspot Projection & Screen Transform During Breathing ---');
  // Orient toward Desi Cattle Barn (lon: 75, lat: -6)
  await page.evaluate(() => window.__farm360.setOrientation(75, -6));
  await page.waitForTimeout(300);

  // Check that hotspot is rendered with transform
  const hotspotEl = page.locator('.farm360-hotspot[data-hotspot-id="cattle-barn"]');
  assert(await hotspotEl.isVisible(), 'Desi Cattle Barn hotspot is visible');

  const initialTransform = await hotspotEl.evaluate(el => el.style.transform);
  console.log('Initial Hotspot Screen Transform:', initialTransform);
  assert(initialTransform.includes('translate3d'), 'Hotspot has GPU-accelerated translate3d transform');

  // Wait 4s for breathing to cycle
  await page.waitForTimeout(4000);
  const breathingTransform = await hotspotEl.evaluate(el => el.style.transform);
  console.log('Hotspot Screen Transform during Breathing:', breathingTransform);
  assert(breathingTransform.includes('translate3d'), 'Hotspot continues receiving valid transform during breathing');
  assert(await hotspotEl.isVisible(), 'Hotspot remains visible and interactable');

  // Screenshot: Hotspot with Active Breathing
  const screenshotPath4 = path.join(LOCAL_SCREENSHOT_DIR, '04_hotspot_active_breathing.png');
  await page.screenshot({ path: screenshotPath4, clip: { x: 120, y: 150, width: 1200, height: 600 } });
  fs.copyFileSync(screenshotPath4, path.join(ARTIFACT_SCREENSHOT_DIR, '04_hotspot_active_breathing.png'));
  console.log(`Saved screenshot 4: ${screenshotPath4}`);

  // ----------------------------------------------------------------------
  // TEST SUITE 8: Atmosphere Crossfade Compatibility During Breathing
  // ----------------------------------------------------------------------
  console.log('\n--- 8. Testing Atmosphere Crossfade Compatibility During Breathing ---');
  // Trigger atmosphere switch to golden while breathing is active
  await page.evaluate(() => window.__farm360.switchAtmosphere('golden'));
  await page.waitForTimeout(1000); // Wait for crossfade to finish

  const atmoState = await page.evaluate(() => window.__farm360.getAtmosphere());
  assert(atmoState.current === 'golden', 'Atmosphere switched to "golden" during breathing without issue');
  assert(atmoState.isCrossfading === false, 'Crossfade completed cleanly');

  // Switch back to morning
  await page.evaluate(() => window.__farm360.switchAtmosphere('morning'));
  await page.waitForTimeout(1000);
  assert((await page.evaluate(() => window.__farm360.getAtmosphere())).current === 'morning', 'Switched back to morning cleanly');

  // ----------------------------------------------------------------------
  // TEST SUITE 9: Mobile Viewport (390px) Verification
  // ----------------------------------------------------------------------
  console.log('\n--- 9. Testing Mobile Viewport (390px) ---');
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

  // Scroll into view of 360 tour on mobile
  await mobilePage.locator('#farm360StageCard').scrollIntoViewIfNeeded();
  await mobilePage.waitForTimeout(300);

  await mobilePage.evaluate(() => window.__farm360.start());
  await mobilePage.waitForTimeout(500);

  const mobileTourActive = await mobilePage.evaluate(() => window.__farm360.isActive());
  assert(mobileTourActive === true, '360 tour active on mobile');

  // Wait 4.8s for mobile breathing
  await mobilePage.waitForTimeout(4800);
  const mobileBreathing = await mobilePage.evaluate(() => window.__farm360.getBreathing());
  console.log('Mobile Breathing State:', mobileBreathing);
  assert(mobileBreathing.weight > 0.8, 'Breathing smoothly engages on mobile viewport');
  assert(Math.abs(mobileBreathing.breatheLon) <= 0.150001, 'Mobile yaw within bounds');
  assert(Math.abs(mobileBreathing.breatheLat) <= 0.080001, 'Mobile pitch within bounds');

  // Screenshot: Mobile Breathing
  const screenshotPath5 = path.join(LOCAL_SCREENSHOT_DIR, '05_mobile_breathing_390.png');
  await mobilePage.screenshot({ path: screenshotPath5, clip: { x: 0, y: 100, width: 390, height: 500 } });
  fs.copyFileSync(screenshotPath5, path.join(ARTIFACT_SCREENSHOT_DIR, '05_mobile_breathing_390.png'));
  console.log(`Saved screenshot 5: ${screenshotPath5}`);

  await mobileContext.close();

  // ----------------------------------------------------------------------
  // TEST SUITE 10: Zero Errors Verification
  // ----------------------------------------------------------------------
  console.log('\n--- 10. Verifying Error Integrity ---');
  assert(pageErrors.length === 0, `Zero page runtime errors throughout test execution (errors: ${pageErrors.length})`);
  assert(consoleErrors.length === 0, `Zero console errors throughout test execution (errors: ${consoleErrors.length})`);

  console.log('\n========================================================================');
  console.log('🎉 ALL MILESTONE 1C, PHASE 4 TESTS PASSED SUCCESSFULLY! (100%)');
  console.log('========================================================================\n');

  await browser.close();
}

runTests().catch(err => {
  console.error('\n❌ TEST RUN FAILED:\n', err);
  process.exit(1);
});
