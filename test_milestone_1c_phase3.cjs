const { chromium } = require('playwright-core');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const BASE_URL = `http://localhost:${PORT}`;
const ARTIFACT_SCREENSHOT_DIR = '/home/ravikumaryarra5224/.gemini/antigravity/brain/a4c3fedf-4303-4802-bedf-aa97232e47e8/screenshots';
const LOCAL_SCREENSHOT_DIR = path.join(__dirname, 'screenshots_milestone_1c_phase3');

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
  console.log('🌟 ONE DAY KISSAN — MILESTONE 1C, PHASE 3 VERIFICATION SUITE');
  console.log('   Scope: Smooth Atmosphere Crossfade Engine');
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

  // Start the 360 tour
  await page.evaluate(() => window.__farm360.start());
  await page.waitForTimeout(800);

  const isTourActive = await page.evaluate(() => window.__farm360.isActive());
  assert(isTourActive === true, '360 Tour is successfully active');

  // ----------------------------------------------------------------------
  // TEST SUITE 1: Dual-Mesh Architecture & Initial Atmosphere State
  // ----------------------------------------------------------------------
  console.log('\n--- 1. Testing Dual-Mesh Architecture & Initial Atmosphere State ---');
  const initialAtmo = await page.evaluate(() => window.__farm360.getAtmosphere());
  const initialMeshes = await page.evaluate(() => window.__farm360.getAtmosphereMeshes());

  console.log('Initial Atmosphere State:', initialAtmo);
  console.log('Initial Mesh Properties:', initialMeshes);

  assert(initialAtmo.current === 'morning', 'Default initial atmosphere is "morning"');
  assert(initialAtmo.isCrossfading === false, 'isCrossfading is initially false');
  assert(initialMeshes.baseRenderOrder === 1, 'Base panorama sphere has renderOrder = 1');
  assert(initialMeshes.fadeRenderOrder === 2, 'Fade crossfade sphere has renderOrder = 2');
  assert(initialMeshes.fadeVisible === false, 'Fade crossfade sphere is initially hidden (visible = false)');
  assert(initialMeshes.fadeOpacity === 0, 'Fade crossfade sphere has initial opacity = 0');

  // Verify UI buttons state
  const btnMorning = page.locator('button[data-atmo="morning"]');
  const btnGolden = page.locator('button[data-atmo="golden"]');
  const btnMonsoon = page.locator('button[data-atmo="monsoon"]');

  assert(await btnMorning.evaluate(el => el.classList.contains('is-active')), 'Morning button has .is-active class');
  assert(await btnMorning.getAttribute('aria-pressed') === 'true', 'Morning button has aria-pressed="true"');
  assert(await btnGolden.getAttribute('aria-pressed') === 'false', 'Golden button has aria-pressed="false"');
  assert(await btnMonsoon.getAttribute('aria-pressed') === 'false', 'Monsoon button has aria-pressed="false"');

  const tourSection = page.locator('#farm-360-tour');
  await tourSection.scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);

  // Screenshot: Morning Baseline
  const screenshotPath1 = path.join(LOCAL_SCREENSHOT_DIR, '01_atmo_morning_baseline.png');
  const artifactPath1 = path.join(ARTIFACT_SCREENSHOT_DIR, '51_atmo_morning_baseline.png');
  await tourSection.screenshot({ path: screenshotPath1 });
  fs.copyFileSync(screenshotPath1, artifactPath1);
  console.log(`Saved screenshot 1 (Morning Baseline): ${screenshotPath1}`);

  // ----------------------------------------------------------------------
  // TEST SUITE 2: Morning → Golden Hour Crossfade Transition & Timing
  // ----------------------------------------------------------------------
  console.log('\n--- 2. Testing Morning → Golden Hour Crossfade Transition & Timing ---');

  // Trigger switch to Golden Hour
  await page.evaluate(() => {
    window.__farm360.switchAtmosphere('golden');
  });

  // Sample mid-crossfade (allow texture load + crossfade progress)
  await page.waitForTimeout(400);

  const midTransitionState = await page.evaluate(() => {
    const atmo = window.__farm360.getAtmosphere();
    const meshes = window.__farm360.getAtmosphereMeshes();
    return { atmo, meshes };
  });

  console.log('Mid-Transition State (Morning -> Golden @ ~400ms):', midTransitionState);
  assert(midTransitionState.atmo.target === 'golden', 'Target atmosphere is correctly identified as "golden"');
  assert(midTransitionState.meshes.fadeVisible === true, 'Fade mesh becomes visible during crossfade');
  assert(midTransitionState.meshes.fadeOpacity > 0.01 && midTransitionState.meshes.fadeOpacity < 0.99,
    `Fade mesh opacity is smoothly interpolating mid-crossfade (got: ${midTransitionState.meshes.fadeOpacity.toFixed(3)})`);

  // Screenshot: Mid-Crossfade Blend
  const screenshotPathMid = path.join(LOCAL_SCREENSHOT_DIR, '02_atmo_mid_crossfade_blend.png');
  const artifactPathMid = path.join(ARTIFACT_SCREENSHOT_DIR, '52_atmo_mid_crossfade_blend.png');
  await tourSection.screenshot({ path: screenshotPathMid });
  fs.copyFileSync(screenshotPathMid, artifactPathMid);
  console.log(`Saved screenshot 2 (Mid-Crossfade Blend): ${screenshotPathMid}`);

  // Wait for crossfade completion (total 800ms + buffer)
  await page.waitForTimeout(650);

  const postGoldenState = await page.evaluate(() => {
    const atmo = window.__farm360.getAtmosphere();
    const meshes = window.__farm360.getAtmosphereMeshes();
    return { atmo, meshes };
  });

  console.log('Post-Golden State:', postGoldenState);
  assert(postGoldenState.atmo.current === 'golden', 'Current atmosphere updated to "golden"');
  assert(postGoldenState.atmo.isCrossfading === false, 'isCrossfading cleanly reset to false');
  assert(postGoldenState.meshes.fadeVisible === false, 'Fade mesh reset to visible = false after completion');
  assert(postGoldenState.meshes.fadeOpacity === 0, 'Fade mesh reset to opacity = 0');
  assert(await btnGolden.evaluate(el => el.classList.contains('is-active')), 'Golden button now has .is-active class');
  assert(await btnGolden.getAttribute('aria-pressed') === 'true', 'Golden button aria-pressed="true"');
  assert(await btnMorning.getAttribute('aria-pressed') === 'false', 'Morning button aria-pressed="false"');

  // Screenshot: Golden Hour Completed
  const screenshotPath3 = path.join(LOCAL_SCREENSHOT_DIR, '03_atmo_golden_hour_complete.png');
  const artifactPath3 = path.join(ARTIFACT_SCREENSHOT_DIR, '53_atmo_golden_hour_complete.png');
  await tourSection.screenshot({ path: screenshotPath3 });
  fs.copyFileSync(screenshotPath3, artifactPath3);
  console.log(`Saved screenshot 3 (Golden Hour Complete): ${screenshotPath3}`);

  // ----------------------------------------------------------------------
  // TEST SUITE 3: Golden Hour → Monsoon Crossfade & Full Atmosphere Cycle
  // ----------------------------------------------------------------------
  console.log('\n--- 3. Testing Golden Hour → Monsoon Crossfade Transition ---');

  // Trigger switch to Monsoon and await completion
  await page.evaluate(() => window.__farm360.switchAtmosphere('monsoon'));
  await page.waitForTimeout(1000); // 800ms crossfade + 200ms settling

  const postMonsoonState = await page.evaluate(() => window.__farm360.getAtmosphere());
  assert(postMonsoonState.current === 'monsoon', 'Current atmosphere successfully transitioned to "monsoon"');
  assert(postMonsoonState.isCrossfading === false, 'Monsoon crossfade finished cleanly');
  assert(await btnMonsoon.evaluate(el => el.classList.contains('is-active')), 'Monsoon button has .is-active class');
  assert(await btnMonsoon.getAttribute('aria-pressed') === 'true', 'Monsoon button aria-pressed="true"');

  // Screenshot: Monsoon Completed
  const screenshotPath4 = path.join(LOCAL_SCREENSHOT_DIR, '04_atmo_monsoon_complete.png');
  const artifactPath4 = path.join(ARTIFACT_SCREENSHOT_DIR, '54_atmo_monsoon_complete.png');
  await tourSection.screenshot({ path: screenshotPath4 });
  fs.copyFileSync(screenshotPath4, artifactPath4);
  console.log(`Saved screenshot 4 (Monsoon Complete): ${screenshotPath4}`);

  // Test Monsoon → Morning (cycling back to start)
  console.log('Testing Monsoon → Morning (cycling back)...');
  await page.evaluate(() => window.__farm360.switchAtmosphere('morning'));
  await page.waitForTimeout(1000);

  const postCycleMorningState = await page.evaluate(() => window.__farm360.getAtmosphere());
  assert(postCycleMorningState.current === 'morning', 'Successfully cycled back to "morning"');
  assert(postCycleMorningState.isCrossfading === false, 'Morning cycle crossfade finished cleanly');

  // ----------------------------------------------------------------------
  // TEST SUITE 4: Texture Caching & Memory Management
  // ----------------------------------------------------------------------
  console.log('\n--- 4. Testing Texture Cache Reuse & Memory Preservation ---');
  const cacheAudit = await page.evaluate(() => {
    const atmo = window.__farm360.getAtmosphere();
    return atmo.loadedTextures;
  });

  console.log('Cached Loaded Textures in GPU Memory:', cacheAudit);
  assert(cacheAudit.includes('morning'), 'Morning texture is safely retained in cache');
  assert(cacheAudit.includes('golden'), 'Golden texture is safely retained in cache');
  assert(cacheAudit.includes('monsoon'), 'Monsoon texture is safely retained in cache');

  // Re-switch to Golden: should be instantaneous texture bind with zero network load delay
  await page.evaluate(() => { window.__farm360.switchAtmosphere('golden'); });
  // Verify crossfade starts immediately without texture loading stall
  await page.waitForTimeout(100);
  const reSwitchState = await page.evaluate(() => window.__farm360.getAtmosphere());
  assert(reSwitchState.isCrossfading === true, 'Re-switching to cached texture starts crossfade immediately');
  await page.waitForTimeout(900); // Complete re-switch

  // ----------------------------------------------------------------------
  // TEST SUITE 5: Duplicate-Request & Rapid-Click Queue Protection
  // ----------------------------------------------------------------------
  console.log('\n--- 5. Testing Duplicate Clicks & Rapid Switching Policy ---');

  // 5A: Duplicate click on already active atmosphere
  const dupResult = await page.evaluate(() => {
    return window.__farm360.switchAtmosphere('golden'); // already golden
  });
  assert(dupResult === 'golden', 'Clicking current atmosphere resolves immediately without initiating crossfade');
  const dupState = await page.evaluate(() => window.__farm360.getAtmosphere());
  assert(dupState.isCrossfading === false, 'Duplicate click does not trigger crossfade');

  // 5B: Rapid sequential clicks: click Morning then immediately Monsoon
  console.log('Triggering rapid sequence: switch to Morning then immediately queue Monsoon...');
  await page.evaluate(() => {
    window.__farm360.switchAtmosphere('morning');
    // Rapidly switch to monsoon while morning transition is just starting
    setTimeout(() => {
      window.__farm360.switchAtmosphere('monsoon');
    }, 150);
  });

  await page.waitForTimeout(250);
  const queuedState = await page.evaluate(() => window.__farm360.getAtmosphere());
  console.log('Queued State during rapid sequence:', queuedState);
  assert(queuedState.pending === 'monsoon' || queuedState.target === 'monsoon', 'Monsoon is predictably queued or targeted');

  // Wait for the full dual-sequence to complete (800ms morning + 800ms monsoon + buffer)
  await page.waitForTimeout(1800);
  const postRapidState = await page.evaluate(() => window.__farm360.getAtmosphere());
  console.log('Post-Rapid Sequence State:', postRapidState);
  assert(postRapidState.current === 'monsoon', 'System predictably resolved queued transition to "monsoon" without any crash or glitch');
  assert(postRapidState.isCrossfading === false, 'Crossfade is cleanly finished');

  // ----------------------------------------------------------------------
  // TEST SUITE 6: Camera Navigation & Hotspot Projection Continuity
  // ----------------------------------------------------------------------
  console.log('\n--- 6. Testing Camera Navigation & Hotspot Continuity during Crossfade ---');

  // Switch to Morning while actively panning camera
  await page.evaluate(() => {
    window.__farm360.setOrientation(155, -16); // Face Pottery Hearth
    window.__farm360.switchAtmosphere('morning');
  });

  // Check camera coordinates and hotspots mid-crossfade
  await page.waitForTimeout(400);
  const cameraMidTransition = await page.evaluate(() => {
    const cam = window.__farm360.getCamera();
    const hs = window.__farm360.getHotspots();
    const pottery = hs.find(h => h.id === 'pottery-hearth');
    const el = document.getElementById('hotspot-pottery-hearth');
    return {
      cam,
      potteryVisible: pottery.isVisible,
      elOpacity: window.getComputedStyle(el).opacity,
      transform: el.style.transform
    };
  });

  console.log('Camera & Hotspot during Crossfade:', cameraMidTransition);
  assert(cameraMidTransition.potteryVisible === true, 'Pottery Hearth remains projected and visible during crossfade');
  assert(parseFloat(cameraMidTransition.elOpacity) >= 0.95, 'Pottery Hearth opacity remains ~1 during crossfade');
  assert(cameraMidTransition.transform.includes('translate3d'), 'Hotspot continues receiving GPU-accelerated screen projections');

  await page.waitForTimeout(600); // Complete transition

  // ----------------------------------------------------------------------
  // TEST SUITE 7: Farm Viewpoint Integration (Bhongir & Moinabad)
  // ----------------------------------------------------------------------
  console.log('\n--- 7. Testing Farm Viewpoint Switcher Integration ---');

  // Bhongir farm viewpoint should crossfade to 'golden'
  const vpBhongirBtn = page.locator('#vpBhongirBtn');
  await vpBhongirBtn.click();
  await page.waitForTimeout(1000);

  const atmoAfterBhongir = await page.evaluate(() => window.__farm360.getAtmosphere());
  assert(atmoAfterBhongir.current === 'golden', 'Clicking Bhongir Farm smoothly crossfaded to "golden" atmosphere');

  // Moinabad farm viewpoint should crossfade to 'morning'
  const vpMoinabadBtn = page.locator('#vpMoinabadBtn');
  await vpMoinabadBtn.click();
  await page.waitForTimeout(1000);

  const atmoAfterMoinabad = await page.evaluate(() => window.__farm360.getAtmosphere());
  assert(atmoAfterMoinabad.current === 'morning', 'Clicking Moinabad Farm smoothly crossfaded to "morning" atmosphere');

  // ----------------------------------------------------------------------
  // TEST SUITE 8: Mobile Responsiveness & Touch Targets (390px)
  // ----------------------------------------------------------------------
  console.log('\n--- 8. Testing Mobile Viewport (390px) Responsiveness ---');
  await page.setViewportSize({ width: 390, height: 844 });
  await page.waitForTimeout(500);

  // Trigger crossfade to golden on mobile
  await page.evaluate(() => window.__farm360.switchAtmosphere('golden'));
  await page.waitForTimeout(1000);

  const mobileAtmo = await page.evaluate(() => window.__farm360.getAtmosphere());
  assert(mobileAtmo.current === 'golden', 'Atmosphere crossfade operates flawlessly on mobile viewport');

  // Screenshot: Mobile 390px Golden Hour
  const screenshotPath5 = path.join(LOCAL_SCREENSHOT_DIR, '05_atmo_mobile_390_golden.png');
  const artifactPath5 = path.join(ARTIFACT_SCREENSHOT_DIR, '55_atmo_mobile_390_golden.png');
  await tourSection.screenshot({ path: screenshotPath5 });
  fs.copyFileSync(screenshotPath5, artifactPath5);
  console.log(`Saved screenshot 5 (Mobile 390px Golden): ${screenshotPath5}`);

  // Restore desktop viewport & return to morning baseline
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.evaluate(() => window.__farm360.switchAtmosphere('morning'));
  await page.waitForTimeout(1000);

  // ----------------------------------------------------------------------
  // TEST SUITE 9: Error Handling & Unknown Atmosphere Key Protection
  // ----------------------------------------------------------------------
  console.log('\n--- 9. Testing Error Handling & Resilience ---');
  let rejectedError = null;
  try {
    await page.evaluate(() => window.__farm360.switchAtmosphere('unknown_invalid_key'));
  } catch (err) {
    rejectedError = err.message;
  }
  assert(rejectedError !== null, `Invalid atmosphere key is safely rejected (got: "${rejectedError}")`);

  const safeAtmo = await page.evaluate(() => window.__farm360.getAtmosphere());
  assert(safeAtmo.current === 'morning', 'Current atmosphere remained completely safe and intact after invalid request');

  // Final runtime checks
  assert(pageErrors.length === 0, `Zero page runtime errors throughout test execution (errors: ${pageErrors.length})`);
  assert(consoleErrors.length === 0, `Zero console errors throughout test execution (errors: ${consoleErrors.length})`);

  await browser.close();

  console.log('\n========================================================================');
  console.log('🎉 ALL MILESTONE 1C, PHASE 3 TESTS PASSED SUCCESSFULLY! (100%)');
  console.log('========================================================================\n');
}

runTests().catch(err => {
  console.error('\n❌ Test suite failed:', err);
  process.exit(1);
});
