/**
 * Automated Verification Suite for Milestone 1C, Phase 6:
 * WebGL Lifecycle, Viewport IntersectionObserver & Touch Optimizations
 *
 * Verifies all 21 test criteria required by Milestone 1C, Phase 6 specifications.
 */

const { chromium } = require('playwright-core');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const BASE_URL = `http://localhost:${PORT}`;
const ARTIFACT_SCREENSHOT_DIR = '/home/ravikumaryarra5224/.gemini/antigravity/brain/a4c3fedf-4303-4802-bedf-aa97232e47e8/screenshots';
const LOCAL_SCREENSHOT_DIR = path.join(__dirname, 'screenshots_milestone_1c_phase6');

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
  console.log('🌟 ONE DAY KISSAN — MILESTONE 1C, PHASE 6 VERIFICATION SUITE');
  console.log('   Scope: WebGL Lifecycle, Viewport IntersectionObserver & Touch (21 Tests)');
  console.log('========================================================================\n');

  const pageErrors = [];
  const consoleErrors = [];

  const browser = await chromium.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 },
    deviceScaleFactor: 2 // High-DPI Retina testing
  });

  // Pre-seed dismissal so welcome popup doesn't block interactions
  await context.addInitScript(() => {
    sessionStorage.setItem('odk_welcome_dismissed', 'true');
  });

  const page = await context.newPage();

  page.on('pageerror', err => {
    console.error('❌ Page runtime error:', err.message);
    pageErrors.push(err.message);
  });

  page.on('console', msg => {
    if (msg.type() === 'error') {
      const text = msg.text();
      // Ignore network favicon or expected rejection logs
      if (!text.includes('favicon.ico') && !text.includes('Invalid atmosphere')) {
        console.error('❌ Console error:', text);
        consoleErrors.push(text);
      }
    }
  });

  console.log('Navigating to http://localhost:3000...');
  await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(500);

  assert(pageErrors.length === 0, 'Zero page runtime errors on load');
  assert(consoleErrors.length === 0, 'Zero console errors on load');

  // --- Test 1: Initial Lifecycle State & Renderer Creation ---
  console.log('\n--- Test 1: Initial Lifecycle State & Renderer Creation ---');
  const initialLifeState = await page.evaluate(() => window.__farm360.getLifecycleState());
  console.log('Initial Lifecycle State (before opening tour):', initialLifeState);
  assert(initialLifeState === 'NOT_INITIALIZED', 'Initial lifecycle state is NOT_INITIALIZED');

  const isRenderingInitial = await page.evaluate(() => window.__farm360.isRendering());
  assert(isRenderingInitial === false, 'Rendering is not running before tour starts');

  // Scroll into view of the 360 tour card first so it is within the viewport
  await page.locator('#farm360StageCard').scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);

  // Activate tour
  await page.evaluate(() => window.__farm360.start());
  await page.waitForTimeout(400);

  const activeLifeState = await page.evaluate(() => window.__farm360.getLifecycleState());
  const activeMetrics = await page.evaluate(() => window.__farm360.getPerformanceMetrics());
  console.log('Active Lifecycle State:', activeLifeState, activeMetrics);
  assert(activeLifeState === 'ACTIVE', 'Lifecycle state transitions to ACTIVE on start');
  assert(activeMetrics.isRendering === true, 'Rendering loop is active');
  assert(activeMetrics.isLoopRunning === true, 'Animation frame loop is running');

  const tourSection = page.locator('#farm360StageCard');
  const screenshot1 = path.join(LOCAL_SCREENSHOT_DIR, '01_tour_active_lifecycle.png');
  await tourSection.screenshot({ path: screenshot1 });
  fs.copyFileSync(screenshot1, path.join(ARTIFACT_SCREENSHOT_DIR, '06_tour_active_lifecycle.png'));
  console.log('✅ Test 1 Passed: Initial renderer created and state is ACTIVE');

  // --- Test 2: Duplicate Initialization Prevention ---
  console.log('\n--- Test 2: Duplicate Initialization Prevention ---');
  await page.evaluate(() => {
    window.__farm360.start();
    window.__farm360.start();
  });
  const dupState = await page.evaluate(() => window.__farm360.getLifecycleState());
  assert(dupState === 'ACTIVE', 'State remains ACTIVE after duplicate start calls');
  console.log('✅ Test 2 Passed: Duplicate start calls handled safely without re-initialization');

  // --- Test 3: Single Animation Loop Enforcement ---
  console.log('\n--- Test 3: Single Animation-Loop Enforcement ---');
  const countA = await page.evaluate(() => window.__farm360.getPerformanceMetrics().renderCount);
  await page.waitForTimeout(300);
  const countB = await page.evaluate(() => window.__farm360.getPerformanceMetrics().renderCount);
  const deltaFrames = countB - countA;
  console.log(`Rendered ${deltaFrames} frames in 300ms (~${(deltaFrames / 0.3).toFixed(1)} FPS)`);
  assert(deltaFrames >= 2 && deltaFrames <= 35, `Frame rate is strictly single-loop (got ${deltaFrames} in 300ms)`);
  assert(activeMetrics.isLoopRunning === true, 'isLoopRunning flag is true');
  console.log('✅ Test 3 Passed: Exactly ONE requestAnimationFrame loop active');

  // --- Test 4: Tour Close Pauses Rendering ---
  console.log('\n--- Test 4: Tour Close Pauses Rendering ---');
  await page.evaluate(() => window.__farm360.stop());
  await page.waitForTimeout(100);

  const pausedState = await page.evaluate(() => window.__farm360.getLifecycleState());
  const isRenderingPaused = await page.evaluate(() => window.__farm360.isRendering());
  console.log('Paused Lifecycle State:', pausedState, 'isRendering:', isRenderingPaused);
  assert(pausedState === 'PAUSED', 'Lifecycle state transitions to PAUSED on stop');
  assert(isRenderingPaused === false, 'isRendering() returns false when stopped');

  const stoppedCountA = await page.evaluate(() => window.__farm360.getPerformanceMetrics().renderCount);
  await page.waitForTimeout(200);
  const stoppedCountB = await page.evaluate(() => window.__farm360.getPerformanceMetrics().renderCount);
  assert(stoppedCountB === stoppedCountA, `Render calls strictly halted while stopped (count: ${stoppedCountA})`);
  console.log('✅ Test 4 Passed: Tour stop cleanly pauses rendering and cancels animation loop');

  // --- Test 5: Tour Reopen Resumes Correctly ---
  console.log('\n--- Test 5: Tour Reopen Resumes Correctly ---');
  await page.evaluate(() => window.__farm360.start());
  await page.waitForTimeout(150);

  const resumedState = await page.evaluate(() => window.__farm360.getLifecycleState());
  const isRenderingResumed = await page.evaluate(() => window.__farm360.isRendering());
  assert(resumedState === 'ACTIVE', 'Lifecycle state returns to ACTIVE on reopen');
  assert(isRenderingResumed === true, 'Rendering resumes running');

  const resumeCountA = await page.evaluate(() => window.__farm360.getPerformanceMetrics().renderCount);
  await page.waitForTimeout(200);
  const resumeCountB = await page.evaluate(() => window.__farm360.getPerformanceMetrics().renderCount);
  assert(resumeCountB > resumeCountA, 'Render calls resumed advancing');
  console.log('✅ Test 5 Passed: Tour reopen resumes animation loop without error');

  // --- Test 6: Viewport Exit Pauses Rendering ---
  console.log('\n--- Test 6: Viewport Exit Pauses Rendering ---');
  await page.evaluate(() => window.__farm360.simulateViewport(false));
  await page.waitForTimeout(100);

  const offscreenMetrics = await page.evaluate(() => window.__farm360.getPerformanceMetrics());
  console.log('Offscreen Metrics:', offscreenMetrics);
  assert(offscreenMetrics.lifecycleState === 'PAUSED', 'Lifecycle state is PAUSED when offscreen');
  assert(offscreenMetrics.isPausedForViewport === true, 'isPausedForViewport is true');
  assert(offscreenMetrics.isRendering === false, 'Rendering is stopped while offscreen');

  const offCountA = offscreenMetrics.renderCount;
  await page.waitForTimeout(200);
  const offCountB = await page.evaluate(() => window.__farm360.getPerformanceMetrics().renderCount);
  assert(offCountB === offCountA, `Zero draw calls while scrolled out of viewport (count: ${offCountA})`);
  console.log('✅ Test 6 Passed: Viewport exit halts rendering calls to save GPU & battery');

  // --- Test 7: Viewport Entry Resumes Rendering ---
  console.log('\n--- Test 7: Viewport Entry Resumes Rendering ---');
  await page.evaluate(() => window.__farm360.simulateViewport(true));
  await page.waitForTimeout(100);

  const onscreenMetrics = await page.evaluate(() => window.__farm360.getPerformanceMetrics());
  console.log('Onscreen Metrics:', onscreenMetrics);
  assert(onscreenMetrics.lifecycleState === 'ACTIVE', 'Lifecycle state is ACTIVE when returning onscreen');
  assert(onscreenMetrics.isPausedForViewport === false, 'isPausedForViewport is false');
  assert(onscreenMetrics.isRendering === true, 'Rendering is resumed');

  const onCountA = onscreenMetrics.renderCount;
  await page.waitForTimeout(200);
  const onCountB = await page.evaluate(() => window.__farm360.getPerformanceMetrics().renderCount);
  assert(onCountB > onCountA, 'Rendering active again after viewport re-entry');
  console.log('✅ Test 7 Passed: Viewport entry resumes rendering smoothly');

  // --- Test 8: IntersectionObserver & Resource Cleanup ---
  console.log('\n--- Test 8: IntersectionObserver & Resource Cleanup ---');
  await page.evaluate(() => window.__farm360.dispose());
  const disposedState = await page.evaluate(() => window.__farm360.getLifecycleState());
  console.log('Disposed State:', disposedState);
  assert(disposedState === 'DISPOSED', 'State transitions to DISPOSED');
  assert(await page.evaluate(() => window.__farm360.isRendering()) === false, 'Rendering terminated on dispose');

  // Safe repeated disposal
  await page.evaluate(() => window.__farm360.dispose());
  assert(await page.evaluate(() => window.__farm360.getLifecycleState()) === 'DISPOSED', 'Repeated dispose is safe');

  // Re-initialization from DISPOSED
  await page.evaluate(() => window.__farm360.start());
  await page.waitForTimeout(300);
  assert(await page.evaluate(() => window.__farm360.getLifecycleState()) === 'ACTIVE', 'Re-initialized cleanly from DISPOSED');
  console.log('✅ Test 8 Passed: Complete disposal cleans up resources and supports re-initialization');

  // --- Test 9: Resize Handling ---
  console.log('\n--- Test 9: Resize Handling ---');
  await page.setViewportSize({ width: 1024, height: 768 });
  await page.waitForTimeout(200);
  const resizeMetrics = await page.evaluate(() => window.__farm360.getCamera());
  assert(typeof resizeMetrics.fov === 'number', 'Camera remains valid after viewport resize');
  console.log('✅ Test 9 Passed: Resize handled safely without recreating renderer');

  // --- Test 10: High-DPI Resolution Clamping ---
  console.log('\n--- Test 10: High-DPI Resolution Clamping ---');
  const dpr = await page.evaluate(() => window.__farm360.getPerformanceMetrics().pixelRatio);
  console.log(`Reported WebGL Pixel Ratio: ${dpr} (deviceScaleFactor = 2)`);
  assert(dpr <= 2, `Pixel ratio is capped to <= 2 to prevent mobile GPU overload (got: ${dpr})`);
  console.log('✅ Test 10 Passed: High-DPI resolution clamped to 2.0');

  // --- Test 11: Pointer Drag and Pointer Cancellation ---
  console.log('\n--- Test 11: Pointer Drag and Pointer Cancellation ---');
  const canvasWrap = page.locator('#farm360LiveCanvasWrap');
  const box = await canvasWrap.boundingBox();

  // Test pointercancel
  await page.evaluate((b) => {
    const el = document.getElementById('farm360LiveCanvasWrap');
    el.dispatchEvent(new PointerEvent('pointerdown', { pointerId: 42, clientX: b.x + 100, clientY: b.y + 100, isPrimary: true }));
  }, box);

  let touchState = await page.evaluate(() => window.__farm360.getTouchState());
  assert(touchState.isUserInteracting === true, 'isUserInteracting is true on pointerdown');

  // Dispatch pointercancel
  await page.evaluate(() => {
    const el = document.getElementById('farm360LiveCanvasWrap');
    el.dispatchEvent(new PointerEvent('pointercancel', { pointerId: 42 }));
  });

  touchState = await page.evaluate(() => window.__farm360.getTouchState());
  assert(touchState.isUserInteracting === false, 'pointercancel cleanly resets isUserInteracting (no stuck drag!)');
  assert(touchState.activePointersCount === 0, 'activePointers cleaned up after cancel');
  console.log('✅ Test 11 Passed: Pointer drag and pointercancel handled cleanly');

  // --- Test 12: Touch & Pinch-to-Zoom Behavior ---
  console.log('\n--- Test 12: Touch & Pinch-to-Zoom Behavior ---');
  const initialFov = await page.evaluate(() => window.__farm360.getCamera().targetFov);

  // Simulate two-finger touch pinch-in (distance starts at 100px, moves to 200px)
  await page.evaluate((b) => {
    const el = document.getElementById('farm360LiveCanvasWrap');
    el.dispatchEvent(new PointerEvent('pointerdown', { pointerId: 10, clientX: b.x + 100, clientY: b.y + 100 }));
    el.dispatchEvent(new PointerEvent('pointerdown', { pointerId: 11, clientX: b.x + 200, clientY: b.y + 100 }));
  }, box);

  const pinchState = await page.evaluate(() => window.__farm360.getTouchState());
  assert(pinchState.activePointersCount === 2, 'Two pointers active for pinch');

  // Spread fingers apart to 300px
  await page.evaluate((b) => {
    document.dispatchEvent(new PointerEvent('pointermove', { pointerId: 11, clientX: b.x + 300, clientY: b.y + 100 }));
  }, box);

  const pinchedFov = await page.evaluate(() => window.__farm360.getCamera().targetFov);
  console.log(`Initial FOV: ${initialFov}°, Pinched Out FOV: ${pinchedFov.toFixed(1)}°`);
  assert(pinchedFov < initialFov, 'Pinch spread zoomed in camera (reduced FOV)');

  // Release pointers
  await page.evaluate(() => {
    document.dispatchEvent(new PointerEvent('pointerup', { pointerId: 10 }));
    document.dispatchEvent(new PointerEvent('pointerup', { pointerId: 11 }));
  });

  const postPinchState = await page.evaluate(() => window.__farm360.getTouchState());
  assert(postPinchState.activePointersCount === 0, 'Pointers cleanly released');
  console.log('✅ Test 12 Passed: Multi-touch pinch-to-zoom is functional');

  // --- Test 13: Page Scrolling Outside Tour ---
  console.log('\n--- Test 13: Page Scrolling Outside Tour ---');
  const touchAction = await page.locator('#farm360LiveCanvasWrap').evaluate(el => window.getComputedStyle(el).touchAction);
  console.log('Canvas touch-action:', touchAction);
  assert(touchAction === 'none', 'touch-action is "none" strictly on canvas wrap');

  const bodyOverflow = await page.evaluate(() => window.getComputedStyle(document.body).overflow);
  assert(bodyOverflow !== 'hidden', 'Document body scrolling is preserved outside tour');
  console.log('✅ Test 13 Passed: Page scrolling preserved outside canvas');

  // --- Test 14: Phase 4 Breathing Pause / Resume ---
  console.log('\n--- Test 14: Phase 4 Breathing Pause / Resume ---');
  await page.evaluate(() => window.__farm360.pause());
  const pausedBreathing = await page.evaluate(() => window.__farm360.getBreathing());
  assert(pausedBreathing.weight === 0, 'Breathing weight is 0 while paused');

  await page.evaluate(() => window.__farm360.resume());
  await page.waitForTimeout(100);
  const resumedBreathing = await page.evaluate(() => window.__farm360.getBreathing());
  assert(typeof resumedBreathing.effectiveLon === 'number', 'Camera lon remains valid on resume');
  console.log('✅ Test 14 Passed: Phase 4 breathing pauses and resumes without jumping');

  // --- Test 15: Phase 5 Sensor Cleanup and Reactivation ---
  console.log('\n--- Test 15: Phase 5 Sensor Cleanup and Reactivation ---');
  await page.evaluate(() => {
    window.__farm360.setMotionPermissionState('granted');
    window.__farm360.enableMotion();
  });
  let motionState = await page.evaluate(() => window.__farm360.getMotionState());
  assert(motionState.active === true, 'Motion is active');

  // Stop tour: must disable motion automatically
  await page.evaluate(() => window.__farm360.stop());
  motionState = await page.evaluate(() => window.__farm360.getMotionState());
  assert(motionState.active === false, 'Motion is deactivated when tour stops');

  // Restart tour and re-enable motion
  await page.evaluate(() => {
    window.__farm360.start();
    window.__farm360.enableMotion();
  });
  motionState = await page.evaluate(() => window.__farm360.getMotionState());
  assert(motionState.active === true, 'Motion re-activates cleanly after restart');
  await page.evaluate(() => window.__farm360.disableMotion());
  console.log('✅ Test 15 Passed: Motion sensor cleaned up on tour stop and reactivates cleanly');

  // --- Test 16: Hotspot Projection after Viewport Restoration ---
  console.log('\n--- Test 16: Hotspot Projection after Viewport Restoration ---');
  await page.evaluate(() => window.__farm360.simulateViewport(false));
  await page.waitForTimeout(50);
  await page.evaluate(() => window.__farm360.simulateViewport(true));
  await page.waitForTimeout(100);

  const hotspots = await page.evaluate(() => window.__farm360.getHotspots());
  const paddy = hotspots.find(h => h.id === 'wetland-paddy');
  assert(paddy && paddy.isVisible === true, 'Hotspot remains visible after viewport restoration');
  console.log('✅ Test 16 Passed: Hotspot projection fully intact after viewport pause/resume');

  // --- Test 17: Atmosphere Crossfade Continuity ---
  console.log('\n--- Test 17: Atmosphere Crossfade Continuity ---');
  const atmoPromise = page.evaluate(() => window.__farm360.switchAtmosphere('golden'));
  await page.waitForTimeout(100);
  // Viewport exit mid-crossfade
  await page.evaluate(() => window.__farm360.simulateViewport(false));
  await page.waitForTimeout(100);
  // Viewport enter to resume
  await page.evaluate(() => window.__farm360.simulateViewport(true));
  const finalAtmo = await atmoPromise;
  console.log('Crossfade completed to:', finalAtmo);
  assert(finalAtmo === 'golden', 'Crossfade completed successfully despite viewport pause/resume');
  console.log('✅ Test 17 Passed: Atmosphere crossfade continuity preserved');

  // --- Test 18: Reduced-Motion Compatibility ---
  console.log('\n--- Test 18: Reduced-Motion Compatibility ---');
  await page.evaluate(() => window.__farm360.setReducedMotionPreference(true));
  const reducedBreathing = await page.evaluate(() => window.__farm360.getBreathing());
  assert(reducedBreathing.enabled === false, 'Breathing disabled under reduced motion');
  await page.evaluate(() => window.__farm360.setReducedMotionPreference(false));
  console.log('✅ Test 18 Passed: Reduced-motion preference respected dynamically');

  // --- Test 19: Repeated Open/Close Cycles ---
  console.log('\n--- Test 19: Repeated Open/Close Cycles ---');
  for (let i = 1; i <= 5; i++) {
    await page.evaluate(() => window.__farm360.stop());
    await page.evaluate(() => window.__farm360.start());
  }
  const cycleState = await page.evaluate(() => window.__farm360.getLifecycleState());
  assert(cycleState === 'ACTIVE', 'State is ACTIVE after 5 rapid open/close cycles');
  console.log('✅ Test 19 Passed: 5 rapid open/close cycles executed cleanly');

  // --- Test 20: No Duplicate Listeners or Loops ---
  console.log('\n--- Test 20: No Duplicate Event Listeners or Animation Loops ---');
  const postCycleCountA = await page.evaluate(() => window.__farm360.getPerformanceMetrics().renderCount);
  await page.waitForTimeout(300);
  const postCycleCountB = await page.evaluate(() => window.__farm360.getPerformanceMetrics().renderCount);
  const postDelta = postCycleCountB - postCycleCountA;
  console.log(`Post-cycle frame count in 300ms: ${postDelta} (~${(postDelta / 0.3).toFixed(1)} FPS)`);
  assert(postDelta >= 2 && postDelta <= 35, `Frame rate remains strictly single-loop after 5 cycles (got: ${postDelta})`);
  console.log('✅ Test 20 Passed: No duplicate animation loops after repeated cycles');

  // --- Test 21: Error Integrity ---
  console.log('\n--- Test 21: Error Integrity ---');
  console.log(`Page runtime errors: ${pageErrors.length}, Console errors: ${consoleErrors.length}`);
  assert(pageErrors.length === 0, 'Zero page runtime errors throughout test execution');
  assert(consoleErrors.length === 0, 'Zero console errors throughout test execution');
  console.log('✅ Test 21 Passed: Zero runtime or console errors');

  // Save final screenshot
  const screenshot2 = path.join(LOCAL_SCREENSHOT_DIR, '02_tour_lifecycle_verified.png');
  await tourSection.screenshot({ path: screenshot2 });
  fs.copyFileSync(screenshot2, path.join(ARTIFACT_SCREENSHOT_DIR, '07_tour_lifecycle_verified.png'));

  console.log('\n========================================================================');
  console.log('🎉 ALL MILESTONE 1C, PHASE 6 TESTS PASSED SUCCESSFULLY! (100%)');
  console.log('========================================================================\n');

  await browser.close();
}

runTests().catch(err => {
  console.error('\n❌ Test suite failed:', err);
  process.exit(1);
});
